#include <cuda_runtime.h>
#include <device_launch_parameters.h>
#include <stdio.h>

__global__ void preprocess_bilinear_kernel(
    const unsigned char* __restrict__ src, 
    float* __restrict__ dst,              
    int srcW, int srcH, int srcStep,      
    int dstW, int dstH,                   
    float scale, int padX, int padY       
) {
    int x = blockIdx.x * blockDim.x + threadIdx.x;
    int y = blockIdx.y * blockDim.y + threadIdx.y;

    if (x >= dstW || y >= dstH) return;

    int area = dstW * dstH;
    int dstIdx = y * dstW + x;

    // 1. Calculăm coordonata în imaginea originală (fără padding)
    int x_unpad = x - padX;
    int y_unpad = y - padY;

    // 2. Verificăm dacă suntem în zona de padding (benzi gri)
    // Limita este (srcW * scale) și (srcH * scale)
    if (x_unpad < 0 || x_unpad >= (int)(srcW * scale) || 
        y_unpad < 0 || y_unpad >= (int)(srcH * scale)) 
    {
        float gray = 114.0f / 255.0f;
        dst[dstIdx]          = gray;
        dst[dstIdx + area]   = gray;
        dst[dstIdx + 2*area] = gray;
        return;
    }

    // 3. LOGICA BILINIARA
    // Coordonata exactă (float) în imaginea sursa
    float srcX = (x_unpad + 0.5f) / scale - 0.5f;
    float srcY = (y_unpad + 0.5f) / scale - 0.5f;

    // Găsim cei 4 pixeli vecini: (x_low, y_low) = colțul stânga-sus
    int x_low = (int)floorf(srcX);
    int y_low = (int)floorf(srcY);
    int x_high = x_low + 1;
    int y_high = y_low + 1;

    // Calculăm ponderile (cât de aproape suntem de fiecare pixel)
    float dx = srcX - x_low;
    float dy = srcY - y_low;
    float w00 = (1.0f - dx) * (1.0f - dy);
    float w10 = dx * (1.0f - dy);
    float w01 = (1.0f - dx) * dy;
    float w11 = dx * dy;

    // Clamp la marginile imaginii (să nu citim memorie invalidă)
    x_low = max(0, min(x_low, srcW - 1));
    y_low = max(0, min(y_low, srcH - 1));
    x_high = max(0, min(x_high, srcW - 1));
    y_high = max(0, min(y_high, srcH - 1));

    // Citim cei 4 pixeli (fiecare are 3 canale: B, G, R)
    // Folosim srcStep pentru a sări corect rândurile
    const unsigned char* p00 = src + y_low * srcStep + x_low * 3;
    const unsigned char* p10 = src + y_low * srcStep + x_high * 3;
    const unsigned char* p01 = src + y_high * srcStep + x_low * 3;
    const unsigned char* p11 = src + y_high * srcStep + x_high * 3;

    // Interpolăm fiecare canal separat (B, G, R)
    // Ordinea în memorie sursă e BGR. Noi scriem RGB Planar.

    // --- Canalul R (index 2 in sursa) ---
    float r_val = w00 * p00[2] + w10 * p10[2] + w01 * p01[2] + w11 * p11[2];
    dst[dstIdx] = r_val / 255.0f;

    // --- Canalul G (index 1 in sursa) ---
    float g_val = w00 * p00[1] + w10 * p10[1] + w01 * p01[1] + w11 * p11[1];
    dst[dstIdx + area] = g_val / 255.0f;

    // --- Canalul B (index 0 in sursa) ---
    float b_val = w00 * p00[0] + w10 * p10[0] + w01 * p01[0] + w11 * p11[0];
    dst[dstIdx + 2*area] = b_val / 255.0f;
}

extern "C" void launch_preprocess(
    const unsigned char* src, 
    float* dst, 
    int srcW, int srcH, int srcStep, 
    int dstW, int dstH,
    float scale, int padX, int padY,
    cudaStream_t stream
) {
    // Păstrăm blocuri mici pentru siguranță pe Jetson
    dim3 blockSize(16, 16);
    dim3 gridSize((dstW + blockSize.x - 1) / blockSize.x, 
                  (dstH + blockSize.y - 1) / blockSize.y);

    preprocess_bilinear_kernel<<<gridSize, blockSize, 0, stream>>>(
        src, dst, srcW, srcH, srcStep, dstW, dstH, scale, padX, padY
    );
    
    cudaError_t err = cudaGetLastError();
    if (err != cudaSuccess) {
        printf("CUDA Kernel Error: %s\n", cudaGetErrorString(err));
    }
}
