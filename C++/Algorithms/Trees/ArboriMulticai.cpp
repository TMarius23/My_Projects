/**
* @author Trif Marius 
*
* Specificatia continutului temei: construiri si transformari ai unor arbori multicai in dierite form
 *
 * In prima parte ne este cerut sa construim o parcurgere a unui arbore binar de cautare atat in mod recursiv cat si in
 * mod iterativ, si sa aratam pe baza unui grafic cate afisari sunt facute intr-o metoda dar si in cealalta.
 * Parcurgerea atat recursiva cat si iterativa, are o complexitate de O(n).
 *
 * In a 2 parte avem de facut un arbore care sa fie citit/ construit dintr-un vector de tati, care mai apoi trebuie sa il
 * transformam (cu ajutorul lui T1) intr-un arbore multicai, Aceasta tranzitie se face intr-un timp liniar.
 * Acest nou arbore este stocat in reprezentare arborescenta, si nu prin alte metode, noi putandu-l parcurge ca un arbore
 * normal, putin mai special, el mai putand fi stocat si intr-o lista de adiacenta, sau intr-o memorie continua a calculatorului
 * Dupa, din acest arbore multicai, aplicand T2, tot o transformare care se face in O(n), v-om obtine un arbore care are reprezentare
 * binare. Aceasta reprezentare fiind in felul urmator: fiecare nod din arbore are referine catre parintele lui, copilul stang
 * cat si fratele lui din dreapta.
 *
 * Pe langa acestea am mai folosit un pretty-print pentru a afisa datele.
 *
 * Memoria aditionala a fost folosita in special pentru prima transformare, unde am folosit liste adjuncte predefinite de limbajul de
 * programare ales (C++), care optimizeaza anumite procese de calcul. Am folosit pe baza acestei liste o memorie aditionala de O(n^2) +
 * totodata memoria care imi stocheaza fiecare nod din noul arbore.
 *
 * Pentru cea de a 2 transformare nu s-a folosit memorie aditionala, decat doar aceea pentru a stoca fiecare nod din arbore.
 *
 * Pentru a putea rezolva acesti algorimi am folosit ca principiu utilizarea listelor de adiacenta, unde am stocat intr-o zona
 * de memorie continua datele, care mai apoi le-am prelucrat.
 *
 *
*/


#include <iostream>
#include <list>
#include <string.h>
#include "Profiler.h"

Profiler profiler;

using namespace std;

enum ordine {
    PREORDER, INORDER, POSTORDER
};

typedef struct _node {
    int key;
    _node *parent, *left, *right;
} TREE_NODE;


typedef struct node2_1 {
    int key;
    int nr;
    node2_1 **sons;
} node2;

typedef struct _node3 {
    int key;
    _node3 *left, *right;
} node3;


TREE_NODE *alloc_node(int key) {
    TREE_NODE *my_key = (TREE_NODE *) malloc(sizeof(TREE_NODE));
    if (my_key == NULL)
        return NULL;
    my_key->parent = NULL;
    my_key->right = NULL;
    my_key->left = NULL;
    my_key->key = key;

    return my_key;
}

node3 *alloc_node3(int key) {
    node3 *my_key = (node3 *) malloc(sizeof(node3));
    if (my_key == NULL)
        return NULL;
    my_key->right = NULL;
    my_key->left = NULL;
    my_key->key = key;

    return my_key;
}

void insert_nodeP(TREE_NODE **root, int key, TREE_NODE *nod_P) {
    if (root == NULL)
        return;
    if (*root == NULL) {
        *root = alloc_node(key);
        (*root)->parent = nod_P;
        return;
    }

    if (key < (*root)->key) {
        // (*root)->left = alloc_node(key);
        // (*root)->left->parent = (*root);
        insert_nodeP(&(*root)->left, key, *root);

    } else if (key > (*root)->key) {
        // (*root)->right = alloc_node(key);
        // (*root)->right->parent = (*root);
        insert_nodeP(&(*root)->right, key, *root);
    }
}

void pre(TREE_NODE *root, int order) {
    if (root == NULL)
        return;

    if (order == PREORDER)
        cout << root->key << " ";
    pre(root->left, order);
    if (order == INORDER)
        cout << root->key << " ";
    pre(root->right, order);
    if (order == POSTORDER)
        cout << root->key << " ";
}

void preRec(TREE_NODE *root, int order) {
    if (root == NULL)
        return;

    int d = 1;
    TREE_NODE *nod = root;

    do {
        if (d == 1) {
            if (order == PREORDER)
                cout << nod->key << " ";
            if (nod->left != NULL) {
                nod = nod->left;
            } else {
                d = 2;
            }
        }
        if (d == 2) {
            if (order == INORDER)
                cout << nod->key << " ";
            if (nod->right != NULL) {
                nod = nod->right;
                d = 1;
            } else {
                d = 3;
            }
        }
        if (d == 3) {
            if (order == POSTORDER)
                cout << nod->key << " ";
            if (nod->parent != NULL) {
                if (nod == nod->parent->left) {
                    d = 2;
                }
                nod = nod->parent;
            }
        }
    } while (nod != root || d != 3);
    if (order == POSTORDER)
        cout << nod->key << " ";
}

//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////


void pre_op(TREE_NODE *root, int order, Operation *op_comp_rec) {
    if (root == NULL)
        return;

    if (order == PREORDER) {
        op_comp_rec->count();
        //cout << root->key << " ";
    }
    pre_op(root->left, order, op_comp_rec);
    if (order == INORDER) {
        op_comp_rec->count();
        //cout << root->key << " ";
    }
    pre_op(root->right, order, op_comp_rec);
    if (order == POSTORDER) {
        op_comp_rec->count();
        //cout << root->key << " ";
    }

}


void preRec_op(TREE_NODE *root, int order, Operation *op_comp_it) {
    if (root == NULL)
        return;

    int d = 1;
    TREE_NODE *nod = root;

    do {
        if (d == 1) {
            if (order == PREORDER) {
                op_comp_it->count();
                //cout << nod->key << " ";
            }
            if (nod->left != NULL) {
                nod = nod->left;
            } else {
                d = 2;
            }
        }
        if (d == 2) {
            if (order == INORDER) {
                op_comp_it->count();
                //cout << nod->key << " ";
            }
            if (nod->right != NULL) {
                nod = nod->right;
                d = 1;
            } else {
                d = 3;
            }
        }
        if (d == 3) {
            if (order == POSTORDER) {
                op_comp_it->count();
                //cout << nod->key << " ";
            }
            if (nod->parent != NULL) {
                if (nod == nod->parent->left) {
                    d = 2;
                }
                nod = nod->parent;
            }
        }
    } while (nod != root || d != 3);
}


//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////

void delete_tree(TREE_NODE *root) {
    if (root != NULL) {
        delete_tree(root->left);
        delete_tree(root->right);
        free(root);
    }
}

void pretty_printR(int parent[], int n, int tabs, int index_parent) {
    for (int i = 0; i < tabs; i++) {
        cout << "   ";
    }

    cout << index_parent << endl;

    ///sizeul meu la vector este de la 1, pt ca nu am in vector nici un 0;
    for (int i = 0; i < n; i++) {
        if (parent[i] == index_parent)
            pretty_printR(parent, n, tabs + 1, i);
    }
}

void pretty_printR2(node2 *R2, int tabs) {
    if (R2 == NULL) {
        cout << "NULL" << endl;
        return;
    }
    for (int i = 0; i < tabs; i++) {
        cout << "   ";
    }

    cout << R2->key << endl;

    ///o sa stie automat limbajul de programare ca ii dau un vector si se plimba prin el
    for (int i = 0; i < R2->nr; i++) {
        pretty_printR2(R2->sons[i], tabs + 1);
    }
}

void pretty_printR3(node3 *R3, int tabs) {

    if (R3 == NULL)
        return;

    for (int i = 0; i < tabs; i++) {
        cout << "   ";
    }

    cout << R3->key << endl;

    ///o sa stie automat limbajul de programare ca ii dau un vector si se plimba prin el

    pretty_printR3(R3->left, tabs + 1);
    pretty_printR3(R3->right, tabs);
}

void demo_pb1() {

    TREE_NODE *root = NULL;
    int numere[] = {7, 2, 5, 6, 1, 4, 9, 3, 8};
    int n = sizeof(numere) / sizeof(numere[0]);

    for (int i = 0; i < n; i++) {
        insert_nodeP(&root, numere[i], NULL);
    }
    int order = PREORDER;
    pre(root, order);
    cout << endl;
    preRec(root, order);
    cout << endl;

}

void demo_pb2() {

    int vect[10001];
    for (int i = 100; i <= 10000; i = i + 100) {
        TREE_NODE *root = NULL;

        memset(vect, 0, 10000 * sizeof(int));

        FillRandomArray(vect, i, 100, 20000, true, 0);

        for (int j = 0; j < i; j++) {
            insert_nodeP(&root, vect[j], NULL);
        }

        Operation op_comp_rec = profiler.createOperation("Comparare_rec", i);
        Operation op_comp_it = profiler.createOperation("Comparare_iterativa", i);

        int order = PREORDER;
        pre_op(root, order, &op_comp_rec);
        //cout << endl;
        preRec_op(root, order, &op_comp_it);

        delete_tree(root);
        root = NULL;
    }

//    profiler.addSeries("Imbinate", "Comparare_rec", "Comparare_iterativa");

    profiler.createGroup("Comparare_rec", "Comparare_rec");
    profiler.createGroup("Comparare_iterativa", "Comparare_iterativa");
    profiler.createGroup("Imbinate", "Comparare_rec", "Comparare_iterativa");

    profiler.showReport();
}

void demo_prety_print() {
    int parent[] = {-100, 2, 7, 5, 2, 7, 7, -1, 5, 2};
    int n = sizeof(parent) / sizeof(parent[0]);
    pretty_printR(parent, n, 0, 7);

}

node2 *create2_node(int key) {
    node2 *my_newnode2 = (node2 *) malloc(sizeof(node2));
    my_newnode2->key = key;
    my_newnode2->nr = 0;
    my_newnode2->sons = NULL;

    return my_newnode2;
}

void T1(node2 **R2, vector<vector<int>> &adj_list, int index_i) {
    *R2 = create2_node(index_i);

    int nr = adj_list[index_i].size();

    if (nr == 0) {
        (*R2)->nr = 0;
        (*R2)->sons = NULL;
        return;
    }
    (*R2)->nr = nr;
    (*R2)->sons = (node2 **) malloc(nr * sizeof(node2 *));

    for (int i = 0; i < nr; i++) {
        T1(&(*R2)->sons[i], adj_list, adj_list[index_i][i]);
    }
}

void dezaloacre_T1(node2 *R2) {
    if (R2 == NULL)
        return;

    for (int i = R2->nr - 1; i >= 0; i--) {
        dezaloacre_T1(R2->sons[i]);
    }

    free(R2->sons);
    free(R2);
}

void demo_T1() {

    int parent[] = {-100, 2, 7, 5, 2, 7, 7, -1, 5, 2};
    int n = sizeof(parent) / sizeof(parent[0]);

    node2 *R2 = NULL;

    vector<vector<int>> adj_list(n);
    int root = -1;

    for (int i = 1; i < n; i++) {
        if (parent[i] == -1) {
            root = i;
        } else {
            adj_list[parent[i]].push_back(i);
        }
    }

    T1(&R2, adj_list, root);
    pretty_printR2(R2, 0);

//    dezaloacre_T1(R2);
//    free(R2);
//    R2 = NULL;

    //pretty_printR2(R2, 0);

}

void T2(node3 **R3, node2 *R2) {

    if (R2 == NULL || R3 == NULL)
        return;
    if (*R3 == NULL) {
        *R3 = alloc_node3(R2->key);
    }
    if (R2->nr == 0)
        return;
    if (R2->sons != NULL && R2->nr > 0)
        (*R3)->left = alloc_node3(R2->sons[0]->key);

    node3 *aux_left = (*R3)->left;

    for (int i = 1; i < R2->nr; i++) {
        aux_left->right = alloc_node3(R2->sons[i]->key);
        aux_left = aux_left->right;
    }
    aux_left = (*R3)->left;
    for (int i = 0; i < R2->nr; i++) {
        T2(&aux_left, R2->sons[i]);
        aux_left = aux_left->right;
    }
}

void demo_T2() {

    int parent[] = {-100, 2, 7, 5, 2, 7, 7, -1, 5, 2};
    int n = sizeof(parent) / sizeof(parent[0]);

    node2 *R2 = NULL;

    vector<vector<int>> adj_list(n);
    int root = -1;

    for (int i = 1; i < n; i++) {
        if (parent[i] == -1) {
            root = i;
        } else {
            adj_list[parent[i]].push_back(i);
        }
    }

    T1(&R2, adj_list, root);
    pretty_printR2(R2, 0);

    node3 *R3 = NULL;
    T2(&R3, R2);
    pretty_printR3(R3, 0);

//    dezaloacre_T1(R2);
//    free(R2);
//    R2 = NULL;

}


int main() {

    demo_pb1();
    demo_pb2();
    demo_prety_print();
    demo_T1();
    demo_T2();


    return 0;
}
