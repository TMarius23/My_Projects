package org.example.bookingapp.Service;

import org.example.bookingapp.DAO.SalaDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.example.bookingapp.Module.Sala;

import java.util.List;

@Service
public class SalaService {

    @Autowired
    private SalaDAO salaRepository;

    public void insertSala(Sala sala) {
        SalaDAO.insert(sala);
    }
    public void deleteById(Long id) {
        SalaDAO.deleteById(id);
    }

    public int getIdByIdRNamePriceImg(int idR, String name, double price, String img) {
        return SalaDAO.getIdByIdRNamePriceImg(idR,name,price, img);
    }

    public List<Sala> getAllSaliByID(int id) {
        return (List<Sala>) SalaDAO.getAllSaliByID(id);
    }

   public List<Sala> getSaliALL() {
        return (List<Sala>) SalaDAO.getSaliALL();
    }


}
