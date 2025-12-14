package org.example.bookingapp.Module;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "user")
public class User {

    @Id
    @Getter @Setter
    private int id;
    @Getter @Setter
    private String name;
    @Getter @Setter
    private String email;
    @Getter @Setter
    private String password;
    @Getter @Setter
    private int nr_sali_inchiriate;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @Getter @Setter
    private List<Rezervare> rezervari = new ArrayList<>();

    public User(int id, String name, String email, String password, int nrSaliInchiriate) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.nr_sali_inchiriate = nrSaliInchiriate;
    }

    public User(int id, String name, String email, String password, int nrSaliInchiriate, List<Rezervare> rezervari) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.nr_sali_inchiriate = nrSaliInchiriate;
        this.rezervari = rezervari;
    }

    public User(String name, String email, String password, int nrSaliInchiriate) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.nr_sali_inchiriate = nrSaliInchiriate;
    }

    public User() {
    }


    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", nrSaliInchiriate=" + nr_sali_inchiriate +
                '}';
    }


}
