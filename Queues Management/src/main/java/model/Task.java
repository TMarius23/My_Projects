package model;

public class Task implements Comparable<Task> {

    private volatile int ID;
    private volatile int arrivalTime;
    private volatile int serviceTime;

    public Task(int ID, int arrivalTime, int serviceTime){
        this.ID = ID;
        this.arrivalTime = arrivalTime;
        this.serviceTime = serviceTime;
    }

    public synchronized int getID() {
        return ID;
    }

    public synchronized int getArrivalTime() {
        return arrivalTime;
    }

    public synchronized int getServiceTime() {
        return serviceTime;
    }

    public synchronized void setServiceTime(int serviceTime) {
        this.serviceTime = serviceTime;
    }

    public synchronized String toString() {
        return "ID: " + ID + ", arrivalTime: " + arrivalTime + ", serviceTime: " + serviceTime;
    }

    @Override
    public synchronized boolean equals(Object obj) {
        Task tNew = null;
        if(obj instanceof Task){
            tNew = (Task)obj;
        }

        if(tNew == null){
            return false;
        }else {
            return tNew.getID() == this.ID;
        }
    }

    @Override
    public synchronized int compareTo(Task o) {
        return (this.arrivalTime - o.arrivalTime);
    }
}
