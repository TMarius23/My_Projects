#!/bin/bash


cd /home/mmp/Desktop/TMarius_YoloV11/configurareTensorC/yolo11_seg_trt_v11/build
rm -rf *
cmake -DCMAKE_CUDA_COMPILER=/usr/local/cuda/bin/nvcc ..
export LD_LIBRARY_PATH=/usr/local/cuda/lib64:$LD_LIBRARY_PATH
make -j$(nproc)
./yolo11_seg_trt


echo "Executie finalizata cu success!"

