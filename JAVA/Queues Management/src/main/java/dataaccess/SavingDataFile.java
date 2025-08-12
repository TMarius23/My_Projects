package dataaccess;

import businesslogic.Scheduler;
import model.Task;

import java.io.*;
import java.util.List;

public class SavingDataFile {
    private static final String FILE_NAME_E = "log.txt";

    public SavingDataFile() throws IOException {
        BufferedWriter bw = new BufferedWriter(new FileWriter(FILE_NAME_E, false));
        bw.write("");
        bw.close();
    }

    public synchronized void StocareDate(int currentTime, List<Task> tasks, Scheduler scheduler,
                                         int numberOfServers) throws IOException,
                                         ClassNotFoundException {
        BufferedWriter bw = new BufferedWriter(new FileWriter(FILE_NAME_E, true));

        bw.write("Time: " + currentTime + "\n");
        bw.write("Waiting clients: \n");
        for (int i = 0; i < tasks.size(); i++) {
            Task task = tasks.get(i);
            if(i % 20 == 0 && i != 0){
                bw.newLine();
            }
            bw.write("(" + task.getID() + ", " + task.getArrivalTime() + ", " + task.getServiceTime() + ") ");
        }
        bw.newLine();
        for (int j = 0; j < numberOfServers; j++) {
            bw.write("Server " + j);
            if (scheduler.getServerI(j).getSizeQueue() == 0) {
                bw.write(": closed");
            } else {
                bw.write(": ");
                Task tsk[] = scheduler.getServerByIdAndListOfTask(j);
                for (int i = 0; i < scheduler.getMaxTaskOnServerI(j); i++) {
                    bw.write("(" + tsk[i].getID() + ", " + tsk[i].getArrivalTime() + ", " + tsk[i].getServiceTime() + ") ");
                }
            }
            bw.newLine();
        }
        bw.newLine();
        bw.newLine();

        bw.close();
    }


    public synchronized void StocareDateFinale(int peakHour, double averageServiceTime,
                                         double averageWaitingTime) throws IOException {
        BufferedWriter bw = new BufferedWriter(new FileWriter(FILE_NAME_E, true));

        bw.write("Ora de varf: " + peakHour + "\n");
        bw.write("Timp mediu de servire: " + averageServiceTime + "\n");
        bw.write("Timp mediu de asteptare: " + averageWaitingTime + "\n");
        bw.newLine();

        bw.close();
    }

}
