#include <opencv2/opencv.hpp>
#include <vector>
#include <iostream>
#include <string>
#include <chrono> 
#include <numeric>
#include <algorithm> // pentru transform

#include "engine_loader.h"   
#include "preprocess.h"    
#include "postprocess.h"   
#include "utils.h"         


const std::string ENGINE_FILE = "../models/yolo11n-seg.engine";


const std::string INPUT_FILE  = "../input/Cars Moving On Road Stock Footage - Free Download.mp4"; 
//const std::string INPUT_FILE  = "../input/bus.jpg"; 
// const std::string INPUT_FILE  = "../input/traffic.mp4"; 

const std::string OUTPUT_DIR  = "../output/";


float confThreshold = 0.50; 
float nmsThreshold  = 0.40; 

extern const std::vector<std::string> CLASS_NAMES;
extern void initializeColors(std::vector<cv::Scalar>& palette, const std::vector<std::string>& names);

struct BenchTimer {
    std::chrono::high_resolution_clock::time_point start;
    void reset() { start = std::chrono::high_resolution_clock::now(); }
    double elapsed() {
        auto end = std::chrono::high_resolution_clock::now();
        return std::chrono::duration<double, std::milli>(end - start).count();
    }
};


bool isVideoFile(const std::string& path) {
    std::string ext = path.substr(path.find_last_of(".") + 1);
    std::transform(ext.begin(), ext.end(), ext.begin(), ::tolower);
    return (ext == "mp4" || ext == "avi" || ext == "mov" || ext == "mkv");
}

std::string getOutputFileName(const std::string& inputPath) {
    std::string filename = inputPath.substr(inputPath.find_last_of("/\\") + 1);
    return OUTPUT_DIR + "result_" + filename;
}


void draw_objects(cv::Mat& img, const std::vector<Detection>& detections, const std::vector<cv::Scalar>& colors) {
    cv::Mat maskOverlay = img.clone();
    bool masksDrawn = false;

    for (const auto& det : detections) {
        if (det.class_id < 0 || det.class_id >= colors.size()) continue;
        cv::Scalar color = colors[det.class_id];

        // 1. Mască
        if (!det.mask.empty()) {
            cv::Rect box = det.box;
            box &= cv::Rect(0, 0, img.cols, img.rows);
            if (box.area() > 0) {
                cv::Mat roi = maskOverlay(box);
                cv::Mat maskBin = det.mask;
                if (maskBin.size() != box.size()) cv::resize(maskBin, maskBin, box.size(), 0, 0, cv::INTER_NEAREST);
                cv::Mat colorRect(roi.size(), CV_8UC3, color);
                colorRect.copyTo(roi, maskBin);
                masksDrawn = true;
            }
        }

        // 2. Box & Text
        cv::rectangle(img, det.box, color, 2);
        std::string label = CLASS_NAMES[det.class_id]; 
        int baseLine;
        cv::Size labelSize = cv::getTextSize(label, cv::FONT_HERSHEY_SIMPLEX, 0.5, 1, &baseLine);
        int top = std::max(det.box.y, labelSize.height);
        
        cv::rectangle(img, cv::Point(det.box.x, top - labelSize.height),
                      cv::Point(det.box.x + labelSize.width, top + baseLine), color, cv::FILLED);
        cv::putText(img, label, cv::Point(det.box.x, top), 
                    cv::FONT_HERSHEY_SIMPLEX, 0.5, cv::Scalar(255,255,255), 1);
    }

    if (masksDrawn) {
        cv::addWeighted(img, 0.6, maskOverlay, 0.4, 0.0, img);
    }
}


void printStatistics(int iterations, double avg_time, double avg_gpu, int detectionsCount) {
    double avg_cpu = avg_time - avg_gpu;
    double fps = 1000.0 / avg_time;

    std::cout << "\n========================================" << std::endl;
    std::cout << "  Platform:   TensorRT + CUDA" << std::endl;
    std::cout << "  Iterations: " << iterations << std::endl;
    std::cout << "  Avg Time:   " << avg_time << " ms" << std::endl;
    std::cout << "  Avg CPU:    " << avg_cpu << " ms" << std::endl;
    std::cout << "  Avg GPU:    " << avg_gpu << " ms" << std::endl;
    std::cout << "  Avg FPS:    " << fps << " FPS" << std::endl;
    std::cout << "  Detections: " << detectionsCount << " objects (last frame)" << std::endl;
    std::cout << "========================================" << std::endl;
}

int main() {
    // 1. Încărcare Engine
    EngineLoader loader;
    std::cout << "--> Loading Engine: " << ENGINE_FILE << "..." << std::endl;
    if (!loader.loadEngine(ENGINE_FILE)) return -1;
    
    try { loader.allocateBuffers(); } 
    catch (const std::runtime_error& e) {
        std::cerr << "Error allocation: " << e.what() << std::endl;
        return -1;
    }

    // Inițializare Preprocesor și Culori
    Preprocessor preprocessor(640, 640);
    int inputIndex = loader.getInputBindingIndex();
    void* gpuInputBuffer = loader.getBindings()[inputIndex].device_ptr;
    
    std::vector<cv::Scalar> colors;
    initializeColors(colors, CLASS_NAMES);
    std::vector<Detection> detections;
    std::string outputFile = getOutputFileName(INPUT_FILE);

    // Timers
    BenchTimer totalTimer;
    BenchTimer gpuTimer;

    // 2. RAMIFICARE LOGICĂ (Imagine vs Video)
    if (isVideoFile(INPUT_FILE)) {
        // ================= VIDEO MODE =================
        std::cout << "--> MODE: VIDEO PROCESSING detected." << std::endl;
        cv::VideoCapture cap(INPUT_FILE);
        if (!cap.isOpened()) {
            std::cerr << "Error opening video: " << INPUT_FILE << std::endl;
            return -1;
        }

        int width  = (int)cap.get(cv::CAP_PROP_FRAME_WIDTH);
        int height = (int)cap.get(cv::CAP_PROP_FRAME_HEIGHT);
        double fps_input = cap.get(cv::CAP_PROP_FPS);
        int total_frames_input = (int)cap.get(cv::CAP_PROP_FRAME_COUNT);

        cv::VideoWriter writer(outputFile, cv::VideoWriter::fourcc('m', 'p', '4', 'v'), fps_input, cv::Size(width, height));
        
        cv::Mat frame;
        int frame_count = 0;
        

        double accum_total_time = 0;
        double accum_gpu_time = 0;

        std::cout << "Processing Video..." << std::endl;

        while (cap.read(frame)) {
            totalTimer.reset();

            // A. Preprocess
            preprocessor.preprocess(frame, gpuInputBuffer);

            // B. Inference (GPU Measure)
            gpuTimer.reset();
            if (!loader.infer()) break; 
            double gpu_ms = gpuTimer.elapsed();

            // C. Postprocess
            postprocess(loader, width, height, detections, colors, confThreshold, nmsThreshold);
            
            // D. Draw & Write (Nu le includem neapărat în timpul de inferență AI, dar le includem în bucla totală de aplicație)
            draw_objects(frame, detections, colors);
            writer.write(frame);

            double total_ms = totalTimer.elapsed();

            // Acumulăm pentru statistici
            accum_total_time += total_ms;
            accum_gpu_time += gpu_ms;

            // Log la fiecare 10 cadre
            if (frame_count % 10 == 0) {
                std::cout << "\rFrame: " << frame_count << "/" << total_frames_input 
                          << " | Last: " << (int)total_ms << "ms (" << (int)(1000.0/total_ms) << " FPS)" << std::flush;
            }
            frame_count++;
        }

        if (frame_count > 0) {
            printStatistics(frame_count, accum_total_time / frame_count, accum_gpu_time / frame_count, detections.size());
        }
        std::cout << "Video salvat in: " << outputFile << std::endl;

    } else {
        // ================= IMAGE MODE =================
        std::cout << "MODE: IMAGE PROCESSING detected." << std::endl;
        cv::Mat img = cv::imread(INPUT_FILE);
        if (img.empty()) {
            std::cerr << "Error opening image: " << INPUT_FILE << std::endl;
            return -1;
        }


        int originalW = img.cols;
        int originalH = img.rows;
        int num_frames = 100;

        std::cout << "Warming up GPU..." << std::endl;
        for(int i=0; i<5; i++) {
            preprocessor.preprocess(img, gpuInputBuffer);
            loader.infer();
        }

        std::cout << "Running Benchmark on " << num_frames << " frames..." << std::endl;
        
        double total_time_ms = 0;
        double total_time_gpu = 0;

        for (int i = 0; i < num_frames; ++i) {
            totalTimer.reset();

            // A. Preprocess
            preprocessor.preprocess(img, gpuInputBuffer);

            // B. Inference (GPU)
            gpuTimer.reset();
            if (!loader.infer()) {
                std::cerr << "Inference failed at frame " << i << std::endl;
                break;
            }
            total_time_gpu += gpuTimer.elapsed();

            // C. Postprocess
            postprocess(loader, originalW, originalH, detections, colors, confThreshold, nmsThreshold);
            
            total_time_ms += totalTimer.elapsed();
        }

        printStatistics(num_frames, total_time_ms / num_frames, total_time_gpu / num_frames, detections.size());


        draw_objects(img, detections, colors);
        cv::imwrite(outputFile, img);
        std::cout << "Imagine salvata in: " << outputFile << std::endl;
    }

    return 0;
}
