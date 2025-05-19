package model;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Client {

    private int id;
    private String nume;
    @Pattern(regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", message = "Email invalid")
    private String email;
    private String identificatorUnic;
    @Min(0)
    @Max(100)
    private int varsta;

    /**
     * Creerea unui constructor
     * @param id
     * @param nume
     * @param identificator
     * @param age
     * @param email
     */

    public Client(int id, String nume, String identificator, int age, String email) {
        this.id = id;
        this.nume = nume;
        this.identificatorUnic = identificator;
        this.varsta = age;
        this.email = email;
    }
}
