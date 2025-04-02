import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.Random;


public class View extends JFrame {

    private JTextField textField_name = new JTextField(20);
    private JRadioButton radioButton1 = new JRadioButton();
    private JRadioButton radioButton2 = new JRadioButton();
    private JButton buttonStart = new JButton("Start");
    private JButton buttonBack = new JButton("Inapoi");


    private JButton button1_1 = new JButton("");
    private JButton button1_2 = new JButton("");
    private JButton button1_3 = new JButton("");

    private JButton button2_1 = new JButton("");
    private JButton button2_2 = new JButton("");
    private JButton button2_3 = new JButton("");

    private JButton button3_1 = new JButton("");
    private JButton button3_2 = new JButton("");
    private JButton button3_3 = new JButton("");


    public int interfata = 0;
    public int buton_activ = 0;
    private int timp_sec = 60;
    private boolean isRunning = true;

    //    private Timer tr;
    Model model;

    public View(Model model) {
        setupInterface(interfata);
        this.model = model;
        this.setTitle("Aplicație");
        this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        this.setLocation(450, 250);
        this.setSize(400, 300);
        this.setVisible(true);
    }

    public void changeInterface(int interfaceIndex) {
        interfata = interfaceIndex;
        setupInterface(interfata);
    }

    void showError(String errMessage) {
        JOptionPane.showMessageDialog(this, errMessage);

    }

    void color_button() {
        switch (buton_activ) {
            case 1: {
                button1_1.setBackground(Color.RED);
                button1_2.setBackground(Color.GREEN);
                button1_3.setBackground(Color.GREEN);
                button2_1.setBackground(Color.GREEN);
                button2_2.setBackground(Color.GREEN);
                button2_3.setBackground(Color.GREEN);
                button3_1.setBackground(Color.GREEN);
                button3_2.setBackground(Color.GREEN);
                button3_3.setBackground(Color.GREEN);
                break;
            }
            case 2: {
                button1_1.setBackground(Color.GREEN);
                button1_2.setBackground(Color.RED);
                button1_3.setBackground(Color.GREEN);
                button2_1.setBackground(Color.GREEN);
                button2_2.setBackground(Color.GREEN);
                button2_3.setBackground(Color.GREEN);
                button3_1.setBackground(Color.GREEN);
                button3_2.setBackground(Color.GREEN);
                button3_3.setBackground(Color.GREEN);
                break;
            }
            case 3: {
                button1_1.setBackground(Color.GREEN);
                button1_2.setBackground(Color.GREEN);
                button1_3.setBackground(Color.RED);
                button2_1.setBackground(Color.GREEN);
                button2_2.setBackground(Color.GREEN);
                button2_3.setBackground(Color.GREEN);
                button3_1.setBackground(Color.GREEN);
                button3_2.setBackground(Color.GREEN);
                button3_3.setBackground(Color.GREEN);
                break;
            }
            case 4: {
                button1_1.setBackground(Color.GREEN);
                button1_2.setBackground(Color.GREEN);
                button1_3.setBackground(Color.GREEN);
                button2_1.setBackground(Color.RED);
                button2_2.setBackground(Color.GREEN);
                button2_3.setBackground(Color.GREEN);
                button3_1.setBackground(Color.GREEN);
                button3_2.setBackground(Color.GREEN);
                button3_3.setBackground(Color.GREEN);
                break;
            }
            case 5: {
                button1_1.setBackground(Color.GREEN);
                button1_2.setBackground(Color.GREEN);
                button1_3.setBackground(Color.GREEN);
                button2_1.setBackground(Color.GREEN);
                button2_2.setBackground(Color.RED);
                button2_3.setBackground(Color.GREEN);
                button3_1.setBackground(Color.GREEN);
                button3_2.setBackground(Color.GREEN);
                button3_3.setBackground(Color.GREEN);
                break;
            }
            case 6: {
                button1_1.setBackground(Color.GREEN);
                button1_2.setBackground(Color.GREEN);
                button1_3.setBackground(Color.GREEN);
                button2_1.setBackground(Color.GREEN);
                button2_2.setBackground(Color.GREEN);
                button2_3.setBackground(Color.RED);
                button3_1.setBackground(Color.GREEN);
                button3_2.setBackground(Color.GREEN);
                button3_3.setBackground(Color.GREEN);
                break;
            }
            case 7: {
                button1_1.setBackground(Color.GREEN);
                button1_2.setBackground(Color.GREEN);
                button1_3.setBackground(Color.GREEN);
                button2_1.setBackground(Color.GREEN);
                button2_2.setBackground(Color.GREEN);
                button2_3.setBackground(Color.GREEN);
                button3_1.setBackground(Color.RED);
                button3_2.setBackground(Color.GREEN);
                button3_3.setBackground(Color.GREEN);
                break;
            }
            case 8: {
                button1_1.setBackground(Color.GREEN);
                button1_2.setBackground(Color.GREEN);
                button1_3.setBackground(Color.GREEN);
                button2_1.setBackground(Color.GREEN);
                button2_2.setBackground(Color.GREEN);
                button2_3.setBackground(Color.GREEN);
                button3_1.setBackground(Color.GREEN);
                button3_2.setBackground(Color.RED);
                button3_3.setBackground(Color.GREEN);
                break;
            }
            case 9: {
                button1_1.setBackground(Color.GREEN);
                button1_2.setBackground(Color.GREEN);
                button1_3.setBackground(Color.GREEN);
                button2_1.setBackground(Color.GREEN);
                button2_2.setBackground(Color.GREEN);
                button2_3.setBackground(Color.GREEN);
                button3_1.setBackground(Color.GREEN);
                button3_2.setBackground(Color.GREEN);
                button3_3.setBackground(Color.RED);
                break;
            }
            default: {
                button1_1.setBackground(Color.GREEN);
                button1_2.setBackground(Color.GREEN);
                button1_3.setBackground(Color.GREEN);
                button2_1.setBackground(Color.GREEN);
                button2_2.setBackground(Color.GREEN);
                button2_3.setBackground(Color.GREEN);
                button3_1.setBackground(Color.GREEN);
                button3_2.setBackground(Color.GREEN);
                button3_3.setBackground(Color.GREEN);
                break;
            }
        }
    }

    void resetGame() {
        isRunning = false;
        changeInterface(0);
        buton_activ = 0;
        timp_sec = 60;
        showError("Meciul s-a terminat. Ai obținut scorul: " + model.getScore());
        model.setScore(0);
    }

    void resetGame_start() {
        buton_activ = 0;
        isRunning = false;
        color_button();
        timp_sec = 60;
        Random r = new Random();
        buton_activ = r.nextInt(9) + 1;
        color_button();
        changeInterface(0);
        model.setScore(0);
    }

    private void setupInterface(int interfata) {
        this.getContentPane().removeAll();

        if (interfata == 0) {
            textField_name.setEditable(Boolean.TRUE);

            JPanel interfata1 = new JPanel();
            interfata1.setLayout(new GridLayout(3, 1));

            JPanel panel_interf1 = new JPanel();
            panel_interf1.setLayout(new FlowLayout());
            JLabel label_interf1 = new JLabel("Introdu numele", SwingConstants.CENTER);
            panel_interf1.add(label_interf1);

            JPanel panel_interf2 = new JPanel();
            panel_interf2.setLayout(new GridLayout(2, 1));
            JPanel panel_interf7 = new JPanel();
            panel_interf7.setLayout(new FlowLayout());
            panel_interf7.add(textField_name);
            panel_interf7.setBackground(Color.PINK);
            panel_interf2.add(panel_interf7, CENTER_ALIGNMENT);

            JPanel panel_interf8 = new JPanel();
            panel_interf8.setLayout(new FlowLayout());
            panel_interf8.add(buttonStart);
            buttonStart.setBackground(Color.GREEN);
            panel_interf2.add(panel_interf8);
            panel_interf8.setBackground(Color.PINK);


            JPanel panel_interf3 = new JPanel();
            panel_interf3.setLayout(new GridLayout(2, 1));
            JLabel label_interf2 = new JLabel("Dificultate", SwingConstants.CENTER);
            panel_interf3.add(label_interf2);

            JPanel panel_interf4 = new JPanel();
            panel_interf4.setLayout(new GridLayout(2, 2));
            JLabel label_interf3 = new JLabel("Usor", SwingConstants.CENTER);
            panel_interf4.add(label_interf3);
            JLabel label_interf4 = new JLabel("Greu", SwingConstants.CENTER);
            panel_interf4.add(label_interf4);
            panel_interf4.setBackground(Color.PINK);

            JPanel panel_interf5 = new JPanel();
            panel_interf5.setLayout(new FlowLayout());
            panel_interf5.add(radioButton1);
            radioButton1.setBackground(Color.PINK);
            panel_interf5.setBackground(Color.PINK);


            panel_interf4.add(panel_interf5, CENTER_ALIGNMENT);
            JPanel panel_interf6 = new JPanel();
            panel_interf6.setLayout(new FlowLayout());
            panel_interf6.add(radioButton2);
            radioButton2.setBackground(Color.PINK);
            panel_interf6.setBackground(Color.PINK);


            panel_interf4.add(panel_interf6, CENTER_ALIGNMENT);
            panel_interf4.setVisible(true);

            panel_interf3.add(panel_interf4);
            panel_interf3.setVisible(true);


            interfata1.add(panel_interf1);
            interfata1.add(panel_interf2);
            interfata1.add(panel_interf3);
            panel_interf1.setBackground(Color.PINK);
            panel_interf2.setBackground(Color.PINK);
            panel_interf3.setBackground(Color.PINK);


            this.setTitle("Pagina principala");
            this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
            this.setContentPane(interfata1);

            this.setSize(300, 300);
            this.setLocation(450, 250);
            this.setVisible(true);
        }
        if (interfata == 1) {
            JLabel timer = new JLabel("");

            Thread timerThreadImagine = new Thread(() -> {
                color_button();

                JPanel interfata1 = new JPanel();
                interfata1.setLayout(new BorderLayout());
                JPanel panel_interf1 = new JPanel();
                buttonBack.setBackground(Color.RED);
                panel_interf1.setBackground(Color.PINK);
                interfata1.setBackground(Color.PINK);
                interfata1.add(buttonBack, BorderLayout.PAGE_END);

                JPanel panel_interf2_2 = new JPanel();
                panel_interf2_2.setLayout(new GridLayout(1, 3));

                JLabel panel_interf2 = new JLabel("", SwingConstants.CENTER);
                panel_interf2.setLayout(new FlowLayout());
                panel_interf2.setText(this.getUserName());


                JLabel panel_interf2_1 = new JLabel("");
                panel_interf2_1.setLayout(new FlowLayout());
                if (model != null) {
                    panel_interf2_1.setText("Scor: " + model.getScore());
                } else {
                    panel_interf2_1.setText("Scor: 0");
                }
                panel_interf2_2.setBackground(Color.PINK);
                panel_interf2.setBackground(Color.PINK);
                panel_interf2_1.setBackground(Color.PINK);

                panel_interf2_2.add(panel_interf2);
                panel_interf2_2.add(panel_interf2_1);


                timer.setText("Timp: " + (timp_sec / 2));
                timer.setBackground(Color.CYAN);

                panel_interf2_2.add(timer);

                interfata1.add(panel_interf2_2, BorderLayout.PAGE_START);


                ///mijloc
                JPanel panel_mijloc = new JPanel();
                panel_mijloc.setLayout(new GridLayout(3, 3));
                panel_mijloc.setBackground(Color.BLUE);
                panel_mijloc.setBorder(BorderFactory.createLineBorder(Color.black));

                panel_mijloc.add(button1_1);
                panel_mijloc.add(button1_2);
                panel_mijloc.add(button1_3);
                panel_mijloc.add(button2_1);
                panel_mijloc.add(button2_2);
                panel_mijloc.add(button2_3);
                panel_mijloc.add(button3_1);
                panel_mijloc.add(button3_2);
                panel_mijloc.add(button3_3);

                button1_1.setBorder(BorderFactory.createLineBorder(Color.black));
                button1_2.setBorder(BorderFactory.createLineBorder(Color.black));
                button1_3.setBorder(BorderFactory.createLineBorder(Color.black));
                button2_1.setBorder(BorderFactory.createLineBorder(Color.black));
                button2_2.setBorder(BorderFactory.createLineBorder(Color.black));
                button2_3.setBorder(BorderFactory.createLineBorder(Color.black));
                button3_1.setBorder(BorderFactory.createLineBorder(Color.black));
                button3_2.setBorder(BorderFactory.createLineBorder(Color.black));
                button3_3.setBorder(BorderFactory.createLineBorder(Color.black));

                interfata1.add(panel_mijloc, BorderLayout.CENTER);


                this.setTitle("Pagina principala");
                this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                this.setContentPane(interfata1);
                this.setSize(350, 350);
                this.setLocation(450, 250);
                this.setVisible(true);

            });

            isRunning = true;
            Thread timerThread = new Thread(() -> {
                if (radioButton1.isSelected())
                    while (isRunning && timp_sec > 0) {
                        try {
                            Thread.sleep(2000);

                            timp_sec--;
                            if (timp_sec % 4 == 0) {
                                Random r = new Random();
                                buton_activ = r.nextInt(9) + 1;
                                color_button();
                            }
                            SwingUtilities.invokeLater(() -> timer.setText("Timp: " + (timp_sec / 2)));
                        } catch (InterruptedException e) {
                            e.printStackTrace();
                        }
                    }
                else {
                    if (radioButton2.isSelected()) {
                        while (isRunning && timp_sec > 0) {
                            try {
                                Thread.sleep(1000);
                                timp_sec--;
                                if (timp_sec % 4 == 0) {
                                    Random r = new Random();
                                    buton_activ = r.nextInt(9) + 1;
                                    color_button();
                                }
                                SwingUtilities.invokeLater(() -> timer.setText("Timp: " + (timp_sec / 2)));
                            } catch (InterruptedException e) {
                                e.printStackTrace();
                            }
                        }
                    }
                }
                if (timp_sec <= 0)
                    resetGame();
            });


            timerThread.setPriority(10);
            timerThreadImagine.setPriority(1);


            timerThread.start();
            timerThreadImagine.start();


        }

        this.revalidate();
        this.repaint();

    }

    void addButtonStart(ActionListener start) {
        buttonStart.addActionListener(start);
    }

    void addButtonBack(ActionListener back) {
        buttonBack.addActionListener(back);
    }

    public String getUserName() {
        try {
            if (textField_name.getText().length() == 0) {
                throw new RuntimeException();
            } else {
                return textField_name.getText();
            }
        } catch (RuntimeException e) {
            this.showError("Nu ati introdus numele");
            return null;
        }
    }


    public String getSelectedDifficulty() {
        try {
            if (radioButton1.isSelected() && radioButton2.isSelected()) {
                throw new RuntimeException();
            }
            if (!(radioButton1.isSelected() || radioButton2.isSelected())) {
                throw new Exception();
            }
            if (radioButton1.isSelected()) {
                return "Usor";
            } else {
                return "Greu";
            }
        } catch (RuntimeException e) {
            this.showError("Prea multe obtiuni selectate");
            return "Neselectat";
        } catch (Exception e) {
            this.showError("Prea putine obtiuni selectate");
            return "Neselectat";
        }
    }

    void addButton1_1(ActionListener back) {
        button1_1.addActionListener(back);
    }

    void addButton1_2(ActionListener back) {
        button1_2.addActionListener(back);
    }

    void addButton1_3(ActionListener back) {
        button1_3.addActionListener(back);
    }

    void addButton2_1(ActionListener back) {
        button2_1.addActionListener(back);
    }

    void addButton2_2(ActionListener back) {
        button2_2.addActionListener(back);
    }

    void addButton2_3(ActionListener back) {
        button2_3.addActionListener(back);
    }

    void addButton3_1(ActionListener back) {
        button3_1.addActionListener(back);
    }

    void addButton3_2(ActionListener back) {
        button3_2.addActionListener(back);
    }

    public void addButton3_3(ActionListener back) {
        button3_3.addActionListener(back);
    }

    public void setScor() {
        setupInterface(1);
    }

}