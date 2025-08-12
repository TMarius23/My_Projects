package businesslogic;

import dataaccess.AbstractDAO;
import dataaccess.OrderDAO;
import model.Order;

public class OrderBLL extends AbstractDAO<Order> {

    AbstractDAO<Order> orderDAO = new AbstractDAO<Order>(Order.class);

    /**
     * Adaugarea unei comenzi in baza de date
     * @param order
     * @return
     */

    public int addComand(Order order){
        Order o = orderDAO.insertwithId(order);
        if(o != null){
            return 1;
        }
        return 0;
    }

}
