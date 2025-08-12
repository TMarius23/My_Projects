package datamodel;

import java.io.Serializable;

public class Employee implements Comparable<Employee>, Serializable {

    private int idEmployee;
    private String name;

    public Employee(int idEmployee, String name) {
        this.idEmployee = idEmployee;
        this.name = name;
    }

    public Employee() {
        this.idEmployee = 0;
        this.name = "";
    }

    public int getIdEmployee() {
        return idEmployee;
    }

    public String getName() {
        return name;
    }

    public String toString() {
        return "Employee{" + "idEmployee=" + idEmployee + ", name=" + name + '}';
    }

    @Override
    public int compareTo(Employee o) {
        return this.name.compareTo(o.name);
    }
}
