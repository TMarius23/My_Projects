#include <chrono>
#include <conio.h>
#include <psapi.h>
#include <sodium.h>
#include <thread>
#include <windows.h>
#include <bits/stdc++.h>

using namespace std;

const char filename[] = "passwords.txt";
char parolaApliatie[] = "admin21";


ifstream fin(filename);
ofstream fout(filename);

int afisare_optiuni() {
    cout << "1. Afiseaza detalii despre program" << endl;
    cout << "2. Insereaza un cont (detalii + parola)" << endl;
    cout << "3. Cauta dupa un criteriu: Nume aplicatie" << endl;
    cout << "4. Afiseaza toate conturile" << endl;
    cout << "5. Exit" << endl << endl;

    int nr = 0;
    cin >> nr;

    return nr;;
}

void afisare_detalii_aplicatie() {
    cout << "Programul salveaza folosind criptografierea parolele dumneavoastra" << endl;
    cout << "La inserare aveti mai multe optiuni: " << endl <<
            "\t1. Nume aplicatie + Email + Parola" << endl <<
            "\t2. Nume aplicatie + Nume utilizator + Parola" << endl <<
            "\t3. Nume aplicatie + Numar telefon + parola" << endl;
    cout << "Selectati ce vi se potriveste si incepeti sa complectati campurile respective" << endl;
    cout << "La final ve-ti fi intrebat daca doriti sa salvati datele sau nu (Y/N)" << endl << endl << endl;

    cout << "Pentru a reveni apasa orice tasta" << endl;
    while (true) {
        if (_kbhit()) {
            break;
        }
    }
    cout << endl << endl;
}

bool criptare_parola(char **parola) {
    // if (sodium_init() < 0) return false;
    //
    // const size_t SALT_LEN = crypto_pwhash_SALTBYTES;
    // const size_t KEY_LEN = crypto_secretbox_KEYBYTES;
    // const size_t MONCE_LEN = crypto_secretbox_NONCEBYTES;
    //
    // vector<unsigned char> salt(SALT_LEN);
    // randombytes_buf(salt.data(), SALT_LEN);
    //
    // vector<unsigned char> key(KEY_LEN);
    // if (crypto_pwhash(key.data(), KEY_LEN,
    //     ))
}

void salveaza_datele(char *numeApp, char *email, char *parola, char *numeUtilizator, char *telefon, int option) {
    fout << numeApp << endl;
    switch (option) {
        case 1: {
            fout << email << endl;
            break;
        }
        case 2: {
            fout << numeUtilizator << endl;
            break;
        }
        case 3: {
            fout << telefon << endl;
            break;
        }
    }
    fout << parola << endl;
}

void insert_cont() {
    cout << "Optiuni inserare: " << endl <<
            "\t1. Nume aplicatie + Email + Parola" << endl <<
            "\t2. Nume aplicatie + Nume utilizator + Parola" << endl <<
            "\t3. Nume aplicatie + Numar telefon + Parola" << endl;

    int option = 0;
    cin >> option;

    char numeApp[256];
    char email[256];
    char parola[256];
    char telefon[256];
    char numeUtilizator[256];

    switch (option) {
        case 1: {
            cout << "Introduce-ti numele aplicatiei: ";
            cin >> numeApp;
            cout << "Introduce-ti email-ul: ";
            cin >> email;
            cout << "Introduce-ti parola: ";
            cin >> parola;
            break;
        }
        case 2: {
            cout << "Introduce-ti numele aplicatiei: ";
            cin >> numeApp;
            cout << "Introduce-ti numele utilizatorului: ";
            cin >> numeUtilizator;
            cout << "Introduce-ti parola: ";
            cin >> parola;
            break;
        }
        case 3: {
            cout << "Introduce-ti numele aplicatiei: ";
            cin >> numeApp;
            cout << "Introduce-ti numarul de telefon: ";
            cin >> telefon;
            cout << "Introduce-ti parola: ";
            cin >> parola;
            break;
        }
        default: {
            return;
        }
    }
    cout << "Salveaza datele ? (Y/N)" << endl;
    char c;
    cin >> c;
    if (c == 'y' || c == 'Y') {
        salveaza_datele(numeApp, email, parola, numeUtilizator, telefon, option);
        cout << "Datele s-au salvat cu succes" << endl;
    }
    while (true) {
        if (_kbhit()) {
            break;
        }
    }
    cout << endl << endl;
}

void main_page_instruction() {
    system("cls");

    int ct = 0;
    do {
        cout << "Scrie parola pentru a te putea loga in aplicatie: ";
        char parolaData[256];
        cin >> parolaData;
        if (strcmp(parolaApliatie, parolaData) == 0) {
            ct = 1;
            cout << endl << endl;
        } else {
            cout << "Parola incorecta" << endl;
        }
    } while (ct == 0);


    while (true) {
        int option = afisare_optiuni();
        switch (option) {
            case 1: {
                afisare_detalii_aplicatie();
                break;
            }
            case 2: {
                insert_cont();
                break;
            }
            case 3: {
                break;
            }
            case 4: {
                break;
            }
            case 5: {
                exit(0);
            }
        }
    }
}


int main() {
    if (!fin.is_open() || !fout.is_open()) {
        cout << "Error!" << endl;
        return 0;
    }

    main_page_instruction();


    fin.close();
    fout.close();

    return 0;
}
