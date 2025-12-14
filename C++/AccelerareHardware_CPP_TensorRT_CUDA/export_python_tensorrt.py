import torch
from ultralytics import YOLO
import sys

# 1. Verificăm disponibilitatea CUDA și eliberăm memoria cache
print("--- Verificare și inițializare ---")
if not torch.cuda.is_available():
    print("Eroare: Dispozitivul CUDA nu este disponibil. TensorRT Engine nu poate fi construit.")
    sys.exit(1)

# Eliberăm memoria cache nefolosită
torch.cuda.empty_cache()
print("Memoria cache a GPU a fost eliberată. Se încarcă modelul...")

# 2. Încărcarea modelului
try:
    # Asigurați-vă că numele modelului este corect. 
    # Dacă ați rulat deja o dată, fișierul 'yolo11n-seg.pt' ar trebui să fie local.
    model = YOLO("yolo11n-seg.pt")
    print(f"Modelul '{model.model_name}' (segmentare) a fost încărcat cu succes.")
except Exception as e:
    print(f"Eroare la încărcarea modelului: {e}")
    sys.exit(1)


# 3. Exportul către TensorRT Engine
try:
    print("\n--- Începe exportul la TensorRT Engine (FP16/Half-Precision) ---")
    
    # Parametri:
    # format="engine": specifică TensorRT Engine
    # device=0: folosește primul dispozitiv CUDA (Orin GPU)
    # half=True: folosește precizia de 16 biți (FP16) - esențial pentru performanța și memoria pe Orin
    
    exported_model_path = model.export(
        format="engine", 
        device=0, 
        half=True,
        # Adăugarea unei dimensiuni de intrare fixe, de ex. 640, poate ajuta la stabilitate
        imgsz=640 
    )
    
    print("\n*** Export reușit! ***")
    print(f"Fișierul TensorRT Engine a fost salvat la: {exported_model_path}")

except RuntimeError as e:
    if "CUBLAS_STATUS_ALLOC_FAILED" in str(e):
        print("\n!!! EROARE CRITICĂ - CUBLAS_STATUS_ALLOC_FAILED !!!")
        print("Modelul nu a putut fi exportat din cauza lipsei de memorie GPU.")
        print("SOLUȚII:")
        print("1. Rulați `sudo reboot` pentru a reporni sistemul Orin și a elibera VRAM-ul.")
        print("2. Asigurați-vă că NICIUN alt proces (servere de inferență, alte scripturi Python) nu rulează pe GPU.")
    else:
        print(f"\nEroare în timpul exportului: {e}")
        
# 4. Eliberarea finală a memoriei (deși nu va ajuta dacă a eșuat)
torch.cuda.empty_cache()
