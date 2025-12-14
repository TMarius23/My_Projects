from ultralytics import YOLO


model = YOLO("yolo11n-seg.pt")



results = model("/home/mmp/Desktop/TMarius_YoloV11/bus.jpg", save=True, imgsz=640, conf=0.25, iou=0.45, device=0)


