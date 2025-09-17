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

    public User findByUsernameAndPassword(String username, String password) {
        return UserDAO.findByUsernameAndPassword(username, password);
    }
    public int updateUserPasswordByUserId(String newPassword, int id) {
        return UserDAO.updateUserPasswordByUserId(newPassword, id);
    }

    public User getContById(int id) {
        return UserDAO.getContById(id);
    }

//    public List<Sala> gasesteToate() {
//        return (List<Sala>) salaRepository.findAll();
//    }

}
