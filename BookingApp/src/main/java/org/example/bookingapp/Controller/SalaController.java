package org.example.bookingapp.Controller;

import org.example.bookingapp.Service.SalaService;
import ch.qos.logback.core.model.Model;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.example.bookingapp.Module.Sala;

@Controller
public class SalaController {

    @Autowired
    private SalaService salaService;

    @GetMapping("/adaugaSala")
    public String formularAdaugare(Model model) {
        model.addText("sala");
        return "adauga_sala";
    }

//    @PostMapping("/adauga")
//    public String salveazaSala(@ModelAttribute Sala sala) {
//        salaService.salveazaSala(sala);
//        return "redirect:/sali";
//    }
//
//    @GetMapping("/sali")
//    public String listaSali(Model model) {
//        model.addText("sali");
//        return "sali";
//    }
}