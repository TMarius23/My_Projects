/**
* @author Trif Marius

* Specificatia continutului temei: interclasarea a k siruri, fiecare sortate crescator
 *
 *    Algoritmul a fost implementat cu ajutorul unor structuri de heap, modificate, astfel ca in fiecare nod
 * sa mentina de fapt un head, la o lista de noduri. Astfel pt a interclasa cele k siruri sortate crescator
 * trebuie sa facem heapsort, la un heap min.
 *
 *    In cazul average de la problema 3, se poate observa faptul ca complexitatea algoritmului
 * se respecta dupa varierea k - ului
 * Algoritmul are o complexitae de O(n lg k)
 * In ex3 noi variem k, initial el find 5, este reprezentat de cea mai de jos linie din grafic,
 * k = 10, de cea din mijloc, iar daca alegem k = 100, linia reprezentativa se afla cu mult deasupra
 * celorlalte.
 *
 *    Totodata, in cealalta partea a ex3, in momentul in care noi variem k, iar n-ul nostru este fixat,
 * se poate observa o functie logaritmica, acest lucru reprezentand lgK din complexitatea algoritmului
 *
*/

#include <iostream>
#include <queue>
#include "Profiler.h"

using namespace std;

Profiler profiler;

///1 4 6 8
///2 3 5 6 7
///4 5 9
///6 7
///4 5
///1 10


struct node {
    int key;
    struct node *next;
};

node *create_node(int key) {
    ///putem si cu malloc si si calloc
    ///C++ object oriented
    node *new_node = new node(); ///am alocat ca in java, un nou obiect
    memset(new_node, 0, sizeof(node));
    new_node->key = key;
    new_node->next = NULL;

    return new_node;
}

node *h[505];

///ca sa nu mai alocam fiecare linie in parte
///alocam doar fiecare element in parte

///heap indexat de la 1 la k

///bottom up
void sink(node *h[505], int index, int k) {
    ///k <- heap size
    while (2 * index <= k) {
        ///minim e un index, care consideram ca la aceea pozitie se afla elementul minim
        int mini = 2 * index;
        if (mini + 1 <= k && h[mini + 1]->key < h[mini]->key)
            mini++;
        ///h[mini]->key e prima valoarea din lista h[min]
        if (h[mini]->key < h[index]->key) {
            swap(h[mini], h[index]); /// facem swap la pointeri
            index = mini;
        } else {
            break;
        }
    }
}

void print_af(node *h[505], int n, int k) {
    for (int i = 1; i <= k; i++) {
        node *first = h[i];
        while (h[i]) {
            cout << h[i]->key << " ";
            h[i] = h[i]->next;
        }
        h[i] = first;
        cout << endl;
    }
    cout << endl;
}

void print_vect(int v[], int n) {
    for (int i = 1; i <= n; i++) {
        cout << v[i] << " ";
    }
    cout << endl;
}


void make_heap(node *h[505], int k) {
    for (int i = k / 2; i >= 1; i--) {
        sink(h, i, k);
    }
    print_af(h, 20, k);
}


///trebuie creat lista de liste
///si si initializate
///trebuie si apelat un build heap
///O(n)
///se face o singura data
///pt a avea un heap creat


///k reprezinta nr de liste
///trebuie sa avem grija pt ca daca folosim acelasi k si pt grafice si si pt reolvare a pb, o sa iasa graficele prost

queue<int> sol;

void merge_k_ordered_list(node *h[505], int k, int n, int v[]) {

    make_heap(h, k);/// trebuie sa numaram op si aici? da

    int heap_size = k;
    int ct = 1;

    while (heap_size > 0) {
        ///facem cum vrem noi daca sa o numaram sau nu
        //sol.push(h[1]->key);
        v[ct++] = h[1]->key;

        if (h[1]->next != NULL) {
            ///daca dorim sa prelucram nodul, o facem aici
            //node *aux = h[1];
            h[1] = h[1]->next;
            ///pt a elibera memoria
        } else {
            //node *aux = h[1];
            h[1] = h[heap_size];
            heap_size--;
        }
        sink(h, 1, heap_size);
    }
}
///se mai poate face un update, daca avem o singura lista
///gen heap_size == 1, si ne raman elemente in acea lista
///o putem lista pe toata fara nici o problema


void generate_list(node *h[505], int n, int k) {
    int kk = 1;

    int mod = n % k;
    int ct = 0;
    if (mod != 0)
        ct = mod;

    while (kk <= k) {
        int nr_elem = 0;
        if (ct != 0) {
            nr_elem = n / k + 1;
            ct--;
        } else
            nr_elem = n / k;

        int vect[10000];

        FillRandomArray(vect, n / k + 1, 100, 1000, false, 1);
        node *p = create_node(vect[0]);
        h[kk] = p;
        h[kk]->next = NULL;

        node *first = h[kk];

        ///h il punem intr-un first
        for (int i = 1; i < nr_elem; i++) {
            node *pp = create_node(vect[i]);
            h[kk]->next = pp; /// valori de la 100 la 10000
            h[kk] = pp;
            h[kk]->next = NULL;
        }
        h[kk] = first;

        kk++;
    }
}

////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////

void generate_list_op(node *h[505], int n, int k,  Operation *atr, Operation *cmp) {
    int kk = 1;

    int mod = n % k;
    int ct = 0;
    if (mod != 0)
        ct = mod;

    while (kk <= k) {
        int nr_elem = 0;
        if (ct != 0) {
            nr_elem = n / k + 1;
            ct--;
        } else
            nr_elem = n / k;

        int vect[10000];

        FillRandomArray(vect, n / k + 1, 100, 10000, false, 1);
        node *p = create_node(vect[0]);
        atr->count(2);
        h[kk] = p;
        h[kk]->next = NULL;

        atr->count();
        node *first = h[kk];

        for (int i = 1; i < nr_elem; i++) {
            node *pp = create_node(vect[i]);
            atr->count(3);
            h[kk]->next = pp;
            h[kk] = pp;
            h[kk]->next = NULL;
        }
        atr->count();
        h[kk] = first;

        kk++;
    }
}

void sink_op(node *h[505], int index, int k, Operation *atr, Operation *cmp) {
    while (2 * index <= k) {
        int mini = 2 * index;
        cmp->count();
        if (mini + 1 <= k && h[mini + 1]->key < h[mini]->key)
            mini++;
        cmp->count();
        if (h[mini]->key < h[index]->key) {
            atr->count(3);
            swap(h[mini], h[index]);
            index = mini;
        } else {
            break;
        }
    }
}

void make_heap_op(node *h[505], int k, Operation *atr, Operation *cmp) {
    for (int i = k / 2; i >= 1; i--) {
        sink_op(h, i, k, atr, cmp);
    }
}

void merge_k_ordered_list_op(node *h[505], int k, Operation *atr, Operation *cmp) {

    make_heap_op(h, k, atr, cmp);

    node hh[505];
//    for(int i = 0; i < k; i++){
//        hh[i] = *h[i];
//    }

    int heap_size = k;
    while (heap_size > 0) {
        cmp->count();
        if (h[1]->next != NULL) {
            ///atr->count();
            ///node *aux = h[1];
            atr->count();
            h[1] = h[1]->next;
//            if(aux !=NULL)
//                free(aux);
        } else {
//            atr->count();
//            node *aux = h[1];
            atr->count();
            h[1] = h[heap_size];
//            if(aux != NULL)
//                free(aux);
            heap_size--;
        }
        sink_op(h, 1, k, atr, cmp);
    }
//    for(int i = 0; i < k; i++){
//        *h[i] = hh[i];
//    }
}


////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////Parte de demo///////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////

///n nr total de elemente
///in medie n/k pe lista
void demo_testare_generare_k_liste_pb1() {

    node *h[505];
    int n = 20;
    int k = 4;
    generate_list(h, n, k);
    print_af(h, n, k);

    int v[n + 1];
    merge_k_ordered_list(h, 2, n, v);
    if(n % k != 0)
        print_vect(v, n / 2 + 1);
    else
        print_vect(v, n / 2);

}

void demo_interclasare_k_liste(){
    node *h[505];
    int n = 20;
    int k = 4;
    generate_list(h, n, k);
    print_af(h, n, k);

    int v[n + 1];
    merge_k_ordered_list(h, k, n, v);
    print_vect(v, n);
}

void demo_nFix_kVariabil(){

    node *h[505];
    int n = 10000;
    for(int i = 10; i <= 500; i = i + 10){
        Operation atr = profiler.createOperation("Atribuiri_nFix", i);
        Operation cmp = profiler.createOperation("Comparari_nFix", i);

        generate_list_op(h, n, i, &atr, &cmp);
        merge_k_ordered_list_op(h, i, &atr, &cmp);
    }

    profiler.addSeries("Adunate_atr_cmp", "Atribuiri_nFix", "Comparari_nFix");
    profiler.createGroup("Rezultat final", "Adunate_atr_cmp");

    profiler.showReport();
}

void demo_kFix_nVariabil(){

    node *h[505];
    int k1 = 5;
    for(int i = 100; i <= 1000; i = i + 100){
        Operation atr1 = profiler.createOperation("Atribuiri_kFix1", i);
        Operation cmp1 = profiler.  createOperation("Comparari_kFix1", i);

        generate_list_op(h, i, k1, &atr1, &cmp1);
        merge_k_ordered_list_op(h, k1, &atr1, &cmp1);
    }

    profiler.addSeries("Adunate_atr_cmp_k1", "Atribuiri_kFix1", "Comparari_kFix1");
//    profiler.createGroup("Rezultat final1", "Adunate_atr_cmp_k1");

    int k2 = 10;
    for(int i = 100; i <= 1000; i = i + 100){
        Operation atr2 = profiler.createOperation("Atribuiri_kFix2", i);
        Operation cmp2 = profiler.createOperation("Comparari_kFix2", i);

        generate_list_op(h, i, k2, &atr2, &cmp2);
        merge_k_ordered_list_op(h, k2, &atr2, &cmp2);
    }

    profiler.addSeries("Adunate_atr_cmp_k2", "Atribuiri_kFix2", "Comparari_kFix2");
//    profiler.createGroup("Rezultat final2", "Adunate_atr_cmp_k2");
//    profiler.createGroup("Rezultat final_1_add_2", "Adunate_atr_cmp_k2", "Adunate_atr_cmp_k1");

    int k3 = 100;
    for(int i = 100; i <= 1000; i = i + 100){
        Operation atr3 = profiler.createOperation("Atribuiri_kFix3", i);
        Operation cmp3 = profiler.createOperation("Comparari_kFix3", i);

        generate_list_op(h, i, k3, &atr3, &cmp3);
        merge_k_ordered_list_op(h, k3, &atr3, &cmp3);
    }
    profiler.addSeries("Adunate_atr_cmp_k3", "Atribuiri_kFix3", "Comparari_kFix3");
//    profiler.createGroup("Rezultat final3", "Adunate_atr_cmp_k3");

    profiler.createGroup("Rezultat final_1_add_2_add_3", "Adunate_atr_cmp_k1", "Adunate_atr_cmp_k2",
                           "Adunate_atr_cmp_k3");


    profiler.showReport();
}


int main() {
    //demo_testare_generare_k_liste_pb1();
    //demo_interclasare_k_liste();

    //demo_kFix_nVariabil();
    demo_nFix_kVariabil();


    ///cand variz n si k ramane fix, plotam dupa k
    ///cand variz k si n ramane fix, plotam dupa n


    return 0;
}
