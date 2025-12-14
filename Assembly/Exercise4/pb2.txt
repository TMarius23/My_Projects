.386
.model flat, stdcall
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

;includem biblioteci, si declaram ce functii vrem sa importam
includelib msvcrt.lib
extern exit: proc
extern printf: proc
extern scanf: proc
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

;declaram simbolul start ca public - de acolo incepe executia
public start
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

;sectiunile programului, date, respectiv cod
.data

doi_46 dq 2.46
douaz_39 dq 20.39

a dq 0
x dq 0
y dq 0
z dq 0

M1 dq 0
i dd 0
M2 dq 0
rez dq 0

result dd 0.0      

format DB "%lf", 0
format_af DB "Rez=%lf",13,10, 0
.code
start:
	
	push offset a
	push offset format
	call scanf
	add esp, 8
	
	push dword ptr [a +4]
	push dword ptr [a]
	push offset format_af
	call printf
	add esp, 12
	
	
	
	push offset x
	push offset format
	call scanf
	add esp, 8
	
	
	push dword ptr [x +4]
	push dword ptr [x]
	push offset format_af
	call printf
	add esp, 12
	
	push offset y
	push offset format
	call scanf
	add esp, 8
	
	
	push dword ptr [y +4]
	push dword ptr [y]
	push offset format_af
	call printf
	add esp, 12
	
	push offset z
	push offset format
	call scanf
	add esp, 8
	
	
	push dword ptr [z +4]
	push dword ptr [z]
	push offset format_af
	call printf
	add esp, 12
	
	
	mov esi, 2
	
	loot_et:
	
	finit
	
	fld a
	fld y
	fyl2x
	fld st(0)
	fld st(0)
	frndint
	fsub
	f2xm1
	fld1
	fadd
	fscale
	
	
	fld doi_46
	fld x
	fdiv
	
	fmul
	
	fld z
	mov i, esi
	fild i
	fmul
	
	fadd
	
	fstp M1
	
	
	fld douaz_39
	mov i, esi
	fild i
	fadd
	
	fstp M2
	
	fld M2
	fld M1
	fmul
	
	fld rez
	fadd
	
	fstp rez
	
	
	inc esi
	cmp esi, 16
	jge afara
	
	jmp loot_et
	afara:
	
		
		
	push dword ptr [rez +4]
	push dword ptr [rez]
	push offset format_af
	call printf
	add esp, 12
	
	
	push 0
	call exit
end start


