package model;

import java.util.Date;

public record Bill(int idB, int idC, int idP, int cantitate, Date dataComanda, String numeClient, String numeProdus) {
}
