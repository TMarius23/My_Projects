#pragma once
#include <cuda_runtime.h>
#include <iostream>
#include <chrono>
#include <string>
#include <vector>
#include <string>
#include <cmath>     // pentru std::exp
#include <opencv2/opencv.hpp>
#include <NvInfer.h> // TensorRT


extern const std::vector<std::string> CLASS_NAMES;

void initializeColors(std::vector<cv::Scalar>& palette, const std::vector<std::string>& names);
float sigmoid(float x);

inline void checkCuda(cudaError_t status, const std::string& msg = "") {
    if (status != cudaSuccess) {
        std::cerr << "CUDA Error: " << cudaGetErrorString(status);
        if (!msg.empty()) std::cerr << " | " << msg;
        std::cerr << std::endl;
        exit(EXIT_FAILURE);
    }
}

class Timer {
public:
    Timer() { start_ = std::chrono::high_resolution_clock::now(); }

    void reset() { start_ = std::chrono::high_resolution_clock::now(); }

    double elapsed() const {
        auto end = std::chrono::high_resolution_clock::now();
        std::chrono::duration<double, std::milli> diff = end - start_;
        return diff.count();
    }

private:
    std::chrono::high_resolution_clock::time_point start_;
};

