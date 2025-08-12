package org.example.bookingapp;

import org.example.bookingapp.connection.ConectionFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.sql.Connection;
import java.sql.SQLException;

@SpringBootApplication
public class BookingAppApplication {

    public static void main(String[] args) {
        SpringApplication.run(BookingAppApplication.class, args);

        ConectionFactory factory = new ConectionFactory();
        try (Connection con = ConectionFactory.getConnection()) {
            System.out.println("Conexiune reușită la baza de date!");
        } catch (SQLException e) {
            e.printStackTrace();
        }

    }

}
