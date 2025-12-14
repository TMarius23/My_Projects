// src/utils.cpp
#include "utils.h"
#include <vector>
#include <string>
#include <cmath>     // pentru std::exp
#include <opencv2/opencv.hpp>
#include <NvInfer.h> // TensorRT


using namespace std;

class TRTLogger : public nvinfer1::ILogger {
public:
    void log(Severity severity, const char* msg) noexcept override {
        // filtrează unele mesaje dacă vrei
        if (severity == Severity::kINFO) {
            std::cout << "[TRT INFO] " << msg << std::endl;
        } else if (severity == Severity::kWARNING) {
            std::cout << "[TRT WARN] " << msg << std::endl;
        } else if (severity == Severity::kERROR) {
            std::cerr << "[TRT ERROR] " << msg << std::endl;
        } else {
            std::cout << "[TRT] " << msg << std::endl;
        }
    }
};

TRTLogger gLogger;

const std::vector<std::string> CLASS_NAMES = {
 "person","bicycle","car","motorcycle","airplane","bus","train","truck","boat",
 "traffic light","fire hydrant","stop sign","parking meter","bench","bird","cat","dog",
 "horse","sheep","cow","elephant","bear","zebra","giraffe","backpack","umbrella",
 "handbag","tie","suitcase","frisbee","skis","snowboard","sports ball","kite","baseball bat",
 "baseball glove","skateboard","surfboard","tennis racket","bottle","wine glass","cup",
 "fork","knife","spoon","bowl","banana","apple","sandwich","orange","broccoli","carrot",
 "hot dog","pizza","donut","cake","chair","couch","potted plant","bed","dining table",
 "toilet","tv","laptop","mouse","remote","keyboard","cell phone","microwave","oven",
 "toaster","sink","refrigerator","book","clock","vase","scissors","teddy bear","hair drier",
 "toothbrush"
};

void initializeColors(std::vector<cv::Scalar>& palette, const std::vector<std::string>& names) {
    palette.clear();
    for (size_t i = 0; i < names.size(); ++i) {
        int r = (int)((i * 37) % 256);
        int g = (int)((i * 91) % 256);
        int b = (int)((i * 53) % 256);
        palette.emplace_back(b, g, r);
    }
}

float sigmoid(float x) {
    return 1.0f / (1.0f + std::exp(-x));
}

