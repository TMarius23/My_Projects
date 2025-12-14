package org.example.bookingapp.DAO;

import ch.qos.logback.core.model.Model;
import org.example.bookingapp.Module.Rezervare;
import org.example.bookingapp.Module.TipSala;
import org.example.bookingapp.connection.ConectionFactory;
import org.example.bookingapp.Module.Sala;
import org.springframework.stereotype.Repository;

import java.sql.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.logging.Logger;

@Repository
public class SalaDAO {

    private static final String insertSala = "INSERT INTO sala (name, description, nr_de_inchirieri, price, inchiriata, tip_sala, id_ref, imagine) VALUES (?,?,?,?,?,?,?,?)";
    private static final String selectSala = "SELECT * FROM sala WHERE id_ref = ?";
    private static final String selectSalaALL = "SELECT * FROM sala";
    private static final String deleteSalaById = "DELETE FROM sala WHERE id_sala = ?";
    private static final String selectIdSala = "SELECT id_sala FROM sala WHERE id_ref = ? and name = ? and price = ? and imagine = ?";
    private static final String selectSalaById = "SELECT * FROM sala WHERE id_sala = ?";

    public static int insert(Sala sala) {
        System.out.println("Insert Sala" + sala);
        System.out.println(sala);
        Connection dbConnection = ConectionFactory.getConnection();

        PreparedStatement preparedStatement = null;
        int insertId = 0;

        try {
            preparedStatement = dbConnection.prepareStatement(insertSala, Statement.RETURN_GENERATED_KEYS);
            preparedStatement.setString(1, sala.getName());
            preparedStatement.setString(2, sala.getDescription());
            preparedStatement.setInt(3, sala.getNrDeInchirieri());
            preparedStatement.setDouble(4, sala.getPrice());
            preparedStatement.setBoolean(5, sala.isInchiriata());
            preparedStatement.setInt(6, sala.getTipSala().ordinal());
            preparedStatement.setInt(7, sala.getIdRef());
            preparedStatement.setString(8, String.valueOf(sala.getImagine().getFirst()));

            preparedStatement.executeUpdate();

            ResultSet resultSet = preparedStatement.getGeneratedKeys();
            if (resultSet.next()) {
                insertId = resultSet.getInt(1);
            }

            if (sala.getRezervari() != null) {
                String insertIntoRezervari = "INSERT INTO Rezervare(sala_id, start_date, end_date) VALUES (?,?,?)";
                for (Rezervare r : sala.getRezervari()) {
                    PreparedStatement psRez = dbConnection.prepareStatement(insertIntoRezervari);
                    psRez.setInt(1, insertId);
                    psRez.setDate(2, Date.valueOf(r.getStartDate()));
                    psRez.setDate(3, Date.valueOf(r.getEndDate()));
                    psRez.executeUpdate();
                    psRez.close();
                }
            }

        } catch (SQLException e) {
            Logger.getLogger("Sala:insert " + e.getMessage());
        } finally {
            ConectionFactory.close(preparedStatement);
            ConectionFactory.close(dbConnection);
        }
        return insertId;
    }

    public static int deleteById(Long id) {
        System.out.println("Id dat " + id);
        Connection dbConnection = ConectionFactory.getConnection();

        PreparedStatement preparedStatement = null;
        try {
            preparedStatement = dbConnection.prepareStatement(deleteSalaById);
            preparedStatement.setLong(1, id);

            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            Logger.getLogger("Sala:delete " + e.getMessage());
        } finally {
            ConectionFactory.close(preparedStatement);
            ConectionFactory.close(dbConnection);
        }
        return 1;
    }

    public static Sala findSalaById(int id) {
        System.out.println("Id dat de gasit" + id);
        Connection dbConnection = ConectionFactory.getConnection();

        PreparedStatement preparedStatement = null;
        try {
            preparedStatement = dbConnection.prepareStatement(selectSalaById);
            preparedStatement.setLong(1, id);

            preparedStatement.executeQuery();

            ResultSet resultSet = preparedStatement.getResultSet();
            if (resultSet.next()) {
                Sala sala = new Sala();
                sala.setIdSala(resultSet.getInt("id_sala"));
                sala.setName(resultSet.getString("name"));
                sala.setDescription(resultSet.getString("description"));
                sala.setNrDeInchirieri(resultSet.getInt("nr_de_inchirieri"));
                sala.setPrice(resultSet.getDouble("price"));
                sala.setInchiriata(resultSet.getBoolean("inchiriata"));
                sala.setTipSala(TipSala.values()[resultSet.getInt("tip_sala")]);
                sala.setIdRef(resultSet.getInt("id_ref"));
                sala.setImagine(Collections.singletonList(resultSet.getString("imagine")));


                System.out.println(sala);
                return sala;
            }

        } catch (SQLException e) {
            Logger.getLogger("Sala:delete " + e.getMessage());
        } finally {
            ConectionFactory.close(preparedStatement);
            ConectionFactory.close(dbConnection);
        }
        return null;
    }

    public static int getIdByIdRNamePriceImg(int idR, String name, double price, String img) {
        System.out.println("Afisare detalii! " + idR + " " + name + " " + price + " " + img);

        Connection dbConnection = ConectionFactory.getConnection();

        PreparedStatement preparedStatement = null;

        try {
            preparedStatement = dbConnection.prepareStatement(selectIdSala);
            preparedStatement.setInt(1, idR);
            preparedStatement.setString(2, name);
            preparedStatement.setDouble(3, price);
            preparedStatement.setString(4, img);

            ResultSet resultSet = preparedStatement.executeQuery();

            if (resultSet.next()) {
                Sala sala = new Sala();
                sala.setIdSala(resultSet.getInt("id_sala"));
                sala.setName(resultSet.getString("name"));
                sala.setDescription(resultSet.getString("description"));
                sala.setNrDeInchirieri(resultSet.getInt("nr_de_inchirieri"));
                sala.setPrice(resultSet.getDouble("price"));
                sala.setInchiriata(resultSet.getBoolean("inchiriata"));
                sala.setTipSala(TipSala.values()[resultSet.getInt("tip_sala")]);
                sala.setIdRef(resultSet.getInt("id_ref"));
                sala.setImagine(Collections.singletonList(resultSet.getString("imagine")));


                System.out.println(sala);
                return sala.getIdSala();
            }
        } catch (SQLException e) {
            Logger.getLogger("Sala:getIdSala " + e.getMessage());
        } finally {
            ConectionFactory.close(preparedStatement);
            ConectionFactory.close(dbConnection);
        }
        return 0;
    }

    public static List<Sala> getAllSaliByID(int id) {
        System.out.println("Afisare sali!\n");

        Connection dbConnection = ConectionFactory.getConnection();

        PreparedStatement preparedStatement = null;
        List<Sala> salas = new ArrayList<Sala>();

        try {
            preparedStatement = dbConnection.prepareStatement(selectSala);
            preparedStatement.setInt(1, id);

            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                Sala sala = new Sala();
                sala.setIdSala(resultSet.getInt("id_sala"));
                sala.setName(resultSet.getString("name"));
                sala.setDescription(resultSet.getString("description"));
                sala.setNrDeInchirieri(resultSet.getInt("nr_de_inchirieri"));
                sala.setPrice(resultSet.getDouble("price"));
                sala.setInchiriata(resultSet.getBoolean("inchiriata"));
                sala.setTipSala(TipSala.values()[resultSet.getInt("tip_sala")]);
                sala.setIdRef(resultSet.getInt("id_ref"));
                sala.setImagine(Collections.singletonList(resultSet.getString("imagine")));


                List<Rezervare> rezervari = new ArrayList<>();
                String selectRezervari = "SELECT * FROM rezervare WHERE sala_id = ?";
                PreparedStatement psRez = dbConnection.prepareStatement(selectRezervari);
                psRez.setInt(1, sala.getIdSala());
                ResultSet rsRez = psRez.executeQuery();
                while (rsRez.next()) {
                    Rezervare r = new Rezervare();
                    r.setStartDate(rsRez.getDate("start_date").toLocalDate());
                    r.setEndDate(rsRez.getDate("end_date").toLocalDate());
                    rezervari.add(r);
                }
                sala.setRezervari(rezervari);
                psRez.close();


                System.out.println(sala);
                salas.add(sala);
            }
        } catch (SQLException e) {
            Logger.getLogger("Sala:getAll " + e.getMessage());
        } finally {
            ConectionFactory.close(preparedStatement);
            ConectionFactory.close(dbConnection);
        }
        return salas;
    }

    public static List<Sala> getSaliALL() {
        System.out.println("Afisare sali ALL!\n");

        Connection dbConnection = ConectionFactory.getConnection();

        PreparedStatement preparedStatement = null;
        List<Sala> salas = new ArrayList<Sala>();

        try {
            preparedStatement = dbConnection.prepareStatement(selectSalaALL);

            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                Sala sala = new Sala();
                sala.setIdSala(resultSet.getInt("id_sala"));
                sala.setName(resultSet.getString("name"));
                sala.setDescription(resultSet.getString("description"));
                sala.setNrDeInchirieri(resultSet.getInt("nr_de_inchirieri"));
                sala.setPrice(resultSet.getDouble("price"));
                sala.setInchiriata(resultSet.getBoolean("inchiriata"));
                sala.setTipSala(TipSala.values()[resultSet.getInt("tip_sala")]);
                sala.setIdRef(resultSet.getInt("id_ref"));
                sala.setImagine(Collections.singletonList(resultSet.getString("imagine")));

                List<Rezervare> rezervari = new ArrayList<>();
                String selectRezervari = "SELECT * FROM rezervare WHERE sala_id = ?";
                PreparedStatement psRez = dbConnection.prepareStatement(selectRezervari);
                psRez.setInt(1, sala.getIdSala());
                ResultSet rsRez = psRez.executeQuery();
                while (rsRez.next()) {
                    Rezervare r = new Rezervare();
                    r.setStartDate(rsRez.getDate("start_date").toLocalDate());
                    r.setEndDate(rsRez.getDate("end_date").toLocalDate());
                    rezervari.add(r);
                }
                sala.setRezervari(rezervari);
                psRez.close();

                System.out.println(sala);
                salas.add(sala);
            }
        } catch (SQLException e) {
            Logger.getLogger("Sala:getAll " + e.getMessage());
        } finally {
            ConectionFactory.close(preparedStatement);
            ConectionFactory.close(dbConnection);
        }
        return salas;
    }

}
