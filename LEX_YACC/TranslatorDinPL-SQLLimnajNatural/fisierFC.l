%{
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "y.tab.h"

char* clean_quotes(char* str) {
    int len = strlen(str);
    if (len >= 2 && ((str[0] == '\'' && str[len-1] == '\'') || 
                     (str[0] == '"' && str[len-1] == '"'))) {
        char* new_str = (char*)malloc(len - 1);
        strncpy(new_str, str + 1, len - 2);
        new_str[len - 2] = '\0';
        return new_str;
    }
    return strdup(str);
}
%}

%%
("SELECT"|"select")         { return SELECT; } 
("CASE"|"case")             { return CASE; }
("WHEN"|"when")             { return WHEN; }
("THEN"|"then")             { return THEN; }
("ELSE"|"else")             { return ELSE; }
("END"|"end")               { return END; }
("FROM"|"from")             { return FROM; }

("CREATE"|"create")         { return CREATE; }
("OR"|"or")                 { return OR; }
("REPLACE"|"replace")       { return REPLACE; }
("TRIGGER"|"trigger")       { return TRIGGER; }
("PROCEDURE"|"procedure")   { return PROCEDURE; }
("CURSOR"|"cursor")         { return CURSOR; }
("IS"|"is")                 { return IS; }
("DECLARE"|"declare")       { return DECLARE; }

("BEGIN"|"begin")           { return BEGINN; }
("EXCEPTION"|"exception")   { return EXCEPTION; }
("OTHERS"|"others")         { return OTHERS; }

("BEFORE"|"before")         { return BEFORE; }
("AFTER"|"after")           { return AFTER; }
("INSTEAD"|"instead")       { return INSTEAD; }
("OF"|"of")                 { return OF; }
("ON"|"on")                 { return ON; }
("FOR"|"for")               { return FOR; }
("EACH"|"each")             { return EACH; }
("ROW"|"row")               { return ROW; }

("INSERT"|"insert")         { return INSERT; }
("UPDATE"|"update")         { return UPDATE; }
("DELETE"|"delete")         { return DELETE; }
("INTO"|"into")             { return INTO; }
("VALUES"|"values")         { return VALUES; }
("WHERE"|"where")           { return WHERE; }
("COMMIT"|"commit")         { return COMMIT; }
("OPEN"|"open")             { return OPEN; }
("FETCH"|"fetch")           { return FETCH; }
("CLOSE"|"close")           { return CLOSE; }
("IF"|"if")                 { return IF; }

[a-zA-Z0-9\.\-\_\'\"\%\*\+\/\=\:\|\>]+ {
                                        yylval.word = clean_quotes(yytext); 
                                        return WORD;     
                                }


";" { return ';'; } 
"," { return ','; }
"(" { return '('; }
")" { return ')'; }

[ \t\r\n]+  ; 
.   ;
