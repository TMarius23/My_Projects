#include <bits/stdc++.h>
#include <windows.h>
#include <conio.h>
#include <cstring>
#include <winsock2.h>
#include <ws2tcpip.h>

#pragma comment(lib, "Ws2_32.lib")

using namespace std;

int http_verif(string url) {
    if (strstr(url.c_str(), "http://") || strstr(url.c_str(), "HTTP://"))
        return 1;
    if (strstr(url.c_str(), "https://") || strstr(url.c_str(), "HTTPS://"))
        return 2;
    return 0;
}

string host;
string port;
string path;

void decode_http() {
    string http_url;
    cout << "Enter url:";
    cin >> http_url;

    int http_form = http_verif(http_url);
    if (http_form == 0) {
        cerr << "Invalid URL" << endl;
    }

    if (http_form == 1)
        cout << "HTTP" << endl;
    else if (http_form == 2)
        cout << "HTTPS" << endl;

    char hostChr[256];
    int ct = 0;
    bool found = false;
    for (int i = 0; i < 256; i++) {
        if (!found && http_url.c_str()[i] == '/' && http_url.c_str()[i + 1] == '/') {
            i += 2;
            found = true;
        }
        if (found) {
            if (http_url.c_str()[i] == '.' && http_url.c_str()[i + 1] == 'c' && http_url.c_str()[i + 2] == 'o' &&
                http_url.c_str()[i + 3] == 'm') {
                hostChr[ct++] = http_url.c_str()[i];
                hostChr[ct++] = http_url.c_str()[i + 1];
                hostChr[ct++] = http_url.c_str()[i + 2];
                hostChr[ct++] = http_url.c_str()[i + 3];
                hostChr[ct] = '\0';
                break;
            }
            if (http_url.c_str()[i + 1] == ':') {
                hostChr[ct++] = http_url.c_str()[i];
                hostChr[ct] = '\0';
                break;
            }
            hostChr[ct++] = http_url.c_str()[i];
        }
    }

    host = hostChr;
    cout << host << endl;

    if (http_form == 1)
        port = "80";
    else if (http_form == 2)
        port = "443";

    if (strchr(http_url.c_str(), ':') != NULL) {
        char port2[8];
        int ct2 = 0;
        char *p = strchr(http_url.c_str(), ':');
        p++;
        // cout << p << endl;
        if (strchr(p, ':') != NULL) {
            char *pp = strchr(p, ':');
            pp++;
            // cout << pp << endl;

            while (pp != NULL) {
                if (isdigit(*pp)) {
                    port2[ct2++] = *pp;
                    pp++;
                } else {
                    break;
                }
            }
            port2[ct2] = '\0';
            // cout << port2 << endl;
            port = std::to_string(atoi(port2));
        }
    }

    cout << port << endl;

    int ctSl = 0;
    for (int i = 0; i < http_url.size(); i++) {
        if (http_url[i] == '/') {
            ctSl++;
        }
        if (ctSl == 3) {
            path = http_url.substr(i + 1, (http_url.size() - i - 1));
            break;
        }
    }
    cout << path << endl << endl;
}


void main_page() {
    WSADATA wsaData;
    int iResult;

    iResult = WSAStartup(MAKEWORD(2, 2), &wsaData);
    if (iResult != 0) {
        cerr << "WSAStartup a eșuat: " << iResult << endl;
        return;
    }

    decode_http();


    struct addrinfo hints;
    ZeroMemory(&hints, sizeof(hints));
    hints.ai_family = AF_UNSPEC;
    hints.ai_socktype = SOCK_STREAM;
    hints.ai_protocol = IPPROTO_TCP;

    struct addrinfo *res = NULL;
    iResult = getaddrinfo(host.c_str(), port.c_str(), &hints, &res);
    if (iResult != 0) {
        cerr << "getaddrinfo: " << iResult << endl;
        WSACleanup();
        return;
    }


    SOCKET sock = INVALID_SOCKET;
    for (struct addrinfo *p = res; p != NULL; p = p->ai_next) {
        sock = socket(p->ai_family, p->ai_socktype, p->ai_protocol);
        if (sock == INVALID_SOCKET) {
            cerr << "socket: " << WSAGetLastError() << endl;
            continue;
        }

        iResult = connect(sock, p->ai_addr, p->ai_addrlen);
        if (iResult == SOCKET_ERROR) {
            closesocket(sock);
            sock = INVALID_SOCKET;
            continue;
        }
        break;
    }

    freeaddrinfo(res);

    if (sock == INVALID_SOCKET) {
        cerr << "connect: " << WSAGetLastError() << endl;
        WSACleanup();
        return;
    }

    cout << "Connected to: " << host << "on port: " << port << endl;


    string request = "GET /" + path + " HTTP/1.1\r\n";
    request += "Host: " + host + "\r\n";
    request += "Connection: close\r\n";
    request += "\r\n";

    iResult = send(sock, request.c_str(), request.size(), 0);
    if (iResult == SOCKET_ERROR) {
        cerr << "send: " << WSAGetLastError() << endl;
        closesocket(sock);
        WSACleanup();
        return;
    }


    char buff[4096];
    string response;

    do {
        iResult = recv(sock, buff, sizeof(buff) - 1, 0);
        if (iResult > 0) {
            buff[iResult] = '\0';
            response += buff;
        }else if (iResult == 0) {
            cout << "Connection closed on Server." << endl << endl;
        }else {
            cerr << "recv: " << WSAGetLastError() << endl;
        }
    }while (iResult > 0);


    // cout << "Response: " <<  endl;
    // cout << response << endl << endl;


    size_t header_end = response.find("\r\n\r\n");
    string body;
    if (header_end != string::npos) {
        string headers = response.substr(0, header_end);
        body = response.substr(header_end + 4);

        // cout << "Headers:\n" << headers << "\n\n";
        // cout << "Body preview (100 chars):\n" << body.substr(0, 100) << "...\n\n";
    } else {
        body = response;
    }

    ofstream fout("paginaWeb.html", ios::binary);
    fout << body;
    fout.close();

    cout << "Fisier html salvat" << endl;

    closesocket(sock);
    WSACleanup();
}

int main() {
    main_page();

    return 0;
}
