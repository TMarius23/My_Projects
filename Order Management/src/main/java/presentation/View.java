package presentation;

import model.Bill;
import model.Client;
import model.Product;

import javax.swing.*;
import java.awt.*;


public class View extends JFrame {

    /**
     * Declaram atributele clasei pentru a ne putea folosi de ele in clase
     */

    private int loc_cur = 0;
    private JButton butonBackPage1;
    private JButton butonBackPage2;
    private JButton butonAddClient;


    ControlerClient controlerClient;
    ControlerProduct controlerProduct;
    ControlerOrder controlerOrder;
    ControlerBill controlerBill;

    /**
     * Facem un constructor unde se initializeaza Clasele de legatura/De de prelucrare a datelor
     * introduse de la tastatura
     */
    public View() {
        controlerClient = new ControlerClient();
        controlerProduct = new ControlerProduct();
        controlerOrder = new ControlerOrder();
        controlerBill = new ControlerBill();
    }

    /**
     * Initializam GUI ul. Si il aducem la valorile si parametri doriti de noi
     */
    private void init() {
        this.setTitle("Orders Management System");
        this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        this.setSize(500, 500);
        this.setLocationRelativeTo(null);
        this.setVisible(true);
    }

    /**
     * Functie care ne afiseaza pe ecran un mesaj
     */

    private void showError(String errMessage) {
        JOptionPane.showMessageDialog(this, errMessage);
    }

    /// Client
    /// ///////////////////////////////////
    /// ///////////////////////////////////
    /// ///////////////////////////////////
    /// ///////////////////////////////////

    /**
     * Pagina pentru a adaua un client cu butoanele si comenzile aferente
     */

    private void interfataAddClient() {
        JPanel panel_principal = new JPanel();
        panel_principal.setLayout(new BorderLayout());


        panel_principal.setBorder(BorderFactory.createEmptyBorder(30, 30, 30, 30));
        panel_principal.setBackground(new Color(238, 232, 170));


        JLabel label_text = new JLabel("Inserare client");
        label_text.setFont(new Font("Arial", Font.BOLD, 22));
        JPanel panel_label_text = new JPanel();
        label_text.setBackground(new Color(238, 232, 170));
        panel_label_text.setBackground(new Color(238, 232, 170));
        panel_label_text.add(label_text, CENTER_ALIGNMENT);

        panel_principal.add(panel_label_text, BorderLayout.PAGE_START);

        JLabel matriceButoane_principala = new JLabel();
        matriceButoane_principala.setBackground(new Color(140, 252, 43));
        matriceButoane_principala.setLayout(new GridLayout(3, 1));

        JLabel matriceButoane = new JLabel();
        matriceButoane.setBackground(new Color(238, 232, 170));
        matriceButoane.setLayout(new GridLayout(4, 2));

        matriceButoane_principala.add(matriceButoane, CENTER_ALIGNMENT);

        panel_principal.add(matriceButoane_principala, BorderLayout.CENTER);


        JTextField textFieldIdentificatorUnic = new JTextField("");
        JTextField textFieldName = new JTextField("");
        JTextField textFieldEmail = new JTextField("");
        JTextField textFieldVarsta = new JTextField("");

        matriceButoane.add(new JLabel("                               Name:"), CENTER_ALIGNMENT);
        matriceButoane.add(textFieldName);
        matriceButoane.add(new JLabel("                               Email:"), CENTER_ALIGNMENT);
        matriceButoane.add(textFieldEmail);
        matriceButoane.add(new JLabel("                                 Varsta:"), CENTER_ALIGNMENT);
        matriceButoane.add(textFieldVarsta);
        matriceButoane.add(new JLabel("                          Identificato unic:"), CENTER_ALIGNMENT);
        matriceButoane.add(textFieldIdentificatorUnic);


        butonAddClient = new JButton("Insert");
        butonAddClient.setBackground(new Color(140, 252, 43));
        butonAddClient.addActionListener(_ -> {
            String nume, email, identificator, varsta;
            try {
                nume = String.valueOf(textFieldName.getText());
                identificator = String.valueOf(textFieldIdentificatorUnic.getText());
                email = String.valueOf(textFieldEmail.getText());
                varsta = String.valueOf(textFieldVarsta.getText());

                int status = controlerClient.insterClients(identificator, nume, email, varsta);
                if (status != 0) {
                    showError("Inserare reusita");
                } else {
                    showError("Inserare nereusita");
                }
                textFieldName.setText("");
                textFieldIdentificatorUnic.setText("");
                textFieldEmail.setText("");
                textFieldVarsta.setText("");

            } catch (Exception ex) {
                showError("Parametri gresiti!");

                textFieldName.setText("");
                textFieldIdentificatorUnic.setText("");
                textFieldEmail.setText("");
                textFieldVarsta.setText("");
                return;
            }
        });


        JPanel panelButonInsert = new JPanel();
        panelButonInsert.setBackground(new Color(238, 232, 170));
        panelButonInsert.setLayout(new FlowLayout());
        butonAddClient.setSize(new Dimension(100, 50));
        panelButonInsert.add(butonAddClient);
        matriceButoane_principala.add(panelButonInsert, CENTER_ALIGNMENT);


        butonBackPage2 = new JButton("Back Page");
        butonBackPage2.setBackground(Color.RED);
        panel_principal.add(butonBackPage2, BorderLayout.PAGE_END);
        butonBackPage2.addActionListener(_ -> {
            loc_cur = 2;
            getContentPane().removeAll();
            interfataClient();
            revalidate();
            repaint();
        });

        this.getContentPane().removeAll();
        this.add(panel_principal);
        this.revalidate();
        this.repaint();
        this.setVisible(true);
    }

    /**
     * Pagina pentru a edita un client cu butoanele si comenzile aferente
     */

    private void modificareParametriClient(int idClient) {
        JPanel panel_principal = new JPanel();
        panel_principal.setLayout(new BorderLayout());


        panel_principal.setBorder(BorderFactory.createEmptyBorder(30, 30, 30, 30));
        panel_principal.setBackground(new Color(238, 232, 170));


        JLabel label_text = new JLabel("Modificare date client");
        label_text.setFont(new Font("Arial", Font.BOLD, 22));
        JPanel panel_label_text = new JPanel();
        label_text.setBackground(new Color(238, 232, 170));
        panel_label_text.setBackground(new Color(238, 232, 170));
        panel_label_text.add(label_text, CENTER_ALIGNMENT);

        panel_principal.add(panel_label_text, BorderLayout.PAGE_START);

        JLabel matriceButoane_principala = new JLabel();
        matriceButoane_principala.setBackground(new Color(140, 252, 43));
        matriceButoane_principala.setLayout(new GridLayout(3, 1));

        JLabel matriceButoane = new JLabel();
        matriceButoane.setBackground(new Color(238, 232, 170));
        matriceButoane.setLayout(new GridLayout(4, 2));

        matriceButoane_principala.add(matriceButoane, CENTER_ALIGNMENT);

        panel_principal.add(matriceButoane_principala, BorderLayout.CENTER);


        JTextField textFieldIdentif = new JTextField("");
        JTextField textFieldName = new JTextField("");
        JTextField textFieldEmail = new JTextField("");
        JTextField textFieldVarsta = new JTextField("");

        matriceButoane.add(new JLabel("                               Nume :"), CENTER_ALIGNMENT);
        matriceButoane.add(textFieldName);
        matriceButoane.add(new JLabel("                           Identificator Unic:"), CENTER_ALIGNMENT);
        matriceButoane.add(textFieldIdentif);
        matriceButoane.add(new JLabel("                               Email:"), CENTER_ALIGNMENT);
        matriceButoane.add(textFieldEmail);
        matriceButoane.add(new JLabel("                               Varsta:"), CENTER_ALIGNMENT);
        matriceButoane.add(textFieldVarsta);


        JButton butonConfirmaEditareaClient = new JButton("Modificare");
        butonConfirmaEditareaClient.setBackground(new Color(140, 252, 43));
        butonConfirmaEditareaClient.addActionListener(_ -> {
            String nume, email, identificator, varsta;
            try {
                nume = String.valueOf(textFieldName.getText());
                identificator = String.valueOf(textFieldIdentif.getText());
                varsta = String.valueOf(textFieldVarsta.getText());
                email = String.valueOf(textFieldEmail.getText());

                int status = controlerClient.updateDateClienti(idClient, nume, email, identificator, varsta);

                if (status == 1) {
                    showError("Datele s-au modificat cu succes!");
                } else {
                    showError("Datele nu s-au modificat cu succes!");
                    return;
                }

                textFieldName.setText("");
                textFieldIdentif.setText("");
                textFieldVarsta.setText("");
                textFieldEmail.setText("");


            } catch (Exception ex) {
                showError("Parametri gresiti!");

                textFieldName.setText("");
                textFieldIdentif.setText("");
                textFieldEmail.setText("");
                textFieldVarsta.setText("");
                return;
            }
        });

        JPanel panelButonInsert = new JPanel();
        panelButonInsert.setBackground(new Color(238, 232, 170));
        panelButonInsert.setLayout(new FlowLayout());
        butonConfirmaEditareaClient.setSize(new Dimension(100, 50));
        panelButonInsert.add(butonConfirmaEditareaClient);
        matriceButoane_principala.add(panelButonInsert, CENTER_ALIGNMENT);


        butonBackPage2 = new JButton("Back Page");
        butonBackPage2.setBackground(Color.RED);
        panel_principal.add(butonBackPage2, BorderLayout.PAGE_END);
        butonBackPage2.addActionListener(_ -> {
            loc_cur = 2;
            getContentPane().removeAll();
            interfataClient();
            revalidate();
            repaint();
        });

        this.getContentPane().removeAll();
        this.add(panel_principal);
        this.revalidate();
        this.repaint();
        this.setVisible(true);
    }

    /**
     * Pagina pentru a putea verifica daca clientul iti spune bine datele de contact cu care
     * el este inregistrat in sistem si totodata cu butoanele si comenzile aferente
     */

    private void interfataEditClient() {
        JPanel panel_principal = new JPanel();
        panel_principal.setLayout(new BorderLayout());


        panel_principal.setBorder(BorderFactory.createEmptyBorder(30, 30, 30, 30));
        panel_principal.setBackground(new Color(238, 232, 170));


        JLabel label_text = new JLabel("Editare client");
        label_text.setFont(new Font("Arial", Font.BOLD, 22));
        JPanel panel_label_text = new JPanel();
        label_text.setBackground(new Color(238, 232, 170));
        panel_label_text.setBackground(new Color(238, 232, 170));
        panel_label_text.add(label_text, CENTER_ALIGNMENT);

        panel_principal.add(panel_label_text, BorderLayout.PAGE_START);

        JLabel matriceButoane_principala = new JLabel();
        matriceButoane_principala.setBackground(new Color(140, 252, 43));
        matriceButoane_principala.setLayout(new GridLayout(3, 1));

        JLabel matriceButoane = new JLabel();
        matriceButoane.setBackground(new Color(238, 232, 170));
        matriceButoane.setLayout(new GridLayout(4, 2));

        matriceButoane_principala.add(matriceButoane, CENTER_ALIGNMENT);

        panel_principal.add(matriceButoane_principala, BorderLayout.CENTER);


        JTextField textFieldIdentif = new JTextField("");
        JTextField textFieldName = new JTextField("");
        JTextField textFieldEmail = new JTextField("");

        matriceButoane.add(new JLabel(""));
        matriceButoane.add(new JLabel(""));
        matriceButoane.add(new JLabel("                               Nume :"), CENTER_ALIGNMENT);
        matriceButoane.add(textFieldName);
        matriceButoane.add(new JLabel("                           Identificator Unic:"), CENTER_ALIGNMENT);
        matriceButoane.add(textFieldIdentif);
        matriceButoane.add(new JLabel(""));
        matriceButoane.add(new JLabel(""));


        JButton butonEditClient = new JButton("Modificare");
        butonEditClient.setBackground(new Color(140, 252, 43));
        butonEditClient.addActionListener(_ -> {
            String nume, id;
            try {
                nume = String.valueOf(textFieldName.getText());
                id = String.valueOf(textFieldIdentif.getText());

                int status = controlerClient.validareDate(nume, id);
                if (status == 1) {
                    int idClient = controlerClient.validareDateRId(nume, id);
                    modificareParametriClient(idClient);
                } else {
                    showError("Date gresite!");
                    textFieldName.setText("");
                    textFieldIdentif.setText("");
                    return;
                }

            } catch (Exception ex) {
                showError("Parametri gresiti!");

                textFieldName.setText("");
                textFieldIdentif.setText("");
                textFieldEmail.setText("");
                return;
            }
        });

        JPanel panelButonInsert = new JPanel();
        panelButonInsert.setBackground(new Color(238, 232, 170));
        panelButonInsert.setLayout(new FlowLayout());
        butonEditClient.setSize(new Dimension(100, 50));
        panelButonInsert.add(butonEditClient);
        matriceButoane_principala.add(panelButonInsert, CENTER_ALIGNMENT);


        butonBackPage2 = new JButton("Back Page");
        butonBackPage2.setBackground(Color.RED);
        panel_principal.add(butonBackPage2, BorderLayout.PAGE_END);
        butonBackPage2.addActionListener(_ -> {
            loc_cur = 2;
            getContentPane().removeAll();
            interfataClient();
            revalidate();
            repaint();
        });

        this.getContentPane().removeAll();
        this.add(panel_principal);
        this.revalidate();
        this.repaint();
        this.setVisible(true);
    }

    /**
     * Pagina pentru a sterge un client cu butoanele si comenzile aferente
     */

    private void interfataDeletClient() {
        JPanel panel_principal = new JPanel();
        panel_principal.setLayout(new BorderLayout());


        panel_principal.setBorder(BorderFactory.createEmptyBorder(30, 30, 30, 30));
        panel_principal.setBackground(new Color(238, 232, 170));


        JLabel label_text = new JLabel("Stergere client");
        label_text.setFont(new Font("Arial", Font.BOLD, 22));
        JPanel panel_label_text = new JPanel();
        label_text.setBackground(new Color(238, 232, 170));
        panel_label_text.setBackground(new Color(238, 232, 170));
        panel_label_text.add(label_text, CENTER_ALIGNMENT);

        panel_principal.add(panel_label_text, BorderLayout.PAGE_START);

        JLabel matriceButoane_principala = new JLabel();
        matriceButoane_principala.setBackground(new Color(140, 252, 43));
        matriceButoane_principala.setLayout(new GridLayout(3, 1));

        JLabel matriceButoane = new JLabel();
        matriceButoane.setBackground(new Color(238, 232, 170));
        matriceButoane.setLayout(new GridLayout(4, 2));

        matriceButoane_principala.add(matriceButoane, CENTER_ALIGNMENT);

        panel_principal.add(matriceButoane_principala, BorderLayout.CENTER);


        JTextField textFieldNume = new JTextField("");
        JTextField textFieldIdentificator = new JTextField("");

        matriceButoane.add(new JLabel(""));
        matriceButoane.add(new JLabel(""));
        matriceButoane.add(new JLabel("                           Nume:"), CENTER_ALIGNMENT);
        matriceButoane.add(textFieldNume);
        matriceButoane.add(new JLabel("               Identificator unic client:"), CENTER_ALIGNMENT);
        matriceButoane.add(textFieldIdentificator);
        matriceButoane.add(new JLabel(""));
        matriceButoane.add(new JLabel(""));


        JButton butonDeleteClient = new JButton("Stergere");
        butonDeleteClient.setBackground(new Color(140, 252, 43));
        butonDeleteClient.addActionListener(_ -> {
            String nume, identificator;
            try {
                nume = String.valueOf(textFieldNume.getText());
                identificator = String.valueOf(textFieldIdentificator.getText());

                int state = controlerClient.deteleteDataNumeId(nume, identificator);
                if (state == 1) {
                    showError("Stergere cu succes!");
                } else {
                    showError("Datele nu s-au putut sterge!");
                }
                textFieldNume.setText("");
                textFieldIdentificator.setText("");

            } catch (Exception ex) {
                showError("Parametri gresiti!");

                textFieldNume.setText("");
                textFieldIdentificator.setText("");
                return;
            }
        });

        JPanel panelButonInsert = new JPanel();
        panelButonInsert.setBackground(new Color(238, 232, 170));
        panelButonInsert.setLayout(new FlowLayout());
        butonDeleteClient.setSize(new Dimension(100, 50));
        panelButonInsert.add(butonDeleteClient);
        matriceButoane_principala.add(panelButonInsert, CENTER_ALIGNMENT);


        butonBackPage2 = new JButton("Back Page");
        butonBackPage2.setBackground(Color.RED);
        panel_principal.add(butonBackPage2, BorderLayout.PAGE_END);
        butonBackPage2.addActionListener(_ -> {
            loc_cur = 2;
            getContentPane().removeAll();
            interfataClient();
            revalidate();
            repaint();
        });

        this.getContentPane().removeAll();
        this.add(panel_principal);
        this.revalidate();
        this.repaint();
        this.setVisible(true);
    }

    /**
     * Pagina pentru a vedea toti clientii care ii avem in baza de
     * date cu butoanele si comenzile aferente
     */

    private void interfataViewClienti() {
        JPanel panel_principal = new JPanel();
        panel_principal.setLayout(new BorderLayout());

        panel_principal.setBorder(BorderFactory.createEmptyBorder(30, 30, 30, 30));
        panel_principal.setBackground(new Color(238, 232, 170));


        JLabel label_text = new JLabel("Vizualizare clienti");
        label_text.setFont(new Font("Arial", Font.BOLD, 22));
        JPanel panel_label_text = new JPanel();
        label_text.setBackground(new Color(238, 232, 170));
        panel_label_text.setBackground(new Color(238, 232, 170));
        panel_label_text.add(label_text, CENTER_ALIGNMENT);

        panel_principal.add(panel_label_text, BorderLayout.PAGE_START);

        AbstractView<Client> clientAbstractView = new AbstractView<>();
        JTable tabelaClienti = clientAbstractView.createTable(controlerClient.getAllClients());

        JScrollPane scrollPane = new JScrollPane(tabelaClienti);
        panel_principal.add(scrollPane, BorderLayout.CENTER);
        panel_principal.revalidate();
        panel_principal.repaint();


        butonBackPage2 = new JButton("Back Page");
        butonBackPage2.setBackground(Color.RED);
        panel_principal.add(butonBackPage2, BorderLayout.PAGE_END);
        butonBackPage2.addActionListener(_ -> {
            loc_cur = 2;
            getContentPane().removeAll();
            interfataClient();
            revalidate();
            repaint();
        });

        this.getContentPane().removeAll();
        this.add(panel_principal);
        this.revalidate();
        this.repaint();
        this.setVisible(true);
    }

    /**
     * Pagina principala de unde poti selecta ce doresti sa faci legat de un client
     */

    private void interfataClient() {
        JPanel panel_principal = new JPanel();
        panel_principal.setLayout(new BorderLayout());


        panel_principal.setBorder(BorderFactory.createEmptyBorder(30, 30, 30, 30));
        panel_principal.setBackground(new Color(238, 232, 170));

        JLabel labelTitlu = new JLabel("Gestionarea Clienti", SwingConstants.CENTER);
        labelTitlu.setFont(new Font("Segoe UI", Font.BOLD, 26));
        labelTitlu.setForeground(new Color(50, 50, 50));

        JPanel panelTitlu = new JPanel();
        panelTitlu.setBackground(new Color(238, 232, 170));
        panelTitlu.add(labelTitlu);
        panel_principal.add(panelTitlu, BorderLayout.NORTH);

        JPanel matriceButoane = new JPanel(new GridLayout(4, 1, 15, 15));
        matriceButoane.setBackground(new Color(238, 232, 170));


        JButton butonAdaugareClienti = new JButton("Adaugare client");
        butonAdaugareClienti.setBackground(new Color(100, 200, 150));
        butonAdaugareClienti.setFont(new Font("Segoe UI", Font.PLAIN, 18));
        butonAdaugareClienti.setFocusPainted(false);
        butonAdaugareClienti.setForeground(Color.WHITE);
        butonAdaugareClienti.addActionListener(e -> {
            loc_cur = 5;
            getContentPane().removeAll();
            interfataAddClient();
            revalidate();
            repaint();
        });

        JButton butonEditareClienti = new JButton("Editare client");
        butonEditareClienti.setBackground(new Color(100, 200, 150));
        butonEditareClienti.setFont(new Font("Segoe UI", Font.PLAIN, 18));
        butonEditareClienti.setFocusPainted(false);
        butonEditareClienti.setForeground(Color.WHITE);
        butonEditareClienti.addActionListener(e -> {
            loc_cur = 6;
            getContentPane().removeAll();
            interfataEditClient();
            revalidate();
            repaint();
        });

        JButton butonStergereClienti = new JButton("Stergere client");
        butonStergereClienti.setBackground(new Color(100, 200, 150));
        butonStergereClienti.setFont(new Font("Segoe UI", Font.PLAIN, 18));
        butonStergereClienti.setFocusPainted(false);
        butonStergereClienti.setForeground(Color.WHITE);
        butonStergereClienti.addActionListener(e -> {
            loc_cur = 7;
            getContentPane().removeAll();
            interfataDeletClient();
            revalidate();
            repaint();
        });

        JButton butonVizualizareClienti = new JButton("Vizualizare clienti");
        butonVizualizareClienti.setBackground(new Color(100, 200, 150));
        butonVizualizareClienti.setFont(new Font("Segoe UI", Font.PLAIN, 18));
        butonVizualizareClienti.setFocusPainted(false);
        butonVizualizareClienti.setForeground(Color.WHITE);
        butonVizualizareClienti.addActionListener(e -> {
            loc_cur = 8;
            getContentPane().removeAll();
            interfataViewClienti();
            revalidate();
            repaint();
        });


        matriceButoane.add(butonAdaugareClienti);
        matriceButoane.add(butonEditareClienti);
        matriceButoane.add(butonStergereClienti);
        matriceButoane.add(butonVizualizareClienti);

        panel_principal.add(matriceButoane, BorderLayout.CENTER);


        butonBackPage1 = new JButton("Back Page");
        butonBackPage1.setBackground(Color.RED);
        panel_principal.add(butonBackPage1, BorderLayout.PAGE_END);
        butonBackPage1.addActionListener(_ -> {
            loc_cur = 1;
            getContentPane().removeAll();
            interfataMeniuPrincipal();
            revalidate();
            repaint();
        });

        this.getContentPane().removeAll();
        this.add(panel_principal);
        this.revalidate();
        this.repaint();
        this.setVisible(true);
    }

    /// Produs
    /// ///////////////////////////////////
    /// ///////////////////////////////////
    /// ///////////////////////////////////
    /// ///////////////////////////////////


    /**
     * Pagina pentru a adaua un produs cu butoanele si comenzile aferente
     */
    private void interfataAddProdus() {
        JPanel panel_principal = new JPanel();
        panel_principal.setLayout(new BorderLayout());


        panel_principal.setBorder(BorderFactory.createEmptyBorder(30, 30, 30, 30));
        panel_principal.setBackground(new Color(238, 232, 170));


        JLabel label_text = new JLabel("Inserare produs");
        label_text.setFont(new Font("Arial", Font.BOLD, 22));
        JPanel panel_label_text = new JPanel();
        label_text.setBackground(new Color(238, 232, 170));
        panel_label_text.setBackground(new Color(238, 232, 170));
        panel_label_text.add(label_text, CENTER_ALIGNMENT);

        panel_principal.add(panel_label_text, BorderLayout.PAGE_START);

        JLabel matriceButoane_principala = new JLabel();
        matriceButoane_principala.setBackground(new Color(140, 252, 43));
        matriceButoane_principala.setLayout(new GridLayout(3, 1));

        JLabel matriceButoane = new JLabel();
        matriceButoane.setBackground(new Color(238, 232, 170));
        matriceButoane.setLayout(new GridLayout(4, 2));

        matriceButoane_principala.add(matriceButoane, CENTER_ALIGNMENT);

        panel_principal.add(matriceButoane_principala, BorderLayout.CENTER);


        JTextField textFieldName = new JTextField("");
        JTextField textFieldCantitate = new JTextField("");
        JTextField textFieldCodDeBara = new JTextField("");

        matriceButoane.add(new JLabel(""), CENTER_ALIGNMENT);
        matriceButoane.add(new JLabel(""));
        matriceButoane.add(new JLabel("                               Nume :"), CENTER_ALIGNMENT);
        matriceButoane.add(textFieldName);
        matriceButoane.add(new JLabel("                               Cantitate:"), CENTER_ALIGNMENT);
        matriceButoane.add(textFieldCantitate);
        matriceButoane.add(new JLabel("                             Cod de Bara:"));
        matriceButoane.add(textFieldCodDeBara);


        JButton butonAddProduct = new JButton("Insert");
        butonAddProduct.setBackground(new Color(140, 252, 43));
        butonAddProduct.addActionListener(_ -> {
            String nume, cantitate, codBara;
            try {
                nume = textFieldName.getText();
                cantitate = textFieldCantitate.getText();
                codBara = textFieldCodDeBara.getText();

                int status = controlerProduct.insertProduct(nume, cantitate, codBara);
                System.out.println(status);
                if (status != 0) {
                    showError("Produs introdus cu succes!");
                } else {
                    showError("Produsul nu a putut fi inserat!");
                }
                textFieldName.setText("");
                textFieldCantitate.setText("");
                textFieldCodDeBara.setText("");
            } catch (Exception ex) {
                showError("Parametri gresiti!");

                textFieldName.setText("");
                textFieldCantitate.setText("");
                textFieldCodDeBara.setText("");

                return;
            }
        });


        JPanel panelButonInsert = new JPanel();
        panelButonInsert.setBackground(new Color(238, 232, 170));
        panelButonInsert.setLayout(new FlowLayout());
        butonAddProduct.setSize(new Dimension(100, 50));
        panelButonInsert.add(butonAddProduct);
        matriceButoane_principala.add(panelButonInsert, CENTER_ALIGNMENT);


        butonBackPage2 = new JButton("Back Page");
        butonBackPage2.setBackground(Color.RED);
        panel_principal.add(butonBackPage2, BorderLayout.PAGE_END);
        butonBackPage2.addActionListener(_ -> {
            loc_cur = 2;
            getContentPane().removeAll();
            interfataProdus();
            revalidate();
            repaint();
        });

        this.getContentPane().removeAll();
        this.add(panel_principal);
        this.revalidate();
        this.repaint();
        this.setVisible(true);
    }

    /**
     * Pagina pentru a edita un produs cu butoanele si comenzile aferente
     */
    private void modificareParametriProdus(int idProdus) {
        JPanel panel_principal = new JPanel();
        panel_principal.setLayout(new BorderLayout());


        panel_principal.setBorder(BorderFactory.createEmptyBorder(30, 30, 30, 30));
        panel_principal.setBackground(new Color(238, 232, 170));


        JLabel label_text = new JLabel("Modificare date Produs");
        label_text.setFont(new Font("Arial", Font.BOLD, 22));
        JPanel panel_label_text = new JPanel();
        label_text.setBackground(new Color(238, 232, 170));
        panel_label_text.setBackground(new Color(238, 232, 170));
        panel_label_text.add(label_text, CENTER_ALIGNMENT);

        panel_principal.add(panel_label_text, BorderLayout.PAGE_START);

        JLabel matriceButoane_principala = new JLabel();
        matriceButoane_principala.setBackground(new Color(140, 252, 43));
        matriceButoane_principala.setLayout(new GridLayout(3, 1));

        JLabel matriceButoane = new JLabel();
        matriceButoane.setBackground(new Color(238, 232, 170));
        matriceButoane.setLayout(new GridLayout(4, 2));

        matriceButoane_principala.add(matriceButoane, CENTER_ALIGNMENT);

        panel_principal.add(matriceButoane_principala, BorderLayout.CENTER);


        JTextField textFieldName = new JTextField("");
        JTextField textFieldCantitate = new JTextField("");
        JTextField textFieldCodDeBara = new JTextField("");

        matriceButoane.add(new JLabel("                               Nume :"), CENTER_ALIGNMENT);
        matriceButoane.add(textFieldName);
        matriceButoane.add(new JLabel("                              Cantitate:"), CENTER_ALIGNMENT);
        matriceButoane.add(textFieldCantitate);
        matriceButoane.add(new JLabel("                            Cod de Bara:"), CENTER_ALIGNMENT);
        matriceButoane.add(textFieldCodDeBara);
        matriceButoane.add(new JLabel(""), CENTER_ALIGNMENT);
        matriceButoane.add(new JLabel(""), CENTER_ALIGNMENT);


        JButton butonConfirmaEditareaProdus = new JButton("Modificare");
        butonConfirmaEditareaProdus.setBackground(new Color(140, 252, 43));
        butonConfirmaEditareaProdus.addActionListener(_ -> {
            String nume, cantitate, cod;
            try {
                nume = String.valueOf(textFieldName.getText());
                cantitate = String.valueOf(textFieldCantitate.getText());
                cod = String.valueOf(textFieldCodDeBara.getText());

                int status = controlerProduct.updateDate(idProdus, nume, cantitate, cod);
                if (status == 1) {
                    showError("Datele s-au modificat cu succes!");
                } else {
                    showError("Datele nu s-au modificat cu succes!");
                    return;
                }

                textFieldName.setText("");
                textFieldCantitate.setText("");
                textFieldCodDeBara.setText("");

            } catch (Exception ex) {
                showError("Parametri gresiti!");

                textFieldName.setText("");
                textFieldCantitate.setText("");
                textFieldCodDeBara.setText("");
                return;
            }
        });

        JPanel panelButonInsert = new JPanel();
        panelButonInsert.setBackground(new Color(238, 232, 170));
        panelButonInsert.setLayout(new FlowLayout());
        butonConfirmaEditareaProdus.setSize(new Dimension(100, 50));
        panelButonInsert.add(butonConfirmaEditareaProdus);
        matriceButoane_principala.add(panelButonInsert, CENTER_ALIGNMENT);


        butonBackPage2 = new JButton("Back Page");
        butonBackPage2.setBackground(Color.RED);
        panel_principal.add(butonBackPage2, BorderLayout.PAGE_END);
        butonBackPage2.addActionListener(_ -> {
            loc_cur = 2;
            getContentPane().removeAll();
            interfataProdus();
            revalidate();
            repaint();
        });

        this.getContentPane().removeAll();
        this.add(panel_principal);
        this.revalidate();
        this.repaint();
        this.setVisible(true);
    }
    /**
     * Pagina pentru a putea verifica daca produsul este bine introdus in baza de date si daca
     * el inregistrat in sistem si totodata cu butoanele si comenzile aferente
     */
    private void interfataEditProdus() {
        JPanel panel_principal = new JPanel();
        panel_principal.setLayout(new BorderLayout());


        panel_principal.setBorder(BorderFactory.createEmptyBorder(30, 30, 30, 30));
        panel_principal.setBackground(new Color(238, 232, 170));


        JLabel label_text = new JLabel("Editare produs");
        label_text.setFont(new Font("Arial", Font.BOLD, 22));
        JPanel panel_label_text = new JPanel();
        label_text.setBackground(new Color(238, 232, 170));
        panel_label_text.setBackground(new Color(238, 232, 170));
        panel_label_text.add(label_text, CENTER_ALIGNMENT);

        panel_principal.add(panel_label_text, BorderLayout.PAGE_START);

        JLabel matriceButoane_principala = new JLabel();
        matriceButoane_principala.setBackground(new Color(140, 252, 43));
        matriceButoane_principala.setLayout(new GridLayout(3, 1));

        JLabel matriceButoane = new JLabel();
        matriceButoane.setBackground(new Color(238, 232, 170));
        matriceButoane.setLayout(new GridLayout(4, 2));

        matriceButoane_principala.add(matriceButoane, CENTER_ALIGNMENT);

        panel_principal.add(matriceButoane_principala, BorderLayout.CENTER);


        JTextField textFieldCodDeBara = new JTextField("");
        JTextField textFieldName = new JTextField("");

        matriceButoane.add(new JLabel(""));
        matriceButoane.add(new JLabel(""));
        matriceButoane.add(new JLabel("                               Nume :"), CENTER_ALIGNMENT);
        matriceButoane.add(textFieldName);
        matriceButoane.add(new JLabel("                           Cod de bara:"), CENTER_ALIGNMENT);
        matriceButoane.add(textFieldCodDeBara);
        matriceButoane.add(new JLabel(""));
        matriceButoane.add(new JLabel(""));


        JButton butonEditProduct = new JButton("Modificare");
        butonEditProduct.setBackground(new Color(140, 252, 43));
        butonEditProduct.addActionListener(_ -> {
            String nume, cod;
            try {
                nume = textFieldName.getText();
                cod = textFieldCodDeBara.getText();

                int status = controlerProduct.validareDate(nume, cod);
                System.out.println(status);
                if (status == 1) {
                    int idProdus = controlerProduct.validareDateRId(nume, cod);
                    modificareParametriProdus(idProdus);
                } else {
                    showError("Date gresite!");
                    textFieldName.setText("");
                    textFieldCodDeBara.setText("");
                }

            } catch (Exception ex) {
                showError("Parametri gresiti!");

                textFieldName.setText("");
                textFieldCodDeBara.setText("");
            }
        });

        JPanel panelButonInsert = new JPanel();
        panelButonInsert.setBackground(new Color(238, 232, 170));
        panelButonInsert.setLayout(new FlowLayout());
        butonEditProduct.setSize(new Dimension(100, 50));
        panelButonInsert.add(butonEditProduct);
        matriceButoane_principala.add(panelButonInsert, CENTER_ALIGNMENT);


        butonBackPage2 = new JButton("Back Page");
        butonBackPage2.setBackground(Color.RED);
        panel_principal.add(butonBackPage2, BorderLayout.PAGE_END);
        butonBackPage2.addActionListener(_ -> {
            loc_cur = 2;
            getContentPane().removeAll();
            interfataProdus();
            revalidate();
            repaint();
        });

        this.getContentPane().removeAll();
        this.add(panel_principal);
        this.revalidate();
        this.repaint();
        this.setVisible(true);
    }

    /**
     * Pagina pentru a sterge un produs cu butoanele si comenzile aferente
     */

    private void interfataDeletProdus() {
        JPanel panel_principal = new JPanel();
        panel_principal.setLayout(new BorderLayout());


        panel_principal.setBorder(BorderFactory.createEmptyBorder(30, 30, 30, 30));
        panel_principal.setBackground(new Color(238, 232, 170));


        JLabel label_text = new JLabel("Stergere produs");
        label_text.setFont(new Font("Arial", Font.BOLD, 22));
        JPanel panel_label_text = new JPanel();
        label_text.setBackground(new Color(238, 232, 170));
        panel_label_text.setBackground(new Color(238, 232, 170));
        panel_label_text.add(label_text, CENTER_ALIGNMENT);

        panel_principal.add(panel_label_text, BorderLayout.PAGE_START);

        JLabel matriceButoane_principala = new JLabel();
        matriceButoane_principala.setBackground(new Color(140, 252, 43));
        matriceButoane_principala.setLayout(new GridLayout(3, 1));

        JLabel matriceButoane = new JLabel();
        matriceButoane.setBackground(new Color(238, 232, 170));
        matriceButoane.setLayout(new GridLayout(4, 2));

        matriceButoane_principala.add(matriceButoane, CENTER_ALIGNMENT);

        panel_principal.add(matriceButoane_principala, BorderLayout.CENTER);


        JTextField textFieldNume = new JTextField("");
        JTextField textFieldCodDeBara = new JTextField("");

        matriceButoane.add(new JLabel(""));
        matriceButoane.add(new JLabel(""));
        matriceButoane.add(new JLabel("                           Nume produs cautat:"), CENTER_ALIGNMENT);
        matriceButoane.add(textFieldNume);
        matriceButoane.add(new JLabel("                                 Cod de bara:"), CENTER_ALIGNMENT);
        matriceButoane.add(textFieldCodDeBara);
        matriceButoane.add(new JLabel(""));
        matriceButoane.add(new JLabel(""));


        JButton butonDeleteProduct = new JButton("Stergere");
        butonDeleteProduct.setBackground(new Color(140, 252, 43));
        butonDeleteProduct.addActionListener(_ -> {
            String nume, codDeBara;
            try {
                nume = textFieldNume.getText();
                codDeBara = textFieldCodDeBara.getText();

                int status = controlerProduct.deleteProduct(nume, codDeBara);
                System.out.println(status);
                if (status == 1) {
                    showError("Stergere efectuata cu success!");
                } else {
                    showError("Stergerea nu s-a efectuata cu success!");
                }
                textFieldNume.setText("");
                textFieldCodDeBara.setText("");
            } catch (Exception ex) {
                showError("Parametri gresiti!");

                textFieldNume.setText("");
                textFieldCodDeBara.setText("");
                return;
            }
        });

        JPanel panelButonInsert = new JPanel();
        panelButonInsert.setBackground(new Color(238, 232, 170));
        panelButonInsert.setLayout(new FlowLayout());
        butonDeleteProduct.setSize(new Dimension(100, 50));
        panelButonInsert.add(butonDeleteProduct);
        matriceButoane_principala.add(panelButonInsert, CENTER_ALIGNMENT);


        butonBackPage2 = new JButton("Back Page");
        butonBackPage2.setBackground(Color.RED);
        panel_principal.add(butonBackPage2, BorderLayout.PAGE_END);
        butonBackPage2.addActionListener(_ -> {
            loc_cur = 2;
            getContentPane().removeAll();
            interfataProdus();
            revalidate();
            repaint();
        });

        this.getContentPane().removeAll();
        this.add(panel_principal);
        this.revalidate();
        this.repaint();
        this.setVisible(true);
    }

    /**
     * Pagina pentru a vedea toate produsele pe care le avem in baza de
     * date cu butoanele si comenzile aferente
     */

    private void interfataViewProdus() {
        JPanel panel_principal = new JPanel();
        panel_principal.setLayout(new BorderLayout());

        panel_principal.setBorder(BorderFactory.createEmptyBorder(30, 30, 30, 30));
        panel_principal.setBackground(new Color(238, 232, 170));


        JLabel label_text = new JLabel("Vizualizare produse");
        label_text.setFont(new Font("Arial", Font.BOLD, 22));
        JPanel panel_label_text = new JPanel();
        label_text.setBackground(new Color(238, 232, 170));
        panel_label_text.setBackground(new Color(238, 232, 170));
        panel_label_text.add(label_text, CENTER_ALIGNMENT);

        panel_principal.add(panel_label_text, BorderLayout.PAGE_START);

        ///Logica de functionare
        AbstractView<Product> productAbstractView = new AbstractView<>();
        JTable tabelaProduse = productAbstractView.createTable(controlerProduct.getAllProducts());
//        System.out.println(controlerProduct.getAllProducts());

        JScrollPane scrollPane = new JScrollPane(tabelaProduse);
        panel_principal.add(scrollPane, BorderLayout.CENTER);
        panel_principal.revalidate();
        panel_principal.repaint();


        butonBackPage2 = new JButton("Back Page");
        butonBackPage2.setBackground(Color.RED);
        panel_principal.add(butonBackPage2, BorderLayout.PAGE_END);
        butonBackPage2.addActionListener(_ -> {
            loc_cur = 2;
            getContentPane().removeAll();
            interfataProdus();
            revalidate();
            repaint();
        });

        this.getContentPane().removeAll();
        this.add(panel_principal);
        this.revalidate();
        this.repaint();
        this.setVisible(true);
    }

    /**
     * Pagina principala de unde poti selecta ce doresti sa faci legat de un produs
     */

    private void interfataProdus() {
        JPanel panel_principal = new JPanel();
        panel_principal.setLayout(new BorderLayout());


        panel_principal.setBorder(BorderFactory.createEmptyBorder(30, 30, 30, 30));
        panel_principal.setBackground(new Color(238, 232, 170));

        JLabel labelTitlu = new JLabel("Gestionarea produselor", SwingConstants.CENTER);
        labelTitlu.setFont(new Font("Segoe UI", Font.BOLD, 26));
        labelTitlu.setForeground(new Color(50, 50, 50));

        JPanel panelTitlu = new JPanel();
        panelTitlu.setBackground(new Color(238, 232, 170));
        panelTitlu.add(labelTitlu);
        panel_principal.add(panelTitlu, BorderLayout.NORTH);

        JPanel matriceButoane = new JPanel(new GridLayout(4, 1, 15, 15));
        matriceButoane.setBackground(new Color(238, 232, 170));


        JButton butonAdaugareProdus = new JButton("Adaugare produs");
        butonAdaugareProdus.setBackground(new Color(100, 200, 150));
        butonAdaugareProdus.setFont(new Font("Segoe UI", Font.PLAIN, 18));
        butonAdaugareProdus.setFocusPainted(false);
        butonAdaugareProdus.setForeground(Color.WHITE);
        butonAdaugareProdus.addActionListener(e -> {
            loc_cur = 9;
            getContentPane().removeAll();
            interfataAddProdus();
            revalidate();
            repaint();
        });

        JButton butonEditareProdus = new JButton("Editare produs");
        butonEditareProdus.setBackground(new Color(100, 200, 150));
        butonEditareProdus.setFont(new Font("Segoe UI", Font.PLAIN, 18));
        butonEditareProdus.setFocusPainted(false);
        butonEditareProdus.setForeground(Color.WHITE);
        butonEditareProdus.addActionListener(e -> {
            loc_cur = 10;
            getContentPane().removeAll();
            interfataEditProdus();
            revalidate();
            repaint();
        });

        JButton butonStergereProdus = new JButton("Stergere produs");
        butonStergereProdus.setBackground(new Color(100, 200, 150));
        butonStergereProdus.setFont(new Font("Segoe UI", Font.PLAIN, 18));
        butonStergereProdus.setFocusPainted(false);
        butonStergereProdus.setForeground(Color.WHITE);
        butonStergereProdus.addActionListener(e -> {
            loc_cur = 11;
            getContentPane().removeAll();
            interfataDeletProdus();
            revalidate();
            repaint();
        });

        JButton butonVizualizareProdus = new JButton("Vizualizare produs");
        butonVizualizareProdus.setBackground(new Color(100, 200, 150));
        butonVizualizareProdus.setFont(new Font("Segoe UI", Font.PLAIN, 18));
        butonVizualizareProdus.setFocusPainted(false);
        butonVizualizareProdus.setForeground(Color.WHITE);
        butonVizualizareProdus.addActionListener(e -> {
            loc_cur = 12;
            getContentPane().removeAll();
            interfataViewProdus();
            revalidate();
            repaint();
        });


        matriceButoane.add(butonAdaugareProdus);
        matriceButoane.add(butonEditareProdus);
        matriceButoane.add(butonStergereProdus);
        matriceButoane.add(butonVizualizareProdus);

        panel_principal.add(matriceButoane, BorderLayout.CENTER);


        butonBackPage1 = new JButton("Back Page");
        butonBackPage1.setBackground(Color.RED);
        panel_principal.add(butonBackPage1, BorderLayout.PAGE_END);
        butonBackPage1.addActionListener(_ -> {
            loc_cur = 1;
            getContentPane().removeAll();
            interfataMeniuPrincipal();
            revalidate();
            repaint();
        });

        this.add(panel_principal);
        this.setVisible(true);
    }

    /// Comanda
    /// ///////////////////////////////////
    /// ///////////////////////////////////
    /// ///////////////////////////////////
    /// ///////////////////////////////////

    /**
     * Pagina de unde poti vizualiza si adauga comenzi in functie de id client si id produs
     */

    private void interfataAddComanda() {
        JPanel panel_principal = new JPanel();
        panel_principal.setLayout(new BorderLayout());

        JLabel label_text = new JLabel("Inserare produs");
        label_text.setFont(new Font("Arial", Font.BOLD, 22));
        JPanel panel_label_text = new JPanel();
        label_text.setBackground(new Color(238, 232, 170));
        panel_label_text.setBackground(new Color(238, 232, 170));
        panel_label_text.add(label_text, CENTER_ALIGNMENT);

        panel_principal.setBorder(BorderFactory.createEmptyBorder(30, 30, 30, 30));
        panel_principal.setBackground(new Color(238, 232, 170));

        panel_principal.add(panel_label_text, BorderLayout.PAGE_START);

        JPanel zonaCentrala = new JPanel(new GridLayout(2, 2));
        zonaCentrala.setBackground(new Color(238, 232, 170));

        JPanel panelClienti = new JPanel();
        panelClienti.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));
        panelClienti.setBackground(new Color(238, 232, 170));
        panelClienti.add(new JLabel("Caută client:"), BorderLayout.NORTH);

        zonaCentrala.add(panelClienti);

        JPanel panelProduse = new JPanel();
        panelProduse.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));
        panelProduse.setBackground(new Color(238, 232, 170));
        // JTable tableProduse;
        panelProduse.add(new JLabel("Caută produs:"), BorderLayout.NORTH);
//        panelProduse.add(new JScrollPane(tableProduse), BorderLayout.CENTER);

        zonaCentrala.add(panelProduse, BorderLayout.CENTER);


        JLabel matriceButoane_principala = new JLabel();
        matriceButoane_principala.setBackground(new Color(140, 252, 43));
        matriceButoane_principala.setLayout(new GridLayout(3, 1));

        JLabel matriceButoane = new JLabel();
        matriceButoane.setBackground(new Color(238, 232, 170));
        matriceButoane.setLayout(new GridLayout(3, 2));

        matriceButoane_principala.add(matriceButoane, CENTER_ALIGNMENT);

        zonaCentrala.add(matriceButoane_principala, BorderLayout.CENTER);


        JTextField textFieldIdC = new JTextField("");
        JTextField textFieldIdP = new JTextField("");
        JTextField textFieldCantitate = new JTextField("");

        matriceButoane.add(new JLabel("IdClient :"), CENTER_ALIGNMENT);
        matriceButoane.add(textFieldIdC);
        matriceButoane.add(new JLabel("IdProdus :"), CENTER_ALIGNMENT);
        matriceButoane.add(textFieldIdP);
        matriceButoane.add(new JLabel("Cantitate :"));
        matriceButoane.add(textFieldCantitate);

        //////////
        //////////Zona cautare dupa nume 2X2
        //////////

        JLabel matriceButoane_principala_cautare = new JLabel();
        matriceButoane_principala_cautare.setBackground(new Color(140, 252, 43));
        matriceButoane_principala_cautare.setLayout(new GridLayout(3, 1));

        JLabel matriceButoane_cautare = new JLabel();
        matriceButoane_cautare.setBackground(new Color(238, 232, 170));
        matriceButoane_cautare.setLayout(new GridLayout(2, 2));

        matriceButoane_principala_cautare.add(matriceButoane_cautare, CENTER_ALIGNMENT);

        zonaCentrala.add(matriceButoane_principala_cautare, BorderLayout.CENTER);


        JTextField textFieldNumeC = new JTextField("");
        JTextField textFieldNumeP = new JTextField("");


        matriceButoane_cautare.add(new JLabel("Nume client :"), CENTER_ALIGNMENT);
        matriceButoane_cautare.add(textFieldNumeC);
        matriceButoane_cautare.add(new JLabel("Nume produs :"), CENTER_ALIGNMENT);
        matriceButoane_cautare.add(textFieldNumeP);


        panel_principal.add(zonaCentrala, BorderLayout.CENTER);

        ///////
        ///////Cautare buton
        ///////


        JButton butonCautareClientProdus = new JButton("Cautare");
        butonCautareClientProdus.setBackground(new Color(140, 252, 43));
        butonCautareClientProdus.addActionListener(_ -> {
            String numeClient = "", numeProdus = "";
            try {
                numeClient = String.valueOf(textFieldNumeC.getText());
                numeProdus = String.valueOf(textFieldNumeP.getText());

                AbstractView<Product> productAbstractView = new AbstractView<>();
                AbstractView<Client> clientAbstractView = new AbstractView<>();
                JTable tableClienti = clientAbstractView.createTable(controlerClient.getAllClientsByName(numeClient));
                JTable tableProduse = productAbstractView.createTable(controlerProduct.getAllProductByName(numeProdus));
                tableClienti.setAutoResizeMode(JTable.AUTO_RESIZE_SUBSEQUENT_COLUMNS);
                tableProduse.setAutoResizeMode(JTable.AUTO_RESIZE_SUBSEQUENT_COLUMNS);

                JScrollPane jScrollPaneClienti = new JScrollPane(tableClienti);
                jScrollPaneClienti.setPreferredSize(new Dimension(400, 250));

                JScrollPane jScrollPaneProduse = new JScrollPane(tableProduse);
                jScrollPaneProduse.setPreferredSize(new Dimension(400, 250));

                this.setSize(1000, 500);

                panelClienti.removeAll();
                panelProduse.removeAll();

                panelProduse.add(jScrollPaneProduse, BorderLayout.CENTER);
                panelClienti.add(jScrollPaneClienti, BorderLayout.CENTER);


                panel_principal.revalidate();
                panel_principal.repaint();
                textFieldNumeC.setText("");
                textFieldNumeP.setText("");
                return;

            } catch (Exception ex) {
                showError("Parametri gresiti!");

                textFieldNumeC.setText("");
                textFieldNumeP.setText("");

                return;
            }
        });


        JPanel panelButonCautare = new JPanel();
        panelButonCautare.setBackground(new Color(238, 232, 170));
        panelButonCautare.setLayout(new FlowLayout());
        butonCautareClientProdus.setSize(new Dimension(100, 50));
        panelButonCautare.add(butonCautareClientProdus);
        matriceButoane_principala_cautare.add(panelButonCautare, CENTER_ALIGNMENT);


        /////
        ////Inserare Comanda
        ////

        butonAddClient = new JButton("Insert");
        butonAddClient.setBackground(new Color(140, 252, 43));
        butonAddClient.addActionListener(_ -> {
            String cantitate, idC, idP;
            try {
                idC = textFieldIdC.getText();
                idP = textFieldIdP.getText();
                cantitate = textFieldCantitate.getText();

                Product p = controlerProduct.getProdusById(idP);
                int cantitateProdus = p.getCantitate();
                System.out.println("Cantitate produs: " + cantitateProdus);
                Client c = controlerClient.getAllClientsById(idC);
                int cant = controlerProduct.transformCantitate(cantitate);
                System.out.println("Cantitate dorita: " + cant);



                if (cantitateProdus < cant) {
                    showError("Comanda nu a fost introdusa cu succes!\n\tStoc insuficient!");
                } else {
                    int status = controlerOrder.addComand(idC, idP, cant);
                    if (status != 0) {
                        int cantitateRamasa = cantitateProdus - cant;
                        controlerProduct.updateCantitateById(idP, cantitateRamasa);
                        controlerBill.insertBill(c.getId(), p.getId(), cant, c.getNume(), p.getNumeProdus());
                        showError("Comanda introdusa cu succes!");
                    } else {
                        showError("Comanda nu a fost introdusa cu succes!\n");
                    }
                }

                textFieldIdC.setText("");
                textFieldIdP.setText("");
                textFieldCantitate.setText("");

            } catch (Exception ex) {
                showError("Parametri gresiti!");
                ex.printStackTrace();
                textFieldIdC.setText("");
                textFieldIdP.setText("");
                textFieldCantitate.setText("");
                return;
            }
        });


        JPanel panelButonInsert = new JPanel();
        panelButonInsert.setBackground(new Color(238, 232, 170));
        panelButonInsert.setLayout(new FlowLayout());
        butonAddClient.setSize(new Dimension(100, 50));
        panelButonInsert.add(butonAddClient);
        matriceButoane_principala.add(panelButonInsert, CENTER_ALIGNMENT);


        butonBackPage2 = new JButton("Back Page");
        butonBackPage2.setBackground(Color.RED);
        panel_principal.add(butonBackPage2, BorderLayout.PAGE_END);
        butonBackPage2.addActionListener(_ -> {
            loc_cur = 2;
            getContentPane().removeAll();
            this.setSize(500, 500);
            interfataComanda();
            revalidate();
            repaint();
        });

        this.getContentPane().removeAll();
        this.add(panel_principal);
        this.revalidate();
        this.repaint();
        this.setVisible(true);
    }

    /**
     * Vizualizrea facturilor cu tot ce tine de precizia si legaturile intre tabele
     */

    private void interfataViewComanda() {
        JPanel panel_principal = new JPanel();
        panel_principal.setLayout(new BorderLayout());

        panel_principal.setBorder(BorderFactory.createEmptyBorder(30, 30, 30, 30));
        panel_principal.setBackground(new Color(238, 232, 170));



        JLabel label_text = new JLabel("Vizualizare factura");
        label_text.setFont(new Font("Arial", Font.BOLD, 22));
        JPanel panel_label_text = new JPanel();
        label_text.setBackground(new Color(238, 232, 170));
        panel_label_text.setBackground(new Color(238, 232, 170));
        panel_label_text.add(label_text, CENTER_ALIGNMENT);

        panel_principal.add(panel_label_text, BorderLayout.PAGE_START);

        ///Logica de functionare
        AbstractView<Bill> billAbstractView = new AbstractView<>();
        JTable tabelaFacturi = billAbstractView.createTable(controlerBill.getAllBill());
//        System.out.println(controlerProduct.getAllProducts());

        JScrollPane scrollPane = new JScrollPane(tabelaFacturi);
        panel_principal.add(scrollPane, BorderLayout.CENTER);
        panel_principal.revalidate();
        panel_principal.repaint();

        butonBackPage2 = new JButton("Back Page");
        butonBackPage2.setBackground(Color.RED);
        panel_principal.add(butonBackPage2, BorderLayout.PAGE_END);
        butonBackPage2.addActionListener(_ -> {
            loc_cur = 2;
            getContentPane().removeAll();
            interfataComanda();
            revalidate();
            repaint();
        });

        this.getContentPane().removeAll();
        this.add(panel_principal);
        this.revalidate();
        this.repaint();
        this.setVisible(true);
    }

    /**
     * Vizualizare pagina in care poti selecta ce dorrsti sa faci in legatura cu o comanda
     */

    private void interfataComanda() {
        JPanel panel_principal = new JPanel();
        panel_principal.setLayout(new BorderLayout());


        panel_principal.setBorder(BorderFactory.createEmptyBorder(30, 30, 30, 30));
        panel_principal.setBackground(new Color(238, 232, 170));

        JLabel labelTitlu = new JLabel("Gestionarea comenzilor", SwingConstants.CENTER);
        labelTitlu.setFont(new Font("Segoe UI", Font.BOLD, 26));
        labelTitlu.setForeground(new Color(50, 50, 50));

        JPanel panelTitlu = new JPanel();
        panelTitlu.setBackground(new Color(238, 232, 170));
        panelTitlu.add(labelTitlu);
        panel_principal.add(panelTitlu, BorderLayout.NORTH);

        JPanel matriceButoane = new JPanel(new GridLayout(4, 1, 15, 15));
        matriceButoane.setBackground(new Color(238, 232, 170));


        JButton butonAdaugareComanda = new JButton("Adaugare comanda");
        butonAdaugareComanda.setBackground(new Color(100, 200, 150));
        butonAdaugareComanda.setFont(new Font("Segoe UI", Font.PLAIN, 18));
        butonAdaugareComanda.setFocusPainted(false);
        butonAdaugareComanda.setForeground(Color.WHITE);
        butonAdaugareComanda.addActionListener(e -> {
            loc_cur = 9;
            getContentPane().removeAll();
            interfataAddComanda();
            revalidate();
            repaint();
        });

        JButton butonVizualizareComanda = new JButton("Vizualizare comanda");
        butonVizualizareComanda.setBackground(new Color(100, 200, 150));
        butonVizualizareComanda.setFont(new Font("Segoe UI", Font.PLAIN, 18));
        butonVizualizareComanda.setFocusPainted(false);
        butonVizualizareComanda.setForeground(Color.WHITE);
        butonVizualizareComanda.addActionListener(e -> {
            loc_cur = 12;
            getContentPane().removeAll();
            interfataViewComanda();
            revalidate();
            repaint();
        });


        matriceButoane.add(butonAdaugareComanda);
        matriceButoane.add(butonVizualizareComanda);

        panel_principal.add(matriceButoane, BorderLayout.CENTER);


        butonBackPage1 = new JButton("Back Page");
        butonBackPage1.setBackground(Color.RED);
        panel_principal.add(butonBackPage1, BorderLayout.PAGE_END);
        butonBackPage1.addActionListener(_ -> {
            loc_cur = 1;
            getContentPane().removeAll();
            interfataMeniuPrincipal();
            revalidate();
            repaint();
        });

        this.add(panel_principal);
        this.setVisible(true);
    }


    /// ///////////////////////////////////
    /// ///////////////////////////////////
    /// ///////////////////////////////////
    /// ///////////////////////////////////

    /**
     * Zona de deschidere a aplicatiei
     */
    private void interfataPaginaStart() {

        if (loc_cur != 0)
            return;

        JPanel panelPrincipal = new JPanel();
        panelPrincipal.setLayout(new GridLayout(3, 3));
        panelPrincipal.setBackground(new Color(238, 232, 170));

        JButton butonStart = new JButton("Start");
        butonStart.setBackground(new Color(100, 200, 150));
        butonStart.setForeground(Color.WHITE);
        butonStart.addActionListener(_ -> {
            loc_cur = 1;
            getContentPane().removeAll();
            interfataMeniuPrincipal();
            revalidate();
            repaint();
        });

        JLabel buton_label = new JLabel();
        buton_label.setBackground(new Color(238, 232, 170));
        buton_label.setLayout(new GridLayout(3, 1));
        buton_label.add(new JLabel(""));
        buton_label.add(butonStart);
        buton_label.add(new JLabel(""));

        JTextArea textArea = new JTextArea("Orders Management System");
        textArea.setEditable(false);
        textArea.setBackground(new Color(238, 232, 170));
        textArea.setSize(50, 30);


        JLabel text_label = new JLabel();
        text_label.setBackground(new Color(238, 232, 170));
        text_label.setLayout(new GridLayout(3, 0));
        text_label.add(new JLabel(""));
        text_label.add(new JLabel(""));
        text_label.add(textArea, CENTER_ALIGNMENT);


        panelPrincipal.add(new JLabel(""));
        panelPrincipal.add(text_label, CENTER_ALIGNMENT);
        panelPrincipal.add(new JLabel(""));
        panelPrincipal.add(new JLabel(""));
        panelPrincipal.add(buton_label);
        panelPrincipal.add(new JLabel(""));
        panelPrincipal.add(new JLabel(""));
        panelPrincipal.add(new JLabel(""));
        panelPrincipal.add(new JLabel(""));


        this.add(panelPrincipal);
        this.setVisible(true);
    }

    /**
     * Pagina principala si de control a aplicatiei
     */
    private void interfataMeniuPrincipal() {
        JPanel panelPrincipal = new JPanel(new BorderLayout(20, 20));
        panelPrincipal.setBorder(BorderFactory.createEmptyBorder(30, 30, 30, 30));
        panelPrincipal.setBackground(new Color(238, 232, 170));

        JLabel labelTitlu = new JLabel("Gestionarea Comenzilor", SwingConstants.CENTER);
        labelTitlu.setFont(new Font("Segoe UI", Font.BOLD, 26));
        labelTitlu.setForeground(new Color(50, 50, 50));

        JPanel panelTitlu = new JPanel();
        panelTitlu.setBackground(new Color(238, 232, 170));
        panelTitlu.add(labelTitlu);
        panelPrincipal.add(panelTitlu, BorderLayout.NORTH);

        JPanel matriceButoane = new JPanel(new GridLayout(3, 1, 15, 15));
        matriceButoane.setBackground(new Color(238, 232, 170));


        JButton butonViewClient = new JButton("Vizualizare clienti");
        butonViewClient.setBackground(new Color(100, 200, 150));
        butonViewClient.setFont(new Font("Segoe UI", Font.PLAIN, 18));
        butonViewClient.setFocusPainted(false);
        butonViewClient.setForeground(Color.WHITE);
        butonViewClient.addActionListener(e -> {
            loc_cur = 2;
            getContentPane().removeAll();
            interfataClient();
            revalidate();
            repaint();
        });

        JButton butonViewProduct = new JButton("Vizualizare produse");
        butonViewProduct.setBackground(new Color(100, 200, 150));
        butonViewProduct.setFont(new Font("Segoe UI", Font.PLAIN, 18));
        butonViewProduct.setFocusPainted(false);
        butonViewProduct.setForeground(Color.WHITE);
        butonViewProduct.addActionListener(e -> {
            loc_cur = 3;
            getContentPane().removeAll();
            interfataProdus();
            revalidate();
            repaint();
        });

        JButton butonViewComanda = new JButton("Vizualizare comenzi");
        butonViewComanda.setBackground(new Color(100, 200, 150));
        butonViewComanda.setFont(new Font("Segoe UI", Font.PLAIN, 18));
        butonViewComanda.setFocusPainted(false);
        butonViewComanda.setForeground(Color.WHITE);
        butonViewComanda.addActionListener(_ -> {
            loc_cur = 4;
            getContentPane().removeAll();
            interfataComanda();
            revalidate();
            repaint();
        });

        matriceButoane.add(butonViewClient);
        matriceButoane.add(butonViewProduct);
        matriceButoane.add(butonViewComanda);

        panelPrincipal.add(matriceButoane, BorderLayout.CENTER);

        this.getContentPane().removeAll();
        this.add(panelPrincipal);
        this.revalidate();
        this.repaint();
        this.setVisible(true);
    }

    /**
     * Locul de unde ne putem plimba intr functii
     */

    private void afisare() {
        this.init();

        switch (loc_cur) {
            case 0: {
                this.interfataPaginaStart();
                break;
            }
            case 1: {
                this.interfataMeniuPrincipal();
                break;
            }
            case 2: {
                this.interfataClient();
                break;
            }
            case 3: {
                this.interfataProdus();
                break;
            }
            case 4: {
                this.interfataComanda();
                break;
            }
        }
    }

    public static void main(String[] args) {
        View view = new View();
        view.afisare();


    }
}
