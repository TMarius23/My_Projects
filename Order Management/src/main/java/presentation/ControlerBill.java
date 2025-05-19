package presentation;

import businesslogic.BilBLL;
import model.Bill;

import java.util.List;

public class ControlerBill {

    BilBLL billBLL = new BilBLL();

    /**
     * Adaugarea unei facturi in baza de date
     *
     * @param idClient
     * @param idProdus
     * @param cantitate
     * @param numeClient
     * @param numeProdus
     * @return
     */

    public int insertBill(int idClient, int idProdus, int cantitate, String numeClient, String numeProdus) {
        return billBLL.insertBill(idClient, idProdus, cantitate, numeClient, numeProdus);
    }

    /**
     * Returnarea facturilor din baza de date
     *
     * @return
     */

    public List<Bill> getAllBill() {
        return billBLL.getAllBill();
    }

}
