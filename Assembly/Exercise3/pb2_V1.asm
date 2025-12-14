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
format1 db "%d", 13,10 ,0
format2 db  13,10 ,0
format3_edi db "[%d]:", 0
format_spa db 0, 13,10,13,10
 
A dd 100 dup(0)
B dd 100 dup(0)
D dd 200 dup(0)

nr_a dd 0
nr_b dd 0
nr_d dd 0

elem_a dd 0
elem_b dd 0

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
	je out_b
	
	jmp ele_b_loop
	out_b:
	

	
	
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
	je out_b_print
	
	jmp ele_b_loop_print
	out_b_print:

	push offset format_spa
	call printf
	add esp, 4
	
	;;;;;;;;;;;;;
	;;;;;;;;;;;;;
	;;;intercalsare string-uri
	;;;;;;;;;;;;
	;;;;;;;;;;;;
	
	push offset format2
	call printf
	add esp, 4	
	
	mov eax, nr_a
	mov ebx, 4
	mul ebx
	mov nr_a, eax
	
	mov eax, nr_b
	mov ebx, 4
	mul ebx
	mov nr_b, eax
	
	
	mov ebx, 0 ;i
	mov esi, 0 ;j
	mov edi, 0 ;k
	
	
	while_first:
	cmp ebx, nr_a
	jnb out_while_first
	cmp esi, nr_b
	jnb out_while_first
	
	
	
	while_sec_first:;(a[i] <= b[j] && i < n && j < m)
	mov eax, A[ebx]
	cmp eax, B[esi]
	jnbe out_while_sec_first
	cmp ebx, nr_a
	jnb out_while_sec_first
	cmp esi, nr_b
	jnb out_while_sec_first
	
	
	cmp eax, B[esi]
	jne urm_line
		add esi, 4
	urm_line:
	mov D[edi], eax
	
	
	;;;afi 
	push edi
	push offset format3_edi
	call printf
	add esp, 8
	
	push D[edi]
	push offset format
	call printf
	add esp, 8
	;;;;;
	
	
	add ebx, 4
	add edi, 4
	
	jmp while_sec_first
	out_while_sec_first:
		

	
	while_sec_sec:;(a[i] > b[j] && i < n && j < m)
	mov eax, B[esi] 
	cmp A[ebx], eax
	jng out_while_sec_sec
	cmp ebx, nr_a
	jnb out_while_sec_sec
	cmp esi, nr_b
	jnb out_while_sec_sec
	
	
	mov D[edi], eax
	
	;;;afi 
	push edi
	push offset format3_edi
	call printf
	add esp, 8
	
	push D[edi]
	push offset format
	call printf
	add esp, 8
	;;;;;
	
	
	add esi, 4
	add edi, 4
	
	jmp while_sec_sec
	out_while_sec_sec:
	
		
	push offset format2
	call printf
	add esp, 4
	
	push edi
	push offset format1
	call printf
	add esp, 8
	
	
	
	jmp while_first
	out_while_first:
	
	
	;;;;;;;;;;;
	;;;;;;;;;;;
	;;;;;fin while principal
	;;;;;;;;;;;
	;;;;;;;;;;;

	
	cmp ebx, nr_a
	jne salt
	
	while_out_first:
	cmp esi, nr_b
	jnb out_while_out_first
	
	mov eax,  B[esi]
	mov D[edi], eax
	
	
	;;;afi 
	push edi
	push offset format3_edi
	call printf
	add esp, 8
	
	push D[edi]
	push offset format
	call printf
	add esp, 8
	;;;;;
	
	add edi, 4
	add esi, 4
	
	jmp while_out_first
	out_while_out_first:
	
	jmp salt_out
	salt:
	
	cmp esi, nr_b
	jne salt_out
	
	while_out_sec:
	cmp ebx, nr_a
	jnb out_while_out_sec
	
	mov eax, A[ebx]
	mov D[edi], eax
	
	
	;;;afi 
	push edi
	push offset format3_edi
	call printf
	add esp, 8
	
	push D[edi]
	push offset format
	call printf
	add esp, 8
	;;;;;
	
	add edi, 4
	add ebx, 4
	
	jmp while_out_sec
	out_while_out_sec:
	
	salt_out:
	
	
	;;;;edi e multiplu de 4 
	;;;;asa aflu nr de elemente corect
	mov edx, 0
	mov eax, edi
	mov ebx, 4
	div ebx
	mov edi, eax
	mov nr_d, edi

	
	;;;;;;;
	;;;;;;;
	;;;;;;;
	
	

	;;;;;;;;;;;;;
	;;;;;;;;;;;;;
	;;;afisare string
	;;;;;;;;;;;;
	;;;;;;;;;;;;
	
	
	
	;;;;afisare nr elemente
	push offset format2
	call printf
	add esp, 4
	
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

