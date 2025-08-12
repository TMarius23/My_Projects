package org.example.bookingapp.Service;

import org.example.bookingapp.DAO.SalaDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.example.bookingapp.Module.Sala;

@Service
public class SalaService {
    @Autowired
    private SalaDAO salaRepository;

    public void salveazaSala(Sala sala) {
        salaRepository.insert(sala);
    }

//    public List<Sala> gasesteToate() {
//        return (List<Sala>) salaRepository.findAll();
//    }


}
