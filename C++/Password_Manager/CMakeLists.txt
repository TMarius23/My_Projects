
cmake_minimum_required(VERSION 3.15)
project(Password_Manager)

set(CMAKE_CXX_STANDARD 17)

# === set paths to libsodium ===
include_directories("C:\\Users\\Marius\\Desktop\\folder pt foldere\\UTCN\\MyProject\\C.C++\\Libsodium\\libsodium-win64\\include")
link_directories("C:\\Users\\Marius\\Desktop\\folder pt foldere\\UTCN\\MyProject\\C.C++\\Libsodium\\libsodium-win64\\lib")

add_executable(Password_Manager main.cpp)

# important: link libsodium
target_link_libraries(Password_Manager PRIVATE sodium)