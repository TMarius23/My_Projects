#pragma once
#include <vector>
#include <opencv2/opencv.hpp>

struct Detection {
    int class_id;
    float confidence;
    cv::Rect box;
    cv::Mat mask;                 
    std::vector<float> maskCoeffs;
};

class EngineLoader; 

void postprocess(EngineLoader& loader, 
                 int original_w, int original_h, 
                 std::vector<Detection>& output,
                 const std::vector<cv::Scalar>& colors,
                 float confThreshold = 0.25,
                 float nmsThreshold = 0.45);
