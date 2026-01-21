#include <rclcpp/rclcpp.hpp>
#include <std_msgs/msg/string.hpp>
#include <fstream>
#include <iostream>
#include <chrono>
#include <ctime>

const std::string LOG_FILE_PATH = "/home/mmp/Desktop/detections_log.txt";

class DataLoggerNode : public rclcpp::Node {
public:
    DataLoggerNode() : Node("data_logger_node") {
        log_file_.open(LOG_FILE_PATH, std::ios::out | std::ios::app);
        
        if (!log_file_.is_open()) {
            RCLCPP_ERROR(this->get_logger(), "Nu pot deschide fisierul: %s", LOG_FILE_PATH.c_str());
        } else {
            RCLCPP_INFO(this->get_logger(), "Salvare date in: %s", LOG_FILE_PATH.c_str());
            log_file_ << "--- SESIUNE NOUA ---" << std::endl;
        }

        subscription_ = this->create_subscription<std_msgs::msg::String>(
            "/yolo/coordinates", 10, 
            std::bind(&DataLoggerNode::topic_callback, this, std::placeholders::_1));
    }

    ~DataLoggerNode() {
        if (log_file_.is_open()) {
            log_file_.close();
        }
    }

private:
    void topic_callback(const std_msgs::msg::String::SharedPtr msg) {
        if (!log_file_.is_open()) return;

        auto now = std::chrono::system_clock::now();
        std::time_t now_time = std::chrono::system_clock::to_time_t(now);

        std::string time_str = std::ctime(&now_time);
        time_str.pop_back(); 

        log_file_ << "[" << time_str << "] " << msg->data << std::endl;
    }

    std::ofstream log_file_;
    rclcpp::Subscription<std_msgs::msg::String>::SharedPtr subscription_;
};

int main(int argc, char * argv[]) {
    rclcpp::init(argc, argv);
    rclcpp::spin(std::make_shared<DataLoggerNode>());
    rclcpp::shutdown();
    return 0;
}
