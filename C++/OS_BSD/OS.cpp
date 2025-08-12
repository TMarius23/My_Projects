/**
* @author Trif Marius 
*
* Specificatia continutului temei: OS_BUILD, OS_SELECT, OS_DELETE
 *
 * Inserarea numerelor intr-n vector se face cu ajutorul profilerului. Toate numerele trebuie sa fie in ordine
 * crescatoare, nu neaparat consecutive. Modul de lucru este prin construirea unei structuri putin modificata
 * fata de cea normala, aceasta avand si campul size. Deoarece prin aceste functii augumnentam operatiile,
 * iar noi facem fiecare operatie pe indecsi.
 *
 * OS_BUILD: O(N)
 * Aceasta operatie construieste un arbore perfect echilibrat, astfel initial ne este asigurat faptul ca
 * o sa avem o cautare un delete si o inserare in timp logaritmic O(lgN). Dar aceasta constructie a arborelui
 * se face in timp liniar O(n), deoarece chiar daca aavem un PBT, noi trebuie sa parcurgem fiecare nod din arbore,
 * dar noi il porcuregem prin aflarea medianei si selectarea sa ca nod principal pentru urmatoarele ramuri/subramuri
 * astfel noi trebuie sa parcurgem toate elementele. Si nefiind un for + apel functie insert ci mai degraba un
 * simplu insert in functie de capetele din stanga si dreapta.
 *
 * OS_SELECT: O(lgN)
 * Aceasta operatie cauta un element dorit dupa un index, adica la ce index in vector s-ar afla acel element, dar
 * acest index este transpus intr-un arbore de la cel mai mic la cel mai mare element. Aceasta cautare se face in
 * timp logaritmic O(lgN), deoarece verifica element-ul curent si merege stanga sau dreapta pana gaseste elementul
 * dorit. Din aceasta cauza se fac mult mai multe operatii de comparare la delete. Cele de atribuire fiind 0 de fiecare
 * data. Totodata aceste comparari in comparatie cu build-ul au o complexitate mult mai mare, adica necesita mult mai
 * mult timp pentru a face fiecare operatie in parte.
 *
 * OS_DELETE: O(lgN)
 * Aceasta operatie din cauza faptului ca nodul nu are legatura parinte in structura sa, el trebuie sa gaseasca un pedecesor
 * sau un succesor al nodului curent pentru a fi ster, dar totodata si sa scada size-ul cu unul incepand de la nodul curent
 * in sus pana la radacina pentru fiecare nod in parte cu 1. Dar pentru a modifica structura arborelui noi trebuie sa stim
 * explicit cine este parintele acelui nod pentru a putea face conexiunile mai apoi dupa ce stergem nodul dorit.
 * Sunt prezentate 3 cazuri de stergere a unui nod:
 * 1) Nodul este frunza => se sterge direct
 * 2) Nodul are un copil => se leaga parintele(nodului sters) in functie din ce parte vine, cu copilul al nodului sters
 * 3) Nodul are 2 copii => se cauta succesorul si se face swap intre valorile nodurilor, iar mai apoi se sterge nodul dorit
 * Aceasta operatie se face in O(lgN)
 *
 *
*/


#include <iostream>
#include <Math.h>
#include <time.h>
#include <cstring>
#include "Profiler.h"

using namespace std;

///elemente sortate crescator, si sortate

///luam mediana si daca e sortat si daca nu.
///daca e sir sortat atunci luam mijlocul sirului
///scadem numarrl de operatii asa

///(left + right) / 2
/// devine root
///apelam acelasi algoritm si pe stanga si pe dreapta
///me folosim de divide et impera


///trebuie sa verificam daca copilul stang exista sau nu pt a nu primi eraorarea nullPointerExceptions
///al catelea element este din arbore
///in structura fara nod parent

Profiler profiler;

typedef struct _bst {
    int key;
    int size;
    _bst *left, *right;
} BST;

BST *create_node(int key, int size) {
    ///daca fac BST* nod = new BST
    ///trebuie sa scriu delete si dupa nodul nostru

    BST *my_node = (BST *) malloc(sizeof(BST));
    if (my_node == NULL)
        return NULL;

    my_node->key = key;
    my_node->size = size;
    my_node->left = NULL;
    my_node->right = NULL;

    return my_node;
}

void pretty_print(BST *root, int tabs) {

    if (root == NULL) {
        return;
    }

    for (int i = 0; i < tabs; i++) {
        cout << "   ";
    }

    cout << root->key << " sz: " << root->size << endl;
//    cout << root->key << endl;

    pretty_print(root->left, tabs + 1);
    pretty_print(root->right, tabs + 1);
}

/////////////////////////////
/////////////////////////////
/////////////////////////////

BST *BUILD_TREE(int a[], int left, int right) {
    if (left > right)
        return NULL;

    int m = (left + right) / 2;

    BST *node = create_node(a[m], right - left + 1);
    ///right - left + 1 <- pt ca atatea elemente am in submultimea delimitata de {left, right}

    node->left = BUILD_TREE(a, left, m - 1);
    node->right = BUILD_TREE(a, m + 1, right);

    return node;
}

BST *OS_SELECT(BST *root, int index_srch) {

    if (root == NULL)
        return NULL;

    if (root->left != NULL) {
        if (root->left->size + 1 == index_srch)
            return root;
    } else {
        if (index_srch == 1)
            return root;
    }

    if (root->left != NULL && root->left->size + 1 >= index_srch) {
        return OS_SELECT(root->left, index_srch);
    }
    if (root->left == NULL)
        return OS_SELECT(root->right, index_srch - 1);
    else
        return OS_SELECT(root->right, index_srch - root->left->size - 1);
}

void OS_DELETE(BST **root, int key) {

    if (root == NULL || *root == NULL)
        return;

    BST *node = *root;

    if (key < node->key) {
        node->size = node->size - 1;
        OS_DELETE(&(node->left), key);
    } else {
        if (key > node->key) {
            node->size = node->size - 1;
            OS_DELETE(&(node->right), key);
        } else {
            ///cazul 1
            ///NOD FRUNZA

            if (node->left == NULL && node->right == NULL) {
                *root = NULL;
                free(node);
                return;
            }
            ///cazul 2 A
            ///NOD ARE COPIL DREPT

            if (node->left == NULL) {
                *root = node->right;
                free(node);
                return;
            }
            ///cazul 2 B
            ///NOD ARE COPIL STANG

            if (node->right == NULL) {
                *root = node->left;
                free(node);
                return;
            }

            ///cazul 3
            ///NOD ARE 2 COPIL
            ///facem cu ajutorul succesorului, notatiile sunt inversate

            BST *pred = node->right;
            BST *pred_parent = node;

            while (pred->left != NULL) {
                pred->size = pred->size - 1;
                pred_parent = pred;
                pred = pred->left;
            }

            node->key = pred->key;

            if (pred == pred_parent->right) {
                pred_parent->right = pred->right;
                ///sau
                ///(*root)->right = succ->right;
            } else {
                if (pred == pred_parent->left) {
                    pred_parent->left = pred->right;
                }
            }
            free(pred);
        }
    }
}

/////////////////////////////
/////////////////////////////
/////////////////////////////

BST *BUILD_TREE_op(int a[], int left, int right, Operation *atr, Operation *cmp) {
    if (left > right)
        return NULL;

    int m = (left + right) / 2;

    if (atr != NULL)
        atr->count();
    BST *node = create_node(a[m], right - left + 1);
    ///right - left + 1 <- pt ca atatea elemente am in submultimea delimitata de {left, right}

    if (atr != NULL)
        atr->count();
    node->left = BUILD_TREE_op(a, left, m - 1, atr, cmp);
    if (atr != NULL)
        atr->count();
    node->right = BUILD_TREE_op(a, m + 1, right, atr, cmp);

    return node;
}

BST *OS_SELECT_op(BST *root, int index_srch, Operation *atr, Operation *cmp) {
    cmp->count();
    if (root == NULL)
        return NULL;

    cmp->count();
    if (root->left != NULL) {
        cmp->count();
        if (root->left->size + 1 == index_srch)
            return root;
    } else {
        if (index_srch == 1)
            return root;
    }

    cmp->count(2);
    if (root->left != NULL && root->left->size + 1 >= index_srch) {
        return OS_SELECT(root->left, index_srch);
    }
    cmp->count();
    if (root->left == NULL)
        return OS_SELECT(root->right, index_srch - 1);
    else
        return OS_SELECT(root->right, index_srch - root->left->size - 1);
}

void OS_DELETE_op(BST **root, int key, Operation *atr, Operation *cmp) {

    if (cmp)
        cmp->count(2);
    if (root == NULL || *root == NULL)
        return;

    if (atr)
        atr->count();
    BST *node = *root;

    if (cmp)
        cmp->count();
    if (key < node->key) {
        if (atr)
            atr->count();
        node->size = node->size - 1;
        OS_DELETE_op(&(node->left), key, atr, cmp);
    } else {
        if (cmp)
            cmp->count();
        if (key > node->key) {
            if (atr)
                atr->count();
            node->size = node->size - 1;
            OS_DELETE_op(&(node->right), key, atr, cmp);
        } else {
            ///cazul 1
            ///NOD FRUNZA
            if (cmp)
                cmp->count();
            if (node->left == NULL) {
                if (cmp)
                    cmp->count();
                if (node->right == NULL) {
                    if (atr)
                        atr->count();
                    *root = NULL;
                    free(node);
                    return;
                }
            }
            ///cazul 2 A
            ///NOD ARE COPIL DREPT

            if (cmp)
                cmp->count();
            if (node->left == NULL) {
                if (atr)
                    atr->count();
                *root = node->right;
                free(node);
                return;
            }
            ///cazul 2 B
            ///NOD ARE COPIL STANG

            if (cmp)
                cmp->count();
            if (node->right == NULL) {
                if (atr)
                    atr->count();
                *root = node->left;
                free(node);
                return;
            }

            ///cazul 3
            ///NOD ARE 2 COPIL

            if (atr)
                atr->count(2);
            BST *pred = node->right;
            BST *pred_parent = node;

            if (cmp)
                cmp->count();
            while (pred->left != NULL) {
                if (atr)
                    atr->count(3);
                pred->size = pred->size - 1;
                pred_parent = pred;
                pred = pred->left;
            }

            if (atr)
                atr->count();
            node->key = pred->key;

            if (cmp)
                cmp->count();
            if (pred == pred_parent->right) {
                if (atr)
                    atr->count();
                pred_parent->right = pred->right;
                ///sau
                ///(*root)->right = succ->right;
            } else {
                if (cmp)
                    cmp->count();
                if (pred == pred_parent->left) {
                    if (atr)
                        atr->count();
                    pred_parent->left = pred->right;
                }
            }
            free(pred);
        }
    }
}

void demo_BUILD_TREE() {

    int v[] = {3, 4, 7, 9, 10, 11, 13, 15, 20, 23, 24};
    int n = sizeof(v) / sizeof(v[0]);

    BST *root = BUILD_TREE(v, 0, n - 1);
    pretty_print(root, 0);

}

void demo_OS_SELECT() {

    int v[] = {3, 4, 7, 9, 10, 11, 13, 15, 20, 23, 24};
    int n = sizeof(v) / sizeof(v[0]);

    BST *root = BUILD_TREE(v, 0, n - 1);
    pretty_print(root, 0);

    srand(time(NULL));
    int nr = rand() % (n - 1) + 1;
    cout << nr << " ";
    BST *cautat = OS_SELECT(root, nr);
    cout << cautat->key << endl;

    int nr1 = rand() % (n - 1) + 1;
    while (nr1 == nr) {
        nr1 = rand() % (n - 1) + 1;
    }
    cout << nr1 << " ";
    cautat = OS_SELECT(root, nr1);
    cout << cautat->key << endl;

    int nr2 = rand() % (n - 1) + 1;
    while (nr2 == nr || nr2 == nr1) {
        nr2 = rand() % (n - 1) + 1;
    }
    cout << nr2 << " ";
    cautat = OS_SELECT(root, nr2);
    cout << cautat->key << endl;

}

void demo_OS_DELETE() {

    int v[] = {3, 4, 7, 9, 10, 11, 13, 15, 20, 23, 24};
    int n = sizeof(v) / sizeof(v[0]);

    BST *root = BUILD_TREE(v, 0, n - 1);
    pretty_print(root, 0);

    srand(time(NULL));
    int nr = rand() % (n - 1) + 1;
    BST *cautat = OS_SELECT(root, nr);
    cout << "Cheia cu valoarea: " << cautat->key << endl;
    OS_DELETE(&root, cautat->key);
    pretty_print(root, 0);
    cout << endl;
    cout << endl;


    int nr1 = rand() % (n - 1) + 1;
    while (nr1 == nr) {
        nr1 = rand() % (n - 1) + 1;
    }
    cautat = OS_SELECT(root, nr1);
    cout << "Cheia cu valoarea: " << cautat->key << endl;
    OS_DELETE(&root, cautat->key);
    pretty_print(root, 0);
    cout << endl;
    cout << endl;

    int nr2 = rand() % (n - 1) + 1;
    while (nr2 == nr || nr2 == nr1) {
        nr2 = rand() % (n - 1) + 1;
    }
    cautat = OS_SELECT(root, nr2);
    cout << "Cheia cu valoarea: " << cautat->key << endl;
    OS_DELETE(&root, cautat->key);
    pretty_print(root, 0);
    cout << endl;
    cout << endl;

}

void demo_teste() {

    int vect[10000];

    for (int i = 0; i < 5; i++) {
        for (int j = 100; j <= 10000; j = j + 100) {

            Operation atr_B = profiler.createOperation("Atribuiri_B", j);
            Operation comp_B = profiler.createOperation("Comparari_B", j);
            Operation atr_S = profiler.createOperation("Atribuiri_S", j);
            Operation comp_S = profiler.createOperation("Comparari_S", j);
            Operation atr_D = profiler.createOperation("Atribuiri_D", j);
            Operation comp_D = profiler.createOperation("Comparari_D", j);

            memset(vect, 0, j + 1);
            FillRandomArray(vect, j + 1, 1, 20000, true, 1);

            BST *root = BUILD_TREE_op(vect, 0, j - 1, &atr_B, &comp_B);

            int n = j;
            while (n > 1) {
                int nr_cautat = rand() % (n - 1) + 1;

                BST *nod = OS_SELECT_op(root, nr_cautat, &atr_S, &comp_S);
                if (nod != NULL) {
                    OS_DELETE_op(&root, nod->key, &atr_D, &comp_D);
                    n--;
                }
            }
        }
    }

    profiler.divideValues("Atribuiri_B", 5);
    profiler.divideValues("Comparari_B", 5);
    profiler.divideValues("Atribuiri_S", 5);
    profiler.divideValues("Comparari_S", 5);
    profiler.divideValues("Atribuiri_D", 5);
    profiler.divideValues("Comparari_D", 5);

    profiler.addSeries("Insumate_B", "Atribuiri_B", "Comparari_B");
    profiler.addSeries("Insumate_S", "Atribuiri_S", "Comparari_S");
    profiler.addSeries("Insumate_D", "Atribuiri_D", "Comparari_D");

    profiler.createGroup("Atribuiri", "Atribuiri_B", "Atribuiri_S", "Atribuiri_D");
    profiler.createGroup("Comparari", "Comparari_B", "Comparari_S", "Comparari_D");

    profiler.createGroup("Grupate", "Insumate_B", "Insumate_S", "Insumate_D");
    profiler.createGroup("SELECT+BUILD", "Insumate_B", "Insumate_S");

    profiler.showReport();
}

int main() {

    demo_BUILD_TREE();
    demo_OS_SELECT();
    demo_OS_DELETE();
    demo_teste();


    return 0;
}
