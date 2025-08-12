package org.example.bookingapp.Module;

public class Administrator {

    private int id;
    private String name;
    private String email;
    private String password;
    private int nrSaliInchiriate;
    private int nrSaliPostate;
    private int nrInchiriate;

    public Administrator(int nrInchiriate, int nrSaliPostate, int nrSaliInchiriate, String password, String email, String name, int id) {
        this.nrInchiriate = nrInchiriate;
        this.nrSaliPostate = nrSaliPostate;
        this.nrSaliInchiriate = nrSaliInchiriate;
        this.password = password;
        this.email = email;
        this.name = name;
        this.id = id;
    }

   public Administrator(int nrInchiriate, int nrSaliPostate, int nrSaliInchiriate, String password, String email, String name) {
        this.nrInchiriate = nrInchiriate;
        this.nrSaliPostate = nrSaliPostate;
        this.nrSaliInchiriate = nrSaliInchiriate;
        this.password = password;
        this.email = email;
        this.name = name;
        this.id = id;
    }

}
