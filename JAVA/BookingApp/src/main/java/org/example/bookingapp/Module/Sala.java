package org.example.bookingapp.Module;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.*;

@Entity
@Table(name = "sala")
public class Sala {

    @Setter
    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idSala;
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
    @Getter
    @Setter
    private int idRef;
    @Getter
    @Setter
    private List<String> imagine = new ArrayList<>();
    @Getter
    @Setter
    @OneToMany(mappedBy = "sala", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Rezervare> rezervari = new ArrayList<>();

    public Sala(String name, String description, int nrDeInchirieri, double price, boolean inchiriata, TipSala tipSala, int idRef) {
        this.name = name;
        this.description = description;
        this.nrDeInchirieri = nrDeInchirieri;
        this.price = price;
        this.inchiriata = inchiriata;
        this.tipSala = tipSala;
        this.idRef = idRef;
    }

   public Sala(String name, String description, int nrDeInchirieri, double price, boolean inchiriata, TipSala tipSala, int idRef, List<Rezervare> dataInchiriere, List<String> imagine) {
        this.name = name;
        this.description = description;
        this.nrDeInchirieri = nrDeInchirieri;
        this.price = price;
        this.inchiriata = inchiriata;
        this.tipSala = tipSala;
        this.idRef = idRef;
        this.rezervari = dataInchiriere;
        this.imagine = imagine;
    }

    public Sala(String name, String description, int nrDeInchirieri, double price, boolean inchiriata, TipSala tipSala, int idRef, List<String> imagine) {
        this.name = name;
        this.description = description;
        this.nrDeInchirieri = nrDeInchirieri;
        this.price = price;
        this.inchiriata = inchiriata;
        this.tipSala = tipSala;
        this.idRef = idRef;
        this.imagine = imagine;
    }

    public Sala(int idRef, String name, String description, int nrDeInchirieri, double price, TipSala tipSala, boolean inchiriata) {
        this.idRef = idRef;
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
        return getNrDeInchirieri() == sala.getNrDeInchirieri() && Double.compare(getPrice(), sala.getPrice()) == 0 && isInchiriata() == sala.isInchiriata() && getIdRef() == sala.getIdRef() && Objects.equals(getName(), sala.getName()) && Objects.equals(getDescription(), sala.getDescription()) && getTipSala() == sala.getTipSala();
    }

    @Override
    public int hashCode() {
        return Objects.hash(getName(), getDescription(), getNrDeInchirieri(), getPrice(), isInchiriata(), getTipSala(), getIdRef());
    }

    public String getPrimaImagine() {
        return imagine != null && !imagine.isEmpty() ? imagine.get(0) : "/imagini/default.jpg";
    }


    @Override
    public String toString() {
        return "Sala{" +
                "idSala=" + idSala +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", nrDeInchirieri=" + nrDeInchirieri +
                ", price=" + price +
                ", inchiriata=" + inchiriata +
                ", tipSala=" + tipSala +
                ", idRef=" + idRef +
                '}';
    }
}
