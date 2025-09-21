#include <bits/stdc++.h>
#include <windows.h>

using namespace std;

char pathHere[MAX_PATH];
char citire[256];
bool fisier;

int main_page_interface() {
    cout << "1. Introdu instructiunea" << endl;
    cout << "2. Lista intructiuni disponibile" << endl;
    cout << "3. Exit" << endl << endl;

    char choice[256];
    int nr = 0;
    do {
        cin.getline(choice, 256);
        nr = atoi(choice);
        if (nr == 1 || nr == 2 || nr == 3) {
            break;
        }
        cout << "Nu s-a putut efectua citirea 1" << endl;
        cin.clear();
        cin.ignore();
    } while (true);


    return nr;
}

void instruction_pwd() {
    if (!pathHere[0]) {
        DWORD len = GetCurrentDirectory(MAX_PATH, pathHere);
        if (len == 0) {
            cout << "GetCurrentDirectory Failed" << endl;
        }
    } else {
        cout << pathHere << endl;
    }
    // freopen("CON", "w", stdout);
}


int instruction_decode() {
    cin.getline(citire, 256);
    cout << citire << endl;

    if (strchr(citire, '>') != 0) {
        char iesire[256];
        char *p = strchr(citire, '>');
        int i = 0;
        for (i = 0; p[i + 2] != '\0'; i++) {
            iesire[i] = p[i + 2];
        }
        iesire[i] = '\0';
        cout << iesire << endl;
        char iesire2[256];
        if (!pathHere[0])
            instruction_pwd();

        strcpy(iesire2, pathHere);
        strcat(iesire2, "\\");
        strcat(iesire2, iesire);
        freopen(iesire2, "w", stdout);
        fisier = true;
    }

    if (strstr(citire, "ls") != nullptr) {
        if (strstr(citire, "ls -l") != nullptr) {
            return 5;
        }
        return 1;
    }
    if (strstr(citire, "cd") != nullptr) {
        return 2;
    }
    if (strstr(citire, "pwd") != nullptr) {
        return 3;
    }
    if (strstr(citire, "echo") != nullptr) {
        return 4;
    }


    return 0;
}


void instruction_ls() {
    STARTUPINFO si;
    PROCESS_INFORMATION pi;
    ZeroMemory(&si, sizeof(si));
    si.cb = sizeof(si);
    ZeroMemory(&pi, sizeof(pi));

    // char cmd[] = "cmd.exe /C dir";
    char cmd[] = "cmd.exe /C dir";
    if (!pathHere[0]) {
        instruction_pwd();
    }

    if (!CreateProcess(
        NULL,
        cmd,
        NULL, NULL, FALSE,
        0, NULL, pathHere,
        &si, &pi)) {
        cout << "Create Process Failed" << endl;
    } else {
        WaitForSingleObject(pi.hProcess,INFINITE);
        CloseHandle(pi.hProcess);
        CloseHandle(pi.hThread);
    }
    if (fisier)
        freopen("CON", "w", stdout);
}

void instruction_ls_l(const char *path) {
    WIN32_FIND_DATA ffd;
    HANDLE hFind;
    char searchPath[256];

    if (!path)
        path = ".";
    snprintf(searchPath, 256, "%s\\*", pathHere);

    hFind = FindFirstFile(searchPath, &ffd);
    if (hFind == INVALID_HANDLE_VALUE) {
        cout << "FindFirstFile Faile" << endl;
        return;
    }

    do {
        if (ffd.dwFileAttributes & FILE_ATTRIBUTE_DIRECTORY) {
            cout << "DIR ";
        } else {
            cout << "FILE ";
        }

        LARGE_INTEGER size;
        size.HighPart = ffd.nFileSizeHigh;
        size.LowPart = ffd.nFileSizeLow;
        cout << size.QuadPart << " ";

        SYSTEMTIME stUTC, stLocal;
        FileTimeToSystemTime(&ffd.ftLastWriteTime, &stUTC);
        SystemTimeToTzSpecificLocalTime(NULL, &stUTC, &stLocal);
        cout << stLocal.wDay << " " << stLocal.wMonth << " " << stLocal.wYear << " " << stLocal.wHour << " " <<
                stLocal.
                wMinute << " " << stLocal.wSecond << " ";

        cout << ffd.cFileName << endl;
    } while (FindNextFile(hFind, &ffd) != 0);

    FindClose(hFind);
    if (fisier)
        freopen("CON", "w", stdout);
}

void instruction_echo() {
    for (int j = 5; j < strlen(citire); j++) {
        if (citire[j] == '>')
            break;
        cout << citire[j];
    }
    if (fisier)
        freopen("CON", "w", stdout);
}

void instruction_cd() {
    if (strstr(citire, "..") != nullptr) {
        if (pathHere[0] == '\0') {
            GetCurrentDirectory(MAX_PATH, pathHere);
        }
        cout << pathHere << endl;

        int i = 0;
        for (i = strlen(pathHere) - 1; i > 0; i--) {
            if (pathHere[i] == '\\') {
                break;
            }
        }
        for (int j = 0; j < i; j++) {
            citire[j] = pathHere[j];
        }

        citire[i] = '\0';
        cout << citire << endl;
        strcpy(pathHere, citire);
        if (fisier)
            freopen("CON", "w", stdout);
        return;
    }


    WIN32_FIND_DATA ffd;
    HANDLE hFind;
    char searchPath[256];

    snprintf(searchPath, 256, "%s\\*", pathHere);

    hFind = FindFirstFile(searchPath, &ffd);
    if (hFind == INVALID_HANDLE_VALUE) {
        cout << "FindFirstFile Faile" << endl;
        if (fisier)
            freopen("CON", "w", stdout);
        return;
    }

    int ok = 0;

    do {
        if (ffd.dwFileAttributes & FILE_ATTRIBUTE_DIRECTORY) {
            // cout << "DIR ";
            // cout << ffd.cFileName << endl;
            if (strstr(citire, ffd.cFileName) != nullptr) {
                strcat(pathHere, "\\");
                strcat(pathHere, ffd.cFileName);
                ok = 1;
                break;
            }
        }
    } while (FindNextFile(hFind, &ffd) != 0);

    FindClose(hFind);

    if (ok == 0) {
        cout << "Nume gresit" << endl;
    } else {
        cout << pathHere << endl;
    }
    if (fisier)
        freopen("CON", "w", stdout);
}

void afisare_1() {
    while (true) {
        if (fisier)
            freopen("CON", "w", stdout);
        int option = main_page_interface();
        switch (option) {
            case 1: {
                int option = instruction_decode();
                if (option == 0) {
                    cout << "Nu s-a putut efectua citirea" << endl;
                    break;
                }

                switch (option) {
                    case 1: {
                        instruction_ls();
                        cout << endl << endl;
                        break;
                    }
                    case 5: {
                        instruction_ls_l(".");
                        cout << endl << endl;
                        break;
                    }
                    case 2: {
                        instruction_cd();
                        cout << endl << endl;
                        break;
                    }
                    case 3: {
                        instruction_pwd();
                        cout << endl << endl;
                        break;
                    }
                    case 4: {
                        instruction_echo();
                        cout << endl << endl;
                        break;
                    }
                }
                break;
            }
            case 2: {
                cout << "ls - Listeaza fisierele si directoarele din directorul curent." << endl;
                cout << "ls -l - Listeaza fisierele si directoarele din directorul curent cu mai multe detalii." <<
                        endl;
                cout << "cd - Schimba directorul curent." << endl;
                cout << "cd .. - Te muta in directorul parinte (un nivel mai sus in structura)." << endl;
                cout << "pwd - Afiseaza calea completa a directorului curent." << endl;
                cout << "echo - Afiseaza un mesaj sau continutul unei variabile." << endl;
                cout << endl;
                break;
            }
            case 3: {
                exit(0);
            }
        }
    }
}

int main() {
    afisare_1();

    return 0;
}
