package org.example.bookingapp.Controller;

import org.springframework.ui.Model;
import jakarta.servlet.http.HttpSession;
import org.example.bookingapp.Service.AdminService;
import org.example.bookingapp.Module.Administrator;
import org.example.bookingapp.Module.User;
import org.example.bookingapp.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private AdminService adminService;

    @GetMapping("/user/login")
    public String showRegisterForm() {
        return "mainPageUser";
    }

    @PostMapping("/adaugaUser")
    public String addUser(
            @RequestParam String username,
            @RequestParam String password,
            @RequestParam String email,
            @RequestParam String account_type,
            @RequestParam(required = false) String business_field) {

        if (account_type.equals("user")) {
            User user = new User();
            user.setName(username);
            user.setPassword(password);
            user.setEmail(email);
            userService.salveazaUser(user);
        } else if (account_type.equals("admin")) {
            Administrator admin = new Administrator();
            admin.setName(username);
            admin.setPassword(password);
            admin.setEmail(email);
            admin.setBussinesName(business_field);
            adminService.insertAdminDAO(admin);
        }

        return "redirect:/loginPage";
    }


    @PostMapping("/updateAdminPassword")
    public String updateAdminPassword(
            @RequestParam Integer id,
            @RequestParam String password) {

        adminService.updateAdminPasswordByAdminId(id, password);

        return "redirect:/contulMeuAdmin";
    }

    @PostMapping("/updateUserPassword")
    public String updateUserPassword(
            @RequestParam Integer id,
            @RequestParam String password) {

        userService.updateUserPasswordByUserId(password, id);

        return "redirect:/contulMeuUser";
    }


}
