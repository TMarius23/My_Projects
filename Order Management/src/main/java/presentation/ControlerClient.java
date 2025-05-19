package presentation;

import businesslogic.ClientBLL;
import dataaccess.ClientDAO;
import model.Client;

import java.util.List;

public class ControlerClient {

    ClientBLL clientBLL = new ClientBLL();

    /**
     * Inserarea clientilor in baza de date
     *
     * @param identificator
     * @param nume
     * @param email
     * @param varsta
     * @return
     */
    public int insterClients(String identificator, String nume, String email, String varsta) {
        int age = Integer.parseInt(varsta);
        Client c = new Client(1, nume, identificator, age, email);

        return clientBLL.insertClient(c);
    }

    /**
     * Validarea daatelor dupa anumite criterii
     *
     * @param nume
     * @param identificatorU
     * @return
     */
    public int validareDate(String nume, String identificatorU) {

        return clientBLL.validareDate(nume, identificatorU);
    }

    /**
     * Validarea datelor si returnarea primului Id returnat de functie
     *
     * @param nume
     * @param identificatorU
     * @return
     */

    public int validareDateRId(String nume, String identificatorU) {

        return clientBLL.validareDateRId(nume, identificatorU);
    }

    /**
     * Update asupra unui client din baza de date
     *
     * @param idClient
     * @param nume
     * @param email
     * @param identificatorU
     * @param varsta
     * @return
     */

    public int updateDateClienti(int idClient, String nume, String email, String identificatorU, String varsta) {
        int age = Integer.parseInt(varsta);
        Client c = new Client(idClient, nume, identificatorU, age, email);
        return clientBLL.updateDateClienti(c);
    }

    /**
     * Stergerea unui Client dupa anumiti parametri de intrare
     *
     * @param nume
     * @param identificatorU
     * @return
     */

    public int deteleteDataNumeId(String nume, String identificatorU) {
        return clientBLL.deteleteDataNumeId(nume, identificatorU);
    }

    /**
     * Returnarea unei liste cu toti clienti returnati dupa un criteriu de sortare
     *
     * @param nume
     * @return
     */

    public List<Client> getAllClientsByName(String nume) {
        return clientBLL.getAllClientsByName(nume);
    }

    /**
     * Returnarea unei liste cu toti clienti returnati dupa un criteriu de sortare
     *
     * @param idClient
     * @return
     */

    public Client getAllClientsById(String idClient) {
        int id = Integer.parseInt(idClient);
        return clientBLL.getAllClientsById(id);
    }

    /**
     * Returnarea unei liste cu toti clienti
     *
     * @return
     */

    public List<Client> getAllClients() {
        return clientBLL.getAllClients();
    }
}
