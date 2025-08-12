package graphicaluserinterface;

import businesslogic.TaskManagement;
import businesslogic.Utility;
import dataaccess.SerializationOperations;
import datamodel.ComplexTask;
import datamodel.Employee;
import datamodel.SimpleTask;
import datamodel.Task;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.IOException;
import java.io.Serializable;
import java.util.*;
import java.util.List;

public class UI extends JFrame implements Serializable {

    LinkedHashSet<Employee> employees = new LinkedHashSet<>();
    TaskManagement taskManagement = new TaskManagement();
    LinkedHashSet<Task> task = new LinkedHashSet<>();
    Utility utility;
    SerializationOperations serializationOperations;

    private JButton butonStart;
    private JButton butonAddEmployee;
    private JButton butonViewEmployee;
    private JButton butonAddTaskST;
    private JButton butonAddTaskCT;
    private JButton butonViewTask;
    private JButton butonBackPage1;
    private JButton btnafiseazaTaskId;
    private JButton butonAssignTaskToEmployee;
    private JButton butonViewAssignTaskToEmployee;
    private JButton buttoncalculateEmployeeWorkDuration;
    private JButton buttoncmodifyTaskStatus;
    private JButton buttonsortEmployee;
    private JButton buttongetCompletedUncompletedTask;


    private void init() {
        this.setTitle("Task Management System");
        this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        this.setSize(500, 500);
        this.setLocationRelativeTo(null);
        this.setVisible(true);
    }

    private Task getTaskById(int id) {
        for (Task task : task) {
            if (task.getIdTask() == id) {
                return task;
            }
        }
        for (Task task : task) {
            if (task instanceof ComplexTask) {
                ComplexTask complex = (ComplexTask) task;
                for (Task t : complex.getLista()) {
                    if (t.getIdTask() == id) {
                        return t;
                    }
                }
            }
        }
        return null;
    }

    private boolean contineIdSameE(int id) {
        for (Employee employee : employees) {
            if (employee.getIdEmployee() == id) {
                return true;
            }
        }
        return false;
    }

    private boolean contineEmpId(int id) {
        for (Employee employee : employees) {
            if (employee.getIdEmployee() == id) {
                return true;
            }
        }
        return false;
    }

    private boolean contineIdSameT(int id) {
        for (Task task : task) {
            if (task.getIdTask() == id) {
                return true;
            }
        }
        return false;
    }

    private void citireDateFisier() {

        try {
            employees = serializationOperations.CitireEmployee();
            taskManagement.addEmployeeList(employees);
            //serializationOperations.StocareTaskManagement(taskManagement);

        } catch (IOException e) {
            System.out.println("Nu s-a putut deschide fisierul Employee");
        } catch (ClassNotFoundException e) {
            System.out.println("Nu s-a putut interpreta fisierul Employee");
        }

        try {
            task = serializationOperations.CitireTask();

        } catch (IOException e) {
            System.out.println("Nu s-a putut deschide fisierul Task");
        } catch (ClassNotFoundException e) {
            System.out.println("Nu s-a putut interpreta fisierul Task");
        }

        try {
            taskManagement = serializationOperations.CitireTaskManagement();

        } catch (IOException e) {
            System.out.println("Nu s-a putut deschide fisierul taskManagement");
        } catch (ClassNotFoundException e) {
            System.out.println("Nu s-a putut interpreta fisierul taskManagement");
        }
    }

    void showError(String errMessage) {
        JOptionPane.showMessageDialog(this, errMessage);
    }

    private int loc_cur = 0;

    ///
    ///
    /// de aici partea de 5
    ///
    ///

    /// pagina principala
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

        JTextArea textArea = new JTextArea("Task Management System \n             Aplications");
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

    /// Insereaza Employeee
    private void interfataInsertEmployee() {
        JPanel panel_principal = new JPanel();

        panel_principal.setLayout(new BorderLayout());

        JLabel label_text = new JLabel("Insert Employee");
        label_text.setFont(new Font("Arial", Font.BOLD, 22));
        JPanel panel_label_text = new JPanel();
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


        JTextField textFieldId = new JTextField("");
        JTextField textFieldName = new JTextField("");

        matriceButoane.add(new JLabel(""));
        matriceButoane.add(new JLabel(""));
        matriceButoane.add(new JLabel("                                 Id :"), CENTER_ALIGNMENT);
        matriceButoane.add(textFieldId);
        matriceButoane.add(new JLabel("                               Name :"), CENTER_ALIGNMENT);
        matriceButoane.add(textFieldName);
        matriceButoane.add(new JLabel(""));
        matriceButoane.add(new JLabel(""));


        butonAddEmployee = new JButton("Insert");
        butonAddEmployee.setBackground(new Color(140, 252, 43));
        butonAddEmployee.addActionListener(new ActionListener() {

            @Override
            public void actionPerformed(ActionEvent e) {
                String nume;
                Integer id;
                try {
                    nume = textFieldName.getText();
                    id = Integer.valueOf(textFieldId.getText());
                } catch (Exception ex) {
                    showError("Parametri gresiti!");

                    textFieldName.setText("");
                    textFieldId.setText("");
                    return;
                }

                if (contineIdSameE(id)) {
                    showError("Id existent!");

                    textFieldName.setText("");
                    textFieldId.setText("");
                    return;
                }

                textFieldName.setText("");
                textFieldId.setText("");
                Employee emp = new Employee(id, nume);
                try {
                    serializationOperations.StocareEmployee(emp);
                } catch (IOException | ClassNotFoundException ex) {

                    showError("Parametri gresiti!");
                }

                employees.add(emp);
                taskManagement.addEmployee(emp);
                System.out.println("Nume " + nume + " Id " + id);
            }
        });


        JPanel panelButonInsert = new JPanel();
        panelButonInsert.setBackground(new Color(241, 241, 236));
        panelButonInsert.setLayout(new FlowLayout());
        butonAddEmployee.setSize(new Dimension(100, 50));
        panelButonInsert.add(butonAddEmployee);
        matriceButoane_principala.add(panelButonInsert, CENTER_ALIGNMENT);

        butonBackPage1 = new JButton("Back Page");
        butonBackPage1.setBackground(Color.RED);
        panel_principal.add(butonBackPage1, BorderLayout.PAGE_END);
        butonBackPage1.addActionListener(new ActionListener() {

            @Override
            public void actionPerformed(ActionEvent e) {
                loc_cur = 1;
                getContentPane().removeAll();
                interfata_meniu_principal();
                revalidate();
                repaint();
            }
        });

        this.add(panel_principal);
        this.setVisible(true);
    }

    /// afiseaza Employee
    private void interfataViewEmployee() {
        JPanel panel_principal = new JPanel();
        JPanel panel_mijloc_matrice = new JPanel();

        panel_principal.setLayout(new BorderLayout());

        JLabel label_text = new JLabel("View Employee", SwingConstants.CENTER);
        label_text.setFont(new Font("Arial", Font.BOLD, 22));
        panel_principal.add(label_text, BorderLayout.PAGE_START);

        JTextField textArea = new JTextField("Show Employee list");
        textArea.setBorder(BorderFactory.createLineBorder(Color.BLACK, 4));
        textArea.setFont(new Font("Arial", Font.BOLD, 22));

        panel_mijloc_matrice.setLayout(new GridLayout(2, 1));


        JPanel panelSusMijloc = new JPanel();
        panelSusMijloc.setLayout(new FlowLayout());

        ///cu ajutorul butonului caut in lista de date
        btnafiseazaTaskId = new JButton("Searched id:");
        JTextField textFieldId = new JTextField("");
        JPanel panelButonCauta = new JPanel();

        panelButonCauta.setLayout(new GridLayout(5, 2));
        panelButonCauta.add(new JLabel(""));
        panelButonCauta.add(new JLabel(""));
        panelButonCauta.add(new JLabel(""));
        panelButonCauta.add(new JLabel(""));
        panelButonCauta.add(btnafiseazaTaskId);
        panelButonCauta.add(textFieldId);
        panelButonCauta.add(new JLabel(""));
        panelButonCauta.add(new JLabel(""));
        panelButonCauta.add(new JLabel(""));
        panelButonCauta.add(new JLabel(""));

        panelSusMijloc.add(panelButonCauta, CENTER_ALIGNMENT);


        btnafiseazaTaskId.addActionListener(new ActionListener() {

            @Override
            public void actionPerformed(ActionEvent e) {
                Employee emp;
                Integer id;
                try {
                    id = Integer.valueOf(textFieldId.getText());
                } catch (Exception ex) {
                    showError("Parametri gresiti!");

                    textFieldId.setText("");
                    return;
                }

                if (taskManagement.getTaskByEmployeeId(id) != null) {
                    emp = taskManagement.getEmployeeById(id);
                    textFieldId.setText("");
                    String ss = "";
                    ss = ss + "Nume : " + emp.getName() + "  id: " + emp.getIdEmployee();
                    textArea.setFont(new Font("Arial", Font.BOLD, 14));
                    textArea.setText(ss);
                } else {
                    showError("Lista goala / Id inexistent");
                    textFieldId.setText("");
                }
            }
        });

        textArea.setEditable(false);
        ///afiseaza textul dupa un anumit id
        panel_mijloc_matrice.add(panelSusMijloc, BorderLayout.CENTER);
        panel_mijloc_matrice.add(textArea, BorderLayout.CENTER);
        panel_principal.add(panel_mijloc_matrice, BorderLayout.CENTER);


        butonBackPage1 = new JButton("Back Page");
        butonBackPage1.setBackground(Color.RED);
        panel_principal.add(butonBackPage1, BorderLayout.PAGE_END);
        butonBackPage1.addActionListener(new ActionListener() {

            @Override
            public void actionPerformed(ActionEvent e) {
                loc_cur = 1;
                getContentPane().removeAll();
                interfata_meniu_principal();
                revalidate();
                repaint();
            }
        });

        this.add(panel_principal);
        this.setVisible(true);
    }

    /// Adaugare taskuri
    private void interfataInsertTask() {
        JPanel panel_principal = new JPanel();
        panel_principal.setLayout(new BorderLayout());

        JLabel label_text = new JLabel("Insert Task");
        label_text.setFont(new Font("Arial", Font.BOLD, 22));
        JPanel panel_label_text = new JPanel();
        panel_label_text.add(label_text, CENTER_ALIGNMENT);
        panel_principal.add(panel_label_text, BorderLayout.PAGE_START);

        JLabel matriceButoane_principala = new JLabel();
        matriceButoane_principala.setBackground(new Color(140, 252, 43));
        matriceButoane_principala.setLayout(new GridLayout(3, 1));

        JLabel matriceButoane = new JLabel();
        matriceButoane.setBackground(new Color(238, 232, 170));
        matriceButoane.setLayout(new GridLayout(6, 2));
        matriceButoane_principala.add(matriceButoane, CENTER_ALIGNMENT);
        panel_principal.add(matriceButoane_principala, BorderLayout.CENTER);

        JTextField textFieldId = new JTextField("");
        JTextField textFieldName = new JTextField("Uncompleted / Completed");
        JTextField textFieldStart = new JTextField("");
        JTextField textFieldEnd = new JTextField("");

        matriceButoane.add(new JLabel("IdTask :"), CENTER_ALIGNMENT);
        matriceButoane.add(textFieldId);
        matriceButoane.add(new JLabel("Status Task :"), CENTER_ALIGNMENT);
        matriceButoane.add(textFieldName);
        matriceButoane.add(new JLabel("Start Hour :"));
        matriceButoane.add(textFieldStart);
        matriceButoane.add(new JLabel("End Hour :"));
        matriceButoane.add(textFieldEnd);

        JPanel panelButonInsert = new JPanel();
        panelButonInsert.setLayout(new FlowLayout());

        butonAddTaskST = new JButton("Insert Simple Task");
        butonAddTaskST.setBackground(new Color(140, 252, 43));
        butonAddTaskST.addActionListener(e -> {
            if (adaugaTask(textFieldId, textFieldName, textFieldStart, textFieldEnd, false)) {
                System.out.println("Simple Task adăugat cu succes!");
            } else {
                textFieldName.setText("Uncompleted / Completed");
                textFieldId.setText("");
                textFieldStart.setText("");
                textFieldEnd.setText("");
            }
        });

        butonAddTaskCT = new JButton("Insert Complex Task");
        butonAddTaskCT.setBackground(new Color(140, 252, 43));
        butonAddTaskCT.addActionListener(e -> {
            if (adaugaTask(textFieldId, textFieldName, textFieldStart, textFieldEnd, true)) {
                System.out.println("Simple Task in Complex Task a fost adăugat cu succes!");
            }
            int numarTaskuri = 0;
            while (true) {
                String input = JOptionPane.showInputDialog("Câte task-uri vrei să adaugi?");
                try {
                    numarTaskuri = Integer.parseInt(input);
                    if (numarTaskuri > 0) break;
                } catch (NumberFormatException ex) {
                    JOptionPane.showMessageDialog(null, "Introdu un număr valid!", "Eroare", JOptionPane.ERROR_MESSAGE);
                }
            }
            afisareInterfataComplexTask(panel_principal, numarTaskuri);
        });

        panelButonInsert.add(butonAddTaskST);
        panelButonInsert.add(butonAddTaskCT);
        matriceButoane_principala.add(panelButonInsert, CENTER_ALIGNMENT);


        ///Partea de jos a interfetei
        JLabel labelJosAsignareSimpleTaskToComplex = new JLabel();
        labelJosAsignareSimpleTaskToComplex.setLayout(new GridLayout(3, 1));

        JLabel labelJosAsignareSimpleTaskToComplexSUS = new JLabel("Assign a task to another", SwingConstants.CENTER);
        labelJosAsignareSimpleTaskToComplex.add(labelJosAsignareSimpleTaskToComplexSUS, CENTER_ALIGNMENT);


        JLabel labelJosAsignareSimpleTaskToComplexJOSSUS = new JLabel();
        JLabel labelJosAsignareSimpleTaskToComplexJOSJOS = new JLabel();
        labelJosAsignareSimpleTaskToComplexJOSSUS.setLayout(new GridLayout(1, 8));
        labelJosAsignareSimpleTaskToComplexJOSSUS.add(new JLabel(""));
        labelJosAsignareSimpleTaskToComplexJOSSUS.add(new JLabel("Id1: "));
        JTextField textFieldId1 = new JTextField("");
        textFieldId1.setEditable(true);
        labelJosAsignareSimpleTaskToComplexJOSSUS.add(textFieldId1);
        labelJosAsignareSimpleTaskToComplexJOSSUS.add(new JLabel(""));
        labelJosAsignareSimpleTaskToComplexJOSSUS.add(new JLabel(""));
        labelJosAsignareSimpleTaskToComplexJOSSUS.add(new JLabel("Id2: "));
        JTextField textFieldId2 = new JTextField("");
        textFieldId2.setEditable(true);
        labelJosAsignareSimpleTaskToComplexJOSSUS.add(textFieldId2);
        labelJosAsignareSimpleTaskToComplexJOSSUS.add(new JLabel(""));

        labelJosAsignareSimpleTaskToComplex.add(labelJosAsignareSimpleTaskToComplexJOSSUS);
        labelJosAsignareSimpleTaskToComplex.add(labelJosAsignareSimpleTaskToComplexJOSJOS);

        labelJosAsignareSimpleTaskToComplexJOSJOS.setLayout(new GridLayout(1, 5));
        labelJosAsignareSimpleTaskToComplexJOSJOS.add(new JLabel(""));
        labelJosAsignareSimpleTaskToComplexJOSJOS.add(new JLabel(""));
        JButton assignTaskToAnother = new JButton("Assign");///button
        labelJosAsignareSimpleTaskToComplexJOSJOS.add(assignTaskToAnother);
        labelJosAsignareSimpleTaskToComplexJOSJOS.add(new JLabel(""));
        labelJosAsignareSimpleTaskToComplexJOSJOS.add(new JLabel(""));


        matriceButoane_principala.add(labelJosAsignareSimpleTaskToComplex, CENTER_ALIGNMENT);

        assignTaskToAnother.addActionListener(e ->{
            ///textFieldId1 textFieldId2
            int id1, id2;
            Task task1, task2;
            try {
                id1 = Integer.parseInt(textFieldId1.getText());
                id2 = Integer.parseInt(textFieldId2.getText());

                task1 = getTaskById(id1);
                task2 = getTaskById(id2);

                if(task1 == null || task2 == null){
                    throw new NumberFormatException("Task invalid");
                }
            } catch (NumberFormatException ex) {
                JOptionPane.showMessageDialog(null, "Introdu un număr valid!", "Eroare", JOptionPane.ERROR_MESSAGE);
                textFieldId1.setText("");
                textFieldId2.setText("");
                return;
            }

            ((ComplexTask) task2).addTask(task1);
            try {
                serializationOperations.StocareTask(task2);
            } catch (IOException | ClassNotFoundException ex) {
                showError("Parametrii gresiti");
                textFieldId1.setText("");
                textFieldId2.setText("");
                return;
            }

            System.out.println("Task1: " + task1 + " asignat la: " + task2);

            textFieldId1.setText("");
            textFieldId2.setText("");
        });

        ///BACK PAGE
        butonBackPage1 = new JButton("Back Page");
        butonBackPage1.setBackground(Color.RED);
        butonBackPage1.addActionListener(e -> {
            loc_cur = 1;
            getContentPane().removeAll();
            interfata_meniu_principal();
            revalidate();
            repaint();
        });

        panel_principal.add(butonBackPage1, BorderLayout.PAGE_END);
        this.add(panel_principal);
        this.setVisible(true);
    }

    private void afisareInterfataComplexTask(JPanel panel_principal, int numarTaskuri) {
        panel_principal.removeAll();

        JPanel panel_tasks = new JPanel();
        panel_tasks.setLayout(new GridLayout(numarTaskuri + 2, 1));

        JLabel label_info = new JLabel("Mai ai de introdus " + numarTaskuri + " task-uri complexe.");
        panel_tasks.add(label_info, CENTER_ALIGNMENT);

        for (int i = 0; i < numarTaskuri; i++) {
            JButton btnInsertTask = new JButton("Insert Task " + (i + 1));
            int finalI = i;
            btnInsertTask.addActionListener(e -> {
                if (adaugaTaskNouComplex(panel_principal, panel_tasks, numarTaskuri - finalI - 1)) {
                    panel_tasks.remove(btnInsertTask);
                    label_info.setText("Mai ai de introdus " + (numarTaskuri - finalI - 1) + " task-uri complexe.");
                    panel_principal.revalidate();
                    panel_principal.repaint();
                }
            });
            panel_tasks.add(btnInsertTask);
        }
        butonBackPage1 = new JButton("Back Page");
        butonBackPage1.setBackground(Color.RED);
        butonBackPage1.addActionListener(e -> {
            loc_cur = 1;
            getContentPane().removeAll();
            interfataInsertTask();
            revalidate();
            repaint();
        });

        panel_tasks.add(butonBackPage1, BorderLayout.PAGE_END);
        panel_principal.add(panel_tasks);
        panel_principal.revalidate();
        panel_principal.repaint();


    }

    private boolean adaugaTaskNouComplex(JPanel panel_principal, JPanel panel_tasks, int taskuriRamase) {
        JTextField textFieldId = new JTextField();
        JTextField textFieldName = new JTextField("Uncompleted / Completed");
        JTextField textFieldStart = new JTextField();
        JTextField textFieldEnd = new JTextField();

        JPanel panel = new JPanel(new GridLayout(4, 2));
        panel.add(new JLabel("IdTask:"));
        panel.add(textFieldId);
        panel.add(new JLabel("Status Task:"));
        panel.add(textFieldName);
        panel.add(new JLabel("Start Hour:"));
        panel.add(textFieldStart);
        panel.add(new JLabel("End Hour:"));
        panel.add(textFieldEnd);

        int result = JOptionPane.showConfirmDialog(null, panel, "Introdu task-ul", JOptionPane.OK_CANCEL_OPTION);
        if (result != JOptionPane.OK_OPTION) return false;

        // Creăm un task simplu
        return adaugaTask(textFieldId, textFieldName, textFieldStart, textFieldEnd, true);
    }

    private boolean adaugaTask(JTextField textFieldId, JTextField textFieldName, JTextField textFieldStart, JTextField textFieldEnd, boolean isComplex) {
        String status;
        int id, start, end;

        try {
            status = textFieldName.getText();
            id = Integer.parseInt(textFieldId.getText());
            if (!status.equals("Completed") && !status.equals("Uncompleted")) {
                throw new Exception();
            }
            start = Integer.parseInt(textFieldStart.getText());
            end = Integer.parseInt(textFieldEnd.getText());
        } catch (Exception ex) {
            showError("Parametri greșiți! Reintroduceți corect.");
            return false;
        }

        if (contineIdSameT(id)) {
            showError("Id existent!");

            textFieldName.setText("Uncompleted / Completed");
            textFieldId.setText("");
            textFieldStart.setText("");
            textFieldEnd.setText("");
            return false;
        }

        // Dacă este un task complex, creăm un ComplexTask
        Task tsk;
        if (isComplex) {
            // Creăm un ComplexTask (îl putem adăuga în altă parte, dacă avem subtaskuri)
            tsk = new ComplexTask(start, end, id, status);
        } else {
            // Task simplu
            tsk = new SimpleTask(start, end, id, status);
        }

        try {
            // Salvează taskul
            serializationOperations.StocareTask(tsk);
        } catch (IOException | ClassNotFoundException ex) {
            showError("Eroare la salvare!");
            return false;
        }

        task.add(tsk); // Adaugă taskul în lista de taskuri
        textFieldName.setText("Uncompleted / Completed");
        textFieldId.setText("");
        textFieldStart.setText("");
        textFieldEnd.setText("");

        System.out.println("Task adăugat: " + tsk);
        return true;
    }

    /// afiseaza taskuri
    private void interfataViewTask() {
        JPanel panel_principal = new JPanel();
        JPanel panel_mijloc_matrice = new JPanel();

        panel_principal.setLayout(new BorderLayout());

        JLabel label_text = new JLabel("View Task", SwingConstants.CENTER);
        label_text.setFont(new Font("Arial", Font.BOLD, 22));
        panel_principal.add(label_text, BorderLayout.PAGE_START);

        JTextArea textArea = new JTextArea("Show task list");
        textArea.setBorder(BorderFactory.createLineBorder(Color.BLACK, 4));
        textArea.setFont(new Font("Arial", Font.BOLD, 22));
        textArea.setEditable(false);

        panel_mijloc_matrice.setLayout(new GridLayout(2, 1));


        JPanel panelSusMijloc = new JPanel();
        panelSusMijloc.setLayout(new FlowLayout());

        ///cu ajutorul butonului caut in lista de date
        btnafiseazaTaskId = new JButton("Searched id:");
        JTextField textFieldId = new JTextField("");
        JPanel panelButonCauta = new JPanel();

        panelButonCauta.setLayout(new GridLayout(5, 2));
        panelButonCauta.add(new JLabel(""));
        panelButonCauta.add(new JLabel(""));
        panelButonCauta.add(new JLabel(""));
        panelButonCauta.add(new JLabel(""));
        panelButonCauta.add(btnafiseazaTaskId);
        panelButonCauta.add(textFieldId);
        panelButonCauta.add(new JLabel(""));
        panelButonCauta.add(new JLabel(""));
        panelButonCauta.add(new JLabel(""));
        panelButonCauta.add(new JLabel(""));

        panelSusMijloc.add(panelButonCauta, CENTER_ALIGNMENT);


        btnafiseazaTaskId.addActionListener(new ActionListener() {

            @Override
            public void actionPerformed(ActionEvent e) {
                List<Task> taskList = new ArrayList<>();
                Integer id;
                try {
                    id = Integer.valueOf(textFieldId.getText());
                } catch (Exception ex) {
                    showError("Parametri gresiti!");

                    textFieldId.setText("");
                    return;
                }

                if (getTaskById(id) != null) {

                    textFieldId.setText("");
                    StringBuilder ss = new StringBuilder();
                    Task tsk = getTaskById(id);
                    if(tsk instanceof ComplexTask) {
                        for(Task task1 : ((ComplexTask) tsk).getLista()){
                            ss.append(task1).append(" Id: ").append(task1.getIdTask()).append(System.lineSeparator());
                        }
                    }else{
                        ss.append(getTaskById(id)).append("\n");
                    }
                    System.out.println(ss);
                    textArea.setFont(new Font("Arial", Font.BOLD, 16));
                    textArea.setText(ss.toString());
                } else {
                    showError("Lista goala / Id invalid");
                    textFieldId.setText("");
                }
            }
        });


        ///afiseaza textul dupa un anumit id
        panel_mijloc_matrice.add(panelSusMijloc, BorderLayout.CENTER);
        panel_mijloc_matrice.add(textArea, BorderLayout.CENTER);
        panel_principal.add(panel_mijloc_matrice, BorderLayout.CENTER);


        butonBackPage1 = new JButton("Back Page");
        butonBackPage1.setBackground(Color.RED);
        panel_principal.add(butonBackPage1, BorderLayout.PAGE_END);
        butonBackPage1.addActionListener(new ActionListener() {

            @Override
            public void actionPerformed(ActionEvent e) {
                loc_cur = 1;
                getContentPane().removeAll();
                interfata_meniu_principal();
                revalidate();
                repaint();
            }
        });

        this.add(panel_principal);
        this.setVisible(true);
    }


    /// pana aici partea de 5
    ///
    ///
    ///
    /// de aici partea de 10

    private void interfataAssignTaskToEmployee() {
        JPanel panel_principal = new JPanel();
        panel_principal.setLayout(new BorderLayout());

        JLabel label_text = new JLabel("Assign Task to Employee");
        label_text.setFont(new Font("Arial", Font.BOLD, 22));

        JPanel panel_label_text = new JPanel();
        panel_label_text.add(label_text, CENTER_ALIGNMENT);
        panel_principal.add(panel_label_text, BorderLayout.PAGE_START);

        JLabel matriceButoane_principala = new JLabel();
        matriceButoane_principala.setBackground(new Color(140, 252, 43));
        matriceButoane_principala.setLayout(new GridLayout(3, 1));

        JLabel matriceButoane = new JLabel();
        matriceButoane.setBackground(new Color(238, 232, 170));
        matriceButoane.setLayout(new GridLayout(6, 2));
        matriceButoane_principala.add(matriceButoane, CENTER_ALIGNMENT);
        panel_principal.add(matriceButoane_principala, BorderLayout.CENTER);

        JTextField textFieldId = new JTextField("");
        JTextField textFieldName = new JTextField("Uncompleted / Completed");
        JTextField textFieldStart = new JTextField("");
        JTextField textFieldEnd = new JTextField("");

        matriceButoane.add(new JLabel("IdTask :"), CENTER_ALIGNMENT);
        matriceButoane.add(textFieldId);
        matriceButoane.add(new JLabel("Status Task :"), CENTER_ALIGNMENT);
        matriceButoane.add(textFieldName);
        matriceButoane.add(new JLabel("Start Hour :"));
        matriceButoane.add(textFieldStart);
        matriceButoane.add(new JLabel("End Hour :"));
        matriceButoane.add(textFieldEnd);

        JPanel panelButonInsert = new JPanel();
        panelButonInsert.setLayout(new FlowLayout());


        ///Partea de jos a taskului cu zona de employeee
        JTextField textIdEmployee = new JTextField();

        JPanel panelEmployeeZona = new JPanel();
        panelEmployeeZona.setLayout(new GridLayout(3, 4));
        panelEmployeeZona.add(new JLabel(""));

        panelEmployeeZona.add(new JLabel("Id Employee"));
        panelEmployeeZona.add(textIdEmployee);

        panelEmployeeZona.add(new JLabel(""));
        panelEmployeeZona.add(new JLabel(""));
        panelEmployeeZona.add(new JLabel(""));
        panelEmployeeZona.add(new JLabel(""));
        panelEmployeeZona.add(new JLabel(""));
        panelEmployeeZona.add(new JLabel(""));
        panelEmployeeZona.add(new JLabel(""));
        panelEmployeeZona.add(new JLabel(""));
        panelEmployeeZona.add(new JLabel(""));

        matriceButoane_principala.add(panelEmployeeZona, CENTER_ALIGNMENT);


        ///BUTON ASSIGN TASK
        butonAddTaskST = new JButton("Assign Task");
        butonAddTaskST.setBackground(new Color(140, 252, 43));
        butonAddTaskST.addActionListener(e -> {

            String status;
            int id, start, end, idEmployee;

            try {
                status = textFieldName.getText();
                id = Integer.parseInt(textFieldId.getText());
                if (!status.equals("Completed") && !status.equals("Uncompleted")) {
                    throw new Exception();
                }
                start = Integer.parseInt(textFieldStart.getText());
                end = Integer.parseInt(textFieldEnd.getText());
                idEmployee = Integer.parseInt(textIdEmployee.getText());
            } catch (Exception ex) {
                showError("Parametri greșiți! Reintroduceți corect.");
                textFieldName.setText("Uncompleted / Completed");
                textFieldId.setText("");
                textFieldStart.setText("");
                textFieldEnd.setText("");
                textIdEmployee.setText("");
                return;
            }

            if (contineIdSameT(id)) {
                showError("Id task existent!");

                textFieldName.setText("Uncompleted / Completed");
                textFieldId.setText("");
                textFieldStart.setText("");
                textFieldEnd.setText("");
                textIdEmployee.setText("");
                return;
            }

            if (!contineEmpId(idEmployee)) {
                showError("Id Employee invalid");

                textFieldName.setText("Uncompleted / Completed");
                textFieldId.setText("");
                textFieldStart.setText("");
                textFieldEnd.setText("");
                textIdEmployee.setText("");

                return;
            }

            Task tsk = new SimpleTask(start, end, id, status);
            task.add(tsk);
            taskManagement.assignTaskEmployee(idEmployee, tsk);
            try {
                serializationOperations.StocareTaskManagement(taskManagement);
            } catch (IOException ex) {
                showError("Eroare la salvare!");
                return;
            }

            textFieldName.setText("Uncompleted / Completed");
            textFieldId.setText("");
            textFieldStart.setText("");
            textFieldEnd.setText("");
            textIdEmployee.setText("");

            System.out.println("Task asignat: " + tsk + " la Employee " + idEmployee);
        });


        panelButonInsert.add(butonAddTaskST);
        matriceButoane_principala.add(panelButonInsert, CENTER_ALIGNMENT);


        ///BUTTON BACK
        butonBackPage1 = new JButton("Back Page");
        butonBackPage1.setBackground(Color.RED);
        butonBackPage1.addActionListener(e -> {
            loc_cur = 6;
            getContentPane().removeAll();
            paginaIntermediara();
            revalidate();
            repaint();
        });

        panel_principal.add(butonBackPage1, BorderLayout.PAGE_END);
        this.add(panel_principal);
        this.setVisible(true);
    }

    private void paginaIntermediara() {
        JPanel panel_principal = new JPanel();
        panel_principal.setLayout(new BorderLayout());

        JLabel label_text = new JLabel("Choose an Option", SwingConstants.CENTER);
        label_text.setFont(new Font("Arial", Font.BOLD, 22));
        panel_principal.add(label_text, BorderLayout.PAGE_START);

        JPanel panel_buttons = new JPanel();
        panel_buttons.setLayout(new GridLayout(2, 1, 10, 10));

        JButton buttonAssignTask = new JButton("Assign Task");
        JButton buttonAssignNewTask = new JButton("Assign new Task");

        buttonAssignTask.setFont(new Font("Arial", Font.BOLD, 18));
        buttonAssignNewTask.setFont(new Font("Arial", Font.BOLD, 18));

        panel_buttons.add(buttonAssignTask);
        panel_buttons.add(buttonAssignNewTask);

        panel_principal.add(panel_buttons, BorderLayout.CENTER);

        // Butonul pentru Assign Task (deschide interfataAssignTaskToEmployeeNOTNEW)
        buttonAssignTask.addActionListener(e -> {
            getContentPane().removeAll();
            interfataAssignTaskToEmployeeNOTNEW();
            revalidate();
            repaint();
        });

        // Butonul pentru Assign new Task (apelează interfataAssignTaskToEmployee)
        buttonAssignNewTask.addActionListener(e -> {
            getContentPane().removeAll();
            interfataAssignTaskToEmployee();
            revalidate();
            repaint();
        });

        // Buton de back
        butonBackPage1 = new JButton("Back Page");
        butonBackPage1.setBackground(Color.RED);
        butonBackPage1.addActionListener(e -> {
            loc_cur = 1;
            getContentPane().removeAll();
            interfata_meniu_principal();
            revalidate();
            repaint();
        });

        panel_principal.add(butonBackPage1, BorderLayout.PAGE_END);

        this.add(panel_principal);
        this.setVisible(true);
    }

    private void interfataAssignTaskToEmployeeNOTNEW() {
        JPanel panel_principal = new JPanel();
        panel_principal.setLayout(new BorderLayout());

        JLabel label_text = new JLabel("Assign Existing Task to Employee", SwingConstants.CENTER);
        label_text.setFont(new Font("Arial", Font.BOLD, 18));
        panel_principal.add(label_text, BorderLayout.PAGE_START);

        JPanel panel_suport2Parti = new JPanel();
        JPanel panel_suport = new JPanel();
        panel_suport.setLayout(new GridLayout(2, 4, 5, 5));
        panel_suport2Parti.setLayout(new GridLayout(2, 1));

        JLabel labelIdTask = new JLabel("Id Task:", SwingConstants.RIGHT);
        JLabel labelIdEmployee = new JLabel("Id Employee:", SwingConstants.RIGHT);

        JTextField textFieldIdTask = new JTextField();
        JTextField textFieldIdEmployee = new JTextField();

        labelIdTask.setFont(new Font("Arial", Font.PLAIN, 14));
        labelIdEmployee.setFont(new Font("Arial", Font.PLAIN, 14));

        textFieldIdTask.setFont(new Font("Arial", Font.PLAIN, 14));
        textFieldIdEmployee.setFont(new Font("Arial", Font.PLAIN, 14));

        panel_suport.add(new JLabel(""));
        panel_suport.add(labelIdTask);
        JLabel labelMijlocText = new JLabel("", SwingConstants.RIGHT);
        labelMijlocText.setLayout(new GridLayout(3, 1));
        labelMijlocText.add(new JLabel(""));
        labelMijlocText.add(textFieldIdTask);
        labelMijlocText.add(new JLabel(""));
        panel_suport.add(labelMijlocText);
        panel_suport.add(new JLabel(""));

        panel_suport.add(new JLabel(""));
        panel_suport.add(labelIdEmployee);
        JLabel labelMijlocText1 = new JLabel("", SwingConstants.RIGHT);
        labelMijlocText1.setLayout(new GridLayout(3, 1));
        labelMijlocText1.add(new JLabel(""));
        labelMijlocText1.add(textFieldIdEmployee);
        labelMijlocText1.add(new JLabel(""));
        panel_suport.add(labelMijlocText1);
        panel_suport.add(new JLabel(""));

        panel_suport2Parti.add(panel_suport);


        panel_principal.add(panel_suport2Parti, BorderLayout.CENTER);

        JPanel panelButoane = new JPanel();
        panelButoane.setLayout(new GridLayout(3, 3));

        panel_suport2Parti.add(panelButoane);


        JButton butonInsereaza = new JButton("Insert");
        butonInsereaza.setBackground(new Color(140, 252, 43));
        butonInsereaza.addActionListener(e -> {
            int idTask, idEmployee;

            try {
                idTask = Integer.parseInt(textFieldIdTask.getText());
                idEmployee = Integer.parseInt(textFieldIdEmployee.getText());
            } catch (Exception ex) {
                showError("Parametri greșiți! Reintroduceți corect.");
                textFieldIdTask.setText("");
                textFieldIdEmployee.setText("");
                return;
            }

            if (!contineIdSameT(idTask)) {
                showError("Id Task inexistent!");
                textFieldIdTask.setText("");
                textFieldIdEmployee.setText("");
                return;
            }

            if (!contineEmpId(idEmployee)) {
                showError("Id Employee invalid!");
                textFieldIdTask.setText("");
                textFieldIdEmployee.setText("");
                return;
            }

            Task tsk = getTaskById(idTask);
            taskManagement.assignTaskEmployee(idEmployee, tsk);

            try {
                serializationOperations.StocareTaskManagement(taskManagement);
            } catch (IOException ex) {
                showError("Eroare la salvare!");
                return;
            }

            textFieldIdTask.setText("");
            textFieldIdEmployee.setText("");
            System.out.println("Task " + idTask + " asignat la Employee " + idEmployee);
        });

        panelButoane.add(new JLabel(""));
        panelButoane.add(new JLabel(""));
        panelButoane.add(new JLabel(""));
        panelButoane.add(new JLabel(""));
        panelButoane.add(butonInsereaza);
        panelButoane.add(new JLabel(""));
        panelButoane.add(new JLabel(""));
        panelButoane.add(new JLabel(""));
        panelButoane.add(new JLabel(""));




        /// Buton Back
        JButton butonBack = new JButton("Back Page");
        butonBack.setBackground(Color.RED);
        butonBack.addActionListener(e -> {
            getContentPane().removeAll();
            paginaIntermediara();
            revalidate();
            repaint();
        });

        panel_principal.add(butonBack, BorderLayout.PAGE_END);

        this.add(panel_principal);
        this.setVisible(true);
    }

    private void interfataViewAssignTaskToEmployee() {
        JPanel panel_principal = new JPanel();
        JPanel panel_mijloc_matrice = new JPanel();

        panel_principal.setLayout(new BorderLayout());

        JLabel label_text = new JLabel("View Assign Task To Employee", SwingConstants.CENTER);
        label_text.setFont(new Font("Arial", Font.BOLD, 22));
        panel_principal.add(label_text, BorderLayout.PAGE_START);

        JTextArea textArea = new JTextArea("Show task list");
        textArea.setBorder(BorderFactory.createLineBorder(Color.BLACK, 4));
        textArea.setFont(new Font("Arial", Font.BOLD, 22));
        textArea.setEditable(false);

        panel_mijloc_matrice.setLayout(new GridLayout(2, 1));


        JPanel panelSusMijloc = new JPanel();
        panelSusMijloc.setLayout(new FlowLayout());

        ///cu ajutorul butonului caut in lista de date
        btnafiseazaTaskId = new JButton("Searched id:");
        JTextField textFieldId = new JTextField("");
        JPanel panelButonCauta = new JPanel();

        panelButonCauta.setLayout(new GridLayout(5, 2));
        panelButonCauta.add(new JLabel(""));
        panelButonCauta.add(new JLabel(""));
        panelButonCauta.add(new JLabel(""));
        panelButonCauta.add(new JLabel(""));
        panelButonCauta.add(btnafiseazaTaskId);
        panelButonCauta.add(textFieldId);
        panelButonCauta.add(new JLabel(""));
        panelButonCauta.add(new JLabel(""));
        panelButonCauta.add(new JLabel(""));
        panelButonCauta.add(new JLabel(""));

        panelSusMijloc.add(panelButonCauta, CENTER_ALIGNMENT);


        btnafiseazaTaskId.addActionListener(new ActionListener() {

            @Override
            public void actionPerformed(ActionEvent e) {
                List<Task> taskList = new ArrayList<>();
                Integer id;
                try {
                    id = Integer.valueOf(textFieldId.getText());
                } catch (Exception ex) {
                    showError("Parametri gresiti!");

                    textFieldId.setText("");
                    return;
                }

//                try {
//                    taskManagement = serializationOperations.CitireTaskManagement();
//                } catch (IOException ex) {
//                    throw new RuntimeException(ex);
//                } catch (ClassNotFoundException ex) {
//                    throw new RuntimeException(ex);
//                }

                if (taskManagement.getTaskByEmployeeId(id) != null) {

                    textFieldId.setText("");
                    textArea.setFont(new Font("Arial", Font.BOLD, 14));
                    textArea.setText("");

                    String ss = new String("");
                    ArrayList<Task> lista = (ArrayList<Task>) taskManagement.getTaskByEmployeeId(id);

                    for (Task task : lista) {
                        ss = "Name: " + taskManagement.getEmployeeById(id).getName() + " / Id: " + task.getIdTask() + " / Status: " + task.getStatusTask() +
                                " / Duration: " + task.estimateDuration() + System.lineSeparator();
                        textArea.append(ss);
                        System.out.println(ss);
                    }
                } else {
                    showError("Lista goala / Id invalid");
                    textFieldId.setText("");
                    textArea.setText("");
                }
            }
        });


        ///afiseaza textul dupa un anumit id
        panel_mijloc_matrice.add(panelSusMijloc, BorderLayout.CENTER);
        panel_mijloc_matrice.add(textArea, BorderLayout.CENTER);
        panel_principal.add(panel_mijloc_matrice, BorderLayout.CENTER);


        butonBackPage1 = new JButton("Back Page");
        butonBackPage1.setBackground(Color.RED);
        panel_principal.add(butonBackPage1, BorderLayout.PAGE_END);
        butonBackPage1.addActionListener(new ActionListener() {

            @Override
            public void actionPerformed(ActionEvent e) {
                loc_cur = 1;
                getContentPane().removeAll();
                interfata_meniu_principal();
                revalidate();
                repaint();
            }
        });

        this.add(panel_principal);
        this.setVisible(true);
    }

    private void interfataEmployeeWorkDuration() {
        JPanel panel_principal = new JPanel();
        JPanel panel_mijloc_matrice = new JPanel();

        panel_principal.setLayout(new BorderLayout());

        JLabel label_text = new JLabel("Employee Work Duration", SwingConstants.CENTER);
        label_text.setFont(new Font("Arial", Font.BOLD, 22));
        panel_principal.add(label_text, BorderLayout.PAGE_START);

        JTextArea textArea = new JTextArea("Working hour");
        textArea.setBorder(BorderFactory.createLineBorder(Color.BLACK, 4));
        textArea.setFont(new Font("Arial", Font.BOLD, 22));
        textArea.setEditable(false);

        panel_mijloc_matrice.setLayout(new GridLayout(2, 1));


        JPanel panelSusMijloc = new JPanel();
        panelSusMijloc.setLayout(new FlowLayout());

        ///cu ajutorul butonului caut in lista de date
        btnafiseazaTaskId = new JButton("Search id:");
        JTextField textFieldId = new JTextField("");
        JPanel panelButonCauta = new JPanel();

        panelButonCauta.setLayout(new GridLayout(5, 2));
        panelButonCauta.add(new JLabel(""));
        panelButonCauta.add(new JLabel(""));
        panelButonCauta.add(new JLabel(""));
        panelButonCauta.add(new JLabel(""));
        panelButonCauta.add(btnafiseazaTaskId);
        panelButonCauta.add(textFieldId);
        panelButonCauta.add(new JLabel(""));
        panelButonCauta.add(new JLabel(""));
        panelButonCauta.add(new JLabel(""));
        panelButonCauta.add(new JLabel(""));

        panelSusMijloc.add(panelButonCauta, CENTER_ALIGNMENT);


        btnafiseazaTaskId.addActionListener(new ActionListener() {

            @Override
            public void actionPerformed(ActionEvent e) {
                List<Task> taskList = new ArrayList<>();
                Integer id;
                try {
                    id = Integer.valueOf(textFieldId.getText());
                } catch (Exception ex) {
                    showError("Parametri gresiti!");

                    textFieldId.setText("");
                    return;
                }

                if (taskManagement.getTaskByEmployeeId(id) != null) {

                    textFieldId.setText("");
                    textArea.setFont(new Font("Arial", Font.BOLD, 20));
                    textArea.setText("");

                    String ss = taskManagement.calculateEmployeeWorkDuration(id) + " hour work!";
                    textArea.setText(ss);
                    System.out.println(ss);

                } else {
                    showError("Lista goala / Id invalid");
                    textFieldId.setText("");
                    textArea.setText("");
                }
            }
        });


        ///afiseaza textul dupa un anumit id
        panel_mijloc_matrice.add(panelSusMijloc, BorderLayout.CENTER);
        panel_mijloc_matrice.add(textArea, BorderLayout.CENTER);
        panel_principal.add(panel_mijloc_matrice, BorderLayout.CENTER);


        butonBackPage1 = new JButton("Back Page");
        butonBackPage1.setBackground(Color.RED);
        panel_principal.add(butonBackPage1, BorderLayout.PAGE_END);
        butonBackPage1.addActionListener(new ActionListener() {

            @Override
            public void actionPerformed(ActionEvent e) {
                loc_cur = 1;
                getContentPane().removeAll();
                interfata_meniu_principal();
                revalidate();
                repaint();
            }
        });

        this.add(panel_principal);
        this.setVisible(true);
    }

    private void interfataModifyTaskStatus() {
        JPanel panel_principal = new JPanel();
        JPanel panel_mijloc_matrice = new JPanel();

        panel_principal.setLayout(new BorderLayout());

        JLabel label_text = new JLabel("Modify Status Task by Id", SwingConstants.CENTER);
        label_text.setFont(new Font("Arial", Font.BOLD, 22));
        panel_principal.add(label_text, BorderLayout.PAGE_START);

        JTextArea textArea = new JTextArea("");
        textArea.setBorder(BorderFactory.createLineBorder(Color.BLACK, 4));
        textArea.setFont(new Font("Arial", Font.BOLD, 22));
        textArea.setEditable(false);

        panel_mijloc_matrice.setLayout(new GridLayout(2, 1));


        JPanel panelSusMijloc = new JPanel();
        panelSusMijloc.setLayout(new GridLayout(2, 1));

        ///cu ajutorul butonului caut in lista de date
        btnafiseazaTaskId = new JButton("Modify status");
        JTextField textFieldIdTask = new JTextField("");
        JTextField textFieldIdEmployee = new JTextField("");

        JPanel panelButonCauta = new JPanel();

        panelButonCauta.setLayout(new GridLayout(1, 4));
        panelButonCauta.add(new JLabel("Id Employee"));
        JPanel newSpatiu1 = new JPanel(new GridLayout(3, 0));
        newSpatiu1.add(new JLabel(""));
        newSpatiu1.add(textFieldIdEmployee);
        newSpatiu1.add(new JLabel(""));
        panelButonCauta.add(newSpatiu1);
        panelButonCauta.add(new JLabel("Id Task"));
        JPanel newSpatiu2 = new JPanel(new GridLayout(3, 0));
        newSpatiu2.add(new JLabel(""));
        newSpatiu2.add(textFieldIdTask);
        newSpatiu2.add(new JLabel(""));
        panelButonCauta.add(newSpatiu2);

        panelSusMijloc.add(panelButonCauta, CENTER_ALIGNMENT);

        JPanel panelButonMijlocSus = new JPanel();
        panelButonMijlocSus.setLayout(new GridLayout(1, 3));
        panelButonMijlocSus.add(new JLabel(""));
        panelButonMijlocSus.add(btnafiseazaTaskId);
        panelButonMijlocSus.add(new JLabel(""));

        panelSusMijloc.add(panelButonMijlocSus, CENTER_ALIGNMENT);

        btnafiseazaTaskId.addActionListener(new ActionListener() {

            @Override
            public void actionPerformed(ActionEvent e) {
                List<Task> taskList = new ArrayList<>();
                Integer idT;
                Integer idE;
                try {
                    idT = Integer.valueOf(textFieldIdTask.getText());
                    idE = Integer.valueOf(textFieldIdEmployee.getText());
                } catch (Exception ex) {
                    showError("Parametri gresiti!");

                    textFieldIdTask.setText("");
                    textFieldIdEmployee.setText("");
                    return;
                }

                if (taskManagement.existTaskByIdEmp(idE, idT)) {

                    textFieldIdTask.setText("");
                    textFieldIdEmployee.setText("");
                    textArea.setFont(new Font("Arial", Font.BOLD, 20));
                    textArea.setText("");

                    taskManagement.modifyTaskStatus(idE, idT);

                    try {
                        serializationOperations.StocareTaskManagement(taskManagement);
                    } catch (IOException ex) {
                        showError("Eroare la salvare!");
                        return;
                    }

                    String ss = "Succesfuly";
                    textArea.setText(ss);
                    System.out.println(ss);

                } else {
                    showError("Lista goala / Id invalid");
                    textFieldIdTask.setText("");
                    textFieldIdEmployee.setText("");
                    String ss = "Unsuccesfuly";
                    textArea.setText(ss);
                }
            }
        });


        ///afiseaza textul dupa un anumit id
        panel_mijloc_matrice.add(panelSusMijloc, BorderLayout.CENTER);
        panel_mijloc_matrice.add(textArea, BorderLayout.CENTER);
        panel_principal.add(panel_mijloc_matrice, BorderLayout.CENTER);


        butonBackPage1 = new JButton("Back Page");
        butonBackPage1.setBackground(Color.RED);
        panel_principal.add(butonBackPage1, BorderLayout.PAGE_END);
        butonBackPage1.addActionListener(new ActionListener() {

            @Override
            public void actionPerformed(ActionEvent e) {
                loc_cur = 1;
                getContentPane().removeAll();
                interfata_meniu_principal();
                revalidate();
                repaint();
            }
        });

        this.add(panel_principal);
        this.setVisible(true);
    }

    private void interfataShowEmployee() {
        JPanel panel_principal = new JPanel();

        panel_principal.setLayout(new BorderLayout());

        JLabel label_text = new JLabel("Show Employee Rank", SwingConstants.CENTER);
        label_text.setFont(new Font("Arial", Font.BOLD, 22));
        panel_principal.add(label_text, BorderLayout.PAGE_START);

        JTextArea textArea = new JTextArea("");
        textArea.setBorder(BorderFactory.createLineBorder(Color.BLACK, 4));
        textArea.setFont(new Font("Arial", Font.BOLD, 22));
        textArea.setEditable(false);

        utility = new Utility(taskManagement);
        textArea.setText(utility.sortEmployee());

        ///afiseaza textul dupa un anumit id
        panel_principal.add(textArea, BorderLayout.CENTER);


        butonBackPage1 = new JButton("Back Page");
        butonBackPage1.setBackground(Color.RED);
        panel_principal.add(butonBackPage1, BorderLayout.PAGE_END);
        butonBackPage1.addActionListener(new ActionListener() {

            @Override
            public void actionPerformed(ActionEvent e) {
                loc_cur = 1;
                getContentPane().removeAll();
                interfata_meniu_principal();
                revalidate();
                repaint();
            }
        });

        this.add(panel_principal);
        this.setVisible(true);
    }

    private void interfataShowEmployeeDetails() {
        JPanel panel_principal = new JPanel();

        panel_principal.setLayout(new BorderLayout());

        JLabel label_text = new JLabel("Show Employee Status", SwingConstants.CENTER);
        label_text.setFont(new Font("Arial", Font.BOLD, 22));
        panel_principal.add(label_text, BorderLayout.PAGE_START);

        JTextArea textArea = new JTextArea("");
        textArea.setBorder(BorderFactory.createLineBorder(Color.BLACK, 4));
        textArea.setFont(new Font("Arial", Font.BOLD, 22));
        textArea.setEditable(false);

        panel_principal.add(textArea, BorderLayout.CENTER);

        ///textArea
        utility = new Utility(taskManagement);
        Map<String, Map<String, Integer>> prelucrare = utility.getCompletedUncompletedTask();
        String ss = "";
        for(String nume : prelucrare.keySet()) {
            Map<String, Integer> map = prelucrare.get(nume);
            ss += nume + " " + prelucrare.get(nume) + " " + "\n";
        }
        textArea.setText(ss);

        butonBackPage1 = new JButton("Back Page");
        butonBackPage1.setBackground(Color.RED);
        panel_principal.add(butonBackPage1, BorderLayout.PAGE_END);
        butonBackPage1.addActionListener(new ActionListener() {

            @Override
            public void actionPerformed(ActionEvent e) {
                loc_cur = 1;
                getContentPane().removeAll();
                interfata_meniu_principal();
                revalidate();
                repaint();
            }
        });

        this.add(panel_principal);
        this.setVisible(true);
    }


    /// meniu principal
    private void interfata_meniu_principal() {
        JPanel panel_principal = new JPanel();

        panel_principal.setLayout(new BorderLayout());

        JLabel label_text = new JLabel("Pagina principala");
        label_text.setFont(new Font("Arial", Font.BOLD, 22));
        JPanel panel_label_text = new JPanel();
        panel_label_text.add(label_text, CENTER_ALIGNMENT);

        panel_principal.add(panel_label_text, BorderLayout.PAGE_START);

        JLabel matriceButoane = new JLabel();
        matriceButoane.setBackground(new Color(238, 232, 170));
        matriceButoane.setLayout(new GridLayout(5, 2));

        panel_principal.add(matriceButoane, BorderLayout.CENTER);

        butonAddEmployee = new JButton("Add Employee");
        butonAddEmployee.setBackground(new Color(140, 252, 43));
        butonAddEmployee.addActionListener(new ActionListener() {

            @Override
            public void actionPerformed(ActionEvent e) {
                loc_cur = 2; ///caz pt afisare interfata
                getContentPane().removeAll();
                interfataInsertEmployee();
                revalidate();
                repaint();
            }
        });
        matriceButoane.add(butonAddEmployee);

        butonViewEmployee = new JButton("View Employee");
        butonViewEmployee.setBackground(new Color(140, 252, 43));
        butonViewEmployee.addActionListener(new ActionListener() {

            @Override
            public void actionPerformed(ActionEvent e) {
                loc_cur = 3; ///caz pt afisare interfata
                getContentPane().removeAll();
                interfataViewEmployee();
                revalidate();
                repaint();
            }
        });
        matriceButoane.add(butonViewEmployee);

        butonAddTaskST = new JButton("Add Task");
        butonAddTaskST.setBackground(new Color(140, 252, 43));
        butonAddTaskST.addActionListener(new ActionListener() {

            @Override
            public void actionPerformed(ActionEvent e) {
                loc_cur = 4; ///caz pt afisare interfata
                getContentPane().removeAll();
                interfataInsertTask();
                revalidate();
                repaint();
            }
        });
        matriceButoane.add(butonAddTaskST);

        butonViewTask = new JButton("View Task");
        butonViewTask.setBackground(new Color(140, 252, 43));
        butonViewTask.addActionListener(new ActionListener() {

            @Override
            public void actionPerformed(ActionEvent e) {
                loc_cur = 5; ///caz pt afisare interfata
                getContentPane().removeAll();
                interfataViewTask();
                revalidate();
                repaint();
            }
        });
        matriceButoane.add(butonViewTask);


        butonAssignTaskToEmployee = new JButton("Assign Task to Employee");
        butonAssignTaskToEmployee.setBackground(new Color(140, 252, 43));
        butonAssignTaskToEmployee.addActionListener(new ActionListener() {

            @Override
            public void actionPerformed(ActionEvent e) {
                loc_cur = 6; ///caz pt afisare interfata
                getContentPane().removeAll();
                paginaIntermediara();
                revalidate();
                repaint();
            }
        });

        matriceButoane.add(butonAssignTaskToEmployee);

        butonViewAssignTaskToEmployee = new JButton("View Assign Task to Employee");
        butonViewAssignTaskToEmployee.setBackground(new Color(140, 252, 43));
        butonViewAssignTaskToEmployee.addActionListener(new ActionListener() {

            @Override
            public void actionPerformed(ActionEvent e) {
                loc_cur = 7; ///caz pt afisare interfata
                getContentPane().removeAll();
                interfataViewAssignTaskToEmployee();
                revalidate();
                repaint();
            }
        });

        matriceButoane.add(butonViewAssignTaskToEmployee);

        buttoncalculateEmployeeWorkDuration = new JButton("Calculate Employee work duration");
        buttoncalculateEmployeeWorkDuration.setBackground(new Color(140, 252, 43));
        buttoncalculateEmployeeWorkDuration.addActionListener(new ActionListener() {

            @Override
            public void actionPerformed(ActionEvent e) {
                loc_cur = 8; ///caz pt afisare interfata
                getContentPane().removeAll();
                interfataEmployeeWorkDuration();
                revalidate();
                repaint();
            }
        });

        matriceButoane.add(buttoncalculateEmployeeWorkDuration);

        buttoncmodifyTaskStatus = new JButton("Modify Task Status");
        buttoncmodifyTaskStatus.setBackground(new Color(140, 252, 43));
        buttoncmodifyTaskStatus.addActionListener(new ActionListener() {

            @Override
            public void actionPerformed(ActionEvent e) {
                loc_cur = 9; ///caz pt afisare interfata
                getContentPane().removeAll();
                interfataModifyTaskStatus();
                revalidate();
                repaint();
            }
        });

        matriceButoane.add(buttoncmodifyTaskStatus);

        buttonsortEmployee = new JButton("Sort Employee");
        buttonsortEmployee.setBackground(new Color(140, 252, 43));
        buttonsortEmployee.addActionListener(new ActionListener() {

            @Override
            public void actionPerformed(ActionEvent e) {
                loc_cur = 10; ///caz pt afisare interfata
                getContentPane().removeAll();
                interfataShowEmployee();
                revalidate();
                repaint();
            }
        });

        matriceButoane.add(buttonsortEmployee);

        buttongetCompletedUncompletedTask = new JButton("Completed or Uncompleted Task");
        buttongetCompletedUncompletedTask.setBackground(new Color(140, 252, 43));
        buttongetCompletedUncompletedTask.addActionListener(new ActionListener() {

            @Override
            public void actionPerformed(ActionEvent e) {
                loc_cur = 11; ///caz pt afisare interfata
                getContentPane().removeAll();
                interfataShowEmployeeDetails();
                revalidate();
                repaint();
            }
        });

        matriceButoane.add(buttongetCompletedUncompletedTask);


        this.add(panel_principal);
        this.setVisible(true);
    }

    private void afisare() {
        this.init();
        serializationOperations = new SerializationOperations();
        citireDateFisier();
        utility = new Utility(taskManagement);

        ///background

        ///interfata de logare

        switch (loc_cur) {
            case 0: {
                this.interfataPaginaStart();
                break;
            }
            case 1: {
                this.interfata_meniu_principal();
                break;
            }
            case 2: {
                this.interfataInsertEmployee();
                break;
            }
            case 3: {
                this.interfataViewEmployee();
                break;
            }
            case 4: {
                this.interfataInsertTask();
                break;
            }
            case 5: {
                this.interfataViewTask();
                break;
            }
            case 6: {
                this.paginaIntermediara();
                break;
            }
            case 7: {
                this.interfataViewAssignTaskToEmployee();
                break;
            }
            case 8: {
                this.interfataEmployeeWorkDuration();
                break;
            }
            case 9: {
                this.interfataModifyTaskStatus();
                break;
            }
            case 10: {
                this.interfataShowEmployee();
                break;
            }
            case 11: {
                this.interfataShowEmployeeDetails();
                break;
            }
        }

    }

    public static void main(String[] args) {
        UI userInterface = new UI();

        userInterface.afisare();
    }
}
