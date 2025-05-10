package businesslogic;

import dataaccess.SavingDataFile;
import graficaluserinterface.SimulationFrame;
import model.SelectionPolicy;
import model.Server;
import model.Task;

import javax.swing.*;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

import static java.lang.Math.random;


public class SimulationManager implements Runnable {

    public volatile int timeLimit = 30;//100
    public volatile int minArrivalTime = 5;
    public volatile int maxArrivalTime = 5;

    /// service time
    public volatile int minProcessingTime = 2;
    public volatile int maxProcessingTime = 4;
    public volatile int numberOfServers = 3;
    /// queue thread
    public volatile int numberOfClients = 20;
    ///    public volatile SelectionPolicy selectionPolicy = SelectionPolicy.SHORTEST_TIME;
    public volatile SelectionPolicy selectionPolicy = SelectionPolicy.SHORTEST_QUEUE;

    private volatile Scheduler scheduler;
    private volatile SimulationFrame frame;
    private volatile List<Task> tasks;
    private volatile SavingDataFile savingDataFile;

    private volatile double timpMediuService = 0;
    private volatile double timpMediuAsteptare = 0;
    private volatile int peakHour = 0;
    private volatile int currentTime = 0;

    /// client

    public SimulationManager() throws InterruptedException, IOException {
        scheduler = new Scheduler(numberOfServers, numberOfClients, selectionPolicy);
        tasks = new ArrayList<>();

        savingDataFile = new SavingDataFile();

//        frame = new SimulationFrame();

        for (int i = 0; i < numberOfClients; i++) {
            Task tsk = generateNRandomTask();
            tasks.add(tsk);
//            System.out.println(tsk);
        }
        tasks.sort(Task::compareTo);
        setTimpMediuAsteptare();

//        frame = new SimulationFrame();

    }

    public SimulationManager(int timeLimit, int minArrivalTime, int maxArrivalTime, int minProcessingTime,
                             int maxProcessingTime, int numberOfServers, int numberOfClients,
                             SelectionPolicy selectionPolicy) throws InterruptedException, IOException {

        this.timeLimit = timeLimit;
        this.minArrivalTime = minArrivalTime;
        this.maxArrivalTime = maxArrivalTime;
        this.minProcessingTime = minProcessingTime;
        this.maxProcessingTime = maxProcessingTime;
        this.numberOfServers = numberOfServers;
        this.numberOfClients = numberOfClients;
        this.selectionPolicy = selectionPolicy;
        scheduler = new Scheduler(numberOfServers, numberOfClients, selectionPolicy);
        tasks = new ArrayList<>();
        savingDataFile = new SavingDataFile();
        for (int i = 0; i < numberOfClients; i++) {
            Task tsk = generateNRandomTask();
            tasks.add(tsk);
        }
        tasks.sort(Task::compareTo);
        calculateAverageSimulationTime();
        setTimpMediuAsteptare();
    }

    /// sa nu uitam sa punem metoda de join() pt threduri cand il initializam
    /// metoda sincronized(variabila/iti da el ceva acolo){ce vrei tu aicea}
    /// SAU
    /// AtommicInteger e un obiect + iti ofera metode pt control
    /// E sincronizata

    public SimulationManager(int frameOk) throws InterruptedException, IOException {
        frame = new SimulationFrame(this);
        tasks = new ArrayList<>();
    }

    public synchronized Task generateNRandomTask() {

        boolean verifIf = true;
        int id = 0;
        while (verifIf) {
            id = (int) (random() * numberOfClients + 1);
            int ok = 0;
            for (Task tsk : tasks) {
                if (tsk.getID() == id) {
                    ok = 1;
                }
            }
            if (ok == 0) {
                verifIf = false;
            }
        }

//        int arrivalT = (int) (random() * (timeLimit - maxProcessingTime) + minProcessingTime);
//        int serviceTime = (int) (random() * (maxProcessingTime - 1) + 1);
//        Task tsk = new Task(id, arrivalT, serviceTime);

        int arrivalT = (int) (random() * (maxArrivalTime - minArrivalTime) + minArrivalTime);
        int serviceTime = (int) (random() * (maxProcessingTime - minProcessingTime) + minProcessingTime);
        Task tsk = new Task(id, arrivalT, serviceTime);

        return tsk;
    }

    public synchronized void setFrame(SimulationFrame frame) {
        this.frame = frame;
    }

    private synchronized void calculateAverageSimulationTime() {

        double sum = 0;
        for (Task tsk : tasks) {
            sum += tsk.getServiceTime();
        }
        sum /= tasks.size();
        timpMediuService = sum;
    }

    public synchronized int getpeakHour() {
        return peakHour;
    }

    public synchronized double gettimpMediuService() {
        return timpMediuService;
    }

    public synchronized void setTimpMediuAsteptare() {
        double suma = 0;
        for (int i = 0; i < tasks.size(); i++) {
            suma = suma + tasks.get(i).getArrivalTime();
        }
        timpMediuAsteptare = suma / tasks.size();
    }

    public synchronized double gettimpMediuAsteptare() {
        return timpMediuAsteptare;
    }

    private synchronized void addTaskOnListServer(int currentTime) {
        List<Task> toRemove = new ArrayList<>();
        synchronized (SimulationManager.class) {

            int control = 0;
            List<Server> servere = scheduler.getServers();

            for (int i = 0; i < servere.size(); i++) {
                if (servere.get(i).getSizeQueue() == 0) {
                    control++;
                }
            }

            for (Task task : tasks) {
                if (task.getArrivalTime() == (currentTime + 1)) {

                    if (control >= 1) {
                        task.setServiceTime(task.getServiceTime() + 1);
                        control--;
                    }
                    synchronized (SimulationManager.class) {
                        scheduler.dispatchTask(task);
                        toRemove.add(task);
                    }
                }
            }
            synchronized (SimulationManager.class) {
                tasks.removeAll(toRemove);
            }
        }
    }

    private synchronized void runServers() {
        Thread[] t = new Thread[numberOfServers];

        for (int i = 0; i < scheduler.getMaxNoServers(); i++) {
            synchronized (SimulationManager.class) {
                t[i] = scheduler.getThreadById(i);
                t[i].run();
            }
        }
        for (int i = 0; i < scheduler.getMaxNoServers(); i++) {
            synchronized (SimulationManager.class) {
                t[i] = scheduler.getThreadById(i);
                try {
                    t[i].join();
                } catch (InterruptedException e) {
                    continue;
                }
            }
        }
    }

    private synchronized void refreshFramSimulation(int currentTime) {
        JTextArea textArea = frame.getTextAreaAfisareDate();
        if (textArea == null) {
            textArea = new JTextArea();
        }

        synchronized (SimulationManager.class) {
            textArea.append("Time: " + currentTime + "\n");
            textArea.append("Waiting clients: ");
            for (int i = 0; i < tasks.size(); i++) {
                Task task = tasks.get(i);
                if (i % 20 == 0 && i != 0) {
                    textArea.append("\n");
                }
                textArea.append("(" + task.getID() + ", " + task.getArrivalTime() + ", " + task.getServiceTime() + ") ");
            }
            textArea.append("\n");
            for (int j = 0; j < numberOfServers; j++) {
                textArea.append("Server " + j);
                if (scheduler.getServerI(j).getSizeQueue() == 0) {
                    textArea.append(": closed");
                } else {
                    textArea.append(": ");
                    Task tsk[] = scheduler.getServerByIdAndListOfTask(j);
                    for (int i = 0; i < scheduler.getMaxTaskOnServerI(j); i++) {
                        textArea.append("(" + tsk[i].getID() + ", " + tsk[i].getArrivalTime() + ", " + tsk[i].getServiceTime() + ") ");
                    }
                }
                textArea.append("\n");
            }
            textArea.append("\n");
        }

        frame.setTextAreaAfisareDate(textArea);

    }

    @Override
    public void run() {
        AtomicInteger contorPEakHour = new AtomicInteger(0);
        AtomicInteger contorPEakHourNumar = new AtomicInteger(0);
        AtomicInteger contorPE = new AtomicInteger(0);
        synchronized (SimulationManager.class) {
            while (currentTime <= timeLimit) {
                synchronized (SimulationManager.class) {
                    System.out.println("Time: " + currentTime);
                    System.out.println("Waiting clients: ");
                    for (int i = 0; i < tasks.size(); i++) {
                        Task task = tasks.get(i);
                        if (i % 20 == 0 && i != 0) {
                            System.out.println();
                        }
                        System.out.print("(" + task.getID() + ", " + task.getArrivalTime() + ", " + task.getServiceTime() + ") ");
                    }
                    System.out.println();
                    for (int j = 0; j < numberOfServers; j++) {
                        System.out.print("Server " + j);
                        if (scheduler.getServerI(j).getSizeQueue() == 0) {
                            System.out.print(": closed");
                        } else {
                            System.out.print(": ");
                            Task tsk[] = scheduler.getServerByIdAndListOfTask(j);
                            for (int i = 0; i < scheduler.getMaxTaskOnServerI(j); i++) {
                                System.out.print("(" + tsk[i].getID() + ", " + tsk[i].getArrivalTime() + ", " + tsk[i].getServiceTime() + ") ");
                            }
                        }
                        System.out.println();
                    }
                    System.out.println("\n");
                }

                ///Stocare date in fisier log.txt
                synchronized (SimulationManager.class) {
                    try {
                        savingDataFile.StocareDate(currentTime, tasks, scheduler, numberOfServers);
                    } catch (IOException | ClassNotFoundException e) {
                        throw new RuntimeException(e);
                    }
                }

                refreshFramSimulation(currentTime);

                synchronized (SimulationManager.class) {
                    for(int i = 0; i < scheduler.getMaxNoServers(); i++) {
                        contorPE.addAndGet(scheduler.getServerI(i).getSizeQueue());
                    }
                    if(contorPE.intValue() > contorPEakHour.intValue()) {
                        contorPEakHour.set(contorPE.intValue());
                        contorPEakHourNumar.set(currentTime);
                    }
                    contorPE.set(0);
                }


                ///Add elem to server
                if (!tasks.isEmpty())
                    addTaskOnListServer(currentTime);

                ///Run server
                runServers();


                try {
                    Thread.sleep(900);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
                currentTime++;
            }

            synchronized (SimulationManager.class) {
                peakHour = contorPEakHourNumar.get();
                try {
                    savingDataFile.StocareDateFinale(getpeakHour(), gettimpMediuService(), gettimpMediuAsteptare());
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
                frame.setTextAfisareOraVarf(getpeakHour());
                frame.setTextAfisareTMediuDeServire(gettimpMediuService());
                frame.setgetTextAfisareTMediuDeAsteptare(gettimpMediuAsteptare());
            }
        }
    }

    public static void main(String[] args) throws InterruptedException, IOException {
//        SimulationManager simulationManager = new SimulationManager(1);

    }
}
