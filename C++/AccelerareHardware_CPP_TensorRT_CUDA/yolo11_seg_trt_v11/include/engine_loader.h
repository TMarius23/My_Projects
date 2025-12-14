#pragma once
#include <NvInfer.h>
#include <cuda_runtime_api.h>
#include <memory>
#include <vector>
#include <string>
#include <iostream>
#include "utils.h"


struct Buffer {
    void* device_ptr = nullptr;
    size_t size = 0;
    bool isInput = false;
    std::string name;
    nvinfer1::Dims dims;
};

inline void checkCuda(cudaError_t result, const char* func = "") {
    if (result != cudaSuccess) {
        std::cerr << "CUDA Error at " << func << ": " << cudaGetErrorString(result) << std::endl;
        std::exit(EXIT_FAILURE);
    }
}

class EngineLoader {
public:
    int getInputBindingIndex() const;
    EngineLoader() = default;
    ~EngineLoader();

    bool loadEngine(const std::string& engineFile);
    void allocateBuffers();
    nvinfer1::IExecutionContext* getContext() { return context_.get(); }
    nvinfer1::ICudaEngine* getEngine() { return engine_.get(); }
    std::vector<Buffer>& getBindings() { return bindings_; }
    bool infer();

private:
    std::unique_ptr<nvinfer1::ICudaEngine> engine_{nullptr};
    std::unique_ptr<nvinfer1::IExecutionContext> context_{nullptr};
    std::vector<Buffer> bindings_;
};

