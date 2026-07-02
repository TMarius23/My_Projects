/* A Bison parser, made by GNU Bison 3.8.2.  */

/* Bison interface for Yacc-like parsers in C

   Copyright (C) 1984, 1989-1990, 2000-2015, 2018-2021 Free Software Foundation,
   Inc.

   This program is free software: you can redistribute it and/or modify
   it under the terms of the GNU General Public License as published by
   the Free Software Foundation, either version 3 of the License, or
   (at your option) any later version.

   This program is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   GNU General Public License for more details.

   You should have received a copy of the GNU General Public License
   along with this program.  If not, see <https://www.gnu.org/licenses/>.  */

/* As a special exception, you may create a larger work that contains
   part or all of the Bison parser skeleton and distribute that work
   under terms of your choice, so long as that work isn't itself a
   parser generator using the skeleton or a modified version thereof
   as a parser skeleton.  Alternatively, if you modify or redistribute
   the parser skeleton itself, you may (at your option) remove this
   special exception, which will cause the skeleton and the resulting
   Bison output files to be licensed under the GNU General Public
   License without this special exception.

   This special exception was added by the Free Software Foundation in
   version 2.2 of Bison.  */

/* DO NOT RELY ON FEATURES THAT ARE NOT DOCUMENTED in the manual,
   especially those whose name start with YY_ or yy_.  They are
   private implementation details that can be changed or removed.  */

#ifndef YY_YY_Y_TAB_H_INCLUDED
# define YY_YY_Y_TAB_H_INCLUDED
/* Debug traces.  */
#ifndef YYDEBUG
# define YYDEBUG 0
#endif
#if YYDEBUG
extern int yydebug;
#endif

/* Token kinds.  */
#ifndef YYTOKENTYPE
# define YYTOKENTYPE
  enum yytokentype
  {
    YYEMPTY = -2,
    YYEOF = 0,                     /* "end of file"  */
    YYerror = 256,                 /* error  */
    YYUNDEF = 257,                 /* "invalid token"  */
    WORD = 258,                    /* WORD  */
    SELECT = 259,                  /* SELECT  */
    CASE = 260,                    /* CASE  */
    WHEN = 261,                    /* WHEN  */
    THEN = 262,                    /* THEN  */
    ELSE = 263,                    /* ELSE  */
    END = 264,                     /* END  */
    FROM = 265,                    /* FROM  */
    CREATE = 266,                  /* CREATE  */
    OR = 267,                      /* OR  */
    REPLACE = 268,                 /* REPLACE  */
    TRIGGER = 269,                 /* TRIGGER  */
    PROCEDURE = 270,               /* PROCEDURE  */
    CURSOR = 271,                  /* CURSOR  */
    IS = 272,                      /* IS  */
    DECLARE = 273,                 /* DECLARE  */
    BEGINN = 274,                  /* BEGINN  */
    EXCEPTION = 275,               /* EXCEPTION  */
    OTHERS = 276,                  /* OTHERS  */
    BEFORE = 277,                  /* BEFORE  */
    AFTER = 278,                   /* AFTER  */
    INSTEAD = 279,                 /* INSTEAD  */
    OF = 280,                      /* OF  */
    ON = 281,                      /* ON  */
    FOR = 282,                     /* FOR  */
    EACH = 283,                    /* EACH  */
    ROW = 284,                     /* ROW  */
    INSERT = 285,                  /* INSERT  */
    UPDATE = 286,                  /* UPDATE  */
    DELETE = 287,                  /* DELETE  */
    INTO = 288,                    /* INTO  */
    VALUES = 289,                  /* VALUES  */
    WHERE = 290,                   /* WHERE  */
    COMMIT = 291,                  /* COMMIT  */
    OPEN = 292,                    /* OPEN  */
    FETCH = 293,                   /* FETCH  */
    CLOSE = 294,                   /* CLOSE  */
    IF = 295                       /* IF  */
  };
  typedef enum yytokentype yytoken_kind_t;
#endif
/* Token kinds.  */
#define YYEMPTY -2
#define YYEOF 0
#define YYerror 256
#define YYUNDEF 257
#define WORD 258
#define SELECT 259
#define CASE 260
#define WHEN 261
#define THEN 262
#define ELSE 263
#define END 264
#define FROM 265
#define CREATE 266
#define OR 267
#define REPLACE 268
#define TRIGGER 269
#define PROCEDURE 270
#define CURSOR 271
#define IS 272
#define DECLARE 273
#define BEGINN 274
#define EXCEPTION 275
#define OTHERS 276
#define BEFORE 277
#define AFTER 278
#define INSTEAD 279
#define OF 280
#define ON 281
#define FOR 282
#define EACH 283
#define ROW 284
#define INSERT 285
#define UPDATE 286
#define DELETE 287
#define INTO 288
#define VALUES 289
#define WHERE 290
#define COMMIT 291
#define OPEN 292
#define FETCH 293
#define CLOSE 294
#define IF 295

/* Value type.  */
#if ! defined YYSTYPE && ! defined YYSTYPE_IS_DECLARED
union YYSTYPE
{
#line 25 "fisier.y"
 char *word; 

#line 150 "y.tab.h"

};
typedef union YYSTYPE YYSTYPE;
# define YYSTYPE_IS_TRIVIAL 1
# define YYSTYPE_IS_DECLARED 1
#endif


extern YYSTYPE yylval;


int yyparse (void);


#endif /* !YY_YY_Y_TAB_H_INCLUDED  */
