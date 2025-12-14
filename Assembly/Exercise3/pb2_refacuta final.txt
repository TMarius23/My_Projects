.386
.model flat, stdcall
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

;includem msvcrt.lib, si declaram ce functii vrem sa importam
includelib msvcrt.lib
extern scanf: proc
extern printf: proc
extern fread: proc
extern fopen: proc
extern fclose: proc
extern fprintf: proc
extern exit: proc
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

;declaram simbolul start ca public - de acolo incepe executia
public start
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

;sectiunile programului, date, respectiv cod
.data

format_scanf db "%d" ,0
format db "%d " ,0
msg_eroare db "Sirul nu e multime, ERROR!!!" ,0
msg_nu_error db "Sirul e multime",13,10,0
format1 db "%d", 13,10 ,0
format2 db  13,10 ,0
format3_edi db "[%d]:", 0
afisare_nr1 db "%d :", 0
afisare_nr2 db "%d",13,10, 0
format_spa db 0, 13,10,13,10

 
A dd 100 dup(0)
B dd 100 dup(0)
D dd 200 dup(0)

nr_a dd 0
nr_b dd 0
nr_d dd 0

cna dd 0
cnb dd 0
cnd dd 0

elem_a dd 0
elem_b dd 0

nr_a_nou dd 0
nr_b_nou dd 0

.code


afisare_elem_str proc

	mov edi, [esp + 4]
	mov ebx, 0
	afisare_loop1:
	cmp edi, 0
	je out_afisare_loop1
	
	
	push D[ebx]
	push offset format
	call printf
	add esp, 8
	
	add ebx, 4
	dec edi
	
	jmp afisare_loop1
	out_afisare_loop1:
	
	ret
afisare_elem_str endp


inmultire_X4 proc

	mov eax, [esp + 4]
	mov ebx, 4
	mul ebx
	
	ret
inmultire_X4 endp

start:
	

	push offset nr_a
	push offset format_scanf
	call scanf
	add esp, 8
	
	;push nr_a
	;push offset format1
	;call printf
	
	mov ebx, nr_a
	mov edi, 0
	
	
	;;;;;;;;
	;;;;citire elem a
	;;;;;;;;
	
	
	ele_a_loop:
	
	push offset elem_a
	push offset format_scanf
	call scanf
	add esp, 8
	
	mov eax, elem_a
	
	mov A[edi], eax
	
	;push A[edi]
	;push offset format1
	;call printf
	
	
	add edi, 4
	sub ebx, 1

	cmp ebx, 0
	je out_a
	
	jmp ele_a_loop
	out_a:
	
	;;;;;;;;;;;;;;;
	;;;;;;;;print a
	;;;;;;;;;;;;;;;
	
	push offset format_spa
	call printf
	add esp, 4
	
	push nr_a
	push offset format1
	call printf
	add esp, 8
	
	mov ebx, nr_a
	mov edi, 0
	ele_a_loop_print:
	
	push A[edi]
	push offset format
	call printf
	add esp, 8
	
	add edi, 4
	sub ebx, 1
	
	
	cmp ebx, 0
	je out_a_print
	
	jmp ele_a_loop_print
	out_a_print:
	
	
	push offset nr_b
	push offset format_scanf
	call scanf
	add esp, 8
	
	mov ebx, nr_b
	mov edi, 0
	
	
	;;;;;;;;
	;;;;citire elem b
	;;;;;;;;
	
	
	ele_b_loop:
	
	push offset elem_b
	push offset format_scanf
	call scanf
	add esp, 8
	
	mov eax, elem_b
	
	mov B[edi], eax
	
	add edi, 4
	sub ebx, 1

	cmp ebx, 0
	jne ele_b_loop
	
	

	;;;;;;;;;;;;;
	;;;;;;;;print b
	;;;;;;;;;;;;;
	
	
	push offset format_spa
	call printf
	add esp, 4
	
	push nr_b
	push offset format1	
	call printf
	add esp, 8
	
	mov ebx, nr_b
	mov edi, 0
	ele_b_loop_print:
	
	push B[edi]
	push offset format
	call printf
	add esp, 8
	
	add edi, 4
	sub ebx, 1
	
	
	cmp ebx, 0
	jne ele_b_loop_print
	
	

	push offset format_spa
	call printf
	add esp, 4
	
	;;;;;;;;;;;;;
	;;;;;;;;;;;;;
	;;;intercalsare string-uri
	;;;;;;;;;;;;
	;;;;;;;;;;;;
	
	mov eax, nr_a
	mov cna, eax
	
	mov eax, nr_b 
	mov cnb, eax
	
	push offset format2
	call printf
	add esp, 4	
	
	;;;;nr A X 4
	
	push nr_a
	call inmultire_X4
	add esp, 4
	
	mov nr_a, eax
	
	;;;;nr B X 4
	
	push nr_b
	call inmultire_X4
	add esp, 4
	
	mov nr_b, eax
	
	
	mov ebx, 0 ;i
	mov esi, 0 ;j
	mov edi, 0 ;k
	
	
	;;;;;;;;;;;;;
	;;;;;;;;;;;;;
	;;;start
	;;;;;;;;;;;;
	;;;;;;;;;;;;
	
	
	;;;;;;;;;;;;;;;;;
	;;;;;;;;;;;;;;;;;
	;;;;;;;;;;;;;;;;;
	;;;;;;;;;;;;;;;;;
	
	
	;;;;;;;;;;;;
	;;;;;;;verif sir A ca e multime
	;;;;;;;;;;;;
	
	mov ebx, 0 ;i
	mov esi, 0 ;j
	mov edi, 0 ;k
	
	mov ebx, nr_a
	mov nr_a_nou, ebx
	sub nr_a_nou, 4
	mov ebx, 0
	
	loop_verific_multime_a:
	
	mov esi, ebx
	add esi, 4
	
	cmp esi, nr_a
	je final_verif_a
	
	loop2_verific_multime_a:
	
	push A[ebx]
	push offset afisare_nr1
	call printf
	add esp, 8
	
	push A[esi]
	push offset afisare_nr2
	call printf
	add esp, 8	

	
	mov edi, A[esi]
	cmp A[ebx], edi
	je eroare1
	
	
	add esi, 4
	cmp esi, nr_a
	jne loop2_verific_multime_a
	
	
	add ebx, 4
	cmp ebx, nr_a_nou
	jne loop_verific_multime_a
	
	final_verif_a:
	
	;;;msg pt ca sirul a e multime
	push offset msg_nu_error
	call printf
	add esp, 4
	
	jmp nu_eroare1
	
	eroare1:
	
	;;;msg pt ca sirul a NU e multime
	push offset msg_eroare
	call printf
	add esp, 4
	jmp out_final
	

	nu_eroare1:
	
	
	
	;;;;;;;;;;;;
	;;;;;;;verif sir B ca e multime
	;;;;;;;;;;;;
	
	
	
	mov ebx, 0 ;i
	mov esi, 0 ;j
	mov edi, 0 ;k
	
	mov ebx, nr_b
	mov nr_b_nou, ebx
	sub nr_b_nou, 4
	mov ebx, 0
	
	loop_verific_multime_b:
	
	mov esi, ebx
	add esi, 4
	
	cmp esi, nr_b
	je final_verif_b
	
	loop2_verific_multime_b:
	
	push B[ebx]
	push offset afisare_nr1
	call printf
	add esp, 8
	
	push B[esi]
	push offset afisare_nr2
	call printf
	add esp, 8	

	
	mov edi, B[esi]
	cmp B[ebx], edi
	je eroare2
	
	
	add esi, 4
	cmp esi, nr_b
	jne loop2_verific_multime_b
	
	
	add ebx, 4
	cmp ebx, nr_b_nou
	jne loop_verific_multime_b
	
	final_verif_b:
	
	;;;msg pt ca sirul a e multime
	push offset msg_nu_error
	call printf
	add esp, 4
	
	jmp nu_eroare2
	
	eroare2:
	
	;;;msg pt ca sirul a NU e multime
	push offset msg_eroare
	call printf
	add esp, 4
	jmp out_final
	

	nu_eroare2:
	
	;;;;;;;;;;;;
	;;;;;;copiere elem string a to string d
	;;;;;;;;;;;;
	
	mov ebx, 0 ;i
	mov esi, 0 ;j
	mov edi, 0 ;k
	
	mov ebx, cna
	
	loop_copiere_elem_A_to_D:
	
	mov eax, A[esi]
	mov D[esi], eax
	
	add esi, 4
	
	dec ebx
	cmp ebx, 0
	jne loop_copiere_elem_A_to_D

	mov eax, cna 
	mov cnd, eax
	
	
	;;;;;;;;;;;;;
	;;;;;;;;final
	;;;;;;;;;;;;;	
	
	
	;;;;;;;;;;;;;
	;;;;;;;;imbinare string B cu D
	;;;;;;;;;;;;;
	
	
	;;;;nr D X 4
	

	push cnd
	call inmultire_X4
	add esp, 4
	
	mov nr_d, eax
	
	
		
	mov ebx, 0 ;i
	mov esi, 0 ;j
	mov edi, 0 ;k
	
	
	mov edi, nr_d;<- care e X4
	
	
	
	loop_string_B:
	
	mov ebx, 0
	mov eax, B[esi]
	
	loop_string_D:
	
	cmp eax, D[ebx]
	je urm_elem
	
	add ebx, 4
	cmp ebx, nr_d
	jne loop_string_D
	
	mov D[edi], eax
	add edi, 4
	
	urm_elem:
	
	add esi, 4
	cmp esi, nr_b
	jne loop_string_B
	
	
	
	;;;;;;;;;;;;;
	;;;;;;;;;;;;;
	;;;afisare string
	;;;;;;;;;;;;
	;;;;;;;;;;;;
	
	
	;;;;afisare nr elemente
	push offset format2
	call printf
	add esp, 4
	
	
	mov eax, edi
	mov edx, 0
	mov ebx, 4
	div ebx
	mov edi, eax
	
	
	push edi
	push offset format1
	call printf
	add esp, 8
	
	
	push offset format2
	call printf
	add esp, 4	
	;;;;;;;;;;;;;;;;;;;;;;;;	
	
	
	push edi
	call afisare_elem_str
	add esp, 4
	
	
	
	out_final:
	
	
	push 0
	call exit
end start



;5
;5 9 20 23 27

;7
;3 7 11 18 25 30 33


;6
;33 34 35 36 67 88
;3
;90 99 102


;8
;13 7 12 22 73 4 23 56

;5
;13 7 12 22 56



;8
;13 7 12 22 73 4 23 56

;5
;13 7 12 13 56




