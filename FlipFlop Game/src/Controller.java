import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.Random;

public class Controller {

    private View view;
    private Model model;

    public Controller(Model model, View view) {
        this.view = view;
        this.model = model;

        view.addButtonStart(e -> {
            String name = view.getUserName();
            if (name == null) {
                view.changeInterface(0);
                return;
            }
            view.resetGame_start();
            String difficulty = view.getSelectedDifficulty();
            if (difficulty.equals("Neselectat")) {
                view.changeInterface(0);
            } else {
                view.changeInterface(1);
            }
        });

        view.addButtonBack(e -> {
            view.resetGame_start();
            view.changeInterface(0);
        });

        view.addButton1_1(new Button1_1Listener());
        view.addButton1_2(new Button1_2Listener());
        view.addButton1_3(new Button1_3Listener());

        view.addButton2_1(new Button2_1Listener());
        view.addButton2_2(new Button2_2Listener());
        view.addButton2_3(new Button2_3Listener());

        view.addButton3_1(new Button3_1Listener());
        view.addButton3_2(new Button3_2Listener());
        view.addButton3_3(new Button3_3Listener());

    }

    class Button1_1Listener implements ActionListener {
        public void actionPerformed(ActionEvent e) {
            if (view.buton_activ != 0) {
                if (view.buton_activ == 1) {
                    model.add();
                    Random r = new Random();
                    view.buton_activ = r.nextInt(9) + 1;
                    view.color_button();
                } else {
                    model.subb();
                    Random r = new Random();
                    view.buton_activ = r.nextInt(9) + 1;
                    view.color_button();
                }
            }
            view.setScor();
        }
    }

    class Button1_2Listener implements ActionListener {
        public void actionPerformed(ActionEvent e) {
            if (view.buton_activ != 0) {
                if (view.buton_activ == 2) {
                    model.add();
                    Random r = new Random();
                    view.buton_activ = r.nextInt(9) + 1;
                    view.color_button();
                } else {
                    model.subb();
                    Random r = new Random();
                    view.buton_activ = r.nextInt(9) + 1;
                    view.color_button();
                }
            }
            view.setScor();
        }
    }

    class Button1_3Listener implements ActionListener {
        public void actionPerformed(ActionEvent e) {
            if (view.buton_activ != 0) {
                if (view.buton_activ == 3) {
                    model.add();
                    Random r = new Random();
                    view.buton_activ = r.nextInt(9) + 1;
                    view.color_button();
                } else {
                    model.subb();
                    Random r = new Random();
                    view.buton_activ = r.nextInt(9) + 1;
                    view.color_button();
                }
            }
            view.setScor();
        }
    }

    class Button2_1Listener implements ActionListener {
        public void actionPerformed(ActionEvent e) {
            if (view.buton_activ != 0) {
                if (view.buton_activ == 4) {
                    model.add();
                    Random r = new Random();
                    view.buton_activ = r.nextInt(9) + 1;
                    view.color_button();
                } else {
                    model.subb();
                    Random r = new Random();
                    view.buton_activ = r.nextInt(9) + 1;
                    view.color_button();
                }
            }
            view.setScor();
        }
    }

    class Button2_2Listener implements ActionListener {
        public void actionPerformed(ActionEvent e) {
            if (view.buton_activ != 0) {
                if (view.buton_activ == 5) {
                    model.add();
                    Random r = new Random();
                    view.buton_activ = r.nextInt(9) + 1;
                    view.color_button();
                } else {
                    model.subb();
                    Random r = new Random();
                    view.buton_activ = r.nextInt(9) + 1;
                    view.color_button();
                }
            }
            view.setScor();
        }
    }

    class Button2_3Listener implements ActionListener {
        public void actionPerformed(ActionEvent e) {
            if (view.buton_activ != 0) {
                if (view.buton_activ == 6) {
                    model.add();
                    Random r = new Random();
                    view.buton_activ = r.nextInt(9) + 1;
                    view.color_button();
                } else {
                    model.subb();
                    Random r = new Random();
                    view.buton_activ = r.nextInt(9) + 1;
                    view.color_button();
                }
            }
            view.setScor();
        }
    }

    class Button3_1Listener implements ActionListener {
        public void actionPerformed(ActionEvent e) {
            if (view.buton_activ != 0) {
                if (view.buton_activ == 7) {
                    model.add();
                    Random r = new Random();
                    view.buton_activ = r.nextInt(9) + 1;
                    view.color_button();
                } else {
                    model.subb();
                    Random r = new Random();
                    view.buton_activ = r.nextInt(9) + 1;
                    view.color_button();
                }
            }
            view.setScor();
        }
    }

    class Button3_2Listener implements ActionListener {
        public void actionPerformed(ActionEvent e) {
            if (view.buton_activ != 0) {
                if (view.buton_activ == 8) {
                    model.add();
                    Random r = new Random();
                    view.buton_activ = r.nextInt(9) + 1;
                    view.color_button();
                } else {
                    model.subb();
                    Random r = new Random();
                    view.buton_activ = r.nextInt(9) + 1;
                    view.color_button();
                }
            }
            view.setScor();
        }
    }

    class Button3_3Listener implements ActionListener {
        public void actionPerformed(ActionEvent e) {
            if (view.buton_activ != 0) {
                if (view.buton_activ == 9) {
                    model.add();
                    Random r = new Random();
                    view.buton_activ = r.nextInt(9) + 1;
                    view.color_button();
                } else {
                    model.subb();
                    Random r = new Random();
                    view.buton_activ = r.nextInt(9) + 1;
                    view.color_button();
                }
            }
            view.setScor();
        }
    }
}
