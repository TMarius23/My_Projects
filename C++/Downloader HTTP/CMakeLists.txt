cmake_minimum_required(VERSION 4.0)
project(Downloader_HTTP)
set(CMAKE_CXX_STANDARD 26)
add_executable(Downloader_HTTP main.cpp)
target_link_libraries(Downloader_HTTP PRIVATE Ws2_32)


