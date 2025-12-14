package org.example.bookingapp.Service;

import org.example.bookingapp.DAO.AdministratorDAO;
import org.example.bookingapp.Module.Administrator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {


    private final AdministratorDAO adminDAO;

    @Autowired
    public AdminService(AdministratorDAO adminDAO) {
        this.adminDAO = adminDAO;
    }

    public AdminService() {
        this.adminDAO = new AdministratorDAO();
    }

    public void insertAdminDAO(Administrator admin) {
        System.out.printf("salveazaAdmin: %s\n", admin);
        AdministratorDAO.insert(admin);
    }

    public void incrementNrSaliPostateByAdminId(Integer adminId) {
        AdministratorDAO.incrementNrSaliPostateByAdminId(adminId);
    }

    public void updateAdminPasswordByAdminId(Integer adminId, String password) {
        AdministratorDAO.updateAdminPasswordByAdminId(adminId, password);
    }

    public Administrator findAdminByNameAndPassword(String username, String password) {
        return AdministratorDAO.findAdminByNameAndPassword(username, password);
    }

    public Administrator getContById(int id) {
        return AdministratorDAO.getContById(id);
    }

}


