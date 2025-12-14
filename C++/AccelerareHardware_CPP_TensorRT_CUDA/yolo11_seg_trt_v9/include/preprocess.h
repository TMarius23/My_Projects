#pragma once

#include <opencv2/opencv.hpp>
#include <cuda_runtime_api.h>
#include <iostream>

class Preprocessor {
public:
    // Constructorul va aloca memoria pinned
    Preprocessor(int width, int height);
    
    // Destructorul va elibera memoria
    ~Preprocessor();

    // Funcția principală care pregătește imaginea și o trimite pe GPU
    void preprocess(const cv::Mat& img, void* gpuBuffer);

private:
    int targetWidth_;
    int targetHeight_;
    
    // Pointer către memoria de pe CPU, dar "pinned" (page-locked)
    // Transferul din acest buffer către GPU este de 2-3 ori mai rapid
    float* pinnedHostBuffer_ = nullptr; 
    
    size_t bufferSize_;
};
