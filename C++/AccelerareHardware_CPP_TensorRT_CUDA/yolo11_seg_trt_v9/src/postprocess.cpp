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

// --- CONFIGURAȚIE YOLOv11 ---
// Atenție: YOLOv8/v11 NU au output de "objectness" separat.
// Structura este: cx, cy, w, h (4) + Classes (80) + Masks (32) = 116 canale.
static const int NUM_CLASSES = 80;
static const int NUM_MASKS   = 32;    
static const float INFERENCE_SIZE = 640.0f; 
static const bool DEBUG_BOXES = true; 

// Funcție ajutătoare pentru IOU
float calculate_iou(const cv::Rect& box1, const cv::Rect& box2) {
    cv::Rect inter = box1 & box2;
    float inter_area = inter.area();
    float union_area = box1.area() + box2.area() - inter_area;
    if (union_area == 0) return 0.0f;
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

    // 1. Căutarea Binding-urilor
    int detIndex = -1, maskIndex = -1;
    for (size_t i = 0; i < bindings.size(); ++i) {
        auto dims = loader.getEngine()->getTensorShape(loader.getEngine()->getIOTensorName(i));
        // De obicei output0 este detecția, output1 este proto-masca
        if (dims.nbDims == 3) detIndex = i;       // [1, 116, 8400]
        else if (dims.nbDims == 4) maskIndex = i; // [1, 32, 160, 160]
    }

    if (detIndex < 0 || maskIndex < 0) {
        std::cerr << "FATAL: Output bindings not found.\n";
        return;
    }

    // Informații despre dimensiuni
    auto detDims = loader.getEngine()->getTensorShape(loader.getEngine()->getIOTensorName(detIndex));
    auto maskDims = loader.getEngine()->getTensorShape(loader.getEngine()->getIOTensorName(maskIndex));

    // Verificăm formatul [Batch, Channels, Anchors] vs [Batch, Anchors, Channels]
    // Standard YOLO export: [1, 116, 8400] -> Channels = 116 (dim 1), Anchors = 8400 (dim 2)
    int numChannels = detDims.d[1];
    int numAnchors  = detDims.d[2];
    
    // Logica de acces la memorie
    // Dacă exportul e standard, datele sunt "Flat" pe canale: Toate cx-urile, apoi toate cy-urile...
    bool isOutputTransposed = true; // Presupunem formatul default [1, C, N]
    
    // Validare simplă
    if (numChannels > numAnchors) {
        // Probabil e invers: [1, 8400, 116]
        std::swap(numChannels, numAnchors);
        isOutputTransposed = false;
    }

    // Proto masks dims: [1, 32, 160, 160]
    int protoC = maskDims.d[1]; // 32
    int protoH = maskDims.d[2]; // 160
    int protoW = maskDims.d[3]; // 160

    // 2. Copiere Output de pe GPU pe CPU
    std::vector<float> hostDet(bindings[detIndex].size / sizeof(float));
    std::vector<float> hostMask(bindings[maskIndex].size / sizeof(float));
    
    checkCuda(cudaMemcpy(hostDet.data(), bindings[detIndex].device_ptr, bindings[detIndex].size, cudaMemcpyDeviceToHost), "Memcpy det");
    checkCuda(cudaMemcpy(hostMask.data(), bindings[maskIndex].device_ptr, bindings[maskIndex].size, cudaMemcpyDeviceToHost), "Memcpy mask");

    // 3. Calcul Letterbox
    float r_w = INFERENCE_SIZE / (float)original_w;
    float r_h = INFERENCE_SIZE / (float)original_h;
    float ratio = std::min(r_w, r_h);
    float scaled_w_f = (float)original_w * ratio;
    float scaled_h_f = (float)original_h * ratio;
    float dw = (INFERENCE_SIZE - scaled_w_f) * 0.5f; 
    float dh = (INFERENCE_SIZE - scaled_h_f) * 0.5f; 

    // 4. Pregătirea Proto-Măștilor
    std::vector<cv::Mat> protoMats;
    protoMats.reserve(protoC);
    // Proto masks sunt [32, 160, 160], deci sunt continue în memorie per canal
    for (int c = 0; c < protoC; ++c) {
        float* p = hostMask.data() + c * protoH * protoW;
        cv::Mat m(protoH, protoW, CV_32FC1, p);
        protoMats.push_back(m.clone()); 
    }

    std::vector<Detection> prelim;
    prelim.reserve(numAnchors);

    // Iterăm prin toate "ancorele" (posibilele cutii)
    for (int i = 0; i < numAnchors; ++i) {
        
        // --- DECODAREA DETECȚIEI (Aici era greșeala principală) ---
        // Trebuie să calculăm offset-ul corect în funcție de layout
        // Format [1, 116, 8400]:
        //   cx = data[0 * 8400 + i]
        //   cy = data[1 * 8400 + i]
        //   ...
        
        // Funcție lambda pentru acces rapid
        auto getVal = [&](int channelIdx) -> float {
            if (isOutputTransposed) {
                return hostDet[channelIdx * numAnchors + i];
            } else {
                return hostDet[i * numChannels + channelIdx];
            }
        };

        // 1. Găsirea Clasei și Confidenței
        // În YOLOv11 NU există objectness. Canalele 4..83 sunt scorurile claselor.
        float maxClassScore = -FLT_MAX;
        int bestClassId = -1;

        for (int c = 0; c < NUM_CLASSES; ++c) {
            // Canalele 4 până la 83 sunt clasele
            float score = getVal(4 + c); 
            if (score > maxClassScore) {
                maxClassScore = score;
                bestClassId = c;
            }
        }

        // Aplica sigmoid dacă scorurile nu sunt deja probabilități (0-1)
        // De obicei, în output-ul raw, ele sunt logit-uri.
        float confidence = maxClassScore; 
        if (confidence > 1.0f || confidence < 0.0f) {
             confidence = sigmoid(confidence); // Aplicăm sigmoid doar dacă e necesar
        }

        if (confidence < confThreshold) continue;

        // 2. Coordonate Box (0, 1, 2, 3) -> cx, cy, w, h
        float cx = getVal(0);
        float cy = getVal(1);
        float w  = getVal(2);
        float h  = getVal(3);

        // a) Unpad & Rescale Box
        float x_unpad = cx - dw;
        float y_unpad = cy - dh;
        
        float x_orig = x_unpad / ratio;
        float y_orig = y_unpad / ratio;
        float w_orig = w / ratio;
        float h_orig = h / ratio;

        int left = (int)(x_orig - w_orig * 0.5f);
        int top  = (int)(y_orig - h_orig * 0.5f);
        int width = (int)w_orig;
        int height = (int)h_orig;

        cv::Rect box(left, top, width, height);
        // Clamp la imagine
        box &= cv::Rect(0, 0, original_w, original_h);
        if (box.area() <= 0) continue;

        // 3. Procesare Mască
        // Coeficienții măștii sunt după clase (index 4 + 80 = 84 în sus)
        // Avem 32 de coeficienți
        std::vector<float> maskCoeffs(NUM_MASKS);
        for (int m = 0; m < NUM_MASKS; ++m) {
            maskCoeffs[m] = getVal(4 + NUM_CLASSES + m);
        }

        // --- Generare Mască (Doar pentru detecțiile validate) ---
        cv::Mat mask_proto = cv::Mat::zeros(protoH, protoW, CV_32FC1);
        for (int c = 0; c < NUM_MASKS; ++c) {
            mask_proto += protoMats[c] * maskCoeffs[c];
        }
        cv::exp(-mask_proto, mask_proto);
        mask_proto = 1.0f / (1.0f + mask_proto); // Sigmoid pe mască

        // Resize și Crop la Box
        cv::Mat mask640;
        cv::resize(mask_proto, mask640, cv::Size((int)INFERENCE_SIZE, (int)INFERENCE_SIZE));
        
        // ROI-ul corespunzător box-ului în spațiul 640x640 (inclusiv padding)
        // Box-ul detectat (cx, cy, w, h) este în coordonate 640x640.
        int mx = std::max(0, int(cx - w * 0.5f));
        int my = std::max(0, int(cy - h * 0.5f));
        int mw = int(w);
        int mh = int(h);
        
        // Clamp la 640x640
        if (mx + mw > (int)INFERENCE_SIZE) mw = (int)INFERENCE_SIZE - mx;
        if (my + mh > (int)INFERENCE_SIZE) mh = (int)INFERENCE_SIZE - my;

        if (mw <= 0 || mh <= 0) continue;

        cv::Mat croppedMask = mask640(cv::Rect(mx, my, mw, mh));
        
        // Redimensionare mască mică la dimensiunea box-ului final
        cv::Mat finalMask;
        cv::resize(croppedMask, finalMask, cv::Size(box.width, box.height));
        
        // Binarizare
        cv::threshold(finalMask, finalMask, 0.5, 255, cv::THRESH_BINARY);
        finalMask.convertTo(finalMask, CV_8U);

        // Salvare
        Detection det;
        det.box = box;
        det.class_id = bestClassId;
        det.confidence = confidence;
        det.mask = finalMask; // Masca e tăiată direct pe box

        prelim.push_back(det);
    }

    // --- NMS ---
    std::sort(prelim.begin(), prelim.end(), [](const Detection& a, const Detection& b){
        return a.confidence > b.confidence;
    });

    std::vector<Detection> finalDet;
    for (size_t i = 0; i < prelim.size(); ++i) {
        bool keep = true;
        for (size_t j = 0; j < finalDet.size(); ++j) {
            if (prelim[i].class_id == finalDet[j].class_id) { // NMS per clasă
                float iou = calculate_iou(prelim[i].box, finalDet[j].box);
                if (iou > nmsThreshold) {
                    keep = false; break;
                }
            }
        }
        if (keep) finalDet.push_back(prelim[i]);
    }

    output = std::move(finalDet);
    
    if (DEBUG_BOXES) {
        std::cout << "DEBUG: Final detections count: " << output.size() << "\n";
    }
}
