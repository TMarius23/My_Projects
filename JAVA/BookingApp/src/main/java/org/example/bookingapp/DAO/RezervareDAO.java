package org.example.bookingapp.DAO;

import org.example.bookingapp.Module.Administrator;
import org.example.bookingapp.Module.Rezervare;
import org.example.bookingapp.connection.ConectionFactory;

import java.sql.*;
import java.util.logging.Logger;

public class RezervareDAO {

    private static final String insertRezervare =
            "INSERT INTO rezervare (end_date, start_date, sala_id, user_id) VALUES (?,?,?,?)";


    public static int insertRezervation(Rezervare rezervare) {
        System.out.println("insert rezervare: " + rezervare);
        Connection dbConnection = ConectionFactory.getConnection();
        PreparedStatement preparedStatement = null;
        int insertId = 0;

        try {
            preparedStatement = dbConnection.prepareStatement(insertRezervare, Statement.RETURN_GENERATED_KEYS);
            preparedStatement.setDate(1, Date.valueOf(rezervare.getEndDate()));
            preparedStatement.setDate(2, Date.valueOf(rezervare.getStartDate()));
            preparedStatement.setInt(3, rezervare.getSala().getIdSala());
            preparedStatement.setInt(4, rezervare.getUser().getId());

            preparedStatement.executeUpdate();

            ResultSet resultSet = preparedStatement.getGeneratedKeys();
            if (resultSet.next()) {
                insertId = resultSet.getInt(1);
            }
        } catch (SQLException e) {
            Logger.getLogger(AdministratorDAO.class.getName()).severe("Eroare la inserare: " + e.getMessage());
        } finally {
            ConectionFactory.close(preparedStatement);
            ConectionFactory.close(dbConnection);
        }
        return insertId;
    }
}
