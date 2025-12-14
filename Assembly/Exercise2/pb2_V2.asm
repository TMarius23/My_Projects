.386
.model flat, stdcall
includelib msvcrt.lib
extern exit: proc

.data

a dw 8
b dw 2

cst dw 0
meax dd 0
bbx dw 0
diax dw 0
M1 dw 0
M2 dw 0
suma dd 0

.code
start:
    mov eax, 0
    mov ebx, 0
    mov edx, 0
    mov ecx, 0
    mov edi, 0

    ; Calculate bbx = b^4
    mov bx, 5
	cwde
    mov ax, b
    mov ecx, ebx
    lop_bbc:
        mul b
        loop lop_bbc
    mov bbx, ax

    ; Calculate diax = 2^13
    mov di, 2
    mov ax, 6
	cwde
    mov ecx, eax
    mov ax, 1
    lop_diax:
        mul di
        loop lop_diax
    mov diax, ax

    ; Initialize variables
    mov ax, 6
    mov bx, 5
    mov di, 2
    mov dx, 0
    mov eax, 0
    mov sp, 1

    ; Loop to calculate the sum
    mov ecx, 25
    et_loop:
        ; Calculate M1 = 15 * i - (BX + a)
        mov ax, sp
        mov cst, 15
        imul cst
		
        sub ax, bx
        sub ax, a
        mov M1, ax

        ; Calculate M2 = i - DI^AX
        mov ax, sp
        sub ax, diax
        mov M2, ax

        ; Calculate M1 * M2 / bbx
        mov ax, M1
        imul M2
        cwd         ; Sign extend AX into DX:AX
        idiv bbx
        add suma, eax

        inc sp
        loop et_loop

    mov eax, suma

    ; Exit the program
    push 0
    call exit
end start
