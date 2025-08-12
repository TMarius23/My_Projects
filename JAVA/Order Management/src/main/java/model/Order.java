package model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Order {

    private int idO;
    private int idC;
    private int idP;
    private int cantitateProdus;

    /**
     * Creerea unui constructor
     * @param idC
     * @param idP
     * @param cantitateProdus
     */

    public Order(int idC, int idP, int cantitateProdus) {
        this.idC = idC;
        this.idP = idP;
        this.cantitateProdus = cantitateProdus;
    }

}
