#pragma once
#include <opencv2/opencv.hpp>
#include "engine_loader.h"
#include <vector>
#include "utils.h"

struct Detection {
    int class_id;
    float confidence;
    cv::Rect box;
    cv::Mat mask;
};

void postprocess(EngineLoader& loader, int input_w, int input_h,
                 std::vector<Detection>& output,
                 const std::vector<cv::Scalar>& colors,
                 float confThreshold = 0.25,  
                 float nmsThreshold = 0.45); 
