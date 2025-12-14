#pragma once
#include <opencv2/opencv.hpp>
#include <cuda_runtime.h>

class Preprocessor {
public:
    Preprocessor(int width, int height);
    ~Preprocessor();
    void preprocess(const cv::Mat& img, void* gpuOutputBuffer);

private:
    int targetWidth_;
    int targetHeight_;
    unsigned char* d_src_ = nullptr; 
    size_t d_src_size_ = 0;
};
