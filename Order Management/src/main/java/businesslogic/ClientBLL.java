package businesslogic;

import dataaccess.AbstractDAO;
import model.Client;

import java.util.List;
import java.util.Set;

import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import jakarta.validation.ConstraintViolation;

public class ClientBLL extends AbstractDAO<Client> {

    AbstractDAO<Client> clientDAO = new AbstractDAO<>(Client.class);

//    public int insertClient(Client client) {
//        return ClientDAO.insert(client);
//    }

    /**
     * Inserarea unui client si validarea datelor introduse
     * @param client
     * @return
     */

    public int insertClient(Client client) {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();
        Set<ConstraintViolation<Client>> violations = validator.validate(client);
        if (violations.isEmpty()) {
            System.out.println("Ok");
            return clientDAO.insertwithoutId(client).getId();
        } else {
            System.out.println("Nu Ok");
            return 0;
        }
    }

    //    public int validareDate(String nume, String identificator) {
//        return ClientDAO.cautareNumeIdentif(nume, identificator);
//    }
//

    /**
     * Validarea datelor pentru anumite functii date de client
     * @param nume
     * @param identificator
     * @return
     */
    public int validareDate(String nume, String identificator) {
        List<Client> c = clientDAO.findByCriteria("nume", "identificatorUnic", nume, identificator);
        return c.size();
    }

//    public int validareDateRId(String nume, String identificator) {
//        return ClientDAO.cautareNumeIdentifRId(nume, identificator);
//    }

    /**
     * Validarea datelor si returnarea Id-ului primului client gasit
     * @param nume
     * @param identificator
     * @return
     */
    public int validareDateRId(String nume, String identificator) {
        List<Client> c = clientDAO.findByCriteria("nume", "identificatorUnic", nume, identificator);
        if (c.size() > 1)
            return 0;
        return c.getFirst().getId();
    }

//    public int updateDateCleinti(int idCleint, String nume, String email, String identificator, int varsta) {
//        return ClientDAO.updateDateClient(idCleint, nume, email, identificator, varsta);
//    }

    /**
     * Validare date introduse si update la client
     * @param client
     * @return
     */
    public int updateDateClienti(Client client) {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();
        Set<ConstraintViolation<Client>> violations = validator.validate(client);
        if (violations.isEmpty()) {
            Client c = clientDAO.updateDateById(client, client.getId());
            if (c == null)
                return 0;
            return 1;
        } else {
            return 0;
        }
    }

//    public int deteleteDataNumeId(String nume, String identificator) {
//        return ClientDAO.deteleteDataNumeId(nume, identificator);
//    }

    /**
     * Delete la un client pe baza a 2 criterii de identificare
     * @param nume
     * @param identificator
     * @return
     */

    public int deteleteDataNumeId(String nume, String identificator) {
        return clientDAO.deleteBy2Criteria("nume", "identificatorUnic", nume, identificator);
    }

    //    public List<Client> getAllClientsByName(String nume) {
//
//        return ClientDAO.getAllClientsByName(nume);
//    }

    /**
     * Returnarea listei clientiilor care au acelasi nume
     * @param nume
     * @return
     */
    public List<Client> getAllClientsByName(String nume) {
        return clientDAO.findByCriteria("nume", nume);
    }

//    public Client getAllClientsById(int id) {
//        return ClientDAO.getAllClientsById(id);
//    }

    /**
     * Returnarea unui client dupa un id cautat
     * @param id
     * @return
     */
    public Client getAllClientsById(int id) {
        return clientDAO.findById(id);
    }

//    public List<Client> getAllClients() {
//        return ClientDAO.getAllClients();
//    }

    /**
     * returnarea liste de clienti cu toate elementele din baza de date
     * @return
     */
    public List<Client> getAllClients() {
        return clientDAO.getAll();
    }
}
