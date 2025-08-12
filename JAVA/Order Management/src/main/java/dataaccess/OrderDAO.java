package dataaccess;

import connection.ConectionFactory;

import java.sql.*;

public class OrderDAO {

    private static final String insertOrder = "INSERT INTO `order`(idC, idP, cantitateProdus)" + "VALUES(?,?,?)";

    public static int addComand(int idClient, int idProdus, int cantitate){

        Connection dbConection = ConectionFactory.getConnection();
        PreparedStatement preparedStatement = null;
        int result = 0;

        try {
            preparedStatement = dbConection.prepareStatement(insertOrder);
            preparedStatement.setInt(1, idClient);
            preparedStatement.setInt(2, idProdus);
            preparedStatement.setInt(3, cantitate);
            result = preparedStatement.executeUpdate();


        } catch (SQLException e) {
            throw new RuntimeException(e);
        }finally {
            ConectionFactory.close(preparedStatement);
            ConectionFactory.close(dbConection);
        }
        return result;
    }

}
