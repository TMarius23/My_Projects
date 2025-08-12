#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/types.h>
#include <dirent.h>
#include <sys/stat.h>
#include <unistd.h>
#include <fcntl.h>

void afisare_varianta(){
    printf("12990\n");
}

int verifPermisiuni(mode_t mod, char permisiuni[11]){
    char perm[10];
    permisiuni[10] ='\0';
    perm[9] = '\0';
    int i = -1;
    // if(S_ISDIR(mod))
    //     perm[0] = 'd';
    // else
    //     perm[0] = '-';

    if(mod & S_IRUSR)
        perm[i + 1] = 'r';
    else
        perm[i + 1] = '-';
    
    if(mod & S_IWUSR)
        perm[i + 2] = 'w';
    else
        perm[i + 2] = '-';

    if(mod & S_IXUSR)
        perm[i + 3] = 'x';
    else
        perm[i + 3] = '-';

    ///
    if(mod & S_IRGRP)
        perm[i + 4] = 'r';
    else
        perm[i + 4] = '-';
    
    if(mod & S_IWGRP)
        perm[i + 5] = 'w';
    else
        perm[i + 5] = '-';

    if(mod & S_IXGRP)
        perm[i + 6] = 'x';
    else
        perm[i + 6] = '-';
    
    //
    if(mod & S_IROTH)
        perm[i + 7] = 'r';
    else
        perm[i + 7] = '-';

    if(mod & S_IWOTH)
        perm[i + 8] = 'w';
    else
        perm[i + 8] = '-';

    if(mod & S_IXOTH)
        perm[i + 9] = 'x';
    else
        perm[i + 9] = '-';

    // printf("%s\n", perm);
    for(int i = 0; i < 9; i++){
        if(perm[i] != permisiuni[i])
            return 0;
    }
    return 1;
}

void listRec(const char *path, int recursivTF, int sizeTF, int size_dat, int permTF, char permisiuni[11])
{
    DIR *dir = NULL;
    struct dirent *entry = NULL;
    char fullPath[512];
    struct stat statbuf;

    dir = opendir(path);
    if(dir == NULL) {
        printf("ERROR\ninvalid directory path\n");
        return;
    }
    while((entry = readdir(dir)) != NULL) {
        if(strcmp(entry->d_name, ".") != 0 && strcmp(entry->d_name, "..") != 0) {
            snprintf(fullPath, 512, "%s/%s", path, entry->d_name);
            if(lstat(fullPath, &statbuf) == 0) {
                if(sizeTF == 1){
                    if(S_ISREG(statbuf.st_mode)) {
                        if(statbuf.st_size < size_dat){
                            printf("%s\n", fullPath);
                        }
                    }
                }else{
                    if(permTF == 1){
                        if(verifPermisiuni(statbuf.st_mode, permisiuni) == 1){
                            printf("%s\n", fullPath);
                        }                        
                    }else{
                        printf("%s\n", fullPath);
                    }
                }
                if(recursivTF == 1){
                    if(S_ISDIR(statbuf.st_mode)) {
                        listRec(fullPath, recursivTF, sizeTF, size_dat, permTF, permisiuni);
                    }
                }
            }
        }
    }
    closedir(dir);
}

void parsare_SF(const char* path){

    // printf("%s\n", path);
    int fd1 = open(path, O_RDONLY);
    if(fd1 == -1){
        printf("ERROR0\n");
        return;
    }
       
    off_t size = lseek(fd1, 0, SEEK_END);
    char MAGic[3] = " ";
    
    lseek(fd1, size - 2, SEEK_SET);
    if(read(fd1, &MAGic[0], 1) != 1){
        printf("ERROR\n");
        printf("wrong magic\n");
        close(fd1);
        return;
    }
    // printf("%c", MAGic[0]);
    
    lseek(fd1, size - 1, SEEK_SET);
    if(read(fd1, &MAGic[1], 1) != 1){
        printf("ERROR\n");
        printf("wrong magic\n");
        close(fd1);
        return;
    }
    MAGic[2] = '\0';
    // printf("%c\n", MAGic[1]);

    ///VERIFICARE MAGIC NUMBER
    if(MAGic[0] != '3' || MAGic[1] != 'E'){
        printf("ERROR\n");
        printf("wrong magic\n");
        close(fd1);
        return;
    }

    lseek(fd1, size - 4, SEEK_SET);
    short sizeSFile = 0;
    if(read(fd1, &sizeSFile, 2) != 2){
        printf("ERROR1\n");
        close(fd1);
        return;
    }

    ///SIZE FILE
    // printf("Size : %ld\n", sizeSFile);

    lseek(fd1, size - sizeSFile, SEEK_SET);
    u_int8_t version = 0;
    if(read(fd1, &version, 1) != 1){
        printf("ERROR2\n");
        close(fd1);
        return;
    }
    // printf("Version : %d\n", version);

    ///VERSION
    if(version < 42 || version > 99){
        printf("ERROR\n");
        printf("wrong version\n");
        close(fd1);
        return;
    }

    lseek(fd1, size - sizeSFile + 1, SEEK_SET);
    u_int8_t noOfSections = 0;
    if(read(fd1, &noOfSections, 1) != 1){
        printf("ERROR3\n");
        close(fd1);
        return;
    }
    // printf("Nr de sectiuni : %d\n", noOfSections);

    ///NUMAR DE SECTIUNI
    // noOfSections = 15;
    if(noOfSections != 2){
        if(noOfSections < 6 || noOfSections > 18){
            printf("ERROR\n");
            printf("wrong sect_nr\n");
            close(fd1);
            return;
        }
    }

    ////VERIFICARE SEC_TYPE
    lseek(fd1, size - sizeSFile + 13, SEEK_SET);
    for(int  i = 0; i < noOfSections; i++){
        short sec_type = 0;
        if(read(fd1, &sec_type, 2) != 2){
            printf("ERROR4\n");
            close(fd1);
            return;
        }
        // printf("Sect %d type : %ld\n", i, sec_type);
        if(sec_type != 48 && sec_type != 51 && sec_type != 91 && sec_type != 60 && sec_type != 43 && sec_type != 94){
            printf("ERROR\n");
            printf("wrong sect_types\n");
            close(fd1);
            return;
        }
        lseek(fd1, 19 , SEEK_CUR);
    }

    printf("SUCCESS\n");
    printf("version=%d\n", version);
    printf("nr_sections=%d\n", noOfSections);
    lseek(fd1, size - sizeSFile + 2, SEEK_SET);

    for(int i = 1; i <= noOfSections; i++){
        printf("section%d: ", i);
        char numeSectiune[12];
        for(int j = 0; j < 11; j++){
            if(read(fd1, &numeSectiune[j], 1) != 1){
                printf("Error5");
                close(fd1);
                return;
            }
        }

        numeSectiune[11] = '\0';
        printf("%s", numeSectiune);
        short sec_type = 0;
        if(read(fd1, &sec_type, 2) != 2){
            printf("ERROR\n");
            close(fd1);
            return;
        }

        printf(" %d ", sec_type);
        lseek(fd1, 4, SEEK_CUR);

        int sectSize = 0;
        if(read(fd1, &sectSize, 4) != 4){
            printf("ERROR\n");
            close(fd1);
            return;
        }
        printf("%d\n", sectSize);
    }
    close(fd1);
}

void extractSection(const char* path, int section_number, int line_number){

    int fd1 = open(path, O_RDONLY);
    if(fd1 == -1){
        printf("ERROR0\n");
        return;
    }

    off_t size = lseek(fd1, 0, SEEK_END);
    char MAGic[3] = " ";
    
    lseek(fd1, size - 2, SEEK_SET);
    if(read(fd1, &MAGic[0], 1) != 1){
        printf("ERROR\n");
        printf("wrong magic\n");
        close(fd1);
        return;
    }
    // printf("%c", MAGic[0]);
    
    lseek(fd1, size - 1, SEEK_SET);
    if(read(fd1, &MAGic[1], 1) != 1){
        printf("ERROR\n");
        printf("wrong magic\n");
        close(fd1);
        return;
    }
    MAGic[2] = '\0';
    // printf("%c\n", MAGic[1]);

    ///VERIFICARE MAGIC NUMBER
    if(MAGic[0] != '3' || MAGic[1] != 'E'){
        printf("ERROR\n");
        printf("wrong magic\n");
        close(fd1);
        return;
    }

    lseek(fd1, size - 4, SEEK_SET);
    short sizeSFile = 0;
    if(read(fd1, &sizeSFile, 2) != 2){
        printf("ERROR1\n");
        close(fd1);
        return;
    }

    ///SIZE FILE
    // printf("Size : %ld\n", sizeSFile);

    lseek(fd1, size - sizeSFile, SEEK_SET);
    u_int8_t version = 0;
    if(read(fd1, &version, 1) != 1){
        printf("ERROR2\n");
        close(fd1);
        return;
    }
    // printf("Version : %d\n", version);

    ///VERSION
    if(version < 42 || version > 99){
        printf("ERROR\n");
        printf("wrong version\n");
        close(fd1);
        return;
    }

    lseek(fd1, size - sizeSFile + 1, SEEK_SET);
    u_int8_t noOfSections = 0;
    if(read(fd1, &noOfSections, 1) != 1){
        printf("ERROR3\n");
        close(fd1);
        return;
    }
    // printf("Nr de sectiuni : %d\n", noOfSections);

    ///NUMAR DE SECTIUNI
    // noOfSections = 15;
    if(noOfSections != 2){
        if(noOfSections < 6 || noOfSections > 18){
            printf("ERROR\n");
            printf("wrong sect_nr\n");
            close(fd1);
            return;
        }
    }
    if(noOfSections < section_number){
        printf("ERROR\ninvalid section");
        close(fd1);
        return;
    }

    ////VERIFICARE SEC_TYPE
    lseek(fd1, size - sizeSFile + 13, SEEK_SET);
    for(int  i = 0; i < noOfSections; i++){
        short sec_type = 0;
        if(read(fd1, &sec_type, 2) != 2){
            printf("ERROR4\n");
            close(fd1);
            return;
        }
        // printf("Sect %d type : %ld\n", i, sec_type);
        if(sec_type != 48 && sec_type != 51 && sec_type != 91 && sec_type != 60 && sec_type != 43 && sec_type != 94){
            printf("ERROR\n");
            printf("wrong sect_types\n");
            close(fd1);
            return;
        }
        lseek(fd1, 19 , SEEK_CUR);
    }

    lseek(fd1, size - sizeSFile + 2, SEEK_SET);
    int deplasament = 0;
    for(int i = 0; i < section_number - 1; i ++){
        deplasament = deplasament + 21;
    }
    ///Am ajuns la inceputul datelor despre sectiunea noastra
    deplasament = deplasament + 2;
    lseek(fd1, size - sizeSFile + deplasament, SEEK_SET);
    
    int offset = 0;
    //citire offset
    lseek(fd1, size - sizeSFile + deplasament + 13, SEEK_SET);

    if(read(fd1, &offset, 4) != 4){
        printf("ERROR6");
        close(fd1);
        return;
    }
    int dimensiune = 0;
    if(read(fd1, &dimensiune, 4) != 4){
        printf("ERROR6");
        close(fd1);
        return;
    }
    lseek(fd1, offset, SEEK_SET);
    char linieDorita[dimensiune + 5];
    int contorLinie = 1;
    int scriereLinie = 0;

    // printf("Dimensiune : %d\n", dimensiune);
    for(int i = 0; i < dimensiune; i++){
        if(contorLinie == line_number){
            char c;
            if(read(fd1, &c, 1) != 1){
                printf("Error7");
                close(fd1);
                return;
            }
            // printf("%c", c);
            if(c == '\r'){
                char d;
                if(read(fd1, &d, 1) != 1){
                    printf("Error7");
                    close(fd1);
                    return;
                }
                if(d == '\n'){
                    linieDorita[scriereLinie] = '\0';
                    break;
                }
            }
            if(c == '\0'){
                linieDorita[scriereLinie] = '\0';
                break;
            }
            linieDorita[scriereLinie++] = c;
            // printf("%c", linieDorita[scriereLinie-1]);
        }else{
            char c;
            if(read(fd1, &c, 1) != 1){
                printf("Error8");
                close(fd1);
                return;
            }
            if(c == '\r'){
                char d;
                if(read(fd1, &d, 1) != 1){
                    printf("Error7");
                    close(fd1);
                    return;
                }
                if(d == '\n'){
                   contorLinie++;
                }
            }
        }
        ///pt ca avem si \0 pe final
        if(dimensiune - 2 == i){
            linieDorita[scriereLinie] = '\0';
            // printf("%s %d\n", linieDorita, scriereLinie);
            break;
        }
    }

    // linieDorita[scriereLinie] = '\0';

    if(scriereLinie == 0){
        printf("ERROR\ninvalid line\n");
        close(fd1);
        return;
    }

    printf("SUCCESS\n");
    // printf("Nr coloane : %d\n", scriereLinie);

    // printf("%s\n", linieDorita);
    // for(int i = 59; i >= 0; i--){
    //     printf("%c. ", linieDorita[scriereLinie-i]);
    // }
    // printf("\n");
    for(int i = 0; i < scriereLinie / 2; i++){
        char c = linieDorita[i];
        linieDorita[i] = linieDorita[scriereLinie - i - 1];
        linieDorita[scriereLinie - i - 1] = c;
    }  
    printf("%s\n", linieDorita);
    close(fd1);
}

void filtrareDupaSectiuni(const char*path){
    DIR *dir = NULL;
    struct dirent *entry = NULL;
    char fullPath[512];
    struct stat statbuf;

    dir = opendir(path);
    if(dir == NULL) {
       //printf("ERROR\ninvalid directory path\n");
        return;
    }
    
    while((entry = readdir(dir)) != NULL) {
        if(strcmp(entry->d_name, ".") != 0 && strcmp(entry->d_name, "..") != 0) {
            snprintf(fullPath, 512, "%s/%s", path, entry->d_name);
            if(lstat(fullPath, &statbuf) == 0) {
                if(S_ISREG(statbuf.st_mode)) {
                    //////////////

                    int fd1 = open(fullPath, O_RDONLY);
                    if(fd1 == -1){
                       // printf("ERROR\ninvalid directory path\n");
                        //closedir(dir);
                        // return;
                        continue;
                    }

                    off_t size = lseek(fd1, 0, SEEK_END);
                    char MAGic[3] = " ";
                    
                    lseek(fd1, size - 2, SEEK_SET);
                    if(read(fd1, &MAGic[0], 1) != 1){
                        //printf("ERROR\n");
                        //printf("wrong magic\n");
                        close(fd1);
                        // closedir(dir);
                        // return;
                        continue;
                    }
                    if(MAGic[0] != '3'){
                        close(fd1);
                        continue;
                    }
                    // printf("%c", MAGic[0]);
                    
                    lseek(fd1, size - 1, SEEK_SET);
                    if(read(fd1, &MAGic[1], 1) != 1){
                        //printf("ERROR\n");
                        //printf("wrong magic\n");
                        close(fd1);
                        // closedir(dir);
                        // return;
                        continue;
                    }
                    MAGic[2] = '\0';
                    // printf("%c\n", MAGic[1]);
                
                    ///VERIFICARE MAGIC NUMBER
                    if(MAGic[0] != '3' || MAGic[1] != 'E'){
                        //printf("ERROR\n");
                        //printf("wrong magic\n");
                        close(fd1);
                        //closedir(dir);
                        // return;
                        continue;
                    }
                
                    lseek(fd1, size - 4, SEEK_SET);
                    short sizeSFile = 0;
                    if(read(fd1, &sizeSFile, 2) != 2){
                       // printf("ERROR\ninvalid directory path\n");
                        close(fd1);
                        //closedir(dir);
                        //return;
                        continue;
                    }
                
                    ///SIZE FILE
                    // printf("Size : %ld\n", sizeSFile);
                
                    lseek(fd1, size - sizeSFile, SEEK_SET);
                    u_int8_t version = 0;
                    if(read(fd1, &version, 1) != 1){
                       // printf("ERROR\ninvalid directory path\n");
                        close(fd1);
                        //closedir(dir);
                        //return;
                        continue;
                    }
                    // printf("Version : %d\n", version);
                
                    ///VERSION
                    if(version < 42 || version > 99){
                        //printf("ERROR\n");
                        //printf("wrong version\n");
                        close(fd1);
                        //closedir(dir);
                        //return;
                        continue;
                    }
                
                    lseek(fd1, size - sizeSFile + 1, SEEK_SET);
                    u_int8_t noOfSections = 0;
                    if(read(fd1, &noOfSections, 1) != 1){
                        //printf("ERROR\ninvalid directory path\n");
                        close(fd1);
                        //closedir(dir);
                        //return;
                        continue;
                    }
                    // printf("Nr de sectiuni : %d\n", noOfSections);
                
                    ///NUMAR DE SECTIUNI
                    // noOfSections = 15;
                    if(noOfSections != 2){
                        if(noOfSections < 6 || noOfSections > 18){
                            //printf("ERROR\n");
                            //printf("wrong sect_nr\n");
                            close(fd1);
                            //closedir(dir);
                            //return;
                            continue;
                        }
                    }
                
                    ////VERIFICARE SEC_TYPE
                    lseek(fd1, size - sizeSFile + 13, SEEK_SET);
                    int ok = 1;
                    for(int  i = 0; i < noOfSections; i++){
                        short sec_type = 0;
                        if(read(fd1, &sec_type, 2) != 2){
                            //printf("ERROR\ninvalid directory path\n");
                            close(fd1);
                            //closedir(dir);
                            //return;
                            continue;
                        }
                        // printf("Sect %d type : %ld\n", i, sec_type);
                        if(sec_type != 48 && sec_type != 51 && sec_type != 91 && sec_type != 60 && sec_type != 43 && sec_type != 94){
                            // printf("ERROR\n");
                            // printf("wrong sect_types\n");
                            close(fd1);
                            //closedir(dir);
                            //return;
                            ok = 0;
                            break;
                            // continue;
                        }
                        lseek(fd1, 4 , SEEK_CUR);
                        int dimensiune = 0;
                        if(read(fd1, &dimensiune, 4) != 4){
                            //printf("ERROR\ninvalid directory path\n");
                            close(fd1);
                            // closedir(dir);
                            //return;
                            ok = 0;
                            break;
                            // continue;
                        }
                        if(dimensiune > 1277){
                           ok = 0;
                           break;
                        }
                        lseek(fd1, 11 , SEEK_CUR);
                    }
                    if(ok == 0){
                        close(fd1);
                        continue;
                    }
                    // printf("SUCCESS\n");
                    printf("%s\n", fullPath);
                    
                    close(fd1);
                    /////////////////                   
                }
                if(S_ISDIR(statbuf.st_mode)) {
                    filtrareDupaSectiuni(fullPath);
                } 
            }
        }
    }
    closedir(dir);
}

int main(int argc, char **argv){


    // printf("%d\n", argc);
    // for(int i = 0; i < argc; i++){
    //     printf("%s\n", argv[i]);
    // }
    // printf("%s\n", argv[3] + 12);

    
    if(strcmp(argv[1], "variant") == 0){
        afisare_varianta();
    }  

    if(strcmp(argv[1], "list") == 0){
        char stringConsola[1024] = "";  // Inițializare buffer
        int offset = 0;

        for (int i = 1; i < argc; i++) {
            offset += sprintf(stringConsola + offset, "%s ", argv[i]);
        }

    // printf("%s\n", stringConsola);  // Afișează rezultatul
        if(strstr(stringConsola, "recursive")){
            if(strstr(stringConsola, "size_smaller=")){
                char number[20];
                int nr = 13;
                char *cale1 = strstr(stringConsola, "size_smaller=");
                while(cale1[nr] != ' ' && cale1[nr] != '\0'){
                    number[nr - 13] = cale1[nr];
                    nr++;
                }
                number[nr - 13] = '\0';
                int size = atoi(number);
                // printf("%d\n", size);

                if(strstr(stringConsola, "path=")){
                    printf("SUCCESS\n");
                    char path[512];
                    nr = 5;
                    char *cale = strstr(stringConsola, "path=");
                    while(cale[nr] != ' ' && cale[nr] != '\n'){
                        path[nr - 5] = cale[nr];
                        nr++;
                    }
                    path[nr - 5] = '\0';
                    // printf("%s\n", path);
                    listRec(path, 1, 1, size, 0, NULL);
                }
            }else{
                if(strstr(stringConsola, "permissions=")){
                    char permisiuni[11];
                    int nr = 12;
                    char *cale1 = strstr(stringConsola, "permissions=");
                    while(cale1[nr] != ' ' && cale1[nr] != '\n'){
                        permisiuni[nr - 12] = cale1[nr];
                        nr++;
                    }
                    permisiuni[nr - 12] = '\0';
                    // printf("Permisiuni: %s\n", permisiuni);


                    if(strstr(stringConsola, "path=")){
                        printf("SUCCESS\n");
                        char path[512];
                        int nr = 5;
                        char *cale = strstr(stringConsola, "path=");
                        while(cale[nr] != ' ' && cale[nr] != '\n'){
                            path[nr - 5] = cale[nr];
                            nr++;
                        }
                        path[nr - 5] = '\0';
                        // printf("%s\n", path);
                        listRec(path, 1, 0, 0, 1, permisiuni);
                    }
                }else{
                    if(strstr(stringConsola, "path=")){
                        printf("SUCCESS\n");
                        char path[512];
                        int nr = 5;
                        char *cale = strstr(stringConsola, "path=");
                        while(cale[nr] != ' ' && cale[nr] != '\n'){
                            path[nr - 5] = cale[nr];
                            nr++;
                        }
                        path[nr - 5] = '\0';
                        // printf("%s\n", path);
                        listRec(path, 1, 0, 0, 0, NULL);
                    }
                }
            }
        }else{
            if(strstr(stringConsola, "size_smaller=")){
                char number[20];
                int nr = 13;
                char *cale1 = strstr(stringConsola, "size_smaller=");
                while(cale1[nr] != ' ' && cale1[nr] != '\n'){
                    number[nr - 13] = cale1[nr];
                    nr++;
                }
                number[nr - 13] = '\0';
                int size = atoi(number);
                // printf("%d\n", size);

                if(strstr(stringConsola, "path=")){
                    printf("SUCCESS\n");
                    char path[512];
                    int nr = 5;
                    char *cale = strstr(stringConsola, "path=");
                    while(cale[nr] != ' ' && cale[nr] != '\n'){
                        path[nr - 5] = cale[nr];
                        nr++;
                    }
                    path[nr - 5] = '\0';
                    // printf("%s\n", path);
                    listRec(path, 0, 1, size, 0, NULL);
                }
            }else{
                if(strstr(stringConsola, "permissions=")){
                    
                    char permisiuni[11];
                    int nr = 12;
                    char *cale1 = strstr(stringConsola, "permissions=");
                    while(cale1[nr] != ' ' && cale1[nr] != '\n'){
                        permisiuni[nr - 12] = cale1[nr];
                        nr++;
                    }
                    permisiuni[nr - 12] = '\0';
                    // printf("Permisiuni: %s\n", permisiuni);

                    if(strstr(stringConsola, "path=")){
                        printf("SUCCESS\n");
                        char path[512];
                        int nr = 5;
                        char *cale = strstr(stringConsola, "path=");
                        while(cale[nr] != ' ' && cale[nr] != '\n'){
                            path[nr - 5] = cale[nr];
                            nr++;
                        }
                        path[nr - 5] = '\0';
                        // printf("%s\n", path);
                        listRec(path, 0, 0, 0, 1, permisiuni);
                    }
                }else{
                    if(strstr(stringConsola, "path=")){
                        printf("SUCCESS\n");
                        char path[512];
                        int nr = 5;
                        char *cale = strstr(stringConsola, "path=");
                        while(cale[nr] != ' ' && cale[nr] != '\n'){
                            path[nr - 5] = cale[nr];
                            nr++;
                        }
                        path[nr - 5] = '\0';
                        // printf("%s", path);
                        listRec(path, 0, 0, 0, 0, NULL);
                    }
                }
            }
        }
    }
   
    if(strcmp(argv[1], "parse") == 0){
        if(strstr(argv[2], "path=")){
            char *cale = argv[2] + 5;
            parsare_SF(cale);
        }
    }
        
    if(strcmp(argv[1], "extract") == 0){
        if(strstr(argv[2], "path=")){
            char *path = argv[2] + 5;
            if(strstr(argv[3], "section=")){
                int nrSectiune = atoi(argv[3] + 8);
                if(strstr(argv[4], "line=")){
                    int linie = atoi(argv[4] + 5);
                    extractSection(path, nrSectiune, linie);
                }else{
                    printf("ERROR\ninvalid line\n");
                }
            }else{
                printf("ERROR\ninvalid section\n");
            }
        }else{
            printf("ERROR\ninvalid file\n");
        }
    }

    if(strcmp(argv[1], "findall") == 0){
        char *path = argv[2] + 5;
        DIR *dir = NULL;
        dir = opendir(path);
        if(dir == NULL) {
           // printf("ERROR\ninvalid directory path\n");
            return -1;
        }
        printf("SUCCESS\n");
        closedir(dir);
        filtrareDupaSectiuni(path);
    }


    // for(int i = 0; i <= argc; i++){
    //     if(argv != NULL && argv[i] != NULL)
    //         free(argv);
    // }

    return 0;
}