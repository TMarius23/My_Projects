#!/usr/bin/env python3
import rclpy 
from rclpy.node import Node

class MyNode(Node):
    
    def __init__(self):
        super().__init__("first_node")
        self.variable = 0
        self.create_timer(1.0, self.timmer_callback)
    
    def timmer_callback(self):
        self.get_logger().info("Hello " + str(self.variable))
        self.variable += 1

def main(args=None):
    rclpy.init(args=args)
    node = MyNode()
    rclpy.spin(node)
    rclpy.shutdown


if __name__ == '__main__':
    main()
