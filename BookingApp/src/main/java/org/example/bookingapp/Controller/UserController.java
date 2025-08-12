package org.example.bookingapp.Controller;

import org.springframework.ui.Model;
import org.example.bookingapp.Module.Administrator;
import org.example.bookingapp.Module.User;
import org.example.bookingapp.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class UserController {

    @Autowired
    private UserService userService = new UserService();

    @PostMapping("/adaugaUser")
    public String handleRegister(@RequestParam String username,
                                 @RequestParam String password,
                                 @RequestParam String email,
                                 @RequestParam(name = "account_type") String accountType,
                                 @RequestParam(required = false) String business_field,
                                 Model model) {

        System.out.println("Form submitted: " + username);
        if ("user".equals(accountType)) {
            User user = new User(username, email, password, 0);
            System.out.println(user);
            userService.salveazaUser(user);
            return showRegisterForm();

        } else if ("admin".equals(accountType)) {
            if (business_field == null || business_field.trim().isEmpty()) {
                model.addAttribute("error", "Mesaj de eroare aici");
                return "pagina_eroare";
            }

            Administrator admin = new Administrator(0, 0, 0, password, email, username);
            // adminService.salveazaAdmin(admin);
            return "indexAdmin";
        }

        model.addAttribute("error", "Mesaj de eroare aici");
        return "pagina_eroare";
    }

    @PostMapping("/testPost")
    public String handleTestPost(@RequestParam String username,
                                 @RequestParam String password,
                                 @RequestParam String email,
                                 @RequestParam(name = "account_type") String accountType,
                                 @RequestParam(required = false) String business_field,
                                 Model model) {
        System.out.println("POST pe /testPost a fost primit!");

        return "indexUser";
    }

    @GetMapping("/login")
    public String showRegisterForm() {
        return "mainPageUser";
    }

    @GetMapping("/new_account")
    public String showNewAccountPage() {
        return "new_account";
    }

    @GetMapping("/loginPage")
    public String showNewLoginPage() {
        return "loginPage";
    }

    @GetMapping("/indexUser")
    public String showNewIndexPage() {
        return "indexUser";
    }

    @GetMapping("/contulMeuUser")
    public String showNewContulMewUserPage() {
        return "contulMeuUser";
    }

    @GetMapping("/contactUser")
    public String showNewContactUserPage() {
        return "contactUser";
    }

    @GetMapping("/about")
    public String  showAboutPage() {
        return "about";
    }


}
