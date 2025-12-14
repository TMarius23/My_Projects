.386
.model flat, stdcall

includelib msvcrt.lib

extern exit: proc

public start

.data

x dd 15	
z dd 13

.code
start:
	
	mov eax, 6
	mov ecx, 15
	mov edi, 10
	
	mov esi, eax
	;eax^3 + z
	mov eax, x
	imul x	
	imul x
	add eax, z
	
	
	mov ebp, eax
	;ebp = eax^3 + z
	
	mov eax, 11
	add eax, edi
	
	mov edx, 16
	add edx, x
	
	mov ebx, edx
	mov edx, 0
	
	imul ebx
	imul ebp
	mov ebp, eax
	; ebp = (z + x^3) * (11 + EDI) * (x + 16)
	
	;correct
	
	
	;17 - eax
	mov eax, esi
	mov esi, 17
	sub esi, eax
	;correct

	mov esp, esi
	
	;ecx/4
	mov eax, ecx
	mov edx, 0
	mov ecx, 4
	
	idiv ecx
	
	imul esp
	
	mov esi, eax
	mov eax, ebp
	idiv esi	
	
	
	
	push 0
	call exit
end start
