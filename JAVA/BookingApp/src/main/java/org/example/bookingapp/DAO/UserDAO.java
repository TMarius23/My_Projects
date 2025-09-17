package org.example.bookingapp.DAO;

import org.example.bookingapp.connection.ConectionFactory;
import org.example.bookingapp.Module.User;
import org.springframework.stereotype.Repository;

import java.sql.*;
import java.util.logging.Logger;

@Repository
public class UserDAO {

    public static final String insertUser =
            "INSERT INTO user (password, nr_sali_inchiriate, name, email) VALUES (?,?,?,?)";
    public static final String getUserByNameAndPassword =
            "SELECT * FROM user WHERE name = ? AND password = ?";
    public static final String getUserById =
            "SELECT * FROM user WHERE id = ?";
    public static final String updateUserPasswordById =
            "UPDATE user SET password = ? WHERE id = ?";

    public static int insert(User user) {
        System.out.println("insert user: " + user);
        Connection dbConnection = ConectionFactory.getConnection();
        PreparedStatement preparedStatement = null;
        int insertId = 0;

        try {
            preparedStatement = dbConnection.prepareStatement(insertUser, Statement.RETURN_GENERATED_KEYS);
            preparedStatement.setString(1, user.getPassword());
            preparedStatement.setString(2, user.getName());
            preparedStatement.setString(3, user.getEmail());
            preparedStatement.setInt(4, user.getNr_sali_inchiriate());


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
                user.setNr_sali_inchiriate(resultSet.getInt("nr_sali_inchiriate"));
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

    public static int updateUserPasswordByUserId(String newPassword, int id) {
        System.out.println("update password by user id: " + newPassword + " id: " + id);
        Connection dbConnection = ConectionFactory.getConnection();
        PreparedStatement preparedStatement = null;

        try {
            preparedStatement = dbConnection.prepareStatement(updateUserPasswordById);
            preparedStatement.setString(1, newPassword);
            preparedStatement.setInt(2, id);

            int nr = preparedStatement.executeUpdate();
            if (nr > 0) {
                System.out.println("Updated");
                return nr;
            }else{
                return -1;
            }
        } catch (SQLException e) {
            Logger.getLogger(UserDAO.class.getName()).severe("Eroare la cautare: " + e.getMessage());
        } finally {
            ConectionFactory.close(preparedStatement);
            ConectionFactory.close(dbConnection);
        }
        return id;
    }

    public static User getContById(int userId) {
        System.out.println("find user id: " + userId);
        Connection dbConnection = ConectionFactory.getConnection();
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;

        try {
            preparedStatement = dbConnection.prepareStatement(getUserById);
            preparedStatement.setInt(1, userId);

            resultSet = preparedStatement.executeQuery();

            if (resultSet.next()) {
                User user = new User();
                user.setId(resultSet.getInt("id"));
                user.setName(resultSet.getString("name"));
                user.setEmail(resultSet.getString("email"));
                user.setPassword(resultSet.getString("password"));
                user.setNr_sali_inchiriate(resultSet.getInt("nr_sali_inchiriate"));
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
