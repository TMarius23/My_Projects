package dataaccess;

import connection.ConectionFactory;
import model.Product;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

public class ProductDAO {

    private static final String insertProduct = "INSERT INTO product (id, numeProdus, cantitate, codDeBara)" + "VALUES (?,?,?,?)";
    private static final String selectAllProduct = "SELECT * FROM product";
    private static final String validareNumeCodBara = "SELECT * FROM product WHERE numeProdus = ? and codDeBara = ?";
    private static final String validareNumeCodBaraRId = "SELECT id FROM product WHERE numeProdus = ? and codDeBara = ?";
    private static final String updateDateProdus = "UPDATE product SET numeProdus = ?, cantitate = ?, codDeBara = ? WHERE id = ?";
    private static final String deleteProdus = "DELETE FROM product WHERE numeProdus = ? and codDeBara = ?";
    private static final String selectAllProductByName = "SELECT * FROM product WHERE numeProdus = ?";
    private static final String getCantitateById = "SELECT cantitate FROM product WHERE id = ?";
    private static final String updateCantitateProdus = "UPDATE product SET cantitate = ? WHERE id = ?";
    private static final String selectProductById = "SELECT * FROM product WHERE id = ?";

    public static int insertProduct(Product product) {
        Connection dbConection = ConectionFactory.getConnection();
        PreparedStatement preparedStatement = null;
        int nrInsert = 0;

        try {
            preparedStatement = dbConection.prepareStatement(insertProduct, Statement.RETURN_GENERATED_KEYS);
            preparedStatement.setInt(1, product.getId());
            preparedStatement.setString(2, product.getNumeProdus());
            preparedStatement.setInt(3, product.getCantitate());
            preparedStatement.setInt(4, product.getCodDeBara());
            preparedStatement.executeUpdate();

            ResultSet resultSet = preparedStatement.getGeneratedKeys();
            if (resultSet.next()) {
                nrInsert = resultSet.getInt(1);
            }
        } catch (SQLException e) {
            Logger.getLogger("Product:insert " + e.getMessage());
        } finally {
            ConectionFactory.close(preparedStatement);
            ConectionFactory.close(dbConection);
        }
        return nrInsert;
    }

    public static int validareDate(String nume, int codBara) {
        Connection dbConection = ConectionFactory.getConnection();
        PreparedStatement preparedStatement = null;
        int nrInsert = 0;

        try {
            preparedStatement = dbConection.prepareStatement(validareNumeCodBara);
            preparedStatement.setString(1, nume);
            preparedStatement.setInt(2, codBara);

            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                nrInsert++;
            }
        } catch (SQLException e) {
            Logger.getLogger("Product:validareD " + e.getMessage());
        } finally {
            ConectionFactory.close(preparedStatement);
            ConectionFactory.close(dbConection);
        }
        return nrInsert;
    }

    public static Product getProdusById(int idP) {
        Connection dbConection = ConectionFactory.getConnection();
        PreparedStatement preparedStatement = null;
        Product p = new Product();;

        try {
            preparedStatement = dbConection.prepareStatement(selectProductById);
            preparedStatement.setInt(1, idP);

            ResultSet resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
                p.setId(resultSet.getInt("id"));
                p.setNumeProdus(resultSet.getString("numeProdus"));
                p.setCantitate(resultSet.getInt("cantitate"));
                p.setCodDeBara(resultSet.getInt("codBara"));
            }

        } catch (SQLException e) {
            Logger.getLogger("Product:validareD " + e.getMessage());
        } finally {
            ConectionFactory.close(preparedStatement);
            ConectionFactory.close(dbConection);
        }
        return p;
    }

    public static int validareDateRId(String nume, int codBara) {
        Connection dbConection = ConectionFactory.getConnection();
        PreparedStatement preparedStatement = null;
        int nrInsert = 0;

        try {
            preparedStatement = dbConection.prepareStatement(validareNumeCodBaraRId);
            preparedStatement.setString(1, nume);
            preparedStatement.setInt(2, codBara);

            ResultSet resultSet = preparedStatement.executeQuery();

            if (resultSet.next()) {
                nrInsert = resultSet.getInt("id");
            }
        } catch (SQLException e) {
            Logger.getLogger("Product:validareRId " + e.getMessage());
        } finally {
            ConectionFactory.close(preparedStatement);
            ConectionFactory.close(dbConection);
        }
        return nrInsert;
    }

    public static int updateDate(String nume, int cantitate, int codBara, int idP) {
        Connection dbConection = ConectionFactory.getConnection();
        PreparedStatement preparedStatement = null;
        int nrInsert = 0;

        try {
            preparedStatement = dbConection.prepareStatement(updateDateProdus);
            preparedStatement.setString(1, nume);
            preparedStatement.setInt(2, cantitate);
            preparedStatement.setInt(3, codBara);
            preparedStatement.setInt(4, idP);

            int nr = preparedStatement.executeUpdate();

            if (nr > 0) {
                nrInsert = 1;
            }
        } catch (SQLException e) {
            Logger.getLogger("Product:update " + e.getMessage());
        } finally {
            ConectionFactory.close(preparedStatement);
            ConectionFactory.close(dbConection);
        }
        return nrInsert;
    }

  public static int updateCantitateById( int idP, int cantitate) {
        Connection dbConection = ConectionFactory.getConnection();
        PreparedStatement preparedStatement = null;
        int nrInsert = 0;

        try {
            preparedStatement = dbConection.prepareStatement(updateCantitateProdus);
            preparedStatement.setInt(1, cantitate);
            preparedStatement.setInt(2, idP);

            int nr = preparedStatement.executeUpdate();

            if (nr > 0) {
                nrInsert = 1;
            }
        } catch (SQLException e) {
            Logger.getLogger("Product:update " + e.getMessage());
        } finally {
            ConectionFactory.close(preparedStatement);
            ConectionFactory.close(dbConection);
        }
        return nrInsert;
    }

    public static int deleteProduct(String nume, int codBara) {
        Connection dbConection = ConectionFactory.getConnection();
        PreparedStatement preparedStatement = null;
        int nrInsert = 0;

        try {
            preparedStatement = dbConection.prepareStatement(deleteProdus);
            preparedStatement.setString(1, nume);
            preparedStatement.setInt(2, codBara);
            int nr = preparedStatement.executeUpdate();

            if (nr > 0) {
                nrInsert = 1;
            }
        } catch (SQLException e) {
            Logger.getLogger("Product:delete " + e.getMessage());
        } finally {
            ConectionFactory.close(preparedStatement);
            ConectionFactory.close(dbConection);
        }
        return nrInsert;
    }

    public static List<Product> getAllProductByName(String nume) {
        Connection dbConection = ConectionFactory.getConnection();
        PreparedStatement preparedStatement = null;
        List<Product> productList = new ArrayList<>();
        try {
            preparedStatement = dbConection.prepareStatement(selectAllProductByName);
            preparedStatement.setString(1, nume);

            ResultSet resultSet = preparedStatement.executeQuery();

            while (resultSet.next()) {
                Product product = new Product();
                product.setId(resultSet.getInt("id"));
                product.setNumeProdus(resultSet.getString("numeProdus"));
                product.setCantitate(resultSet.getInt("cantitate"));
                product.setCodDeBara(resultSet.getInt("codDeBara"));
                productList.add(product);
            }

        } catch (SQLException e) {
            Logger.getLogger("Product:getAll " + e.getMessage());
        } finally {
            ConectionFactory.close(preparedStatement);
            ConectionFactory.close(dbConection);
        }
        return productList;
    }

    public static List<Product> getAllProduct() {
        Connection dbConection = ConectionFactory.getConnection();
        PreparedStatement preparedStatement = null;
        List<Product> productList = new ArrayList<>();
        try {
            preparedStatement = dbConection.prepareStatement(selectAllProduct);
            ResultSet resultSet = preparedStatement.executeQuery();

            while (resultSet.next()) {
                Product product = new Product();
                product.setId(resultSet.getInt("id"));
                product.setNumeProdus(resultSet.getString("numeProdus"));
                product.setCantitate(resultSet.getInt("cantitate"));
                product.setCodDeBara(resultSet.getInt("codDeBara"));
                productList.add(product);

//                System.out.println(product.getCodBara());
            }

        } catch (SQLException e) {
            Logger.getLogger("Product:getAll " + e.getMessage());
        } finally {
            ConectionFactory.close(preparedStatement);
            ConectionFactory.close(dbConection);
        }
        return productList;
    }

}
