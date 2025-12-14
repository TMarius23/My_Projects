from ultralytics import YOLO

model = YOLO("yolo11n-seg.pt")
model.export(format="engine", device=0)

