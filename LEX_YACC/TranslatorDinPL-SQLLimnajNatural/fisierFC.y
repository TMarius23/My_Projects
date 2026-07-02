%{
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

extern int yylex(void);
void yyerror(char *s);

char* concat(const char* s1, const char* s2) {
    char* result = malloc(strlen(s1) + strlen(s2) + 1);
    strcpy(result, s1);
    strcat(result, s2);
    return result;
}

char* concat3(const char* s1, const char* s2, const char* s3) {
    char* result = malloc(strlen(s1) + strlen(s2) + strlen(s3) + 1);
    strcpy(result, s1);
    strcat(result, s2);
    strcat(result, s3);
    return result;
}
%}

%union { char *word; }

%start program
%token <word> WORD 
%token SELECT CASE WHEN THEN ELSE END FROM 
%token CREATE OR REPLACE TRIGGER PROCEDURE CURSOR IS DECLARE BEGINN EXCEPTION OTHERS 
%token BEFORE AFTER INSTEAD OF ON FOR EACH ROW 
%token INSERT UPDATE DELETE INTO VALUES WHERE COMMIT OPEN FETCH CLOSE IF
%type <word> instruction program
%type <word> select_stmt case_stmt when_list
%type <word> trigger_stmt trigger_time trigger_event single_event for_each_row
%type <word> procedure_stmt block exception_block statements statement cursor_def

%%

program : instruction { 
            printf("--- TRADUCERE IN LIMBAJ NATURAL ---\n%s\n\n", $1); 
        }
        ;

instruction : select_stmt    { $$ = $1; }
            | trigger_stmt   { $$ = $1; }
            | procedure_stmt { $$ = $1; }
            ;


select_stmt : SELECT WORD ',' case_stmt FROM WORD ';' {
                char buffer[2000];
                sprintf(buffer, "Se extrage coloana '%s' si se evalueaza %s din tabelul '%s'.", $2, $4, $6);
                $$ = strdup(buffer);
            }
            | SELECT WORD FROM WORD ';' {
                char buffer[1000];
                sprintf(buffer, "Se extrage coloana '%s' din tabelul '%s'.", $2, $4);
                $$ = strdup(buffer);
            }
            ;

case_stmt : CASE WORD when_list ELSE WORD ';' END {
                char buffer[2000];
                sprintf(buffer, "o conditie pe coloana '%s': %s, iar in orice alt caz va fi '%s'", $2, $3, $5);
                $$ = strdup(buffer);
            }
            ;

when_list : WHEN WORD THEN WORD ';' {
                char buffer[500];
                sprintf(buffer, "daca valoarea este '%s' atunci rezultatul e '%s'", $2, $4);
                $$ = strdup(buffer);
            }
          | when_list WHEN WORD THEN WORD ';' {
                char buffer[1000];
                sprintf(buffer, "%s; daca valoarea este '%s' atunci rezultatul e '%s'", $1, $3, $5);
                $$ = strdup(buffer);
            }
          ;

trigger_stmt : CREATE OR REPLACE TRIGGER WORD trigger_time trigger_event ON WORD for_each_row block {
                char buffer[2000];
                sprintf(buffer, "Se creeaza (sau inlocuieste) declansatorul (trigger) numit '%s', care se va executa %s operatiunii de %s asupra tabelului '%s', %s. \nLogica acestuia este urmatoarea: %s", 
                        $5, $6, $7, $9, $10, $11);
                $$ = strdup(buffer);
             }
             ;

trigger_time : BEFORE     { $$ = strdup("inainte de"); }
             | AFTER      { $$ = strdup("dupa"); }
             | INSTEAD OF { $$ = strdup("in loc de"); }
             ;

trigger_event : single_event { $$ = $1; }
              | trigger_event OR single_event { $$ = concat3($1, " sau ", $3); }
              ;

single_event  : INSERT { $$ = strdup("inserare"); }
              | UPDATE { $$ = strdup("actualizare"); }
              | DELETE { $$ = strdup("stergere"); }
              ;

for_each_row : FOR EACH ROW { $$ = strdup("aplicandu-se individual pentru fiecare rand modificat"); }
             | /* empty */  { $$ = strdup("aplicandu-se o singura data pentru toata tranzactia"); }
             ;


procedure_stmt : CREATE OR REPLACE PROCEDURE WORD '(' WORD WORD ')' IS cursor_def block exception_block {
                    char buffer[2000];
                    sprintf(buffer, "Se defineste procedura '%s' care primeste parametrul '%s' (de tip '%s').\n%s \nIn interior: %s \n%s", 
                            $5, $7, $8, $11, $12, $13);
                    $$ = strdup(buffer);
                }
               ;

cursor_def : CURSOR WORD IS SELECT WORD FROM WORD WHERE WORD WORD ';' {
                char buffer[1000];
                sprintf(buffer, "Se declara un cursor '%s' care extrage '%s' din '%s' conditionat de '%s %s'.", $2, $5, $7, $9, $10);
                $$ = strdup(buffer);
             }
           | /* empty */ { $$ = strdup(""); }
           ;

block : DECLARE WORD WORD ';' BEGINN statements END ';' {
            char buffer[2000];
            sprintf(buffer, "Se declara variabila '%s' (tip '%s'). Apoi se executa urmatoarele: \n%s", $2, $3, $6);
            $$ = strdup(buffer);
        }
      | BEGINN statements END ';' {
            $$ = concat("Se executa urmatoarele: \n", $2);
        }
      ;

statements : statement { $$ = $1; }
           | statements statement { $$ = concat3($1, "\n", $2); }
           ;

statement : OPEN WORD ';' { 
                char b[200]; sprintf(b, "  - Se deschide cursorul '%s'.", $2); $$ = strdup(b); 
            }
          | FETCH WORD INTO WORD ';' { 
                char b[200]; sprintf(b, "  - Se preia un rand din cursorul '%s' in variabila '%s'.", $2, $4); $$ = strdup(b); 
            }
          | CLOSE WORD ';' { 
                char b[200]; sprintf(b, "  - Se inchide cursorul '%s'.", $2); $$ = strdup(b); 
            }
          | COMMIT ';' { 
                $$ = strdup("  - Se salveaza tranzactia in baza de date (COMMIT)."); 
            }
          | INSERT INTO WORD '(' WORD ',' WORD ')' VALUES '(' WORD ',' WORD ')' ';' {
                char b[500]; sprintf(b, "  - Se insereaza in tabelul '%s' valorile ('%s', '%s') pe coloanele ('%s', '%s').", $3, $11, $13, $5, $7); 
                $$ = strdup(b); 
            }
          | IF WORD THEN WORD ';' END IF ';' {
                char b[500]; sprintf(b, "  - Daca [%s], atunci se executa operatiunea: [%s].", $2, $4);
                $$ = strdup(b); 
            }
          ;

exception_block : EXCEPTION WHEN OTHERS THEN WORD ';' END ';' {
                    char b[500];
                    sprintf(b, "La final, sistemul are un modul de exceptii: daca apare orice eroare, se apeleaza '%s'.", $5);
                    $$ = strdup(b);
                }
                | /* empty */ { $$ = strdup(""); }
                ;

%%

void yyerror(char *s) {
    fprintf(stderr, "\nEROARE DE PARSARE: %s\n", s);
}

int yywrap(void) {
    return 1;
}

int main(int argc, char **argv) {    
    if(yyparse() == 0) {
        printf("Parsing finalizat cu succes!\n");
    } else {
        printf("Parsing esuat.\n");
    }
    
    return 0;
}