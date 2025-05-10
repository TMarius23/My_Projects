package businesslogic;

import model.SelectionPolicy;
import model.Server;
import model.Task;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Scheduler {
    private List<Server> servers;
    private List<Thread> threadList;

    private volatile int maxNoServers;
    private volatile int maxTaskPerServers;
    private volatile Strategy strategy;
    private List<Task> tasks;

    public Scheduler(int maxNoServers, int maxTaskPerServers, SelectionPolicy selectionPolicy) throws InterruptedException {
        servers = Collections.synchronizedList(new ArrayList<>());
        tasks = Collections.synchronizedList(new ArrayList<>());
        threadList = Collections.synchronizedList(new ArrayList<>());

        this.maxNoServers = maxNoServers;
        this.maxTaskPerServers = maxTaskPerServers;
        if (selectionPolicy == SelectionPolicy.SHORTEST_TIME) {
            strategy = new TimeStrategy();
        } else {
            strategy = new ShortestQueueStrategy();
        }

        for (int i = 0; i < maxNoServers; i++) {
            Server server = new Server();
            servers.add(server);
            Thread thread = new Thread(server);
            threadList.add(thread);
            thread.start();
            Thread.sleep(20);
        }

//        if (!threadList.isEmpty()) {
//            for (Thread thread : threadList) {
//                thread.join();
//            }
//       }
    }

    public synchronized void changeStrategy(SelectionPolicy policy) {
        if (policy == SelectionPolicy.SHORTEST_QUEUE) {
            strategy = new ShortestQueueStrategy();
        }
        if (policy == SelectionPolicy.SHORTEST_TIME) {
            strategy = new TimeStrategy();
        }
    }

    public synchronized Server getServerI(int i) {
        return servers.get(i);
    }

    public synchronized int getMaxNoServers() {
        return maxNoServers;
    }

    public synchronized int getMaxTaskOnServerI(int id) {
        return this.servers.get(id).getTasks().size();
    }

    public synchronized void dispatchTask(Task task) {
        tasks.add(task);
        strategy.addTask(servers, task);
    }

    public synchronized Task[] getServerByIdAndListOfTask(int idServer) {
        return this.servers.get(idServer).getTask();
    }

    public synchronized List<Server> getServers() {
        return servers;
    }

    public synchronized Thread getThreadById(int id) {
        return threadList.get(id);
    }

}
