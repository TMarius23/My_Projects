package businesslogic;

import model.Server;
import model.Task;

import java.util.List;

public class ShortestQueueStrategy implements Strategy{


    @Override
    public synchronized void addTask(List<Server> servers, Task t) {
        int nrElemQueue= Integer.MAX_VALUE;

        for(Server server : servers) {
            if(server.getSizeQueue() < nrElemQueue) {
                nrElemQueue = server.getSizeQueue();
            }
        }

        for(Server server : servers) {
            if(server.getSizeQueue() == nrElemQueue) {
                server.addTask(t);
                return;
            }
        }
    }
}
