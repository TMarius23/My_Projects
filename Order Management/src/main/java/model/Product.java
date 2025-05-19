package model;

import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Product {

    private int id;
    private String numeProdus;
    private int cantitate;
    private int codDeBara;

    /**
     * Creerea unui constructor
     * @param id
     * @param numeProdus
     * @param cantitateProdus
     * @param codBara
     */
    public Product(int id, String numeProdus, int cantitateProdus, int codBara) {
        this.id = id;
        this.numeProdus = numeProdus;
        this.cantitate = cantitateProdus;
        this.codDeBara = codBara;
    }

}
