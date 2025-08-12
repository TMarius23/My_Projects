package org.example.bookingapp.Module;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

import java.util.Objects;

@Entity
public class Sala {

    @Setter
    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Setter
    @Getter
    private String name;
    @Setter
    @Getter
    private String description;
    @Setter
    @Getter
    private int nrDeInchirieri;
    @Setter
    @Getter
    private double price;
    @Setter
    @Getter
    private boolean inchiriata;
    @Setter
    @Getter
    private TipSala tipSala;

    public Sala(int id, String name, String description, int nrDeInchirieri, double price, TipSala tipSala,  boolean inchiriata) {
        this.id = id;
        this.inchiriata = inchiriata;
        this.name = name;
        this.description = description;
        this.nrDeInchirieri = nrDeInchirieri;
        this.price = price;
        this.tipSala = tipSala;
    }

    public Sala() {
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Sala sala = (Sala) o;
        return getNrDeInchirieri() == sala.getNrDeInchirieri() && Double.compare(getPrice(), sala.getPrice()) == 0 && Objects.equals(getId(), sala.getId()) && Objects.equals(getName(), sala.getName()) && Objects.equals(getDescription(), sala.getDescription()) && getTipSala() == sala.getTipSala();
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getName(), getDescription(), getNrDeInchirieri(), getPrice(), getTipSala());
    }

}
