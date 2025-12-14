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

format db "%d " ,0
format1 db "%d", 13,10 ,0
format1_1 db "ebx= %d", 13,10 ,0
format2 db "%d %d %d %d", 13,10 ,0

A dd 1,2,3,4
  dd 2,3,4,5
  dd 1,1,2,2
  dd 1,2,2,1

B dd 1,2,1,4
  dd 2,1,4,5
  dd 1,1,2,2
  dd 1,2,2,1

R dd 4 dup(0)
  dd 4 dup(0)
  dd 4 dup(0)
  dd 4 dup(0)
  

ct dd 0
ct_ebx dd 0
;;;db +4
;;;dd +1???
;;;grija aici

.code

sum proc

push ebp
mov ebp, esp


;a[0][0] * b[0][0]
mov eax, 0
mov ct, 0
add eax, [ebp + 8]
mov ecx, [ebp + 24]
mul ecx
add eax, ct


;a[0][1] * b[1][0]
mov ct, eax
mov eax, 0
add eax, [ebp + 12]
mov ecx, [ebp + 28]
mul ecx
add eax, ct


;a[0][2] * b[2][0]
mov ct, eax
mov eax, 0
add eax, [ebp + 16]
mov ecx, [ebp + 32]
mul ecx
add eax, ct


;a[0][3] * b[3][0]
mov ct, eax
mov eax, 0
add eax, [ebp + 20]
mov ecx, [ebp + 36]
mul ecx
add eax, ct

mov esp, ebp
pop ebp

ret 32

sum endp



start:
	
	mov eax,0 ;pt return
	mov ebx,0 ;contor
	mov ecx,0 ;calcule
	mov edx,0 ;inmultire/div
	mov esi,0 ;contor
	mov edi,0 ;contor
	mov ebp,0 ;contor
	
	
	mov ebx, 64
	;push ebx
	;push offset format1_1
	;call printf 
	;add esp, 8
	
	mov ct_ebx, 0
	;push ct_ebx
	;push offset format1
	;call printf 
	;add esp, 8
	
	et_loop:
	
	;push ebx
	;push offset format1_1
	;call printf 
	;add esp, 8
	
	push A[edi][esi + 0]
	push A[edi][esi + 4]
	push A[edi][esi + 8]
	push A[edi][esi + 12]
	;push offset format2
	;call printf 
	;add esp, 4
	
	push B[esi + 0][ebp]
	push B[esi + 16][ebp]
	push B[esi + 32][ebp]
	push B[esi + 48][ebp]
	;push offset format2
	;call printf 
	;add esp, 4
	
	mov ct_ebx, ebx
			
	;push ct_ebx
	;push offset format1_1
	;call printf 
	;add esp, 8

	call sum
	mov R[edi][ebp], eax
	mov ecx, ct_ebx
	
		
	;push eax
	;push offset format1
	;call printf 
	;add esp, 8

	
	
	add ebp, 4

	
	
	
	cmp ebx, 52
	jne aici1
	add edi, 16
	mov ebp, 0
	
	jmp aicin1
	
	aici1:
	cmp ebx, 36
	jne aici2
	add edi, 16
	mov ebp, 0
	
	jmp aicin2
	
	aici2:
	cmp ebx, 20
	jne aici3
	add edi, 16
	mov ebp, 0
	
	jmp aicin3
	aici3:
	
	aicin1:
	aicin2:
	aicin3:
	
	
	
	cmp ebx, 0
	je afra
	
	sub ebx, 4
	
	;push ebx
	;push offset format1_1
	;call printf 
	;add esp, 8

	jmp et_loop
	
	
	afra:
	
	
	
	
	;;;;;afisare
	
	
	mov esi,0 
	mov edi,0 
	mov ebx, 64
	
	loop_et:
	push R[edi][esi]
	
	cmp ebx, 52
	je s_ac1
	cmp ebx, 36
	je s_ac2
	cmp ebx, 20
	je s_ac3
	
	push offset format
	call printf
	
	jmp salt

	s_ac1:
	s_ac2:
	s_ac3:
	
	push offset format1
	call printf
	
	salt:
	add esi, 4
	
	
	sub ebx, 4
	
	cmp ebx, 0
	je out_loop

	
	jmp loop_et
	
	out_loop:
	
	
	
	
	
	push 0
	call exit
end start


