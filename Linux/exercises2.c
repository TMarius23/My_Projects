#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/types.h>
#include <dirent.h>
#include <sys/stat.h>
#include <unistd.h>
#include <fcntl.h>
#include <sys/wait.h>
#include <semaphore.h>
#include <pthread.h>
#include "a2_helper.h"

typedef struct{
    int idProcess;
    int idThread; 
    sem_t *semafor1;
    sem_t *semaforNume;
    sem_t *semaforNume1;
}TH_STRUCT_PROC3;

typedef struct{
    int idProcess;
    int idThread; 
    sem_t *semafor4T;
    pthread_mutex_t *lock;
    pthread_cond_t *cond;
    pthread_cond_t *condT10;
    pthread_mutex_t *mutexAfi;
}TH_STRUCT_PROC4;

typedef struct{
    int idProcess;
    int idThread; 
    sem_t *semaforNume;
    sem_t *semaforNume1;
}TH_STRUCT_PROC5;


int variabilaLacat = 0;
int variabilaLacatPB4 = 0;
int esteT10E = 0;
sem_t sem_pb4;
sem_t asteptare4Semafoare;
int afostT10 = 0;
int nrThCur = 0;

/// 0 nu a ajuns nici 4 nici 2
///Daca ajunge 2 => trebuie sa astepte pana ajunge 4 primul
/// 1 <- T4 a inceput dej/ => poate incepe si 2
///e liber pt T2 si asteapa finalizarea lui

void *func_pb3(void *param){

    TH_STRUCT_PROC3 *s = (TH_STRUCT_PROC3 *)param;

    if(s->idThread == 3){
        sem_wait(s->semaforNume);
    }

    int contorL = 0;
    sem_wait(s->semafor1);
    contorL = variabilaLacat;
    sem_post(s->semafor1);

    if(s->idThread == 4){
        sem_wait(s->semafor1);
        info(BEGIN, s->idProcess, s->idThread);
        variabilaLacat = 1;
        sem_post(s->semafor1);
    }else{
        if(s->idThread == 2){
            
            while(contorL == 0){
                sem_wait(s->semafor1);
                contorL = variabilaLacat;
                sem_post(s->semafor1);
            }
            info(BEGIN, s->idProcess, s->idThread);

        }else{
            info(BEGIN, s->idProcess, s->idThread);
        }
    }

    sem_wait(s->semafor1);
    contorL = variabilaLacat;
    sem_post(s->semafor1);
    
    if(s->idThread == 2){
        sem_wait(s->semafor1);
        info(END, s->idProcess, s->idThread);
        variabilaLacat = 2;
        sem_post(s->semafor1);
    }else{
        if(s->idThread == 4){
            while(contorL == 1){
                sem_wait(s->semafor1);
                contorL = variabilaLacat;
                sem_post(s->semafor1);
            }
            info(END, s->idProcess, s->idThread);

        }else{
            info(END, s->idProcess, s->idThread);
        }
    }
    if(s->idThread == 3){
        sem_post(s->semaforNume1);
    }

    return NULL;
}

/*
void *func_pb4(void *param){

    TH_STRUCT_PROC4 *s = (TH_STRUCT_PROC4 *)param;

    sem_wait(s->semafor4T);

    info(BEGIN, s->idProcess, s->idThread);

    int contorL = 0;
    sem_wait(s->semafor1T);
    variabilaLacatPB4++;
    contorL = variabilaLacatPB4;
    sem_post(s->semafor1T);


    int esteT10 = 0;
    if(s->idThread == 10){
        sem_wait(s->semafor1T);
        esteT10E = 1;
        esteT10 = esteT10E;
        sem_post(s->semafor1T);
    }
        
    int contorT10 = 0;
        
    sem_wait(s->semafor1T);
    contorT10 = afostT10;
    sem_post(s->semafor1T);

    if(contorL < 4 && contorT10 == 0){
        sem_wait(&sem_pb4);
    }  

    if(s->idThread == 10){
        int nT = 0;

        sem_wait(s->semafor1T);
        nrThCur++;
        sem_post(s->semafor1T);

        while(nT != 4){
            sem_wait(s->semafor1T);
            nT = nrThCur;
            sem_post(s->semafor1T);
        }

        info(END, s->idProcess, s->idThread);

        sem_wait(s->semafor1T);
        esteT10E = 0;
        esteT10 = esteT10E;
        afostT10 = 1;
        sem_post(s->semafor1T);



        ///eliberam celelalte 41 de threaduri. In sensul sa isi poata face treaba
        // for (int i = 0; i < 41; i++) {
        //     sem_post(&sem_pb4);
        // }
        // sem_post(&sem_pb4);
        // sem_post(&sem_pb4);
        // sem_post(&sem_pb4);
        // sem_post(&sem_pb4);
    }else{  
        sem_wait(s->semafor1T);
        esteT10 = esteT10E;
        sem_post(s->semafor1T);

        if(esteT10 == 1){
            sem_post(&sem_pb4);
        
            int nT = 0;
            sem_wait(s->semafor1T);
            nrThCur++;
            sem_post(s->semafor1T);

            while(nT != 4){
                sem_wait(s->semafor1T);
                nT = nrThCur;
                sem_post(s->semafor1T);
            }
        }

        sem_wait(s->semafor1T);
        contorT10 = afostT10;
        sem_post(s->semafor1T);    


        if(contorT10 == 0){
            sem_post(&sem_pb4);
        }else{
            sem_post(&sem_pb4);
            sem_post(&sem_pb4);
            sem_post(&sem_pb4);
            sem_post(&sem_pb4);
        }  

        info(END, s->idProcess, s->idThread);

    }
    
    sem_wait(s->semafor1T);
    variabilaLacatPB4--;
    sem_post(s->semafor1T);

    sem_post(s->semafor4T);
    return NULL;
}
*/

int nrThAct, eBineR;
int numarThreadTotal;

void *func_pb4(void *param){
    
    TH_STRUCT_PROC4 *s = (TH_STRUCT_PROC4 *)param;

    sem_wait(s->semafor4T);

    info(BEGIN, s->idProcess, s->idThread);

    pthread_mutex_lock(s->lock);
    nrThAct++;
    numarThreadTotal++;
    pthread_mutex_unlock(s->lock);

    if(s->idThread == 10){

        pthread_mutex_lock(s->lock);
        while(nrThAct != 4){
            pthread_cond_wait(s->cond, s->lock);
        }
        afostT10 = 1;
        pthread_cond_broadcast(s->cond);

        // pthread_cond_wait(s->condT10, s->lock);
        --nrThAct;

        info(END, s->idProcess, s->idThread);

        pthread_mutex_unlock(s->lock);
        
    }else{
        pthread_mutex_lock(s->lock);
        
        pthread_cond_broadcast(s->cond);

        
        while(afostT10 == 0 && numarThreadTotal >= 39){
            pthread_cond_wait(s->cond, s->lock);
        }


        // pthread_cond_signal(s->condT10);
        --nrThAct;

        info(END, s->idProcess, s->idThread);

        pthread_mutex_unlock(s->lock);
        
    }
    // pthread_mutex_lock(s->lock);
    // pthread_mutex_unlock(s->lock);
    
    sem_post(s->semafor4T);
    
    return NULL;
}


void *func_pb5(void *param){

    TH_STRUCT_PROC5 *s = (TH_STRUCT_PROC5 *)param;

    if(s->idThread == 2){
        sem_wait(s->semaforNume1);
    }

    info(BEGIN, s->idProcess, s->idThread);

    info(END, s->idProcess, s->idThread);

    if(s->idThread == 4){
        sem_post(s->semaforNume);
    }

    return NULL;
}


int main(int argc, char **argv){

    init();

    sem_unlink("/semaforNume_pb5TemaA2");
    sem_unlink("/semaforNume1_pb5TemaA2");

    sem_t *semaforNume = NULL;
    sem_t *semaforNume1 = NULL;
    semaforNume = sem_open("/semaforNume_pb5TemaA2", O_CREAT, 0644, 0);
    semaforNume1 = sem_open("/semaforNume1_pb5TemaA2", O_CREAT, 0644, 0);

    info(BEGIN, 1, 0);

    if(fork() == 0){
        ///P2
        info(BEGIN, 2, 0);

        if(fork() == 0){
            //P6
            info(BEGIN, 6, 0);
            
            ///Cerinta 4
            
            TH_STRUCT_PROC4 params[44];
            pthread_t tid[44];

            sem_t semafor4;
            pthread_mutex_t lock;
            pthread_cond_t cond;
            pthread_cond_t condT10;
            pthread_mutex_t mutexAfi;


            sem_init(&semafor4, 0, 4);
            pthread_mutex_init(&lock, NULL);
            pthread_cond_init(&cond, NULL);
            pthread_cond_init(&condT10, NULL);
            pthread_mutex_init(&mutexAfi, NULL);

            afostT10 = 0;
            variabilaLacatPB4 = 0;
            numarThreadTotal = 0;
            for(int i = 1; i <= 42; i++){
                params[i].idProcess = 6;
                params[i].idThread = i;
                params[i].semafor4T = &semafor4;
                params[i].lock = &lock;
                params[i].cond = &cond;
                params[i].condT10 = &condT10;
                params[i].mutexAfi = &mutexAfi;
                pthread_create(&tid[i], NULL, func_pb4, &params[i]);
            }

            for(int i = 1; i <= 42; i++){
                pthread_join(tid[i], NULL);
            }

            sem_destroy(&semafor4);
            pthread_mutex_destroy(&lock);
            pthread_cond_destroy(&cond);
            pthread_cond_destroy(&condT10);


            info(END, 6, 0);
        }else{
            //P2
            wait(NULL);

            info(END, 2, 0);
        }
    }else{
        //P1
        if(fork() == 0){
            //P3
            info(BEGIN, 3, 0);
            
            info(END, 3, 0);
        }else{
            //P1
            if(fork() == 0){
                //P4
                info(BEGIN, 4, 0);
                
                ///Cerinta 3

                sem_t semafor1;
                sem_init(&semafor1, 0, 1);
                
                TH_STRUCT_PROC3 params[6];
                pthread_t tid[6];
                variabilaLacat = 0;
                for(int i = 1; i <= 5; i++){
                    params[i].idProcess = 4;
                    params[i].idThread = i;
                    params[i].semafor1 = &semafor1;
                    params[i].semaforNume = semaforNume;
                    params[i].semaforNume1 = semaforNume1;
                    pthread_create(&tid[i], NULL, func_pb3, &params[i]);                   
                }  
    
                for(int i = 1; i <= 5; i++){
                    pthread_join(tid[i], NULL);
                }
                
                sem_destroy(&semafor1);
                info(END, 4, 0);
            }else{
                //P1
                if(fork() == 0){
                    //P5
                    info(BEGIN, 5, 0);
                    if(fork() == 0){
                        //P7
                        info(BEGIN, 7, 0);

                        info(END, 7, 0);
                    }else{
                        //P5
                        wait(NULL);
                        
                        ///Cerinta 5
                        
                        TH_STRUCT_PROC5 params[5];
                        pthread_t tid[5];
                        variabilaLacat = 0;
                        for(int i = 1; i <= 4; i++){
                            params[i].idProcess = 5;
                            params[i].idThread = i;
                            params[i].semaforNume = semaforNume;
                            params[i].semaforNume1 = semaforNume1;
                            pthread_create(&tid[i], NULL, func_pb5, &params[i]);                   
                        }  
            
                        for(int i = 1; i <= 4; i++){
                            pthread_join(tid[i], NULL);
                        }
                        

                        info(END, 5, 0);
                    }
                }else{
                    //P1
                    wait(NULL); //Asteptam dupa P2
                    wait(NULL); //Asteptam dupa P3
                    wait(NULL); //Asteptam dupa P4
                    wait(NULL); //Asteptam dupa P5

                
                    info(END, 1, 0);
                }
            }
        }
    }
    sem_close(semaforNume);
    sem_close(semaforNume1);
    sem_unlink("/semaforNume_pb5TemaA2");
    sem_unlink("/semaforNume1_pb5TemaA2");


    return 0;
}