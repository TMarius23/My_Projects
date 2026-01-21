#include "Camera.hpp"

namespace gps {

    //Camera constructor
    Camera::Camera(glm::vec3 cameraPosition, glm::vec3 cameraTarget, glm::vec3 cameraUp) {
        this->cameraPosition = cameraPosition;
        this->cameraTarget = cameraTarget;
        this->cameraUpDirection = glm::normalize(cameraUp);
        this->cameraFrontDirection = glm::normalize(cameraPosition - cameraTarget);
        this->cameraRightDirection = -glm::cross(cameraFrontDirection, cameraUpDirection);
    }

    glm::vec3 Camera::getCameraPosition(){
        return this->cameraPosition;
    }

    void Camera::setCameraPosition(glm::vec3 newPos) {
        glm::vec3 diff = newPos - this->cameraPosition;
        this->cameraPosition = newPos;
        this->cameraTarget += diff;
    }

    void Camera::setCameraDirection(glm::vec3 direction) {
        this->cameraFrontDirection = glm::normalize(-direction);
        this->cameraRightDirection = glm::normalize(glm::cross(glm::vec3(0.0f, 1.0f, 0.0f), this->cameraFrontDirection));
        this->cameraUpDirection = glm::cross(this->cameraFrontDirection, this->cameraRightDirection);
        this->cameraTarget = this->cameraPosition - this->cameraFrontDirection;
    }

    //return the view matrix, using the glm::lookAt() function
    glm::mat4 Camera::getViewMatrix() {
        //TODO
        return glm::lookAt(this->cameraPosition,
                           this->cameraTarget,
                           this->cameraUpDirection);
    }

    //update the camera internal parameters following a camera move event
    void Camera::move(MOVE_DIRECTION direction, float speed) {
        //TODO

        glm::vec3 oldPosition = this->cameraPosition;
        glm::vec3 oldTarget = this->cameraTarget;

        if (direction == MOVE_FORWARD){
            this->cameraPosition -= speed * this->cameraFrontDirection;
            this->cameraTarget -= speed * this->cameraFrontDirection;
        }
        if (direction == MOVE_BACKWARD){
            this->cameraPosition += speed * this->cameraFrontDirection;
            this->cameraTarget += speed * this->cameraFrontDirection;
        }
        if (direction == MOVE_LEFT){
            this->cameraPosition -= speed * this->cameraRightDirection;
            this->cameraTarget -= speed * this->cameraRightDirection;
        }
        if (direction == MOVE_RIGHT){
            this->cameraPosition += speed * this->cameraRightDirection;
            this->cameraTarget += speed * this->cameraRightDirection;
        }

        if (this->cameraPosition.x > 55 || this->cameraPosition.x < -8 ||
            this->cameraPosition.z > 23 || this->cameraPosition.z < -38) {

            this->cameraPosition = oldPosition;
            this->cameraTarget = oldTarget;
        }
    }

    //update the camera internal parameters following a camera rotate event
    //yaw - camera rotation around the y axis
    //pitch - camera rotation around the x axis
    void Camera::rotate(float pitch, float yaw) {
        //TODO
        if (pitch > 89.0f)  pitch = 89.0f;
        if (pitch < -89.0f) pitch = -89.0f;

        this->cameraTarget -= pitch * this->cameraRightDirection;
        this->cameraTarget += yaw * this->cameraUpDirection;
        this->cameraFrontDirection = glm::normalize(cameraPosition - cameraTarget);
        this->cameraRightDirection = -glm::cross(cameraFrontDirection, cameraUpDirection);
    }

}