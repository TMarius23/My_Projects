package org.example.bookingapp.Module;

import jakarta.persistence.CascadeType;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;
import org.example.bookingapp.DAO.SalaDAO;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class Administrator {

    @Setter
    @Getter
    private int id;
    @Setter
    @Getter
    private String name;
    @Setter
    @Getter
    private String bussinesName;
    @Setter
    @Getter
    private String email;
    @Setter
    @Getter
    private String password;
    @Setter
    @Getter
    private int nrSaliInchiriate;
    @Setter
    @Getter
    private int nrSaliPostate;
    @Setter
    @Getter
    private int nrInchiriate;
    private List<Sala> sali = new ArrayList<>();

    public Administrator(int nrInchiriate, int nrSaliPostate, int nrSaliInchiriate, String password, String email, String name, int id, String bussinesName) {
        this.nrInchiriate = nrInchiriate;
        this.nrSaliPostate = nrSaliPostate;
        this.nrSaliInchiriate = nrSaliInchiriate;
        this.password = password;
        this.email = email;
        this.name = name;
        this.id = id;
        this.bussinesName = bussinesName;
    }

    public Administrator() {
    }

    public Administrator(int nrInchiriate, int nrSaliPostate, int nrSaliInchiriate, String password, String email, String name, String bussinesName) {
        this.nrInchiriate = nrInchiriate;
        this.nrSaliPostate = nrSaliPostate;
        this.nrSaliInchiriate = nrSaliInchiriate;
        this.password = password;
        this.email = email;
        this.name = name;
        this.bussinesName = bussinesName;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Administrator that = (Administrator) o;
        return getId() == that.getId() && getNrSaliInchiriate() == that.getNrSaliInchiriate() && getNrSaliPostate() == that.getNrSaliPostate() && getNrInchiriate() == that.getNrInchiriate() && Objects.equals(getName(), that.getName()) && Objects.equals(getEmail(), that.getEmail()) && Objects.equals(getPassword(), that.getPassword());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getName(), getEmail(), getPassword(), getNrSaliInchiriate(), getNrSaliPostate(), getNrInchiriate());
    }

    @Override
    public String toString() {
        return "Administrator{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", nrSaliInchiriate=" + nrSaliInchiriate +
                ", nrSaliPostate=" + nrSaliPostate +
                ", nrInchiriate=" + nrInchiriate +
                '}';
    }
}
