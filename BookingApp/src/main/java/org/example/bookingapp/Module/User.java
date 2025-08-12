package org.example.bookingapp.Module;

public class User {

    private int id;
    private String name;
    private String email;
    private String password;
    private int nrSaliInchiriate;

    public User(int id, String name, String email, String password, int nrSaliInchiriate) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.nrSaliInchiriate = nrSaliInchiriate;
    }

    public User(String name, String email, String password, int nrSaliInchiriate) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.nrSaliInchiriate = nrSaliInchiriate;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getNrSaliInchiriate() {
        return nrSaliInchiriate;
    }

    public void setNrSaliInchiriate(int nrSaliInchiriate) {
        this.nrSaliInchiriate = nrSaliInchiriate;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", nrSaliInchiriate=" + nrSaliInchiriate +
                '}';
    }
}
