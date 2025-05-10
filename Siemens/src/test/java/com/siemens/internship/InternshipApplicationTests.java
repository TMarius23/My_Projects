package com.siemens.internship;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.validation.BeanPropertyBindingResult;
import org.springframework.validation.Validator;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 Rolul unei clase de test este unul esential, deoarece are scopul de a avertiza programatorul
 daca in momentul in care se aduc unele modificari la nivelul codului rezultatul devine invalid
 Totodata, o clasa de test ne poate arata unde putem intampina bug-uri si sa ajungem sa le rezolva.
 Pe parcursul rularii aplicatiei, structura si integritatea ei trebuie sa se pastreze non stop,
 astfel cu o clasa de teste putem sesiza anumite anomalii care pot aparea la nivelul unor
 capabilitati ale unor obiecte, testandule pe cat mai multe cazuri.
*/

@SpringBootTest
class InternshipApplicationTests {

	///@Autowired este un mod de a face dependency injection, adica ma ajuta sa ma folosesc
	/// de obiectele de care am nevoie pentru a nu le creea manual prin diferite procedee cu new
	@Autowired
	private Validator validator;
	///Validator - are scopul de a ma ajuta sa validez obiecte in java dupa preferinta si
	///cerintele impuse de mine

	/**
	BeanPropertyBindingResult errors = new BeanPropertyBindingResult(item, "Test");
	validator.validate(item, errors);

	Cele 2 lini de mai sus sunt esenta care ma ajuta sa produc o testare. Prima imi creeaza
	un obiect unde vor fi stocate toate eroriile care apar pe baza acetsuia, care se foloseste
	de item si are numele "Test".
	A 2 linie valideaza fiecare camp din obiectul item. Acesta verifica ca fiecare conditie
	impusa asupra unui camp sa fie valida, altfel in lista creeata anterior se v-or adauga
	erori.
	*/

	///Fiecare test in parte are o anumita specificitate:
	///
	/// test1fail verifica ce se intampla daca ni se repeta de 2 ori @-ul dar totodata avem
	/// punctul de la finalul sintaxei email-ului
	/// Acest lucru fiind o gresala de sintaxa pentru un email rezultand un email invalid
	/// Astfel trebuind sa rezulte un rezultat negativ/false, iar testat ca atare, cu
	/// un assert potrivit, testul trebuie sa treaca/ sa fie pozitiv
	@Test
	void test1fail() {
		Item item = new Item();
		item.setId(4L);
		item.setDescription("Test1");
		item.setName("Test1");
		item.setEmail("test@ava@test.com");

		BeanPropertyBindingResult errors = new BeanPropertyBindingResult(item, "Test");

		validator.validate(item, errors);

		assertFalse(errors.getAllErrors().isEmpty());
	}

	/// test2fail verifica ce se intampla daca aven anumite caractere care nu sunt in lista
	/// de caractere permise si totodata se afla in prima parte a emailului(cea de dinainte-a @)
	/// Acest lucru fiind o gresala de sintaxa pentru un email rezultand un email invalid
	/// Astfel trebuind sa rezulte un rezultat negativ/false, iar testat ca atare, cu
	/// un assert potrivit, testul trebuie sa treaca/ sa fie pozitiv
	@Test
	void test2fail() {
		Item item = new Item();
		item.setId(4L);
		item.setDescription("Test2");
		item.setName("Test2");
		item.setEmail("test!~ava@test.com");

		BeanPropertyBindingResult errors = new BeanPropertyBindingResult(item, "Test");

		validator.validate(item, errors);

		assertFalse(errors.getAllErrors().isEmpty());
	}


	/// test3fail verifica ce se intampla daca nu avem @ in email
	/// Acest lucru fiind o gresala de sintaxa pentru un email rezultand un email invalid
	/// Astfel trebuind sa rezulte un rezultat negativ/false, iar testat ca atare, cu
	/// un assert potrivit, testul trebuie sa treaca/ sa fie pozitiv
	@Test
	void test3fail() {
		Item item = new Item();
		item.setId(4L);
		item.setDescription("Test3");
		item.setName("Test3");
		item.setEmail("testavatest.com");

		BeanPropertyBindingResult errors = new BeanPropertyBindingResult(item, "Test");

		validator.validate(item, errors);

		assertFalse(errors.getAllErrors().isEmpty());
	}

	/// test4fail verifica ce se intampla daca nu aven semnul de punctuatie punct "."
	/// Acest lucru fiind o gresala de sintaxa pentru un email rezultand un email invalid
	/// Astfel trebuind sa rezulte un rezultat negativ/false, iar testat ca atare, cu
	/// un assert potrivit, testul trebuie sa treaca/ sa fie pozitiv
	@Test
	void test4fail() {
		Item item = new Item();
		item.setId(4L);
		item.setDescription("Test4");
		item.setName("Test4");
		item.setEmail("testa@vatestcom");

		BeanPropertyBindingResult errors = new BeanPropertyBindingResult(item, "Test");

		validator.validate(item, errors);

		assertFalse(errors.getAllErrors().isEmpty());
	}

	/// test5fail verifica ce se intampla daca nu aven nici punct "." si nici @
	/// Acest lucru fiind o gresala de sintaxa pentru un email rezultand un email invalid
	/// Astfel trebuind sa rezulte un rezultat negativ/false, iar testat ca atare, cu
	/// un assert potrivit, testul trebuie sa treaca/ sa fie pozitiv
	@Test
	void test5fail() {
		Item item = new Item();
		item.setId(4L);
		item.setDescription("Test5");
		item.setName("Test5");
		item.setEmail("testavatestcom");

		BeanPropertyBindingResult errors = new BeanPropertyBindingResult(item, "Test");

		validator.validate(item, errors);

		assertFalse(errors.getAllErrors().isEmpty());
	}

	/// test6fail verifica ce se intampla daca ni se repeta de 2 ori @-ul dar totodata nu avem
	/// punctul de la finalul sintaxei email-ului
	/// Acest lucru fiind o gresala de sintaxa pentru un email rezultand un email invalid
	/// Astfel trebuind sa rezulte un rezultat negativ/false, iar testat ca atare, cu
	/// un assert potrivit, testul trebuie sa treaca/ sa fie pozitiv
	@Test
	void test6fail() {
		Item item = new Item();
		item.setId(4L);
		item.setDescription("Test6");
		item.setName("Test6");
		item.setEmail("test@ava@testcom");

		BeanPropertyBindingResult errors = new BeanPropertyBindingResult(item, "Test");

		validator.validate(item, errors);

		assertFalse(errors.getAllErrors().isEmpty());
	}

	/// test7fail verifica ce se intampla daca avem o sintaxa corecta pana inainte de punct-ul
	/// de la final, dar dupa el nu avem suficiente caractere pentru un email valid
	/// Astfel trebuind sa rezulte un rezultat negativ/false, iar testat ca atare, cu
	/// un assert potrivit, testul trebuie sa treaca/ sa fie pozitiv
	@Test
	void test7fail() {
		Item item = new Item();
		item.setId(4L);
		item.setDescription("Test7");
		item.setName("Test7");
		item.setEmail("testava@test.c");

		BeanPropertyBindingResult errors = new BeanPropertyBindingResult(item, "Test");

		validator.validate(item, errors);

		assertFalse(errors.getAllErrors().isEmpty());
	}

	/// test8fail verifica ce se intampla daca avem o sintaxa corecta pana inainte de punct-ul
	/// de la final, dar dupa el avem caractere invalide pentru un email valid. Adica caracterele
	/// gasite dupa punct nu se afla in lista de valori permise.
	/// Astfel trebuind sa rezulte un rezultat negativ/false, iar testat ca atare, cu
	/// un assert potrivit, testul trebuie sa treaca/ sa fie pozitiv
	@Test
	void test8fail() {
		Item item = new Item();
		item.setId(4L);
		item.setDescription("Test8");
		item.setName("Test8");
		item.setEmail("testava@test.c&m");

		BeanPropertyBindingResult errors = new BeanPropertyBindingResult(item, "Test");

		validator.validate(item, errors);

		assertFalse(errors.getAllErrors().isEmpty());
	}

	/// test9fail verifica ce se intampla daca in partea a 2 dupa @ avem un caracter invalid
	/// Astfel trebuind sa rezulte un rezultat negativ/false, iar testat ca atare, cu
	/// un assert potrivit, testul trebuie sa treaca/ sa fie pozitiv
	@Test
	void test9fail() {
		Item item = new Item();
		item.setId(4L);
		item.setDescription("Test9");
		item.setName("Test9");
		item.setEmail("testava@te_st.com");

		BeanPropertyBindingResult errors = new BeanPropertyBindingResult(item, "Test");

		validator.validate(item, errors);

		assertFalse(errors.getAllErrors().isEmpty());
	}

	/// test10passed verifica ce se intampla daca avem un email corespunzator standardelor
	/// Astfel trebuind sa rezulte un rezultat pozitiv/true, iar testat ca atare, cu
	/// un assert potrivit, testul trebuie sa treaca/ sa fie pozitiv
	@Test
	void test10passed() {
		Item item = new Item();
		item.setId(4L);
		item.setDescription("Test10");
		item.setName("Test10");
		item.setEmail("testava@test.com");

		BeanPropertyBindingResult errors = new BeanPropertyBindingResult(item, "Test");

		validator.validate(item, errors);

		assertTrue(errors.getAllErrors().isEmpty());
	}
	/// test11passed verifica ce se intampla daca avem un email corespunzator standardelor,
	/// iar restul caracterelor sunt null
	/// Astfel trebuind sa rezulte un rezultat pozitiv/true, iar testat ca atare, cu
	/// un assert potrivit, testul trebuie sa treaca/ sa fie pozitiv

	@Test
	void test11passed() {
		Item item = new Item();
		item.setId(null);
		item.setDescription(null);
		item.setName(null);
		item.setEmail("testava@test.com");

		BeanPropertyBindingResult errors = new BeanPropertyBindingResult(item, "Test");

		validator.validate(item, errors);

		assertTrue(errors.getAllErrors().isEmpty());
	}

	/// test12passed verifica ce se intampla daca avem un email null
	/// si si restul caracterelor sunt tot null
	/// Astfel trebuind sa rezulte un rezultat pozitiv/true, iar testat ca atare, cu
	/// un assert potrivit, testul trebuie sa treaca/ sa fie pozitiv

	@Test
	void test12passed() {
		Item item = new Item();
		item.setId(null);
		item.setDescription(null);
		item.setName(null);
		item.setEmail(null);

		BeanPropertyBindingResult errors = new BeanPropertyBindingResult(item, "Test");

		validator.validate(item, errors);

		assertTrue(errors.getAllErrors().isEmpty());
	}

	/// test13passed verifica ce se intampla daca avem un email care incepe cu litera
	///mare iar in rest totul este ok
	/// Astfel trebuind sa rezulte un rezultat pozitiv/true, iar testat ca atare, cu
	/// un assert potrivit, testul trebuie sa treaca/ sa fie pozitiv

	@Test
	void test13passed() {
		Item item = new Item();
		item.setId(4L);
		item.setDescription("Test13");
		item.setName("Test13");
		item.setEmail("Testava@test.com");

		BeanPropertyBindingResult errors = new BeanPropertyBindingResult(item, "Test");

		validator.validate(item, errors);

		assertTrue(errors.getAllErrors().isEmpty());
	}

	/// /// test14passed verifica ce se intampla daca avem un email care incepe cu litera
	///mare atat in prima parte cat si in a 2 iar in rest totul este ok
	/// Astfel trebuind sa rezulte un rezultat pozitiv/true, iar testat ca atare, cu
	/// un assert potrivit, testul trebuie sa treaca/ sa fie pozitiv

	@Test
	void test14passed() {
		Item item = new Item();
		item.setId(4L);
		item.setDescription("Test14");
		item.setName("Test14");
		item.setEmail("Testava@Test.com");

		BeanPropertyBindingResult errors = new BeanPropertyBindingResult(item, "Test");

		validator.validate(item, errors);

		assertTrue(errors.getAllErrors().isEmpty());
	}

}
