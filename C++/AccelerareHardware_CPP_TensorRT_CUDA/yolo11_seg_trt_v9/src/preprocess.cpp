#include "preprocess.h"
#include "utils.h" // Presupunem că aici ai definit checkCuda sau alte utilitare
#include <algorithm>
#include <cmath>

// Implementare simplă checkCuda în caz că nu e importată corect
#ifndef checkCuda
#define checkCuda(status, msg) do { \
    if (status != cudaSuccess) { \
        std::cerr << "CUDA Error: " << msg << " - " << cudaGetErrorString(status) << std::endl; \
        exit(EXIT_FAILURE); \
    } \
} while(0)
#endif

Preprocessor::Preprocessor(int width, int height) 
    : targetWidth_(width), targetHeight_(height) 
{
    // Calculăm mărimea necesară: 3 canale (RGB) * lățime * înălțime * mărimea unui float
    // Modelul așteaptă float-uri normalizate (0.0 - 1.0)
    size_t numPixels = targetWidth_ * targetHeight_;
    bufferSize_ = 3 * numPixels * sizeof(float);
    
    // --- OPTIMIZARE HARDWARE ---
    // Folosim cudaMallocHost în loc de 'new' sau 'malloc'.
    // Aceasta alocă "Pinned Memory" (Page-Locked Memory) pe RAM-ul sistemului.
    // GPU-ul poate citi din această memorie prin DMA (Direct Memory Access) mult mai rapid.
    cudaError_t err = cudaMallocHost((void**)&pinnedHostBuffer_, bufferSize_);
    
    if (err != cudaSuccess) {
        std::cerr << "[Preprocessor] EROARE FATALĂ: Nu s-a putut aloca Pinned Memory!" << std::endl;
        pinnedHostBuffer_ = nullptr;
    } else {
        std::cout << "[Preprocessor] Pinned Memory alocată cu succes (" << bufferSize_ << " bytes)." << std::endl;
    }
}

Preprocessor::~Preprocessor() {
    // Eliberăm memoria pinned folosind funcția specială CUDA
    if (pinnedHostBuffer_) {
        cudaFreeHost(pinnedHostBuffer_);
        pinnedHostBuffer_ = nullptr;
    }
}

void Preprocessor::preprocess(const cv::Mat& img, void* gpuBuffer) {
    if (!pinnedHostBuffer_) {
        std::cerr << "[Preprocessor] Eroare: Buffer nealocat." << std::endl;
        return;
    }

    int targetW = targetWidth_;
    int targetH = targetHeight_;
    
    // --- PASUL 1: LETTERBOX (Redimensionare cu păstrarea aspectului) ---
    int img_w = img.cols;
    int img_h = img.rows;
    
    // Calculăm factorul de scalare
    float r_w = (float)targetW / img_w;
    float r_h = (float)targetH / img_h;
    float ratio = std::min(r_w, r_h);
    
    // Dimensiunile imaginii redimensionate
    int scaled_w = (int)std::round(img_w * ratio);
    int scaled_h = (int)std::round(img_h * ratio);
    
    // Calculăm padding-ul necesar (pentru a centra imaginea)
    int dw = (targetW - scaled_w) / 2;
    int dh = (targetH - scaled_h) / 2;

    // Redimensionăm imaginea originală
    cv::Mat resized;
    if (scaled_w != img_w || scaled_h != img_h) {
        cv::resize(img, resized, cv::Size(scaled_w, scaled_h), 0, 0, cv::INTER_LINEAR);
    } else {
        resized = img;
    }
    
    // Adăugăm margini gri (culoarea 114 este standard YOLO) pentru a umple până la 640x640
    cv::Mat padded;
    cv::copyMakeBorder(resized, padded, 
                       dh, targetH - scaled_h - dh, 
                       dw, targetW - scaled_w - dw, 
                       cv::BORDER_CONSTANT, cv::Scalar(114, 114, 114));

    // --- PASUL 2: HWC -> CHW, BGR -> RGB și Normalizare (0-1) ---
    // Imaginea 'padded' este în format BGR Interleaved (B,G,R, B,G,R...)
    // TensorRT așteaptă format Planar RGB (RRR..., GGG..., BBB...) și float.
    
    // Scriem direct în buffer-ul pinned pentru viteză
    int area = targetW * targetH;
    
    float* destR = pinnedHostBuffer_;          // Începutul canalului R
    float* destG = pinnedHostBuffer_ + area;   // Începutul canalului G
    float* destB = pinnedHostBuffer_ + 2*area; // Începutul canalului B

    // Iterăm prin imagine și facem conversia manual
    // Această metodă este mai eficientă decât cv::split + cv::convertTo
    for (int y = 0; y < targetH; ++y) {
        const uchar* rowPtr = padded.ptr<uchar>(y); // Pointer la rândul curent
        for (int x = 0; x < targetW; ++x) {
            // OpenCV stochează pixelii ca BGR
            uchar b = rowPtr[x * 3 + 0];
            uchar g = rowPtr[x * 3 + 1];
            uchar r = rowPtr[x * 3 + 2];

            // Scriem planurile separate normalizate
            int idx = y * targetW + x;
            
            destR[idx] = r / 255.0f;
            destG[idx] = g / 255.0f;
            destB[idx] = b / 255.0f;
        }
    }

    // --- PASUL 3: COPIERE PE GPU ---
    // Copiem din Pinned Memory pe Device (GPU). Driver-ul optimizează acest transfer.
    checkCuda(cudaMemcpy(gpuBuffer, pinnedHostBuffer_, bufferSize_, cudaMemcpyHostToDevice), "preprocess memcpy");
}
