package GUI;



import javax.swing.*;
import java.awt.*;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;
import java.io.IOException;

public class View extends JFrame {

    private void init() {
        this.setTitle("Resume Text With AI");
        this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        this.setSize(900, 700);
        this.setLocationRelativeTo(null);
        this.setVisible(true);
    }

    private void interfataPaginaStart() {

        JPanel panelPrincipal = new JPanel();
        panelPrincipal.setLayout(new GridLayout(3, 3));
        panelPrincipal.setBackground(new Color(69, 67, 62));

        JButton butonStart = new JButton("Start");
        butonStart.setBackground(new Color(248, 194, 24));
        butonStart.setForeground(Color.WHITE);
        butonStart.addActionListener(_ -> {
            getContentPane().removeAll();
            interfataMeniuPrincipal();
            revalidate();
            repaint();
        });

        JLabel buton_label = new JLabel();
        buton_label.setBackground(new Color(69, 67, 62));
        buton_label.setLayout(new GridLayout(3, 1));
        buton_label.add(new JLabel(""));
        buton_label.add(butonStart);
        buton_label.add(new JLabel(""));

        JTextArea textArea = new JTextArea("    Notepad AI Resume Text");
        textArea.setForeground(Color.WHITE);
        textArea.setFont(new Font("Monospaced", Font.BOLD, 15));
        textArea.setEditable(false);
        textArea.setBackground(new Color(69, 67, 62));
        textArea.setSize(50, 30);


        JLabel text_label = new JLabel();
        text_label.setBackground(new Color(69, 67, 62));
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

    private void interfataMeniuPrincipal() {

        JPanel panelPrincipal = new JPanel();
        panelPrincipal.setLayout(new BorderLayout());
        panelPrincipal.setBackground(new Color(69, 67, 62));

        JLabel panelNumePagina = new JLabel("Main Page");
        panelNumePagina.setForeground(Color.WHITE);
        panelNumePagina.setFont(new Font("Monospaced", Font.BOLD, 15));
        JPanel panelNumeP =  new JPanel();
        panelNumeP.setBackground(new Color(69, 67, 62));
        panelNumeP.add(panelNumePagina, CENTER_ALIGNMENT);
        panelPrincipal.add(panelNumeP, BorderLayout.PAGE_START);



        JPanel panelMareCentru = new JPanel();
        panelMareCentru.setBackground(new Color(69, 67, 62));
        panelMareCentru.setLayout(new BorderLayout());
        panelMareCentru.add(new JLabel(" "), BorderLayout.PAGE_START);

        JPanel panelText = new JPanel();
        panelText.setBackground(new Color(69, 67, 62));
        panelText.setLayout(new GridLayout(1, 1));
        panelText.setBorder(BorderFactory.createLineBorder(Color.WHITE, 2,  true));
        

        JTextArea textAreaInitial = new JTextArea("Your Text");
        textAreaInitial.setBorder(BorderFactory.createLineBorder(Color.WHITE, 2,  true));
        textAreaInitial.setForeground(Color.WHITE);
        textAreaInitial.setBackground(new Color(69, 67, 62));
        textAreaInitial.setFont(new Font("Monospaced", Font.BOLD, 15));
        textAreaInitial.setEditable(true);
        JScrollPane scrollPaneInitial = new JScrollPane(textAreaInitial);
        scrollPaneInitial.setHorizontalScrollBarPolicy(ScrollPaneConstants.HORIZONTAL_SCROLLBAR_NEVER);
        scrollPaneInitial.setVerticalScrollBarPolicy(ScrollPaneConstants.VERTICAL_SCROLLBAR_AS_NEEDED);


        final boolean[] clear1 = {false};

        textAreaInitial.addKeyListener(new KeyListener() {

            @Override
            public void keyTyped(KeyEvent e) {
                if(!clear1[0]){
                    textAreaInitial.setText("");
                    clear1[0] = true;
                }
            }
            @Override
            public void keyPressed(KeyEvent e) {}

            @Override
            public void keyReleased(KeyEvent e) {

            }
        });
        panelText.add(scrollPaneInitial, CENTER_ALIGNMENT);


        JTextArea textAreaRefractoring = new JTextArea("Reconstructed text");
        textAreaRefractoring.setBorder(BorderFactory.createLineBorder(Color.WHITE, 2,  true));
        textAreaRefractoring.setBackground(new Color(69, 67, 62));
        textAreaRefractoring.setForeground(Color.WHITE);
        textAreaRefractoring.setFont(new Font("Monospaced", Font.BOLD, 15));
        textAreaRefractoring.setEditable(true);
        JScrollPane scrollPaneRefractoring = new JScrollPane(textAreaRefractoring);
        scrollPaneRefractoring.setHorizontalScrollBarPolicy(ScrollPaneConstants.HORIZONTAL_SCROLLBAR_NEVER);
        scrollPaneRefractoring.setVerticalScrollBarPolicy(ScrollPaneConstants.VERTICAL_SCROLLBAR_AS_NEEDED);

        final boolean[] clear2 = {false};

        textAreaRefractoring.addKeyListener(new KeyListener() {

            @Override
            public void keyTyped(KeyEvent e) {
                if(!clear2[0]){
                    textAreaRefractoring.setText("");
                    clear2[0] = true;
                }
            }
            @Override
            public void keyPressed(KeyEvent e) {}

            @Override
            public void keyReleased(KeyEvent e) {

            }
        });

        panelText.add(scrollPaneRefractoring, CENTER_ALIGNMENT);
        panelMareCentru.add(panelText, BorderLayout.CENTER);
        panelMareCentru.add(new  JLabel(" "), BorderLayout.PAGE_END);
        panelPrincipal.add(panelMareCentru, BorderLayout.CENTER);


        JPanel panelButonJosGenerate = new JPanel();
        panelButonJosGenerate.setBackground(new Color(69, 67, 62));
        panelButonJosGenerate.setLayout(new GridLayout(1, 3));
        panelButonJosGenerate.add(new JLabel(" "));

        JButton butonGenerate = new JButton("Generate");
        butonGenerate.setBackground(new Color(248, 194, 24));
        butonGenerate.setForeground(Color.WHITE);
        butonGenerate.setSize(50, 40);
        butonGenerate.addActionListener(_ -> {
            String text = textAreaInitial.getText();
            Model.GPT4AllApp gpt4AllApp = new  Model.GPT4AllApp();
            String aiResponse = null;
            try {
                aiResponse = gpt4AllApp.sendToGPT4All(text);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
            textAreaRefractoring.setText(aiResponse);
        });

        panelButonJosGenerate.add(butonGenerate);
        panelButonJosGenerate.add(new JLabel(" "));

        panelPrincipal.add(panelButonJosGenerate, BorderLayout.PAGE_END);

        textAreaInitial.setLineWrap(true);
        textAreaInitial.setWrapStyleWord(true);

        textAreaRefractoring.setLineWrap(true);
        textAreaRefractoring.setWrapStyleWord(true);


        this.add(panelPrincipal);
        this.setVisible(true);
    }

    public View() {
        init();
        interfataPaginaStart();
    }

    public static void main(String[] args) {
        View view = new View();


    }

}
