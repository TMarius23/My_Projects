package presentation;

import businesslogic.OrderBLL;
import model.Order;

public class ControlerOrder {

    OrderBLL orderBLL = new OrderBLL();

    /**
     * Adaugarea unei comenzi in baza de date
     * @param idC
     * @param idP
     * @param cnt
     * @return
     */
    public int addComand(String idC, String idP, int cnt){
        int idClient = Integer.parseInt(idC);
        int idProdus = Integer.parseInt(idP);
        Order o = new Order(idClient, idProdus, cnt);
        return orderBLL.addComand(o);
    }

}
