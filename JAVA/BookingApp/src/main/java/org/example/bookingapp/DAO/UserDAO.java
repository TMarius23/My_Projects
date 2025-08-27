package org.example.bookingapp.DAO;

import org.example.bookingapp.connection.ConectionFactory;
import org.example.bookingapp.Module.User;
import org.springframework.stereotype.Repository;

import java.sql.*;
import java.util.logging.Logger;

@Repository
public class UserDAO {

    public static final String insertUser =
            "INSERT INTO user (password, nrSaliInchiriate, name, email) VALUES (?,?,?,?)";
    public static final String getUserByNameAndPassword =
            "SELECT * FROM user WHERE name = ? AND password = ?";

    public static int insert(User user) {
        System.out.println("insert user: " + user);
        Connection dbConnection = ConectionFactory.getConnection();
        PreparedStatement preparedStatement = null;
        int insertId = 0;

        try {
            preparedStatement = dbConnection.prepareStatement(insertUser, Statement.RETURN_GENERATED_KEYS);
            preparedStatement.setString(1, user.getPassword());   // ⚠ dacă vrei hash, folosește user.getPassword().hashCode()
            preparedStatement.setInt(2, user.getNrSaliInchiriate());
            preparedStatement.setString(3, user.getName());
            preparedStatement.setString(4, user.getEmail());

            preparedStatement.executeUpdate();

            ResultSet resultSet = preparedStatement.getGeneratedKeys();
            if (resultSet.next()) {
                insertId = resultSet.getInt(1);
            }
            resultSet.close();
        } catch (SQLException e) {
            Logger.getLogger(UserDAO.class.getName()).severe("Eroare la inserare: " + e.getMessage());
        } finally {
            ConectionFactory.close(preparedStatement);
            ConectionFactory.close(dbConnection);
        }
        return insertId;
    }

    public static User findByUsernameAndPassword(String name, String password) {
        System.out.println("find user: " + name);
        Connection dbConnection = ConectionFactory.getConnection();
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;

        try {
            preparedStatement = dbConnection.prepareStatement(getUserByNameAndPassword);
            preparedStatement.setString(1, name);
            preparedStatement.setString(2, password);

            resultSet = preparedStatement.executeQuery();

            if (resultSet.next()) {
                User user = new User();
                user.setId(resultSet.getInt("id"));
                user.setName(resultSet.getString("name"));
                user.setEmail(resultSet.getString("email"));
                user.setPassword(resultSet.getString("password"));
                user.setNrSaliInchiriate(resultSet.getInt("nrSaliInchiriate"));
                return user;
            }
        } catch (SQLException e) {
            Logger.getLogger(UserDAO.class.getName()).severe("Eroare la cautare: " + e.getMessage());
        } finally {
            ConectionFactory.close(preparedStatement);
            ConectionFactory.close(dbConnection);
        }
        return null;
    }
}
