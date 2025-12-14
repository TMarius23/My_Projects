#!/bin/bash

ONNX="yolo11n-seg.onnx"
ENGINE="yolo11n-seg.engine"

echo "Building TensorRT engine..."
/usr/src/tensorrt/bin/trtexec \
    --onnx=$ONNX \
    --saveEngine=$ENGINE \
    --explicitBatch \
    --workspace=4096 \
    --fp16 \
    --verbose

echo "DONE! Engine saved as: $ENGINE"

