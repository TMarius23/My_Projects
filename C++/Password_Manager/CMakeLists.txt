cmake_minimum_required(VERSION 4.0)
project(Password_Manager)

set(CMAKE_CXX_STANDARD 26)

add_executable(Password_Manager main.cpp)


cmake_minimum_required(VERSION 3.15)
project(PasswordManager)

set(CMAKE_CXX_STANDARD 17)

# === Include libsodium ===
include_directories("C:\\Users\\Marius\\Desktop\\folder pt foldere\\UTCN\\MyProject\\C.C++\\Libsodium\\libsodium-win64\\include")
link_directories("C:\\Users\\Marius\\Desktop\\folder pt foldere\\UTCN\\MyProject\\C.C++\\Libsodium\\libsodium-win64\\lib")

add_executable(PasswordManager main.cpp)

# leagă executabilul de librăria sodium
target_link_libraries(PasswordManager PRIVATE sodium)
