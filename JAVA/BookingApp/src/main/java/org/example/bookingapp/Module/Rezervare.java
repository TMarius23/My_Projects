package org.example.bookingapp.Module;

import jakarta.persistence.*;
import lombok.Data;
import org.example.bookingapp.Module.Sala;

import java.time.LocalDate;

@Data
@Entity
@Table(name = "rezervare")
public class Rezervare {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private LocalDate startDate;
    private LocalDate endDate;

    @ManyToOne
    @JoinColumn(name = "sala_id")
    private Sala sala;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
