package org.example.bookingapp.Service;

import org.example.bookingapp.DAO.RezervareDAO;
import org.example.bookingapp.Module.Rezervare;
import org.example.bookingapp.Module.Sala;
import org.example.bookingapp.Module.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class RezervareService {

    public int insertRezervation(LocalDate date, String time, Sala sala, User user) {
        Rezervare rezervare = new Rezervare();
        rezervare.setSala(sala);
        rezervare.setUser(user);

        if ("ToataZiua".equals(time)) {
            rezervare.setStartDate(date);
            rezervare.setEndDate(date);
        } else {
            rezervare.setStartDate(date);
            rezervare.setEndDate(date);
        }

        return RezervareDAO.insertRezervation(rezervare);
    }
}
