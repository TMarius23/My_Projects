.386
.model flat, stdcall
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

;includem msvcrt.lib, si declaram ce functii vrem sa importam
includelib msvcrt.lib
extern exit: proc
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

;declaram simbolul start ca public - de acolo incepe executia
public start
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

;sectiunile programului, date, respectiv cod
.data

a dw 3
b dw 2

cst dw 0
meax dd 0

bbx dw 0
diax dw 0
M1 dw 0
M2 dw 0
suma dw 0

.code
start:

	mov eax, 0
	mov ebx, 0
	mov edx, 0
	mov ecx, 0
	mov edi, 0	
	
	;;;;;;;;;;;;;;;
	;modificare bx ax
	mov bx, 6
	cwde
	mov ecx, ebx
	mov ax, 1

	lop_bbc:
	mul b
	loop lop_bbc
	
	mov bbx, ax
	mov eax, 0
	
	;;;;;;;;;;;;;;;
	;modificare di ax
	mov di, 2
	mov ax, 7
	cwde
	mov ecx, eax
	mov ax, 1

	lop_diax:
	mul di
	loop lop_diax
	
	mov diax, ax
	mov eax, 0
	
		
	mov ax, 7
	mov bx, 6
	mov di, 2
	
	
	mov dx, 0
	mov eax, 0
	mov sp, 1
	
	;;;;;;;;;;;;;;
	;;;;CORECT;;;;
	;;;;;;;;;;;;;;
	
	mov ecx, 25
	
	et_loop:
	
	mov ax, sp	
	mov cst, 15
	imul cst
	sub ax, bx
	sub ax, a
	;15 ∗ i − (BX + a)
	;cwde 
	mov M1, ax
	
	mov ax, sp
	;cwde
	sub ax, diax
	mov M2, ax
	;i - DI^AX
	
	mov ax, M1
	cwde
	imul M2
	;cwd ; => dx:ax
	idiv bbx
	
	add suma, ax
	mov ax, suma


	inc sp
	loop et_loop

	mov ax, suma
	
	;apel functie exit
	push 0
	call exit
end start
