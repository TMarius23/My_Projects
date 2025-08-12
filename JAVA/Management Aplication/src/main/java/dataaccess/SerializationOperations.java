package dataaccess;

import businesslogic.TaskManagement;
import datamodel.ComplexTask;
import datamodel.Employee;
import datamodel.Task;

import java.io.*;
import java.util.LinkedHashSet;

public class SerializationOperations implements Serializable {

    private static final String FILE_NAME_E = "Employee.txt";
    private static final String FILE_NAME_T = "Task.txt";
    private static final String FILE_NAME_TM = "TaskManagement.txt";

    /// Employee
    public LinkedHashSet<Employee> CitireEmployee() throws IOException, ClassNotFoundException {
        File file = new File(FILE_NAME_E);
        if (!file.exists()) {
            return new LinkedHashSet<>();
        }

        try (FileInputStream fileInputStream = new FileInputStream(FILE_NAME_E);
             ObjectInputStream objectInputStream = new ObjectInputStream(fileInputStream)) {
            Object obj = objectInputStream.readObject();
            if (obj instanceof LinkedHashSet) {
                return (LinkedHashSet<Employee>) obj;
            } else {
                throw new ClassCastException("Fișierul nu conține o listă de Employee.");
            }
        } catch (EOFException e) {
            return new LinkedHashSet<>();
        }
    }

    public void StocareEmployee(Employee employee) throws IOException, ClassNotFoundException {
        LinkedHashSet<Employee> employees = CitireEmployee();
        employees.add(employee);

        try (FileOutputStream fileOutputStream = new FileOutputStream(FILE_NAME_E);
             ObjectOutputStream objectOutputStream = new ObjectOutputStream(fileOutputStream)) {
            objectOutputStream.writeObject(employees);
        }

        System.out.println("Angajat salvat cu succes!");
    }

    /// Task
    private Task getTaskById(int id, LinkedHashSet<Task> task) {
        for (Task ta : task) {
            if (ta.getIdTask() == id) {
                return ta;
            }
        }
        for (Task ta : task) {
            if (ta instanceof ComplexTask) {
                ComplexTask complex = (ComplexTask) ta;
                for (Task t : complex.getLista()) {
                    if (t.getIdTask() == id) {
                        return t;
                    }
                }
            }
        }
        return null;
    }

    public LinkedHashSet<Task> CitireTask() throws IOException, ClassNotFoundException {
        File file = new File(FILE_NAME_T);
        if (!file.exists()) {
            return new LinkedHashSet<>();
        }

        try (FileInputStream fileInputStream = new FileInputStream(FILE_NAME_T);
             ObjectInputStream objectInputStream = new ObjectInputStream(fileInputStream)) {
            Object obj = objectInputStream.readObject();
            if (obj instanceof LinkedHashSet) {
                return (LinkedHashSet<Task>) obj;
            } else {
                throw new ClassCastException("Fișierul nu conține o listă de Task-uri.");
            }
        } catch (EOFException e) {
            return new LinkedHashSet<>();
        }
    }

    public void StocareTask(Task task) throws IOException, ClassNotFoundException {
        LinkedHashSet<Task> tsk = CitireTask();
        if(getTaskById(task.getIdTask(), tsk) == null) {
            tsk.add(task);
        }else{
            tsk.remove(getTaskById(task.getIdTask(), tsk));
            tsk.add(task);
        }

        try (FileOutputStream fileOutputStream = new FileOutputStream(FILE_NAME_T);
             ObjectOutputStream objectOutputStream = new ObjectOutputStream(fileOutputStream)) {
            objectOutputStream.writeObject(tsk);
        }

        System.out.println("Task salvat cu succes!");
    }

    public TaskManagement CitireTaskManagement() throws IOException, ClassNotFoundException {
        File file = new File(FILE_NAME_TM);
        if (!file.exists()) {
            return new TaskManagement();
        }

        try (FileInputStream fileInputStream = new FileInputStream(FILE_NAME_TM);
             ObjectInputStream objectInputStream = new ObjectInputStream(fileInputStream)) {

            Object obj = objectInputStream.readObject();
            if (obj instanceof TaskManagement) {
                return (TaskManagement) obj;
            } else {
                throw new ClassCastException("Fișierul nu conține un obiect TaskManagement.");
            }
        } catch (EOFException e) {
            return new TaskManagement();
        }
    }

    public void StocareTaskManagement(TaskManagement taskManagement) throws IOException {
        try (FileOutputStream fileOutputStream = new FileOutputStream(FILE_NAME_TM);
             ObjectOutputStream objectOutputStream = new ObjectOutputStream(fileOutputStream)) {
            objectOutputStream.writeObject(taskManagement);
        }
        System.out.println("TaskManagement salvat cu succes!");
    }

}
