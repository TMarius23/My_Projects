import rclpy
from rclpy.node import Node
from sensor_msgs.msg import Image
from cv_bridge import CvBridge
import cv2
import time


VIDEO_PATH = "/home/mmp/Desktop/TMarius_YoloV11/Cars Moving On Road Stock Footage - Free Download.mp4"
TOPIC_NAME = "/image_raw"


class VideoPublisher(Node):
    def __init__(self):
        super().__init__('video_publisher')
        self.publisher_ = self.create_publisher(Image, TOPIC_NAME, 10)
        self.timer = self.create_timer(0.033, self.timer_callback) # ~30 FPS
        self.cap = cv2.VideoCapture(VIDEO_PATH)
        self.bridge = CvBridge()
        print(f"Streaming video: {VIDEO_PATH}")

    def timer_callback(self):
        ret, frame = self.cap.read()
        if ret:
            msg = self.bridge.cv2_to_imgmsg(frame, encoding="bgr8")
            self.publisher_.publish(msg)
        else:
            print("Video terminat. Repornire...")
            self.cap.set(cv2.CAP_PROP_POS_FRAMES, 0)

def main(args=None):
    rclpy.init(args=args)
    node = VideoPublisher()
    rclpy.spin(node)
    node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
