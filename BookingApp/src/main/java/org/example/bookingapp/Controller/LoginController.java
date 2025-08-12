package org.example.bookingapp.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class LoginController {

    @PostMapping("/login")
    public String handleLogin(@RequestParam String username,
                              @RequestParam String password,
                              @RequestParam("account_type") String accountType,
                              Model model) {

        // Doar pentru demo: nu verificăm parola, doar redirecționăm în funcție de cont
        System.out.println("Login primit: " + username + ", tip cont: " + accountType);

        if ("user".equals(accountType)) {
            return "/mainPageUser";
        } else if ("admin".equals(accountType)) {
            return "/mainPageAdmin";
        }

        model.addAttribute("error", "Tip de cont necunoscut");
        return "error_page";
    }

    @GetMapping("/mainPageUser")
    public String userPage() {
        return "mainPageUser";
    }

    @GetMapping("/mainPageAdmin")
    public String adminPage() {
        return "mainPageAdmin";
    }

}
