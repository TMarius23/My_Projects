package datamodel;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class ComplexTask extends Task implements Serializable {

    private List<Task> lista = new ArrayList<Task>();

    public ComplexTask(Task task) {
        lista.add(task);
    }

    public ComplexTask() {
        super();
    }

    public ComplexTask(int start, int end, Integer id, String status) {
        setIdTask(id);
        setStatusTask(status);
        Task tsk = new SimpleTask(start, end, id, status);
        lista.add(tsk);
    }

    public List<Task> getLista() {
        return lista;
    }

    @Override
    public int estimateDuration() {
        int s = 0;
        for (Task task : lista) {
            s = s + task.estimateDuration();
        }
        return s;
    }

    public void addTask(Task task) {
        lista.add(task);
    }

    public String toString() {
        String s = "";
        for (Task task : lista) {
            s += task.toString() + "\n";
        }
        return s;
    }

}
