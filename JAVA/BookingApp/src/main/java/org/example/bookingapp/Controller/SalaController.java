package org.example.bookingapp.Controller;

import jakarta.servlet.http.HttpSession;
import org.example.bookingapp.Module.TipSala;
import org.example.bookingapp.Service.AdminService;
import org.example.bookingapp.Service.SalaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.example.bookingapp.Module.Sala;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Controller
public class SalaController {

    @Autowired
    private SalaService salaService;

    @Autowired
    private AdminService adminService;

    @GetMapping("/adaugareSala")
    public String showAdaugareSalaForm(Model model) {
        return "adaugareSala";
    }

    @PostMapping("/adaugareSala")
    public String formularAdaugare(
            @RequestParam String name,
            @RequestParam String description,
            @RequestParam double price,
            @RequestParam TipSala tipSala,
            @RequestParam("images") MultipartFile[] images,
            HttpSession session,
            Model model) throws IOException {

        Integer adminId = (Integer) session.getAttribute("id_admin");


        for (MultipartFile image : images) {
            if (!image.isEmpty()) {
                String fileName = image.getOriginalFilename();
                Path path = Paths.get("src/main/resources/static/imagini/" + fileName);
                Files.write(path, image.getBytes());

                Sala sala = new Sala();
                sala.setName(name);
                sala.setDescription(description);
                sala.setPrice(price);
                sala.setTipSala(tipSala);
                sala.setIdRef(adminId);
                sala.setImagine("/imagini/" + fileName);

                salaService.insertSala(sala);
                adminService.incrementNrSaliPostateByAdminId(adminId);
            }
        }


        return "redirect:/sali?id_admin=" + adminId;
    }

    @PostMapping("/stergeSala/{id}")
    public String stergeSala(@PathVariable Long id) {
        salaService.deleteById(id);
        return "redirect:/sali";
    }

    @GetMapping("/sali")
    public String listaSali(
            HttpSession session,
            Model model) {

        Integer adminId = (Integer) session.getAttribute("id_admin");
        model.addAttribute("sali", salaService.getAllSaliByID(adminId));
        return "sali";
    }

    @GetMapping("/mainPageAdmin")
    public String listaSaliALLA(
            Model model) {

        model.addAttribute("sali", salaService.getSaliALL());
        return "mainPageAdmin";
    }

    @GetMapping("/mainPageUser")
    public String listaSaliALLU(
            Model model) {

        model.addAttribute("sali", salaService.getSaliALL());
        return "mainPageUsers";
    }
}
