cmake_minimum_required(VERSION 4.0)
project(OpenGL_Project_Core)

set(CMAKE_CXX_STANDARD 20)

include_directories("C:/Users/Marius/Desktop/UTCN/AN\ 3/Semestru\ 1/PG/Kit-uri/OpenGL_dev_libs\ -\ MinGW/OpenGL_dev_libs/include")
link_directories("C:/Users/Marius/Desktop/UTCN/AN\ 3/Semestru\ 1/PG/Kit-uri/OpenGL_dev_libs\ -\ MinGW/OpenGL_dev_libs/lib")

add_executable(OpenGL_Project_Core main.cpp Camera.cpp Mesh.cpp Model3D.cpp Shader.cpp
        stb_image.cpp tiny_obj_loader.cpp Window.cpp SkyBox.cpp
        people.cpp
        people.h
        people.cuh)

target_link_libraries(OpenGL_Project_Core glfw3 glew opengl32)

