/**
* @author Trif Marius
* Specificatia continutului temei: Heapsort, Quicksort, Hibridizare quicksort utilizând insertion sort iterativ, QuickSelect/Randomized Select:
 *
 * HeapSort: O(NlgN)
 * Este un algoritm de extragere a minimului/ maximului din varful arborelui
 * Acesta este extras prin swap-ul dintre radacina si ultima frunza din vector. Dupa acest proces
 * se aplica heapify pe graf sau se poate aplica SINK deoarece acesta impinge radacina la pozitia unde
 * trebuie sa fie in graf/ vector
 * HEAPSIZE-- dupa extragerea valorii maxime/minime
 *
 * Quicksort:
///QuickSort - aduce pivotul la locul lui in sir, la fiecare partitie.
///Iar mai apoi facem acelasi lucru pe copii lui, in stanga sunt numerele mai mici sau egale decat el, neordonate, iar in dreapta
///numerele mai mari decat el tot neordonate
///pivotul e un index


///pivotul il alegem ca fiind elementul din dreapta
///facem swap pt ca sa ducem pivotul mereu pe ultimul element


///Compar cu pivot-ul, fac swap intr A[i] si A[j]
///vreau sa duc elemenetele cat mai mari cat mai in dreapta
///compar a[i] cu a[pivot] si cresc j si fac swap cu a[i] si a[j]

///sa alegem pivotul random pe average case este un best case
///deci sirul daca e random, atunci putem sa alegem elementul din dreapta ca o sa ajungem in O(lgN) la construirea arborelui
///iar in final la O(NlgN);


 *
 *           Time Complexity  Space Complexity
 * Best Case	O(NlgN)  	    O(lgN)
 * Average Case	O(NlgN)     	O(lgN)
 * Worst Case	O(N^2)      	O(N)
 *
 *
 *
 * Hibridizare quicksort utilizând insertion sort iterativ:
 *
 * QuickSort hibrdizat face referire la un anumit prag limita, care daca ne aflam sub acesta apelam m=functia iterativa insertionsort
 * pt a putea avea o eficacitate mult mai buna. Iar in restul cazurilor, algoritmul decurge normal
 *
 * Comparand cele 2 moduri ale QuickSort se poate observa pe baza graficului cel Hibrid este mult mai rapid decat cel clasic
 * totodata avand un timp mai rezonabil de executie a programului.
 * Pe baza graficului se poate observa ca atat numarul de asignari cat si numarul de comparari este mai redus la QuickSort Hibrid
 * decat la cel clasic.
 *
 * Average: O(NlogN)
 * Worst: O(N)^2
 * Spatiu O(NlgN)
 *
 *
 * QuickSort vs QuickSort Hibridizat:
 * Pe baza mai multor cazuri si mai multor rulari, reiese din grafic, ca cel mai bun prag de a
 * implementa InsertionSort este sa fie un numar cuprins intre [30 34]
 * Astfel daca este curprins in acest interval maximizam puterea de procesare a algoritmului Hibridizat rezultand
 * o mai mare rapiditate.
 *
 *
 * QuickSelect - Randomized-Selec:
 * Best/Average : O(N)
 * Worst: O(N^2)
 * Space Complexity : O(1)
 *
 * Acest algoritm ajuta de cele mai multe ori pe cazul defavorabil, pt ca reduce sansele de a ajunge acolo, ele devenind minime.
 * Astfel algoritmul ajuta sa se ajunga in best si average case de cele mai multe ori.
 *
 *
 *
 *
////////////////////////////////////
///////////////////////////////////
///////////////////////////////////

///de ce nu e ok sa fie == intre left si right?
///gen if(left == right)
///pct in plus

///Nu este ok sa fie egal atat pentru ca in sirul nostru nu avem doar un singur element,
///dar si pentru ca am suplimenta numarul de apeluri recurive care duce la un grad mult
/// mai mare de efort pe care algoritmul trebuie sa il depuna pentru a returna o valoare,




///pivotul sa fie in dreapta si sa fie best case
///pct in plus

///Pentru a avea un best case alegem strategia de programare : Mediana din Trei
///Astfel avand functia medianOfThree alege pivotul ca fiind mediana dintre primul, mijlocul si ultimul element din sir
///si returneaza cel mai mare numar, pentru a putea avea in caz mediu statistic un pivot care este echilibrat
///Iar mai apoi efectuam in mod clasic quicksort, mutand pivotul gasit de functia de mai sus, in dreapta, continuan
///operatiile facute de functia partition si de quicksort

////////////////////////////////////
///////////////////////////////////
///////////////////////////////////
 *
 *
*/

#include <iostream>
#include "Profiler.h"

using namespace std;

Profiler profiler;

///elementul median ar fi ok sa il luam <-> O(lgN)
///daca luam elementul din dreapta, avem O(n^2)

///     i
///|  --------->
///^5 1 2 3 4 3


int Partition(int A[], int left, int right, int pivot, Operation *quick_select_cmp, Operation *quick_select_as) {

    quick_select_as->count(3);
    swap(A[right], A[pivot]);
    ///A[right] este valoarea de la pivotul nostru
    ///oriunde ne-am alege pivotul in sir noi il mutam la final, in partea dreapta

    int j = left - 1;
    for (int i = left; i <= right; i++) {
        quick_select_cmp->count();
        if (A[i] <= A[right]) {
            ///numar de cate ori il vad pe A[i] <= A[right] deci cate elemente am mai mici in sir decat el
            j++;
            quick_select_as->count(3);
            swap(A[i], A[j]);
        }
    }
    return j;
}

////////////////////////////////////
///////////////////////////////////
///////////////////////////////////

///de ce nu e ok sa fie == intre left si right?
///gen if(left == right)
///pct in plus

///Nu este ok sa fie egal atat pentru ca in sirul nostru nu avem doar un singur element,
///dar si pentru ca am suplimenta numarul de apeluri recurive care duce la un grad mult
/// mai mare de efort pe care algoritmul trebuie sa il depuna pentru a returna o valoare,




///pivotul sa fie in dreapta si sa fie best case
///pct in plus

///Pentru a avea un best case alegem strategia de programare : Mediana din Trei
///Astfel avand functia medianOfThree alege pivotul ca fiind mediana dintre primul, mijlocul si ultimul element din sir
///si returneaza cel mai mare numar, pentru a putea avea in caz mediu statistic un pivot care este echilibrat
///Iar mai apoi efectuam in mod clasic quicksort, mutand pivotul gasit de functia de mai sus, in dreapta, continuan
///operatiile facute de functia partition si de quicksort

////////////////////////////////////
///////////////////////////////////
///////////////////////////////////


///sa alegem pivotul random
///pe average case este un best case
///deci sirul daca e random, atunci putem sa alegem elementul din dreapta ca o sa ajungem in O(lgN) la construirea arborelui
///iar in final la O(NlgN);

void QuickSort(int A[], int left, int right, Operation *QuickSort_cmp, Operation *QuickSort_as) {

    QuickSort_cmp->count();
    if (left >= right)
        return;
    ///partition pune pivotul la locul lui potrivit in sir
    ///iar in stanga lui se afla emenentele mai mici decat el, iar in dreapta elemenetele
    ///mari mari decar el
    int k = Partition(A, left, right, right, QuickSort_cmp, QuickSort_as);

    QuickSort(A, left, k - 1, QuickSort_cmp, QuickSort_as);
    QuickSort(A, k + 1, right, QuickSort_cmp, QuickSort_as);
}


void sink_HeapSort(int A[], int n, int index, Operation *heap_cmp, Operation *heap_as) {

    while (2 * index <= n) {
        int child1_ind = 2 * index;

        heap_cmp->count();
        if (child1_ind + 1 < n && A[child1_ind + 1] < A[child1_ind])
            child1_ind++;

        heap_cmp->count();
        if (A[index] > A[child1_ind]) {
            heap_as->count(3);
            swap(A[index], A[child1_ind]);
            index = child1_ind;
        } else {
            break;
        }
    }
}

void makeHeapSK_HeapSort(int A[], int n, Operation *heap_cmp, Operation *heap_as) {

    for (int i = n / 2; i >= 0; i--) {
        sink_HeapSort(A, n, i, heap_cmp, heap_as);
    }
}

void HeapSort(int A[], int n, Operation *heap_cmp, Operation *heap_as) {

    ///putem sa ne punem elementele intr-un alt sir

//    int v[n + 1];
//    FillRandomArray(v, n + 1, 0, 0, false, 0);

    makeHeapSK_HeapSort(A, n, heap_cmp, heap_as);

    while (n > 1) {
        //cout << A[1] << " ";

        heap_as->count(3);
        swap(A[1], A[n]);
        n--;

        sink_HeapSort(A, n, 1, heap_cmp, heap_as);
    }
    //cout << A[1] << " ";
}

////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////

int Partition_QS(int A[], int left, int right) {
    int j = left - 1;
    for (int i = left; i <= right; i++) {
        if (A[i] <= A[right]) {
            j++;
            swap(A[i], A[j]);
        }
    }
    return j;
}


int randomizedPartition(int A[], int left, int right) {
    int k = rand() % (right - left) + left;
    cout << "K = " << k << endl;
    swap(A[right], A[k]);
    return Partition_QS(A, left, right);
}

void QuickSelect(int A[], int left, int right) {
    if (left < right) {
        srand(time(NULL));
        int q = randomizedPartition(A, left, right);

        QuickSelect(A, left, q - 1);
        QuickSelect(A, q + 1, right);
    }
}

////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////

void afi_str(int A[], int n) {
    for (int i = 0; i < n; i++)
        cout << A[i] << " ";
    cout << endl;
}

void insertionSort_op(int v[], int left, int right, Operation *QuickSortHibrid_cmp, Operation *QuickSortHibrid_as) {

    for (int i = left; i <= right; i++) {
        int j = i;
        QuickSortHibrid_as->count();
        int aux = v[i];

        QuickSortHibrid_cmp->count();
        while (aux < v[j - 1] && j > 0) {
            QuickSortHibrid_cmp->count();

            QuickSortHibrid_as->count();
            v[j] = v[j - 1];
            j--;
        }
        QuickSortHibrid_as->count();
        v[j] = aux;
    }
}

int Tn = 15;
int PartitionHibrid_op(int A[], int left, int right, int pivot, Operation *QuickSortHibrid_cmp,
                       Operation *QuickSortHibrid_as) {

    QuickSortHibrid_as->count(3);
    swap(A[right], A[pivot]);

    int j = left - 1;
    for (int i = left; i <= right; i++) {
        QuickSortHibrid_cmp->count();
        if (A[i] <= A[right]) {
            j++;
            QuickSortHibrid_as->count(3);
            swap(A[i], A[j]);
        }
    }
    return j;
}

int Tn1 = 30;
void QuickSortHibrid_op(int A[], int left, int right, Operation *QuickSortHibrid_cmp, Operation *QuickSortHibrid_as) {

    if (right <= left)
        return;

    if (right - left <= Tn1) {
        insertionSort_op(A, left, right, QuickSortHibrid_cmp, QuickSortHibrid_as);
        return;
    } else {

        int k = PartitionHibrid_op(A, left, right, right, QuickSortHibrid_cmp, QuickSortHibrid_as);

        QuickSortHibrid_op(A, left, k - 1, QuickSortHibrid_cmp, QuickSortHibrid_as);
        QuickSortHibrid_op(A, k + 1, right, QuickSortHibrid_cmp, QuickSortHibrid_as);
    }
}


void insertionSort(int v[], int left, int right) {

    for (int i = left; i <= right; i++) {
        int j = i;
        int aux = v[i];

        while (aux < v[j - 1] && j > 0) {
            v[j] = v[j - 1];
            j--;
        }
        v[j] = aux;
    }
}

int PartitionHibrid(int A[], int left, int right, int pivot) {

    swap(A[right], A[pivot]);

    int j = left - 1;
    for (int i = left; i <= right; i++) {
        if (A[i] <= A[right]) {
            j++;
            swap(A[i], A[j]);
        }
    }
    return j;
}

void QuickSortHibrid(int A[], int left, int right) {

    if (right <= left)
        return;

    if (right - left <= Tn) {
        insertionSort(A, left, right);
        return;
    } else {

        int k = PartitionHibrid(A, left, right, right);

        QuickSortHibrid(A, left, k - 1);
        QuickSortHibrid(A, k + 1, right);
    }
}

int Partition_calsic(int A[], int left, int right, int pivot) {

    swap(A[right], A[pivot]);
    int j = left - 1;
    for (int i = left; i <= right; i++) {
        if (A[i] <= A[right]) {
            j++;
            swap(A[i], A[j]);
        }
    }
    return j;
}


void QuickSort_clasic(int A[], int left, int right) {

    if (right <= left)
        return;
    int k = Partition_calsic(A, left, right, right);
    QuickSort_clasic(A, left, k - 1);
    QuickSort_clasic(A, k + 1, right);
}

void demo_QuickSort_nr_mici() {

    int A[] = {2, 8, 7, 5, 9, 3, 4, 87, 14, 23, 35, 55, 72, 66};
    int n = sizeof(A) / sizeof(A[0]);
    QuickSort_clasic(A, 0, n - 1);
    afi_str(A, n);
}

void array_generaterandom(int *v, int n) {

    if (n == 3) {
        swap(v[0], v[2]);
    }
    if (n < 3)
        return;

    array_generaterandom(v, n / 2);
    for (int i = 0; i < n; i++) {
        swap(v[i], v[n - i - 1]);
    }
    ///array_generaterandom(v, n / 2);
}
///1 2 3 4 5 6
///1 2 3
///3 2 1 4 5 6
///4 5 6 3 2 1
///6 5 4 3 2 1


void demo_QuickSort() {

    int vect[10000];

    ///AVERAGE
//    for (int i = 0; i < 5; i++) {
//        for (int j = 100; j <= 10000; j = j + 150) {
//
//            Operation QuickSort_cmp = profiler.createOperation("QuickSort_cmp", j);
//            Operation QuickSort_as = profiler.createOperation("QuickSort_as", j);
//
//            FillRandomArray(vect, j + 1, 0, 10000, false, 0);
//            ///array_generaterandom(vect, j + 1);
//
//            QuickSort(vect, 0, j, &QuickSort_cmp, &QuickSort_as);
//        }
//    }

    ///BEST
    for (int i = 0; i < 5; i++) {
        for (int j = 100; j <= 10000; j = j + 150) {

            Operation QuickSort_cmp = profiler.createOperation("QuickSort_cmp", j);
            Operation QuickSort_as = profiler.createOperation("QuickSort_as", j);

            FillRandomArray(vect, j + 1, 0, 10000, true, 0);

            QuickSort(vect, 0, j, &QuickSort_cmp, &QuickSort_as);
        }
    }

    ///WORST
//   for (int i = 0; i < 5; i++) {
//        for (int j = 100; j <= 10000; j = j + 150) {
//
//            Operation QuickSort_cmp = profiler.createOperation("QuickSort_cmp", j);
//            Operation QuickSort_as = profiler.createOperation("QuickSort_as", j);
//
//            FillRandomArray(vect, j + 1, 0, 10000, false, 2);
//
//            QuickSort(vect, 0, j, &QuickSort_cmp, &QuickSort_as);
//        }
//    }


    profiler.divideValues("QuickSort_cmp", 5);
    profiler.divideValues("QuickSort_as", 5);
    profiler.addSeries("QuickSort", "QuickSort_cmp", "QuickSort_as");
    ///compararile si atribuirile luate impreuna(adunate)
    profiler.createGroup("QuickSort_cmp_as", "QuickSort_cmp", "QuickSort_as");


    profiler.showReport();
}

int PartitionHibrid_modiftn(int A[], int left, int right, int pivot, Operation *QuickSortP) {

    QuickSortP->count(3);
    swap(A[right], A[pivot]);

    int j = left - 1;
    for (int i = left; i <= right; i++) {
        QuickSortP->count();
        if (A[i] <= A[right]) {
            j++;
            QuickSortP->count(3);
            swap(A[i], A[j]);
        }
    }
    return j;
}

void insertionSort_modiftn(int v[], int left, int right, Operation *QuickSortP) {

    for (int i = left; i <= right; i++) {
        int j = i;
        QuickSortP->count();
        int aux = v[i];

        QuickSortP->count();
        while (aux < v[j - 1] && j > 0) {
            QuickSortP->count();

            QuickSortP->count();
            v[j] = v[j - 1];
            j--;
        }
        QuickSortP->count();
        v[j] = aux;
    }
}


void QuickSortHibrid_modiftn(int A[], int left, int right, int tn, Operation *QuickSortP) {

    if (right <= left)
        return;

    if (right - left <= tn) {
        insertionSort_modiftn(A, left, right, QuickSortP);
        return;
    } else {

        int k = PartitionHibrid_modiftn(A, left, right, right, QuickSortP);

        QuickSortHibrid_modiftn(A, left, k - 1, tn, QuickSortP);
        QuickSortHibrid_modiftn(A, k + 1, right, tn, QuickSortP);
    }
}


int PartitionHibrid_modiftn_timp(int A[], int left, int right, int pivot) {

    swap(A[right], A[pivot]);
    int j = left - 1;
    for (int i = left; i <= right; i++) {
        if (A[i] <= A[right]) {
            j++;
            swap(A[i], A[j]);
        }
    }
    return j;
}

void insertionSort_modiftn_timp(int v[], int left, int right) {

    for (int i = left; i <= right; i++) {
        int j = i;
        int aux = v[i];
        while (aux < v[j - 1] && j > 0) {
            v[j] = v[j - 1];
            j--;
        }
        v[j] = aux;
    }
}


void QuickSortHibrid_modiftn_timp(int A[], int left, int right, int tn) {

    if (right <= left)
        return;

    if (right - left <= tn) {
        insertionSort_modiftn_timp(A, left, right);
        return;
    } else {

        int k = PartitionHibrid_modiftn_timp(A, left, right, right);

        QuickSortHibrid_modiftn_timp(A, left, k - 1, tn);
        QuickSortHibrid_modiftn_timp(A, k + 1, right, tn);
    }
}


void demo_QuickSort_QuickSortHibrid() {
    ///Pe baza mai multor cazuri si mai multor rulari, reiese din grafic, ca cel mai bun prag pe a
    /// implementa InsertionSort este sa fie un numar de numere cuprins intre [30 34]

    int vect[10000];
    int vect1[10000];

    for (int j = 0; j < 1000; j++) {
        for (int i = 5; i < 50; i++) {
            FillRandomArray(vect1, 10001, 0, 10000, false, 0);
            Operation QuickSortP = profiler.createOperation("QuickSortHP", i);

            CopyArray(vect, vect1, 10001);
            QuickSortHibrid_modiftn(vect, 0, 10000 - 1, i, &QuickSortP);

            CopyArray(vect, vect1, 10001);
            profiler.startTimer("QuickSortHibrid", i);
            QuickSortHibrid_modiftn_timp(vect, 0, 10000 - 1, i);
            profiler.stopTimer("QuickSortHibrid", i);
        }
    }

    profiler.divideValues("QuickSortHP", 1000);
    profiler.createGroup("QuickSortHibrid_Prag", "QuickSortHP");

    profiler.showReport();
}

///pb6
void demo_QuickSort_QuickSortHibrid_complet() {

    int vect[10000];
    int vect1[10000];

    for (int i = 0; i < 10; i++) {
        for (int j = 100; j <= 10000; j = j + 150) {

            Operation QuickSort_cmp = profiler.createOperation("QuickSort_cmp", j);
            Operation QuickSort_as = profiler.createOperation("QuickSort_as", j);

            Operation QuickSortHibrid_cmp = profiler.createOperation("QuickSortHibrid_CMP", j);
            Operation QuickSortHibrid_as = profiler.createOperation("QuickSortHibrid_AS", j);

            FillRandomArray(vect1, j + 1, 0, 10000, false, 0);

            CopyArray(vect, vect1, j + 1);
            QuickSort(vect, 0, j, &QuickSort_cmp, &QuickSort_as);
            CopyArray(vect, vect1, j + 1);
            QuickSortHibrid_op(vect1, 0, j, &QuickSortHibrid_cmp, &QuickSortHibrid_as);

            ////////TIME////////
            CopyArray(vect, vect1, j + 1);
            profiler.startTimer("QuickSort", j);
            QuickSort_clasic(vect, 0, j);
            profiler.stopTimer("QuickSort", j);

            CopyArray(vect, vect1, j + 1);
            profiler.startTimer("QuickSortHibrid", j);
            QuickSortHibrid(vect, 0, j);
            profiler.stopTimer("QuickSortHibrid", j);
        }
    }


    profiler.divideValues("QuickSort_cmp", 10);
    profiler.divideValues("QuickSort_as", 10);
    profiler.addSeries("QuickSort", "QuickSort_cmp", "QuickSort_as");
    profiler.createGroup("QuickSort", "QuickSort_cmp", "QuickSort_as");

    profiler.divideValues("QuickSortHibrid_CMP", 10);
    profiler.divideValues("QuickSortHibrid_AS", 10);
    profiler.addSeries("QuickSortHibrid", "QuickSortHibrid_CMP", "QuickSortHibrid_AS");
    profiler.createGroup("QuickSortHibrid", "QuickSortHibrid_CMP", "QuickSortHibrid_AS");

    profiler.createGroup("Combinate_QS_QSH", "QuickSort", "QuickSortHibrid");

    profiler.createGroup("Combinate_toate_as_comb", "QuickSort_cmp", "QuickSort_as",
                         "QuickSortHibrid_CMP", "QuickSortHibrid_AS");

    profiler.showReport();
}

void demo_QuickSort_HeapSort() {

    int vect[10000];
    int vect1[10000];

    for (int i = 0; i < 10; i++) {
        for (int j = 100; j <= 10000; j = j + 150) {

            Operation quick_select_cmp = profiler.createOperation("QuickSort_cmp", j);
            Operation quick_select_as = profiler.createOperation("QuickSort_as", j);

            Operation heap_cmp = profiler.createOperation("HEAP_CMP", j);
            Operation heap_as = profiler.createOperation("HEAP_AS", j);


            FillRandomArray(vect, j + 1, 0, 10000, false, 0);
            CopyArray(vect1, vect, j + 1);

            QuickSort(vect, 0, j, &quick_select_cmp, &quick_select_as);
            HeapSort(vect1, j, &heap_cmp, &heap_as);
        }
    }

    profiler.divideValues("QuickSort_cmp", 10);
    profiler.divideValues("QuickSort_as", 10);
    profiler.addSeries("QuickSort", "QuickSort_cmp", "QuickSort_as");
    profiler.createGroup("QuickSort", "QuickSort_cmp", "QuickSort_as");

    profiler.divideValues("HEAP_CMP", 10);
    profiler.divideValues("HEAP_AS", 10);
    profiler.addSeries("HEAP", "HEAP_CMP", "HEAP_AS");
    profiler.createGroup("HEAP", "HEAP_CMP", "HEAP_AS");

    profiler.createGroup("Combinate", "QuickSort", "HEAP");

    profiler.showReport();
}

void demo_QuickSort_hibrid() {
    int A[] = {2, 8, 7, 5, 9, 3, 4, 87, 14, 23, 35, 55, 72, 66};
    int n = sizeof(A) / sizeof(A[0]);
    QuickSortHibrid(A, 0, n - 1);
    afi_str(A, n);
}

int main() {
    // <- unde sunt ,,//,, se decomenteaza si se apeleaza pe rand
    /// <- unde sunt ,,///,,, acestea sunt doar verificari si testari ale unor programe/ coduri

    /////Tema/////
    ///pb1
    demo_QuickSort_nr_mici();
    ///pb2
    ///pt cazul worst sau best se se comenteaza cazul decomentat in prim plan si se decomenteaza codul aferent
    //demo_QuickSort();
    ///pb3
    //demo_QuickSort_HeapSort();
    ///pb4
    //demo_QuickSort_hibrid();
    ///pb5
    //demo_QuickSort_QuickSortHibrid();
    ///pb6
    //demo_QuickSort_QuickSortHibrid_complet();


    ///////Testare/ verificare pt corectitudine////////////////
    ///cout << rand() % 10;
    ///////////////////////////



    ///pb7
    ///QuickSelect - BONUS
//    int A[] = {2, 8, 7, 5, 9, 3, 4, 87, 14, 23, 35, 55, 72, 66};
//    int n = sizeof(A) / sizeof(A[0]);
//    QuickSelect(A, 0, n - 1);
//    afi_str(A,n);


    return 0;
}
