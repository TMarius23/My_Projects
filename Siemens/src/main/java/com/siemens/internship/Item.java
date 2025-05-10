package com.siemens.internship;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private String description;
    private String status;

    // Add email regex validation
    ///Explicatii:
    /// regexp este o expresie care o folosesc pentru a putea vedea daca o conditie
    /// este indeplinita cu succes sau nu. El imi limiteaza datele de intrare astfel
    /// incat sa am o structura bine predefinita pentru datele din baza de date.
    /// Sintaxa de verificare incepe intotdeauna cu "^" si se termina cu "$". totdata
    /// un email valid poate sa inceapa atat cu litera mica cat si cu oricare din
    /// caracterele dintre parantezele patrate.
    ///Un pattern este o structura pe care se poate face acest regexp
    /// Un email are structura: text1@text2.celputin2caractere

    @Pattern(regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$")
    private String email;

}