package presentation;

import javax.swing.*;
import java.lang.reflect.Field;
import java.util.Arrays;
import java.util.List;
import java.util.stream.IntStream;

public class AbstractView<T> {

    /**
     * Generarea unui tabel unde sunt stocate datele din baza de date
     * @param list
     * @return
     */

    public JTable createTable(List<T> list) {

        if (list.isEmpty()) {
            return new JTable();
        }

        T line1 = list.getFirst();
        Field[] fields = line1.getClass().getDeclaredFields();


        String[] columnNames = Arrays.stream(fields)
                .map(Field::getName)
                .toArray(String[]::new);

//        String[] columnNames = new String[fields.length];
//        for (int i = 0; i < fields.length; i++) {
//            columnNames[i] = fields[i].getName();
//           /// System.out.println(columnNames[i]);
//        }

//        Object[][] data = new Object[list.size()][columnNames.length];
//        for (int i = 0; i < list.size(); i++) {
//            T item = list.get(i);
//            for (int j = 0; j < fields.length; j++) {
//                fields[j].setAccessible(true);
//                try {
//                    data[i][j] = fields[j].get(item);
//                    // System.out.println(data[i][j]);
//
//                } catch (IllegalAccessException e) {
//                    throw new RuntimeException(e);
//                }
//            }
//        }

        Object[][] data = new Object[list.size()][columnNames.length];
        IntStream.range(0, list.size())
                .forEach(e -> {
                    T item = list.get(e);
                    IntStream.range(0, columnNames.length)
                            .forEach(e1 -> {
                                fields[e1].setAccessible(true);
                                try {
                                    Object value = fields[e1].get(item);
                                    data[e][e1] = value;
                                } catch (IllegalAccessException msg) {
                                    msg.printStackTrace();
                                }
                            });
                });

        return new JTable(data, columnNames);
    }

}
