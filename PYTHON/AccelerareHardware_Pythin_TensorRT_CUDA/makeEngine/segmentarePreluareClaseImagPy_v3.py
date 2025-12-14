import tensorrt as trt
import pycuda.driver as cuda
import pycuda.autoinit
import numpy as np
import cv2
import time
import sys
import os # Necesită import pentru verificarea extensiei

# =========================
# Configurații Globale
# =========================
TRT_LOGGER = trt.Logger(trt.Logger.WARNING)
ENGINE_PATH = "yolo11n-seg.engine"  # Calea către engine-ul FP16
INPUT_PATH = "Cars Moving On Road Stock Footage - Free Download.mp4" # Puteți pune și o imagine: "bus.jpg"

fout = open("rezultate_box_clase_date.txt", "w")

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


def generate_unique_colors(num_classes):
    """ Generează culori pseudo-aleatoare unice folosind o funcție hash simplă. """
    colors = []
    # Generează 80 de culori BGR (OpenCV) bazate pe ID-ul clasei
    for i in range(num_classes):
        # Folosim i pentru a genera o culoare diferită
        r = (i * 35) % 256
        g = (i * 29) % 256
        b = (i * 46) % 256
        colors.append((b, g, r)) # BGR format
    return colors

NUM_CLASSES = len(CLASS_NAMES)
COLOR_PALETTE = generate_unique_colors(NUM_CLASSES)

# =========================
# Funcții Helper pentru Post-Procesare
# =========================

def sigmoid(x):
    # Funcția de activare necesară pentru măști
    return 1.0 / (1.0 + np.exp(-x))

def non_max_suppression_numpy(boxes, scores, iou_threshold):
    """ Implementarea NMS bazată pe NumPy. """
    if len(boxes) == 0:
        return []

    order = scores.argsort()[::-1]
    keep = []

    while order.size > 0:
        i = order[0]
        keep.append(i)

        x1 = boxes[order, 0]
        y1 = boxes[order, 1]
        x2 = boxes[order, 2]
        y2 = boxes[order, 3]

        # Calcul IOU (Intersection over Union)
        xx1 = np.maximum(x1[0], x1[1:])
        yy1 = np.maximum(y1[0], y1[1:])
        xx2 = np.minimum(x2[0], x2[1:])
        yy2 = np.minimum(y2[0], y2[1:])

        w = np.maximum(0.0, xx2 - xx1)
        h = np.maximum(0.0, yy2 - yy1)
        inter = w * h

        area = (x2 - x1) * (y2 - y1)
        union = area[0] + area[1:] - inter

        iou = inter / (union + 1e-6) 

        order = order[1:][iou < iou_threshold]

    return keep

def process_yolo_segmentation_output(outputs, orig_shape, input_shape, conf_threshold=0.25, iou_threshold=0.45, num_classes=80, num_coeffs=32):
    
    start_time_cpu = time.time()
    
    # 1. Extracția și Filtrarea
    detections = outputs[0][0].T  # (1, 116, 8400) -> Transpus la (8400, 116)
    proto_masks = outputs[1][0]   # (32, 160, 160)
    
    boxes = detections[:, :4]        
    scores_coeffs = detections[:, 4:]
    
    class_scores = scores_coeffs[:, :num_classes] 
    mask_coeffs = scores_coeffs[:, num_classes:] 
    
    max_scores = np.max(class_scores, axis=1)
    class_ids = np.argmax(class_scores, axis=1)
    
    valid_indices = max_scores > conf_threshold
    
    filtered_boxes = boxes[valid_indices]
    filtered_scores = max_scores[valid_indices]
    filtered_class_ids = class_ids[valid_indices]
    filtered_mask_coeffs = mask_coeffs[valid_indices]

    if len(filtered_boxes) == 0:
        return [], [], [], []

    # 2. Conversie Boxuri (de la XYWH la XYXY) și scalare la dimensiunea modelului (640)
    filtered_boxes[:, 0] -= filtered_boxes[:, 2] / 2 
    filtered_boxes[:, 1] -= filtered_boxes[:, 3] / 2 
    filtered_boxes[:, 2] += filtered_boxes[:, 0]     
    filtered_boxes[:, 3] += filtered_boxes[:, 1]     

    # 3. Aplicarea NMS
    nms_indices = non_max_suppression_numpy(filtered_boxes, filtered_scores, iou_threshold)
    
    final_boxes = filtered_boxes[nms_indices]
    final_scores = filtered_scores[nms_indices]
    final_class_ids = filtered_class_ids[nms_indices]
    final_mask_coeffs = filtered_mask_coeffs[nms_indices]
    
    # 4. Generarea Măștilor Finale
    proto_reshaped = proto_masks.reshape(num_coeffs, -1) 
    
    masks_raw = final_mask_coeffs @ proto_reshaped
    masks_sigmoid = sigmoid(masks_raw).reshape(-1, proto_masks.shape[1], proto_masks.shape[2])
    masks_final = masks_sigmoid > 0.5 

    # 5. Scalarea Finală (la dimensiunea imaginii originale)
    
    model_w = input_shape[3]
    orig_h, orig_w = orig_shape
    
    # Scalare Boxuri
    final_boxes[:, [0, 2]] *= (orig_w / model_w)
    final_boxes[:, [1, 3]] *= (orig_h / model_w)
    
    # Scalare Măști
    final_scaled_masks = []
    for mask in masks_final:
        mask_scaled = cv2.resize(mask.astype(np.uint8), (orig_w, orig_h), interpolation=cv2.INTER_LINEAR)
        final_scaled_masks.append(mask_scaled > 0.5) 
        
    print(f"  [Rezultat] Obiecte detectate și filtrate: {len(final_boxes)}")
    fout.write(f"  [Rezultat] Obiecte detectate și filtrate: {len(final_boxes)}\n")
    print(f"[INFO] Timp Post-Procesare (CPU): {(time.time() - start_time_cpu) * 1000:.2f} ms")
    fout.write(f"[INFO] Timp Post-Procesare (CPU): {(time.time() - start_time_cpu) * 1000:.2f} ms\n")
    
    return final_boxes, final_class_ids, final_scaled_masks, final_scores


# =========================
# Clasa pentru Inferența TensorRT
# =========================
class TRT_YoloSegmentator:
    
    def __init__(self, engine_path):
        self.engine = self._load_engine(engine_path)
        self.context = self.engine.create_execution_context()
        self.stream = cuda.Stream()  
        
        self.h_input, self.d_input, self.h_output, self.d_output, self.bindings = self._allocate_buffers()
        
        input_name = 'images'
        self.input_shape = self.engine.get_tensor_shape(input_name)
        
        print(f"[INFO] Segmentator TRT gata. Input shape: {self.input_shape}")
        fout.write(f"[INFO] Segmentator TRT gata. Input shape: {self.input_shape}\n")
        
    def _load_engine(self, engine_path):
        """ Încarcă și deserializează engine-ul TensorRT. """
        TRT_LOGGER = trt.Logger(trt.Logger.WARNING)
        try:
            with open(engine_path, "rb") as f:
                runtime = trt.Runtime(TRT_LOGGER)
                engine = runtime.deserialize_cuda_engine(f.read())
            if engine is None:
                raise RuntimeError("Engine could not be deserialized!")
            print(f"[INFO] Engine '{engine_path}' încărcat cu succes.")
            fout.write(f"[INFO] Engine '{engine_path}' încărcat cu succes.\n")
            return engine
        except Exception as e:
            print(f"[EROARE] Nu s-a putut încărca engine-ul: {e}")
            fout.write(f"[EROARE] Nu s-a putut încărca engine-ul: {e}\n")
            raise

    def _allocate_buffers(self):
        """ Alocă memorie CPU și GPU pentru toți tensorii I/O. """
        h_input, d_input = [], []
        h_output, d_output = [], []
        bindings = {}
        
        num_io_tensors = self.engine.num_io_tensors
        tensor_names = [self.engine.get_tensor_name(i) for i in range(num_io_tensors)]

        for name in tensor_names:
            mode = self.engine.get_tensor_mode(name)
            shape = self.engine.get_tensor_shape(name)
            dtype = trt.nptype(self.engine.get_tensor_dtype(name))
            
            size = trt.volume(shape) * dtype().itemsize
            
            # print(f"Tensor '{name}': mode={mode}, shape={shape}, dtype={dtype}")

            h_mem = np.ascontiguousarray(np.empty(shape, dtype=dtype))
            d_mem = cuda.mem_alloc(size)
            bindings[name] = int(d_mem)
            
            if mode == trt.TensorIOMode.INPUT:
                h_input.append(h_mem)
                d_input.append(d_mem)
            else:
                h_output.append(h_mem)
                d_output.append(d_mem)
        
        ordered_bindings = [bindings[name] for name in tensor_names]
                
        return h_input[0], d_input[0], h_output, d_output, ordered_bindings

    def infer(self):
        """ Rulează inferența pe GPU (sincron) și copiază rezultatele pe CPU. """
        
        start_time = time.time()
        
        # 1. Copiere input (Host -> Device) - ASINCRON
        cuda.memcpy_htod_async(self.d_input, self.h_input, self.stream)

        # 2. Sincronizare Stream (asigură că memcpy s-a terminat înainte de execute)
        self.stream.synchronize() 
        
        # 3. Rulează inference - SINCRON (execute_v2)
        self.context.execute_v2(bindings=self.bindings)

        # 4. Copiere output (Device -> Host) - ASINCRON
        for d_out, h_out in zip(self.d_output, self.h_output):
            cuda.memcpy_dtoh_async(h_out, d_out, self.stream)

        # 5. Așteaptă finalizarea operațiilor GPU
        self.stream.synchronize()

        end_time = time.time()
        print(f"[INFO] Timp inferență (GPU/Total): {(end_time - start_time) * 1000:.2f} ms")
        fout.write(f"[INFO] Timp inferență (GPU/Total): {(end_time - start_time) * 1000:.2f} ms\n")
        return self.h_output

def preprocess_frame(frame, input_shape):
    """
    Preprocesează un frame sau o imagine pentru TensorRT.
    """
    _, c, h, w = input_shape
    
    img_resized = cv2.resize(frame, (w, h))
    img_rgb = cv2.cvtColor(img_resized, cv2.COLOR_BGR2RGB)
    
    input_data = img_rgb.astype(np.float32) / 255.0
    input_data = np.transpose(input_data, (2, 0, 1))
    
    input_data = np.expand_dims(input_data, axis=0)
    
    return input_data

# =========================
# Rulare Principală
# =========================
if __name__ == "__main__":
    
    # Verifică dacă calea de intrare este validă
    if not os.path.exists(INPUT_PATH):
        print(f"[EROARE FATALĂ] Fișierul nu există la: {INPUT_PATH}")
        fout.write(f"[EROARE FATALĂ] Fișierul nu există la: {INPUT_PATH}\n")
        sys.exit(1)
        
    is_video = INPUT_PATH.lower().endswith(('.mp4', '.avi', '.mov', '.mkv'))
    
    try:
        # 1. Inițializare Engine
        seg_model = TRT_YoloSegmentator(ENGINE_PATH)
        input_shape = seg_model.input_shape
        
        
        def process_frame_and_visualize(frame_original):
            """ Funcție auxiliară pentru a procesa un singur cadru (valabilă și pentru imagini) """
            
            # Păstrează dimensiunile originale pentru post-procesare
            orig_shape = frame_original.shape[:2]

            # 1. Preprocesare (Încărcarea în buffer-ul de input al CPU)
            input_data = preprocess_frame(frame_original, input_shape)
            np.copyto(seg_model.h_input.ravel(), input_data.ravel())

            # 2. Rulare Inferență
            outputs = seg_model.infer()

            # 3. Post-procesare (Boxuri și Măști)
            final_boxes, final_class_ids, final_scaled_masks, final_scores = process_yolo_segmentation_output(
                outputs, orig_shape, input_shape, conf_threshold=0.35, iou_threshold=0.5
            )

            # 4. Afișare Consolă (Logică Detaliată)
            print("\n========================= DETALII REZULTATE =========================")
            fout.write("\n========================= DETALII REZULTATE =========================\n")
            print(f"Total obiecte detectate și filtrate: {len(final_boxes)}")
            fout.write(f"Total obiecte detectate și filtrate: {len(final_boxes)}\n")

            if len(final_boxes) > 0:
                for i, (box, class_id, score) in enumerate(zip(final_boxes, final_class_ids, final_scores)):
                    try:
                        class_name = CLASS_NAMES[class_id]
                    except IndexError:
                        class_name = f"Clasa necunoscută ({class_id})"

                    score_formatted = f"{score:.4f}" 
                    x1, y1, x2, y2 = box.astype(int)

                    print(f"--- Obiectul {i + 1} ---")
                    fout.write(f"--- Obiectul {i + 1} ---\n")
                    print(f"  Clasă: {class_name} (ID: {class_id})")
                    fout.write(f"  Clasă: {class_name} (ID: {class_id})\n")
                    print(f"  Încredere (Scor): {score_formatted}")
                    fout.write(f"  Încredere (Scor): {score_formatted}\n")
                    print(f"  Box (x1, y1, x2, y2): [{x1} {y1} {x2} {y2}]")
                    fout.write(f"  Box (x1, y1, x2, y2): [{x1} {y1} {x2} {y2}]\n")
            print("=====================================================================")
            fout.write("=====================================================================\n")

            # 5. Vizualizare (Logica CV2)
            if len(final_boxes) > 0:
                img_with_masks = frame_original.copy()
                alpha = 0.5 
                
                for box, class_id, mask, score in zip(final_boxes, final_class_ids, final_scaled_masks, final_scores):
                    
                    # Extrage Culoarea Unică pe baza ID-ului Clasei
                    current_color = COLOR_PALETTE[class_id % NUM_CLASSES] 
                    
                    # Aplică Masca
                    mask_indices = mask > 0
                    for c in range(3): # BGR
                        color_value = current_color[c] 
                        
                        img_with_masks[:, :, c][mask_indices] = (
                            img_with_masks[:, :, c][mask_indices] * (1 - alpha) + 
                            color_value * alpha # Aplică culoarea unică
                        )
                    
                    # Desenează Bounding Box (folosind current_color)
                    x1, y1, x2, y2 = box.astype(int)
                    cv2.rectangle(img_with_masks, (x1, y1), (x2, y2), current_color, 2)
                    
                    class_name = CLASS_NAMES[class_id]
                    label = f"{class_name} {score:.2f}" 
                    
                    # Pune Eticheta (folosind current_color)
                    cv2.putText(img_with_masks, label, (x1, y1 - 10), 
                                cv2.FONT_HERSHEY_SIMPLEX, 0.9, current_color, 2)
                    
                return img_with_masks
            
            return frame_original

        # ==============================================================
        # LOGICA DE COMUTARE: VIDEO sau IMAGINE
        # ==============================================================

        if is_video:
            # PROCESARE VIDEO
            cap = cv2.VideoCapture(INPUT_PATH)
            if not cap.isOpened():
                raise RuntimeError(f"Nu s-a putut deschide stream-ul video: {INPUT_PATH}")
                
            frame_count = 0
            while cap.isOpened():
                ret, frame_original = cap.read()
                if not ret: break

                frame_count += 1
                print(f"\n--- Procesare Cadru {frame_count} ---")
                fout.write(f"\n--- Procesare Cadru {frame_count} ---\n")
                
                # Procesează cadrul și obține imaginea cu măști
                img_result = process_frame_and_visualize(frame_original)
                
                cv2.imshow("YOLO Segmentation Result (Video)", img_result)
                    
                # Ieșire la apăsarea tastei 'q'
                if cv2.waitKey(1) & 0xFF == ord('q'):
                    break

            cap.release()
            cv2.destroyAllWindows()
            print("[INFO] Procesare video finalizată.")
            fout.write("[INFO] Procesare video finalizată.\n")
            
        else:
            # PROCESARE IMAGINE STATICĂ
            frame_original = cv2.imread(INPUT_PATH)
            if frame_original is None:
                 raise FileNotFoundError(f"Imaginea nu a putut fi citită: {INPUT_PATH}")
            
            print(f"\n[INFO] Procesare imagine: {INPUT_PATH}")
            fout.write(f"\n[INFO] Procesare imagine: {INPUT_PATH}\n")
            
            # Procesează imaginea și obține rezultatul
            img_result = process_frame_and_visualize(frame_original)
            
            # Afișează și așteaptă o tastă pentru a închide
            cv2.imshow("YOLO Segmentation Result (Image)", img_result)
            cv2.waitKey(0)
            cv2.destroyAllWindows()
            
    except FileNotFoundError as e:
        print(f"[EROARE FATALĂ] Fișierul nu a fost găsit: {e}")
        fout.write(f"[EROARE FATALĂ] Fișierul nu a fost găsit: {e}\n")
    except RuntimeError as e:
        print(f"[EROARE FATALĂ] Eroare la TensorRT sau Video: {e}")
        fout.write(f"[EROARE FATALĂ] Eroare la TensorRT sau Video: {e}\n")
    except Exception as e:
        print(f"[EROARE NEPREVĂZUTĂ] O eroare a apărut: {e}")
        fout.write(f"[EROARE NEPREVĂZUTĂ] O eroare a apărut: {e}\n")
        


