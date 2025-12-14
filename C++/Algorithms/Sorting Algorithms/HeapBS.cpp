/**
* @author Trif Marius
* Specificatia continutului proiectului: Implementarea algoritmului de construire de date Heap : in forma
 * bottom-up (swim) dar si celui top-down (sink). Este prezent algoritmul HeapSort, dar si 2 algoritmi de sortare a
 * datelor, unul dintre acestea fiind iterativ iar celalalt recursiv
 *
 * Algoritmul de sortare este: BubbleSort
 * Iterativ
 *  *BubbleSort are un:
 * best case cand sirul este sortat crescator
 * Avand Tcomp = O(n) iar Tatrib = 0
* worst case cand sirul este sortat descrescator
 * * Avand Tcomp = O(n^2) iar Tatrib = O(n^2)
 *
 * Recursiv:
 *  BubbleSort are un:
 * best case cand sirul este sortat crescator
 * Avand Tcomp = O(n) iar Tatrib = 0
* worst case cand sirul este sortat descrescator
 * * Avand Tcomp = O(n^2) iar Tatrib = O(n^2)
 *
 *  O diferenta dintre acestea care se poate observa din grafic este faptul ca numarul de comparari este putin mai
 *  mare la varianta recursiva a BubbleSort ului, fata de cea iterativa.
 *  O aseanare intre algoritmi este data de numarul de asigari, care in ambele cazuri sunt identice
 *
 *  \
 *  \\
 *  \\\
 *  \\\\
 *  \\\\\
 *  \\\\\\
 *  \\\\\\\
 *  \\\\\\\\
 *  |||||||||
 *  ////////
 *  //////
 *  ////
 *  //
 *  /
 *
 * Denumiri inversate swim cu sink
 *
 * SWIM: top-down       X(bottom-up)X
 * Este un algoritm de construire a unui heap, impingand elementul curent spre varful arborelui pana la pozitia unde ii este locul
 * Are o complexitate de O(NlgN) - este mult mai rapid
///swim heap sort bottom up
///5 2 1 1 4 1 1 6
///fiecare nod incearca sa inoate spre pozitia lui
///incepem din partea de sus a heap - ului si o coparam cu parintele lui si daca e mai < face swap
///incepem de pe a[1], adica al 2 nod si incercam sa urcam cat mai sus posibil nodul cu valoarea respectiva
 *
 *
 * SINK: bottom-up          (top-down)X
 * Este un algoritm de construire a unui heap, impingand elementul curent spre baza arborelui pana la pozitia unde ii este locul
 * Are o complexitate de O(N)
 *pt un singur element care nu e la locul lui, e considerat ca fiind heapify,(daca elementul e cel din varf)
*
 *
 * HeapSort
 * Este un algoritm de extragere a minimului/ maximului din varful arborelui
 * Acesta este extras prin swap-ul dintre radacina si ultima frunza din vector. Dupa acest proces
 * se aplica heapify pe graf sau se poate aplica SINK deoarece acesta impinge radacina la pozitia unde
 * trebuie sa fie in graf/ vector
 * HEAPSIZE-- dupa extragerea valorii maxime/minime
 *
*/

#include <iostream>
#include "Profiler.h"

using namespace std;

Profiler profiler;

///invers denumirile
void swim(int A[], int index, Operation *swim_op) { ///top-down

    swim_op->count();///cmp
    while (index > 1 && A[index] < A[index / 2]) {
        swim_op->count();///cmp

        swim_op->count(3);///switch - asignari
        swap(A[index], A[index / 2]);
        index = index / 2;
    }
}

void makeHeapSW(int A[], int n) {

    Operation swim_op = profiler.createOperation("SWIM", n);

    for (int i = 2; i <= n; i++) {
        swim(A, i, &swim_op);
    }
}
///Are o complexitate de NlgN construirea heapului

///sink
////pt un singur element care nu e la locul lui, e considerat ca fiind heapify,(daca elementul e cel din varf)
void sink(int A[], int n, int index, Operation *SINK) {///bottom up

    while (2 * index <= n) {
        int child1_ind = 2 * index;

        SINK->count();//cmp
        if (child1_ind + 1 < n && A[child1_ind + 1] < A[child1_ind])
            child1_ind++;

        SINK->count();///cmp
        if (A[index] > A[child1_ind]) {
            SINK->count(3); ///asignare
            swap(A[index], A[child1_ind]);
            index = child1_ind;
        } else {
            break;
        }
    }
}

void makeHeapSK(int A[], int n) {

    Operation SINK = profiler.createOperation("SINK", n);

    for (int i = n / 2; i >= 0; i--) {
        sink(A, n, i, &SINK);
    }
}


void sink_HeapSort(int A[], int n, int index, Operation *heap) {

    while (2 * index <= n) {
        int child1_ind = 2 * index;

        heap->count();
        if (child1_ind + 1 < n && A[child1_ind + 1] < A[child1_ind])
            child1_ind++;

        heap->count();
        if (A[index] > A[child1_ind]) {
            heap->count(3);
            swap(A[index], A[child1_ind]);
            index = child1_ind;
        } else {
            break;
        }
    }
}

void makeHeapSK_HeapSort(int A[], int n, Operation *heap) {

    for (int i = n / 2; i >= 0; i--) {
        sink_HeapSort(A, n, i, heap);
    }
}


void sink_h(int A[], int n, int index, Operation *heap) {

    while (2 * index <= n) {
        int child1_ind = 2 * index;

        heap->count();
        if (child1_ind + 1 < n && A[child1_ind + 1] < A[child1_ind])
            child1_ind++;

        heap->count();
        if (A[index] > A[child1_ind]) {
            heap->count(3);
            swap(A[index], A[child1_ind]);
            index = child1_ind;
        } else {
            break;
        }
    }
}

///HeapSort
void HeapSort(int A[], int n) {

    ///putem sa ne punem elementele intr-un alt sir

//    int v[n + 1];
//    FillRandomArray(v, n + 1, 0, 0, false, 0);

    Operation heap = profiler.createOperation("HEAP", n);

    makeHeapSK_HeapSort(A, n, &heap);

    while (n > 1) {
        cout << A[1] << " ";

        heap.count(3);
        swap(A[1], A[n]);
        n--;

        sink_h(A, n, 1, &heap);
    }
    cout << A[1] << " ";
}

void print_sir(int v[], int n) {
    for (int i = 0; i < n; i++) {
        cout << v[i] << " ";
    }
    cout << "\n";
}

void swim_demonstrare_nr_mici() {
    int vect[100];

    for (int j = 10; j <= 50; j = j + 5) {
        FillRandomArray(vect, j + 1, 0, 100, false, 0);
        makeHeapSW(vect, j);
        print_sir(vect, j);
    }
}


void sink_demonstrare_nr_mici() {
    int vect[10001];

    for (int j = 10; j <= 50; j = j + 5) {
        FillRandomArray(vect, j + 1, 0, 100, false, 0);
        makeHeapSK(vect, j);
        print_sir(vect, j);
    }
}


void swim_demo() {
    int vect[10001];

    for (int i = 0; i < 5; i++) {
        for (int j = 100; j <= 10000; j = j + 100) {
            FillRandomArray(vect, j + 1, 0, 50000, false, 0);
            makeHeapSW(vect, j);
        }
    }

    profiler.divideValues("SWIM", 5);
    profiler.createGroup("SWIM", "SWIM");

    profiler.showReport();

}

void sink_demo() {
    int vect[10001];

    for (int i = 0; i < 5; i++) {
        for (int j = 100; j <= 10000; j = j + 100) {
            FillRandomArray(vect, j + 1, 0, 50000, false, 0);
            makeHeapSK(vect, j);
        }
    }

    profiler.divideValues("SINK", 5);
    profiler.createGroup("SINK", "SINK");

    profiler.showReport();

}

void combinateSinkSwim() {

    int vect[10001];
    int vect1[10001];

    ///AVERAGE
    for (int i = 0; i < 5; i++) {
        for (int j = 100; j <= 10000; j = j + 100) {
            FillRandomArray(vect, j + 1, 0, 50000, false, 0);
            CopyArray(vect1, vect, j);
            makeHeapSW(vect, j);
            makeHeapSK(vect1, j);
        }
    }

    ///WORST
//    for (int i = 0; i < 5; i++) {
//        for (int j = 100; j <= 10000; j = j + 100) {
//            FillRandomArray(vect, j + 1, 0, 50000, false, 2);
//            CopyArray(vect1, vect, j + 1);
//            makeHeapSW(vect, j);
//            makeHeapSK(vect1, j);
//        }
//    }


    profiler.divideValues("SINK", 5);
    profiler.divideValues("SWIM", 5);
    profiler.createGroup("Combinate", "SINK", "SWIM");

    profiler.showReport();

}

void demo_HeapSort() {

    int vect[10001];

    for (int j = 20; j <= 40; j = j + 5) {
        FillRandomArray(vect, j + 1, 1, 100, false, 0);

        HeapSort(vect, j);
        cout << "\n";
    }

    profiler.createGroup("HEAP", "HEAP");

    profiler.showReport();
}


//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////ALGORITM DE SORTARE/////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////




void bubble_sort(int v[], int n) {

    Operation comp_bub = profiler.createOperation("Bubble_COMP", n);
    Operation as_bub = profiler.createOperation("Bubble_As", n);

    int verif_ord = 1;
    int nr_elem_select = 0;
    do {
        nr_elem_select++;
        verif_ord = 1;
        for (int i = 0; i < n - nr_elem_select; i++) {
            comp_bub.count();
            if (v[i] > v[i + 1]) {
                as_bub.count(3);
                swap(v[i], v[i + 1]);
                verif_ord = 0;
            }
        }
    } while (!verif_ord);
}

int eOrdonat(int v[], int n, Operation *comp_bub_rec) {
    for (int i = 0; i < n - 1; i++) {
        comp_bub_rec->count();
        if (v[i] > v[i + 1])
            return 0;
    }

    return 1;
}

void bubleSortRec(int v[], int n, Operation *comp_bub_rec, Operation *as_bub_rec, int elem_select = 0) {

    if (eOrdonat(v, n, comp_bub_rec) == 1)
        return;

    elem_select++;
    for (int i = 0; i < n - elem_select; i++) {
        comp_bub_rec->count();
        if (v[i] > v[i + 1]) {
            as_bub_rec->count(3);
            swap(v[i], v[i + 1]);
        }
    }
    bubleSortRec(v, n, comp_bub_rec, as_bub_rec, elem_select);

}

////////////////////////////
/////////TIME BUBBLE/////////
///////////////////////////

int eOrdonat_TIME(int v[], int n) {
    for (int i = 0; i < n - 1; i++) {
        if (v[i] > v[i + 1])
            return 0;
    }

    return 1;
}

void bubble_sort_TIME(int v[], int n) {

    int verif_ord = 1;
    int nr_elem_select = 0;
    do {
        nr_elem_select++;
        verif_ord = 1;
        for (int i = 0; i < n - nr_elem_select; i++) {
            if (v[i] > v[i + 1]) {
                swap(v[i], v[i + 1]);
                verif_ord = 0;
            }
        }
    } while (!verif_ord);
}

void bubleSortRec_TIME(int v[], int n, int elem_select = 0) {

    if (eOrdonat_TIME(v, n) == 1)
        return;

    elem_select++;
    for (int i = 0; i < n - elem_select; i++) {
        if (v[i] > v[i + 1]) {
            swap(v[i], v[i + 1]);
        }
    }
    bubleSortRec_TIME(v, n, elem_select);

}


void test_bouble_sort_1() {
    ///Best case + worst case tema

    int vect[10000];
    int vect1[10000];


    int timer = 10000;
    ///Average case
    for (int j = 0; j < 5; j++) {
        for (int i = 100; i <= 10000; i = i + 100) {

            Operation comp_bub_rec = profiler.createOperation("Bubble_COMP_REC", i);
            Operation as_bub_rec = profiler.createOperation("Bubble_As_REC", i);

            FillRandomArray(vect, i + 1, 0, 5000, false, 0);
            CopyArray(vect1, vect, i + 1);
            bubble_sort(vect, i);
            bubleSortRec(vect1, i, &comp_bub_rec, &as_bub_rec);
        }
    }
    for (int j = 0; j < 5; j++) {
        for (int i = 0; i <= timer; i = i + 100) {

            FillRandomArray(vect, i + 1, 0, 5000, false, 0);

            CopyArray(vect1, vect, i + 1);

            profiler.startTimer("bubble_sort_iterativ", i);
            bubble_sort_TIME(vect, i);
            profiler.stopTimer("bubble_sort_iterativ", i);

            profiler.startTimer("bubble_sort_recursiv", i);
            bubleSortRec_TIME(vect1, i);
            profiler.stopTimer("bubble_sort_recursiv", i);

        }
    }
    ////stop average case

    ///BEST
//    for (int j = 0; j < 5; j++) {
//        for (int i = 100; i <= 10000; i = i + 100) {
//            FillRandomArray(vect, i + 1, 0, 5000, false, 1);
//
//            Operation comp_bub_rec = profiler.createOperation("Bubble_COMP_REC", i);
//            Operation as_bub_rec = profiler.createOperation("Bubble_As_REC", i);
//
//            CopyArray(vect1, vect, i + 1);
//            bubble_sort(vect, i);
//            bubleSortRec(vect1, i, &comp_bub_rec, &as_bub_rec);
//        }
//    }
//    for (int j = 0; j < 5; j++) {
//        for (int i = 0; i <= timer; i = i + 100) {
//
//            FillRandomArray(vect, i + 1, 0, 5000, false, 1);
//            CopyArray(vect1, vect, i + 1);
//
//            profiler.startTimer("bubble_sort_iterativ", i);
//            bubble_sort_TIME(vect, i);
//            profiler.stopTimer("bubble_sort_iterativ", i);
//
//            profiler.startTimer("bubble_sort_recursiv", i);
//            bubleSortRec_TIME(vect1, i);
//            profiler.stopTimer("bubble_sort_recursiv", i);
//
//        }
//    }
    ///end best case

    ///WORST
//    for (int j = 0; j < 5; j++) {
//        for (int i = 100; i <= 10000; i = i + 100) {
//            FillRandomArray(vect, i + 1, 0, 5000, false, 2);
//
//            Operation comp_bub_rec = profiler.createOperation("Bubble_COMP_REC", i);
//            Operation as_bub_rec = profiler.createOperation("Bubble_As_REC", i);
//
//            CopyArray(vect1, vect, i + 1);
//            bubble_sort(vect, i);
//            bubleSortRec(vect1, i, &comp_bub_rec, &as_bub_rec);
//        }
//    }
//    for (int j = 0; j < 5; j++) {
//        for (int i = 0; i <= timer; i = i + 100) {
//
//            FillRandomArray(vect, i + 1, 0, 5000, false, 2);
//            CopyArray(vect1, vect, i + 1);
//
//            profiler.startTimer("bubble_sort_iterativ", i);
//            bubble_sort_TIME(vect, i);
//            profiler.stopTimer("bubble_sort_iterativ", i);
//
//            profiler.startTimer("bubble_sort_recursiv", i);
//            bubleSortRec_TIME(vect1, i);
//            profiler.stopTimer("bubble_sort_recursiv", i);
//
//        }
//    }
    ///end worst case




    profiler.divideValues("Bubble_COMP", 5);
    profiler.divideValues("Bubble_As", 5);

    profiler.divideValues("Bubble_COMP_REC", 5);
    profiler.divideValues("Bubble_As_REC", 5);

    profiler.addSeries("BubbleSort", "Bubble_COMP", "Bubble_As");
    profiler.addSeries("BubbleSort_REC", "Bubble_COMP_REC", "Bubble_As_REC");


    profiler.createGroup("BubbleSort", "BubbleSort");
    profiler.createGroup("BubbleSort_REC", "BubbleSort_REC");
    profiler.createGroup("Combinate", "BubbleSort", "BubbleSort_REC");

    profiler.showReport();
}

int main() {

    //swim_demonstrare_nr_mici();
    //sink_demonstrare_nr_mici();

    //swim_demo();
    //sink_demo();
    //combinateSinkSwim();
    //demo_HeapSort();


    /////////algoritmi de sortare
    ///verificare corectitudine
//    int v[100];
//    FillRandomArray(v, 30, 10, 150, false, 0);
//    bubleSortRec(v, 30);
//    print_sir(v, 30);

    test_bouble_sort_1();


    return 0;
}
