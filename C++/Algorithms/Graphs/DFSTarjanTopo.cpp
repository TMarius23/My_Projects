/**
* @author Trif Marius 
* Specificatia continutului temei: DFS, Sortare topologica, Tarjan
 *
 * DFS:
 * In functie de cum este implementat, cu matrice unde sunt stocate legaturile sau cu liste de adiacente poate avea o
 * complexitate diferita, astfel daca e implementat cu matrice avem complexitatea O(V^2), iar daca este cu liste de
 * adiacenta O(V + E), unde V reprezinta numarul de noduri, iar E numarul de muchii. Acesta parcurge arborele in
 * adancime, acest lucru realizanduse cu ajutoul unei stive. Aceasta stiva este data de stiva implicita a apelului
 * recursiv, unde sunt salvate valorile care urmeaza sa fie parcurse. Acest algoritm cauta fiecare nod adiacent lui
 * intr-o ordine alfabetica si apeleaza functia din el, si tot asa. La final acesta se face negru si acest lucru rezulta
 * ca nu mai putem intra in el. La gasirea fiecarui nod, acel nod se pune pe GRAY, semnificand faptul ca este in momentul
 * procesarii lui.
 *
 * Sortare topologica:
 * Este o metodă folosită pentru ordonarea nodurilor unui graf orientat aciclic unde avand setul (u,v) u apare inaintea
 * nodului v in ordina sortata. Vizitam fiecare nod și adăugam nodurile într-o stivă după ce toate vecinele lor au fost procesate.
 * Ordinea sortării este dată de ordinea inversă a scoaterii nodurilor din stivă. Din punct de vedere al complexitatii avem
 * O(V + E), unde V nr de noduri si E nr de muchii. Si din punct de vedere al spatiului alocat este un O(V), pentru stiva
 * unde trebuie sa tinem valorile.
 *
 * Tarjan:
 * Este folosit pentru a gasi componentele tare conexe dintr-un graf orientat. Aceastaa componenta tare conexa este un subgraf
 * maximal in care de la orice nod putem ajunge la orice nod si invers totodata. Accesta foloseste DFS-ul si are o complexitate
 * de O(V + E), unde V nr de noduri si E nr de muchii.
*
*/



#include <iostream>
#include <cstring>
#include <list>
#include <stack>
#include <ctime>
#include "Profiler.h"

using namespace std;

Profiler profiler;

///DFS <- componente conexe
///Tarjan tare conexe orientate
///sortare topologica <- fara cicluri
///stiva
///ciclu daca in parrcurgere dam de un nod grey. Inseamna ca am mai trecut pe acolo deja
///daca citim invers un graf, adica in functie de finalizare a fiecarui nod, aem o sortare topologica
///nu e sortare topo daca are cicluri
///pt topo - ne folosim de un stack
///daca il facem recursiv se pune automat pe stiva
///trebuie sa fie gray pt a nu fi sortat topologic, merge daca e negru

enum {
    WHITE, GRAY, BLACK
};

typedef struct _node {
    int key;
    int color;
    int adj_size;
    struct _node *adj[4505];///avem cel mult 4500 noduri

    int indx, lowLink, onStack, components;

} NodeG;

void DFS_visit(NodeG *start, int print_enable) {

    start->color = GRAY;
    for (int i = 0; i < start->adj_size; i++) {
        if (start->adj[i]->color == WHITE) {
            DFS_visit(start->adj[i], print_enable);
        }
    }
    start->color = BLACK;
    //mai il putem auguenta cum vrem, aici
    ///aici afisare pt a vedea key-urile pt sort topo
    ///le punem intr-un stack si verificam daca pana la final nu s-au gasit cicluri, le afisam mai apoi => afisare topo
    if (print_enable)
        cout << start->key << " ";
}

void DFS_visit_topo(NodeG *start, stack<NodeG *> *stack, int *enable) {

    if (*enable == 0)
        return;

    start->color = GRAY;
    for (int i = 0; i < start->adj_size && *enable == 1; i++) {
        if (start->adj[i]->color == WHITE && *enable == 1) {
            DFS_visit_topo(start->adj[i], stack, enable);
        } else {
            if (start->adj[i]->color == GRAY && *enable == 1) {
                while (!(*stack).empty()) {
                    (*stack).pop();
                }
                *enable = 0;
                return;//Nu poate fi sortat topologic
            }
        }
    }
    if (*enable == 0)
        return;
    start->color = BLACK;
    (*stack).push(start);
}

///V <- vertices
///E <- edge
void DFS_parc(NodeG *list[], int V, int print_enable) {

    for (int i = 0; i < V; i++) {
        if (list[i]->color == WHITE) {
            DFS_visit(list[i], print_enable);
        }
    }
}

void DFS_parc_topo(NodeG *list[], int V) {

    stack<NodeG *> stack;
    for (int i = 0; i < V; i++) {
        list[i]->color = WHITE;
    }

    int enable = 1;
    for (int i = 0; i < V; i++) {
        if (list[i]->color == WHITE) {
            DFS_visit_topo(list[i], &stack, &enable);
        }
    }

    if (enable == 1)
        while (!stack.empty()) {
            cout << stack.top()->key << " ";
            stack.pop();
        }
    else {
        cout << "Nu poate fi sortat topologic" << endl;
    }
}


///index - adica momentul/ al catelea nod care s-a colorat nodul
///lowLink cea mai mica componenta de care se poate lega

void print_graf(NodeG *list[], int V) {
    for (int i = 0; i < V; i++) {
        if (list[i]->adj_size == 0)
            continue;
        cout << i << ": ";
        for (int j = 0; j < list[i]->adj_size; j++) {
            cout << list[i]->adj[j]->key << " ";
        }
        cout << endl;
    }
}

void demo() {
    NodeG *list[7];

    for (int i = 0; i < 7; i++) {
        list[i] = (NodeG *) malloc(7 * sizeof(NodeG));
        memset(list[i], 0, 7 * sizeof(NodeG));
        list[i]->key = i;
    }

    list[0]->adj[0] = list[1];
    list[0]->adj[1] = list[2];
    list[0]->adj_size = 2;

    list[2]->adj[0] = list[3];
    list[2]->adj_size = 1;

    list[3]->adj[0] = list[1];
    list[3]->adj[1] = list[4];
    list[3]->adj_size = 2;

    list[4]->adj[0] = list[5];
    list[4]->adj[1] = list[6];
    list[4]->adj_size = 2;

    print_graf(list, 7);

    DFS_parc(list, 7, 1);

}

void demo_topo() {
    NodeG *list[8];

    for (int i = 0; i < 8; i++) {
        list[i] = (NodeG *) malloc(8 * sizeof(NodeG));
        memset(list[i], 0, 8 * sizeof(NodeG));
        list[i]->key = i;
    }

    list[0]->adj[0] = list[1];
    list[0]->adj[1] = list[2];
    list[0]->adj_size = 2;

    list[2]->adj[0] = list[3];
    list[2]->adj_size = 1;

    list[3]->adj[0] = list[1];
    list[3]->adj[1] = list[4];
    list[3]->adj[2] = list[0];
    list[3]->adj_size = 2;/// ca sa verificam ca merge sortarea topo, scriem 3 aici

    list[4]->adj[0] = list[5];
    list[4]->adj[1] = list[6];
    list[4]->adj_size = 2;

//    list[7]->adj_size = 0;

    print_graf(list, 8);

    DFS_parc_topo(list, 8);
    cout << endl;

}

int index = 0;
stack<NodeG *> S;
int nrComponents = 0;

int mini(int a, int b) {
//    return (((a) < (b)) ? a : b);
    if (a < b)
        return a;
    else
        return b;
}

void STRONG_CONEX(NodeG *list[], NodeG *start) {
    start->indx = index;
    start->lowLink = index;
    index++;
    S.push(start);
    start->onStack = 1;

    for (int i = 0; i < start->adj_size; i++) {
        if (start->adj[i]->indx == -1) {
            STRONG_CONEX(list, start->adj[i]);
            start->lowLink = mini(start->lowLink, start->adj[i]->lowLink);
        } else {
            if (start->adj[i]->onStack == 1) {
                start->lowLink = mini(start->lowLink, start->adj[i]->indx);
            }
        }
    }
    if (start->lowLink == start->indx) {
        nrComponents++;

        while (true) {
            NodeG *v = S.top();
            S.pop();
            v->onStack = 0;
            v->components = nrComponents;
            if (v == start)
                break;
        }
    }
}

void TARJAN(NodeG *list[], int V) {

    for (int i = 0; i < V; i++) {
        list[i]->indx = -1;
        list[i]->lowLink = -1;
        list[i]->onStack = 0;
        list[i]->components = 0;
    }

    while (!S.empty())
        S.pop();

    for (int i = 0; i < V; i++) {
        if (list[i]->indx == -1) {
            STRONG_CONEX(list, list[i]);
        }
    }

    for (int i = 0; i < V; i++) {
        for (int j = 0; j < V; j++) {
            if (list[j]->components == i) {
                cout << list[j]->key << " ";
            }
        }
        cout << endl;
    }
}


void demo_tarjan() {
    NodeG *list[10];

    for (int i = 0; i < 10; i++) {
        list[i] = (NodeG *) malloc(8 * sizeof(NodeG));
        memset(list[i], 0, 8 * sizeof(NodeG));
        list[i]->key = i;
    }

    list[0]->adj[0] = list[1];
    list[0]->adj[1] = list[2];
    list[0]->adj_size = 2;

    list[2]->adj[0] = list[3];
    list[2]->adj_size = 1;

    list[3]->adj[0] = list[0];
    list[3]->adj[1] = list[1];
    list[3]->adj[2] = list[4];
    list[3]->adj_size = 3;

    list[4]->adj[0] = list[5];
    list[4]->adj[1] = list[6];
    list[4]->adj_size = 2;


    list[8]->adj[0] = list[9];
    list[8]->adj_size = 1;

    list[9]->adj[0] = list[8];
    list[9]->adj_size = 1;

    print_graf(list, 10);

    cout << "Componente puternic conexe" << endl;
    TARJAN(list, 10);

}

void DFS_visit_op(NodeG *start, Operation *op) {

    op->count();
    start->color = GRAY;
    for (int i = 0; i < start->adj_size; i++) {
        op->count();
        if (start->adj[i]->color == WHITE) {
            DFS_visit_op(start->adj[i], op);
        }
    }
    op->count();
    start->color = BLACK;
}


void DFS_parc_op(NodeG *list[], int V, Operation *op) {

    for (int i = 0; i < V; i++) {
        op->count();
        if (list[i]->color == WHITE) {
            DFS_visit_op(list[i], op);
        }
    }
}


void free_graph(NodeG *graph[], int V) {
    for (int i = 0; i < V; ++i) {
        if (graph[i] != NULL) {
            free(graph[i]);
            graph[i] = NULL;
        }
    }
}


void performance() {
    int n = 0;
    Profiler p("dfs");
    srand(time(NULL));

    // vary the number of edges
    for (n = 1000; n <= 4500; n += 200) {
        Operation op = p.createOperation("dfs-edges", n);
        NodeG *graph[101];
        int nr_nodes = 100;
        //initialize the nodes of the graph
        for (int i = 0; i < nr_nodes; ++i) {
            graph[i] = (NodeG *) malloc(sizeof(NodeG));
            memset(graph[i], 0, sizeof(NodeG));
        }

        for (int i = 0; i < nr_nodes; ++i) {
            graph[i]->adj[i] = (NodeG *) malloc((nr_nodes + 1) * sizeof(NodeG));
            memset(graph[i]->adj[i], 0, (nr_nodes + 1) * sizeof(NodeG));
        }

        for (int i = 0; i < n; i++) {

            int ok = 0;
            int nr1, nr2;
            while (!ok) {
                do {
                    nr1 = rand() % 100;
                    nr2 = rand() % 100;
                } while (nr1 == nr2);

                ok = 1;
                for (int j = 0; j < graph[nr1]->adj_size; j++) {
                    if (graph[nr1]->adj[j] == graph[nr2]) {
                        ok = 0;
                        break;
                    }
                }
            }

            graph[nr1]->adj[graph[nr1]->adj_size++] = graph[nr2];
            graph[nr2]->adj[graph[nr2]->adj_size++] = graph[nr1];

        }

        DFS_parc_op(graph, nr_nodes, &op);
        free_graph(graph, nr_nodes);
    }


    // vary the number of vertices
    for (n = 100; n <= 200; n += 10) {
        Operation op = p.createOperation("dfs-vertices", n);
        NodeG *graph[n + 1];
        //initialize the nodes of the graph
        for (int i = 0; i < n; ++i) {
            graph[i] = (NodeG *) malloc(sizeof(NodeG));
            memset(graph[i], 0, sizeof(NodeG));
        }

        for (int i = 0; i < n; ++i) {
            graph[i]->adj[i] = (NodeG *) malloc((n + 1) * sizeof(NodeG));
            memset(graph[i]->adj[i], 0, (n + 1) * sizeof(NodeG));
        }

        for (int i = 0; i < 4500; i++) {

            int ok = 0;
            int nr1, nr2;
            while (!ok) {
                do {
                    nr1 = rand() % n;
                    nr2 = rand() % n;
                } while (nr1 == nr2);

                ok = 1;

                for (int j = 0; j < graph[nr1]->adj_size && ok == 1; j++) {
                    if (graph[nr1]->adj[j] == graph[nr2]) {
                        ok = 0;
                        break;
                    }
                }
            }

            graph[nr1]->adj[graph[nr1]->adj_size++] = graph[nr2];
            graph[nr2]->adj[graph[nr2]->adj_size++] = graph[nr1];

        }

        DFS_parc_op(graph, n, &op);
        free_graph(graph, n);
    }

    p.createGroup("Edge", "dfs-edges");
    p.createGroup("Vertices", "dfs-vertices");

    p.showReport();

}


int main() {

    demo();
    demo_topo();
    demo_tarjan();
    performance();


    return 0;
}
