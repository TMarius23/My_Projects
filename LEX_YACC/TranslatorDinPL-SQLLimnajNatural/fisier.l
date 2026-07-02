%{
    //zona de include-uri si declaratii
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "y.tab.h"

// Functie pentru a elimina ghilimelele dintr-un cuvant, daca acestea exista
// Aceasta functie verifica daca primul si ultimul caracter sunt ghilimele simple sau duble
// Daca da, aloca un nou string fara aceste ghilimele si il returneaza 
// Daca nu, returneaza o copie a stringului original

char* clean_quotes(char* str) {
    int len = strlen(str);
    if (len >= 2 && ((str[0] == '\'' && str[len-1] == '\'') || 
                     (str[0] == '"' && str[len-1] == '"'))) {
        char* new_str = (char*)malloc(len - 1);
        strncpy(new_str, str + 1, len - 2);
        new_str[len - 2] = '\0';
        return new_str;
    }
    return strdup(str); // Returneaza o copie a stringului original daca nu are ghilimele
    //strdup este o functie care aloca memorie pentru un nou string si copiaza continutul stringului original in acesta
}
%}

%%
("SELECT"|"select")         { return SELECT; } // Acest pattern recunoaste cuvintele cheie SQL indiferent de majuscule sau minuscule
("CASE"|"case")             { return CASE; } // Acest pattern recunoaste cuvantul cheie CASE, care este folosit in instructiuni SQL pentru a crea expresii conditionale
("WHEN"|"when")             { return WHEN; } // Acest pattern recunoaste cuvantul cheie WHEN, care este folosit in instructiuni SQL pentru a specifica o conditie intr-o expresie CASE
("THEN"|"then")             { return THEN; }// Acest pattern recunoaste cuvantul cheie THEN, care este folosit in instructiuni SQL pentru a specifica o actiune care trebuie luata atunci cand o conditie WHEN este adevarata
("ELSE"|"else")             { return ELSE; }// Acest pattern recunoaste cuvantul cheie ELSE, care este folosit in instructiuni SQL pentru a specifica o actiune care trebuie luata atunci cand toate conditiile WHEN sunt false
("END"|"end")               { return END; }// Acest pattern recunoaste cuvantul cheie END, care este folosit in instructiuni SQL pentru a marca sfarsitul unei expresii CASE sau a unui bloc de cod
("FROM"|"from")             { return FROM; }// Acest pattern recunoaste cuvantul cheie FROM, care este folosit in instructiuni SQL pentru a specifica tabelul sau tabelele din care se vor selecta datele

("CREATE"|"create")         { return CREATE; }// Acest pattern recunoaste cuvantul cheie CREATE, care este folosit in instructiuni SQL pentru a crea obiecte noi in baza de date, cum ar fi tabele, vizualizari sau proceduri stocate
("OR"|"or")                 { return OR; }// Acest pattern recunoaste cuvantul cheie OR, care este folosit in instructiuni SQL pentru a combina doua sau mai multe conditii intr-o instructiune WHERE sau intr-o expresie CASE
("REPLACE"|"replace")       { return REPLACE; }// Acest pattern recunoaste cuvantul cheie REPLACE, care este folosit in instructiuni SQL pentru a inlocui un obiect existent in baza de date cu unul nou
("TRIGGER"|"trigger")       { return TRIGGER; }// Acest pattern recunoaste cuvantul cheie TRIGGER, care este folosit in instructiuni SQL pentru a crea un trigger, adica o procedura stocata care se executa automat in raspuns la anumite evenimente in baza de date
("PROCEDURE"|"procedure")   { return PROCEDURE; }// Acest pattern recunoaste cuvantul cheie PROCEDURE, care este folosit in instructiuni SQL pentru a crea o procedura stocata, adica un set de instructiuni SQL care poate fi apelat de mai multe ori si care poate primi parametri
("CURSOR"|"cursor")         { return CURSOR; }// Acest pattern recunoaste cuvantul cheie CURSOR, care este folosit in instructiuni SQL pentru a crea un cursor, adica o structura de date care permite parcurgerea rezultatelor unei interogari SQL rand cu rand
("IS"|"is")                 { return IS; }// Acest pattern recunoaste cuvantul cheie IS, care este folosit in instructiuni SQL pentru a specifica o conditie de comparatie sau pentru a defini o procedura stocata sau un trigger
("DECLARE"|"declare")       { return DECLARE; }// Acest pattern recunoaste cuvantul cheie DECLARE, care este folosit in instructiuni SQL pentru a declara variabile, constante sau cursori in cadrul unei proceduri stocate sau a unui trigger

("BEGIN"|"begin")           { return BEGINN; } // Acest pattern recunoaste cuvantul cheie BEGIN, care este folosit in instructiuni SQL pentru a marca inceputul unui bloc de cod, cum ar fi o procedura stocata sau un trigger
("EXCEPTION"|"exception")   { return EXCEPTION; }// Acest pattern recunoaste cuvantul cheie EXCEPTION, care este folosit in instructiuni SQL pentru a marca inceputul unei sectiuni de tratare a exceptiilor intr-o procedura stocata sau un trigger
("OTHERS"|"others")         { return OTHERS; }// Acest pattern recunoaste cuvantul cheie OTHERS, care este folosit in instructiuni SQL pentru a specifica o actiune care trebuie luata atunci cand o exceptie nu este tratata de niciun alt handler de exceptii intr-o procedura stocata sau un trigger

("BEFORE"|"before")         { return BEFORE; } // Acest pattern recunoaste cuvantul cheie BEFORE, care este folosit in instructiuni SQL pentru a specifica ca un trigger trebuie sa se execute inainte de un eveniment specificat, cum ar fi o operatie de inserare, actualizare sau stergere pe un tabel
("AFTER"|"after")           { return AFTER; }// Acest pattern recunoaste cuvantul cheie AFTER, care este folosit in instructiuni SQL pentru a specifica ca un trigger trebuie sa se execute dupa un eveniment specificat, cum ar fi o operatie de inserare, actualizare sau stergere pe un tabel
("INSTEAD"|"instead")       { return INSTEAD; }// Acest pattern recunoaste cuvantul cheie INSTEAD, care este folosit in instructiuni SQL pentru a specifica ca un trigger trebuie sa se execute in locul unui eveniment specificat, cum ar fi o operatie de inserare, actualizare sau stergere pe un tabel
("OF"|"of")                 { return OF; }// Acest pattern recunoaste cuvantul cheie OF, care este folosit in instructiuni SQL pentru a specifica coloanele sau campurile care sunt afectate de un trigger sau de o procedura stocata
("ON"|"on")                 { return ON; }// Acest pattern recunoaste cuvantul cheie ON, care este folosit in instructiuni SQL pentru a specifica tabelul sau tabelele pe care se aplica un trigger sau o procedura stocata
("FOR"|"for")               { return FOR; }// Acest pattern recunoaste cuvantul cheie FOR, care este folosit in instructiuni SQL pentru a specifica o conditie sau o actiune care trebuie luata pentru fiecare rand afectat de un trigger sau de o procedura stocata
("EACH"|"each")             { return EACH; }// Acest pattern recunoaste cuvantul cheie EACH, care este folosit in instructiuni SQL pentru a specifica ca un trigger trebuie sa se aplice pentru fiecare rand afectat de un eveniment specificat, cum ar fi o operatie de inserare, actualizare sau stergere pe un tabel
("ROW"|"row")               { return ROW; }// Acest pattern recunoaste cuvantul cheie ROW, care este folosit in instructiuni SQL pentru a specifica ca un trigger trebuie sa se aplice pentru fiecare rand afectat de un eveniment specificat, cum ar fi o operatie de inserare, actualizare sau stergere pe un tabel

("INSERT"|"insert")         { return INSERT; }// Acest pattern recunoaste cuvantul cheie INSERT, care este folosit in instructiuni SQL pentru a insera noi randuri intr-un tabel
("UPDATE"|"update")         { return UPDATE; }// Acest pattern recunoaste cuvantul cheie UPDATE, care este folosit in instructiuni SQL pentru a actualiza valorile existente intr-un tabel
("DELETE"|"delete")         { return DELETE; }// Acest pattern recunoaste cuvantul cheie DELETE, care este folosit in instructiuni SQL pentru a sterge randuri dintr-un tabel
("INTO"|"into")             { return INTO; }// Acest pattern recunoaste cuvantul cheie INTO, care este folosit in instructiuni SQL pentru a specifica tabelul in care se vor insera datele sau pentru a specifica variabilele in care se vor stoca rezultatele unei interogari
("VALUES"|"values")         { return VALUES; }// Acest pattern recunoaste cuvantul cheie VALUES, care este folosit in instructiuni SQL pentru a specifica valorile care vor fi inserate intr-un tabel sau pentru a specifica valorile care vor fi returnate de o interogare
("WHERE"|"where")           { return WHERE; }// Acest pattern recunoaste cuvantul cheie WHERE, care este folosit in instructiuni SQL pentru a specifica o conditie de filtrare a datelor intr-o interogare sau intr-o instructiune de actualizare sau stergere
("COMMIT"|"commit")         { return COMMIT; }// Acest pattern recunoaste cuvantul cheie COMMIT, care este folosit in instructiuni SQL pentru a confirma tranzactiile efectuate asupra bazei de date, adica pentru a face permanente modificarile aduse datelor
("OPEN"|"open")             { return OPEN; }// Acest pattern recunoaste cuvantul cheie OPEN, care este folosit in instructiuni SQL pentru a deschide un cursor, adica pentru a incepe parcurgerea rezultatelor unei interogari SQL rand cu rand
("FETCH"|"fetch")           { return FETCH; }// Acest pattern recunoaste cuvantul cheie FETCH, care este folosit in instructiuni SQL pentru a prelua urmatorul rand din rezultatele unei interogari SQL atunci cand se foloseste un cursor
("CLOSE"|"close")           { return CLOSE; }// Acest pattern recunoaste cuvantul cheie CLOSE, care este folosit in instructiuni SQL pentru a inchide un cursor, adica pentru a elibera resursele asociate cu acesta dupa ce s-a terminat parcurgerea rezultatelor unei interogari SQL rand cu rand
("IF"|"if")                 { return IF; }// Acest pattern recunoaste cuvantul cheie IF, care este folosit in instructiuni SQL pentru a specifica o conditie de control al fluxului intr-o procedura stocata sau un trigger, adica pentru a executa anumite actiuni doar daca o conditie este adevarata

[a-zA-Z0-9\.\-\_\'\"\%\*\+\/\=\:\|\>]+ {
                                        yylval.word = clean_quotes(yytext); 
                                        return WORD;     
                                }
 // Acest pattern recunoaste orice secventa de caractere care contine litere, cifre, puncte, linii,
 // underscore-uri, ghilimele simple sau duble, procente, asteriscuri, plusuri, slash-uri, egaluri, doua puncte, 
 //pipe-uri sau semne mai mari. Aceste secvente sunt tratate ca identificatori sau valori in instructiunile SQL. 
 //Functia clean_quotes este apelata pentru a elimina eventualele ghilimele din aceste secvente si pentru a returna
 // un string curat care va fi stocat in yylval.word si returnat ca token WORD.

";" { return ';'; } // Acest pattern recunoaste caracterul ';', care este folosit in instructiuni SQL pentru a marca sfarsitul unei instructiuni sau pentru a separa mai multe instructiuni intr-un singur bloc de cod
"," { return ','; }// Acest pattern recunoaste caracterul ',', care este folosit in instructiuni SQL pentru a separa coloanele sau valorile intr-o lista sau pentru a separa mai multe conditii intr-o instructiune WHERE
"(" { return '('; }// Acest pattern recunoaste caracterul '(', care este folosit in instructiuni SQL pentru a grupa expresii sau pentru a delimita argumentele unei functii sau ale unui trigger
")" { return ')'; }// Acest pattern recunoaste caracterul ')', care este folosit in instructiuni SQL pentru a grupa expresii sau pentru a delimita argumentele unei functii sau ale unui trigger

[ \t\r\n]+  ; // Acest pattern recunoaste orice secventa de spatii, tab-uri, returnari de caratere sau linii noi si o ignora, adica nu returneaza niciun token pentru aceste secvente. Acest lucru permite ca instructiunile SQL sa fie formatate cu spatii si linii noi pentru a fi mai usor de citit, fara a afecta procesul de parsare a acestora.
.   ;// Acest pattern recunoaste orice alt caracter care nu a fost acoperit de celelalte pattern-uri si il ignora, adica nu returneaza niciun token pentru aceste caractere. Acest lucru permite ca instructiunile SQL sa contina caractere speciale sau neasteptate fara a afecta procesul de parsare a acestora.
