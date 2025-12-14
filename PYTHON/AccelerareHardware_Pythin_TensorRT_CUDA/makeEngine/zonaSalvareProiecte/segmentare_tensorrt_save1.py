import tensorrt as trt
import pycuda.driver as cuda
import pycuda.autoinit
import numpy as np
import cv2
import time

# =========================
# Configurații
# =========================
TRT_LOGGER = trt.Logger(trt.Logger.WARNING)
ENGINE_PATH = "yolo11n-seg.engine"  # Calea către engine-ul FP16
IMAGE_PATH = "bus.jpg"     # Calea către imaginea de test

# =========================
# Clasa pentru Inferența TensorRT
# =========================

# Numele celor 80 de clase COCO (standard pentru YOLO)
CLASS_NAMES = [
    'person', 'bicycle', 'car', 'motorcycle', 'airplane', 'bus', 'train', 'truck', 'boat', 
    'traffic light', 'fire hydrant', 'stop sign', 'parking meter', 'bench', 'bird', 'cat', 'dog', 
    'horse', 'sheep', 'cow', 'elephant', 'bear', 'zebra', 'giraffe', 'backpack', 'umbrella', 
    'handbag', 'tie', 'suitcase', 'frisbee', 'skis', 'snowboard', 'sports ball', 'kite', 'baseball bat', 
    'baseball glove', 'skateboard', 'surfboard', 'tennis racket', 'bottle', 'wine glass', 'cup', 
    'fork', 'knife', 'spoon', 'bowl', 'banana', 'apple', 'sandwich', 'orange', 'broccoli', 'carrot', 
    'hot dog', 'pizza', 'donut', 'cake', 'chair', 'couch', 'potted plant', 'bed', 'dining table', 
    'toilet', 'tv', 'laptop', 'mouse', 'remote', 'keyboard', 'cell phone', 'microwave', 'oven', 
    'toaster', 'sink', 'refrigerator', 'book', 'clock', 'vase', 'scissors', 'teddy bear', 'hair drier', 
    'toothbrush'
]
# --- Funcții Helper pentru Post-Procesare (YOLO Segmentation) ---

def sigmoid(x):
    # Funcția de activare necesară pentru măști
    return 1.0 / (1.0 + np.exp(-x))

def non_max_suppression_numpy(boxes, scores, iou_threshold):
    """
    Implementare simplă NMS (pentru acest exemplu, vom folosi doar indici de bază)
    ATENȚIE: Pentru performanță reală, ar trebui să folosiți o implementare NMS optimizată (CPU sau CUDA).
    Această funcție returnează indicii finali ai boxurilor.
    """
    if len(boxes) == 0:
        return []

    # Sortare după scor
    order = scores.argsort()[::-1]
    keep = []

    while order.size > 0:
        i = order[0]
        keep.append(i)

        # Calcul IOU (Intersection over Union) - Implementare simplă
        # Coordonatele boxurilor
        x1 = boxes[order, 0]
        y1 = boxes[order, 1]
        x2 = boxes[order, 2]
        y2 = boxes[order, 3]

        # Suprapunere
        xx1 = np.maximum(x1[0], x1[1:])
        yy1 = np.maximum(y1[0], y1[1:])
        xx2 = np.minimum(x2[0], x2[1:])
        yy2 = np.minimum(y2[0], y2[1:])

        w = np.maximum(0.0, xx2 - xx1)
        h = np.maximum(0.0, yy2 - yy1)
        inter = w * h

        # Arie
        area = (x2 - x1) * (y2 - y1)
        union = area[0] + area[1:] - inter

        # Calcul IOU
        iou = inter / (union + 1e-6) 

        # Păstrează doar indicii care nu se suprapun
        order = order[1:][iou < iou_threshold]

    return keep



class TRT_YoloSegmentator:
    """
    Clasă pentru a gestiona încărcarea engine-ului TensorRT, 
    alocarea bufferelor și rularea inferenței pentru un model YOLO Segmentation.
    """
    def __init__(self, engine_path):
        self.engine = self._load_engine(engine_path)
        self.context = self.engine.create_execution_context()
        #self.stream = cuda.Stream()
        
        # Alocă memorii pentru input și output-uri multiple
        # Folosim metode bazate pe numele tensorilor (TensorRT modern)
        self.h_input, self.d_input, self.h_output, self.d_output, self.bindings = self._allocate_buffers()
        
        # Obține forma input-ului folosind numele tensorului 'images'
        input_name = 'images'
        self.input_shape = self.engine.get_tensor_shape(input_name)
        
        print(f"[INFO] Segmentator TRT gata. Input shape: {self.input_shape}")
        
    def _load_engine(self, engine_path):
        """ Încarcă și deserializează engine-ul TensorRT. """
        try:
            with open(engine_path, "rb") as f:
                runtime = trt.Runtime(TRT_LOGGER)
                engine = runtime.deserialize_cuda_engine(f.read())
            if engine is None:
                raise RuntimeError("Engine could not be deserialized!")
            print(f"[INFO] Engine '{engine_path}' încărcat cu succes.")
            return engine
        except Exception as e:
            print(f"[EROARE] Nu s-a putut încărca engine-ul: {e}")
            raise

    def _allocate_buffers(self):
        """ Alocă memorie CPU (Host) și GPU (Device) pentru toți tensorii I/O. """
        h_input, d_input = [], []
        h_output, d_output = [], []
        bindings = {} # Dicționar pentru maparea nume_tensor -> adresă GPU
        
        # Obține numele tuturor tensorilor I/O
        num_io_tensors = self.engine.num_io_tensors
        tensor_names = [self.engine.get_tensor_name(i) for i in range(num_io_tensors)]

        for name in tensor_names:
            mode = self.engine.get_tensor_mode(name)
            shape = self.engine.get_tensor_shape(name)
            dtype = trt.nptype(self.engine.get_tensor_dtype(name))
            
            # Calculează mărimea în bytes
            size = trt.volume(shape) * dtype().itemsize
            
            print(f"Tensor '{name}': mode={mode}, shape={shape}, dtype={dtype}")

            # Alocare memorie CPU (Host) - obligatoriu contiguous
            h_mem = np.ascontiguousarray(np.empty(shape, dtype=dtype))
            
            # Alocare memorie GPU (Device)
            d_mem = cuda.mem_alloc(size)
            
            # Păstrează adresa GPU în dicționar
            bindings[name] = int(d_mem)
            
            if mode == trt.TensorIOMode.INPUT:
                h_input.append(h_mem)
                d_input.append(d_mem)
            else:
                h_output.append(h_mem)
                d_output.append(d_mem)
        
        # Convertim dictionarul de bindings în lista ordonată de adrese (necesară pentru execute_v2)
        ordered_bindings = [bindings[name] for name in tensor_names]
                
        # Returnează doar primul input și listele pentru output-uri
        return h_input[0], d_input[0], h_output, d_output, ordered_bindings

    def preprocess_image(self, img_path):
        """ 
        Încarcă imaginea, o redimensionează, normalizează și o copiază 
        în buffer-ul de input al CPU, asigurând corespondența formei.
        """
        img_original = cv2.imread(img_path)
        if img_original is None:
            raise FileNotFoundError(f"Imaginea nu a fost găsită la: {img_path}")
            
        self.img_h_orig, self.img_w_orig = img_original.shape[:2]

        _, c, h, w = self.input_shape
        
        # 1. Redimensionare și conversie culoare
        img_resized = cv2.resize(img_original, (w, h))
        img_rgb = cv2.cvtColor(img_resized, cv2.COLOR_BGR2RGB)
        
        # 2. Normalizează la 0..1 și reordonează CHW
        input_data = img_rgb.astype(np.float32) / 255.0
        input_data = np.transpose(input_data, (2, 0, 1))
        
        # 3. Adaugă dimensiunea de batch (1)
        input_data = np.expand_dims(input_data, axis=0)
        
        # --- LINIA CORECTATĂ PENTRU COPIERE SIGURĂ ---
        # Redimensionează input_data la forma h_input (care este (1, 3, 640, 640))
        # Deși au același număr de elemente, această redimensionare explicită
        # este uneori necesară pentru a evita eroarea "could not broadcast".
        
        # Încercați să copiați direct fără ravel
        # np.copyto(self.h_input, input_data)
        
        # SAU, varianta cea mai sigură, aplatizează ambele părți și copiază:
        np.copyto(self.h_input.ravel(), input_data.ravel())

        return img_original

    def infer(self):
        """ Rulează inferența pe GPU (sincron) și copiază rezultatele pe CPU. """
        
        start_time = time.time()
        
        # 1. Copiere input (Host -> Device) - Sincron
        cuda.memcpy_htod(self.d_input, self.h_input)

        # 2. Rulează inference - SINCRON (execute_v2)
        # Atenție: execute_v2() cere un tuplu sau o listă de binding-uri, nu doar adresele
        self.context.execute_v2(bindings=self.bindings)

        # 3. Copiere output (Device -> Host) - Sincron
        for d_out, h_out in zip(self.d_output, self.h_output):
            cuda.memcpy_dtoh(h_out, d_out)

        # Nu mai este necesară sincronizarea stream-ului

        end_time = time.time()
        print(f"[INFO] Timp inferență (GPU/Total): {(end_time - start_time) * 1000:.2f} ms")
        
        return self.h_output
        
        
        
def process_yolo_segmentation_output(outputs, orig_shape, input_shape, conf_threshold=0.25, iou_threshold=0.45, num_classes=80, num_coeffs=32):
    
    # [Start Timer pentru CPU]
    start_time_cpu = time.time()
    
    # Detections: (1, 116, 8400) -> Transpus la (8400, 116)
    detections = outputs[0][0].T 
    proto_masks = outputs[1][0]   # (32, 160, 160)
    
    # 1. Extracția și Filtrarea
    boxes = detections[:, :4]        
    scores_coeffs = detections[:, 4:]
    
    class_scores = scores_coeffs[:, :num_classes] 
    mask_coeffs = scores_coeffs[:, num_classes:] 
    
    max_scores = np.max(class_scores, axis=1)
    class_ids = np.argmax(class_scores, axis=1)
    
    # Filtrarea preliminară după pragul de încredere
    valid_indices = max_scores > conf_threshold
    
    filtered_boxes = boxes[valid_indices]
    filtered_scores = max_scores[valid_indices]
    filtered_class_ids = class_ids[valid_indices]
    filtered_mask_coeffs = mask_coeffs[valid_indices]

    if len(filtered_boxes) == 0:
        print("  [Rezultat] Nu s-au găsit obiecte peste pragul de încredere.")
        return [], [], []

    # 2. Conversie Boxuri (de la XYWH la XYXY) și scalare la dimensiunea modelului (640)
    filtered_boxes[:, 0] -= filtered_boxes[:, 2] / 2 # x1
    filtered_boxes[:, 1] -= filtered_boxes[:, 3] / 2 # y1
    filtered_boxes[:, 2] += filtered_boxes[:, 0]     # x2
    filtered_boxes[:, 3] += filtered_boxes[:, 1]     # y2

    # 3. Aplicarea NMS
    nms_indices = non_max_suppression_numpy(filtered_boxes, filtered_scores, iou_threshold)
    
    final_boxes = filtered_boxes[nms_indices]
    final_scores = filtered_scores[nms_indices]
    final_class_ids = filtered_class_ids[nms_indices]
    final_mask_coeffs = filtered_mask_coeffs[nms_indices]
    
    # 4. Generarea Măștilor Finale
    proto_reshaped = proto_masks.reshape(num_coeffs, -1) # (32, 160*160)
    
    # Înmulțirea matricială: (N_final, 32) @ (32, 160*160) -> (N_final, 160*160)
    masks_raw = final_mask_coeffs @ proto_reshaped
    masks_sigmoid = sigmoid(masks_raw).reshape(-1, proto_masks.shape[1], proto_masks.shape[2])
    masks_final = masks_sigmoid > 0.5 

    # 5. Scalarea Finală (la dimensiunea imaginii originale)
    
    # Extrage dimensiunile modelului și ale imaginii originale
    model_w = input_shape[3]
    orig_h, orig_w = orig_shape
    
    # Scalare Boxuri: de la 640x640 la dimensiunea originală (orig_w, orig_h)
    # (Presupunând că preprocesarea inițială a fost un simplu resize fără padding)
    final_boxes[:, [0, 2]] *= (orig_w / model_w)
    final_boxes[:, [1, 3]] *= (orig_h / model_w)
    
    # Scalare Măști: Redimensionare la dimensiunea originală
    final_scaled_masks = []
    for mask in masks_final:
        mask_scaled = cv2.resize(mask.astype(np.uint8), (orig_w, orig_h), interpolation=cv2.INTER_LINEAR)
        final_scaled_masks.append(mask_scaled > 0.5) # Re-binarizare după resize
        
    print(f"  [Rezultat] Obiecte detectate: {len(final_boxes)}")
    print(f"[INFO] Timp Post-Procesare (CPU): {(time.time() - start_time_cpu) * 1000:.2f} ms")
    
    return final_boxes, final_class_ids, final_scaled_masks, final_scores # Adăugați final_scores aici

# =========================
# Rulare Principală
# =========================
if __name__ == "__main__":
    try:
        # 1. Inițializare și încărcare engine
        seg_model = TRT_YoloSegmentator(ENGINE_PATH)
        
        # 2. Pregătire imagine
        print(f"\n[INFO] Preprocesare imagine: {IMAGE_PATH}")
        original_img = seg_model.preprocess_image(IMAGE_PATH)
        orig_shape = original_img.shape[:2] # Adăugat pentru a rezolva 'orig_shape not defined'
        
        # 3. Rulare Inferență
        outputs = seg_model.infer()
        
        # 4. Post-procesare AVANSATĂ
        input_shape = seg_model.input_shape
        
        # Asigură-te că funcția returnează boxes, ids, masks ȘI scores
        final_boxes, final_class_ids, final_scaled_masks, final_scores = process_yolo_segmentation_output(
            outputs, 
            orig_shape, 
            input_shape,
            conf_threshold=0.25,  
            iou_threshold=0.45    
        )
        
        # 5. Afișare Rezultate Detașate în Consolă
        print("\n========================= DETALII REZULTATE =========================")
        print(f"Total obiecte detectate și filtrate: {len(final_boxes)}")

        if len(final_boxes) > 0:
            # Iterați peste toate obiectele detectate
            for i, (box, class_id, score) in enumerate(zip(final_boxes, final_class_ids, final_scores)):
                
                try:
                    class_name = CLASS_NAMES[class_id]
                except IndexError:
                    class_name = f"Clasa necunoscută ({class_id})"

                score_formatted = f"{score:.4f}" 
                x1, y1, x2, y2 = box.astype(int)

                print(f"--- Obiectul {i + 1} ---")
                print(f"  Clasă: {class_name} (ID: {class_id})")
                print(f"  Încredere (Scor): {score_formatted}")
                print(f"  Box (x1, y1, x2, y2): [{x1} {y1} {x2} {y2}]")
                
        print("=====================================================================")

        # 6. Vizualizarea rezultatelor (Blocul CV2)
        if len(final_boxes) > 0:
            
            img_with_masks = original_img.copy()
            mask_color = [0, 255, 0] # Verde (BGR)
            alpha = 0.5 

            for box, class_id, mask, score in zip(final_boxes, final_class_ids, final_scaled_masks, final_scores):
                
                # Aplică Masca
                mask_indices = mask > 0
                for c in range(3): 
                    img_with_masks[:, :, c][mask_indices] = (
                        img_with_masks[:, :, c][mask_indices] * (1 - alpha) + 
                        mask_color[c] * alpha
                    )
                
                # Desenează Bounding Box și Eticheta
                x1, y1, x2, y2 = box.astype(int)
                cv2.rectangle(img_with_masks, (x1, y1), (x2, y2), (0, 0, 255), 2)
                
                class_name = CLASS_NAMES[class_id]
                label = f"{class_name} {score:.2f}" 
                
                cv2.putText(img_with_masks, label, (x1, y1 - 10), 
                            cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 0, 255), 2)

            cv2.imshow("YOLO Segmentation Result", img_with_masks)
            cv2.waitKey(0) 
            cv2.destroyAllWindows()
            
    except FileNotFoundError as e:
        print(f"[EROARE FATALĂ] Imagine sau Engine negăsit: {e}")
    except RuntimeError as e:
        print(f"[EROARE FATALĂ] Eroare la TensorRT: {e}")
    except Exception as e:
        print(f"[EROARE NEPREVĂZUTĂ] O eroare a apărut: {e}")
