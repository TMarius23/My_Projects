#include <bits/stdc++.h>
#include <windows.h>
#include <psapi.h>
#include <thread>
#include <chrono>
#include <conio.h>

using namespace std;


void gotoxy(int x, int y) {
    COORD coord;
    coord.X = x;
    coord.Y = y;
    SetConsoleCursorPosition(GetStdHandle(STD_OUTPUT_HANDLE), coord);
}

void interfata_procese() {
    while (true) {
        if (_kbhit()) {
            break;
        }
        system("cls");
        fflush(stdout);

        DWORD processes[1024] = {0}, bytesReturned = 0;

        if (!EnumProcesses(processes, sizeof(processes), &bytesReturned)) {
            cout << GetLastError() << endl;
            return;
        }

        DWORD numProcesses = bytesReturned / sizeof(DWORD);

        cout << "Procese active:" << endl;
        for (int i = 0; i < numProcesses; i++) {
            DWORD pid = processes[i];
            if (pid == 0) {
                continue;
            }

            HANDLE hProcess = OpenProcess(PROCESS_QUERY_INFORMATION | PROCESS_VM_READ, FALSE, pid);
            if (hProcess) {
                HMODULE hMod;
                DWORD cbNeeded;

                char processName[1024];
                if (EnumProcessModules(hProcess, &hMod, sizeof(hMod), &cbNeeded)) {
                    GetModuleBaseNameA(hProcess, hMod, processName, sizeof(processName) / sizeof(char));
                }

                PROCESS_MEMORY_COUNTERS pmc;
                if (GetProcessMemoryInfo(hProcess, &pmc, sizeof(pmc))) {
                    SIZE_T ramUsageKB = pmc.WorkingSetSize / 1024; // RAM folosit efectiv
                    SIZE_T pageFileKB = pmc.PagefileUsage / 1024; // Memorie virtuală folosită

                    if (ramUsageKB > 4000) {
                        SetConsoleTextAttribute(hProcess, FOREGROUND_GREEN | FOREGROUND_INTENSITY);
                    }
                    cout << "PID: " << pid
                            << " - Nume: " << processName
                            << " - RAM: " << ramUsageKB << " KB"
                            << " - PageFile: " << pageFileKB << " KB\n";
                    SetConsoleTextAttribute(hProcess, FOREGROUND_RED | FOREGROUND_GREEN | FOREGROUND_BLUE);
                }

                CloseHandle(hProcess);
            }
        }

        cout << endl << endl << endl << endl;

        std::this_thread::sleep_for(std::chrono::seconds(2));
    }
}

int panou_principal() {
    cout << "1. Afiseaza procesele active" << endl;
    cout << "2. Inchide un proces dupa PID" << endl;
    cout << "3. Exit" << endl;

    int nr = 0;
    cin >> nr;

    return nr;
}

void kill_process() {

    DWORD pid;
    cout << "Inchide un PID valid" << endl;
    cin >> pid;

    HANDLE hProcess = OpenProcess(PROCESS_TERMINATE, FALSE, pid);
    if (hProcess == NULL) {
        cout << GetLastError() << endl;
        return;
    }

    if (!TerminateProcess(hProcess, 0)) {
        cout << GetLastError() << endl;
        CloseHandle(hProcess);
        return;
    }

    cout << "Procesul cu PID: " << pid << " a fost terminat" << endl;
    CloseHandle(hProcess);
}

void interfata_programe() {
    while (true) {
        int option = panou_principal();
        switch (option) {
            case 1: {
                interfata_procese();
                break;
            }
            case 2: {
                kill_process();
                break;
            }
            case 3: {
                exit(0);
            }
        }
        cout << endl << endl;
    }
}

int main() {
    interfata_programe();


    return 0;
}
