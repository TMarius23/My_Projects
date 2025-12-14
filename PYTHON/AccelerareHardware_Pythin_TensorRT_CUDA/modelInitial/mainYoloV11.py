from ultralytics import YOLO


model = YOLO("yolo11n-seg.pt")


results = model(data="bus.jpg", epochs=100, imgsz=640, save = True, show = True)
