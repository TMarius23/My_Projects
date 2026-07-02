%{

// Zona de cod C, unde putem include biblioteci si defini functii auxiliare pentru a fi folosite in partea de reguli a parserului.
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Functie pentru a elimina ghilimelele dintr-un cuvant, daca acestea exista
// Aceasta functie verifica daca primul si ultimul caracter sunt ghilimele simple sau duble
// Daca da, aloca un nou string fara aceste ghilimele si il returnaza 
// Daca nu, returneaza o copie a stringului original
extern int yylex(void); // Declaratia functiei yylex, care va fi definita in fisier.l
void yyerror(char *s);// Declaratia functiei yyerror, care va fi apelata in caz de eroare de parsare


// Functie pentru a concatena doua stringuri, alocand memorie pentru rezultatul concatenarii
// Aceasta functie aloca suficienta memorie pentru a stoca ambele stringuri si caracterul null de terminare, apoi copiaza primul
// string in rezultat si adauga al doilea string la final
// Este responsabilitatea apelantului sa elibereze memoria alocata de aceasta functie dupa ce a terminat de folosit stringul rezultat
char* concat(const char* s1, const char* s2) {
    char* result = malloc(strlen(s1) + strlen(s2) + 1);
    strcpy(result, s1);
    strcat(result, s2);
    return result;
}

// Functie pentru a concatena trei stringuri, alocand memorie pentru rezultatul concatenarii
// Aceasta functie aloca suficienta memorie pentru a stoca toate cele trei stringuri
// si caracterul null de terminare, apoi copiaza primul string in rezultat, adauga al doilea string la final si apoi al treilea string
// Este responsabilitatea apelantului sa elibereze memoria alocata de aceasta functie dupa ce a terminat de folosit stringul rezultat
// Aceasta functie este utila pentru a construi mesaje mai complexe care necesita concatenarea a trei parti diferite, 
//cum ar fi o introducere, un corp si o concluzie
char* concat3(const char* s1, const char* s2, const char* s3) {
    char* result = malloc(strlen(s1) + strlen(s2) + strlen(s3) + 1);
    strcpy(result, s1);
    strcat(result, s2);
    strcat(result, s3);
    return result;
}
%}

%union { char *word; } // Definirea tipului de date pentru valorile returnate de tokeni si non-terminali. In acest caz, folosim un pointer la char pentru a stoca cuvinte sau mesaje generate in timpul parsarii.

%start program // Specifica punctul de intrare al parserului, adica simbolul de start. In acest caz, program este simbolul de start care va reprezenta intregul program parsabil.
%token <word> WORD  // Definirea tokenului WORD, care va fi folosit pentru a reprezenta cuvinte sau identificatori in limbajul nostru. Acest token va avea asociat un atribut de tip char* (definit in %union) care va stoca valoarea cuvantului respectiv.
%token SELECT CASE WHEN THEN ELSE END FROM // Definirea tokenilor pentru cuvintele cheie SQL pe care le vom recunoaste in limbajul nostru. Acesti tokeni vor fi returnati de lexer atunci cand intalneste aceste cuvinte in input.
%token CREATE OR REPLACE TRIGGER PROCEDURE CURSOR IS DECLARE BEGINN EXCEPTION OTHERS // Definirea tokenilor pentru alte cuvinte cheie SQL relevante pentru declansatoare (triggers) si proceduri stocate (stored procedures), precum si pentru structura generala a unui bloc de cod PL/SQL.
%token BEFORE AFTER INSTEAD OF ON FOR EACH ROW // Definirea tokenilor pentru a specifica momentul declansarii unui trigger (BEFORE, AFTER, INSTEAD OF), pentru a indica tabelul pe care se aplica triggerul (ON) si pentru a specifica daca triggerul se aplica pentru fiecare rand modificat sau o singura data pentru intreaga tranzactie (FOR EACH ROW).
%token INSERT UPDATE DELETE INTO VALUES WHERE COMMIT OPEN FETCH CLOSE IF // Definirea tokenilor pentru operatiuni SQL comune (INSERT, UPDATE, DELETE), pentru a specifica tabelul tinta al unei operatiuni (INTO), pentru a introduce valorile de inserat (VALUES), pentru a specifica conditii de filtrare (WHERE), pentru a salva tranzactia (COMMIT) si pentru a controla fluxul de executie (IF).
%type <word> instruction program // Definirea tipului de date pentru non-terminalii instruction si program, care vor avea asociat un atribut de tip char* pentru a stoca mesajele generate in timpul parsarii.
%type <word> select_stmt case_stmt when_list // Definirea tipului de date pentru non-terminalii specifici pentru instructiuni SELECT, care vor avea asociat un atribut de tip char* pentru a stoca mesajele generate in timpul parsarii acestor constructii.
%type <word> trigger_stmt trigger_time trigger_event single_event for_each_row // Definirea tipului de date pentru non-terminalii specifici pentru declansatoare (triggers), care vor avea asociat un atribut de tip char* pentru a stoca mesajele generate in timpul parsarii acestor constructii.
%type <word> procedure_stmt block exception_block statements statement cursor_def // Definirea tipului de date pentru non-terminalii specifici pentru proceduri stocate (stored procedures) si blocuri de cod PL/SQL, care vor avea asociat un atribut de tip char* pentru a stoca mesajele generate in timpul parsarii acestor constructii.

%%
// Zona de reguli a parserului, unde definim cum se combina tokenii si non-terminalii pentru a forma constructii valide in 
// limbajul nostru, si ce actiuni sa se execute atunci cand aceste constructii sunt recunoscute.
// Fiecare regula are forma: non-terminal : productie { actiune } ;
// unde productie este o combinatie de tokeni si/sau non-terminali, iar actiune este un bloc de cod C care se executa 
// atunci cand aceasta productie este recunoscuta in input. In actiune, putem accesa valorile atributelor asociate tokenilor 
// si non-terminalilor folosind $1, $2, etc. pentru a construi mesajele sau rezultatele dorite.

program : instruction { 
            printf("--- TRADUCERE IN LIMBAJ NATURAL ---\n%s\n\n", $1); 
        }
        ;

// Instructiunea poate fi fie un select_stmt, fie un trigger_stmt, fie un procedure_stmt.
//  Atunci cand recunoastem una dintre aceste constructii,
instruction : select_stmt    { $$ = $1; }
            | trigger_stmt   { $$ = $1; }
            | procedure_stmt { $$ = $1; }
            ;


// Regula pentru instructiunea SELECT, care poate avea doua forme: una cu o conditie CASE si una fara.
// Atunci cand recunoastem o instructiune SELECT, construim un mesaj care descrie ce coloana se extrage, 
// din ce tabel si, daca exista, ce conditie se evalueaza pe acea coloana.

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

// Regula pentru constructia CASE, care specifica o conditie pe o coloana si ce rezultate se obtin in functie de valorile acelei coloane.
// Atunci cand recunoastem o constructie CASE, construim un mesaj care descrie ce conditie se evalueaza pe ce coloana,
// ce rezultate se obtin pentru valorile specificate in lista de WHEN, si ce rezultat se obtine in orice alt caz (ELSE).
case_stmt : CASE WORD when_list ELSE WORD ';' END {
                char buffer[2000];
                sprintf(buffer, "o conditie pe coloana '%s': %s, iar in orice alt caz va fi '%s'", $2, $3, $5);
                $$ = strdup(buffer);
            }
            ;

// Regula pentru lista de WHEN, care specifica ce rezultate se obtin pentru valorile specificate pe coloana din constructia CASE.
// Atunci cand recunoastem o lista de WHEN, construim un mesaj care descrie ce rezultat se obtine pentru fiecare valoare specificata in lista.
// Aceasta regula este recursiva, deoarece o lista de WHEN poate contine alta lista de WHEN, permitand astfel specificarea a mai multe conditii si rezultate.
// Atunci cand recunoastem o lista de WHEN, concatenam mesajele generate pentru fiecare conditie si rezultat specificat, astfel incat sa
// obtinem un mesaj complet care descrie toate conditiile si rezultatele din constructia CASE.
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

// Regula pentru declansatoare (triggers), care specifica cum se creeaza sau inlocuieste un trigger, cand se declanseaza, ce 
// operatiuni monitorizeaza, pe ce tabel se aplica si ce logica are.
// Atunci cand recunoastem o instructiune de creare sau inlocuire a unui trigger, construim un mesaj care descrie ce se intampla:
// se creeaza sau inlocuieste un trigger cu un anumit nume, care se va executa inainte, dupa sau in locul unei operatiuni de inserare, actualizare sau stergere asupra unui tabel specific,
// si care poate fi aplicat pentru fiecare rand modificat sau o singura data pentru intreaga tranzactie. De asemenea, includem in mesaj logica specificata in blocul de cod al triggerului.

trigger_stmt : CREATE OR REPLACE TRIGGER WORD trigger_time trigger_event ON WORD for_each_row block {
                char buffer[2000];
                sprintf(buffer, "Se creeaza (sau inlocuieste) declansatorul (trigger) numit '%s', care se va executa %s operatiunii de %s asupra tabelului '%s', %s. \nLogica acestuia este urmatoarea: %s", 
                        $5, $6, $7, $9, $10, $11);
                $$ = strdup(buffer);
             }
             ;


// Regula pentru momentul declansarii triggerului, care poate fi inainte (BEFORE), dupa (AFTER) sau in locul (INSTEAD OF) unei operatiuni monitorizate.
// Atunci cand recunoastem momentul declansarii unui trigger, construim un mesaj care descrie acest moment in termeni simpli, astfel incat sa fie usor de inteles pentru cineva care nu este familiarizat cu terminologia SQL.
// De exemplu, daca triggerul se declanseaza inainte de o operatiune, mesajul va spune "inainte de", daca se declanseaza dupa o 
// operatiune, mesajul va spune "dupa", iar daca se declanseaza in locul unei operatiuni, mesajul va spune "in loc de".
// Aceasta regula ne ajuta sa traducem conceptele tehnice legate de triggeri intr-un limbaj natural, astfel incat sa fie mai usor de inteles 
// pentru utilizatori sau pentru a explica logica unui trigger intr-un mod mai accesibil.

trigger_time : BEFORE     { $$ = strdup("inainte de"); }
             | AFTER      { $$ = strdup("dupa"); }
             | INSTEAD OF { $$ = strdup("in loc de"); }
             ;

// Regula pentru evenimentele care declanseaza triggerul, care pot fi operatiuni de inserare (INSERT), actualizare (UPDATE) sau stergere (DELETE).
// Atunci cand recunoastem evenimentele care declanseaza un trigger, construim un mesaj care descrie aceste evenimente intr-un limbaj 
// natural, astfel incat sa fie usor de inteles pentru cineva care nu este familiarizat cu terminologia SQL.
// Daca triggerul monitorizeaza doar un singur eveniment, mesajul va spune "operatiunea de inserare", "operatiunea de actualizare" sau 
// "operatiunea de stergere", in functie de evenimentul specificat.
// Daca triggerul monitorizeaza mai multe evenimente (de exemplu, atat inserari cat si actualizari), mesajul va spune "operatiunea de 
// inserare sau operatiunea de actualizare", astfel incat sa fie clar ca triggerul se declanseaza pentru oricare dintre aceste evenimente.
trigger_event : single_event { $$ = $1; }
              | trigger_event OR single_event { $$ = concat3($1, " sau ", $3); }
              ;


// Regula pentru evenimentele individuale care declanseaza triggerul, care pot fi operatiuni de inserare (INSERT), actualizare (UPDATE) sau stergere (DELETE).
// Atunci cand recunoastem un eveniment individual care declanseaza un trigger, construim un mesaj care descrie acest eveniment intr-un limbaj
// natural, astfel incat sa fie usor de inteles pentru cineva care nu este familiarizat cu terminologia SQL.
// Daca evenimentul este o operatiune de inserare, mesajul va spune "operatiunea de inserare", daca evenimentul este o operatiune de
// actualizare, mesajul va spune "operatiunea de actualizare", iar daca evenimentul este o operatiune de stergere, mesajul va spune "operatiunea de stergere".
single_event  : INSERT { $$ = strdup("inserare"); }
              | UPDATE { $$ = strdup("actualizare"); }
              | DELETE { $$ = strdup("stergere"); }
              ;

// Regula pentru specificarea daca triggerul se aplica pentru fiecare rand modificat sau o singura data pentru intreaga tranzactie.
// Atunci cand recunoastem specificarea pentru aplicarea unui trigger, construim un mesaj care descrie acest aspect intr-un limbaj natural, 
// astfel incat sa fie usor de inteles pentru cineva care nu este familiarizat cu terminologia SQL.
// Daca triggerul se aplica pentru fiecare rand modificat, mesajul va spune "aplicandu-se individual pentru fiecare rand modificat", 
// ceea ce inseamna ca triggerul se va declansa o data pentru fiecare rand care este inserat, actualizat sau sters in tabelul monitorizat.
// Daca triggerul se aplica o singura data pentru intreaga tranzactie, mesajul va spune "aplicandu-se o singura data pentru toata
// tranzactia", ceea ce inseamna ca triggerul se va declansa o singura data, indiferent de cate randuri sunt inserate, actualizate 
// sau sterse in tabelul monitorizat in cadrul aceleiasi tranzactii.
for_each_row : FOR EACH ROW { $$ = strdup("aplicandu-se individual pentru fiecare rand modificat"); }
             | /* empty */  { $$ = strdup("aplicandu-se o singura data pentru toata tranzactia"); }
             ;

// Regula pentru proceduri stocate (stored procedures), care specifica cum se creeaza sau inlocuieste o procedura, ce parametri
// primeste, ce cursor declara, ce bloc de cod executa si ce modul de exceptii are.
// Atunci cand recunoastem o instructiune de creare sau inlocuire a unei proceduri, construim un mesaj care descrie ce se intampla:
// se creeaza sau inlocuieste o procedura cu un anumit nume, care primeste un parametru de un anumit tip, care poate declara un cursor
// pentru a extrage date dintr-un tabel, care executa un bloc de cod PL/SQL cu anumite instructiuni, si care are un modul de exceptii 
//pentru a gestiona erorile care pot aparea in timpul executiei.
// In mesajul generat, includem detalii despre numele procedurii, numele parametrului si tipul acestuia, logica specificata in blocul
// de cod al procedurii, precum si detalii despre cursorul declarat (daca exista) si modul de exceptii (daca exista).
// Aceasta regula ne ajuta sa traducem conceptele tehnice legate de proceduri stocate intr-un limbaj natural, astfel incat sa fie 
//mai usor de inteles pentru utilizatori sau pentru a explica logica unei proceduri intr-un mod mai accesibil.

procedure_stmt : CREATE OR REPLACE PROCEDURE WORD '(' WORD WORD ')' IS cursor_def block exception_block {
                    char buffer[2000];
                    sprintf(buffer, "Se defineste procedura '%s' care primeste parametrul '%s' (de tip '%s').\n%s \nIn interior: %s \n%s", 
                            $5, $7, $8, $11, $12, $13);
                    $$ = strdup(buffer);
                }
               ;


// Regula pentru declararea unui cursor, care specifica cum se declara un cursor pentru a extrage date dintr-un tabel, si 
// ce conditie se aplica pentru extragerea acestor date.
// Atunci cand recunoastem o declarare de cursor, construim un mesaj care descrie acest aspect intr-un limbaj natural, astfel 
// incat sa fie usor de inteles pentru cineva care nu este familiarizat cu terminologia SQL.
// Daca se declara un cursor, mesajul va spune "Se declara un cursor 'nume_cursor' care extrage 'coloana' din 'tabel' conditionat de 
//'coloana_conditie operator valoare'.", unde nume_cursor este numele cursorului declarat, coloana este coloana pe care o extrage
//  cursorul, tabel este tabelul din care extrage datele, coloana_conditie este coloana pe care se aplica conditia, operator
// este operatorul de comparatie (de exemplu, '=', '<', '>') si valoare este valoarea cu care se compara coloana_conditie pentru a
// filtra datele extrase de cursor.
cursor_def : CURSOR WORD IS SELECT WORD FROM WORD WHERE WORD WORD ';' {
                char buffer[1000];
                sprintf(buffer, "Se declara un cursor '%s' care extrage '%s' din '%s' conditionat de '%s %s'.", $2, $5, $7, $9, $10);
                $$ = strdup(buffer);
             }
           | /* empty */ { $$ = strdup(""); }
           ;


// Regula pentru blocurile de cod PL/SQL, care specifica cum se declara variabile, ce instructiuni se executa in interiorul blocului si ce modul de exceptii are.
// Atunci cand recunoastem un bloc de cod PL/SQL, construim un mesaj care descrie acest aspect intr-un limbaj natural, astfel incat sa fie usor 
// de inteles pentru cineva care nu este familiarizat cu terminologia SQL.
// Daca blocul de cod contine o declarare de variabile, mesajul va include informatii despre numele variabilei si tipul acesteia, precum 
// si instructiunile care se executa in interiorul blocului. Daca blocul de cod nu contine o declarare de variabile, mesajul va include doar instructiunile care se executa in interiorul blocului. 
// De asemenea, daca blocul de cod contine un modul de exceptii, mesajul va include informatii despre acest modul si ce se intampla in cazul aparitiei unei erori.
block : DECLARE WORD WORD ';' BEGINN statements END ';' {
            char buffer[2000];
            sprintf(buffer, "Se declara variabila '%s' (tip '%s'). Apoi se executa urmatoarele: \n%s", $2, $3, $6);
            $$ = strdup(buffer);
        }
      | BEGINN statements END ';' {
            $$ = concat("Se executa urmatoarele: \n", $2);
        }
      ;


// Regula pentru lista de instructiuni care se executa in interiorul unui bloc de cod PL/SQL, care specifica ce instructiuni se executa si in ce ordine.
// Atunci cand recunoastem o lista de instructiuni, construim un mesaj care descrie aceste instructiuni intr-un limbaj natural, astfel 
//incat sa fie usor de inteles pentru cineva care nu este familiarizat cu terminologia SQL.
// Daca lista de instructiuni contine o singura instructiune, mesajul va include doar acea instructiune. Daca lista de instructiuni 
// contine mai multe instructiuni, mesajul va include toate aceste instructiuni, separate prin linii noi, astfel incat sa fie clar ca acestea se executa in ordine.
statements : statement { $$ = $1; }
           | statements statement { $$ = concat3($1, "\n", $2); }
           ;


// Regula pentru instructiunile individuale care se executa in interiorul unui bloc de cod PL/SQL, care pot fi operatiuni de manipulare
// a datelor (OPEN, FETCH, CLOSE), control al tranzactiilor (COMMIT), manipulare a datelor (INSERT) sau control al fluxului de executie (IF).
// Atunci cand recunoastem o instructiune individuala, construim un mesaj care descrie aceasta instructiune intr-un limbaj natural, 
// astfel incat sa fie usor de inteles pentru cineva care nu este familiarizat cu terminologia SQL.
// Pentru fiecare tip de instructiune, mesajul va include detalii relevante despre ceea ce se intampla in timpul executiei acestei 
// instructiuni. De exemplu, pentru o instructiune OPEN, mesajul va spune "Se deschide cursorul 'nume_cursor'.", pentru o instructiune 
// FETCH, mesajul va spune "Se preia un rand din cursorul 'nume_cursor' in variabila 'nume_variabila'.", pentru o instructiune CLOSE, 
// mesajul va spune "Se inchide cursorul 'nume_cursor'.", pentru o instructiune COMMIT, mesajul va spune "Se salveaza tranzactia in baza
// de date (COMMIT).", pentru o instructiune INSERT, mesajul va spune "Se insereaza in tabelul 'nume_tabel' valorile ('valoare1', 'valoare2') 
// pe coloanele ('coloana1', 'coloana2').", iar pentru o instructiune IF, mesajul va spune "Daca [conditie], atunci se executa operatiunea: [operatiune].".
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


// Regula pentru modulul de exceptii, care specifica ce se intampla in cazul aparitiei unei erori in timpul executiei unui bloc de cod PL/SQL.
// Atunci cand recunoastem un modul de exceptii, construim un mesaj care descrie acest aspect intr-un limbaj natural, astfel incat sa 
// fie usor de inteles pentru cineva care nu este familiarizat cu terminologia SQL.
// Daca modulul de exceptii specifica o actiune pentru orice eroare (WHEN OTHERS), mesajul va spune "La final, sistemul are un modul de 
// exceptii: daca apare orice eroare, se apeleaza 'actiune'.", unde actiune este ceea ce se specifica in blocul de exceptii pentru a 
// gestiona erorile. Daca nu exista un modul de exceptii, mesajul va fi gol, indicand ca nu exista o gestionare specifica a erorilor in blocul de cod.
exception_block : EXCEPTION WHEN OTHERS THEN WORD ';' END ';' {
                    char b[500];
                    sprintf(b, "La final, sistemul are un modul de exceptii: daca apare orice eroare, se apeleaza '%s'.", $5);
                    $$ = strdup(b);
                }
                | /* empty */ { $$ = strdup(""); }
                ;

%%

// Zona de cod C, unde putem defini functia yyerror pentru a afisa mesaje de eroare in caz de parsare esuata, functia yywrap pentru 
// a indica sfarsitul inputului si functia main pentru a porni procesul de parsare.
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