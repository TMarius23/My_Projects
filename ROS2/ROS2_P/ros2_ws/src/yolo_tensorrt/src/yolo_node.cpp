#include <rclcpp/rclcpp.hpp>
#include <sensor_msgs/msg/image.hpp>
#include <std_msgs/msg/string.hpp> 
#include <cv_bridge/cv_bridge.h>
#include <image_transport/image_transport.hpp>
#include "engine_loader.h"
#include "preprocess.h"
#include "postprocess.h"
#include "utils.h"

// Modifică calea dacă e nevoie
const std::string ENGINE_PATH = "/home/mmp/Desktop/TMarius_YoloV11/ROS2_P/yolo11n-seg.engine";
const float CONF_THRESH = 0.40;
const float NMS_THRESH = 0.45;

extern const std::vector<std::string> CLASS_NAMES;
extern void initializeColors(std::vector<cv::Scalar>& palette, const std::vector<std::string>& names);

class YoloNode : public rclcpp::Node {
public:
    YoloNode() : Node("yolo_tensorrt_node") {
        // 1. Inițializare TensorRT
        RCLCPP_INFO(this->get_logger(), "Loading Engine: %s", ENGINE_PATH.c_str());
        if (!loader_.loadEngine(ENGINE_PATH)) {
            RCLCPP_ERROR(this->get_logger(), "Failed to load engine!");
            throw std::runtime_error("Engine load failed");
        }
        loader_.allocateBuffers();
        
        // 2. Inițializare Preprocesor & Culori
        preprocessor_ = std::make_unique<Preprocessor>(640, 640);
        initializeColors(colors_, CLASS_NAMES);
        
        int inputIndex = loader_.getInputBindingIndex();
        gpu_input_buffer_ = loader_.getBindings()[inputIndex].device_ptr;

        // 3. Configurare ROS
        subscription_ = this->create_subscription<sensor_msgs::msg::Image>(
            "/image_raw", 10, std::bind(&YoloNode::image_callback, this, std::placeholders::_1));

        // Publisher Imagine
        publisher_ = this->create_publisher<sensor_msgs::msg::Image>("/yolo/result", 10);
        

        // Publicăm pe topicul "/yolo/coordinates"
        box_publisher_ = this->create_publisher<std_msgs::msg::String>("/yolo/coordinates", 10);

        RCLCPP_INFO(this->get_logger(), "YOLO Node Ready!");
    }

private:
    void image_callback(const sensor_msgs::msg::Image::SharedPtr msg) {
        cv::Mat frame;
        try {
            frame = cv_bridge::toCvCopy(msg, "bgr8")->image;
        } catch (cv_bridge::Exception& e) {
            RCLCPP_ERROR(this->get_logger(), "cv_bridge exception: %s", e.what());
            return;
        }

        if (frame.empty()) return;

        // Pipeline AI
        preprocessor_->preprocess(frame, gpu_input_buffer_);

        if (!loader_.infer()) {
            RCLCPP_WARN(this->get_logger(), "Inference failed");
            return;
        }

        std::vector<Detection> detections;
        postprocess(loader_, frame.cols, frame.rows, detections, colors_, CONF_THRESH, NMS_THRESH);


        publish_coordinates(detections, msg->header);

        // Visualizare și Publicare Imagine
        draw_detections(frame, detections);
        sensor_msgs::msg::Image::SharedPtr out_msg = cv_bridge::CvImage(msg->header, "bgr8", frame).toImageMsg();
        publisher_->publish(*out_msg);
    }

    // Funcție nouă pentru a formata și trimite datele text
    void publish_coordinates(const std::vector<Detection>& detections, const std_msgs::msg::Header& header) {
        std_msgs::msg::String msg;
        std::stringstream ss;
        
        // Formatăm un string CSV: "class_id,confidence,x,y,w,h;class_id,..."
        for (const auto& det : detections) {
            ss << det.class_id << "," 
               << std::fixed << std::setprecision(2) << det.confidence << ","
               << det.box.x << "," << det.box.y << "," 
               << det.box.width << "," << det.box.height << ";";
        }

        msg.data = ss.str();
        box_publisher_->publish(msg);
    }

    void draw_detections(cv::Mat& img, const std::vector<Detection>& detections) {
        cv::Mat maskOverlay = img.clone();
        bool masksDrawn = false;

        for (const auto& det : detections) {
            if (det.class_id < 0 || det.class_id >= colors_.size()) continue;
            cv::Scalar color = colors_[det.class_id];

            if (!det.mask.empty()) {
                cv::Rect box = det.box & cv::Rect(0, 0, img.cols, img.rows);
                if (box.area() > 0) {
                    cv::Mat roi = maskOverlay(box);
                    cv::Mat maskBin = det.mask;
                    if (maskBin.size() != box.size()) cv::resize(maskBin, maskBin, box.size(), 0, 0, cv::INTER_NEAREST);
                    cv::Mat colorRect(roi.size(), CV_8UC3, color);
                    colorRect.copyTo(roi, maskBin);
                    masksDrawn = true;
                }
            }
            cv::rectangle(img, det.box, color, 2);
        }
        if (masksDrawn) cv::addWeighted(img, 0.6, maskOverlay, 0.4, 0.0, img);
    }

    // Membri
    EngineLoader loader_;
    std::unique_ptr<Preprocessor> preprocessor_;
    void* gpu_input_buffer_ = nullptr;
    std::vector<cv::Scalar> colors_;

    rclcpp::Subscription<sensor_msgs::msg::Image>::SharedPtr subscription_;
    rclcpp::Publisher<sensor_msgs::msg::Image>::SharedPtr publisher_;
    rclcpp::Publisher<std_msgs::msg::String>::SharedPtr box_publisher_;
};

int main(int argc, char * argv[]) {
    rclcpp::init(argc, argv);
    rclcpp::spin(std::make_shared<YoloNode>());
    rclcpp::shutdown();
    return 0;
}
