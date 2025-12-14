#include "preprocess.h"
#include <cuda_runtime.h>
#include <algorithm>
#include <cmath>
#include <iostream>
#include <vector>

#define CHECK_CUDA(call) { \
    cudaError_t err = call; \
    if (err != cudaSuccess) { \
        std::cerr << "CUDA Error in " << __FILE__ << ":" << __LINE__ << " - " \
                  << cudaGetErrorString(err) << std::endl; \
        exit(1); \
    } \
}

extern "C" void launch_preprocess(
    const unsigned char* src, float* dst, 
    int srcW, int srcH, int srcStep, 
    int dstW, int dstH,
    float scale, int padX, int padY,
    cudaStream_t stream
);


void saveDebugImage(float* gpuBuffer, int width, int height, const std::string& filename) {
    int size = width * height * 3;
    std::vector<float> hostData(size);
    
    CHECK_CUDA(cudaMemcpy(hostData.data(), gpuBuffer, size * sizeof(float), cudaMemcpyDeviceToHost));
    
    cv::Mat debugImg(height, width, CV_8UC3);
    int area = width * height;
    
    for (int y = 0; y < height; ++y) {
        for (int x = 0; x < width; ++x) {
            int idx = y * width + x;
            float r = hostData[idx];
            float g = hostData[idx + area];
            float b = hostData[idx + 2 * area];
            
            debugImg.at<cv::Vec3b>(y, x)[0] = (uchar)(b * 255.0f);
            debugImg.at<cv::Vec3b>(y, x)[1] = (uchar)(g * 255.0f);
            debugImg.at<cv::Vec3b>(y, x)[2] = (uchar)(r * 255.0f);
        }
    }
    cv::imwrite(filename, debugImg);
    std::cout << "[DEBUG] Imagine salvata: " << filename << std::endl;
}

Preprocessor::Preprocessor(int width, int height) 
    : targetWidth_(width), targetHeight_(height) 
{
    d_src_size_ = 1920 * 1080 * 3 * sizeof(unsigned char);
    CHECK_CUDA(cudaMalloc(&d_src_, d_src_size_));
}

Preprocessor::~Preprocessor() {
    if (d_src_) cudaFree(d_src_);
}

static bool debugSaved = false;

void Preprocessor::preprocess(const cv::Mat& img, void* gpuOutputBuffer) {
    if (img.empty()) {
        std::cerr << "ERROARE: Imaginea de intrare e goala!" << std::endl;
        return;
    }

    size_t imgSize = img.total() * img.elemSize();
    if (imgSize > d_src_size_) {
        CHECK_CUDA(cudaFree(d_src_));
        d_src_size_ = imgSize;
        CHECK_CUDA(cudaMalloc(&d_src_, d_src_size_));
    }

    CHECK_CUDA(cudaMemcpy(d_src_, img.data, imgSize, cudaMemcpyHostToDevice));

    float r_w = (float)targetWidth_ / img.cols;
    float r_h = (float)targetHeight_ / img.rows;
    float scale = std::min(r_w, r_h);
    
    int new_unpad_w = (int)std::round(img.cols * scale);
    int new_unpad_h = (int)std::round(img.rows * scale);
    int dw = (targetWidth_ - new_unpad_w) / 2;
    int dh = (targetHeight_ - new_unpad_h) / 2;


    static bool firstRun = true;
    if (firstRun) {
        std::cout << "[Preprocessor] Scale: " << scale << " PadX: " << dw << " PadY: " << dh << std::endl;
        firstRun = false;
    }

    launch_preprocess(
        d_src_, 
        (float*)gpuOutputBuffer, 
        img.cols, img.rows, (int)img.step, 
        targetWidth_, targetHeight_, 
        scale, dw, dh,
        0
    );
    
    /**
    if (!debugSaved) {
        CHECK_CUDA(cudaDeviceSynchronize());
        saveDebugImage((float*)gpuOutputBuffer, targetWidth_, targetHeight_, "../output/debug_gpu_view.jpg");
        debugSaved = true;
    }
    */
}
