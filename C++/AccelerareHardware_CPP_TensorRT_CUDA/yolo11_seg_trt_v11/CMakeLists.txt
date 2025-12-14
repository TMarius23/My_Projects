cmake_minimum_required(VERSION 3.18 FATAL_ERROR)
project(YOLO11_SEG_TRT LANGUAGES CXX CUDA)

set(CMAKE_CUDA_ARCHITECTURES 87)
# ------------------------------
# 1. Setări Standard
# ------------------------------
set(CMAKE_CXX_STANDARD 14)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CUDA_STANDARD 14)
set(CMAKE_CUDA_STANDARD_REQUIRED ON)

# Activăm limbajul CUDA explicit (deși project îl activează, e bine să fim siguri)
enable_language(CUDA)

# ------------------------------
# 2. Găsire Pachete
# ------------------------------
find_package(OpenCV REQUIRED)
find_package(CUDA REQUIRED)

# Include TensorRT
set(TENSORRT_DIR /usr/include) 
include_directories(${TENSORRT_DIR})

# Include directoare (unde sunt .h)
include_directories(
    ${CMAKE_CURRENT_SOURCE_DIR}/include
    ${CUDA_INCLUDE_DIRS}
    ${OpenCV_INCLUDE_DIRS}
)

# ------------------------------
# 3. Fișiere Sursă (AICI ERA PROBLEMA)
# ------------------------------
# Adăugăm src/preprocess_cuda.cu în lista principală
set(SOURCES
    src/main.cpp
    src/engine_loader.cpp
    src/preprocess.cpp
    src/postprocess.cpp
    src/utils.cpp
    src/preprocess_cuda.cu  
)

# ------------------------------
# 4. Executabil
# ------------------------------
add_executable(yolo11_seg_trt ${SOURCES})

# ------------------------------
# 5. Linkare Biblioteci
# ------------------------------
target_link_libraries(yolo11_seg_trt
    ${OpenCV_LIBS}
    nvinfer
    nvinfer_plugin
    nvonnxparser
    ${CUDA_LIBRARIES}
    pthread
)

# ------------------------------
# 6. Setări CUDA specifice
# ------------------------------
set_target_properties(yolo11_seg_trt PROPERTIES
    CUDA_SEPARABLE_COMPILATION ON
    POSITION_INDEPENDENT_CODE ON
)
