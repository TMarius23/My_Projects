package businesslogic;

import datamodel.Employee;
import datamodel.SimpleTask;
import datamodel.Task;

import java.io.Serializable;
import java.util.*;

public class TaskManagement implements Serializable {

    private Map<Employee, List<Task>> map;

    public TaskManagement() {
        map = new HashMap<>(100);
    }

    public Map<Employee, List<Task>> getMap() {
        return map;
    }

    public List<Task> getTaskByEmploayee(Employee employee) {
        return map.get(employee);
    }

    public void addEmployee(Employee employee) {
        map.put(employee, new ArrayList<>());
    }

    public void addEmployeeList(LinkedHashSet<Employee> employee) {
        for (Employee e : employee) {
            if (!map.containsKey(e)) {
                addEmployee(e);
            }
        }
    }

    public void assignTaskEmployee(int idEmployee, Task task) {
        for (Employee employee : map.keySet()) {
            if (employee.getIdEmployee() == idEmployee) {
                List<Task> lista = map.get(employee);
                lista.add(task);
                map.put(employee, lista);
            }
        }
    }

    public Employee getEmployeeById(int idEmployee) {
        for (Employee employee : map.keySet()) {
            if (employee.getIdEmployee() == idEmployee) {
                return employee;
            }
        }
        return null;
    }

    public List<Task> getTaskByEmployeeId(int idEmployee) {
        for (Employee employee : map.keySet()) {
            if (employee.getIdEmployee() == idEmployee) {
                return getTaskByEmploayee(employee);
            }
        }
        return null;
    }

    public int calculateEmployeeWorkDuration(int idEmployee) {
        int duration = 0;
        here:
        for (Employee employee : map.keySet()) {
            if (employee.getIdEmployee() == idEmployee) {
                ArrayList<Task> tasK = new ArrayList<>(map.get(employee));
                for (Task task : tasK) {
                    if (task.getStatusTask().equals("Completed"))
                        duration += task.estimateDuration();
                }
                break here;
            }
        }
        return duration;
    }

    public void modifyTaskStatus(int idEmployee, int idTask) {
        for (Employee employee : map.keySet()) {
            if (employee.getIdEmployee() == idEmployee) {
                for (Task task : map.get(employee)) {
                    if (task.getIdTask() == idTask) {
                        if (task.getStatusTask().equals("Completed"))
                            task.setStatusTask("Uncompleted");
                        else
                            task.setStatusTask("Completed");
                        return;
                    }
                }
            }
        }
    }

    public boolean existTaskByIdEmp(int idEmployee, int idTask) {
        for (Employee employee : map.keySet()) {
            if (employee.getIdEmployee() == idEmployee) {
                for (Task task : map.get(employee)) {
                    if (task.getIdTask() == idTask) {
                        return true;
                    }
                }
            }
        }
        return false;
    }


}
