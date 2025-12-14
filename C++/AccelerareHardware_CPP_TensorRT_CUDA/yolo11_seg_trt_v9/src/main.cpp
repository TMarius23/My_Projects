#include <opencv2/opencv.hpp>
#include <vector>
#include <iostream>
#include <string>
#include <chrono> // Pentru cronometrare precisă
#include <numeric>

#include "engine_loader.h"   
#include "preprocess.h"    
#include "postprocess.h"   
#include "utils.h"         

// Funcție simplă pentru cronometrare în milisecunde
struct BenchTimer {
    std::chrono::high_resolution_clock::time_point start;
    void reset() { start = std::chrono::high_resolution_clock::now(); }
    double elapsed() {
        auto end = std::chrono::high_resolution_clock::now();
        return std::chrono::duration<double, std::milli>(end - start).count();
    }
};

int main() {
    // --- SETĂRI ---
    // Asigură-te că folosești engine-ul generat cu FP16 pentru viteză maximă!
    std::string engineFile = "../models/yolo11n-seg.engine"; 
    std::string imageFile  = "../input/masini.jpeg"; // Sau vaci.jpeg
    
    // Praguri optimizate
    float confThreshold = 0.45; // Elimină zgomotul, păstrează obiectele clare
    float nmsThreshold  = 0.50; // Elimină suprapunerile

    EngineLoader loader;

    // --- 1. Load Engine ---
    std::cout << "--> Loading Engine: " << engineFile << "..." << std::endl;
    if (!loader.loadEngine(engineFile)) {
        std::cerr << "Failed to load engine!" << std::endl;
        return -1;
    }
    
    try {
        loader.allocateBuffers();
    } catch (const std::runtime_error& e) {
        std::cerr << "Error allocation: " << e.what() << std::endl;
        return -1;
    }

    // --- 2. Load Image ---
    cv::Mat img = cv::imread(imageFile);
    if (img.empty()) {
        std::cerr << "Failed to read image: " << imageFile << std::endl;
        return -1;
    }
    
    // Dimensiunile originale (pentru scalare inversă)
    const int originalW = img.cols; 
    const int originalH = img.rows;

    // Dimensiunile de intrare ale modelului (Standard YOLOv11)
    int inputW = 640;
    int inputH = 640;
    
    // Inițializare Preprocesor (Acesta va aloca Pinned Memory dacă ai actualizat preprocess.cpp)
    Preprocessor preprocessor(inputW, inputH);
    int inputIndex = loader.getInputBindingIndex();
    if (inputIndex == -1) {
       std::cerr << "FATAL: Input binding not found." << std::endl;
       return -1;
    }
    void* gpuInputBuffer = loader.getBindings()[inputIndex].device_ptr;

    // --- 3. WARM-UP (Încălzire GPU) ---
    // Foarte important pentru benchmark corect. Primele rulări sunt mereu lente.
    std::cout << "--> Warming up GPU (10 cycles)..." << std::endl;
    for (int i = 0; i < 10; ++i) {
        preprocessor.preprocess(img, gpuInputBuffer);
        loader.infer();
    }
    std::cout << "--> Warm-up complete." << std::endl;

    // --- 4. BENCHMARK LOOP ---
    int num_frames = 100; // Testăm pe 100 de cadre
    std::cout << "--> Running Benchmark on " << num_frames << " frames..." << std::endl;

    std::vector<Detection> detections;
    std::vector<cv::Scalar> colors;
    extern const std::vector<std::string> CLASS_NAMES;
    extern void initializeColors(std::vector<cv::Scalar>& palette, const std::vector<std::string>& names);
    initializeColors(colors, CLASS_NAMES);

    double total_time_ms = 0;
    BenchTimer timer;
    double total_time_gpu = 0;
    BenchTimer timer_GPU;

    for (int i = 0; i < num_frames; ++i) {
        timer.reset();

        // A. Preprocess (CPU -> GPU Copy)
        preprocessor.preprocess(img, gpuInputBuffer);

	timer_GPU.reset();
        // B. Inference (GPU)
        if (!loader.infer()) {
            std::cerr << "Inference failed at frame " << i << std::endl;
            break;
        }
        total_time_gpu += timer_GPU.elapsed();

        // C. Postprocess (CPU)
        // Notă: Includem postprocesarea în timp pentru a vedea performanța reală a aplicației
        postprocess(loader, originalW, originalH, detections, colors, confThreshold, nmsThreshold);
        
        total_time_ms += timer.elapsed();
    }

    // --- 5. STATISTICI ---
    double avg_time = total_time_ms / num_frames;
    double avg_time_gpu = total_time_gpu / num_frames;
    double fps = 1000.0 / avg_time;


    std::cout << "========================================" << std::endl;
    std::cout << "  Platform:   TensorRT + CUDA" << std::endl;
    std::cout << "  Iterations: " << num_frames << std::endl;
    std::cout << "  Avg Time:   " << avg_time << " ms" << std::endl;
    std::cout << "  Avg Time CPU:   " << avg_time - avg_time_gpu << " ms" << std::endl;
    std::cout << "  Avg Time GPU:   " << avg_time_gpu << " ms" << std::endl;
    std::cout << "  Avg FPS:    " << fps << " FPS" << std::endl;
    std::cout << "  Detections: " << detections.size() << " objects (last frame)" << std::endl;
    std::cout << "========================================" << std::endl;

    // --- 6. VIZUALIZARE (Doar pe ultimul cadru) ---
    std::cout << "--> Rendering results..." << std::endl;
    cv::Mat overlay = img.clone(); 
    
    for (auto& det : detections) {
        // Verificăm dacă indexul clasei e valid
        if (det.class_id < 0 || det.class_id >= colors.size()) continue;
        
        cv::Scalar color = colors[det.class_id]; 
        
        // --- DESENARE MASCĂ ---
        if (!det.mask.empty()) {
            // Masca vine deja decupată pe dimensiunea Box-ului din postprocess.cpp
            cv::Rect box = det.box;
            
            // Siguranță: Clamping la limitele imaginii
            box = box & cv::Rect(0, 0, overlay.cols, overlay.rows);
            
            if (box.area() > 0) {
                // Extragem zona de interes (ROI) din imaginea color
                cv::Mat roi = overlay(box);
                
                // Creăm o imagine color solidă de dimensiunea box-ului
                cv::Mat colorMask(box.size(), CV_8UC3, color);
                
                // Redimensionăm masca binară dacă există mici diferențe de rotunjire
                cv::Mat maskBin = det.mask;
                if (maskBin.size() != box.size()) {
                    cv::resize(maskBin, maskBin, box.size(), 0, 0, cv::INTER_NEAREST);
                }

                // Alpha Blending Vectorizat: ROI = ROI * 0.6 + Color * 0.4
                // Aplicăm culoarea doar unde masca este 1 (255)
                // O metodă rapidă în OpenCV: addWeighted doar pe zona măștii
                
                cv::Mat coloredRoi;
                // Amestecăm imaginea originală cu culoarea solidă
                cv::addWeighted(roi, 0.6, colorMask, 0.4, 0.0, coloredRoi);
                
                // Copiem înapoi doar pixelii unde masca nu este 0
                coloredRoi.copyTo(roi, maskBin);
            }
        }
        
        // --- DESENARE CUTIE ȘI TEXT ---
        cv::rectangle(overlay, det.box, color, 2); 
        
        std::string label = CLASS_NAMES[det.class_id] + " " + std::to_string(int(det.confidence*100)) + "%";
        
        int baseLine;
        cv::Size labelSize = cv::getTextSize(label, cv::FONT_HERSHEY_SIMPLEX, 0.5, 1, &baseLine);
        int top = std::max(det.box.y, labelSize.height);
        
        // Fundal etichetă pentru lizibilitate
        cv::rectangle(overlay, cv::Point(det.box.x, top - labelSize.height),
                      cv::Point(det.box.x + labelSize.width, top + baseLine), color, cv::FILLED);
                      
        cv::putText(overlay, label, cv::Point(det.box.x, top), 
                    cv::FONT_HERSHEY_SIMPLEX, 0.5, cv::Scalar(255,255,255), 1); 
    }

    // Salvare și Afișare
    std::string outFile = "../output/result_final.jpg";
    cv::imwrite(outFile, overlay);
    std::cout << "--> Result saved to: " << outFile << std::endl;

    // Afișare fereastră (dacă ești pe desktop)
    // cv::imshow("YOLOv11 TensorRT", overlay); 
    // cv::waitKey(0);

    return 0;
}
