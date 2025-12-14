.386
.model flat, stdcall

includelib msvcrt.lib

extern exit: proc

public start

.data

a db 19
x db 12

.code
start:
	
	mov ah, 19
	mov bh, 13
	mov dl, 16
	
	mov al, 14
	xor al, x
	
	xor a, bh
	xor dl, ah
	not dl
	and a, dl
	
	or al, a
	mov bl, al
	mov eax, 0
	mov al, bl
	
	
	
	push 0
	call exit
end start
