package businesslogic;

import dataaccess.AbstractDAO;
import dataaccess.ProductDAO;
import model.Client;
import model.Product;

import java.util.List;

public class ProductBLL extends AbstractDAO<Product> {

    AbstractDAO<Product> productDAO = new AbstractDAO<>(Product.class);

//    public int insertProduct(Product product) {
//        return ProductDAO.insertProduct(product);
//    }

    public int insertProduct(Product product) {
        return productDAO.insertwithoutId(product).getId();
    }

//    public int validareDate(String nume, int codDeBare) {
//        return ProductDAO.validareDate(nume, codDeBare);
//    }

    public int validareDate(String nume, int codDeBare) {
        List<Product> p = productDAO.findByCriteria("numeProdus", "codDeBara", nume, String.valueOf(codDeBare));
        return p.size();
    }

//    public int validareDateRId(String nume, int codDeBare) {
//        return ProductDAO.validareDateRId(nume, codDeBare);
//    }

    public int validareDateRId(String nume, int codDeBare) {
        List<Product> p = productDAO.findByCriteria("numeProdus", "codDeBara", nume, String.valueOf(codDeBare));
        if (p.size() > 1)
            return 0;
        return p.getFirst().getId();
    }

//    public int deleteProduct(String nume, int codDeBare) {
//        return ProductDAO.deleteProduct(nume, codDeBare);
//    }

    public int deleteProduct(String nume, int codDeBare) {
        return productDAO.deleteBy2Criteria("numeProdus", "codDeBara",nume, String.valueOf(codDeBare));
    }

//    public List<Product> getAllProductByName(String nume) {
//        return ProductDAO.getAllProductByName(nume);
//    }

    public List<Product> getAllProductByName(String nume) {
        return productDAO.findByCriteria("numeProdus", nume);
    }

//    public Product getCantitateProdusById(int idP) {
//        return ProductDAO.getCantitateProdusById(idP);
//    }
//   public Product getProdusById(int idP) {
//        return ProductDAO.getProdusById(idP);
//    }

    public Product getProdusById(int idP) {
        return productDAO.findById(idP);
    }

//    public int updateDate(int idP, String nume, int cantitate, int codBara) {
//        return ProductDAO.updateDate(nume, cantitate, codBara, idP);
//    }

    /**
     * Update la date
     * @param product
     * @return
     */

    public int updateDate(Product product) {
        Product p = productDAO.updateDateById(product, product.getId());
        if(p == null)
            return 0;
        return 1;
    }

//    public int updateCantitateById(int idP, int cantitate) {
//        return ProductDAO.updateCantitateById(idP, cantitate);
//    }
//

    /**
     * Update dupa un id
     * @param idP
     * @param cantitate
     * @return
     */
    public int updateCantitateById(int idP, int cantitate) {
        return productDAO.update1CriteriaById("cantitate", String.valueOf(cantitate), idP);
    }

//    public List<Product> getAllProduct() {
//        return ProductDAO.getAllProduct();
//    }

    /**
     * Returnarea tuturor produselor din baza de date
     * @return
     */
    public List<Product> getAllProduct() {
        return productDAO.getAll();
    }

}
