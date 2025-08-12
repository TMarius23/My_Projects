package businesslogic;

import model.Server;
import model.Task;

import java.util.List;

public class TimeStrategy implements Strategy {

    @Override
    public synchronized void addTask(List<Server> servers, Task t) {
        int timeMin = Integer.MAX_VALUE;

        for(Server server : servers) {
            if(server.getWaitingPeriod().intValue() < timeMin) {
                timeMin = server.getWaitingPeriod().intValue();
            }
        }

        for(Server server : servers) {
            if(server.getWaitingPeriod().intValue() == timeMin) {
                server.addTask(t);
                return;
            }
        }
    }
}
