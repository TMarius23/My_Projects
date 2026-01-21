// src/postprocess.cpp
#include "postprocess.h"
#include "engine_loader.h"
#include "utils.h"

#include <cuda_runtime_api.h>
#include <opencv2/opencv.hpp>
#include <algorithm>
#include <cmath>
#include <iostream>
#include <vector>


extern float sigmoid(float x);
extern void checkCuda(cudaError_t, const std::string&);

static const int NUM_CLASSES = 80;
static const int NUM_MASKS   = 32;    
static const float INFERENCE_SIZE = 640.0f; 

static float calculate_iou(const cv::Rect& box1, const cv::Rect& box2) {
    cv::Rect inter = box1 & box2;
    float inter_area = inter.area();
    float union_area = box1.area() + box2.area() - inter_area;
    if (union_area <= 0) return 0.0f;
    return inter_area / union_area;
}

void postprocess(EngineLoader& loader,
                 int original_w, int original_h,
                 std::vector<Detection>& output,
                 const std::vector<cv::Scalar>& colors,
                 float confThreshold,
                 float nmsThreshold)
{
    output.clear();
    auto& bindings = loader.getBindings();

    // 1. Identificare Bindings
    int detIndex = -1, maskIndex = -1;
    for (size_t i = 0; i < bindings.size(); ++i) {
        auto dims = loader.getEngine()->getTensorShape(loader.getEngine()->getIOTensorName(i));
        if (dims.nbDims == 3) detIndex = i;       // [1, 116, 8400]
        else if (dims.nbDims == 4) maskIndex = i; // [1, 32, 160, 160]
    }

    if (detIndex < 0 || maskIndex < 0) {
        std::cerr << "FATAL: Output bindings not found.\n";
        return;
    }

    // Informații tensori
    auto detDims = loader.getEngine()->getTensorShape(loader.getEngine()->getIOTensorName(detIndex));
    auto maskDims = loader.getEngine()->getTensorShape(loader.getEngine()->getIOTensorName(maskIndex));

    int numChannels = detDims.d[1];
    int numAnchors  = detDims.d[2];
    bool isOutputTransposed = true; // [1, 116, 8400]
    
    if (numChannels > numAnchors) {
        std::swap(numChannels, numAnchors);
        isOutputTransposed = false;
    }

    // Proto masks: [1, 32, 160, 160]
    int protoC = maskDims.d[1]; // 32
    int protoH = maskDims.d[2]; // 160
    int protoW = maskDims.d[3]; // 160

    // 2. Download GPU -> CPU
    std::vector<float> hostDet(bindings[detIndex].size / sizeof(float));
    std::vector<float> hostMask(bindings[maskIndex].size / sizeof(float));
    
    checkCuda(cudaMemcpy(hostDet.data(), bindings[detIndex].device_ptr, bindings[detIndex].size, cudaMemcpyDeviceToHost), "Memcpy det");
    checkCuda(cudaMemcpy(hostMask.data(), bindings[maskIndex].device_ptr, bindings[maskIndex].size, cudaMemcpyDeviceToHost), "Memcpy mask");

    // 3. Parametri Scalare
    float r_w = INFERENCE_SIZE / (float)original_w;
    float r_h = INFERENCE_SIZE / (float)original_h;
    float ratio = std::min(r_w, r_h);
    float dw = (INFERENCE_SIZE - (float)original_w * ratio) * 0.5f; 
    float dh = (INFERENCE_SIZE - (float)original_h * ratio) * 0.5f; 

    // 4. Pregătire Proto-Măști (Matrici OpenCV)
    // Facem asta o singură dată per frame
    std::vector<cv::Mat> protoMats;
    protoMats.reserve(protoC);
    for (int c = 0; c < protoC; ++c) {
        float* p = hostMask.data() + c * protoH * protoW;
        protoMats.emplace_back(protoH, protoW, CV_32FC1, p);
    }

    // 5. PARSARE CANDIDAȚI (Fără generare de mască încă!)
    std::vector<Detection> candidates;
    candidates.reserve(500); // Rezervăm memorie să evităm realocările

    for (int i = 0; i < numAnchors; ++i) {
        auto getVal = [&](int c) -> float {
            return isOutputTransposed ? hostDet[c * numAnchors + i] : hostDet[i * numChannels + c];
        };

        float maxClassScore = -FLT_MAX;
        int bestClassId = -1;
        
        for (int c = 0; c < NUM_CLASSES; ++c) {
            float score = getVal(4 + c); 
            if (score > maxClassScore) {
                maxClassScore = score;
                bestClassId = c;
            }
        }

        float confidence = maxClassScore; 
        if (confidence > 1.0f || confidence < 0.0f) confidence = sigmoid(confidence);

        if (confidence < confThreshold) continue;


        float cx = getVal(0);
        float cy = getVal(1);
        float w  = getVal(2);
        float h  = getVal(3);

        // Salvare Coeficienți Mască (doar copiem 32 de float-uri, foarte rapid)
        std::vector<float> coeffs(NUM_MASKS);
        for (int m = 0; m < NUM_MASKS; ++m) {
            coeffs[m] = getVal(4 + NUM_CLASSES + m);
        }

        // Conversie coordonate la imaginea originală
        float x_unpad = cx - dw;
        float y_unpad = cy - dh;
        
        // Coordonate finale
        int left   = (int)((x_unpad - w * 0.5f) / ratio);
        int top    = (int)((y_unpad - h * 0.5f) / ratio);
        int width  = (int)(w / ratio);
        int height = (int)(h / ratio);

        cv::Rect box(left, top, width, height);
        box &= cv::Rect(0, 0, original_w, original_h);
        
        if (box.area() > 0) {
            Detection det;
            det.class_id = bestClassId;
            det.confidence = confidence;
            det.box = box;
            det.maskCoeffs = coeffs; // Salvăm coeficienții pentru mai târziu
            candidates.push_back(det);
        }
    }

    // 6. NMS (Non-Maximum Suppression)
    // Sortăm descrescător după confidență
    std::sort(candidates.begin(), candidates.end(), [](const Detection& a, const Detection& b){
        return a.confidence > b.confidence;
    });

    std::vector<Detection> finalDetections;
    finalDetections.reserve(candidates.size());

    // Algoritm NMS simplu O(N^2) - dar N e mic acum
    std::vector<bool> isSuppressed(candidates.size(), false);
    for (size_t i = 0; i < candidates.size(); ++i) {
        if (isSuppressed[i]) continue;

        finalDetections.push_back(candidates[i]); // Acceptăm candidatul

        for (size_t j = i + 1; j < candidates.size(); ++j) {
            if (isSuppressed[j]) continue;
            if (candidates[i].class_id != candidates[j].class_id) continue; // Doar aceeași clasă

            if (calculate_iou(candidates[i].box, candidates[j].box) > nmsThreshold) {
                isSuppressed[j] = true;
            }
        }
    }

    // 7. GENERARE MASTI (Doar pentru supraviețuitori!)
    for (auto& det : finalDetections) {
        // a. Combinare liniară: Proto * Coeffs
        cv::Mat mask_proto = cv::Mat::zeros(protoH, protoW, CV_32FC1);
        for (int c = 0; c < NUM_MASKS; ++c) {
            mask_proto += protoMats[c] * det.maskCoeffs[c];
        }

        // b. Sigmoid
        cv::exp(-mask_proto, mask_proto);
        mask_proto = 1.0f / (1.0f + mask_proto);

        // c. Rescale la 640x640
        cv::Mat mask640;
        cv::resize(mask_proto, mask640, cv::Size((int)INFERENCE_SIZE, (int)INFERENCE_SIZE));

        // d. Crop la Box-ul detecției (în spațiul 640x640 cu padding)
        // Recalculăm coordonatele box-ului în spațiul 640p pentru crop corect
        // det.box este în coordonate originale. Trebuie să mergem invers spre 640p.
        int x_pad = (int)(det.box.x * ratio + dw);
        int y_pad = (int)(det.box.y * ratio + dh);
        int w_pad = (int)(det.box.width * ratio);
        int h_pad = (int)(det.box.height * ratio);

        cv::Rect roi640(x_pad, y_pad, w_pad, h_pad);
        // Clamp
        roi640 &= cv::Rect(0, 0, (int)INFERENCE_SIZE, (int)INFERENCE_SIZE);

        if (roi640.area() > 0) {
            cv::Mat croppedMask = mask640(roi640);

            // e. Resize final la dimensiunea box-ului original
            cv::Mat finalMask;
            cv::resize(croppedMask, finalMask, cv::Size(det.box.width, det.box.height));

            // f. Binarizare (0 sau 255)
            cv::threshold(finalMask, finalMask, 0.5, 255, cv::THRESH_BINARY);
            finalMask.convertTo(det.mask, CV_8U);
        }
        
        det.maskCoeffs.clear(); 
    }

    output = std::move(finalDetections);
    // std::cout << "DEBUG: Final count: " << output.size() << "\n";
}
