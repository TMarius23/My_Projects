#include <bits/stdc++.h>
#include <windows.h>
#include <conio.h>

using namespace std;


string numeFisier = "fisiereTxt\\clipboard";

void proc_name_file() {
    SYSTEMTIME st;
    GetLocalTime(&st);

    numeFisier += "_";
    numeFisier += to_string(st.wDay);
    numeFisier += "_";
    numeFisier += to_string(st.wMonth);
    numeFisier += "_";
    numeFisier += to_string(st.wYear);
    numeFisier += "_";
    numeFisier += to_string(st.wHour);
    numeFisier += "_";
    numeFisier += to_string(st.wMinute);
    numeFisier += "_";
    numeFisier += to_string(st.wSecond);

    numeFisier += ".txt";

    cout << numeFisier << endl;
}

void SaveClipboardTextToFile(string fileName) {

    SYSTEMTIME st;
    GetLocalTime(&st);
    this_thread::sleep_for(std::chrono::seconds(1));

    if (OpenClipboard(nullptr)) {
        HANDLE hData = GetClipboardData(CF_TEXT);
        if (hData) {
            char* ptxt = static_cast<char*>(GlobalLock(hData));
            if (ptxt) {

                ifstream fin(fileName);
                string oldContent;
                if (fin.is_open()) {
                    oldContent.assign((std::istreambuf_iterator<char>(fin)),
                                       std::istreambuf_iterator<char>());
                    fin.close();
                }

                ofstream fout(fileName, std::ios::trunc);
                if (!fout.is_open()) {
                    cout << "Can't open file " << fileName << endl;
                }

                std::string text(ptxt);
                for (auto &c : text) {
                    if (c == '\r') c = '\0';
                    fout << c;
                }
                fout << endl << st.wDay << "_" << st.wMonth << "_" << st.wYear << "_" << st.wHour << "_" << st.wMinute << "_" << st.wSecond << endl << endl;
                fout << oldContent;
                ///Inversam contentul

                cout << ptxt << endl << st.wDay << "_" << st.wMonth << "_" << st.wYear << "_" << st.wHour << "_" << st.wMinute << "_" << st.wSecond << endl << endl;
                fout.close();
                GlobalUnlock(hData);
            }
        }
        CloseClipboard();
    }
}

HHOOK hHook;

LRESULT CALLBACK KeyboardProc(int nCode, WPARAM wParam, LPARAM lParam) {
    if (nCode == HC_ACTION) {
        auto *p = reinterpret_cast<KBDLLHOOKSTRUCT *>(lParam);
        bool ctrlPress = (GetAsyncKeyState(VK_CONTROL) & 0x8000);
        if (ctrlPress && wParam == WM_KEYDOWN) {
            if (p->vkCode == 'C' || p->vkCode == 'c' || p->vkCode == 'X' || p->vkCode == 'x') {

                SaveClipboardTextToFile(numeFisier);
            }
        }
    }
    return CallNextHookEx(hHook, nCode, wParam, lParam);
}

int main() {
    proc_name_file();

    hHook = SetWindowsHookEx(WH_KEYBOARD_LL, KeyboardProc, NULL, 0);
    MSG msg;
    while (GetMessage(&msg, NULL, 0, 0)) {
        TranslateMessage(&msg);
        DispatchMessage(&msg);
    }

    UnhookWindowsHookEx(hHook);

    return 0;
}
