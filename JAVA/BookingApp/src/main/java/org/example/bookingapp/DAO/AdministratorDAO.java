package org.example.bookingapp.DAO;

import org.example.bookingapp.Module.Administrator;
import org.example.bookingapp.connection.ConectionFactory;
import org.springframework.stereotype.Repository;

import java.sql.*;
import java.util.logging.Logger;

@Repository
public class AdministratorDAO {

    private static final String insertAdministrator =
            "INSERT INTO administrator (name, email, password, nrSaliInchiriate, nrSaliPostate, nrInchiriate, bussinesName) VALUES (?,?,?,?,?,?,?)";

    private static final String getAdministratorByNameAndPassword =
            "SELECT * FROM administrator WHERE name = ? AND password = ?";

    private static final String getAdministratorById =
            "SELECT * FROM administrator WHERE id = ?";

    private static final String updateAdminNrSaliPostateByAdminId =
            "UPDATE administrator SET nrSaliPostate = ? WHERE id = ?";

  private static final String updateAdminPasswordByAdminId =
            "UPDATE administrator SET password = ? WHERE id = ?";

    private static final String selectNumarSaliPostateByAdminId = "SELECT nrSaliPostate FROM administrator WHERE id = ?";


    public static int insert(Administrator admin) {
        System.out.println("insert admin: " + admin);
        Connection dbConnection = ConectionFactory.getConnection();
        PreparedStatement preparedStatement = null;
        int insertId = 0;

        try {
            preparedStatement = dbConnection.prepareStatement(insertAdministrator, Statement.RETURN_GENERATED_KEYS);
            preparedStatement.setString(1, admin.getName());
            preparedStatement.setString(2, admin.getEmail());
            preparedStatement.setString(3, admin.getPassword());
            preparedStatement.setInt(4, admin.getNrSaliInchiriate());
            preparedStatement.setInt(5, admin.getNrSaliPostate());
            preparedStatement.setInt(6, admin.getNrInchiriate());
            preparedStatement.setString(7, admin.getBussinesName());

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


    public static int getNrSaliPostateById(Integer idAdmin) {
        System.out.print("Get nrSali admin: ");
        Connection dbConnection = ConectionFactory.getConnection();
        PreparedStatement preparedStatement = null;
        int insertId = 0;

        try {
            preparedStatement = dbConnection.prepareStatement(selectNumarSaliPostateByAdminId);
            preparedStatement.setInt(1, idAdmin);

            preparedStatement.executeQuery();

            ResultSet resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
                insertId =  resultSet.getInt("nrSaliPostate");
                System.out.println(insertId);
            }
        } catch (SQLException e) {
            Logger.getLogger(AdministratorDAO.class.getName()).severe("Eroare la inserare: " + e.getMessage());
        } finally {
            ConectionFactory.close(preparedStatement);
            ConectionFactory.close(dbConnection);
        }
        return insertId;
    }

    public static int incrementNrSaliPostateByAdminId(Integer idAdmin) {
        System.out.println("Update nrSali admin: " + idAdmin);
        Connection dbConnection = ConectionFactory.getConnection();
        PreparedStatement preparedStatement = null;
        int rowsUpdated = 0;

        try {
            preparedStatement = dbConnection.prepareStatement(updateAdminNrSaliPostateByAdminId);

            int nrSaliPostate = getNrSaliPostateById(idAdmin);
            nrSaliPostate++;


            preparedStatement.setInt(1, nrSaliPostate);
            preparedStatement.setInt(2, idAdmin);

            rowsUpdated = preparedStatement.executeUpdate();


        } catch (SQLException e) {
            Logger.getLogger(AdministratorDAO.class.getName()).severe("Eroare la inserare: " + e.getMessage());
        } finally {
            ConectionFactory.close(preparedStatement);
            ConectionFactory.close(dbConnection);
        }
        return rowsUpdated;
    }

    public static int updateAdminPasswordByAdminId(Integer idAdmin, String password) {
        System.out.println("Update password admin: " + idAdmin + " " + password);
        Connection dbConnection = ConectionFactory.getConnection();
        PreparedStatement preparedStatement = null;
        int insertId = 0;

        try {
            preparedStatement = dbConnection.prepareStatement(updateAdminPasswordByAdminId);
            preparedStatement.setString(1, password);
            preparedStatement.setInt(2, idAdmin);

            insertId = preparedStatement.executeUpdate();

        } catch (SQLException e) {
            Logger.getLogger(AdministratorDAO.class.getName()).severe("Eroare la inserare: " + e.getMessage());
        } finally {
            ConectionFactory.close(preparedStatement);
            ConectionFactory.close(dbConnection);
        }
        return insertId;
    }

    public static Administrator findAdminByNameAndPassword(String name, String password) {
        System.out.println("find admin: " + name);
        Connection dbConnection = ConectionFactory.getConnection();
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;

        try {
            preparedStatement = dbConnection.prepareStatement(getAdministratorByNameAndPassword);
            preparedStatement.setString(1, name);
            preparedStatement.setString(2, password);

            resultSet = preparedStatement.executeQuery();

            if (resultSet.next()) {
                return new Administrator(
                        resultSet.getInt("nrInchiriate"),
                        resultSet.getInt("nrSaliPostate"),
                        resultSet.getInt("nrSaliInchiriate"),
                        resultSet.getString("password"),
                        resultSet.getString("email"),
                        resultSet.getString("name"),
                        resultSet.getInt("id"),
                        resultSet.getString("bussinesName")
                );
            }
        } catch (SQLException e) {
            Logger.getLogger(AdministratorDAO.class.getName()).severe("Eroare la SELECT: " + e.getMessage());
        } finally {
            ConectionFactory.close(preparedStatement);
            ConectionFactory.close(dbConnection);
        }
        return null;
    }

    public static Administrator getContById(int id) {
        System.out.println("find id: " + id);
        Connection dbConnection = ConectionFactory.getConnection();
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;

        try {
            preparedStatement = dbConnection.prepareStatement(getAdministratorById);
            preparedStatement.setInt(1, id);

            resultSet = preparedStatement.executeQuery();

            if (resultSet.next()) {
                return new Administrator(
                        resultSet.getInt("nrInchiriate"),
                        resultSet.getInt("nrSaliPostate"),
                        resultSet.getInt("nrSaliInchiriate"),
                        resultSet.getString("password"),
                        resultSet.getString("email"),
                        resultSet.getString("name"),
                        resultSet.getInt("id"),
                        resultSet.getString("bussinesName")
                );
            }
        } catch (SQLException e) {
            Logger.getLogger(AdministratorDAO.class.getName()).severe("Eroare la SELECT: " + e.getMessage());
        } finally {
            ConectionFactory.close(preparedStatement);
            ConectionFactory.close(dbConnection);
        }
        return null;
    }
}
