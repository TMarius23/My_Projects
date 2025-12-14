#include "engine_loader.h"
#include <fstream>
#include <iostream>
#include <NvInferRuntime.h>
#include <NvInfer.h>
#include <cuda_runtime_api.h>
#include <cuda_fp16.h> 
#include "utils.h"


class TRTLogger : public nvinfer1::ILogger {
public:
    void log(Severity severity, const char* msg) noexcept override {
        // CORECȚIE: Severity este un alias pentru nvinfer1::ILogger::Severity
        if (severity <= nvinfer1::ILogger::Severity::kWARNING)
            std::cout << msg << std::endl;
    }
};

static TRTLogger gLogger;

int EngineLoader::getInputBindingIndex() const {
    for (size_t i = 0; i < bindings_.size(); ++i) {
        if (bindings_[i].isInput) {
            return i;
        }
    }
    // Returnează -1 dacă nu găsește (eroare)
    return -1;
}

EngineLoader::~EngineLoader() {
    // Atenție: Presupun că structura ta Binding din engine_loader.h este cea veche cu device_ptr
    // Voi folosi structura Binding din primul tău prompt pentru a nu introduce incompatibilități:
    // structura Binding din primul prompt: std::vector<void*> deviceBuffers; (în clasă)
    // Deoarece ai folosit 'bindings_' cu 'device_ptr', voi presupune acea structură.
    for (auto& buf : bindings_) {
        if (buf.device_ptr)
             cudaFree(buf.device_ptr); // Fără checkCuda aici, pentru simplitate
    }
}


bool EngineLoader::loadEngine(const std::string& engineFile) {
    std::ifstream file(engineFile, std::ios::binary);
    if (!file) {
        std::cerr << "Cannot open engine file: " << engineFile << std::endl;
        return false;
    }

    file.seekg(0, file.end);
    size_t size = file.tellg();
    file.seekg(0, file.beg);
    std::vector<char> engineData(size);
    file.read(engineData.data(), size);

    nvinfer1::IRuntime* runtime = nvinfer1::createInferRuntime(gLogger);
    if (!runtime) return false;

    // Folosim o funcție lambda pentru a asigura distrugerea engine-ului
    engine_.reset(runtime->deserializeCudaEngine(engineData.data(), size));
    if (!engine_) {
        std::cerr << "Failed to deserialize engine." << std::endl;
        return false;
    }

    // Contextul este acum creat de pe motor
    context_.reset(engine_->createExecutionContext());
    if (!context_) {
        std::cerr << "Failed to create execution context." << std::endl;
        return false;
    }

    // Alocăm buffer-ele imediat după load
    allocateBuffers();
    return true;
}


void EngineLoader::allocateBuffers() {
    // TRT 10+ folosește getNbIOTensors() pentru a număra intrările/ieșirile
    int nbTensors = engine_->getNbIOTensors(); 
    bindings_.resize(nbTensors);

    for (int i = 0; i < nbTensors; ++i) {
        const char* name = engine_->getIOTensorName(i); // Numele tensorului

        // 1. Obținem forma, tipul și modul de I/O direct din motor
        nvinfer1::Dims dims = engine_->getTensorShape(name);
        nvinfer1::DataType dtype = engine_->getTensorDataType(name);
        // CORECȚIE: Înlocuim getTensorMode cu getTensorIOMode
        nvinfer1::TensorIOMode mode = engine_->getTensorIOMode(name); 

        // 2. Calculăm mărimea totală
        size_t totalSize = 1;
        for (int d = 0; d < dims.nbDims; ++d) {
            // Verificăm dacă dimensiunea este validă (nu -1, care ar însemna un binding dynamic range care nu e setat)
             if (dims.d[d] <= 0) {
                 std::cerr << "Warning: Tensor dimension is <= 0 for " << name << ". Assuming static shape was loaded.\n";
             }
            totalSize *= dims.d[d];
        }

        // 3. Calculăm mărimea în octeți
        size_t typeSize = 0;
        switch (dtype) {
            case nvinfer1::DataType::kFLOAT:  typeSize = sizeof(float); break;
            case nvinfer1::DataType::kHALF:   typeSize = sizeof(__half); break;
            case nvinfer1::DataType::kINT8:   typeSize = sizeof(int8_t); break;
            case nvinfer1::DataType::kINT32:  typeSize = sizeof(int32_t); break;
            default: typeSize = 1; // Fallback
        }

        bindings_[i].size = totalSize * typeSize;
        bindings_[i].device_ptr = nullptr;

        // 4. Alocare CUDA
        if (cudaMalloc(&bindings_[i].device_ptr, bindings_[i].size) != cudaSuccess) {
             throw std::runtime_error("cudaMalloc failed in allocateBuffers");
        }

        // 5. Determinăm dacă este input sau output
        bindings_[i].isInput = (mode == nvinfer1::TensorIOMode::kINPUT);
        
        // 6. Setăm buffer-ele pe context (echivalentul mapării)
        // Setarea adreselor este crucială pentru enqueueV3
        context_->setTensorAddress(name, bindings_[i].device_ptr);
    }
}

bool EngineLoader::infer() {
    cudaStream_t stream;
    // Fără checkCuda, pentru a evita dependința directă de utils
    if (cudaStreamCreate(&stream) != cudaSuccess) {
        std::cerr << "cudaStreamCreate failed\n";
        return false;
    }

    // TensorRT 10: enqueueV3 folosește doar stream-ul
    // Setarea adreselor a fost făcută anterior în allocateBuffers()
    bool status = context_->enqueueV3(stream); 

    if (cudaStreamSynchronize(stream) != cudaSuccess) {
        std::cerr << "cudaStreamSynchronize failed\n";
        status = false;
    }
    
    cudaStreamDestroy(stream);

    return status;
}
