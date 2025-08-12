package datamodel;

import java.io.Serializable;

public abstract class Task implements Serializable {

    private int idTask;
    private String statusTask;

    public abstract int estimateDuration();

    public int getIdTask() {
        return idTask;
    }

    public void setIdTask(int idTask) {
        this.idTask = idTask;
    }

    public void setStatusTask(String statusTask) {
        this.statusTask = statusTask;
    }
    public String getStatusTask() {
        return statusTask;
    }
}
