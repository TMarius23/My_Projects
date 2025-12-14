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
ENGINE_PATH = "yolo11n-seg.engine" 
IMAGE_PATH = "bus.jpg"   

# =========================
# Clasa pentru Inferența TensorRT
# =========================
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
        
def postprocess_segmentation(outputs):
    """
    Funcție simulată de post-procesare pentru a ilustra accesul la output-uri.
    
    Aici ar trebui implementată logica completă YOLO: NMS, combinarea
    coeficienților de mască cu proto-măștile și redimensionarea măștilor.
    """
    if len(outputs) < 2:
        print("[AVERTISMENT] Engine-ul trebuie să aibă cel puțin 2 output-uri pentru detecție și segmentare.")
        return None, None

    # Conform log-ului dvs.:
    # outputs[0] (output0): Detections (Box, Score, Clasă, Coeficienți Mască) - (1, 116, 8400)
    # outputs[1] (output1): Proto Masks (Măști brute H x W) - (1, 32, 160, 160)
    
    detections = outputs[0] 
    proto_masks = outputs[1]
    
    print("\n[INFO] Detalii output pentru post-procesare:")
    print(f"  Detecții/Boxuri shape: {detections.shape}")
    print(f"  Proto Măști shape: {proto_masks.shape}")

    # Aici ar trebui să înceapă logica reală de NMS.
    # Ex: Extragerea coeficienților de mască (ultimele 32 de coloane din detections)
    # mask_coefficients = detections[:, 8400, -32:] 
    
    print("[SUCCES] Datele brute de inferență sunt disponibile.")
    print("Pasul următor: Implementarea logicii de NMS și generare mască reală.")
    
    # Returnăm array-urile brute pentru a fi procesate
    return detections, proto_masks 

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
        
        # 3. Rulare Inferență
        outputs = seg_model.infer()
        
        # 4. Post-procesare
        final_detections, final_masks = postprocess_segmentation(outputs)
        

    except FileNotFoundError as e:
        print(f"[EROARE FATALĂ] Imagine sau Engine negăsit: {e}")
    except RuntimeError as e:
        print(f"[EROARE FATALĂ] Eroare la TensorRT: {e}")
    except Exception as e:
        print(f"[EROARE NEPREVĂZUTĂ] O eroare a apărut: {e}")
