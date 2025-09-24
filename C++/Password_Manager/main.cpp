#include <bits/stdc++.h>
#include <sodium.h>
#include <conio.h>
#include <windows.h>

using namespace std;

const char filename[] = "passwordsB.bin";
const char masterPassword[] = "admin21";
/**

crypto_pwhash_SALTBYTES = 16 → mărimea unui salt.
crypto_secretbox_KEYBYTES = 32 → lungimea unei chei simetrice.
crypto_secretbox_NONCEBYTES = 24 → lungimea unui nonce.
crypto_secretbox_MACBYTES = 16 → bytes extra adăugați la cipher pentru verificarea integrității.

Salt – îl salvezi lângă date, pentru că fără el nu poți recrea cheia din parolă.
Key – derivată din parolă + salt cu crypto_pwhash.
Nonce – îl salvezi și pe el, pentru că trebuie la decriptare.
Cipher – partea criptată care conține mesajul tău securizat.

*/


bool write_encrypted_entry(const string &filename,
                           const string &master_password,
                           const string &to_encrypt) {
    if (sodium_init() < 0) return false;

    const size_t SALT_LEN = crypto_pwhash_SALTBYTES;
    const size_t KEY_LEN = crypto_secretbox_KEYBYTES;
    const size_t NONCE_LEN = crypto_secretbox_NONCEBYTES;

    vector<unsigned char> salt(SALT_LEN);
    randombytes_buf(salt.data(), SALT_LEN);

    vector<unsigned char> key(KEY_LEN);
    if (crypto_pwhash(key.data(), KEY_LEN,
                      master_password.c_str(), master_password.size(),
                      salt.data(),
                      crypto_pwhash_OPSLIMIT_MODERATE,
                      crypto_pwhash_MEMLIMIT_MODERATE,
                      crypto_pwhash_ALG_DEFAULT) != 0) {
        return false;
    }

    vector<unsigned char> nonce(NONCE_LEN);
    randombytes_buf(nonce.data(), NONCE_LEN);

    vector<unsigned char> cipher(to_encrypt.size() + crypto_secretbox_MACBYTES);
    if (crypto_secretbox_easy(cipher.data(),
                              reinterpret_cast<const unsigned char *>(to_encrypt.data()),
                              to_encrypt.size(),
                              nonce.data(), key.data()) != 0) {
        sodium_memzero(key.data(), KEY_LEN);
        return false;
    }

    ofstream fout(filename, ios::binary | ios::app);
    if (!fout) {
        sodium_memzero(key.data(), KEY_LEN);
        return false;
    }

    fout.write(reinterpret_cast<const char *>(salt.data()), SALT_LEN);
    fout.write(reinterpret_cast<const char *>(nonce.data()), NONCE_LEN);

    uint64_t clen = cipher.size();
    fout.write(reinterpret_cast<const char *>(&clen), sizeof(clen));
    fout.write(reinterpret_cast<const char *>(cipher.data()), clen);
    fout.close();

    sodium_memzero(key.data(), KEY_LEN);
    return true;
}

bool read_and_print_all(const string &filename, const string &master_password) {
    if (sodium_init() < 0) return false;

    const size_t SALT_LEN = crypto_pwhash_SALTBYTES;
    const size_t KEY_LEN = crypto_secretbox_KEYBYTES;
    const size_t NONCE_LEN = crypto_secretbox_NONCEBYTES;

    ifstream fin(filename, ios::binary);
    if (!fin) {
        cout << "Fisierul nu exista sau nu poate fi deschis.\n";
        return false;
    }


    while (true) {
        vector<unsigned char> salt(SALT_LEN);
        fin.read(reinterpret_cast<char *>(salt.data()), SALT_LEN);
        if (!fin) break;

        vector<unsigned char> nonce(NONCE_LEN);
        fin.read(reinterpret_cast<char *>(nonce.data()), NONCE_LEN);
        if (!fin) break;

        uint64_t clen = 0;
        fin.read(reinterpret_cast<char *>(&clen), sizeof(clen));
        if (!fin) {
            cout << "DEBUG: citire lungime esuata\n";
            break;
        }


        vector<unsigned char> cipher(clen);
        fin.read(reinterpret_cast<char *>(cipher.data()), clen);
        if (!fin) break;

        vector<unsigned char> key(KEY_LEN);
        if (crypto_pwhash(key.data(), KEY_LEN,
                          master_password.c_str(), master_password.size(),
                          salt.data(),
                          crypto_pwhash_OPSLIMIT_MODERATE,
                          crypto_pwhash_MEMLIMIT_MODERATE,
                          crypto_pwhash_ALG_DEFAULT) != 0) {
            cerr << "Eroare la derivarea cheii.\n";
            return false;
        }

        if (clen < crypto_secretbox_MACBYTES) {
            cerr << "Cipher invalid.\n";
            sodium_memzero(key.data(), KEY_LEN);
            return false;
        }

        vector<unsigned char> decrypted(clen - crypto_secretbox_MACBYTES);
        if (crypto_secretbox_open_easy(decrypted.data(),
                                       cipher.data(), clen,
                                       nonce.data(), key.data()) != 0) {
            cerr << "Decriptare esuata (parola master incorecta sau fisier corupt).\n";
            sodium_memzero(key.data(), KEY_LEN);
            return false;
        }

        string out(decrypted.begin(), decrypted.end());
        cout << out << "\n\n";

        sodium_memzero(key.data(), KEY_LEN);
    }

    fin.close();
    return true;
}

void search_by_account_name(const string &filename, const string &master_password) {
    cout << "Scrie numele dupa aplicatiei: ";
    char numeAppD[256];
    cin >> numeAppD;

    cout << endl;

    if (sodium_init() < 0) return;

    const size_t SALT_LEN = crypto_pwhash_SALTBYTES;
    const size_t KEY_LEN = crypto_secretbox_KEYBYTES;
    const size_t NONCE_LEN = crypto_secretbox_NONCEBYTES;

    ifstream fin(filename, ios::binary);
    if (!fin) {
        cout << "Fisierul nu exista sau nu poate fi deschis.\n";
        return;
    }

    int rez = 0;
    while (true) {
        vector<unsigned char> salt(SALT_LEN);
        fin.read(reinterpret_cast<char *>(salt.data()), SALT_LEN);
        if (!fin) break;

        vector<unsigned char> nonce(NONCE_LEN);
        fin.read(reinterpret_cast<char *>(nonce.data()), NONCE_LEN);
        if (!fin) break;

        uint64_t clen = 0;
        fin.read(reinterpret_cast<char *>(&clen), sizeof(clen));
        if (!fin) {
            cout << "DEBUG: citire lungime esuata\n";
            break;
        }


        vector<unsigned char> cipher(clen);
        fin.read(reinterpret_cast<char *>(cipher.data()), clen);
        if (!fin) break;

        vector<unsigned char> key(KEY_LEN);
        if (crypto_pwhash(key.data(), KEY_LEN,
                          master_password.c_str(), master_password.size(),
                          salt.data(),
                          crypto_pwhash_OPSLIMIT_MODERATE,
                          crypto_pwhash_MEMLIMIT_MODERATE,
                          crypto_pwhash_ALG_DEFAULT) != 0) {
            cerr << "Eroare la derivarea cheii.\n";
            return;
        }

        if (clen < crypto_secretbox_MACBYTES) {
            cerr << "Cipher invalid.\n";
            sodium_memzero(key.data(), KEY_LEN);
            return;
        }

        vector<unsigned char> decrypted(clen - crypto_secretbox_MACBYTES);
        if (crypto_secretbox_open_easy(decrypted.data(),
                                       cipher.data(), clen,
                                       nonce.data(), key.data()) != 0) {
            cerr << "Decriptare esuata (parola master incorecta sau fisier corupt).\n";
            sodium_memzero(key.data(), KEY_LEN);
            return;
        }

        string out(decrypted.begin(), decrypted.end());
        if (strstr(out.c_str(), numeAppD) != NULL) {
            cout << "Rezultatul numarul " << ++rez << endl;
            cout << out << "\n\n";
        }

        sodium_memzero(key.data(), KEY_LEN);
    }

    cout << "S-au gasit: " << rez << " rezultate!" << endl << endl << endl;

    cout << "Apasa orice tasta pentru a reveni la meniu...";
    while (!_kbhit()) {
    }
    cout << "\n\n";
    fin.close();
}

int afisare_optiuni() {
    cout << "1. Afiseaza detalii despre program\n";
    cout << "2. Insereaza un cont (detalii + parola)\n";
    cout << "3. Afiseaza toate conturile\n";
    cout << "4. Cauta cont dupa numele aplicatiei\n";
    cout << "5. Exit\n\n";

    int nr = 0;
    cin >> nr;
    return nr;
}

void afisare_detalii_aplicatie() {
    cout << "Programul salveaza parole criptate folosind libsodium.\n";
    cout << "Optiuni la inserare:\n"
            << "\t1. Nume aplicatie + Email + Parola\n"
            << "\t2. Nume aplicatie + Nume utilizator + Parola\n"
            << "\t3. Nume aplicatie + Numar telefon + Parola\n";
    cout << "Datele sunt criptate si salvate in fisier binar.\n\n";
    cout << "Apasa orice tasta pentru a reveni la meniu...";
    while (!_kbhit()) {
    }
    cout << "\n\n";
}

void insert_cont() {
    cout << "Optiuni inserare: \n"
            << "\t1. Nume aplicatie + Email + Parola\n"
            << "\t2. Nume aplicatie + Nume utilizator + Parola\n"
            << "\t3. Nume aplicatie + Numar telefon + Parola\n";

    int option = 0;
    cin >> option;

    char numeApp[256] = {0};
    char email[256] = {0};
    char parola[256] = {0};
    char telefon[256] = {0};
    char numeUtilizator[256] = {0};

    switch (option) {
        case 1:
            cout << "Nume aplicatie: ";
            cin >> numeApp;
            cout << "Email: ";
            cin >> email;
            cout << "Parola: ";
            cin >> parola;
            break;
        case 2:
            cout << "Nume aplicatie: ";
            cin >> numeApp;
            cout << "Nume utilizator: ";
            cin >> numeUtilizator;
            cout << "Parola: ";
            cin >> parola;
            break;
        case 3:
            cout << "Nume aplicatie: ";
            cin >> numeApp;
            cout << "Telefon: ";
            cin >> telefon;
            cout << "Parola: ";
            cin >> parola;
            break;
        default:
            return;
    }

    cout << "\nSalveaza datele? (Y/N): ";
    char c;
    cin >> c;
    if (c == 'y' || c == 'Y') {
        string to_encrypt = string(numeApp) + "\n";
        if (option == 1) to_encrypt += string(email) + "\n";
        if (option == 2) to_encrypt += string(numeUtilizator) + "\n";
        if (option == 3) to_encrypt += string(telefon) + "\n";
        to_encrypt += string(parola) + "\n";

        if (write_encrypted_entry(filename, masterPassword, to_encrypt)) {
            cout << "Datele s-au salvat cu succes.\n";
        } else {
            cout << "Eroare la salvarea datelor.\n";
        }
    }
    while (!_kbhit()) {
    }
    cout << "\n\n";
}

void main_page_instruction() {
    system("cls");

    int ct = 0;
    do {
        cout << "Scrie parola pentru a intra in aplicatie: ";
        char parolaData[256];
        cin >> parolaData;
        if (strcmp(masterPassword, parolaData) == 0) {
            ct = 1;
        } else {
            cout << "Parola incorecta!\n";
        }
    } while (ct == 0);

    while (true) {
        int option = afisare_optiuni();
        switch (option) {
            case 1: afisare_detalii_aplicatie();
                break;
            case 2: insert_cont();
                break;
            case 3: read_and_print_all(filename, masterPassword);
                break;
            case 4: search_by_account_name(filename, masterPassword);
                break;
            case 5: exit(0);
        }
    }
}

int main() {
    main_page_instruction();
    return 0;
}
