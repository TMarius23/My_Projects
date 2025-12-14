.386
.model flat, stdcall

includelib msvcrt.lib

extern exit: proc

public start

.data

.code
start:
	
	mov di, 11
	mov dx, 6
	
	mov ax, 4
	mov si, dx
	mov dx, 0
	idiv si
	
	mov cx, 14
	sub ax, cx
	sub ax, di
	
	push 0
	call exit
end start
