package org.example.bookingapp.Controller;

import jakarta.servlet.http.HttpSession;
import org.example.bookingapp.Module.Sala;
import org.example.bookingapp.Module.User;
import org.example.bookingapp.Service.RezervareService;
import org.example.bookingapp.Service.SalaService;
import org.example.bookingapp.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.time.LocalDate;

@Controller
public class RezervareController {

    @Autowired
    private RezervareService rezervareService;

    @Autowired
    private UserService userService;

    @Autowired
    private SalaService salaService;

    @PostMapping("/rezerva/{date}/{time}")
    @ResponseBody
    public ResponseEntity<String> rezervaSala(
            @PathVariable String date,
            @PathVariable String time,
            HttpSession session
    ) {

        try {
            System.out.println(1);
            Integer userId = (Integer) session.getAttribute("id_user");
            if (userId == null) {
                return ResponseEntity.badRequest().body("Userul nu este logat.");
            }
            System.out.println(2);
            User user = userService.getContById(userId);
            System.out.println(user);

            Integer salaId = (Integer) session.getAttribute("id_sala");
            if (salaId == null) {
                return ResponseEntity.badRequest().body("Sala nu este selectată.");
            }
            System.out.println(3);
            Sala sala = salaService.findSalaById(salaId);
            LocalDate localDate = LocalDate.parse(date);

            System.out.println(4);
            rezervareService.insertRezervation(localDate, time, sala, user);
            System.out.println(5);
            return ResponseEntity.ok("Rezervarea a fost salvată cu succes!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Eroare la salvarea rezervării.");
        }
    }
}
