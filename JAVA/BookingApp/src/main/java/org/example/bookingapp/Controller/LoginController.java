package org.example.bookingapp.Controller;

import jakarta.servlet.http.HttpSession;
import org.example.bookingapp.DAO.SalaDAO;
import org.example.bookingapp.Module.Administrator;
import org.example.bookingapp.Module.Sala;
import org.example.bookingapp.Module.User;
import org.example.bookingapp.Service.AdminService;
import org.example.bookingapp.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class LoginController {

    @Autowired
    UserService userService;

    @Autowired
    AdminService adminService;


    @PostMapping("/login")
    public String handleLogin(@RequestParam String username,
                              @RequestParam String password,
                              @RequestParam("account_type") String accountType,
                              HttpSession session,
                              Model model) {

        System.out.println("Login primit: " + username + ", tip cont: " + accountType + ", password: " + password);

        if ("user".equals(accountType)) {
            User user = userService.findByUsernameAndPassword(username, password);
            System.out.println("Gasit " + user);
            if (user != null) {
                session.setAttribute("id_user", user.getId());
                return "redirect:/mainPageUser";
            } else {
                return "redirect:/loginPage";
            }
        }

        if ("admin".equals(accountType)) {
            Administrator admin = adminService.findAdminByNameAndPassword(username, password);
            System.out.println("Gasit " + admin);

            if (admin != null) {
                session.setAttribute("id_admin", admin.getId());
                return "redirect:/mainPageAdmin";
            } else {
                return "redirect:/loginPage";
            }
        }

        model.addAttribute("error", "Tip cont necunoscut.");
        return "loginPage";
    }

    /// User
//    @GetMapping("/mainPageUser")
//    public String userPage() {
//        return "mainPageUser";
//    }
    @GetMapping("/indexUser")
    public String showNewIndexPage() {
        return "indexUser";
    }

    @GetMapping("/contulMeuUser")
    public String contulMeuUser(HttpSession session, Model model) {
        Integer userId = (Integer) session.getAttribute("id_user");
        if (userId == null) return "loginPage";

        User user = userService.getContById(userId);
        model.addAttribute("user", user);

        return "contulMeuUser";
    }


    @GetMapping("/contactUser")
    public String showNewContactUserPage() {
        return "contactUser";
    }


    /// Administrator

//    @GetMapping("/mainPageAdmin")
//    public String adminPage() {
//        return "mainPageAdmin";
//    }
    @GetMapping("/new_account")
    public String showNewAccountPage() {
        return "new_account";
    }

    @GetMapping("/loginPage")
    public String showNewLoginPage() {
        return "loginPage";
    }

    @GetMapping("/indexAdmin")
    public String showIndexAdminPage() {
        return "indexAdmin";
    }

//    @GetMapping("/contulMeuAdmin")
//    public String showContulMeuAdminPage() {
//        return "contulMeuAdmin";
//    }

    @GetMapping("/contulMeuAdmin")
    public String contulMeuAdmin(HttpSession session, Model model) {
        Integer adminId = (Integer) session.getAttribute("id_admin");
        if (adminId == null) return "loginPage";

        Administrator admin = adminService.getContById(adminId);
        List<Sala> userHalls = SalaDAO.getAllSaliByID(adminId);

        model.addAttribute("admin", admin);
        model.addAttribute("userHalls", userHalls);

        return "contulMeuAdmin";
    }

    @GetMapping("/contactAdmin")
    public String showContactAdmin(HttpSession session, Model model) {
        Integer adminId = (Integer) session.getAttribute("id_admin");
        if (adminId == null) return "mainPageAdmin";

        Administrator admin = adminService.getContById(adminId);

        model.addAttribute("admin", admin);
        return "contactAdmin";
    }


    /// General
    @GetMapping("/about")
    public String showAboutPage() {
        return "about";
    }


}
