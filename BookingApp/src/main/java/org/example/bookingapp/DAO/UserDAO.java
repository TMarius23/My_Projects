package org.example.bookingapp.DAO;

import org.example.bookingapp.connection.ConectionFactory;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.logging.Logger;

import org.example.bookingapp.Module.User;
import org.springframework.stereotype.Repository;

@Repository
public class UserDAO {

    public static final String insertUser = "INSERT INTO user (password, nrSaliInchiriate, name, email)" + " VALUES (?,?,?,?)";

    public static int insert(User user) {
        System.out.println("insert user: " + user);
        Connection dbConection = ConectionFactory.getConnection();

        PreparedStatement preparedStatement = null;
        int insertId = 0;

        try {
            preparedStatement = dbConection.prepareStatement(insertUser, Statement.RETURN_GENERATED_KEYS);
            preparedStatement.setString(1, user.getPassword());
            preparedStatement.setInt(2, user.getNrSaliInchiriate());
            preparedStatement.setString(3, user.getName());
            preparedStatement.setString(4, user.getEmail());

            preparedStatement.executeUpdate();


            ResultSet resultSet = preparedStatement.getGeneratedKeys();
            if (resultSet.next()) {
                insertId = resultSet.getInt(1);
            }
        } catch (SQLException e) {
            Logger.getLogger(UserDAO.class.getName()).severe("Eroare la inserare: " + e.getMessage());
        } finally {
            ConectionFactory.close(preparedStatement);
            ConectionFactory.close(dbConection);
        }
        return insertId;
    }

}
