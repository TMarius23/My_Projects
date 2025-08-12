package businesslogic;

import datamodel.Employee;
import datamodel.Task;

import java.io.Serializable;
import java.util.*;

public class Utility implements Serializable {
    private Map<Employee, List<Task>> map;
    private List<Map.Entry<Integer, String>> mapareAfi;


    public Utility(TaskManagement taskManagement) {
        map = taskManagement.getMap();
        mapareAfi = new ArrayList<>();
    }

    public String sortEmployee() {
        mapareAfi.clear();

        for (Map.Entry<Employee, List<Task>> entry : map.entrySet()) {
            int duration = 0;
            Employee employee = entry.getKey();
            List<Task> tasks = entry.getValue();

            for (Task task : tasks) {
                if (task.getStatusTask().equals("Completed")) {
                    duration += task.estimateDuration();
                }
            }

            if (duration > 40) {
                mapareAfi.add(new AbstractMap.SimpleEntry<>(duration, employee.getName()));
                System.out.println(employee.getName());
            }
        }

        String ss = "";
        if (mapareAfi.isEmpty()) {
            ss = "Nobody has more than 40 hours of work!";
            return ss;
        }

        mapareAfi.sort(Comparator.comparingInt(Map.Entry::getKey));

        for (Map.Entry<Integer, String> entry : mapareAfi) {
            ss += entry.getKey() + "h\t" + entry.getValue() + "\n";
            System.out.println(ss);
        }

        return ss;
    }
    public Map<String, Map<String, Integer>> getCompletedUncompletedTask() {
        Map<String, Map<String, Integer>> mapare = new HashMap<>();
        for (Map.Entry<Employee, List<Task>> entry : map.entrySet()) {

            Map<String, Integer> status = new HashMap<>();
            List<Task> tasks = entry.getValue();

            int fin = 0;
            int nefin = 0;
            for (Task task : tasks) {
                if (task.getStatusTask().equals("Completed"))
                    fin += 1;
                else
                    nefin += 1;
            }
            status.put("Completed", fin);
            status.put("Uncompleted", nefin);
            mapare.put(entry.getKey().getName(), status);
        }
        return mapare;
    }

}
