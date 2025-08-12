package datamodel;

import java.io.Serializable;

public class SimpleTask extends Task implements Serializable {

    private int startHour;
    private int endtHour;


    public SimpleTask(int startHour, int endtHour, int idTask, String statusTask) {
        setIdTask(idTask);
        setStatusTask(statusTask);
        this.startHour = startHour;
        this.endtHour = endtHour;
    }

    public SimpleTask() {
        this.startHour = 0;
        this.endtHour = 0;
    }

    public int estimateDuration() {
        return endtHour - startHour;
    }

    public String toString() {
        return "SimpleTask [startHour=" + startHour + ", endtHour=" + endtHour + "]";
    }

}
