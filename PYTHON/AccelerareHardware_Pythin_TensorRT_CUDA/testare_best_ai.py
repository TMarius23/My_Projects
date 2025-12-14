from ultralytics import YOLO

model = YOLO("runs/detect/train/weights/best.pt")

results = model(
    "/home/mmp/Desktop/TMarius_YoloV11/video.mp4",
    save=True,
    imgsz=640,
    conf=0.25,
    device=0
)

