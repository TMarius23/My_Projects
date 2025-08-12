package org.example.bookingapp.DAO;

import org.example.bookingapp.connection.ConectionFactory;
import org.example.bookingapp.Module.Sala;
import org.springframework.stereotype.Repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.logging.Logger;

@Repository
public class SalaDAO {

    private static final String insertSala = "INSERT INTO sala (id, name, description, nrDeInchirieri, price, inchiriata, tipSala) VALUES (?,?,?,?,?,?,?)";

    public static int insert(Sala sala) {
        Connection dbConnection = ConectionFactory.getConnection();

        PreparedStatement preparedStatement = null;
        int insertId = 0;

        try {
            preparedStatement = dbConnection.prepareStatement(insertSala, Statement.RETURN_GENERATED_KEYS);
            preparedStatement.setInt(1, sala.getId());
            preparedStatement.setString(2, sala.getName());
            preparedStatement.setString(3, sala.getDescription());
            preparedStatement.setInt(4, sala.getNrDeInchirieri());
            preparedStatement.setDouble(5, sala.getPrice());
            preparedStatement.setBoolean(6, sala.isInchiriata());
            preparedStatement.setInt(7, sala.getTipSala().ordinal());

            preparedStatement.executeUpdate();

            ResultSet resultSet = preparedStatement.getGeneratedKeys();
            if (resultSet.next()) {
                insertId = resultSet.getInt(1);
            }
        } catch (SQLException e) {
            Logger.getLogger("Sala:insert " + e.getMessage());
        } finally {
            ConectionFactory.close(preparedStatement);
            ConectionFactory.close(dbConnection);
        }
        return insertId;
    }
}
