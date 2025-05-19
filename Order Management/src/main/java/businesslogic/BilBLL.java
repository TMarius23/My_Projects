package businesslogic;

import dataaccess.BillDAO;
import model.Bill;

import java.util.List;

public class BilBLL {

    /**
     * Inserarea in baza de date a unei chitante
     * @param idClient
     * @param idProdus
     * @param cantitate
     * @param numeClient
     * @param numeProdus
     * @return
     */

        public int insertBill(int idClient, int idProdus, int cantitate, String numeClient, String numeProdus) {
        return BillDAO.insertBill(idClient, idProdus, cantitate, numeClient, numeProdus);
    }

    /**
     * Returnarea tuturor chitantelor
     * @return
     */

    public List<Bill> getAllBill() {
        return BillDAO.getAllBill();
    }
}
