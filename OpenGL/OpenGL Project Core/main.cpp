#if defined (__APPLE__)
#define GLFW_INCLUDE_GLCOREARB
#define GL_SILENCE_DEPRECATION
#else
#define GLEW_STATIC

#include <GL/glew.h>

#endif

#include <GLFW/glfw3.h>

#include <glm/glm.hpp> //core glm functionality
#include <glm/gtc/matrix_transform.hpp> //glm extension for generating common transformation matrices
#include <glm/gtc/matrix_inverse.hpp> //glm extension for computing inverse matrices
#include <glm/gtc/type_ptr.hpp> //glm extension for accessing the internal data structure of glm types

#include "Window.h"
#include "Shader.hpp"
#include "Camera.hpp"
#include "Model3D.hpp"
#include "SkyBox.hpp"

#include <iostream>
#include "stb_image.h"

// window
gps::Window myWindow;

// matrices
glm::mat4 model;
glm::mat4 view;
glm::mat4 projection;
glm::mat3 normalMatrix;

// matrices potir
glm::mat4 modelP;
glm::mat4 viewP;
glm::mat4 projectionP;
glm::mat3 normalMatrixP;

// matrices villager1
glm::mat4 modelO1;
glm::mat4 viewO1;
glm::mat4 projectionO1;
glm::mat3 normalMatrixO1;

// matrices villager2
glm::mat4 modelO2;
glm::mat4 viewO2;
glm::mat4 projectionO2;
glm::mat3 normalMatrixO2;

// matrices villager3
glm::mat4 modelO3;
glm::mat4 viewO3;
glm::mat4 projectionO3;
glm::mat3 normalMatrixO3;

// matrices villager4
glm::mat4 modelO4;
glm::mat4 viewO4;
glm::mat4 projectionO4;
glm::mat3 normalMatrixO4;

// matrices foc1
glm::mat4 modelF1;
glm::mat4 viewF1;
glm::mat4 projectionF1;
glm::mat3 normalMatrixF1;

// matrices foc1
glm::mat4 modelF2;
glm::mat4 viewF2;
glm::mat4 projectionF2;
glm::mat3 normalMatrixF2;

// matrices bec1
glm::mat4 modelBec;
glm::mat4 viewBec;
glm::mat4 projectionBec;
glm::mat3 normalMatrixBec;

// matrices bec2
glm::mat4 modelBec1;
glm::mat4 viewBec1;
glm::mat4 projectionBec1;
glm::mat3 normalMatrixBec1;


// light parameters
glm::vec3 lightDir;
glm::vec3 lightColor;

// light parameters
glm::vec3 lightDirP;
glm::vec3 lightColorP;

// light parameters
glm::vec3 lightDirO1;
glm::vec3 lightColorO1;

// light parameters
glm::vec3 lightDirO2;
glm::vec3 lightColorO2;

// light parameters
glm::vec3 lightDirO3;
glm::vec3 lightColorO3;

// light parameters
glm::vec3 lightDirO4;
glm::vec3 lightColorO4;

// light parameters
glm::vec3 lightDirF1;
glm::vec3 lightColorF1;

// light parameters
glm::vec3 lightDirF2;
glm::vec3 lightColorF2;

// light parameters
glm::vec3 lightDirBec;
glm::vec3 lightColorBec;

// light parameters
glm::vec3 lightDirBec1;
glm::vec3 lightColorBec1;


// shader uniform locations
GLint modelLoc;
GLint viewLoc;
GLint projectionLoc;
GLint normalMatrixLoc;
GLint lightDirLoc;
GLint lightColorLoc;


// shader uniform locations
GLint modelLocP;
GLint viewLocP;
GLint projectionLocP;
GLint normalMatrixLocP;
GLint lightDirLocP;
GLint lightColorLocP;

// shader uniform locations
GLint modelLocO1;
GLint viewLocO1;
GLint projectionLocO1;
GLint normalMatrixLocO1;
GLint lightDirLocO1;
GLint lightColorLocO1;

// shader uniform locations
GLint modelLocO2;
GLint viewLocO2;
GLint projectionLocO2;
GLint normalMatrixLocO2;
GLint lightDirLocO2;
GLint lightColorLocO2;

// shader uniform locations
GLint modelLocO3;
GLint viewLocO3;
GLint projectionLocO3;
GLint normalMatrixLocO3;
GLint lightDirLocO3;
GLint lightColorLocO3;


// shader uniform locations
GLint modelLocO4;
GLint viewLocO4;
GLint projectionLocO4;
GLint normalMatrixLocO4;
GLint lightDirLocO4;
GLint lightColorLocO4;

// shader uniform locations
GLint modelLocF1;
GLint viewLocF1;
GLint projectionLocF1;
GLint normalMatrixLocF1;
GLint lightDirLocF1;
GLint lightColorLocF1;

// shader uniform locations
GLint modelLocF2;
GLint viewLocF2;
GLint projectionLocF2;
GLint normalMatrixLocF2;
GLint lightDirLocF2;
GLint lightColorLocF2;

// shader uniform locations
GLint modelLocBec;
GLint viewLocBec;
GLint projectionLocBec;
GLint normalMatrixLocBec;
GLint lightDirLocBec;
GLint lightColorLocBec;

// shader uniform locations
GLint modelLocBec1;
GLint viewLocBec1;
GLint projectionLocBec1;
GLint normalMatrixLocBec1;
GLint lightDirLocBec1;
GLint lightColorLocBec1;


// camera
gps::Camera myCamera(
        glm::vec3(5.4f, 1.2f, 7.9f),
        glm::vec3(0.0f, 0.0f, -10.0f),
        glm::vec3(0.0f, 1.0f, 0.0f));

gps::SkyBox mySkyBox;
gps::Shader skyboxShader;

//GLfloat cameraSpeed = 1.9f;
GLfloat cameraSpeed = 3.0f;
double lastFrameTime = glfwGetTime();
double deltaTime = 0.0;


GLboolean pressedKeys[1024];

// models
gps::Model3D scene;
gps::Model3D potir;
gps::Model3D villager1;
gps::Model3D villager2;
gps::Model3D villager3;
gps::Model3D villager4;
gps::Model3D foc1;
gps::Model3D foc2;
gps::Model3D bec;
gps::Model3D bec1;
GLfloat angle;

// shaders
gps::Shader myBasicShader;
gps::Shader potirShader;
gps::Shader villager1Shader;
gps::Shader villager2Shader;
gps::Shader villager3Shader;
gps::Shader villager4Shader;
gps::Shader foc1Shader;
gps::Shader foc2Shader;
gps::Shader becShader;
gps::Shader bec1Shader;

struct SnowFlake {
    float x, y, z;
    float speed;
};

const int number_of_snowflakes = 10000;
const float snowBoxSize = 50.0f;

std::vector<SnowFlake> snowflakes;
GLuint snowVAO, snowVBO;
gps::Shader snowShader;

struct Interactable {
    glm::vec3 position;
    float interactionRadius;
    bool active;
    bool used;
};

std::vector<Interactable> people;
std::vector<Interactable> poti;
glm::vec3 playerPos;


///Initializare date despre TEREN

const float mapCenterX = 23.53f;
const float mapCenterZ = -7.53f;

const float mapWidth = 62.93f;
const float mapLength = 60.90f;

//const float mapMaxHeight = 0.905f;
const float mapMaxHeight = 4.0f;

unsigned char *heightMapData = nullptr;
int hmWidth, hmHeight, hmChannels;

//Initializare date despre obstacole
unsigned char *obstacleMapData = nullptr;
int obsWidth, obsHeight, obsChannels;


bool good_mode = true; //true - coliziune
bool presentationMode = false;
glm::vec3 old_pos_camera;

///Zona de umbre
GLuint shadowMapFBO;
GLuint depthMapTexture;
const unsigned int SHADOW_WIDTH = 2048;
const unsigned int SHADOW_HEIGHT = 2048;

gps::Shader depthMapShader;

GLenum glCheckError_(const char *file, int line) {
    GLenum errorCode;
    while ((errorCode = glGetError()) != GL_NO_ERROR) {
        std::string error;
        switch (errorCode) {
            case GL_INVALID_ENUM:
                error = "INVALID_ENUM";
                break;
            case GL_INVALID_VALUE:
                error = "INVALID_VALUE";
                break;
            case GL_INVALID_OPERATION:
                error = "INVALID_OPERATION";
                break;
            case GL_OUT_OF_MEMORY:
                error = "OUT_OF_MEMORY";
                break;
            case GL_INVALID_FRAMEBUFFER_OPERATION:
                error = "INVALID_FRAMEBUFFER_OPERATION";
                break;
        }
        std::cout << error << " | " << file << " (" << line << ")" << std::endl;
    }
    return errorCode;
}

#define glCheckError() glCheckError_(__FILE__, __LINE__)

void windowResizeCallback(GLFWwindow *window, int width, int height) {
    fprintf(stdout, "Window resized! New width: %d , and height: %d\n", width, height);
    //TODO
    glViewport(0, 0, width, height);
}

void keyboardCallback(GLFWwindow *window, int key, int scancode, int action, int mode) {
    if (key == GLFW_KEY_ESCAPE && action == GLFW_PRESS) {
        glfwSetWindowShouldClose(window, GL_TRUE);
    }

    if (key == GLFW_KEY_P && action == GLFW_PRESS) {
        if(!presentationMode){
            old_pos_camera = myCamera.getCameraPosition();
        }
        presentationMode = !presentationMode;

        //resetam toate lucrurile
        if (!presentationMode) {
            angle = 0.0f;
            myCamera.setCameraPosition(old_pos_camera);
            myBasicShader.useShaderProgram();
            model = glm::mat4(1.0f);
            glUniformMatrix4fv(modelLoc, 1, GL_FALSE, glm::value_ptr(model));
            normalMatrix = glm::mat3(glm::inverseTranspose(view * model));
            glUniformMatrix3fv(normalMatrixLoc, 1, GL_FALSE, glm::value_ptr(normalMatrix));

            //Potir
            potirShader.useShaderProgram();
            modelP = glm::translate(glm::mat4(1.0f), glm::vec3(3.55f, 0.85f, 8.15f));
            modelP = glm::scale(modelP, glm::vec3(1.0f / 40.0f, 1.0f / 40.0f, 1.0f / 40.0f));
            glUniformMatrix4fv(modelLocP, 1, GL_FALSE, glm::value_ptr(modelP));
            normalMatrixP = glm::mat3(glm::inverseTranspose(viewP * modelP));
            glUniformMatrix3fv(normalMatrixLocP, 1, GL_FALSE, glm::value_ptr(normalMatrixP));

            //Villager 1
            villager1Shader.useShaderProgram();
            modelO1 = glm::translate(glm::mat4(1.0f), glm::vec3(27.5f, 0.2f, 21.5f));
            modelO1 = glm::rotate(modelO1, glm::radians(-90.0f), glm::vec3(1.0f, 0.0f, 0.0f));
            modelO1 = glm::scale(modelO1, glm::vec3(1.0f / 75.0f, 1.0f / 75.0f, 1.0f / 75.0f));
            glUniformMatrix4fv(modelLocO1, 1, GL_FALSE, glm::value_ptr(modelO1));
            normalMatrixO1 = glm::mat3(glm::inverseTranspose(viewO1 * modelO1));
            glUniformMatrix3fv(normalMatrixLocO1, 1, GL_FALSE, glm::value_ptr(normalMatrixO1));

            // Villager 2
            villager2Shader.useShaderProgram();
            modelO2 = glm::translate(glm::mat4(1.0f), glm::vec3(37.3f, 0.2f, 0.7f));
            modelO2 = glm::rotate(modelO2, glm::radians(-90.0f), glm::vec3(1.0f, 0.0f, 0.0f));
            modelO2 = glm::scale(modelO2, glm::vec3(1.0f / 75.0f, 1.0f / 75.0f, 1.0f / 75.0f));
            modelO2 = glm::rotate(modelO2, glm::radians(50.0f), glm::vec3(0.0f, 0.0f, 1.0f));
            glUniformMatrix4fv(modelLocO2, 1, GL_FALSE, glm::value_ptr(modelO2));
            normalMatrixO2 = glm::mat3(glm::inverseTranspose(viewO2 * modelO2));
            glUniformMatrix3fv(normalMatrixLocO2, 1, GL_FALSE, glm::value_ptr(normalMatrixO2));

            //Villager 3
            villager3Shader.useShaderProgram();
            modelO3 = glm::translate(glm::mat4(1.0f), glm::vec3(37.3f, 0.2f, -4.6f));
            modelO3 = glm::rotate(modelO3, glm::radians(-90.0f), glm::vec3(1.0f, 0.0f, 0.0f));
            modelO3 = glm::scale(modelO3, glm::vec3(1.0f / 75.0f, 1.0f / 75.0f, 1.0f / 75.0f));
            glUniformMatrix4fv(modelLocO3, 1, GL_FALSE, glm::value_ptr(modelO3));
            normalMatrixO3 = glm::mat3(glm::inverseTranspose(viewO3 * modelO3));
            glUniformMatrix3fv(normalMatrixLocO3, 1, GL_FALSE, glm::value_ptr(normalMatrixO3));

            //Villager 4
            villager4Shader.useShaderProgram();
            modelO4 = glm::translate(glm::mat4(1.0f), glm::vec3(25.6f, 0.1f, -30.6f));
            modelO4 = glm::rotate(modelO4, glm::radians(-90.0f), glm::vec3(1.0f, 0.0f, 0.0f));
            modelO4 = glm::scale(modelO4, glm::vec3(1.0f / 75.0f, 1.0f / 75.0f, 1.0f / 75.0f));
            modelO4 = glm::rotate(modelO4, glm::radians(40.0f), glm::vec3(0.0f, 0.0f, 1.0f));
            glUniformMatrix4fv(modelLocO4, 1, GL_FALSE, glm::value_ptr(modelO4));
            normalMatrixO4 = glm::mat3(glm::inverseTranspose(viewO4 * modelO4));
            glUniformMatrix3fv(normalMatrixLocO4, 1, GL_FALSE, glm::value_ptr(normalMatrixO4));

            //lumina1
            foc1Shader.useShaderProgram();
            modelF1 = glm::translate(glm::mat4(1.0f), glm::vec3(3.97f, 0.27f, 7.54f));
            modelF1 = glm::scale(modelF1, glm::vec3(1.0f / 2.0f, 1.0f / 2.0f, 1.0f / 2.0f));
            modelF1 = glm::rotate(modelF1, glm::radians(90.0f), glm::vec3(0.0f, 1.0f, 0.0f));
            glUniformMatrix4fv(modelLocF1, 1, GL_FALSE, glm::value_ptr(modelF1));
            normalMatrixF1 = glm::mat3(glm::inverseTranspose(viewF1 * modelF1));
            glUniformMatrix3fv(normalMatrixLocF1, 1, GL_FALSE, glm::value_ptr(normalMatrixF1));

            //lumina2
            foc2Shader.useShaderProgram();
            modelF2 = glm::translate(glm::mat4(1.0f), glm::vec3(4.03f, 0.27f, 8.76f));
            modelF2 = glm::scale(modelF2, glm::vec3(1.0f / 2.0f, 1.0f / 2.0f, 1.0f / 2.0f));
            modelF2 = glm::rotate(modelF2, glm::radians(90.0f), glm::vec3(0.0f, 1.0f, 0.0f));
            glUniformMatrix4fv(modelLocF2, 1, GL_FALSE, glm::value_ptr(modelF2));
            normalMatrixF2 = glm::mat3(glm::inverseTranspose(viewF2 * modelF2));
            glUniformMatrix3fv(normalMatrixLocF2, 1, GL_FALSE, glm::value_ptr(normalMatrixF2));

            //bec1
            becShader.useShaderProgram();
            modelBec = glm::translate(glm::mat4(1.0f), glm::vec3(4.03f, 0.28f, 8.76f));
            modelBec = glm::scale(modelBec, glm::vec3(1.0f / 180.0f, 1.0f / 80.0f, 1.0f / 180.0f));
            glUniformMatrix4fv(modelLocBec, 1, GL_FALSE, glm::value_ptr(modelBec));
            normalMatrixBec = glm::mat3(glm::inverseTranspose(viewBec * modelBec));
            glUniformMatrix3fv(normalMatrixLocBec, 1, GL_FALSE, glm::value_ptr(normalMatrixBec));

            //bec2
            bec1Shader.useShaderProgram();
            modelBec1 = glm::translate(glm::mat4(1.0f), glm::vec3(3.97f, 0.28f, 7.54f));
            modelBec1 = glm::scale(modelBec1, glm::vec3(1.0f / 180.0f, 1.0f / 80.0f, 1.0f / 180.0f));
            glUniformMatrix4fv(modelLocBec1, 1, GL_FALSE, glm::value_ptr(modelBec1));
            normalMatrixBec1 = glm::mat3(glm::inverseTranspose(viewBec1 * modelBec1));
            glUniformMatrix3fv(normalMatrixLocBec1, 1, GL_FALSE, glm::value_ptr(normalMatrixBec1));
        }
    }

    if (key >= 0 && key < 1024) {
        if (action == GLFW_PRESS) {
            pressedKeys[key] = true;
        } else if (action == GLFW_RELEASE) {
            pressedKeys[key] = false;
        }
    }
}

bool firstMouseMove = true;
float lastX, lastY;

void mouseCallback(GLFWwindow *window, double xpos, double ypos) {
    //TODO
    //std :: cout << "X pos: " << xpos << " Y pos: " << ypos << "\n";
    if (firstMouseMove) {
        lastX = xpos;
        lastY = ypos;
        firstMouseMove = false;
    }

    float offsetX = -(xpos - lastX);
    float offsetY = -(ypos - lastY);
    lastX = xpos;
    lastY = ypos;

    float sensibility = 0.05f;
    offsetX *= sensibility;
    offsetY *= sensibility;

    myCamera.rotate(offsetX, offsetY);

    view = myCamera.getViewMatrix();
    myBasicShader.useShaderProgram();
    glUniformMatrix4fv(viewLoc, 1, GL_FALSE, glm::value_ptr(view));
    // compute normal matrix for scene
    normalMatrix = glm::mat3(glm::inverseTranspose(view * model));
}

void interactWithPerson(int index) {
    std::cout << "Interaction with people " << index << std::endl;

    people[index].active = true;
}

void interactWithPotir(int index) {
    std::cout << "Interaction with potir " << index << std::endl;

    poti[index].active = true;
}

int getNearestPersonIndex() {
    float minDistance = FLT_MAX;
    int nearestIndex = -1;

    glm::vec3 playerPos = myCamera.getCameraPosition();

    for (int i = 0; i < people.size(); i++) {
        if (people[i].active)
            continue;

        float distance = glm::length(playerPos - people[i].position);

        if (distance < people[i].interactionRadius && distance < minDistance) {
            minDistance = distance;
            nearestIndex = i;
        }
    }

    return nearestIndex;
}

int getNearestPotirIndex() {
    float minDistance = FLT_MAX;
    int nearestIndex = -1;

    glm::vec3 potirPos = myCamera.getCameraPosition();

    for (int i = 0; i < poti.size(); i++) {
        if (poti[i].active)
            continue;

        float distance = glm::length(potirPos - poti[i].position);

        if (distance < poti[i].interactionRadius && distance < minDistance) {
            minDistance = distance;
            nearestIndex = i;
        }
    }

    return nearestIndex;
}

float getTerrainHeight(float playerX, float playerZ) {
    if (!heightMapData) return 0.0f;

    int rotatie = 0;

    float mapLeftX = mapCenterX - mapWidth / 2.0f;
    float mapTopZ = mapCenterZ - mapLength / 2.0f;

    float u = (playerX - mapLeftX) / mapWidth;
    float v = (playerZ - mapTopZ) / mapLength;

    if (u < 0.0f || u >= 1.0f || v < 0.0f || v >= 1.0f) {
        return 0.0f;
    }

    int pixelX, pixelY;

    switch (rotatie) {
        case 0: // Normal
            pixelX = (int) (u * hmWidth);
            pixelY = (int) (v * hmHeight);
            break;
        case 1: // 90 Grade Ceasornic
            pixelX = (int) (v * hmWidth);
            pixelY = (int) ((1.0f - u) * hmHeight);
            break;
        case 2: // 180 Grade
            pixelX = (int) ((1.0f - u) * hmWidth);
            pixelY = (int) ((1.0f - v) * hmHeight);
            break;
        case 3: // 270 Grade Ceasornic
            pixelX = (int) ((1.0f - v) * hmWidth);
            pixelY = (int) (u * hmHeight);
            break;
        default:
            pixelX = (int) (u * hmWidth);
            pixelY = (int) (v * hmHeight);
            break;
    }

    int manualOffsetX = -30;
    int manualOffsetY = 10;

    pixelX += manualOffsetX;
    pixelY += manualOffsetY;

    if (pixelX >= hmWidth) pixelX = hmWidth - 1;
    if (pixelY >= hmHeight) pixelY = hmHeight - 1;
    if (pixelX < 0) pixelX = 0;
    if (pixelY < 0) pixelY = 0;

    int index = (pixelY * hmWidth + pixelX) * hmChannels;
    unsigned char pixelValue = heightMapData[index];

    float finalHeight = (pixelValue / 255.0f) * mapMaxHeight;

//    if (finalHeight < 0.50f) {
//        return 0.1f;
//    }

    return finalHeight;
}

bool checkObstacle(float playerX, float playerZ) {
    if (!obstacleMapData) return false;

    int rotatie = 0;

    float mapLeftX = mapCenterX - mapWidth / 2.0f;
    float mapTopZ = mapCenterZ - mapLength / 2.0f;

    float u = (playerX - mapLeftX) / mapWidth;
    float v = (playerZ - mapTopZ) / mapLength;

    if (u < 0.0f || u >= 1.0f || v < 0.0f || v >= 1.0f) {
        return true;
    }

    int pixelX, pixelY;
    switch (rotatie) {
        case 0:
            pixelX = (int) (u * obsWidth);
            pixelY = (int) (v * obsHeight);
            break;
        case 1:
            pixelX = (int) (v * obsWidth);
            pixelY = (int) ((1.0f - u) * obsHeight);
            break;
        case 2:
            pixelX = (int) ((1.0f - u) * obsWidth);
            pixelY = (int) ((1.0f - v) * obsHeight);
            break;
        case 3:
            pixelX = (int) ((1.0f - v) * obsWidth);
            pixelY = (int) (u * obsHeight);
            break;
        default:
            pixelX = (int) (u * obsWidth);
            pixelY = (int) (v * obsHeight);
            break;
    }

    int manualOffsetX = 15;
    int manualOffsetY = -10;

    pixelX += manualOffsetX;
    pixelY += manualOffsetY;

    if (pixelX >= obsWidth) pixelX = obsWidth - 1;
    if (pixelY >= obsHeight) pixelY = obsHeight - 1;
    if (pixelX < 0) pixelX = 0;
    if (pixelY < 0) pixelY = 0;

    int index = (pixelY * obsWidth + pixelX) * obsChannels;
    unsigned char pixelValue = obstacleMapData[index];

//    std::cout << "Pos: " << playerX << ", " << playerZ
//               << " | Pixel: " << pixelX << ", " << pixelY
//               << " | Culoare: " << (int)pixelValue << std::endl;

    if (pixelValue < 50) {
        return true; // Coliziune
    }

    return false; // E Alb -> Liber
}

void updatePresentationAnimation() {
    if (!presentationMode) return;

    float radius = 15.0f;
    float height = 2.5f;
    float speed = 0.3f;

    double time = glfwGetTime();

    float camX = sin(time * speed) * radius;
    float camZ = cos(time * speed) * radius;

    glm::vec3 newPos = glm::vec3(camX + 2.0f, height, camZ + 2.0f);

    glm::vec3 centerTarget = glm::vec3(40.0f, 0.0f, 10.0f);

    myCamera.setCameraPosition(newPos);
    myCamera.setCameraDirection(glm::normalize(centerTarget - newPos));
}

void processMovement() {

    if (presentationMode) {
        updatePresentationAnimation();

        view = myCamera.getViewMatrix();

        myBasicShader.useShaderProgram();
        glUniformMatrix4fv(viewLoc, 1, GL_FALSE, glm::value_ptr(view));
        normalMatrix = glm::mat3(glm::inverseTranspose(view * model));
        glUniformMatrix3fv(normalMatrixLoc, 1, GL_FALSE, glm::value_ptr(normalMatrix));

        //Potir update
        potirShader.useShaderProgram();
        glUniformMatrix4fv(viewLocP, 1, GL_FALSE, glm::value_ptr(view));
        normalMatrixP = glm::mat3(glm::inverseTranspose(view * modelP));
        glUniformMatrix3fv(normalMatrixLocP, 1, GL_FALSE, glm::value_ptr(normalMatrixP));

        //Villager 1 update
        villager1Shader.useShaderProgram();
        glUniformMatrix4fv(viewLocO1, 1, GL_FALSE, glm::value_ptr(view));
        normalMatrixO1 = glm::mat3(glm::inverseTranspose(view * modelO1));
        glUniformMatrix3fv(normalMatrixLocO1, 1, GL_FALSE, glm::value_ptr(normalMatrixO1));

        //Villager 2 update
        villager2Shader.useShaderProgram();
        glUniformMatrix4fv(viewLocO2, 1, GL_FALSE, glm::value_ptr(view));
        normalMatrixO2 = glm::mat3(glm::inverseTranspose(view * modelO2));
        glUniformMatrix3fv(normalMatrixLocO2, 1, GL_FALSE, glm::value_ptr(normalMatrixO2));

        //Villager 3 update
        villager3Shader.useShaderProgram();
        glUniformMatrix4fv(viewLocO3, 1, GL_FALSE, glm::value_ptr(view));
        normalMatrixO3 = glm::mat3(glm::inverseTranspose(view * modelO3));
        glUniformMatrix3fv(normalMatrixLocO3, 1, GL_FALSE, glm::value_ptr(normalMatrixO3));

        //Villager4 update
        villager4Shader.useShaderProgram();
        glUniformMatrix4fv(viewLocO4, 1, GL_FALSE, glm::value_ptr(view));
        normalMatrixO4 = glm::mat3(glm::inverseTranspose(view * modelO4));
        glUniformMatrix3fv(normalMatrixLocO4, 1, GL_FALSE, glm::value_ptr(normalMatrixO4));

        //Foc1 update
        foc1Shader.useShaderProgram();
        glUniformMatrix4fv(viewLocF1, 1, GL_FALSE, glm::value_ptr(view));
        normalMatrixF1 = glm::mat3(glm::inverseTranspose(view * modelF1));
        glUniformMatrix3fv(normalMatrixLocF1, 1, GL_FALSE, glm::value_ptr(normalMatrixF1));

        //Foc2 update
        foc2Shader.useShaderProgram();
        glUniformMatrix4fv(viewLocF2, 1, GL_FALSE, glm::value_ptr(view));
        normalMatrixF2 = glm::mat3(glm::inverseTranspose(view * modelF2));
        glUniformMatrix3fv(normalMatrixLocF2, 1, GL_FALSE, glm::value_ptr(normalMatrixF2));

        //Lumina1 update
        becShader.useShaderProgram();
        glUniformMatrix4fv(viewLocBec, 1, GL_FALSE, glm::value_ptr(view));
        normalMatrixBec = glm::mat3(glm::inverseTranspose(view * modelBec));
        glUniformMatrix3fv(normalMatrixLocBec, 1, GL_FALSE, glm::value_ptr(normalMatrixBec));

        //Lumina2 update
        bec1Shader.useShaderProgram();
        glUniformMatrix4fv(viewLocBec1, 1, GL_FALSE, glm::value_ptr(view));
        normalMatrixBec1 = glm::mat3(glm::inverseTranspose(view * modelBec1));
        glUniformMatrix3fv(normalMatrixLocBec1, 1, GL_FALSE, glm::value_ptr(normalMatrixBec1));

        return;
    }

    if (pressedKeys[GLFW_KEY_W]) {
        glm::vec3 oldPos = myCamera.getCameraPosition();

        myCamera.move(gps::MOVE_FORWARD, cameraSpeed * deltaTime);
        if (good_mode) {
            glm::vec3 pos = myCamera.getCameraPosition();

            float groundHeight = getTerrainHeight(pos.x, pos.z);
            float playerHeight = 0.4f;
            pos.y = groundHeight + playerHeight;
            std::cout << "X: " << pos.x << " Z: " << pos.z << " Height: " << groundHeight << std::endl;
            myCamera.setCameraPosition(pos);

            if (checkObstacle(pos.x, pos.z)) {
                myCamera.setCameraPosition(oldPos);
            }
        }
        //update view matrix
        view = myCamera.getViewMatrix();
        myBasicShader.useShaderProgram();
        glUniformMatrix4fv(viewLoc, 1, GL_FALSE, glm::value_ptr(view));
        // compute normal matrix for scene
        normalMatrix = glm::mat3(glm::inverseTranspose(view * model));


        ///Actualizare pentru potir
        viewP = myCamera.getViewMatrix();
        potirShader.useShaderProgram();
        glUniformMatrix4fv(viewLocP, 1, GL_FALSE, glm::value_ptr(viewP));
        normalMatrixP = glm::mat3(glm::inverseTranspose(viewP * modelP));

        ///Actualizare pentru Villager1
        viewO1 = myCamera.getViewMatrix();
        villager1Shader.useShaderProgram();
        glUniformMatrix4fv(viewLocO1, 1, GL_FALSE, glm::value_ptr(viewO1));
        normalMatrixO1 = glm::mat3(glm::inverseTranspose(viewO1 * modelO1));


        ///Actualizare pentru Villager2
        viewO2 = myCamera.getViewMatrix();
        villager2Shader.useShaderProgram();
        glUniformMatrix4fv(viewLocO2, 1, GL_FALSE, glm::value_ptr(viewO2));
        normalMatrixO2 = glm::mat3(glm::inverseTranspose(viewO2 * modelO2));


        ///Actualizare pentru Villager3
        viewO3 = myCamera.getViewMatrix();
        villager3Shader.useShaderProgram();
        glUniformMatrix4fv(viewLocO3, 1, GL_FALSE, glm::value_ptr(viewO3));
        normalMatrixO3 = glm::mat3(glm::inverseTranspose(viewO3 * modelO3));


        ///Actualizare pentru Villager4
        viewO4 = myCamera.getViewMatrix();
        villager4Shader.useShaderProgram();
        glUniformMatrix4fv(viewLocO4, 1, GL_FALSE, glm::value_ptr(viewO4));
        normalMatrixO4 = glm::mat3(glm::inverseTranspose(viewO4 * modelO4));

        ///Actualizare pentru foc1
        viewF1 = myCamera.getViewMatrix();
        foc1Shader.useShaderProgram();
        glUniformMatrix4fv(viewLocF1, 1, GL_FALSE, glm::value_ptr(viewF1));
        normalMatrixF1 = glm::mat3(glm::inverseTranspose(viewF1 * modelF1));

        ///Actualizare pentru foc2
        viewF2 = myCamera.getViewMatrix();
        foc2Shader.useShaderProgram();
        glUniformMatrix4fv(viewLocF2, 1, GL_FALSE, glm::value_ptr(viewF2));
        normalMatrixF2 = glm::mat3(glm::inverseTranspose(viewF2 * modelF2));

        ///Actualizare pentru bec1
        viewBec = myCamera.getViewMatrix();
        becShader.useShaderProgram();
        glUniformMatrix4fv(viewLocBec, 1, GL_FALSE, glm::value_ptr(viewBec));
        normalMatrixBec = glm::mat3(glm::inverseTranspose(viewBec * modelBec));

        ///Actualizare pentru bec2
        viewBec1 = myCamera.getViewMatrix();
        bec1Shader.useShaderProgram();
        glUniformMatrix4fv(viewLocBec1, 1, GL_FALSE, glm::value_ptr(viewBec1));
        normalMatrixBec1 = glm::mat3(glm::inverseTranspose(viewBec1 * modelBec1));
    }

    if (pressedKeys[GLFW_KEY_S]) {
        glm::vec3 oldPos = myCamera.getCameraPosition();

        myCamera.move(gps::MOVE_BACKWARD, cameraSpeed * deltaTime);
        if (good_mode) {
            glm::vec3 pos = myCamera.getCameraPosition();

            float groundHeight = getTerrainHeight(pos.x, pos.z);
            float playerHeight = 0.4f;
            pos.y = groundHeight + playerHeight;
            std::cout << "X: " << pos.x << " Z: " << pos.z << " Height: " << groundHeight << std::endl;
            myCamera.setCameraPosition(pos);

            if (checkObstacle(pos.x, pos.z)) {
                myCamera.setCameraPosition(oldPos);
            }
        }
        //update view matrix
        view = myCamera.getViewMatrix();
        myBasicShader.useShaderProgram();
        glUniformMatrix4fv(viewLoc, 1, GL_FALSE, glm::value_ptr(view));
        // compute normal matrix for scene
        normalMatrix = glm::mat3(glm::inverseTranspose(view * model));


        ///Actualizare pentru potir
        viewP = myCamera.getViewMatrix();
        potirShader.useShaderProgram();
        glUniformMatrix4fv(viewLocP, 1, GL_FALSE, glm::value_ptr(viewP));
        normalMatrixP = glm::mat3(glm::inverseTranspose(viewP * modelP));

        ///Actualizare pentru Villager1
        viewO1 = myCamera.getViewMatrix();
        villager1Shader.useShaderProgram();
        glUniformMatrix4fv(viewLocO1, 1, GL_FALSE, glm::value_ptr(viewO1));
        normalMatrixO1 = glm::mat3(glm::inverseTranspose(viewO1 * modelO1));


        ///Actualizare pentru Villager2
        viewO2 = myCamera.getViewMatrix();
        villager2Shader.useShaderProgram();
        glUniformMatrix4fv(viewLocO2, 1, GL_FALSE, glm::value_ptr(viewO2));
        normalMatrixO2 = glm::mat3(glm::inverseTranspose(viewO2 * modelO2));


        ///Actualizare pentru Villager3
        viewO3 = myCamera.getViewMatrix();
        villager3Shader.useShaderProgram();
        glUniformMatrix4fv(viewLocO3, 1, GL_FALSE, glm::value_ptr(viewO3));
        normalMatrixO3 = glm::mat3(glm::inverseTranspose(viewO3 * modelO3));


        ///Actualizare pentru Villager4
        viewO4 = myCamera.getViewMatrix();
        villager4Shader.useShaderProgram();
        glUniformMatrix4fv(viewLocO4, 1, GL_FALSE, glm::value_ptr(viewO4));
        normalMatrixO4 = glm::mat3(glm::inverseTranspose(viewO4 * modelO4));


        ///Actualizare pentru foc1
        viewF1 = myCamera.getViewMatrix();
        foc1Shader.useShaderProgram();
        glUniformMatrix4fv(viewLocF1, 1, GL_FALSE, glm::value_ptr(viewF1));
        normalMatrixF1 = glm::mat3(glm::inverseTranspose(viewF1 * modelF1));

        ///Actualizare pentru foc2
        viewF2 = myCamera.getViewMatrix();
        foc2Shader.useShaderProgram();
        glUniformMatrix4fv(viewLocF2, 1, GL_FALSE, glm::value_ptr(viewF2));
        normalMatrixF2 = glm::mat3(glm::inverseTranspose(viewF2 * modelF2));


        ///Actualizare pentru bec1
        viewBec = myCamera.getViewMatrix();
        becShader.useShaderProgram();
        glUniformMatrix4fv(viewLocBec, 1, GL_FALSE, glm::value_ptr(viewBec));
        normalMatrixBec = glm::mat3(glm::inverseTranspose(viewBec * modelBec));

        ///Actualizare pentru bec2
        viewBec1 = myCamera.getViewMatrix();
        bec1Shader.useShaderProgram();
        glUniformMatrix4fv(viewLocBec1, 1, GL_FALSE, glm::value_ptr(viewBec1));
        normalMatrixBec1 = glm::mat3(glm::inverseTranspose(viewBec1 * modelBec1));
    }

    if (pressedKeys[GLFW_KEY_A]) {
        glm::vec3 oldPos = myCamera.getCameraPosition();

        myCamera.move(gps::MOVE_LEFT, cameraSpeed * deltaTime);
        if (good_mode) {
            glm::vec3 pos = myCamera.getCameraPosition();

            float groundHeight = getTerrainHeight(pos.x, pos.z);
            float playerHeight = 0.4f;
            pos.y = groundHeight + playerHeight;
            std::cout << "X: " << pos.x << " Z: " << pos.z << " Height: " << groundHeight << std::endl;
            myCamera.setCameraPosition(pos);

            if (checkObstacle(pos.x, pos.z)) {
                myCamera.setCameraPosition(oldPos);
            }
        }
        //update view matrix
        view = myCamera.getViewMatrix();
        myBasicShader.useShaderProgram();
        glUniformMatrix4fv(viewLoc, 1, GL_FALSE, glm::value_ptr(view));
        // compute normal matrix for scene
        normalMatrix = glm::mat3(glm::inverseTranspose(view * model));


        ///Actualizare pentru potir
        viewP = myCamera.getViewMatrix();
        potirShader.useShaderProgram();
        glUniformMatrix4fv(viewLocP, 1, GL_FALSE, glm::value_ptr(viewP));
        normalMatrixP = glm::mat3(glm::inverseTranspose(viewP * modelP));


        ///Actualizare pentru Villager1
        viewO1 = myCamera.getViewMatrix();
        villager1Shader.useShaderProgram();
        glUniformMatrix4fv(viewLocO1, 1, GL_FALSE, glm::value_ptr(viewO1));
        normalMatrixO1 = glm::mat3(glm::inverseTranspose(viewO1 * modelO1));


        ///Actualizare pentru Villager2
        viewO2 = myCamera.getViewMatrix();
        villager2Shader.useShaderProgram();
        glUniformMatrix4fv(viewLocO2, 1, GL_FALSE, glm::value_ptr(viewO2));
        normalMatrixO2 = glm::mat3(glm::inverseTranspose(viewO2 * modelO2));


        ///Actualizare pentru Villager3
        viewO3 = myCamera.getViewMatrix();
        villager3Shader.useShaderProgram();
        glUniformMatrix4fv(viewLocO3, 1, GL_FALSE, glm::value_ptr(viewO3));
        normalMatrixO3 = glm::mat3(glm::inverseTranspose(viewO3 * modelO3));


        ///Actualizare pentru Villager4
        viewO4 = myCamera.getViewMatrix();
        villager4Shader.useShaderProgram();
        glUniformMatrix4fv(viewLocO4, 1, GL_FALSE, glm::value_ptr(viewO4));
        normalMatrixO4 = glm::mat3(glm::inverseTranspose(viewO4 * modelO4));


        ///Actualizare pentru foc1
        viewF1 = myCamera.getViewMatrix();
        foc1Shader.useShaderProgram();
        glUniformMatrix4fv(viewLocF1, 1, GL_FALSE, glm::value_ptr(viewF1));
        normalMatrixF1 = glm::mat3(glm::inverseTranspose(viewF1 * modelF1));

        ///Actualizare pentru foc2
        viewF2 = myCamera.getViewMatrix();
        foc2Shader.useShaderProgram();
        glUniformMatrix4fv(viewLocF2, 1, GL_FALSE, glm::value_ptr(viewF2));
        normalMatrixF2 = glm::mat3(glm::inverseTranspose(viewF2 * modelF2));


        ///Actualizare pentru bec1
        viewBec = myCamera.getViewMatrix();
        becShader.useShaderProgram();
        glUniformMatrix4fv(viewLocBec, 1, GL_FALSE, glm::value_ptr(viewBec));
        normalMatrixBec = glm::mat3(glm::inverseTranspose(viewBec * modelBec));

        ///Actualizare pentru bec2
        viewBec1 = myCamera.getViewMatrix();
        bec1Shader.useShaderProgram();
        glUniformMatrix4fv(viewLocBec1, 1, GL_FALSE, glm::value_ptr(viewBec1));
        normalMatrixBec1 = glm::mat3(glm::inverseTranspose(viewBec1 * modelBec1));
    }

    if (pressedKeys[GLFW_KEY_D]) {
        glm::vec3 oldPos = myCamera.getCameraPosition();

        myCamera.move(gps::MOVE_RIGHT, cameraSpeed * deltaTime);
        if (good_mode) {
            glm::vec3 pos = myCamera.getCameraPosition();

            float groundHeight = getTerrainHeight(pos.x, pos.z);
            float playerHeight = 0.4f;
            pos.y = groundHeight + playerHeight;
            std::cout << "X: " << pos.x << " Z: " << pos.z << " Height: " << groundHeight << std::endl;
            myCamera.setCameraPosition(pos);

            if (checkObstacle(pos.x, pos.z)) {
                myCamera.setCameraPosition(oldPos);
            }
        }
        //update view matrix
        view = myCamera.getViewMatrix();
        myBasicShader.useShaderProgram();
        glUniformMatrix4fv(viewLoc, 1, GL_FALSE, glm::value_ptr(view));
        // compute normal matrix for scene
        normalMatrix = glm::mat3(glm::inverseTranspose(view * model));


        ///Actualizare pentru potir
        viewP = myCamera.getViewMatrix();
        potirShader.useShaderProgram();
        glUniformMatrix4fv(viewLocP, 1, GL_FALSE, glm::value_ptr(viewP));
        normalMatrixP = glm::mat3(glm::inverseTranspose(viewP * modelP));


        ///Actualizare pentru Villager1
        viewO1 = myCamera.getViewMatrix();
        villager1Shader.useShaderProgram();
        glUniformMatrix4fv(viewLocO1, 1, GL_FALSE, glm::value_ptr(viewO1));
        normalMatrixO1 = glm::mat3(glm::inverseTranspose(viewO1 * modelO1));


        ///Actualizare pentru Villager2
        viewO2 = myCamera.getViewMatrix();
        villager2Shader.useShaderProgram();
        glUniformMatrix4fv(viewLocO2, 1, GL_FALSE, glm::value_ptr(viewO2));
        normalMatrixO2 = glm::mat3(glm::inverseTranspose(viewO2 * modelO2));


        ///Actualizare pentru Villager3
        viewO3 = myCamera.getViewMatrix();
        villager3Shader.useShaderProgram();
        glUniformMatrix4fv(viewLocO3, 1, GL_FALSE, glm::value_ptr(viewO3));
        normalMatrixO3 = glm::mat3(glm::inverseTranspose(viewO3 * modelO3));


        ///Actualizare pentru Villager4
        viewO4 = myCamera.getViewMatrix();
        villager4Shader.useShaderProgram();
        glUniformMatrix4fv(viewLocO4, 1, GL_FALSE, glm::value_ptr(viewO4));
        normalMatrixO4 = glm::mat3(glm::inverseTranspose(viewO4 * modelO4));


        ///Actualizare pentru foc1
        viewF1 = myCamera.getViewMatrix();
        foc1Shader.useShaderProgram();
        glUniformMatrix4fv(viewLocF1, 1, GL_FALSE, glm::value_ptr(viewF1));
        normalMatrixF1 = glm::mat3(glm::inverseTranspose(viewF1 * modelF1));

        ///Actualizare pentru foc2
        viewF2 = myCamera.getViewMatrix();
        foc2Shader.useShaderProgram();
        glUniformMatrix4fv(viewLocF2, 1, GL_FALSE, glm::value_ptr(viewF2));
        normalMatrixF2 = glm::mat3(glm::inverseTranspose(viewF2 * modelF2));

        ///Actualizare pentru bec1
        viewBec = myCamera.getViewMatrix();
        becShader.useShaderProgram();
        glUniformMatrix4fv(viewLocBec, 1, GL_FALSE, glm::value_ptr(viewBec));
        normalMatrixBec = glm::mat3(glm::inverseTranspose(viewBec * modelBec));

        ///Actualizare pentru bec2
        viewBec1 = myCamera.getViewMatrix();
        bec1Shader.useShaderProgram();
        glUniformMatrix4fv(viewLocBec1, 1, GL_FALSE, glm::value_ptr(viewBec1));
        normalMatrixBec1 = glm::mat3(glm::inverseTranspose(viewBec1 * modelBec1));
    }

    if (pressedKeys[GLFW_KEY_Q]) {
        angle -= 1.0f;

        myBasicShader.useShaderProgram();
        model = glm::rotate(glm::mat4(1.0f), glm::radians(angle), glm::vec3(0, 1, 0));
        glUniformMatrix4fv(modelLoc, 1, GL_FALSE, glm::value_ptr(model));
        normalMatrix = glm::mat3(glm::inverseTranspose(view * model));
        glUniformMatrix3fv(normalMatrixLoc, 1, GL_FALSE, glm::value_ptr(normalMatrix));

        //Potir
        potirShader.useShaderProgram();
        modelP = glm::rotate(glm::mat4(1.0f), glm::radians(angle), glm::vec3(0.0f, 1.0f, 0.0f));
        modelP = glm::translate(modelP, glm::vec3(3.55f, 0.85f, 8.15f));
        modelP = glm::scale(modelP, glm::vec3(1.0f / 40.0f, 1.0f / 40.0f, 1.0f / 40.0f));
        glUniformMatrix4fv(modelLocP, 1, GL_FALSE, glm::value_ptr(modelP));
        normalMatrixP = glm::mat3(glm::inverseTranspose(viewP * modelP));
        glUniformMatrix3fv(normalMatrixLocP, 1, GL_FALSE, glm::value_ptr(normalMatrixP));

        //Villager 1
        villager1Shader.useShaderProgram();
        modelO1 = glm::rotate(glm::mat4(1.0f), glm::radians(angle), glm::vec3(0.0f, 1.0f, 0.0f));
        modelO1 = glm::translate(modelO1, glm::vec3(27.5f, 0.2f, 21.5f));
        modelO1 = glm::rotate(modelO1, glm::radians(-90.0f), glm::vec3(1.0f, 0.0f, 0.0f));
        modelO1 = glm::scale(modelO1, glm::vec3(1.0f / 75.0f, 1.0f / 75.0f, 1.0f / 75.0f));
        glUniformMatrix4fv(modelLocO1, 1, GL_FALSE, glm::value_ptr(modelO1));
        normalMatrixO1 = glm::mat3(glm::inverseTranspose(viewO1 * modelO1));
        glUniformMatrix3fv(normalMatrixLocO1, 1, GL_FALSE, glm::value_ptr(normalMatrixO1));

        //Villager 2
        villager2Shader.useShaderProgram();
        modelO2 = glm::rotate(glm::mat4(1.0f), glm::radians(angle), glm::vec3(0.0f, 1.0f, 0.0f));
        modelO2 = glm::translate(modelO2, glm::vec3(37.3f, 0.2f, 0.7f));
        modelO2 = glm::rotate(modelO2, glm::radians(-90.0f), glm::vec3(1.0f, 0.0f, 0.0f));
        modelO2 = glm::scale(modelO2, glm::vec3(1.0f / 75.0f, 1.0f / 75.0f, 1.0f / 75.0f));
        modelO2 = glm::rotate(modelO2, glm::radians(50.0f), glm::vec3(0.0f, 0.0f, 1.0f));
        glUniformMatrix4fv(modelLocO2, 1, GL_FALSE, glm::value_ptr(modelO2));
        normalMatrixO2 = glm::mat3(glm::inverseTranspose(viewO2 * modelO2));
        glUniformMatrix3fv(normalMatrixLocO2, 1, GL_FALSE, glm::value_ptr(normalMatrixO2));

        //Villager 3
        villager3Shader.useShaderProgram();
        modelO3 = glm::rotate(glm::mat4(1.0f), glm::radians(angle), glm::vec3(0.0f, 1.0f, 0.0f));
        modelO3 = glm::translate(modelO3, glm::vec3(37.3f, 0.2f, -4.6f));
        modelO3 = glm::rotate(modelO3, glm::radians(-90.0f), glm::vec3(1.0f, 0.0f, 0.0f));
        modelO3 = glm::scale(modelO3, glm::vec3(1.0f / 75.0f, 1.0f / 75.0f, 1.0f / 75.0f));
        glUniformMatrix4fv(modelLocO3, 1, GL_FALSE, glm::value_ptr(modelO3));
        normalMatrixO3 = glm::mat3(glm::inverseTranspose(viewO3 * modelO3));
        glUniformMatrix3fv(normalMatrixLocO3, 1, GL_FALSE, glm::value_ptr(normalMatrixO3));

        // Villager 4
        villager4Shader.useShaderProgram();
        modelO4 = glm::rotate(glm::mat4(1.0f), glm::radians(angle), glm::vec3(0.0f, 1.0f, 0.0f));
        modelO4 = glm::translate(modelO4, glm::vec3(25.6f, 0.1f, -30.6f));
        modelO4 = glm::rotate(modelO4, glm::radians(-90.0f), glm::vec3(1.0f, 0.0f, 0.0f));
        modelO4 = glm::scale(modelO4, glm::vec3(1.0f / 75.0f, 1.0f / 75.0f, 1.0f / 75.0f));
        modelO4 = glm::rotate(modelO4, glm::radians(40.0f), glm::vec3(0.0f, 0.0f, 1.0f));
        glUniformMatrix4fv(modelLocO4, 1, GL_FALSE, glm::value_ptr(modelO4));
        normalMatrixO4 = glm::mat3(glm::inverseTranspose(viewO4 * modelO4));
        glUniformMatrix3fv(normalMatrixLocO4, 1, GL_FALSE, glm::value_ptr(normalMatrixO4));

        //Foc 1
        foc1Shader.useShaderProgram();
        modelF1 = glm::rotate(glm::mat4(1.0f), glm::radians(angle), glm::vec3(0.0f, 1.0f, 0.0f));
        modelF1 = glm::translate(modelF1, glm::vec3(3.97f, 0.27f, 7.54f));
        modelF1 = glm::scale(modelF1, glm::vec3(1.0f / 2.0f, 1.0f / 2.0f, 1.0f / 2.0f));
        modelF1 = glm::rotate(modelF1, glm::radians(90.0f), glm::vec3(0.0f, 1.0f, 0.0f));
        glUniformMatrix4fv(modelLocF1, 1, GL_FALSE, glm::value_ptr(modelF1));
        normalMatrixF1 = glm::mat3(glm::inverseTranspose(viewF1 * modelF1));
        glUniformMatrix3fv(normalMatrixLocF1, 1, GL_FALSE, glm::value_ptr(normalMatrixF1));

        //Foc 2
        foc2Shader.useShaderProgram();
        modelF2 = glm::rotate(glm::mat4(1.0f), glm::radians(angle), glm::vec3(0.0f, 1.0f, 0.0f));
        modelF2 = glm::translate(modelF2, glm::vec3(4.03f, 0.27f, 8.76f));
        modelF2 = glm::scale(modelF2, glm::vec3(1.0f / 2.0f, 1.0f / 2.0f, 1.0f / 2.0f));
        modelF2 = glm::rotate(modelF2, glm::radians(90.0f), glm::vec3(0.0f, 1.0f, 0.0f));
        glUniformMatrix4fv(modelLocF2, 1, GL_FALSE, glm::value_ptr(modelF2));
        normalMatrixF2 = glm::mat3(glm::inverseTranspose(viewF2 * modelF2));
        glUniformMatrix3fv(normalMatrixLocF2, 1, GL_FALSE, glm::value_ptr(normalMatrixF2));

        //Lumina1
        becShader.useShaderProgram();
        modelBec = glm::rotate(glm::mat4(1.0f), glm::radians(angle), glm::vec3(0.0f, 1.0f, 0.0f));
        modelBec = glm::translate(modelBec, glm::vec3(4.03f, 0.28f, 8.76f));
        modelBec = glm::scale(modelBec, glm::vec3(1.0f / 180.0f, 1.0f / 80.0f, 1.0f / 180.0f));
        glUniformMatrix4fv(modelLocBec, 1, GL_FALSE, glm::value_ptr(modelBec));
        normalMatrixBec = glm::mat3(glm::inverseTranspose(viewBec * modelBec));
        glUniformMatrix3fv(normalMatrixLocBec, 1, GL_FALSE, glm::value_ptr(normalMatrixBec));

        //Lumina2
        bec1Shader.useShaderProgram();
        modelBec1 = glm::rotate(glm::mat4(1.0f), glm::radians(angle), glm::vec3(0.0f, 1.0f, 0.0f));
        modelBec1 = glm::translate(modelBec1, glm::vec3(3.97f, 0.28f, 7.54f));
        modelBec1 = glm::scale(modelBec1, glm::vec3(1.0f / 180.0f, 1.0f / 80.0f, 1.0f / 180.0f));
        glUniformMatrix4fv(modelLocBec1, 1, GL_FALSE, glm::value_ptr(modelBec1));
        normalMatrixBec1 = glm::mat3(glm::inverseTranspose(viewBec1 * modelBec1));
        glUniformMatrix3fv(normalMatrixLocBec1, 1, GL_FALSE, glm::value_ptr(normalMatrixBec1));
    }

    if (pressedKeys[GLFW_KEY_E]) {
        angle += 1.0f;

        myBasicShader.useShaderProgram();
        model = glm::rotate(glm::mat4(1.0f), glm::radians(angle), glm::vec3(0, 1, 0));
        glUniformMatrix4fv(modelLoc, 1, GL_FALSE, glm::value_ptr(model));
        normalMatrix = glm::mat3(glm::inverseTranspose(view * model));
        glUniformMatrix3fv(normalMatrixLoc, 1, GL_FALSE, glm::value_ptr(normalMatrix));

        //Potir
        potirShader.useShaderProgram();
        modelP = glm::rotate(glm::mat4(1.0f), glm::radians(angle), glm::vec3(0.0f, 1.0f, 0.0f));
        modelP = glm::translate(modelP, glm::vec3(3.55f, 0.85f, 8.15f));
        modelP = glm::scale(modelP, glm::vec3(1.0f / 40.0f, 1.0f / 40.0f, 1.0f / 40.0f));
        glUniformMatrix4fv(modelLocP, 1, GL_FALSE, glm::value_ptr(modelP));
        normalMatrixP = glm::mat3(glm::inverseTranspose(viewP * modelP));
        glUniformMatrix3fv(normalMatrixLocP, 1, GL_FALSE, glm::value_ptr(normalMatrixP));

        //Villager 1
        villager1Shader.useShaderProgram();
        modelO1 = glm::rotate(glm::mat4(1.0f), glm::radians(angle), glm::vec3(0.0f, 1.0f, 0.0f));
        modelO1 = glm::translate(modelO1, glm::vec3(27.5f, 0.2f, 21.5f));
        modelO1 = glm::rotate(modelO1, glm::radians(-90.0f), glm::vec3(1.0f, 0.0f, 0.0f));
        modelO1 = glm::scale(modelO1, glm::vec3(1.0f / 75.0f, 1.0f / 75.0f, 1.0f / 75.0f));
        glUniformMatrix4fv(modelLocO1, 1, GL_FALSE, glm::value_ptr(modelO1));
        normalMatrixO1 = glm::mat3(glm::inverseTranspose(viewO1 * modelO1));
        glUniformMatrix3fv(normalMatrixLocO1, 1, GL_FALSE, glm::value_ptr(normalMatrixO1));

        //Villager 2
        villager2Shader.useShaderProgram();
        modelO2 = glm::rotate(glm::mat4(1.0f), glm::radians(angle), glm::vec3(0.0f, 1.0f, 0.0f));
        modelO2 = glm::translate(modelO2, glm::vec3(37.3f, 0.2f, 0.7f));
        modelO2 = glm::rotate(modelO2, glm::radians(-90.0f), glm::vec3(1.0f, 0.0f, 0.0f));
        modelO2 = glm::scale(modelO2, glm::vec3(1.0f / 75.0f, 1.0f / 75.0f, 1.0f / 75.0f));
        modelO2 = glm::rotate(modelO2, glm::radians(50.0f), glm::vec3(0.0f, 0.0f, 1.0f));
        glUniformMatrix4fv(modelLocO2, 1, GL_FALSE, glm::value_ptr(modelO2));
        normalMatrixO2 = glm::mat3(glm::inverseTranspose(viewO2 * modelO2));
        glUniformMatrix3fv(normalMatrixLocO2, 1, GL_FALSE, glm::value_ptr(normalMatrixO2));

        //Villager 3
        villager3Shader.useShaderProgram();
        modelO3 = glm::rotate(glm::mat4(1.0f), glm::radians(angle), glm::vec3(0.0f, 1.0f, 0.0f));
        modelO3 = glm::translate(modelO3, glm::vec3(37.3f, 0.2f, -4.6f));
        modelO3 = glm::rotate(modelO3, glm::radians(-90.0f), glm::vec3(1.0f, 0.0f, 0.0f));
        modelO3 = glm::scale(modelO3, glm::vec3(1.0f / 75.0f, 1.0f / 75.0f, 1.0f / 75.0f));
        glUniformMatrix4fv(modelLocO3, 1, GL_FALSE, glm::value_ptr(modelO3));
        normalMatrixO3 = glm::mat3(glm::inverseTranspose(viewO3 * modelO3));
        glUniformMatrix3fv(normalMatrixLocO3, 1, GL_FALSE, glm::value_ptr(normalMatrixO3));

        // Villager 4
        villager4Shader.useShaderProgram();
        modelO4 = glm::rotate(glm::mat4(1.0f), glm::radians(angle), glm::vec3(0.0f, 1.0f, 0.0f));
        modelO4 = glm::translate(modelO4, glm::vec3(25.6f, 0.1f, -30.6f));
        modelO4 = glm::rotate(modelO4, glm::radians(-90.0f), glm::vec3(1.0f, 0.0f, 0.0f));
        modelO4 = glm::scale(modelO4, glm::vec3(1.0f / 75.0f, 1.0f / 75.0f, 1.0f / 75.0f));
        modelO4 = glm::rotate(modelO4, glm::radians(40.0f), glm::vec3(0.0f, 0.0f, 1.0f));
        glUniformMatrix4fv(modelLocO4, 1, GL_FALSE, glm::value_ptr(modelO4));
        normalMatrixO4 = glm::mat3(glm::inverseTranspose(viewO4 * modelO4));
        glUniformMatrix3fv(normalMatrixLocO4, 1, GL_FALSE, glm::value_ptr(normalMatrixO4));

        //Foc 1
        foc1Shader.useShaderProgram();
        modelF1 = glm::rotate(glm::mat4(1.0f), glm::radians(angle), glm::vec3(0.0f, 1.0f, 0.0f));
        modelF1 = glm::translate(modelF1, glm::vec3(3.97f, 0.27f, 7.54f));
        modelF1 = glm::scale(modelF1, glm::vec3(1.0f / 2.0f, 1.0f / 2.0f, 1.0f / 2.0f));
        modelF1 = glm::rotate(modelF1, glm::radians(90.0f), glm::vec3(0.0f, 1.0f, 0.0f));
        glUniformMatrix4fv(modelLocF1, 1, GL_FALSE, glm::value_ptr(modelF1));
        normalMatrixF1 = glm::mat3(glm::inverseTranspose(viewF1 * modelF1));
        glUniformMatrix3fv(normalMatrixLocF1, 1, GL_FALSE, glm::value_ptr(normalMatrixF1));

        //Foc 2
        foc2Shader.useShaderProgram();
        modelF2 = glm::rotate(glm::mat4(1.0f), glm::radians(angle), glm::vec3(0.0f, 1.0f, 0.0f));
        modelF2 = glm::translate(modelF2, glm::vec3(4.03f, 0.27f, 8.76f));
        modelF2 = glm::scale(modelF2, glm::vec3(1.0f / 2.0f, 1.0f / 2.0f, 1.0f / 2.0f));
        modelF2 = glm::rotate(modelF2, glm::radians(90.0f), glm::vec3(0.0f, 1.0f, 0.0f));
        glUniformMatrix4fv(modelLocF2, 1, GL_FALSE, glm::value_ptr(modelF2));
        normalMatrixF2 = glm::mat3(glm::inverseTranspose(viewF2 * modelF2));
        glUniformMatrix3fv(normalMatrixLocF2, 1, GL_FALSE, glm::value_ptr(normalMatrixF2));

        //Lumina1
        becShader.useShaderProgram();
        modelBec = glm::rotate(glm::mat4(1.0f), glm::radians(angle), glm::vec3(0.0f, 1.0f, 0.0f));
        modelBec = glm::translate(modelBec, glm::vec3(4.03f, 0.28f, 8.76f));
        modelBec = glm::scale(modelBec, glm::vec3(1.0f / 180.0f, 1.0f / 80.0f, 1.0f / 180.0f));
        glUniformMatrix4fv(modelLocBec, 1, GL_FALSE, glm::value_ptr(modelBec));
        normalMatrixBec = glm::mat3(glm::inverseTranspose(viewBec * modelBec));
        glUniformMatrix3fv(normalMatrixLocBec, 1, GL_FALSE, glm::value_ptr(normalMatrixBec));

        //Lumina2
        bec1Shader.useShaderProgram();
        modelBec1 = glm::rotate(glm::mat4(1.0f), glm::radians(angle), glm::vec3(0.0f, 1.0f, 0.0f));
        modelBec1 = glm::translate(modelBec1, glm::vec3(3.97f, 0.28f, 7.54f));
        modelBec1 = glm::scale(modelBec1, glm::vec3(1.0f / 180.0f, 1.0f / 80.0f, 1.0f / 180.0f));
        glUniformMatrix4fv(modelLocBec1, 1, GL_FALSE, glm::value_ptr(modelBec1));
        normalMatrixBec1 = glm::mat3(glm::inverseTranspose(viewBec1 * modelBec1));
        glUniformMatrix3fv(normalMatrixLocBec1, 1, GL_FALSE, glm::value_ptr(normalMatrixBec1));
    }

    if (pressedKeys[GLFW_KEY_Z]) {
        glPolygonMode(GL_FRONT_AND_BACK, GL_FILL);
        glShadeModel(GL_FLAT);
    }
    if (pressedKeys[GLFW_KEY_X]) {
        glPolygonMode(GL_FRONT_AND_BACK, GL_LINE);
    }
    if (pressedKeys[GLFW_KEY_C]) {
        glPolygonMode(GL_FRONT_AND_BACK, GL_POINT);
        glPointSize(5.0f);
    }
    if (pressedKeys[GLFW_KEY_V]) {
        glPolygonMode(GL_FRONT_AND_BACK, GL_FILL);
        glShadeModel(GL_SMOOTH);
    }
    if (pressedKeys[GLFW_KEY_F]) {
        int idx = getNearestPersonIndex();
        int idxPotir = getNearestPotirIndex();
        std::cout << "Am apasat f si sunt la pozitia: " << playerPos.x << " " << playerPos.y << " " << playerPos.z
                  << "\n";
        std::cout << "interactionez cu: " << idx << "\n";
        std::cout << "interactionez cu: " << idxPotir << "\n";
        if (idx != -1) {
            interactWithPerson(idx);
        }
        if (idxPotir != -1) {
            interactWithPotir(idxPotir);
        }
    }
    if (pressedKeys[GLFW_KEY_G]) {
        good_mode = not good_mode;
    }
}

void initCollisionMap() {
    heightMapData = stbi_load("models/harta_coliziune_pamant.png", &hmWidth, &hmHeight, &hmChannels, 0);

    if (heightMapData) {
        std::cout << "SUCCESS: Harta coliziune incarcata! "
                  << hmWidth << "x" << hmHeight << " pixeli." << std::endl;
    } else {
        std::cout << "ERROR: Nu am gasit 'harta_coliziune_pamant.png'. Verifica calea!" << std::endl;
    }
}

void initObstacleMap() {
    obstacleMapData = stbi_load("models/harta_coliziune_obiecte.png", &obsWidth, &obsHeight, &obsChannels, 0);

    if (obstacleMapData) {
        std::cout << "SUCCESS: Harta obstacole incarcata!" << std::endl;
    } else {
        std::cout << "ERROR: Nu am gasit 'harta_coliziune_obiecte.png'!" << std::endl;
    }
}

void initPeople() {
    people.push_back({glm::vec3(27.5, 0.2f, 21.0f), 3.0f, false, false});
    people.push_back({glm::vec3(37.3f, 0.7f, 0.7f), 3.0f, false, false});
    people.push_back({glm::vec3(37.3f, 0.9f, -4.6f), 3.0f, false, false});
    people.push_back({glm::vec3(25.6f, 0.6f, -30.6f), 3.0f, false, false});
}

void initPotir() {
    poti.push_back({glm::vec3(3.54f, 0.85f, 8.15f), 2.0, false, false});
}

void initSnow() {

    for (int i = 0; i < number_of_snowflakes; i++) {
        SnowFlake flake;

        flake.x = (rand() % (int) (snowBoxSize * 20)) / 10.0f - snowBoxSize;
        flake.y = (rand() % 500) / 10.0f;
        flake.z = (rand() % (int) (snowBoxSize * 20)) / 10.0f - snowBoxSize;

        flake.speed = 0.05f + static_cast<float>(rand()) / (static_cast<float>(RAND_MAX / 0.15f));

        snowflakes.push_back(flake);
    }

    glGenVertexArrays(1, &snowVAO);
    glGenBuffers(1, &snowVBO);

    glBindVertexArray(snowVAO);
    glBindBuffer(GL_ARRAY_BUFFER, snowVBO);

    glBufferData(GL_ARRAY_BUFFER, snowflakes.size() * 3 * sizeof(float), NULL, GL_DYNAMIC_DRAW);

    glEnableVertexAttribArray(0);
    glVertexAttribPointer(0, 3, GL_FLOAT, GL_FALSE, 3 * sizeof(float), (void *) 0);

    glBindVertexArray(0);
}

void initOpenGLWindow() {
    myWindow.Create(1024, 768, "OpenGL Project Core");
}

void setWindowCallbacks() {
    glfwSetWindowSizeCallback(myWindow.getWindow(), windowResizeCallback);
    glfwSetKeyCallback(myWindow.getWindow(), keyboardCallback);
    glfwSetCursorPosCallback(myWindow.getWindow(), mouseCallback);
    glfwSetInputMode(myWindow.getWindow(), GLFW_CURSOR, GLFW_CURSOR_DISABLED);
}

void initOpenGLState() {
    glClearColor(0.7f, 0.7f, 0.7f, 1.0f);
    glViewport(0, 0, myWindow.getWindowDimensions().width, myWindow.getWindowDimensions().height);
    glEnable(GL_FRAMEBUFFER_SRGB);
    glEnable(GL_DEPTH_TEST); // enable depth-testing
    glDepthFunc(GL_LESS); // depth-testing interprets a smaller value as "closer"
    glEnable(GL_CULL_FACE); // cull face
    glCullFace(GL_BACK); // cull back face
    glFrontFace(GL_CCW); // GL_CCW for counter clock-wise

    glEnable(GL_BLEND);
    glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);
}

void initModels() {
    scene.LoadModel("models/teren/teren.obj");
    potir.LoadModel("models/potir/potir.obj");
    villager1.LoadModel("models/Oameni/Pirate/14052_Pirate_Shipmate_Muscular_v1_L3.obj");
    villager2.LoadModel("models/Oameni/Pirate/14052_Pirate_Shipmate_Muscular_v1_L3.obj");
    villager3.LoadModel("models/Oameni/Pirate/14052_Pirate_Shipmate_Muscular_v1_L3.obj");
    villager4.LoadModel("models/Oameni/Pirate/14052_Pirate_Shipmate_Muscular_v1_L3.obj");
    foc1.LoadModel("models/CampfireV3/RAN Halloween Pumpkin 2025 - OBJ/RAN_Halloween_Pumpkin_2025_High_Poly.obj");
    foc2.LoadModel("models/CampfireV3/RAN Halloween Pumpkin 2025 - OBJ/RAN_Halloween_Pumpkin_2025_High_Poly.obj");
    bec.LoadModel("models/cube/cube.obj");
    bec1.LoadModel("models/cube/cube.obj");
}

void initShaders() {
    myBasicShader.loadShader(
            "shaders/basic.vert",
            "shaders/basic.frag");
    potirShader.loadShader(
            "shaders/potirVertS.vert",
            "shaders/potirFragS.frag");
    villager1Shader.loadShader(
            "shaders/villager1VertS.vert",
            "shaders/villager1FragS.frag");
    villager2Shader.loadShader(
            "shaders/villager2VertS.vert",
            "shaders/villager2FragS.frag");
    villager3Shader.loadShader(
            "shaders/villager3VertS.vert",
            "shaders/villager3FragS.frag");
    villager4Shader.loadShader(
            "shaders/villager4VertS.vert",
            "shaders/villager4FragS.frag");
    foc1Shader.loadShader(
            "shaders/foc1VertS.vert",
            "shaders/foc1FragS.frag");
    foc2Shader.loadShader(
            "shaders/foc2VertS.vert",
            "shaders/foc2FragS.frag");
    becShader.loadShader(
            "shaders/becVertS.vert",
            "shaders/becFragS.frag");
    bec1Shader.loadShader(
            "shaders/bec1VertS.vert",
            "shaders/bec1FragS.frag");
    depthMapShader.loadShader("shaders/depthMapVertS.vert",
                              "shaders/depthMapFragS.frag");


    snowShader.loadShader("shaders/snowVertS.vert",
                          "shaders/snowFragS.frag");

    skyboxShader.loadShader("shaders/skyboxShader.vert",
                            "shaders/skyboxShader.frag");
    skyboxShader.useShaderProgram();
}

void initSkybox() {
    std::vector<const GLchar *> faces;
    faces.push_back("skybox/posx.jpg");
    faces.push_back("skybox/negx.jpg");
    faces.push_back("skybox/posy.jpg");
    faces.push_back("skybox/negy.jpg");
    faces.push_back("skybox/posz.jpg");
    faces.push_back("skybox/negz.jpg");

    mySkyBox.Load(faces);
}

void initUniforms() {
    myBasicShader.useShaderProgram();

    // create model matrix for scene
    model = glm::rotate(glm::mat4(1.0f), glm::radians(angle), glm::vec3(0.0f, 1.0f, 0.0f));
    modelLoc = glGetUniformLocation(myBasicShader.shaderProgram, "model");

    // get view matrix for current camera
    view = myCamera.getViewMatrix();
    viewLoc = glGetUniformLocation(myBasicShader.shaderProgram, "view");
    // send view matrix to shader
    glUniformMatrix4fv(viewLoc, 1, GL_FALSE, glm::value_ptr(view));

    // compute normal matrix for scene
    normalMatrix = glm::mat3(glm::inverseTranspose(view * model));
    normalMatrixLoc = glGetUniformLocation(myBasicShader.shaderProgram, "normalMatrix");

    // create projection matrix
    projection = glm::perspective(glm::radians(45.0f),
                                  (float) myWindow.getWindowDimensions().width /
                                  (float) myWindow.getWindowDimensions().height,
                                  0.1f, 100.0f);
    projectionLoc = glGetUniformLocation(myBasicShader.shaderProgram, "projection");
    // send projection matrix to shader
    glUniformMatrix4fv(projectionLoc, 1, GL_FALSE, glm::value_ptr(projection));

    //set the light direction (direction towards the light)
    lightDir = glm::vec3(0.0f, 1.0f, 1.0f);
    lightDirLoc = glGetUniformLocation(myBasicShader.shaderProgram, "lightDir");
    // send light dir to shader
    glUniform3fv(lightDirLoc, 1, glm::value_ptr(lightDir));

    //set light color
//	lightColor = glm::vec3(1.0f, 1.0f, 1.0f); //white light
    lightColor = glm::vec3(0.08f, 0.08f, 0.08f); //white light
    lightColorLoc = glGetUniformLocation(myBasicShader.shaderProgram, "lightColor");
    // send light color to shader
    glUniform3fv(lightColorLoc, 1, glm::value_ptr(lightColor));


    ////POTIR
    potirShader.useShaderProgram();

    // create model matrix for scene
    modelP = glm::translate(glm::mat4(1.0f), glm::vec3(3.55f, 0.85f, 8.15f));
    modelP = glm::scale(modelP, glm::vec3(1.0f / 40.0f, 1.0f / 40.0f, 1.0f / 40.0f));
    modelP = glm::rotate(modelP, glm::radians(angle), glm::vec3(0.0f, 1.0f, 0.0f));
    modelLocP = glGetUniformLocation(potirShader.shaderProgram, "model");

    // get view matrix for current camera
    viewP = myCamera.getViewMatrix();
    viewLocP = glGetUniformLocation(potirShader.shaderProgram, "view");
    // send view matrix to shader
    glUniformMatrix4fv(viewLocP, 1, GL_FALSE, glm::value_ptr(viewP));

    // compute normal matrix for scene
    normalMatrixP = glm::mat3(glm::inverseTranspose(viewP * modelP));
    normalMatrixLocP = glGetUniformLocation(potirShader.shaderProgram, "normalMatrix");

    // create projection matrix
    projectionP = glm::perspective(glm::radians(45.0f),
                                   (float) myWindow.getWindowDimensions().width /
                                   (float) myWindow.getWindowDimensions().height,
                                   0.1f, 100.0f);
    projectionLocP = glGetUniformLocation(potirShader.shaderProgram, "projection");
    // send projection matrix to shader
    glUniformMatrix4fv(projectionLocP, 1, GL_FALSE, glm::value_ptr(projectionP));

    //set the light direction (direction towards the light)
    lightDirP = glm::vec3(0.0f, 1.0f, 1.0f);
    lightDirLocP = glGetUniformLocation(potirShader.shaderProgram, "lightDir");
    // send light dir to shader
    glUniform3fv(lightDirLocP, 1, glm::value_ptr(lightDirP));

    //set light color
    lightColorP = glm::vec3(1.0f, 1.0f, 1.0f); //white light
    lightColorLocP = glGetUniformLocation(potirShader.shaderProgram, "lightColor");
    // send light color to shader
    glUniform3fv(lightColorLocP, 1, glm::value_ptr(lightColorP));


    ///Villager1
    villager1Shader.useShaderProgram();
    // create model matrix for scene
    modelO1 = glm::translate(glm::mat4(1.0f), glm::vec3(27.5f, 0.2f, 21.5f));
    modelO1 = glm::rotate(modelO1, glm::radians(-90.0f), glm::vec3(1.0f, 0.0f, 0.0f));
    modelO1 = glm::scale(modelO1, glm::vec3(1.0f / 75.0f, 1.0f / 75.0f, 1.0f / 75.0f));
//    modelO1 = glm::translate(modelO1, glm::vec3(2050.0f, -1640.0f, 18.0f));
//    modelO1 = glm::translate(modelO1, glm::vec3(0.0f, 0.0f, 0.5f));
    modelO1 = glm::rotate(modelO1, glm::radians(angle), glm::vec3(0.0f, 1.0f, 0.0f));
    modelLocO1 = glGetUniformLocation(villager1Shader.shaderProgram, "model");

    // get view matrix for current camera
    viewO1 = myCamera.getViewMatrix();
    viewLocO1 = glGetUniformLocation(villager1Shader.shaderProgram, "view");
    // send view matrix to shader
    glUniformMatrix4fv(viewLocO1, 1, GL_FALSE, glm::value_ptr(viewO1));

    // compute normal matrix for scene
    normalMatrixO1 = glm::mat3(glm::inverseTranspose(viewO1 * modelO1));
    normalMatrixLocO1 = glGetUniformLocation(villager1Shader.shaderProgram, "normalMatrix");

    // create projection matrix
    projectionO1 = glm::perspective(glm::radians(45.0f),
                                    (float) myWindow.getWindowDimensions().width /
                                    (float) myWindow.getWindowDimensions().height,
                                    0.1f, 100.0f);
    projectionLocO1 = glGetUniformLocation(villager1Shader.shaderProgram, "projection");
    // send projection matrix to shader
    glUniformMatrix4fv(projectionLocO1, 1, GL_FALSE, glm::value_ptr(projectionO1));

    //set the light direction (direction towards the light)
    lightDirO1 = glm::vec3(0.0f, 1.0f, 1.0f);
    lightDirLocO1 = glGetUniformLocation(villager1Shader.shaderProgram, "lightDir");
    // send light dir to shader
    glUniform3fv(lightDirLocO1, 1, glm::value_ptr(lightDirO1));

    //set light color
    lightColorO1 = glm::vec3(1.0f, 1.0f, 1.0f); //white light
    lightColorLocO1 = glGetUniformLocation(villager1Shader.shaderProgram, "lightColor");
    // send light color to shader
    glUniform3fv(lightColorLocO1, 1, glm::value_ptr(lightColorO1));



    ///Villager2
    villager2Shader.useShaderProgram();
    // create model matrix for scene
    modelO2 = glm::translate(glm::mat4(1.0f), glm::vec3(37.3f, 0.2f, 0.7f));
    modelO2 = glm::rotate(modelO2, glm::radians(-90.0f), glm::vec3(1.0f, 0.0f, 0.0f));
    modelO2 = glm::scale(modelO2, glm::vec3(1.0f / 75.0f, 1.0f / 75.0f, 1.0f / 75.0f));
    modelO2 = glm::rotate(modelO2, glm::radians(50.0f), glm::vec3(0.0f, 0.0f, 1.0f));
    modelLocO2 = glGetUniformLocation(villager2Shader.shaderProgram, "model");

    // get view matrix for current camera
    viewO2 = myCamera.getViewMatrix();
    viewLocO2 = glGetUniformLocation(villager2Shader.shaderProgram, "view");
    // send view matrix to shader
    glUniformMatrix4fv(viewLocO2, 1, GL_FALSE, glm::value_ptr(viewO2));

    // compute normal matrix for scene
    normalMatrixO2 = glm::mat3(glm::inverseTranspose(viewO2 * modelO2));
    normalMatrixLocO2 = glGetUniformLocation(villager2Shader.shaderProgram, "normalMatrix");

    // create projection matrix
    projectionO2 = glm::perspective(glm::radians(45.0f),
                                    (float) myWindow.getWindowDimensions().width /
                                    (float) myWindow.getWindowDimensions().height,
                                    0.1f, 100.0f);
    projectionLocO2 = glGetUniformLocation(villager2Shader.shaderProgram, "projection");
    // send projection matrix to shader
    glUniformMatrix4fv(projectionLocO2, 1, GL_FALSE, glm::value_ptr(projectionO2));

    //set the light direction (direction towards the light)
    lightDirO2 = glm::vec3(0.0f, 1.0f, 1.0f);
    lightDirLocO2 = glGetUniformLocation(villager2Shader.shaderProgram, "lightDir");
    // send light dir to shader
    glUniform3fv(lightDirLocO2, 1, glm::value_ptr(lightDirO2));

    //set light color
    lightColorO2 = glm::vec3(1.0f, 1.0f, 1.0f); //white light
    lightColorLocO2 = glGetUniformLocation(villager3Shader.shaderProgram, "lightColor");
    // send light color to shader
    glUniform3fv(lightColorLocO2, 1, glm::value_ptr(lightColorO2));


    ///Villager3
    villager3Shader.useShaderProgram();
    // create model matrix for scene
    modelO3 = glm::translate(glm::mat4(1.0f), glm::vec3(37.3f, 0.2f, -4.6f));
    modelO3 = glm::rotate(modelO3, glm::radians(-90.0f), glm::vec3(1.0f, 0.0f, 0.0f));
    modelO3 = glm::scale(modelO3, glm::vec3(1.0f / 75.0f, 1.0f / 75.0f, 1.0f / 75.0f));
    modelO3 = glm::rotate(modelO3, glm::radians(angle), glm::vec3(0.0f, 1.0f, 0.0f));
    modelLocO3 = glGetUniformLocation(villager3Shader.shaderProgram, "model");

    // get view matrix for current camera
    viewO3 = myCamera.getViewMatrix();
    viewLocO3 = glGetUniformLocation(villager3Shader.shaderProgram, "view");
    // send view matrix to shader
    glUniformMatrix4fv(viewLocO3, 1, GL_FALSE, glm::value_ptr(viewO3));

    // compute normal matrix for scene
    normalMatrixO3 = glm::mat3(glm::inverseTranspose(viewO3 * modelO3));
    normalMatrixLocO3 = glGetUniformLocation(villager3Shader.shaderProgram, "normalMatrix");

    // create projection matrix
    projectionO3 = glm::perspective(glm::radians(45.0f),
                                    (float) myWindow.getWindowDimensions().width /
                                    (float) myWindow.getWindowDimensions().height,
                                    0.1f, 100.0f);
    projectionLocO3 = glGetUniformLocation(villager3Shader.shaderProgram, "projection");
    // send projection matrix to shader
    glUniformMatrix4fv(projectionLocO3, 1, GL_FALSE, glm::value_ptr(projectionO3));

    //set the light direction (direction towards the light)
    lightDirO3 = glm::vec3(0.0f, 1.0f, 1.0f);
    lightDirLocO3 = glGetUniformLocation(villager3Shader.shaderProgram, "lightDir");
    // send light dir to shader
    glUniform3fv(lightDirLocO3, 1, glm::value_ptr(lightDirO3));

    //set light color
    lightColorO3 = glm::vec3(1.0f, 1.0f, 1.0f); //white light
    lightColorLocO3 = glGetUniformLocation(villager3Shader.shaderProgram, "lightColor");
    // send light color to shader
    glUniform3fv(lightColorLocO3, 1, glm::value_ptr(lightColorO3));



    ///Villager4
    villager4Shader.useShaderProgram();
    // create model matrix for scene
    modelO4 = glm::translate(glm::mat4(1.0f), glm::vec3(25.6f, 0.1f, -30.6f));
    modelO4 = glm::rotate(modelO4, glm::radians(-90.0f), glm::vec3(1.0f, 0.0f, 0.0f));
    modelO4 = glm::scale(modelO4, glm::vec3(1.0f / 75.0f, 1.0f / 75.0f, 1.0f / 75.0f));
    modelO4 = glm::rotate(modelO4, glm::radians(40.0f), glm::vec3(0.0f, 0.0f, 1.0f));
    modelLocO4 = glGetUniformLocation(villager4Shader.shaderProgram, "model");

    // get view matrix for current camera
    viewO4 = myCamera.getViewMatrix();
    viewLocO4 = glGetUniformLocation(villager4Shader.shaderProgram, "view");
    // send view matrix to shader
    glUniformMatrix4fv(viewLocO4, 1, GL_FALSE, glm::value_ptr(viewO4));

    // compute normal matrix for scene
    normalMatrixO4 = glm::mat3(glm::inverseTranspose(viewO4 * modelO4));
    normalMatrixLocO4 = glGetUniformLocation(villager4Shader.shaderProgram, "normalMatrix");

    // create projection matrix
    projectionO4 = glm::perspective(glm::radians(45.0f),
                                    (float) myWindow.getWindowDimensions().width /
                                    (float) myWindow.getWindowDimensions().height,
                                    0.1f, 100.0f);
    projectionLocO4 = glGetUniformLocation(villager4Shader.shaderProgram, "projection");
    // send projection matrix to shader
    glUniformMatrix4fv(projectionLocO4, 1, GL_FALSE, glm::value_ptr(projectionO4));

    //set the light direction (direction towards the light)
    lightDirO4 = glm::vec3(0.0f, 1.0f, 1.0f);
    lightDirLocO4 = glGetUniformLocation(villager4Shader.shaderProgram, "lightDir");
    // send light dir to shader
    glUniform3fv(lightDirLocO4, 1, glm::value_ptr(lightDirO4));

    //set light color
    lightColorO4 = glm::vec3(1.0f, 1.0f, 1.0f); //white light
    lightColorLocO4 = glGetUniformLocation(villager4Shader.shaderProgram, "lightColor");
    // send light color to shader
    glUniform3fv(lightColorLocO4, 1, glm::value_ptr(lightColorO4));


    ///foc1
    foc1Shader.useShaderProgram();
    // create model matrix for scene
    modelF1 = glm::translate(glm::mat4(1.0f), glm::vec3(3.97f, 0.27f, 7.54f));
    modelF1 = glm::scale(modelF1, glm::vec3(1.0f / 2.0f, 1.0f / 2.0f, 1.0f / 2.0f));
    modelF1 = glm::rotate(modelF1, glm::radians(90.0f), glm::vec3(0.0f, 1.0f, 0.0f));
    modelLocF1 = glGetUniformLocation(foc1Shader.shaderProgram, "model");

    // get view matrix for current camera
    viewF1 = myCamera.getViewMatrix();
    viewLocF1 = glGetUniformLocation(foc1Shader.shaderProgram, "view");
    // send view matrix to shader
    glUniformMatrix4fv(viewLocF1, 1, GL_FALSE, glm::value_ptr(viewF1));

    // compute normal matrix for scene
    normalMatrixF1 = glm::mat3(glm::inverseTranspose(viewF1 * modelF1));
    normalMatrixLocF1 = glGetUniformLocation(foc1Shader.shaderProgram, "normalMatrix");

    // create projection matrix
    projectionF1 = glm::perspective(glm::radians(45.0f),
                                    (float) myWindow.getWindowDimensions().width /
                                    (float) myWindow.getWindowDimensions().height,
                                    0.1f, 100.0f);
    projectionLocF1 = glGetUniformLocation(foc1Shader.shaderProgram, "projection");
    // send projection matrix to shader
    glUniformMatrix4fv(projectionLocF1, 1, GL_FALSE, glm::value_ptr(projectionF1));

    //set the light direction (direction towards the light)
    lightDirF1 = glm::vec3(0.0f, 1.0f, 1.0f);
    lightDirLocF1 = glGetUniformLocation(foc1Shader.shaderProgram, "lightDir");
    // send light dir to shader
    glUniform3fv(lightDirLocF1, 1, glm::value_ptr(lightDirF1));

    //set light color
    lightColorF1 = glm::vec3(1.0f, 1.0f, 1.0f); //white light
    lightColorLocF1 = glGetUniformLocation(foc1Shader.shaderProgram, "lightColor");
    // send light color to shader
    glUniform3fv(lightColorLocF1, 1, glm::value_ptr(lightColorF1));



    ///foc2
    foc2Shader.useShaderProgram();
    // create model matrix for scene
    modelF2 = glm::translate(glm::mat4(1.0f), glm::vec3(4.03f, 0.27f, 8.76f));
    modelF2 = glm::scale(modelF2, glm::vec3(1.0f / 2.0f, 1.0f / 2.0f, 1.0f / 2.0f));
    modelF2 = glm::rotate(modelF2, glm::radians(90.0f), glm::vec3(0.0f, 1.0f, 0.0f));
    modelLocF2 = glGetUniformLocation(foc2Shader.shaderProgram, "model");

    // get view matrix for current camera
    viewF2 = myCamera.getViewMatrix();
    viewLocF2 = glGetUniformLocation(foc2Shader.shaderProgram, "view");
    // send view matrix to shader
    glUniformMatrix4fv(viewLocF2, 1, GL_FALSE, glm::value_ptr(viewF2));

    // compute normal matrix for scene
    normalMatrixF2 = glm::mat3(glm::inverseTranspose(viewF2 * modelF2));
    normalMatrixLocF2 = glGetUniformLocation(foc2Shader.shaderProgram, "normalMatrix");

    // create projection matrix
    projectionF2 = glm::perspective(glm::radians(45.0f),
                                    (float) myWindow.getWindowDimensions().width /
                                    (float) myWindow.getWindowDimensions().height,
                                    0.1f, 100.0f);
    projectionLocF2 = glGetUniformLocation(foc2Shader.shaderProgram, "projection");
    // send projection matrix to shader
    glUniformMatrix4fv(projectionLocF2, 1, GL_FALSE, glm::value_ptr(projectionF2));

    //set the light direction (direction towards the light)
    lightDirF2 = glm::vec3(0.0f, 1.0f, 1.0f);
    lightDirLocF2 = glGetUniformLocation(foc2Shader.shaderProgram, "lightDir");
    // send light dir to shader
    glUniform3fv(lightDirLocF2, 1, glm::value_ptr(lightDirF2));

    //set light color
    lightColorF2 = glm::vec3(1.0f, 1.0f, 1.0f); //white light
    lightColorLocF2 = glGetUniformLocation(foc2Shader.shaderProgram, "lightColor");
    // send light color to shader
    glUniform3fv(lightColorLocF2, 1, glm::value_ptr(lightColorF2));


    ///bec
    becShader.useShaderProgram();
    // create model matrix for scene
    modelBec = glm::rotate(glm::mat4(1.0f), glm::radians(angle), glm::vec3(0.0f, 1.0f, 0.0f));
    modelLocBec = glGetUniformLocation(becShader.shaderProgram, "model");

    // get view matrix for current camera
    viewBec = myCamera.getViewMatrix();
    viewLocBec = glGetUniformLocation(becShader.shaderProgram, "view");
    // send view matrix to shader
    glUniformMatrix4fv(viewLocBec, 1, GL_FALSE, glm::value_ptr(viewBec));

    // compute normal matrix for scene
    normalMatrixBec = glm::mat3(glm::inverseTranspose(viewBec * modelBec));
    normalMatrixLocBec = glGetUniformLocation(becShader.shaderProgram, "normalMatrix");

    // create projection matrix
    projectionBec = glm::perspective(glm::radians(45.0f),
                                     (float) myWindow.getWindowDimensions().width /
                                     (float) myWindow.getWindowDimensions().height,
                                     0.1f, 100.0f);
    projectionLocBec = glGetUniformLocation(becShader.shaderProgram, "projection");
    // send projection matrix to shader
    glUniformMatrix4fv(projectionLocBec, 1, GL_FALSE, glm::value_ptr(projectionBec));

    //set the light direction (direction towards the light)
    lightDirBec = glm::vec3(0.0f, 1.0f, 1.0f);
    lightDirLocBec = glGetUniformLocation(becShader.shaderProgram, "lightDir");
    // send light dir to shader
    glUniform3fv(lightDirLocBec, 1, glm::value_ptr(lightDirBec));

    //set light color
    lightColorBec = glm::vec3(1.0f, 1.0f, 1.0f); //white light
    lightColorLocBec = glGetUniformLocation(becShader.shaderProgram, "lightColor");
    // send light color to shader
    glUniform3fv(lightColorLocBec, 1, glm::value_ptr(lightColorBec));


    ///bec1
    bec1Shader.useShaderProgram();
    // create model matrix for scene
    modelBec1 = glm::rotate(glm::mat4(1.0f), glm::radians(angle), glm::vec3(0.0f, 1.0f, 0.0f));
    modelLocBec1 = glGetUniformLocation(bec1Shader.shaderProgram, "model");

    // get view matrix for current camera
    viewBec1 = myCamera.getViewMatrix();
    viewLocBec1 = glGetUniformLocation(bec1Shader.shaderProgram, "view");
    // send view matrix to shader
    glUniformMatrix4fv(viewLocBec1, 1, GL_FALSE, glm::value_ptr(viewBec1));

    // compute normal matrix for scene
    normalMatrixBec1 = glm::mat3(glm::inverseTranspose(viewBec1 * modelBec1));
    normalMatrixLocBec1 = glGetUniformLocation(bec1Shader.shaderProgram, "normalMatrix");

    // create projection matrix
    projectionBec1 = glm::perspective(glm::radians(45.0f),
                                      (float) myWindow.getWindowDimensions().width /
                                      (float) myWindow.getWindowDimensions().height,
                                      0.1f, 100.0f);
    projectionLocBec1 = glGetUniformLocation(bec1Shader.shaderProgram, "projection");
    // send projection matrix to shader
    glUniformMatrix4fv(projectionLocBec1, 1, GL_FALSE, glm::value_ptr(projectionBec1));

    //set the light direction (direction towards the light)
    lightDirBec1 = glm::vec3(0.0f, 1.0f, 1.0f);
    lightDirLocBec1 = glGetUniformLocation(bec1Shader.shaderProgram, "lightDir");
    // send light dir to shader
    glUniform3fv(lightDirLocBec1, 1, glm::value_ptr(lightDirBec1));

    //set light color
    lightColorBec1 = glm::vec3(1.0f, 1.0f, 1.0f); //white light
    lightColorLocBec1 = glGetUniformLocation(bec1Shader.shaderProgram, "lightColor");
    // send light color to shader
    glUniform3fv(lightColorLocBec1, 1, glm::value_ptr(lightColorBec1));

}

void initFBO() {
    glGenFramebuffers(1, &shadowMapFBO);

    glGenTextures(1, &depthMapTexture);
    glBindTexture(GL_TEXTURE_2D, depthMapTexture);
    glTexImage2D(GL_TEXTURE_2D, 0, GL_DEPTH_COMPONENT,
                 SHADOW_WIDTH, SHADOW_HEIGHT, 0, GL_DEPTH_COMPONENT, GL_FLOAT, NULL);

    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_NEAREST);
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_NEAREST);
    float borderColor[] = {1.0f, 1.0f, 1.0f, 1.0f};
    glTexParameterfv(GL_TEXTURE_2D, GL_TEXTURE_BORDER_COLOR, borderColor);
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, GL_CLAMP_TO_BORDER);
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_T, GL_CLAMP_TO_BORDER);

    glBindFramebuffer(GL_FRAMEBUFFER, shadowMapFBO);
    glFramebufferTexture2D(GL_FRAMEBUFFER, GL_DEPTH_ATTACHMENT, GL_TEXTURE_2D, depthMapTexture, 0);

    glDrawBuffer(GL_NONE);
    glReadBuffer(GL_NONE);

    glBindFramebuffer(GL_FRAMEBUFFER, 0);
}

void renderScene(gps::Shader shader) {
    // select active shader program
    shader.useShaderProgram();

    //send scene model matrix data to shader
    glUniformMatrix4fv(modelLoc, 1, GL_FALSE, glm::value_ptr(model));

    //send scene normal matrix data to shader
    glUniformMatrix3fv(normalMatrixLoc, 1, GL_FALSE, glm::value_ptr(normalMatrix));

    // draw scene
    scene.Draw(shader);
    mySkyBox.Draw(skyboxShader, view, projection);
}

float miscare_potir = 0.0f;
float adunare_numar = 0.03f;

void renderPotir(gps::Shader shader) {
    // select active shader program
    shader.useShaderProgram();

    glm::mat4 vieww = myCamera.getViewMatrix();
    glUniformMatrix4fv(viewLocP, 1, GL_FALSE, glm::value_ptr(vieww));


    ///animatie potir
    if (miscare_potir > 1.5 || miscare_potir < 0) {
        adunare_numar = -adunare_numar;
    }
    miscare_potir += adunare_numar;
    glm::mat4 modelDeDesenat = glm::translate(modelP, glm::vec3(0.0f, miscare_potir, 0.0f));
    glUniformMatrix4fv(modelLocP, 1, GL_FALSE, glm::value_ptr(modelDeDesenat));


    //send scene normal matrix data to shader
    normalMatrixP = glm::mat3(glm::inverseTranspose(viewP * modelP));
    glUniformMatrix3fv(normalMatrixLocP, 1, GL_FALSE, glm::value_ptr(normalMatrixP));

    // draw scene
    potir.Draw(shader);
}

float unghi_cadere_v1 = 0.0f;
float viteza_rotatie = 50.0f;

void renderVillager1(gps::Shader shader) {
    // select active shader program
    shader.useShaderProgram();

    glm::mat4 vieww = myCamera.getViewMatrix();
    glUniformMatrix4fv(viewLocO1, 1, GL_FALSE, glm::value_ptr(vieww));


    ///animatie villager1
    glm::mat4 finalModel = modelO1;

    if (people[0].active) {

        if (!people[0].used) {
            unghi_cadere_v1 += viteza_rotatie * deltaTime;
            if (unghi_cadere_v1 >= 90.0f) {
                unghi_cadere_v1 = 90.0f;
                people[0].used = true;
            }
        }

        glm::vec3 pivot(0.0f, 0.5f, 0.0f);

        finalModel = glm::translate(finalModel, pivot);
        finalModel = glm::rotate(finalModel, glm::radians(-unghi_cadere_v1), glm::vec3(1.0f, 0.0f, 0.0f));
        finalModel = glm::translate(finalModel, -pivot);
    }

    glUniformMatrix4fv(modelLocO1, 1, GL_FALSE, glm::value_ptr(finalModel));

    //send scene normal matrix data to shader
    normalMatrixO1 = glm::mat3(glm::inverseTranspose(vieww * modelO1));
    glUniformMatrix3fv(normalMatrixLocO1, 1, GL_FALSE, glm::value_ptr(normalMatrixO1));

    // draw scene
    villager1.Draw(shader);
}

float unghi_cadere_v2 = 0.0f;

void renderVillager2(gps::Shader shader) {
    // select active shader program
    shader.useShaderProgram();

    glm::mat4 vieww = myCamera.getViewMatrix();
    glUniformMatrix4fv(viewLocO2, 1, GL_FALSE, glm::value_ptr(vieww));


    ///animatie villager2
    glm::mat4 finalModel = modelO2;

    if (people[1].active) {

        if (!people[1].used) {
            unghi_cadere_v2 += viteza_rotatie * deltaTime;
            if (unghi_cadere_v2 >= 90.0f) {
                unghi_cadere_v2 = 90.0f;
                people[1].used = true;
            }
        }

        glm::vec3 pivot(0.0f, 0.5f, 0.0f);

        finalModel = glm::translate(finalModel, pivot);
        finalModel = glm::rotate(finalModel, glm::radians(-unghi_cadere_v2), glm::vec3(1.0f, 0.0f, 0.0f));
        finalModel = glm::translate(finalModel, -pivot);
    }

    glUniformMatrix4fv(modelLocO2, 1, GL_FALSE, glm::value_ptr(finalModel));


    //send scene normal matrix data to shader
    normalMatrixO2 = glm::mat3(glm::inverseTranspose(vieww * modelO2));
    glUniformMatrix3fv(normalMatrixLocO2, 1, GL_FALSE, glm::value_ptr(normalMatrixO2));

    // draw scene
    villager2.Draw(shader);
}

float unghi_cadere_v3 = 0.0f;

void renderVillager3(gps::Shader shader) {
    // select active shader program
    shader.useShaderProgram();

    glm::mat4 vieww = myCamera.getViewMatrix();
    glUniformMatrix4fv(viewLocO3, 1, GL_FALSE, glm::value_ptr(vieww));


    ///animatie villager3
    glm::mat4 finalModel = modelO3;

    if (people[2].active) {

        if (!people[2].used) {
            unghi_cadere_v3 += viteza_rotatie * deltaTime;
            if (unghi_cadere_v3 >= 90.0f) {
                unghi_cadere_v3 = 90.0f;
                people[2].used = true;
            }
        }

        glm::vec3 pivot(0.0f, 0.5f, 0.0f);

        finalModel = glm::translate(finalModel, pivot);
        finalModel = glm::rotate(finalModel, glm::radians(-unghi_cadere_v3), glm::vec3(1.0f, 0.0f, 0.0f));
        finalModel = glm::translate(finalModel, -pivot);
    }


    //send scene model matrix data to shader
    glUniformMatrix4fv(modelLocO3, 1, GL_FALSE, glm::value_ptr(finalModel));

    //send scene normal matrix data to shader
    normalMatrixO3 = glm::mat3(glm::inverseTranspose(vieww * modelO3));
    glUniformMatrix3fv(normalMatrixLocO3, 1, GL_FALSE, glm::value_ptr(normalMatrixO3));

    // draw scene
    villager3.Draw(shader);
}

float unghi_cadere_v4 = 0.0f;

void renderVillager4(gps::Shader shader) {
    // select active shader program
    shader.useShaderProgram();

    glm::mat4 vieww = myCamera.getViewMatrix();
    glUniformMatrix4fv(viewLocO4, 1, GL_FALSE, glm::value_ptr(vieww));


    ///animatie villager4
    glm::mat4 finalModel = modelO4;

    if (people[3].active) {

        if (!people[3].used) {
            unghi_cadere_v4 += viteza_rotatie * deltaTime;
            if (unghi_cadere_v4 >= 90.0f) {
                unghi_cadere_v4 = 90.0f;
                people[3].used = true;
            }
        }

        glm::vec3 pivot(0.0f, 0.3f, 0.0f);

        finalModel = glm::translate(finalModel, pivot);
        finalModel = glm::rotate(finalModel, glm::radians(unghi_cadere_v4), glm::vec3(1.0f, 0.0f, 0.0f));
        finalModel = glm::translate(finalModel, -pivot);
    }



    //send scene model matrix data to shader
    glUniformMatrix4fv(modelLocO4, 1, GL_FALSE, glm::value_ptr(finalModel));

    //send scene normal matrix data to shader
    normalMatrixO4 = glm::mat3(glm::inverseTranspose(vieww * modelO4));
    glUniformMatrix3fv(normalMatrixLocO4, 1, GL_FALSE, glm::value_ptr(normalMatrixO4));

    // draw scene
    villager4.Draw(shader);
}

void renderFoc1(gps::Shader shader) {
    // select active shader program
    shader.useShaderProgram();

    glm::mat4 vieww = myCamera.getViewMatrix();
    glUniformMatrix4fv(viewLocF1, 1, GL_FALSE, glm::value_ptr(vieww));


    //send scene model matrix data to shader
    glUniformMatrix4fv(modelLocF1, 1, GL_FALSE, glm::value_ptr(modelF1));

    //send scene normal matrix data to shader
    normalMatrixF1 = glm::mat3(glm::inverseTranspose(vieww * modelF1));
    glUniformMatrix3fv(normalMatrixLocF1, 1, GL_FALSE, glm::value_ptr(normalMatrixF1));

    // draw scene
    foc1.Draw(shader);
}

void renderFoc2(gps::Shader shader) {
    // select active shader program
    shader.useShaderProgram();

    glm::mat4 vieww = myCamera.getViewMatrix();
    glUniformMatrix4fv(viewLocF2, 1, GL_FALSE, glm::value_ptr(vieww));


    //send scene model matrix data to shader
    glUniformMatrix4fv(modelLocF2, 1, GL_FALSE, glm::value_ptr(modelF2));

    //send scene normal matrix data to shader
    normalMatrixF2 = glm::mat3(glm::inverseTranspose(vieww * modelF2));
    glUniformMatrix3fv(normalMatrixLocF2, 1, GL_FALSE, glm::value_ptr(normalMatrixF2));

    // draw scene
    foc2.Draw(shader);
}

void renderBec1(gps::Shader shader) {
    glm::vec3 lightPos = glm::vec3(4.03f, 0.30f, 8.76f);
    viewBec = myCamera.getViewMatrix();
    glm::vec3 lightPosEye = glm::vec3(viewBec * glm::vec4(lightPos, 1.0f));

    myBasicShader.useShaderProgram();
    glUniform3fv(glGetUniformLocation(myBasicShader.shaderProgram, "lightPosEye1"), 1, glm::value_ptr(lightPosEye));
    glUniform3f(glGetUniformLocation(myBasicShader.shaderProgram, "lightColorBec"), 1.0f, 0.6f, 0.2f);

    potirShader.useShaderProgram();
    glUniform3fv(glGetUniformLocation(potirShader.shaderProgram, "lightPosEye1"), 1, glm::value_ptr(lightPosEye));
    glUniform3f(glGetUniformLocation(potirShader.shaderProgram, "lightColorBec"), 1.0f, 0.6f, 0.2f);

    shader.useShaderProgram();
    glUniformMatrix4fv(glGetUniformLocation(shader.shaderProgram, "view"), 1, GL_FALSE, glm::value_ptr(viewBec));
    glUniformMatrix4fv(glGetUniformLocation(shader.shaderProgram, "projection"), 1, GL_FALSE,
                       glm::value_ptr(projectionBec));

    modelBec = glm::translate(glm::mat4(1.0f), glm::vec3(4.03f, 0.28f, 8.76f));
    modelBec = glm::scale(modelBec, glm::vec3(1.0f / 180.0f, 1.0f / 80.0f, 1.0f / 180.0f));
    glUniformMatrix4fv(glGetUniformLocation(shader.shaderProgram, "model"), 1, GL_FALSE, glm::value_ptr(modelBec));

    bec.Draw(shader);
}

void renderBec2(gps::Shader shader) {
    glm::vec3 lightPos = glm::vec3(3.97f, 0.27f, 7.54f);
    viewBec1 = myCamera.getViewMatrix();
    glm::vec3 lightPosEye = glm::vec3(viewBec1 * glm::vec4(lightPos, 1.0f));

    myBasicShader.useShaderProgram();
    glUniform3fv(glGetUniformLocation(myBasicShader.shaderProgram, "lightPosEye2"), 1, glm::value_ptr(lightPosEye));
    glUniform3f(glGetUniformLocation(myBasicShader.shaderProgram, "lightColorBec"), 1.0f, 0.6f, 0.2f);

    potirShader.useShaderProgram();
    glUniform3fv(glGetUniformLocation(potirShader.shaderProgram, "lightPosEye2"), 1, glm::value_ptr(lightPosEye));
    glUniform3f(glGetUniformLocation(potirShader.shaderProgram, "lightColorBec"), 1.0f, 0.6f, 0.2f);

    shader.useShaderProgram();
    glUniformMatrix4fv(glGetUniformLocation(shader.shaderProgram, "view"), 1, GL_FALSE, glm::value_ptr(viewBec1));
    glUniformMatrix4fv(glGetUniformLocation(shader.shaderProgram, "projection"), 1, GL_FALSE,
                       glm::value_ptr(projectionBec1));


    modelBec1 = glm::translate(glm::mat4(1.0f), glm::vec3(3.97f, 0.28f, 7.54f));
    modelBec1 = glm::scale(modelBec1, glm::vec3(1.0f / 180.0f, 1.0f / 80.0f, 1.0f / 180.0f));
    glUniformMatrix4fv(glGetUniformLocation(shader.shaderProgram, "model"), 1, GL_FALSE, glm::value_ptr(modelBec1));

    bec1.Draw(shader);
}

void renderSnow(glm::vec3 cameraPos) {
    snowShader.useShaderProgram();

    std::vector<float> vertices;
    vertices.reserve(number_of_snowflakes * 3);

    for (int i = 0; i < number_of_snowflakes; i++) {
        snowflakes[i].y -= snowflakes[i].speed;

        float distX = abs(snowflakes[i].x - cameraPos.x);
        float distZ = abs(snowflakes[i].z - cameraPos.z);

        if (snowflakes[i].y < -5.0f || distX > snowBoxSize || distZ > snowBoxSize) {

            snowflakes[i].y = cameraPos.y + 15.0f + (rand() % 100) / 10.0f;

            snowflakes[i].x = cameraPos.x + ((rand() % (int) (snowBoxSize * 20)) / 10.0f - snowBoxSize);
            snowflakes[i].z = cameraPos.z + ((rand() % (int) (snowBoxSize * 20)) / 10.0f - snowBoxSize);
        }

        vertices.push_back(snowflakes[i].x);
        vertices.push_back(snowflakes[i].y);
        vertices.push_back(snowflakes[i].z);
    }

    GLint viewSnow = glGetUniformLocation(snowShader.shaderProgram, "view");
    glUniformMatrix4fv(viewSnow, 1, GL_FALSE, glm::value_ptr(view));
    GLint projectionSnow = glGetUniformLocation(snowShader.shaderProgram, "projection");
    glUniformMatrix4fv(projectionSnow, 1, GL_FALSE, glm::value_ptr(projection));

    glm::mat4 modelSnow = glm::mat4(1.0f); // Matrice identitate
    GLint modelSnowS = glGetUniformLocation(snowShader.shaderProgram, "model");
    glUniformMatrix4fv(modelSnowS, 1, GL_FALSE, glm::value_ptr(modelSnow));

    glBindVertexArray(snowVAO);
    glBindBuffer(GL_ARRAY_BUFFER, snowVBO);

    glBufferSubData(GL_ARRAY_BUFFER, 0, vertices.size() * sizeof(float), vertices.data());

    glPointSize(3.0f);
    glDrawArrays(GL_POINTS, 0, number_of_snowflakes);

    glBindVertexArray(0);
}

glm::mat4 computeLightSpaceTrMatrix() {
    glm::vec3 lightPos = glm::vec3(0.0f, 30.0f, 30.0f);
    glm::vec3 target = glm::vec3(0.0f, 0.0f, 0.0f);
    glm::vec3 up = glm::vec3(0.0f, 1.0f, 0.0f);

    glm::mat4 lightView = glm::lookAt(lightPos, target, up);

    const GLfloat near_plane = 0.1f, far_plane = 100.0f;
    glm::mat4 lightProjection = glm::ortho(-40.0f, 40.0f, -40.0f, 40.0f, near_plane, far_plane);

    return lightProjection * lightView;
}

void drawObjectsForShadowMap(gps::Shader shader, glm::mat4 lightSpaceTrMatrix) {
    shader.useShaderProgram();

    glUniformMatrix4fv(glGetUniformLocation(shader.shaderProgram, "lightSpaceTrMatrix"),
                       1, GL_FALSE, glm::value_ptr(lightSpaceTrMatrix));


    glUniformMatrix4fv(glGetUniformLocation(shader.shaderProgram, "model"), 1, GL_FALSE, glm::value_ptr(model));
    scene.Draw(shader);


    glm::mat4 mPotir = glm::translate(glm::mat4(1.0f), glm::vec3(3.55f, 0.85f, 8.15f));
    mPotir = glm::scale(mPotir, glm::vec3(1.0f / 40.0f, 1.0f / 40.0f, 1.0f / 40.0f));
    mPotir = glm::rotate(mPotir, glm::radians(angle), glm::vec3(0.0f, 1.0f, 0.0f));
    mPotir = glm::translate(mPotir, glm::vec3(0.0f, miscare_potir, 0.0f));

    glUniformMatrix4fv(glGetUniformLocation(shader.shaderProgram, "model"), 1, GL_FALSE, glm::value_ptr(mPotir));
    potir.Draw(shader);

    // villager1
    glm::mat4 mO1 = glm::translate(glm::mat4(1.0f), glm::vec3(27.5f, 0.2f, 21.5f));
    mO1 = glm::rotate(mO1, glm::radians(-90.0f), glm::vec3(1.0f, 0.0f, 0.0f));
    mO1 = glm::scale(mO1, glm::vec3(1.0f / 75.0f, 1.0f / 75.0f, 1.0f / 75.0f));
    mO1 = glm::rotate(mO1, glm::radians(angle), glm::vec3(0.0f, 1.0f, 0.0f));

    if (people[0].active) {
        glm::vec3 pivot(0.0f, 0.5f, 0.0f);
        mO1 = glm::translate(mO1, pivot);
        mO1 = glm::rotate(mO1, glm::radians(-unghi_cadere_v1), glm::vec3(1.0f, 0.0f, 0.0f));
        mO1 = glm::translate(mO1, -pivot);
    }
    glUniformMatrix4fv(glGetUniformLocation(shader.shaderProgram, "model"), 1, GL_FALSE, glm::value_ptr(mO1));
    villager1.Draw(shader);

    // villager2
    glm::mat4 mO2 = glm::translate(glm::mat4(1.0f), glm::vec3(37.3f, 0.2f, 0.7f));
    mO2 = glm::rotate(mO2, glm::radians(-90.0f), glm::vec3(1.0f, 0.0f, 0.0f));
    mO2 = glm::scale(mO2, glm::vec3(1.0f / 75.0f, 1.0f / 75.0f, 1.0f / 75.0f));
    mO2 = glm::rotate(mO2, glm::radians(50.0f), glm::vec3(0.0f, 0.0f, 1.0f));

    if (people[1].active) {
        glm::vec3 pivot(0.0f, 0.5f, 0.0f);
        mO2 = glm::translate(mO2, pivot);
        mO2 = glm::rotate(mO2, glm::radians(-unghi_cadere_v2), glm::vec3(1.0f, 0.0f, 0.0f));
        mO2 = glm::translate(mO2, -pivot);
    }
    glUniformMatrix4fv(glGetUniformLocation(shader.shaderProgram, "model"), 1, GL_FALSE, glm::value_ptr(mO2));
    villager2.Draw(shader);


    // villager3
    glm::mat4 mO3 = glm::translate(glm::mat4(1.0f), glm::vec3(37.3f, 0.2f, -4.6f));
    mO3 = glm::rotate(mO3, glm::radians(-90.0f), glm::vec3(1.0f, 0.0f, 0.0f));
    mO3 = glm::scale(mO3, glm::vec3(1.0f / 75.0f, 1.0f / 75.0f, 1.0f / 75.0f));
    mO3 = glm::rotate(mO3, glm::radians(angle), glm::vec3(0.0f, 1.0f, 0.0f));

    if (people[2].active) {
        glm::vec3 pivot(0.0f, 0.5f, 0.0f);
        mO3 = glm::translate(mO3, pivot);
        mO3 = glm::rotate(mO3, glm::radians(-unghi_cadere_v3), glm::vec3(1.0f, 0.0f, 0.0f));
        mO3 = glm::translate(mO3, -pivot);
    }
    glUniformMatrix4fv(glGetUniformLocation(shader.shaderProgram, "model"), 1, GL_FALSE, glm::value_ptr(mO3));
    villager3.Draw(shader);


    // villager4
    glm::mat4 mO4 = glm::translate(glm::mat4(1.0f), glm::vec3(25.6f, 0.1f, -30.6f));
    mO4 = glm::rotate(mO4, glm::radians(-90.0f), glm::vec3(1.0f, 0.0f, 0.0f));
    mO4 = glm::scale(mO4, glm::vec3(1.0f / 75.0f, 1.0f / 75.0f, 1.0f / 75.0f));
    mO4 = glm::rotate(mO4, glm::radians(40.0f), glm::vec3(0.0f, 0.0f, 1.0f));

    if (people[3].active) {
        glm::vec3 pivot(0.0f, 0.3f, 0.0f);
        mO4 = glm::translate(mO4, pivot);
        mO4 = glm::rotate(mO4, glm::radians(unghi_cadere_v4), glm::vec3(1.0f, 0.0f, 0.0f));
        mO4 = glm::translate(mO4, -pivot);
    }
    glUniformMatrix4fv(glGetUniformLocation(shader.shaderProgram, "model"), 1, GL_FALSE, glm::value_ptr(mO4));
    villager4.Draw(shader);
}

void renderScene() {

    glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);

    //render the scene

    double currentTime = glfwGetTime();
    deltaTime = currentTime - lastFrameTime;
    lastFrameTime = currentTime;

    playerPos = myCamera.getCameraPosition();

    //Zona umbre calucl
    glm::mat4 lightSpaceTrMatrix = computeLightSpaceTrMatrix();
    depthMapShader.useShaderProgram();

    glUniformMatrix4fv(glGetUniformLocation(depthMapShader.shaderProgram, "lightSpaceTrMatrix"),
                       1, GL_FALSE, glm::value_ptr(lightSpaceTrMatrix));

    glViewport(0, 0, SHADOW_WIDTH, SHADOW_HEIGHT);
    glBindFramebuffer(GL_FRAMEBUFFER, shadowMapFBO);
    glClear(GL_DEPTH_BUFFER_BIT);

    drawObjectsForShadowMap(depthMapShader, lightSpaceTrMatrix);
    glBindFramebuffer(GL_FRAMEBUFFER, 0);


    glViewport(0, 0, myWindow.getWindowDimensions().width, myWindow.getWindowDimensions().height);
    glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);

    myBasicShader.useShaderProgram();
    glUniformMatrix4fv(glGetUniformLocation(myBasicShader.shaderProgram, "lightSpaceTrMatrix"),
                       1, GL_FALSE, glm::value_ptr(lightSpaceTrMatrix));

    view = myCamera.getViewMatrix();
    glUniformMatrix4fv(viewLoc, 1, GL_FALSE, glm::value_ptr(view));
    glUniformMatrix4fv(projectionLoc, 1, GL_FALSE, glm::value_ptr(projection));

    glActiveTexture(GL_TEXTURE1);
    glBindTexture(GL_TEXTURE_2D, depthMapTexture);
    glUniform1i(glGetUniformLocation(myBasicShader.shaderProgram, "shadowMap"), 1);

    renderScene(myBasicShader);

    // render the scene
    renderPotir(potirShader);
    renderVillager1(villager1Shader);
    renderVillager2(villager2Shader);
    renderVillager3(villager3Shader);
    renderVillager4(villager4Shader);
    renderFoc1(foc1Shader);
    renderFoc2(foc2Shader);
    renderBec1(becShader);
    renderBec2(bec1Shader);


    renderScene(myBasicShader);
    renderSnow(myCamera.getCameraPosition());
}

void logica_joc(GLFWwindow *window) {
    ///Zona configurare logica joc
    int contor_morti = 0;
    for (int i = 0; i < people.size(); i++) {
        if (people[i].used) {
            contor_morti++;
        }
    }
    if (contor_morti == 4) {
        if (poti[0].active) {
            poti[0].used = true;
        }
    } else {
        poti[0].active = false;
    }

    if (contor_morti == 4 && poti[0].used) {
        std::cout << "You won!!!\n\n\n";
        glfwSetWindowShouldClose(window, GL_TRUE);
    }
}

void cleanup() {
    myWindow.Delete();
    //cleanup code for your own data
}

int main(int argc, const char *argv[]) {

    try {
        initOpenGLWindow();
    } catch (const std::exception &e) {
        std::cerr << e.what() << std::endl;
        return EXIT_FAILURE;
    }
    initFBO();

    initCollisionMap();
    initObstacleMap();
    initOpenGLState();
    initModels();
    initShaders();
    initUniforms();
    setWindowCallbacks();
    initSkybox();
    initPeople();
    initPotir();
    initSnow();


    glCheckError();
    // application loop
    while (!glfwWindowShouldClose(myWindow.getWindow())) {
        processMovement();
        renderScene();
        logica_joc(myWindow.getWindow());
        glfwSetCursorPosCallback(myWindow.getWindow(), mouseCallback);


        glfwPollEvents();
        glfwSwapBuffers(myWindow.getWindow());

        glCheckError();
    }

    cleanup();

    return EXIT_SUCCESS;
}
