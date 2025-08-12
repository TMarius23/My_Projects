package model;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingDeque;
import java.util.concurrent.atomic.AtomicInteger;

public class Server implements Runnable {

    private BlockingQueue<Task> tasks;
    private AtomicInteger waitingPeriod;
//    private volatile AtomicBoolean runningPeriod = new AtomicBoolean(true);

    public Server(BlockingQueue<Task> tasks, AtomicInteger waitingPeriod) {
        this.tasks = tasks;
        this.waitingPeriod = waitingPeriod;
    }

    public Server(BlockingQueue<Task> tasks) {
        this.tasks = tasks;
        this.waitingPeriod = new AtomicInteger(0);
    }

    public Server() {
        this.tasks = new LinkedBlockingDeque<>();
        this.waitingPeriod = new AtomicInteger(0);
    }

    public synchronized BlockingQueue<Task> getTasks() {
        return tasks;
    }

    public synchronized AtomicInteger getWaitingPeriod() {
        return waitingPeriod;
    }

    public synchronized void addTask(Task task) {
        tasks.add(task);
        waitingPeriod.addAndGet(task.getServiceTime());
    }

    public synchronized Task[] getTask() {
        return tasks.toArray(new Task[tasks.size()]);
    }

    public synchronized Task getFirstTask() {
        if (!tasks.isEmpty()) {
            return tasks.poll();
        }
        return null;
    }

    public synchronized int getSizeQueue() {
        return tasks.size();
    }

    /// average suma la toti initiala / count

    @Override
    public void run() {
        synchronized (this) {
            if (waitingPeriod.get() > 0) {
                waitingPeriod.addAndGet(-1);

                Task t = getFirstTask();
                if (t == null)
                    return;
                if (t.getServiceTime() == 1) {
                    tasks.remove(t);
                } else {
                    List<Task> listaTemporara = new ArrayList<>(tasks);
                    tasks.clear();

                    synchronized (this) {
                        t.setServiceTime(t.getServiceTime() - 1);
                        tasks.add(t);
                        synchronized (this) {
                            for (Task task : listaTemporara) {
                                if (!task.equals(t)) {
                                    tasks.add(task);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
