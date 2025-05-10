/**
* @author Trif Marius
*
* Specificațiile problemei, ex: Comparam metodele de sortare: SelectionSort, BubbleSort, InsertionSort
*
* SelectionSort are un:
 * best case cand sirul este sortat crescator
 * Avand Tcomp = O(n^2) iar Tatrib = 0 => O(1)
* worst case cand sirul este sortat crescator avand un elem max pe prima pozitie
 * Avand Tcomp = O(n^2) iar Tatrib => O(n)
 *
 * InsertionSort are un:
 * best case cand sirul este sortat crescator
 * Avand Tcomp = O(n) iar Tatrib = O(n)
* worst case cand sirul este sortat descrescator
 * * Avand Tcomp = O(n^2) iar Tatrib = O(n^2)
 *
 *BubbleSort are un:
 * best case cand sirul este sortat crescator
 * Avand Tcomp = O(n) iar Tatrib = 0
* worst case cand sirul este sortat descrescator
 * * Avand Tcomp = O(n^2) iar Tatrib = O(n^2)
 *
 *
*/


#include <iostream>
#include <math.h>
#include "Profiler.h"

using namespace std;

Profiler profiler;

void afi_str(int n, int v[]) {
    for (int i = 0; i < n; i++) {
        cout << v[i] << " ";
    }
}

///Nu e stabil
void selection_sort(int n, int vect[]) {

    Operation comp_sel = profiler.createOperation("Select_sort_comp", n);
    Operation as_sel = profiler.createOperation("Select_sort_as", n);
    ///assignments selections

    for (int i = 0; i < n - 1; i++) {
        int aux = i;
        for (int j = i + 1; j < n; j++) {
            comp_sel.count();
            if (vect[aux] > vect[j]) {
                aux = j;
            }
        }
        if (aux != i) {
            as_sel.count(3);
            swap(vect[i], vect[aux]);
        }
    }
}

///pt worst case nr_mar urmat de elementele crescatoare
///pt ca asa face cele mai multe swap - uri

void test_selection_sort() {

    ///Average case
    ///Best + Worst tema

    int vect[10000];
    ///Average case
//    for(int j = 0; j < 5; j++)
//    {
//        for(int i = 100; i <= 10000; i = i + 100)
//        {
//            FillRandomArray(vect, i, -5000, 5000, false, 0);
//            selection_sort(i, vect);
//        }
//    }

    ///BEST
//    for(int j = 0; j < 5; j++) {
//        for(int i = 100; i <= 10000; i = i + 100)
//        {
//            FillRandomArray(vect, i, -5000, 5000, false, 1);
//            selection_sort(i, vect);
//        }
//    }

    ///WORST
//    for(int j = 0; j < 5; j++) {
//        for (int i = 100; i <= 10000; i = i + 100) {
//            FillRandomArray(vect, i, -5000, 5000, false, 2);
//            vect[0] = 5001;
//            selection_sort(i, vect);
//        }
//    }


///grafice pt tot, adunate la un loc



    profiler.divideValues("Select_sort_comp", 5);
    profiler.divideValues("Select_sort_as", 5);

    profiler.addSeries("SelectionSort", "Select_sort_comp", "Select_sort_as");///aduna graficele


    ///////////////////////////
    profiler.showReport();

    /// afi_str(n, vect);
}

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

void test_bouble_sort_1() {
    ///Best case + worst case tema

    int vect[10000];

    ///Average case
//    for (int j = 0; j < 5; j++) {
//        for (int i = 100; i <= 10000; i = i + 100) {
//            FillRandomArray(vect, i, 0, 5000, false, 0);
//            bubble_sort(vect, i);
//        }
//    }

    ///BEST
//    for (int j = 0; j < 5; j++) {
//        for (int i = 100; i <= 10000; i = i + 100) {
//            FillRandomArray(vect, i, 0, 5000, false, 1);
//            bubble_sort(vect, i);
//        }
//    }

    ///WORST
//    for (int j = 0; j < 5; j++) {
//        for (int i = 100; i <= 10000; i = i + 100) {
//            FillRandomArray(vect, i, 0, 5000, false, 2);
//            bubble_sort(vect, i);
//        }
//    }


    profiler.divideValues("Bubble_COMP", 5);
    profiler.divideValues("Bubble_As", 5);

    profiler.addSeries("BubbleSort", "Bubble_COMP", "Bubble_As");

    profiler.showReport();
}

///STABIL
void insertionSort(int v[], int n) {
    Operation comp_ins = profiler.createOperation("InsertrionSort_CMP", n);
    Operation as_ins = profiler.createOperation("InsertrionSort_AS", n);

    for (int i = 0; i < n; i++) {
        int j = i;
        int aux = v[i];
        as_ins.count();

        comp_ins.count();
        while (aux < v[j - 1] && j > 0) {
            comp_ins.count();///e ok pt ca in ultimul rep acesta nu se mai numara
            as_ins.count();
            v[j] = v[j - 1];
            j--;
        }
        as_ins.count();
        v[j] = aux;
    }
}

void test_insert_sort() {
    ///Best case + worst case tema
    int vect[10000];

    ///Average case
//    for (int j = 0; j < 5; j++) {
//        for (int i = 100; i <= 10000; i = i + 100) {
//            FillRandomArray(vect, i, 0, 5000, false, 0);
//            insertionSort(vect, i);
//        }
//    }

    ///BEST
//    for (int j = 0; j < 5; j++) {
//        for (int i = 100; i <= 10000; i = i + 100) {
//            FillRandomArray(vect, i, 0, 5000, false, 1);
//            insertionSort(vect, i);
//        }
//    }

    ///WORST
//    for (int j = 0; j < 5; j++) {
//        for (int i = 100; i <= 10000; i = i + 100) {
//            FillRandomArray(vect, i, 0, 5000, false, 2);
//            insertionSort(vect, i);
//        }
//    }

    profiler.divideValues("InsertrionSort_CMP", 5);
    profiler.divideValues("InsertrionSort_AS", 5);

    profiler.addSeries("Insertrion_Sort", "InsertrionSort_CMP", "InsertrionSort_AS");

    profiler.showReport();
}

void toate_graficele() {
    int vect[10000];
    int vect1[10000];
    int vect2[10000];

    ///AVERAGE
//    for (int j = 0; j < 5; j++) {
//        for (int i = 100; i <= 10000; i = i + 100) {
//            FillRandomArray(vect, i, 0, 5000, false, 0);
//
//            for(int k = 0; k < i; k++)
//            {
//                vect1[k] = vect[k];
//                vect2[k] = vect[k];
//            }
//            insertionSort(vect, i);
//            selection_sort(i, vect1);
//            bubble_sort(vect2, i);
//        }
//    }

    ///BEST
//    for (int j = 0; j < 5; j++) {
//        for (int i = 100; i <= 10000; i = i + 100) {
//            FillRandomArray(vect, i, 0, 5000, false, 1);
//            for(int k = 0; k < i; k++)
//            {
//                vect1[k] = vect[k];
//                vect2[k] = vect[k];
//            }
//            insertionSort(vect1, i);
//            selection_sort(i, vect);
//            bubble_sort(vect2, i);
//        }
//    }

    ///WORST
    for (int j = 0; j < 5; j++) {
        for (int i = 100; i <= 10000; i = i + 100) {
            FillRandomArray(vect, i, 0, 5000, false, 2);

            for(int k = 0; k < i; k++)
            {
                vect2[k] = vect[k];
            }
            insertionSort(vect, i);

            FillRandomArray(vect1, i, 0, 5000, false, 1);
            vect1[0] = 5000;
            selection_sort(i, vect1);

            bubble_sort(vect2, i);
        }
    }

    profiler.divideValues("InsertrionSort_CMP", 5);
    profiler.divideValues("InsertrionSort_AS", 5);
    profiler.addSeries("Insertrion_Sort", "InsertrionSort_CMP", "InsertrionSort_AS");

    profiler.divideValues("Bubble_COMP", 5);
    profiler.divideValues("Bubble_As", 5);
    profiler.addSeries("BubbleSort", "Bubble_COMP", "Bubble_As");

    profiler.divideValues("Select_sort_comp", 5);
    profiler.divideValues("Select_sort_as", 5);
    profiler.addSeries("SelectionSort", "Select_sort_comp", "Select_sort_as");


    profiler.createGroup("InsertrionSort_AS ", "InsertrionSort_AS");
    profiler.createGroup("InsertrionSort_CMP ", "InsertrionSort_CMP");

    profiler.createGroup("Bubble_As ", "Bubble_As");
    profiler.createGroup("Bubble_COMP ", "Bubble_COMP");

    profiler.createGroup("Select_sort_as ", "Select_sort_as");
    profiler.createGroup("Select_sort_comp ", "Select_sort_comp");


    profiler.createGroup("Graf reunit ", "Insertrion_Sort", "BubbleSort", "SelectionSort");
    profiler.createGroup("Graf reunit cmp", "InsertrionSort_CMP", "Bubble_COMP", "Select_sort_comp");
    profiler.createGroup("Graf reunit asign", "InsertrionSort_AS", "Bubble_As", "Select_sort_as");

    profiler.showReport();

}

int binarySrchPoz(int v[], int min, int max, int elem) {
    if (max <= min)
        return ((elem > v[min]) ? (min + 1) : min);

    int mid = (min + max) / 2;

    if (elem == v[mid])
        return (mid + 1);

    if (v[mid] > elem)
        return binarySrchPoz(v, min, mid - 1, elem);
    return binarySrchPoz(v, mid + 1, max, elem);
}

void insertionSort_Binary(int v[], int n) {

    for (int i = 0; i < n; i++) {
        int k = i - 1;
        int aux = v[i];

        int m = binarySrchPoz(v, 0, k, aux);
        for (int j = k; j >= m && m >= 0; j--)
            v[j + 1] = v[j];

        v[m] = aux;
    }
}

int main() {

    ///test_selection_sort();
    ///test_bouble_sort_1();
    ///test_insert_sort();

    ///toate_graficele();

    int v[] = {1, 3, 5, 6, 4, 12, 32, 10};

    insertionSort_Binary(v, 8);

    for (int i = 0; i < 8; i++) {
        cout << v[i] << " ";
    }
    cout << endl;


    return 0;
}
