#include <bits/stdc++.h>
#include <windows.h>
#include <conio.h>

using namespace std;

int http_verif(string url) {
    if (strstr(url.c_str(), "http://") || strstr(url.c_str(), "HTTP://"))
        return 1;
    if (strstr(url.c_str(), "https://") || strstr(url.c_str(), "HTTPS://"))
        return 2;
    return 0;
}

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

    char host[256];
    int ct = 0;
    bool found = false;
    for (int i = 0; i < 256; i++) {
        if (!found && http_url.c_str()[i] == '/' && http_url.c_str()[i + 1] == '/') {
            i += 2;
            found = true;
        }
        if (found) {
            if (http_url.c_str()[i] == '.' && http_url.c_str()[i + 1] == 'c' && http_url.c_str()[i + 2] == 'o' &&
                http_url.c_str()[i + 3] == 'm' ) {
                host[ct++] = http_url.c_str()[i];
                host[ct++] = http_url.c_str()[i + 1];
                host[ct++] = http_url.c_str()[i + 2];
                host[ct++] = http_url.c_str()[i + 3];
                host[ct] = '\0';
                break;
            }
            if (http_url.c_str()[i + 1] == ':') {
                host[ct++] = http_url.c_str()[i];
                host[ct] = '\0';
                break;
            }
            host[ct++] = http_url.c_str()[i];
        }
    }

    cout << host << endl;

    string port;
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

    string path;
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
    cout << path << endl;


}


void main_page() {
    decode_http();
}

int main() {
    main_page();

    return 0;
}
