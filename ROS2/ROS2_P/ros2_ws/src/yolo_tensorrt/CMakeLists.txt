cmake_minimum_required(VERSION 3.8)
project(yolo_tensorrt)

# --- 1. CONFIGURĂRI CUDA & C++ ---
if(NOT CMAKE_CXX_STANDARD)
  set(CMAKE_CXX_STANDARD 17)
endif()

# Activăm CUDA pentru Jetson Orin (87)
enable_language(CUDA)
set(CMAKE_CUDA_ARCHITECTURES 87)
set(CMAKE_CUDA_FLAGS "${CMAKE_CUDA_FLAGS} --expt-relaxed-constexpr")

# --- 2. DEPENDINȚE ---
find_package(ament_cmake REQUIRED)
find_package(rclcpp REQUIRED)
find_package(sensor_msgs REQUIRED)
find_package(cv_bridge REQUIRED)
find_package(image_transport REQUIRED)
find_package(std_msgs REQUIRED)
find_package(OpenCV REQUIRED)
find_package(CUDA REQUIRED)

# TensorRT (pe Jetson e de obicei în directoare standard, dar uneori trebuie ajutat)
find_library(NVINFER NAMES nvinfer)
find_library(NVINFER_PLUGIN NAMES nvinfer_plugin)
find_library(NVONNXPARSER NAMES nvonnxparser)

# --- 3. SURSE ---
# Adună fișierele tale sursă (inclusiv .cu)
set(SOURCES
  src/yolo_node.cpp
  src/engine_loader.cpp
  src/preprocess.cpp
  src/postprocess.cpp
  src/utils.cpp
  src/preprocess_cuda.cu
)

# --- 4. EXECUTABIL ---
add_executable(yolo_node ${SOURCES})

# Include directories
target_include_directories(yolo_node PUBLIC
  # 1. Calea standard ROS (pentru include/yolo_tensorrt/header.h)
  $<BUILD_INTERFACE:${CMAKE_CURRENT_SOURCE_DIR}/include>
  
  # 2. FIX-UL TĂU: Adăugăm folderul specific ca să meargă #include "utils.h" direct
  $<BUILD_INTERFACE:${CMAKE_CURRENT_SOURCE_DIR}/include/yolo_tensorrt>

  $<INSTALL_INTERFACE:include>
  ${OpenCV_INCLUDE_DIRS}
  ${CUDA_INCLUDE_DIRS}
)


# Include directories
target_include_directories(yolo_node PUBLIC
  $<BUILD_INTERFACE:${CMAKE_CURRENT_SOURCE_DIR}/include>
  $<INSTALL_INTERFACE:include>
  ${OpenCV_INCLUDE_DIRS}
  ${CUDA_INCLUDE_DIRS}
)

# --- 5. LINKARE ---
ament_target_dependencies(yolo_node
  rclcpp
  sensor_msgs
  cv_bridge
  image_transport
  std_msgs
)

# Linkăm bibliotecile non-ROS manual
target_link_libraries(yolo_node
  ${OpenCV_LIBS}
  ${NVINFER}
  ${NVINFER_PLUGIN}
  ${NVONNXPARSER}
  ${CUDA_LIBRARIES}
)

# --- 6. INSTALARE ---
install(TARGETS yolo_node
  DESTINATION lib/${PROJECT_NAME})

ament_package()
