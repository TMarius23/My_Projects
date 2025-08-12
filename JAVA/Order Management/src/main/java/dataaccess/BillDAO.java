package dataaccess;

import connection.ConectionFactory;
import model.Bill;

import java.sql.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class BillDAO {

    private static final String insertBill = "INSERT INTO bill (idC, idP, idB, dataComanda, cantitate, numeClient, numeProdus)" + "VALUES (?,?,?,?,?,?,?)";
    private static final String selectBill = "SELECT * FROM bill ORDER BY idB ASC";

    /**
     * Inserarea in baza de date a unei facturi
     * @param idClient
     * @param idProdus
     * @param cantitate
     * @param numeClient
     * @param numeProdus
     * @return
     */

    public static int insertBill(int idClient, int idProdus, int cantitate, String numeClient, String numeProdus) {

        Connection dbConection = ConectionFactory.getConnection();
        PreparedStatement preparedStatement = null;
        int result = 0;

        try {
            LocalDateTime now = LocalDateTime.now();

            preparedStatement = dbConection.prepareStatement(insertBill, Statement.RETURN_GENERATED_KEYS);
            preparedStatement.setInt(1, idClient);
            preparedStatement.setInt(2, idProdus);
            preparedStatement.setInt(3, 0);
            preparedStatement.setTimestamp(4, Timestamp.valueOf(now));
            preparedStatement.setInt(5, cantitate);
            preparedStatement.setString(6, numeClient);
            preparedStatement.setString(7, numeProdus);
            result = preparedStatement.executeUpdate();

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        return result;
    }

    /**
     * Returnarea unei liste cu toate facturile din baza de date
     * @return
     */

    public static List<Bill> getAllBill() {

        Connection dbConection = ConectionFactory.getConnection();
        PreparedStatement preparedStatement = null;
        List<Bill> billList = new ArrayList<>();

        try {

            preparedStatement = dbConection.prepareStatement(selectBill);
            ResultSet resultSet = preparedStatement.executeQuery();

            while (resultSet.next()) {
                int idBill = resultSet.getInt("idB");
                int idProdus = resultSet.getInt("idP");
                int idClient = resultSet.getInt("idC");
                int cantitate = resultSet.getInt("cantitate");
                String numeClient = resultSet.getString("numeClient");
                String numeProdus = resultSet.getString("numeProdus");
                Timestamp dataComanda = resultSet.getTimestamp("dataComanda");

                Bill b = new Bill(idBill, idClient, idProdus, cantitate, dataComanda, numeClient, numeProdus);
                billList.add(b);
            }

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        return billList;
    }

}
