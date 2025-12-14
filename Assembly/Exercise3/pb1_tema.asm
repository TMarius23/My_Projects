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
format1 db "%d ", 13,10 ,0

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
ct_ecx dd 0
ct_linie dd 0
;;;db +4
;;;dd +1???
;;;grija aici

.code

sum proc

mov ct_ecx, 0
mov ct_ecx, ecx
push ebp
mov ebp, esp


;a[0][0] * b[0][0]
mov eax, 0
mov ct, 0
mov edx, 0
mov eax, [ebp + 8]
mov ecx, [ebp + 24]
mul ecx
add eax, ct


;a[0][1] * b[1][0]
mov ct, eax
mov eax, 0
mov edx, 0
mov eax, [ebp + 12]
mov ecx, [ebp + 28]
mul ecx
add eax, ct


;a[0][2] * b[2][0]
mov ct, eax
mov eax, 0
mov edx, 0
mov eax, [ebp + 16]
mov ecx, [ebp + 32]
mul ecx
add eax, ct


;a[0][3] * b[3][0]
mov ct, eax
mov eax, 0
mov edx, 0
mov eax, [ebp + 20]
mov ecx, [ebp + 36]
mul ecx
add eax, ct

mov esp, ebp
pop ebp
mov ecx, ct_ecx

ret 32

sum endp



start:
	
	mov eax,0 ;pt return
	mov ebx,0 ;contor
	mov ecx,0 ;calcule
	mov edx,0 ;inmultire/div
	;mov esp,0 ;stiva
	mov esi,0 ;contor
	mov edi,0 ;contor
	mov ebp,0 ;contor
	
	

	
	push A[ebx + edi][esi + 0]
	push offset format1
	call printf 
	add esp,4
	
	push A[ebx + edi][esi + 4]
	push offset format1
	call printf
	add esp,4	
	
	push A[ebx + edi][esi + 8]
	push offset format1
	call printf 
	add esp,4
	
	push A[ebx + edi][esi + 12]
	push offset format1
	call printf 
	add esp,4
	
	push B[esi + 0][ebx + ebp]
	push offset format1
	call printf 
	add esp,4
	
	
	push B[esi + 16][ebx + ebp]
	push offset format1
	call printf 
	add esp,4
	
	
	push B[esi + 32][ebx + ebp]
	push offset format1
	call printf 
	add esp,4
	
	
	push B[esi + 48][ebx + ebp]
	push offset format1
	call printf 
	add esp,4
	
	
	call sum
	
	push eax
	push offset format1
	call printf 
	add esp, 8



	
	

	
	
	
	
	
	push 0
	call exit
end start


