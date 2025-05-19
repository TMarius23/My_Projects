package presentation;

import businesslogic.ProductBLL;
import model.Product;

import java.util.List;

public class ControlerProduct {

    ProductBLL productBLL = new ProductBLL();

    /**
     * Inserarea unui produs in baza de date si prelucarea datelor pentru a fi bune de utiliat
     *
     * @param nume
     * @param cantitate
     * @param codBara
     * @return
     */

    public int insertProduct(String nume, String cantitate, String codBara) {
        int cnt = Integer.parseInt(cantitate);
        int cod = Integer.parseInt(codBara);

        Product p = new Product(1, nume, cnt, cod);
        return productBLL.insertProduct(p);
    }

    /**
     * Validarea datelor si primirea unui feedback din partea bazei de date
     *
     * @param nume
     * @param codBara
     * @return
     */

    public int validareDate(String nume, String codBara) {
        int cnt = Integer.parseInt(codBara);
        return productBLL.validareDate(nume, cnt);
    }

    /**
     * Validarea datelor si primirea unui feedback din partea bazei de date si returnarea Id
     *
     * @param nume
     * @param codBara
     * @return
     */

    public int validareDateRId(String nume, String codBara) {
        int cnt = Integer.parseInt(codBara);
        return productBLL.validareDateRId(nume, cnt);
    }

    /**
     * Update in baza de date cu valori noi
     *
     * @param idP
     * @param nume
     * @param cantitate
     * @param codBara
     * @return
     */

    public int updateDate(int idP, String nume, String cantitate, String codBara) {
        int cnt = Integer.parseInt(cantitate);
        int cod = Integer.parseInt(codBara);
        Product p = new Product(idP, nume, cnt, cod);
        return productBLL.updateDate(p);
    }

    /**
     * Update dupa un criteriu de cautare si updat-area unui singur element
     *
     * @param idP
     * @param cantitate
     * @return
     */
    public int updateCantitateById(String idP, int cantitate) {
        int idProdus = Integer.parseInt(idP);
        return productBLL.updateCantitateById(idProdus, cantitate);
    }

    /**
     * Stergerea unui produs
     * @param nume
     * @param codBara
     * @return
     */
    public int deleteProduct(String nume, String codBara) {
        int cnt = Integer.parseInt(codBara);
        return productBLL.deleteProduct(nume, cnt);
    }

    /**
     * Returnarea unei liste in care sunt toate produsele care coincid
     * cu numele date ca parametru de cautare
     * @param nume
     * @return
     */
    public List<Product> getAllProductByName(String nume) {
        return productBLL.getAllProductByName(nume);
    }

    //    public Product getCantitateProdusById(String idP) {
//        int idProd = Integer.parseInt(idP);
//        return productBLL.getCantitateProdusById(idProd);
//    }

    /**
     * * Returnarea unei liste in care sunt toate produsele care coincid
     *      * cu id date ca parametru de cautare
     * @param idP
     * @return
     */
    public Product getProdusById(String idP) {
        int idProd = Integer.parseInt(idP);
        return productBLL.getProdusById(idProd);
    }

    /**
     * Transformare din String in int
     * @param cantitate
     * @return
     */
    public int transformCantitate(String cantitate) {
        return Integer.parseInt(cantitate);
    }

    /**
     * Returarea listei de produse
     * @return
     */

    public List<Product> getAllProducts() {
        return productBLL.getAllProduct();
    }
}
