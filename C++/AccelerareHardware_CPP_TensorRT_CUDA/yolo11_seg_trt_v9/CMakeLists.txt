cmake_minimum_required(VERSION 3.18 FATAL_ERROR)
project(YOLO11_SEG_TRT LANGUAGES CXX CUDA)

# ------------------------------
# 1. Set standard C++ și CUDA
# ------------------------------
set(CMAKE_CXX_STANDARD 14)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CUDA_STANDARD 14)
set(CMAKE_CUDA_STANDARD_REQUIRED ON)

# ------------------------------
# 2. Find packages
# ------------------------------
find_package(OpenCV REQUIRED)
find_package(CUDA REQUIRED)

# Include TensorRT
set(TENSORRT_DIR /usr/include)  # ajustează dacă ai alt path
include_directories(${TENSORRT_DIR})

# Include directories
include_directories(
    ${CMAKE_CURRENT_SOURCE_DIR}/include
    ${CUDA_INCLUDE_DIRS}
    ${OpenCV_INCLUDE_DIRS}
)

# ------------------------------
# 3. Source files
# ------------------------------
set(SOURCES
    src/main.cpp
    src/engine_loader.cpp
    src/preprocess.cpp
    src/postprocess.cpp
    src/utils.cpp
)

# ------------------------------
# 4. Executable
# ------------------------------
add_executable(yolo11_seg_trt ${SOURCES})

# ------------------------------
# 5. Link libraries
# ------------------------------
target_link_libraries(yolo11_seg_trt
    ${OpenCV_LIBS}
    nvinfer
    nvinfer_plugin
    nvonnxparser
    ${CUDA_LIBRARIES}  # include cudart
    pthread
)

# ------------------------------
# 6. CUDA settings
# ------------------------------
set_target_properties(yolo11_seg_trt PROPERTIES
    CUDA_SEPARABLE_COMPILATION ON
    POSITION_INDEPENDENT_CODE ON
)

