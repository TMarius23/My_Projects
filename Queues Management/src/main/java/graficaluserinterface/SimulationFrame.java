package graficaluserinterface;

import businesslogic.Scheduler;
import businesslogic.SimulationManager;
import model.SelectionPolicy;

import javax.swing.*;
import javax.swing.text.DefaultCaret;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class SimulationFrame extends JFrame {

    private SimulationManager simulationManager;

    /// UI
    private JButton butonStart;
    private JButton buttonStartActiune;
    private JTextArea textAreaAfisareDate;
    private JTextField textAfisareOraVarf;
    private JTextField textAfisareTMediuDeServire;
    private JTextField textAfisareTMediuDeAsteptare;


    private int loc_cur = 0;

    public SimulationFrame(SimulationManager simulationManager) {
        this.simulationManager = simulationManager;
        this.afisare();
    }

    public SimulationFrame() {
        this.afisare();
    }

    private void init() {
        this.setTitle("Task Management System");
        this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        this.setSize(500, 500);
        this.setLocationRelativeTo(null);
        this.setVisible(true);
    }

    public synchronized JTextArea getTextAreaAfisareDate() {
        if (textAreaAfisareDate == null) {
            textAreaAfisareDate = new JTextArea();
        }
        return textAreaAfisareDate;
    }

    public synchronized void setTextAreaAfisareDate(JTextArea textAreaAfisareDate) {
        this.textAreaAfisareDate = textAreaAfisareDate;
    }

    public synchronized void setTextAfisareOraVarf(int textAreaAfisareOraVarf) {
        textAfisareOraVarf.setText(String.valueOf(textAreaAfisareOraVarf));
    }

    public synchronized void setTextAfisareTMediuDeServire(double textAreaAfisareTMediuDeServire) {
        textAfisareTMediuDeServire.setText(String.valueOf(textAreaAfisareTMediuDeServire));
    }

    public synchronized void setgetTextAfisareTMediuDeAsteptare(double textAreaAfisareTMediuDeAsteptare) {
        textAfisareTMediuDeAsteptare.setText(String.valueOf(textAreaAfisareTMediuDeAsteptare));
    }

    private void initMare() {
        this.setTitle("Task Management System");
        this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        this.setSize(800, 600);
        this.setLocationRelativeTo(null);
        this.setVisible(true);
    }

    private void showError(String errMessage) {
        JOptionPane.showMessageDialog(this, errMessage);
    }

    private void interfata_meniu_principal() {
        initMare();
        JPanel panel_principal = new JPanel();

        panel_principal.setLayout(new BorderLayout());
        panel_principal.setBackground(new Color(238, 232, 170));

        JLabel label_text = new JLabel("Pagina principala");
        label_text.setFont(new Font("Arial", Font.BOLD, 22));
        JPanel panel_label_text = new JPanel();
        panel_label_text.add(label_text, CENTER_ALIGNMENT);
        panel_label_text.setBackground(new Color(12, 75, 186));


        panel_principal.add(panel_label_text, BorderLayout.PAGE_START);

        //panel pe care imi fac toata structura
        JPanel panelMijloc_Mare = new JPanel();
        panelMijloc_Mare.setLayout(new GridLayout(1, 2));
        panel_principal.add(panelMijloc_Mare, BorderLayout.CENTER);

        JPanel panelMijloc_Stanga = new JPanel();
        JPanel panelMijloc_Dreapta = new JPanel();

        panelMijloc_Mare.add(panelMijloc_Stanga, CENTER_ALIGNMENT);
        panelMijloc_Mare.add(panelMijloc_Dreapta, CENTER_ALIGNMENT);

        ///Dreapta
        panelMijloc_Dreapta.setLayout(new BorderLayout());
        JLabel textDreapta = new JLabel("Lista actiuni:");
        JPanel panelDreapta = new JPanel();
        panelDreapta.add(textDreapta, CENTER_ALIGNMENT);

        textAreaAfisareDate = new JTextArea();
        textAreaAfisareDate.setEditable(false);
        DefaultCaret caret = (DefaultCaret) textAreaAfisareDate.getCaret();
        caret.setUpdatePolicy(DefaultCaret.ALWAYS_UPDATE);

        panelMijloc_Dreapta.add(panelDreapta, BorderLayout.PAGE_START);
        JScrollPane textScrolPane = new JScrollPane(textAreaAfisareDate);

        textScrolPane.setVerticalScrollBarPolicy(JScrollPane.VERTICAL_SCROLLBAR_AS_NEEDED);
        textScrolPane.setHorizontalScrollBarPolicy(JScrollPane.HORIZONTAL_SCROLLBAR_AS_NEEDED);

        panelMijloc_Dreapta.add(textScrolPane, BorderLayout.CENTER);


        ///

        ///Stanga///
        panelMijloc_Stanga.setLayout(new GridLayout(3, 1));

        ///SUS
        JPanel panelStangaSus = new JPanel();
        panelMijloc_Stanga.add(panelStangaSus, CENTER_ALIGNMENT);
        panelStangaSus.setLayout(new GridLayout(3, 4));
        panelStangaSus.add(new JPanel());
        panelStangaSus.add(new JLabel("Timp simulare:"));
        JTextField textAreaTimpSimulare = new JTextField();
        textAreaTimpSimulare.setEditable(true);
        JPanel panelTimpSimulare = new JPanel();
        panelTimpSimulare.setLayout(new GridLayout(3, 1));
        panelTimpSimulare.add(new JPanel());
        panelTimpSimulare.add(textAreaTimpSimulare);
        panelTimpSimulare.add(new JPanel());
        panelStangaSus.add(panelTimpSimulare);
        panelStangaSus.add(new JPanel());

        panelStangaSus.add(new JPanel());
        panelStangaSus.add(new JLabel("Numar clienti:"));
        JTextField textAreaNumarClienti = new JTextField();
        textAreaNumarClienti.setEditable(true);
        JPanel panelNumarClienti = new JPanel();
        panelNumarClienti.setLayout(new GridLayout(3, 1));
        panelNumarClienti.add(new JPanel());
        panelNumarClienti.add(textAreaNumarClienti);
        panelNumarClienti.add(new JPanel());
        panelStangaSus.add(panelNumarClienti);
        panelStangaSus.add(new JPanel());

        panelStangaSus.add(new JPanel());
        panelStangaSus.add(new JLabel("Numar cozi:"));

        JTextField textAreaNumarCozi = new JTextField();
        textAreaNumarCozi.setEditable(true);
        JPanel panelNumarCozi = new JPanel();
        panelNumarCozi.setLayout(new GridLayout(3, 1));
        panelNumarCozi.add(new JPanel());
        panelNumarCozi.add(textAreaNumarCozi);
        panelNumarCozi.add(new JPanel());
        panelStangaSus.add(panelNumarCozi);
        panelStangaSus.add(new JPanel());

        ///MIJLOC
        JPanel panelStangaMijloc = new JPanel();
        panelMijloc_Stanga.add(panelStangaMijloc, CENTER_ALIGNMENT);

        panelStangaMijloc.setLayout(new GridLayout(3, 4));

        panelStangaMijloc.add(new JLabel("T. Min. Arrive"));

        JTextField textTArrMin = new JTextField();
        textAreaNumarCozi.setEditable(true);
        JPanel panelTArrMin = new JPanel();
        panelTArrMin.setLayout(new GridLayout(3, 1));
        panelTArrMin.add(new JPanel());
        panelTArrMin.add(textTArrMin);
        panelTArrMin.add(new JPanel());
        panelStangaMijloc.add(panelTArrMin);

        panelStangaMijloc.add(new JLabel("T. Max. Arrive"));

        JTextField textTArrMax = new JTextField();
        textAreaNumarCozi.setEditable(true);
        JPanel panelTArrMax = new JPanel();
        panelTArrMax.setLayout(new GridLayout(3, 1));
        panelTArrMax.add(new JPanel());
        panelTArrMax.add(textTArrMax);
        panelTArrMax.add(new JPanel());
        panelStangaMijloc.add(panelTArrMax);


        panelStangaMijloc.add(new JLabel("T. Min. Service"));

        JTextField textTServiceMin = new JTextField();
        textAreaNumarCozi.setEditable(true);
        JPanel panelTServiceMin = new JPanel();
        panelTServiceMin.setLayout(new GridLayout(3, 1));
        panelTServiceMin.add(new JPanel());
        panelTServiceMin.add(textTServiceMin);
        panelTServiceMin.add(new JPanel());
        panelStangaMijloc.add(panelTServiceMin);

        panelStangaMijloc.add(new JLabel("T. Max. Service"));

        JTextField textTServiceMax = new JTextField();
        textAreaNumarCozi.setEditable(true);
        JPanel panelTServiceMax = new JPanel();
        panelTServiceMax.setLayout(new GridLayout(3, 1));
        panelTServiceMax.add(new JPanel());
        panelTServiceMax.add(textTServiceMax);
        panelTServiceMax.add(new JPanel());
        panelStangaMijloc.add(panelTServiceMax);

        //
        panelStangaMijloc.add(new JLabel("Mod abordat:"));

        JRadioButton radioButtonTimp = new JRadioButton("Timp minim");
        JRadioButton radioButtonCoadaScurt = new JRadioButton("Coada min.");

        ButtonGroup grupRadio = new ButtonGroup();
        grupRadio.add(radioButtonTimp);
        grupRadio.add(radioButtonCoadaScurt);

        panelStangaMijloc.add(radioButtonTimp);
        panelStangaMijloc.add(radioButtonCoadaScurt);


        panelStangaMijloc.add(radioButtonCoadaScurt);

        ///JOS
        JPanel panelStangaJos = new JPanel();
        panelStangaJos.setLayout(new GridLayout(2, 1));
        panelMijloc_Stanga.add(panelStangaJos, CENTER_ALIGNMENT);

        JPanel panelStgJSus = new JPanel();
        panelStangaJos.add(panelStgJSus);
        panelStgJSus.setLayout(new GridLayout(1, 3));
        panelStgJSus.add(new JPanel());
        buttonStartActiune = new JButton("START");
        panelStgJSus.add(buttonStartActiune);
        panelStgJSus.add(new JPanel());


        JPanel panelStgJosJos = new JPanel();
        panelStgJosJos.setLayout(new GridLayout(3, 2));
        panelStangaJos.add(panelStgJosJos);

        JLabel labelAfisareMedieAsteptare = new JLabel("Medie de asteptare:");
        panelStgJosJos.add(labelAfisareMedieAsteptare);
        textAfisareTMediuDeAsteptare = new JTextField();
        textAfisareTMediuDeAsteptare.setEditable(false);
        panelStgJosJos.add(textAfisareTMediuDeAsteptare);

        JLabel labelAfisareMedieServire = new JLabel("Media de servire:");
        panelStgJosJos.add(labelAfisareMedieServire);
        textAfisareTMediuDeServire = new JTextField();
        textAfisareTMediuDeServire.setEditable(false);
        panelStgJosJos.add(textAfisareTMediuDeServire);

        JLabel labelAfisareOraVarf = new JLabel("Ora de varf:");
        panelStgJosJos.add(labelAfisareOraVarf);
        textAfisareOraVarf = new JTextField();
        textAfisareOraVarf.setEditable(false);
        panelStgJosJos.add(textAfisareOraVarf);


        ///Action Listener la buton
        buttonStartActiune.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                int ok = 0;
                int timeSimulation = 0;
                int nrClienti = 0;
                int nrServere = 0;
                int tMinArrival = 0;
                int tMaxArrival = 0;
                int tMinService = 0;
                int tMaxService = 0;
                SelectionPolicy selectionPolicy = SelectionPolicy.SHORTEST_QUEUE;

                while (ok == 0) {
                    try {
                        timeSimulation = Integer.parseInt(textAreaTimpSimulare.getText());
                        nrClienti = Integer.parseInt(textAreaNumarClienti.getText());
                        nrServere = Integer.parseInt(textAreaNumarCozi.getText());
                        tMinArrival = Integer.parseInt(textTArrMin.getText());
                        tMaxArrival = Integer.parseInt(textTArrMax.getText());
                        tMinService = Integer.parseInt(textTServiceMin.getText());
                        tMaxService = Integer.parseInt(textTServiceMax.getText());

                        if (tMinArrival > tMaxArrival) {
                            throw new Exception("");
                        }

                        if (tMinService > tMaxService) {
                            throw new Exception("");
                        }

                        if (tMaxArrival > timeSimulation) {
                            throw new Exception("");
                        }

                        if (radioButtonTimp.isSelected()) {
                            selectionPolicy = SelectionPolicy.SHORTEST_TIME;
                        }
                        if (radioButtonCoadaScurt.isSelected()) {
                            selectionPolicy = SelectionPolicy.SHORTEST_QUEUE;
                        }

                        if (!radioButtonTimp.isSelected() && !radioButtonCoadaScurt.isSelected()) {
                            showError("Date incomplete");
                            throw new Exception("");
                        }

                        simulationManager = new SimulationManager(timeSimulation, tMinArrival, tMaxArrival,
                                tMinService, tMaxService, nrServere, nrClienti, selectionPolicy);

                        ok = 1;
                    } catch (Exception ex) {
                        showError("Date invalide!");
                        textAreaTimpSimulare.setText("");
                        textAreaNumarClienti.setText("");
                        textAreaNumarCozi.setText("");
                        textTArrMin.setText("");
                        textTArrMax.setText("");
                        textTServiceMin.setText("");
                        textTServiceMax.setText("");
                        radioButtonTimp.setSelected(false);
                        radioButtonCoadaScurt.setSelected(false);
                        return;
                    }
                }
                textAfisareOraVarf.setText("");
                textAfisareTMediuDeAsteptare.setText("");
                textAfisareTMediuDeServire.setText("");

                textAreaTimpSimulare.setText("");
                textAreaNumarClienti.setText("");
                textAreaNumarCozi.setText("");
                textTArrMin.setText("");
                textTArrMax.setText("");
                textTServiceMin.setText("");
                textTServiceMax.setText("");
                radioButtonTimp.setSelected(false);
                radioButtonCoadaScurt.setSelected(false);

                simulationManager.setFrame(SimulationFrame.this);
                Thread thread = new Thread(simulationManager);
                thread.start();

            }
        });

        this.add(panel_principal);
        this.setVisible(true);
    }

    private void interfataPaginaStart() {

        if (loc_cur != 0)
            return;

        JPanel panelPrincipal = new JPanel();
        panelPrincipal.setLayout(new GridLayout(3, 3));
        panelPrincipal.setBackground(new Color(238, 232, 170));

        butonStart = new JButton("Start");
        butonStart.setBackground(Color.GREEN);
        butonStart.setForeground(Color.BLACK);
        butonStart.addActionListener(new ActionListener() {

            @Override
            public void actionPerformed(ActionEvent e) {
                loc_cur = 1;
                getContentPane().removeAll();
                interfata_meniu_principal();
                revalidate();
                repaint();
            }
        });

        JLabel buton_label = new JLabel();
        buton_label.setBackground(new Color(238, 232, 170));
        buton_label.setLayout(new GridLayout(3, 1));
        buton_label.add(new JLabel(""));
        buton_label.add(butonStart);
        buton_label.add(new JLabel(""));

        JTextArea textArea = new JTextArea("QUEUES MANAGEMENT\n          APPLICATION");
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

    private void afisare() {

        init();
        switch (loc_cur) {
            case 0: {
                this.interfataPaginaStart();
                break;
            }
            case 1: {
                this.interfata_meniu_principal();
                break;
            }
        }
    }

    public static void main(String[] args) {

        SimulationFrame frame = new SimulationFrame();
        frame.afisare();

    }
}
