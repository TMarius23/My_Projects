from ultralytics import YOLO

# încarcă modelul YOLOv11 cu segmentare (ex: yolo11n-seg.pt)
model = YOLO("yolo11n-seg.pt")

# exportă direct ONNX
model.export(format="onnx", opset=17, imgsz=640)

