package org.example.bookingapp.Service;


import org.example.bookingapp.DAO.UserDAO;
import org.example.bookingapp.Module.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {


    private final UserDAO userDAO;

    @Autowired
    public UserService(UserDAO userDAO) {
        this.userDAO = userDAO;
    }

    public UserService() {
        this.userDAO = new UserDAO();
    }

    public void salveazaUser(User user) {
        System.out.printf("salveazaUser: %s\n", user);
        userDAO.insert(user);
    }

//    public List<Sala> gasesteToate() {
//        return (List<Sala>) salaRepository.findAll();
//    }

}
