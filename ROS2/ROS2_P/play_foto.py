import rclpy
from rclpy.node import Node
from sensor_msgs.msg import Image
from cv_bridge import CvBridge
import cv2
import time
import os


IMAGE_PATH = "/home/mmp/Desktop/TMarius_YoloV11/bus.jpg"
TOPIC_NAME = "/image_raw"


class ImagePublisher(Node):
    def __init__(self):
        super().__init__('image_publisher')
        self.publisher_ = self.create_publisher(Image, TOPIC_NAME, 10)
        
        if not os.path.exists(IMAGE_PATH):
            self.get_logger().error(f"Fisierul nu exista: {IMAGE_PATH}")
            exit(1)
            
        self.frame = cv2.imread(IMAGE_PATH)
        
        if self.frame is None:
            self.get_logger().error(f"Nu am putut citi imaginea cu OpenCV: {IMAGE_PATH}")
            exit(1)
            
        self.bridge = CvBridge()
        
        self.timer = self.create_timer(0.033, self.timer_callback)
        self.get_logger().info(f"Publicare imagine statica: {IMAGE_PATH}")

    def timer_callback(self):
        msg = self.bridge.cv2_to_imgmsg(self.frame, encoding="bgr8")
        self.publisher_.publish(msg)

def main(args=None):
    rclpy.init(args=args)
    node = ImagePublisher()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        rclpy.shutdown()

if __name__ == '__main__':
    main()
