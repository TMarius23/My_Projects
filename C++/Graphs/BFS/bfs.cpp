#include <stdlib.h>
#include <string.h>
#include <queue>
#include <unordered_set>
#include "bfs.h"

int get_neighbors(const Grid *grid, Point p, Point neighb[]) {
    // TODO: fill the array neighb with the neighbors of the point p and return the number of neighbors
    // the point p will have at most 4 neighbors (up, down, left, right)
    // avoid the neighbors that are outside the grid limits or fall into a wall
    // note: the size of the array neighb is guaranteed to be at least 4

    int dx[] = {-1, 0, 1, 0};
    int dy[] = {0, 1, 0, -1};

    Point p1;
    if (!(grid->mat[p.row][p.col] == 0 && p.col >= 0 && p.row >= 0 && p.col < grid->cols &&
          p.row < grid->rows))
        return 0;

    int nr = 0;
    for (int i = 0; i < 4; i++) {
        p1.row = p.row + dx[i];
        p1.col = p.col + dy[i];
        if (grid->mat[p1.row][p1.col] == 0 && p1.col >= 0 && p1.row >= 0 && p1.col < grid->cols &&
            p1.row < grid->rows) {
            neighb[nr++] = p1;
        }
    }

    return nr;
}

void grid_to_graph(const Grid *grid, Graph *graph) {
    //we need to keep the nodes in a matrix, so we can easily refer to a position in the grid
    Node *nodes[MAX_ROWS][MAX_COLS];
    int i, j, k;
    Point neighb[4];

    //compute how many nodes we have and allocate each node
    graph->nrNodes = 0;
    for (i = 0; i < grid->rows; ++i) {
        for (j = 0; j < grid->cols; ++j) {
            if (grid->mat[i][j] == 0) {
                nodes[i][j] = (Node *) malloc(sizeof(Node));
                memset(nodes[i][j], 0, sizeof(Node)); //initialize all fields with 0/NULL
                nodes[i][j]->position.row = i;
                nodes[i][j]->position.col = j;
                ++graph->nrNodes;
            } else {
                nodes[i][j] = NULL;
            }
        }
    }
    graph->v = (Node **) malloc(graph->nrNodes * sizeof(Node *));
    k = 0;
    for (i = 0; i < grid->rows; ++i) {
        for (j = 0; j < grid->cols; ++j) {
            if (nodes[i][j] != NULL) {
                graph->v[k++] = nodes[i][j];
            }
        }
    }

    //compute the adjacency list for each node
    for (i = 0; i < graph->nrNodes; ++i) {
        graph->v[i]->adjSize = get_neighbors(grid, graph->v[i]->position, neighb);
        if (graph->v[i]->adjSize != 0) {
            graph->v[i]->adj = (Node **) malloc(graph->v[i]->adjSize * sizeof(Node *));
            k = 0;
            for (j = 0; j < graph->v[i]->adjSize; ++j) {
                if (neighb[j].row >= 0 && neighb[j].row < grid->rows &&
                    neighb[j].col >= 0 && neighb[j].col < grid->cols &&
                    grid->mat[neighb[j].row][neighb[j].col] == 0) {
                    graph->v[i]->adj[k++] = nodes[neighb[j].row][neighb[j].col];
                }
            }
            if (k < graph->v[i]->adjSize) {
                //get_neighbors returned some invalid neighbors
                graph->v[i]->adjSize = k;
                graph->v[i]->adj = (Node **) realloc(graph->v[i]->adj, k * sizeof(Node *));
            }
        }
    }
}

void free_graph(Graph *graph) {
    if (graph->v != NULL) {
        for (int i = 0; i < graph->nrNodes; ++i) {
            if (graph->v[i] != NULL) {
                if (graph->v[i]->adj != NULL) {
                    free(graph->v[i]->adj);
                    graph->v[i]->adj = NULL;
                }
                graph->v[i]->adjSize = 0;
                free(graph->v[i]);
                graph->v[i] = NULL;
            }
        }

        free(graph->v);
        graph->v = NULL;
    }
    graph->nrNodes = 0;
}

void bfs(Graph *graph, Node *s, Operation *op) {
    // TOOD: implement the BFS algorithm on the graph, starting from the node s
    // at the end of the algorithm, every node reachable from s should have the color BLACK
    // for all the visited nodes, the minimum distance from s (dist) and the parent in the BFS tree should be set
    // for counting the number of operations, the optional op parameter is received
    // since op can be NULL (when we are calling the bfs for display purposes), you should check it before counting:
    // if(op != NULL) op->count();


    for (int i = 0; i < graph->nrNodes; i++) {
        if (op != NULL)
            op->count(3);
        graph->v[i]->color = COLOR_WHITE;
        graph->v[i]->dist = INT_MAX;
        graph->v[i]->parent = NULL;
    }
    if (op != NULL)
        op->count(3);
    Node *start = s;
    start->dist = 0;
    start->color = COLOR_GRAY;

    std::queue<Node *> my_Q;
    my_Q.push(start);

    while (!my_Q.empty()) {
        Node *node = my_Q.front();
        for (int i = 0; i < node->adjSize; i++) {
            if (op != NULL)
                op->count();
            if (node->adj[i]->color == COLOR_WHITE) {
                if (op != NULL)
                    op->count(3);
                node->adj[i]->parent = node;
                node->adj[i]->dist = node->dist + 1;
                node->adj[i]->color = COLOR_GRAY;
                my_Q.push(node->adj[i]);
            }
        }
        if (op != NULL)
            op->count();
        node->color = COLOR_BLACK;
        my_Q.pop();
    }
}


void bfs_eu(Graph *graph, Node *s) {

    for (int i = 0; i < graph->nrNodes; i++) {
        graph->v[i]->color = COLOR_WHITE;
        graph->v[i]->dist = INT_MAX;
        graph->v[i]->parent = NULL;
    }

    Node *start = s;
    start->dist = 0;
    start->color = COLOR_GRAY;

    std::queue<Node *> my_Q;
    my_Q.push(start);

    while (!my_Q.empty()) {
        Node *node = my_Q.front();
        for (int i = 0; i < node->adjSize; i++) {
            if (node->adj[i]->color == COLOR_WHITE) {
                node->adj[i]->parent = node;
                node->adj[i]->dist = node->dist + 1;
                node->adj[i]->color = COLOR_GRAY;
                my_Q.push(node->adj[i]);
            }
        }
        node->color = COLOR_BLACK;
        my_Q.pop();
    }
}


void prity_print(int *p, Point *repr, int index, int poz, int n) {

    if (p == NULL)
        return;
    if (repr == NULL)
        return;

    for (int i = 0; i < index; i++) {
        printf("    ");
    }
    if (repr[poz].row == 0 || repr[poz].col == 0)
        return;

    printf("(%d %d) \n", repr[poz].row, repr[poz].col);

    for (int i = 0; i < n; i++) {
        if (p[i] == poz) {
            prity_print(p, repr, index + 1, i, n);
        }
    }
}

void prity_print_gr(int *p, Point *repr, int index, int poz, int n, Graph *graph) {

    if (p == NULL)
        return;
    if (repr == NULL)
        return;

    for (int i = 0; i < index; i++) {
        printf("    ");
    }
    if (graph->v[repr[poz].row][repr[poz].col].color == COLOR_WHITE)
        return;

    printf("(%d %d) \n", repr[poz].row, repr[poz].col);

    for (int i = 0; i < n; i++) {
        if (p[i] == poz) {
            prity_print(p, repr, index + 1, i, n);
        }
    }
}

void print_bfs_tree(Graph *graph) {
    //first, we will represent the BFS tree as a parent array
    int n = 0; //the number of nodes
    int *p = NULL; //the parent array
    Point *repr = NULL; //the representation for each element in p

    //some of the nodes in graph->v may not have been reached by BFS
    //p and repr will contain only the reachable nodes
    int *transf = (int *) malloc(graph->nrNodes * sizeof(int));
    for (int i = 0; i < graph->nrNodes; ++i) {
        if (graph->v[i]->color == COLOR_BLACK) {
            transf[i] = n;
            ++n;
        } else {
            transf[i] = -1;
        }
    }
    if (n == 0) {
        //no BFS tree
        free(transf);
        return;
    }

    int err = 0;
    p = (int *) malloc(n * sizeof(int));
    repr = (Point *) malloc(n * sizeof(Node));
    for (int i = 0; i < graph->nrNodes && !err; ++i) {
        if (graph->v[i]->color == COLOR_BLACK) {
            if (transf[i] < 0 || transf[i] >= n) {
                err = 1;
            } else {
                repr[transf[i]] = graph->v[i]->position;
                if (graph->v[i]->parent == NULL) {
                    p[transf[i]] = -1;
                } else {
                    err = 1;
                    for (int j = 0; j < graph->nrNodes; ++j) {
                        if (graph->v[i]->parent == graph->v[j]) {
                            if (transf[j] >= 0 && transf[j] < n) {
                                p[transf[i]] = transf[j];
                                err = 0;
                            }
                            break;
                        }
                    }
                }
            }
        }
    }
    free(transf);
    transf = NULL;

    if (!err) {
        // TODO: pretty print the BFS tree
        // the parrent array is p (p[k] is the parent for node k or -1 if k is the root)
        // when printing the node k, print repr[k] (it contains the row and column for that point)
        // you can adapt the code for transforming and printing multi-way trees from the previous labs

        int ii;
        for (ii = 0; ii < graph->nrNodes; ii++) {
            if (p[ii] == -1)
                break;
        }
        //prity_print(p, repr, 0, ii, n);
        prity_print_gr(p, repr, 0, ii, n, graph);

    }

    if (p != NULL) {
        free(p);
        p = NULL;
    }
    if (repr != NULL) {
        free(repr);
        repr = NULL;
    }
}

int shortest_path(Graph *graph, Node *start, Node *end, Node *path[]) {
    // TODO: compute the shortest path between the nodes start and end in the given graph
    // the nodes from the path, should be filled, in order, in the array path
    // the number of nodes filled in the path array should be returned
    // if end is not reachable from start, return -1
    // note: the size of the array path is guaranteed to be at least 1000

    int nr = 0;

    bfs_eu(graph, start);
    if (end->color == COLOR_WHITE)
        return -1;

    while (start != end) {
        path[nr++] = end;
        end = end->parent;
    }
    path[nr++] = start;

    for (int i = 0; i < nr / 2; i++) {
        std::swap(path[i], path[nr - i - 1]);
    }

    return nr;
}

int verif_conex(Graph *graf, int n) {
    Graph graph1 = *graf;

    bfs_eu(&graph1, graph1.v[0]);
    for (int i = 0; i < n; i++) {
        if (graph1.v[i]->color == COLOR_WHITE)
            return 0;
    }
    return 1;
}

void performance() {
    int n = 0;
    Profiler p("bfs");
    srand(time(NULL));

    // vary the number of edges
    for (n = 1000; n <= 4500; n += 100) {
        Operation op = p.createOperation("bfs-edges", n);
        Graph graph;
        graph.nrNodes = 100;
        //initialize the nodes of the graph
        graph.v = (Node **) malloc(graph.nrNodes * sizeof(Node *));
        for (int i = 0; i < graph.nrNodes; ++i) {
            graph.v[i] = (Node *) malloc(sizeof(Node));
            memset(graph.v[i], 0, sizeof(Node));
        }
        // TODO: generate n random edges
        // make sure the generated graph is connected


        for (int i = 0; i < 100; i++) {
            graph.v[i]->adj = (Node **) calloc(graph.nrNodes,  sizeof(Node *));
//            memset(graph.v[i]->adj, 0, graph.nrNodes * sizeof(Node *));
            graph.v[i]->adjSize = 0;
        }

        ///graf conex
        for (int i = 0; i < graph.nrNodes - 1; i++) {
            graph.v[i]->adj[graph.v[i]->adjSize++] = graph.v[i + 1];
            graph.v[i + 1]->adj[graph.v[i + 1]->adjSize++] = graph.v[i];
        }

        ///acum avem generat un graf conex care are 99 de muchii

        for (int i = graph.nrNodes - 1; i < n; i++) {

            int ok = 0;
            int nr1, nr2;
            while(!ok){

                do {
                    nr1 = rand() % 100;
                    nr2 = rand() % 100;
                } while (nr1 == nr2);

                ok = 1;
                for (int j = 0; j < graph.v[nr1]->adjSize; j++) {
                    if (graph.v[nr1]->adj[j] == graph.v[nr2]) {
                        ok = 0;
                        break;
                    }
                }
            }

            graph.v[nr1]->adj[graph.v[nr1]->adjSize++] = graph.v[nr2];
            graph.v[nr2]->adj[graph.v[nr2]->adjSize++] = graph.v[nr1];

        }


        bfs(&graph, graph.v[0], &op);
        free_graph(&graph);
    }
    printf("Aici sunt acum. da\n");
    printf("Aici sunt acum. da\n");
    printf("Aici sunt acum. da\n");
    printf("Aici sunt acum. da\n");
    printf("Aici sunt acum. da\n");
    printf("Aici sunt acum. da\n");

    p.createGroup("Edge", "bfs-edges");
    p.createGroup("Vertices", "bfs-vertices");

    p.showReport();
//    // vary the number of vertices
//    for (n = 100; n <= 200; n += 10) {
//        Operation op = p.createOperation("bfs-vertices", n);
//        Graph graph;
//        graph.nrNodes = n;
//        //initialize the nodes of the graph
//        graph.v = (Node **) malloc(graph.nrNodes * sizeof(Node *));
//        for (int i = 0; i < graph.nrNodes; ++i) {
//            graph.v[i] = (Node *) malloc(sizeof(Node));
//            memset(graph.v[i], 0, sizeof(Node));
//        }
//        // TODO: generate 4500 random edges
//        // make sure the generated graph is connected
//
//
//        do {
//            for (int i = 0; i < n; i++) {
//                if (graph.v[i]->adj != nullptr) {
//                    free(graph.v[i]->adj);
//                }
//
//                graph.v[i]->adj = (Node **)malloc(graph.nrNodes * sizeof(Node *));
//                graph.v[i]->adjSize = 0;
//            }
//
//            for (int i = 0; i < 4500; i++) {
//                int nr_random, nr_random1;
//                do {
//                    nr_random = rand() % n;
//                    nr_random1 = rand() % n;
//                } while (nr_random == nr_random1);
//
//                graph.v[nr_random]->adj[graph.v[nr_random]->adjSize] = graph.v[nr_random1];
//                graph.v[nr_random1]->adj[graph.v[nr_random1]->adjSize] = graph.v[nr_random];
//
//                graph.v[nr_random]->adjSize++;
//                graph.v[nr_random1]->adjSize++;
//            }
//        } while (!verif_conex(&graph, n));
//
//
//        bfs(&graph, graph.v[0], &op);
//        free_graph(&graph);
//    }



}

