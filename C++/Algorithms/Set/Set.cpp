/**
* @author Trif Marius
* Specificatia continutului temei: MAKE_SET, UNION, FIND_SET
 *
 *Aceasta tema prezinta folosirea unor niste colectii disjuncte, cu aceste 3 functii aferente lor.
 *
 * MAKE_SET:
 * In care noi ne construim propriul nostru set, care mai exact are ca parinte propriul nod, adica pe el insusi, si un rank 1
 * Acest rank reprezentand inaltimea maxima a unei inlantuiri de noduri din acel subset de date.
 * Acesta are o complexitate de O(1), fiind necesare doar 2 atriburi, una in care parintele nodului sa pointeze tot la el, iar
 * cealalta fiind cea de selectie a rank-ului, noi dorind sa il punem pe 1
 *
 *
 * FIND_SET:
 * Aceasta functie a multimilor disjuncte doreste sa ne returneze elementul reprezentant al acelei multimi, adica parintele principal
 * al tututor nodurilor. Aceasta cautare a parintelui dupa o euristica de comprimare a datelor, se face f rapid, avand in acest
 * caz cel mult o inaltime de 3. Atunci rezulta ca noi o putem face intr-un timp constant, avand o functie care creste forte greu in timp
 * astfel putem spune ca se face in O(1).
 * Acest lucru se intampla pentru ca noi atribuim valoarea parintelui, tuturor nodurilor din subarbore, astfel noi facem ca fiecare nod
 * sa pointeze direct catre acesta. Acest lucru avand beneficii mari in urmatoarele cautari, timpul fiind mult mai restrans.
 *
 * UNION:
 * Aceasta functie doreste sa reuneasca 2 multimi de date, folosinduse de anumite interogari. Adica pe 2 cazuri.
 * Caz 1: Mai exact daca nodurile au acelasi rank atunci se doreste cresterea cu 1 a rankului arborelui, nu prin
 * inlantuirea datelor si formarea unui arbore degenerat.
 * Caz 2: Daca unul dintre cele 2 structuri are un rank mult mai mic fata de cealalta, atunci noi nu ne dorim sa creste
 * dimensiunea arborelui, astfel noi v-om lega datele arborelui cu rank mai mic la parintele arborelui care are cea mai mare inaltime
 * Acest lucru se face in O(lgH). Deoarece pentru un singur apel al functiei UNION, noi trebuie sa parcurgem arbori iar un arbore are
 * o inaltime logaritmica
 *
 * Daca le luam pe toate impreuna, insumate o sa avem o complexitate de O(m + nlgN).
 * m - reprezinta numarul de apeluri ale functiilor : MAKE_SET, UNION, FIND_SET
 * n - numarul de valori pe care le are de parcurs
 *
 *
*/



#include <iostream>
#include <cstring>
#include <ctime>
#include "Profiler.h"

using namespace std;

Profiler profiler;

typedef struct _node {
    int key;
    int rank; ///inaltimea maxima, pe numarul de noduri. Le numaram pe noduri nu pe muchii
} node;
///indexul o sa fie parintele valorii

typedef struct _graf {
    int x, y, cost_muchie;
} muchie_x_y;

void MAKE_SET(int x, node node_parent[10005]) {
    node_parent[x].key = x;
    node_parent[x].rank = 1;
}


///e constant in timp

///putem augumenta structura, astfel incat noi de fiecare data cand gasim un nod care nu e
///legat direct la parinte, il legam
int FIND_SET(int x, node node_parent[10005]) {
    if (x == node_parent[x].key) {
        return x;
    }
    node_parent[x].key = FIND_SET(node_parent[x].key, node_parent);
    return node_parent[x].key;
}
///ne tinem inaltimea constant 1, 2, maxim 3.
///e constant in timp, pt unele cazuri lgN


///trebuie sa ordonam crescator muchiile


///daca ne definim o functie trebuie sa faca ceea ce isi propune sa faca, adica nu si verificari in plus
///sau alte calcule. Acelea le modulam intr-o alta functie

void UNION(int x, int y, node node_parent[10005]) {
    int rootX = FIND_SET(x, node_parent);
    int rootY = FIND_SET(y, node_parent);

    if (node_parent[rootX].rank < node_parent[rootY].rank) {
        node_parent[rootX].key = rootY;
    } else if (node_parent[rootX].rank > node_parent[rootY].rank) {
        node_parent[rootY].key = rootX;
    } else {
        node_parent[rootY].key = rootX;
        node_parent[rootX].rank++;
    }
}


void print_elem(int nr, node node_parent[]) {
    for (int i = 0; i < nr; i++) {
        if (node_parent[i].key != -1)
            cout << i << " " << node_parent[i].key << " rang: " << node_parent[i].rank << endl;
    }
    cout << endl;
    cout << endl;
}


void demo_MUF() {
    node node_parent[10005];
    memset(node_parent, -1, 10005);

    int range = 30;
    int nr[11];
    for (int i = 0; i < 10; i++) {
        nr[i] = rand() % (range - 1) + 1;
    }

    for (int i = 0; i < 10; i++) {
        MAKE_SET(nr[i], node_parent);
    }
    print_elem(range, node_parent);

    srand(time(NULL));
    for (int i = 0; i < 5; i++) {
        int x1 = nr[rand() % 10];
        int x2 = nr[rand() % 10];
        while (x1 == x2) {
            x1 = nr[rand() % 10];
            x2 = nr[rand() % 10];
        }
        if (FIND_SET(x1, node_parent) != FIND_SET(x2, node_parent)) {
            UNION(x1, x2, node_parent);
        }
    }
    print_elem(range, node_parent);
}

int exist_muchie(muchie_x_y muchii[], int n, int x, int y) {
    for (int i = 0; i < n; i++) {
        if (muchii[i].x == x && muchii[i].y == y || muchii[i].x == y && muchii[i].y == x)
            return 1;
    }
    return 0;
}

int exist_nod(int nod[], int n, int x) {
    for (int i = 0; i < n; i++) {
        if (nod[i] == x)
            return 1;
    }
    return 0;
}

////////////////////////
////////Ordonare////////
////////////////////////

int Partition_QS(muchie_x_y A[], int left, int right) {
    int j = left - 1;
    for (int i = left; i < right; i++) {
        if (A[i].cost_muchie <= A[right - 1].cost_muchie) {
            j++;
            swap(A[i], A[j]);
        }
    }
    return j;
}

int randomizedPartition(muchie_x_y A[], int left, int right) {
    int k = rand() % (right - left) + left;
//    cout << "K = " << k << endl;
    swap(A[right - 1], A[k]);
    return Partition_QS(A, left, right);
}

void QuickSelect(muchie_x_y A[], int left, int right) {
    if (left < right) {
        srand(time(NULL));
        int q = randomizedPartition(A, left, right);

        QuickSelect(A, left, q - 1);
        QuickSelect(A, q + 1, right);
    }
}

////////////////////////
////////////////////////
////////////////////////

void print_muchii(muchie_x_y muchii[], int n) {
    for (int i = 0; i < n; i++) {
        cout << muchii[i].x << " " << muchii[i].y << " cost: " << muchii[i].cost_muchie << endl;
    }
    cout << endl;
    cout << endl;
}

muchie_x_y *Kruskal(int nod[], node node_parent[], muchie_x_y muchii[], int n, int m, int *nr_m) {
    muchie_x_y *A = (muchie_x_y *) malloc(m * sizeof(muchie_x_y));
    memset(A, 0, m * sizeof(muchie_x_y));

    for (int i = 0; i < n; i++) {
        if (nod[i] != 0)
            MAKE_SET(nod[i], node_parent);
    }

    //print_muchii(muchii, m);
    QuickSelect(muchii, 0, m);

    //print_elem(n, node_parent);
    //print_muchii(muchii, m);

    for (int i = 0; i < m; i++) {
        if (FIND_SET(muchii[i].x, node_parent) != FIND_SET(muchii[i].y, node_parent)) {
            A[*nr_m] = muchii[i];
            *nr_m = *nr_m + 1;
            UNION(muchii[i].x, muchii[i].y, node_parent);
        }
    }

    return A;
}

int val_maxima(int nod[], int n) {
    int nr = INT_MIN;
    for (int i = 0; i < n; i++) {
        if (nr < nod[i])
            nr = nod[i];
    }
    return nr;
}

void demo_Kruskal() {

    node node_parent[10005];
    memset(node_parent, -1, 10005);

    srand(time(NULL));
    int nod[6] = {1, 2, 3, 4, 5};
    muchie_x_y muchii[10005] = {1, 2, 22,
                                2, 5, 3,
                                2, 3, 11,
                                1, 4, 5,
                                3, 4, 7,
                                1, 3, 7,
                                2, 4, 12,
                                1, 5, 16,
                                4, 5, 9};

    //print_muchii(muchii, 9);

    int val_max = val_maxima(nod, (sizeof(nod) / sizeof(nod[0])));
    int nr_m = 0;
    muchie_x_y *A = Kruskal(nod, node_parent, muchii, val_max + 1, 9, &nr_m);

    //print_elem(5, node_parent);
    print_muchii(A, nr_m);
}

///////////////////////////////
///////////////////////////////
///////////////////////////////
///////////////////////////////


void MAKE_SET_op(int x, node node_parent[10005], Operation *atr_MS, Operation *cmp_MS) {
    atr_MS->count(2);
    node_parent[x].key = x;
    node_parent[x].rank = 1;
}

int FIND_SET_op(int x, node node_parent[10005],  Operation *atr_FND, Operation *cmp_FND) {
    cmp_FND->count();
    if (x == node_parent[x].key) {
        return x;
    }
    atr_FND->count();
    node_parent[x].key = FIND_SET_op(node_parent[x].key, node_parent, atr_FND, cmp_FND);
    return node_parent[x].key;
}

void UNION_op(int x, int y, node node_parent[10005], Operation *atr_UN, Operation *cmp_UN, Operation *atr_FND, Operation *cmp_FND) {
    int rootX = FIND_SET_op(x, node_parent, atr_FND, cmp_FND);
    int rootY = FIND_SET_op(y, node_parent, atr_FND, cmp_FND);

    cmp_UN->count();
    if (node_parent[rootX].rank < node_parent[rootY].rank) {
        atr_UN->count();
        node_parent[rootX].key = rootY;
    } else if (node_parent[rootX].rank > node_parent[rootY].rank) {
        cmp_UN->count();
        atr_UN->count();
        node_parent[rootY].key = rootX;
    } else {
        cmp_UN->count();
        atr_UN->count(2);
        node_parent[rootY].key = rootX;
        node_parent[rootX].rank++;
    }
}

muchie_x_y *Kruskal_op(int nod[], node node_parent[], muchie_x_y muchii[], int n, int m, int *nr_m,
                       Operation *atr_MS, Operation *cmp_MS, Operation *atr_UN, Operation *cmp_UN, Operation *atr_FND, Operation *cmp_FND) {

    muchie_x_y *A = (muchie_x_y *) malloc(m * sizeof(muchie_x_y));
    memset(A, 0, m * sizeof(muchie_x_y));

    for (int i = 0; i < n; i++) {
        if (nod[i] != 0)
            MAKE_SET_op(nod[i], node_parent, atr_MS, cmp_MS);
    }

    QuickSelect(muchii, 0, m);

    for (int i = 0; i < m; i++) {
        if (FIND_SET_op(muchii[i].x, node_parent, atr_FND, cmp_FND) != FIND_SET_op(muchii[i].y, node_parent, atr_FND, cmp_FND)) {
            A[*nr_m] = muchii[i];
            *nr_m = *nr_m + 1;
            UNION_op(muchii[i].x, muchii[i].y, node_parent, atr_UN, cmp_UN, atr_FND, cmp_FND);
        }
    }

    return A;
}


///////////////////////////////
///////////////////////////////
///////////////////////////////
///////////////////////////////





void demo_teste() {

    srand(time(NULL));
    node node_parent[10005];
    muchie_x_y muchii[40005];
    int nod[10005];

    for (int i = 100; i < 10000; i = i + 100) {
        memset(node_parent, -1, 10005);
        memset(nod, 0, 10005);
        memset(muchii, 0, 40005);

        FillRandomArray(nod, i + 1, 1, i + 1, true, 1);

        for (int j = 0; j < i * 4; j++) {
            int x = rand() % i + 1;
            int y = rand() % i + 1;
            while (exist_muchie(muchii, j, nod[x], nod[y]) == 1) {
                x = rand() % i + 1;
                y = rand() % i + 1;
            }
            muchii[j].x = nod[x];
            muchii[j].y = nod[y];
            muchii[j].cost_muchie = rand() % (i * 4) + 1;
        }
        Operation atr_MS = profiler.createOperation("Atribuiri_MAKE_SET", i);
        Operation cmp_MS = profiler.createOperation("Comparari_MAKE_SET", i);

        Operation atr_FND = profiler.createOperation("Atribuiri_FIND", i);
        Operation cmp_FND = profiler.createOperation("Comparari_FIND", i);

        Operation atr_UN = profiler.createOperation("Atribuiri_UNION", i);
        Operation cmp_UN = profiler.createOperation("Comparari_UNION", i);


        int nr_m = 0;
        muchie_x_y *A = Kruskal_op(nod, node_parent, muchii, i + 1, i * 4, &nr_m, &atr_MS, &cmp_MS, &atr_FND, &cmp_FND, &atr_UN, &cmp_UN);
        free(A);
    }

    profiler.addSeries("Suma_MS", "Atribuiri_MAKE_SET", "Comparari_MAKE_SET");
    profiler.addSeries("Suma_FD", "Atribuiri_FIND", "Comparari_FIND");
    profiler.addSeries("Suma_UN", "Atribuiri_UNION", "Comparari_UNION");

    profiler.createGroup("Suma_MS1",  "Atribuiri_MAKE_SET", "Comparari_MAKE_SET");
    profiler.createGroup("Suma_FD",  "Atribuiri_FIND", "Comparari_FIND");
    profiler.createGroup("Suma_UN",  "Atribuiri_UNION", "Comparari_UNION");
    profiler.createGroup("FD+UN",  "Suma_FD", "Suma_UN");
    profiler.createGroup("TOATE", "Suma_MS", "Suma_FD", "Suma_UN");

    profiler.showReport();
}

int main() {

    demo_MUF();
    demo_Kruskal();
    demo_teste();

    return 0;
}
