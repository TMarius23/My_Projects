package dataaccess;

import connection.ConectionFactory;
import model.Client;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

public class ClientDAO {

    private static final String insertClient = "INSERT INTO client (id, nume, email, identificatorUnic, varsta)" + " VALUES (?,?,?,?,?)";
    private static final String selectClient = "SELECT * FROM client WHERE id = ?";
    private static final String selectAllClient = "SELECT * FROM client ORDER BY id ASC";
    private static final String deleteClient = "DELETE FROM client WHERE id = ?";
    private static final String srchClientNumeIdent = "SELECT * FROM client WHERE nume = ? and identificatorUnic = ?";
    private static final String srchClientNume = "SELECT * FROM client WHERE nume = ?";
    private static final String updateDateClient = "UPDATE client SET nume = ?, email = ?, identificatorUnic =?, varsta =? WHERE id = ?";
    private static final String deleteDataClient = "DELETE FROM client WHERE nume = ? and identificatorUnic = ?";


    public static int insert(Client client) {
        Connection dbConection = ConectionFactory.getConnection();

        PreparedStatement preparedStatement = null;
        int insertId = 0;

        try {
            preparedStatement = dbConection.prepareStatement(insertClient, Statement.RETURN_GENERATED_KEYS);
            preparedStatement.setInt(1, client.getId());
            preparedStatement.setString(2, client.getNume());
            preparedStatement.setString(3, client.getEmail());
            preparedStatement.setString(4, client.getIdentificatorUnic());
            preparedStatement.setString(5, String.valueOf(client.getVarsta()));

            preparedStatement.executeUpdate();


            ResultSet resultSet = preparedStatement.getGeneratedKeys();
            if (resultSet.next()) {
                insertId = resultSet.getInt(1);
            }
        } catch (SQLException e) {
            Logger.getLogger("Client:insert " + e.getMessage());
        } finally {
            ConectionFactory.close(preparedStatement);
            ConectionFactory.close(dbConection);
        }
        return insertId;
    }

    public static int cautareNumeIdentif(String nume, String identificatorUnic) {
        Connection dbConection = ConectionFactory.getConnection();

        PreparedStatement preparedStatement = null;
        int insertId = 0;

        try {
            preparedStatement = dbConection.prepareStatement(srchClientNumeIdent);
            preparedStatement.setString(1, nume);
            preparedStatement.setString(2, identificatorUnic);

            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                insertId++;
            }

        } catch (SQLException e) {
            Logger.getLogger("Client: " + e.getMessage());
        } finally {
            ConectionFactory.close(preparedStatement);
            ConectionFactory.close(dbConection);
        }
        return insertId;
    }

    public static int cautareNumeIdentifRId(String nume, String identificatorUnic) {
        Connection dbConection = ConectionFactory.getConnection();

        PreparedStatement preparedStatement = null;
        int insertId = 0;

        try {
            preparedStatement = dbConection.prepareStatement(srchClientNumeIdent);
            preparedStatement.setString(1, nume);
            preparedStatement.setString(2, identificatorUnic);

            ResultSet resultSet = preparedStatement.executeQuery();

            if (resultSet.next()) {
                insertId = resultSet.getInt("id");
            }

        } catch (SQLException e) {
            Logger.getLogger("Client: " + e.getMessage());
        } finally {
            ConectionFactory.close(preparedStatement);
            ConectionFactory.close(dbConection);
        }
        return insertId;
    }

    public static int updateDateClient(int idClient, String nume, String email, String identificatorUnic, int varsta) {
        Connection dbConection = ConectionFactory.getConnection();

        PreparedStatement preparedStatement = null;
        int insertId = 0;

        try {
            preparedStatement = dbConection.prepareStatement(updateDateClient);
            preparedStatement.setString(1, nume);
            preparedStatement.setString(2, email);
            preparedStatement.setString(3, identificatorUnic);
            preparedStatement.setInt(4, varsta);
            preparedStatement.setInt(5, idClient);
            int nr = preparedStatement.executeUpdate();

            if (nr > 0) {
                insertId = 1;
            }

        } catch (SQLException e) {
            Logger.getLogger("Client: " + e.getMessage());
        } finally {
            ConectionFactory.close(preparedStatement);
            ConectionFactory.close(dbConection);
        }
        return insertId;
    }

    public static int deteleteDataNumeId(String nume, String identificatorUnic) {
        Connection dbConection = ConectionFactory.getConnection();

        PreparedStatement preparedStatement = null;
        int insertId = 0;

        try {
            preparedStatement = dbConection.prepareStatement(deleteDataClient);
            preparedStatement.setString(1, nume);
            preparedStatement.setString(2, identificatorUnic);
            int nr = preparedStatement.executeUpdate();

            if (nr > 0) {
                insertId = 1;
            }

        } catch (SQLException e) {
            Logger.getLogger("Client: " + e.getMessage());
        } finally {
            ConectionFactory.close(preparedStatement);
            ConectionFactory.close(dbConection);
        }
        return insertId;
    }

    public static Client getAllClientsById(int id) {
        Connection dbConection = ConectionFactory.getConnection();
        PreparedStatement preparedStatement = null;

        Client clients = new Client();

        try {
            preparedStatement = dbConection.prepareStatement(selectClient);
            preparedStatement.setInt(1, id);
            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                clients.setId(resultSet.getInt("id"));
                clients.setNume(resultSet.getString("nume"));
                clients.setEmail(resultSet.getString("email"));
                clients.setIdentificatorUnic(resultSet.getString("identificatorUnic"));
                clients.setVarsta(resultSet.getInt("varsta"));
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        } finally {
            ConectionFactory.close(preparedStatement);
            ConectionFactory.close(dbConection);
        }

        return clients;
    }

    public static List<Client> getAllClientsByName(String nume) {
        Connection dbConection = ConectionFactory.getConnection();
        PreparedStatement preparedStatement = null;

        List<Client> clients = new ArrayList<>();

        try {
            preparedStatement = dbConection.prepareStatement(srchClientNume);
            preparedStatement.setString(1, nume);
            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                Client client = new Client();
                client.setId(resultSet.getInt("id"));
                client.setNume(resultSet.getString("nume"));
                client.setEmail(resultSet.getString("email"));
                client.setIdentificatorUnic(resultSet.getString("identificatorUnic"));
                client.setVarsta(resultSet.getInt("varsta"));
                clients.add(client);

            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        } finally {
            ConectionFactory.close(preparedStatement);
            ConectionFactory.close(dbConection);
        }

        return clients;
    }

    public static List<Client> getAllClients() {
        Connection dbConection = ConectionFactory.getConnection();
        PreparedStatement preparedStatement = null;

        List<Client> clients = new ArrayList<>();

        try {
            preparedStatement = dbConection.prepareStatement(selectAllClient);
            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                Client client = new Client();
                client.setId(resultSet.getInt("id"));
                client.setNume(resultSet.getString("nume"));
                client.setEmail(resultSet.getString("email"));
                client.setIdentificatorUnic(resultSet.getString("identificatorUnic"));
                client.setVarsta(resultSet.getInt("varsta"));
                clients.add(client);

            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        } finally {
            ConectionFactory.close(preparedStatement);
            ConectionFactory.close(dbConection);
        }

        return clients;
    }

}
