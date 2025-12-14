/**
* @author Trif Marius

* Specificatia continutului temei: HashTable
 *
 * Construirea unui HashTable care sa fie un numar impar de noduri libere si care sa nu fie apropiat de puterile
 * lui 10 si ale lui 2. Un HashTable cu adresare deschisa si verificare patratica
 *
 * Inserarea numerelor in tabel. Numerele sa fie random, deoarece altfel ar fi o inserare 1:1 si aceasta se face in
 * O(1), ceea ce noi nu ne dorim sa testam pe tabelul nostru deoarece noi vrem sa verificam corectitudinea lui
 * pe valori random, care apar in viata reala, nu pe ceva calsificat. Numerele in tabel le introducem printr-o
 * functie de Hashing cu verificare patratica. Si acolo constantele trebuie sa fie prime intre ele si sa nu fie
 * apropuate de valori ale puterilor lui 2 si ale lui 10 deoarece vor fi multe coliziuni => mai mult timp
 * pierdut pentru gasirea unui loc gol, sau pentru cautarea unei chei dorite.
 *
 * Timpul per o operatie: inserare stergere cautare este O(1)
 *
 * Timpul pentru stergere si cautarea unui element, v-a dura mult mai mult deoarece in comparatie cu
 * momentul in care noi doar inseram in tabela cu randamentul de 80% deoarece, in casutele in care in prima varinata
 * era FREE, de aceasta data noi v-om gasi o pozitie DELETED, dar acasata nu ne garanteaza faptul ca noi la urmatorea
 * cautare nu sunt sanse sa gasim elementul nostru dorit. Astfel avem niste valori mult mai mari in tabelul corespunzator
 * stergerii.
 *
 *
 *
*/

#include <iostream>
#include <string.h>
#include <math.h>
#include <time.h>
#include "Profiler.h"

using namespace std;

Profiler profiler;

///Filling factor 95/100 * N

typedef struct {
    int id;
    char name[30];
    int status; // pt a afisa daca tabela e NULL sau nu
} Entry;

typedef enum {
    FREE, OCCUPIED, DELETED
};

int hFunction(int n, int key) {
    while (key < 0)
        key = key + n;
    return (key % n);
}

int quadric_probing(int n, int key, int i) {
    int c1 = 13;
    int c2 = 19;
    while (key < 0)
        key = key + n;
    return (hFunction(n, key) + c1 * i + c2 * i * i) % n;
}

int search(Entry *A, int n, int key) {

    for (int i = 0; i < n; i++) {
        int poz = quadric_probing(n, key, i);
        if (A[poz].id == key)
            return poz;
    }
    return -1;
}

///secventa de i din quadric_probing nu are rost sa depaseasca dimensiunea tabelei, adica n-ul din forul de jos.
///pt ca mai apoi o sa se repete valorile, si o sa fie acelasi rezultat
int insert(Entry *A, int n, int key, char name[]) {
    for (int i = 0; i <= n; i++) {
        int poz = quadric_probing(n, key, i);
        if (A[poz].status == FREE || A[poz].status == DELETED) {
            A[poz].status = OCCUPIED;
            A[poz].id = key;
            strcpy(A[poz].name, name);
            return 1;
        }
    }
    return -1;
}

void print_hTable(Entry *A, int n) {
    for (int i = 0; i < n; i++) {
        if (A[i].status == OCCUPIED)
            cout << A[i].id << " " << A[i].name << endl;
    }
    cout << endl;
}

char name[30][15] = {"Andrei", "Maria", "Ioana", "Alexandru", "Elena", "Mihai", "Gabriela", "Cristian", "Ana", "Vlad",
                     "Laura", "Stefan", "Raluca", "Radu", "Diana", "Paul", "Daniela", "Victor", "Iulia", "Sorin",
                     "Simona", "George", "Bianca", "Florin", "Monica", "Adrian", "Corina", "Teodor", "Alina",
                     "Claudiu"};


void demo_OP_ins_srch() {

    int n = 10;
    Entry *A = (Entry *) malloc((n + 1) * sizeof(Entry));
    memset(A, 0, (n + 1) * sizeof(Entry));

    srand(time(NULL));
    int nr = 0;
    while (nr < n) {
        int nr_ret = insert(A, n, (rand() % n) + nr, name[nr]);
        if (nr_ret != -1)
            nr++;
    }

    print_hTable(A, n
    );

    int id = 4;
    int poz = search(A, n, id);
    char *name1 = A[poz].name;
    if (
            search(A, n, id
            ) == -1)
        strcpy(name1,
               "Nu exista persoana cu id-ul respectiv");

    cout << "Numele de la id-ul " << id << " este: " << name1;
    cout << endl;
}

int insert_N_elem_rand(Entry *A, int n, double rand) {

    int *vect = (int *) malloc(10000 * sizeof(int));
    memset(vect, 0, 10000 * sizeof(int));

    FillRandomArray(vect, n, 0, 15000, true, 0);

    int nr = 0;
    int i = 0;
    while ((double) nr / n < rand) {
        int verif = insert(A, n, vect[i++], name[((n % 30) * (nr % 30)) % 30]);
        if (verif == 1)
            nr++;
    }
    return nr;
}


////op

int search_op(Entry *A, int n, int key, double *contor) {

    for (int i = 0; i < n; i++) {
        int poz = quadric_probing(n, key, i);
        *contor = i;
        if (A[poz].id == key) {
            return poz;
        }
        if (A[poz].status == FREE) // || A[poz].status == DELETED)
            return -1;
    }
    return -1;
}

void insert_N_elem_rand_op(Entry *A, int n, double rand) {

    int *vect = (int *) malloc(10000 * sizeof(int));
    memset(vect, 0, 10000 * sizeof(int));

    FillRandomArray(vect, n, 0, 15000, true, 0);

    int nr = 0;
    int i = 0;
    while ((double) nr / n < rand) {
        int verif = insert(A, n, vect[i++], name[((n % 30) * (nr % 30)) % 30]);
        if (verif == 1)
            nr++;
    }
}

int stergere_element_k(Entry *A, int n, int key) {

    for (int i = 0; i < n; i++) {
        int poz = quadric_probing(n, key, i);

        if (A[poz].id == key) {
            A[poz].id = 0;
            A[poz].status = DELETED;
            return 1;
        }
    }
    return -1;
}

void demo_op_search_95() {

    int n = 9973;
    Entry *A = (Entry *) malloc(n * sizeof(Entry));
    memset(A, 0, n * sizeof(Entry));

    double rand = 0.95;
    int m = 3000;
    double contor = 0;

    double efortMG = 0;
    double efortMNG = 0;

    double sumGasite = 0;
    double sumNegasite = 0;

    int elemNegasite = 0;
    int elemGasite = 0;

    for (int i = 0; i < 5; i++) {

        insert_N_elem_rand_op(A, n, rand);

        ///Alegem accest range deoarece noi generam numere care sa fie introduse in Hash-Table de la 0 la 15000, dar
        ///HTable ul este doar de 9973 de elemente, deci cu aproximativ 5000 pozitii in plus care raman neocupate
        ///deci care nu vor "intra" in tabel, adica avem 5000 de posibilitati ramase restante deoarece tabelul este plin
        ///astfel noi pt a avea o proportionalitate de 1/2 la alegerea numerelor care se afla in tabel si cele care nu se afla
        ///noi dublam fillrandomarray ul care are valoarea maxima 15000 la 30000 dar noi deja stim ca 5000 din primul erau
        ///nefolosite, asa ca scadem din 30000, cele 50000 pentru a putea avea o probabilitate de aproximativ 1/2

        ///Nu o sa punem 20000 pentru ca in cazul in care noi in primul sir avem toate numerele puse in sir de catre
        ///fillrandomarray intre 5000 - 15000, v-a fi o probabilitate mult mai mare de a se face referire la ele, deoarece
        /// range-ul este mult v-a fi mult mai restrans. => nu v-a fi chiar 1/2, dar totodata noi trebuie sa scadem si din
        ///vectorul nostru nou 5000 de valori deoarece noi avem 10000 valori inserate, iar noua ne trebuie sa avem dublul sau

        int vect[3001];
        FillRandomArray(vect, m, 0, 20000, true, 0);


        contor = 0;
        for (int j = 0; j < 3000; j++) {
            int nr = search_op(A, n, vect[j], &contor);

            if (nr == -1) {
                elemNegasite++;
                sumNegasite = sumNegasite + contor;
                if (contor > efortMNG)
                    efortMNG = contor;
            } else {
                elemGasite++;
                sumGasite = sumGasite + contor;
                if (contor > efortMG)
                    efortMG = contor;
            }
        }

        memset(A, 0, n * sizeof(Entry));
        memset(vect, 0, m * sizeof(int));
    }

    double avgNegasite = sumNegasite / elemNegasite;
    double avgGasite = sumGasite / elemGasite;

    cout
            << "Factor de Umplere | Efort Mediu Gasite | Efort Maxim Gasite | Efort Mediu Ne-Gasite | Efort Maxim Ne-Gasite\n";
    cout
            << "-----------------------------------------------------------------------------------------------------------\n";
    cout << 0.95 << "                     " << avgGasite << "                " << efortMG << "                  "
         << avgNegasite << "                   " << efortMNG << endl;

    free(A);
}

void afisareTabel(double range, double avgGasite, double efortMG, double avgNegasite, double efortMNG) {

    cout << range << "                     " << avgGasite << "                " << efortMG << "                  "
         << avgNegasite << "                   " << efortMNG << endl;

}

void operatii_randDiferit(Entry *A, int n, double rand) {

    int m = 3000;
    double contor = 0;

    double efortMG = 0;
    double efortMNG = 0;

    double sumGasite = 0;
    double sumNegasite = 0;

    int elemNegasite = 0;
    int elemGasite = 0;


    for (int i = 0; i < 5; i++) {

        insert_N_elem_rand_op(A, n, rand);

        int vect[3001];
        FillRandomArray(vect, m, 0, 20000, true, 0);

        contor = 0;
        for (int j = 0; j < 3000; j++) {
            int nr = search_op(A, n, vect[j], &contor);

            if (nr == -1) {
                elemNegasite++;
                sumNegasite = sumNegasite + contor;
                if (contor > efortMNG)
                    efortMNG = contor;
            } else {
                elemGasite++;
                sumGasite = sumGasite + contor;
                if (contor > efortMG)
                    efortMG = contor;
            }
        }

        memset(A, 0, n * sizeof(Entry));
        memset(vect, 0, m * sizeof(int));
    }

    double avgNegasite = sumNegasite / elemNegasite;
    double avgGasite = sumGasite / elemGasite;

    afisareTabel(rand, avgGasite, efortMG, avgNegasite, efortMNG);
    //cout << "-----elem negasite: " << elemNegasite / 5 << " elem gasite: " << elemGasite / 5 << " -------" << endl;
}

void operatii_verificareCautare(Entry *A, int n, double rand, double &avgGasite, double &efortMG, double &avgNegasite,
                                double &efortMNG) {

    int m = 3000;
    double contor = 0;

    double sumGasite = 0;
    double sumNegasite = 0;

    int elemNegasite = 0;
    int elemGasite = 0;


    int vect[3001];
    FillRandomArray(vect, m, 0, 15000, true, 0);

    contor = 0;
    for (int j = 0; j < 3000; j++) {
        int nr = search_op(A, n, vect[j], &contor);

        if (nr == -1) {
            elemNegasite++;
            sumNegasite = sumNegasite + contor;
            if (contor > efortMNG)
                efortMNG = contor;
        } else {
            elemGasite++;
            sumGasite = sumGasite + contor;
            if (contor > efortMG)
                efortMG = contor;
        }
    }

    memset(vect, 0, m * sizeof(int));


    avgNegasite = sumNegasite / elemNegasite;
    avgGasite = sumGasite / elemGasite;

}

void demo_op_search() {

    int n = 9973;
    Entry *A = (Entry *) malloc(n * sizeof(Entry));
    memset(A, 0, n * sizeof(Entry));

    cout
            << "Factor de Umplere | Efort Mediu Gasite | Efort Maxim Gasite | Efort Mediu Ne-Gasite | Efort Maxim Ne-Gasite\n";
    cout
            << "-----------------------------------------------------------------------------------------------------------\n";

    operatii_randDiferit(A, n, 0.80);
    operatii_randDiferit(A, n, 0.85);
    operatii_randDiferit(A, n, 0.90);
    operatii_randDiferit(A, n, 0.95);
    operatii_randDiferit(A, n, 0.99);

    free(A);
}

void demo_sterger() {

    int n = 10;
    Entry *A = (Entry *) malloc(n * sizeof(Entry));
    memset(A, 0, n * sizeof(Entry));

    srand(time(NULL));
    for (int i = 0; i < n; i++) {
        insert(A, n, (rand() % n) + i, name[i]);
    }

    print_hTable(A, n);
    cout << endl;

    int id = 4;
    int nr = stergere_element_k(A, n, id);
    if (nr == -1)
        cout << "Nu exista un numar cu id-ul: " << id << endl;
    else
        print_hTable(A, n);

    free(A);
}

void stergereRandom() {

    int n = 9973;
    Entry *A = (Entry *) malloc(n * sizeof(Entry));

    double avgGasite = 0;
    double efortMG = 0;
    double avgNegasite = 0;
    double efortMNG = 0;

    for (int j = 0; j < 5; j++) {
        memset(A, 0, n * sizeof(Entry));

        int nr = insert_N_elem_rand(A, n, 0.99);

        int *vect = (int *) malloc(10000 * sizeof(int));
        memset(vect, 0, 2000 * sizeof(int));
        FillRandomArray(vect, n, 0, 15000, true, 0);

        int i = 0;
        while ((double) nr / n > 0.79) {
            int k = stergere_element_k(A, n, vect[i++]);
            if (k == 1)
                nr--;
        }
        //print_hTable(A, n);

        operatii_verificareCautare(A, n, 0.80, avgGasite, efortMG, avgNegasite, efortMNG);

        free(vect);
    }
    afisareTabel(0.80, avgGasite, efortMG, avgNegasite, efortMNG);
    // cout << "-----elem negasite: " << elemNegasite  << " elem gasite: " << elemGasite  << " -------" << endl;
    free(A);
}

int main() {

    demo_OP_ins_srch();


    demo_op_search_95();
    demo_op_search();

    demo_sterger();
    stergereRandom();


    return 0;
}
