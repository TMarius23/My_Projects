package dataaccess;

import connection.ConectionFactory;
import org.jboss.logging.Logger;

import java.beans.IntrospectionException;
import java.beans.PropertyDescriptor;
import java.lang.reflect.*;
import java.sql.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicReference;
import java.util.stream.IntStream;

public class AbstractDAO<T> {

//    protected static final Logger log = Logger.getLogger(AbstractDAO.class);

    private final Class<T> type;

    /**
     * Constructor AbstractDAO cu 1 parametru
     * @param type
     */

    public AbstractDAO(Class<T> type) {
        this.type = type;
    }

    /**
     * OCnstructor AbstractDAO fara parametri
     */

    public AbstractDAO() {
        this.type = (Class<T>) ((ParameterizedType) this.getClass().getGenericSuperclass()).getActualTypeArguments()[0];
    }

    /**
     * Creerea interogarilor pentru a putea accesa baza de date
     * @param field
     * @return
     */

    private String createSelectQuery(String field) {
        StringBuilder query = new StringBuilder();
        query.append("SELECT ");
        query.append("*");
        query.append(" FROM ");
        query.append(type.getSimpleName());
        query.append(" WHERE " + field + " = ?");
        return query.toString();
    }

    /**
     * Creerea interogarilor pentru a putea accesa baza de date
     * @return
     */

    private String createSelectAll() {
        StringBuilder query = new StringBuilder();
        query.append("SELECT ");
        query.append("*");
        query.append(" FROM ");
        query.append(type.getSimpleName());
        return query.toString();
    }

    /**
     * Creerea interogarilor pentru a putea accesa baza de date pentru efectuarea de UPDATE
     * @param t
     * @param f
     * @return
     */

    private String createUpdateQuery(T t, String f) {
        StringBuilder query = new StringBuilder();
        query.append("UPDATE ");
        query.append(t.getClass().getSimpleName());
        query.append(" SET ");
        Field[] fields = t.getClass().getDeclaredFields();
//        for (Field field : fields) {
//            if (field != fields[0]) {
//                field.setAccessible(true);
//                query.append(field.getName());
//                if (field != fields[fields.length - 1]) {
//                    query.append(" = ?, ");
//                }
//            }
//        }
        Arrays.stream(fields).forEach(field -> {
            if (field != fields[0]) {
                field.setAccessible(true);
                query.append(field.getName());
                if (field != fields[fields.length - 1]) {
                    query.append(" = ?, ");
                }
            }
        });

        query.append(" = ?");
        query.append(" WHERE ");
        query.append(f);
        query.append(" = ?");

        return query.toString();
    }

    /**
     * Creerea interogarilor pentru a putea accesa baza de date
     * @param name
     * @param field
     * @return
     */

    private String createUpdate1CriteriaQuery(String name, String field) {
        StringBuilder query = new StringBuilder();
        query.append("UPDATE ");
        query.append(type.getSimpleName());
        query.append(" SET ");
        query.append(name);
        query.append(" = ?");
        query.append(" WHERE ");
        query.append(field);
        query.append(" = ?");

        return query.toString();
    }

    /**
     * Creerea interogarilor pentru a putea accesa baza de date pentru insert fara un id dat
     * @param t
     * @return
     */

    private String createInsertQueryWithoutId(T t) {
        StringBuilder query = new StringBuilder();
        query.append("INSERT INTO ");
        query.append(t.getClass().getSimpleName());
        query.append(" (");
        Field[] fields = t.getClass().getDeclaredFields();
//        for (Field field : fields) {
//            field.setAccessible(true);
//            if (field != fields[0]) {
//                query.append(field.getName());
//                if (field != fields[fields.length - 1]) {
//                    query.append(", ");
//                }
//            }
//        }
        Arrays.stream(fields).forEach(field -> {
            field.setAccessible(true);
            if (field != fields[0]) {
                query.append(field.getName());
                if (field != fields[fields.length - 1]) {
                    query.append(", ");
                }
            }
        });

        query.append(") VALUES (");
//        for (int i = 0; i < fields.length; i++) {
//            if (i != 0) {
//                query.append("?");
//                if (i != fields.length - 1) {
//                    query.append(", ");
//                }
//            }
//        }
        IntStream.range(0, fields.length).forEach(i -> {
            if (i != 0) {
                query.append("?");
                if (i != fields.length - 1) {
                    query.append(", ");
                }
            }
        });
        query.append(")");
        return query.toString();
    }

    /**
     * Creerea interogarilor pentru a putea accesa baza de date pentru insert cu un id dat
     * @param t
     * @return
     */

    private String createInsertQueryWithId(T t) {
        StringBuilder query = new StringBuilder();
        query.append("INSERT INTO `");
        query.append(t.getClass().getSimpleName());
        query.append("` (");
        Field[] fields = t.getClass().getDeclaredFields();
//        for (Field field : fields) {
//            field.setAccessible(true);
//            query.append(field.getName());
//            if (field != fields[fields.length - 1]) {
//                query.append(", ");
//            }
//        }
        Arrays.stream(fields).forEach(field -> {
            field.setAccessible(true);
            query.append(field.getName());
            if (field != fields[fields.length - 1]) {
                query.append(", ");
            }
        });

        query.append(") VALUES (");
//        for (int i = 0; i < fields.length; i++) {
//            query.append("?");
//            if (i != fields.length - 1) {
//                query.append(", ");
//            }
//        }
        IntStream.range(0, fields.length).forEach(i -> {
            query.append("?");
            if (i != fields.length - 1) {
                query.append(", ");
            }
        });
        query.append(")");
        return query.toString();
    }

    /**
     * Creerea interogarilor pentru a putea accesa baza de date
     * @param field1
     * @param field2
     * @return
     */

    private String createSelectQueryBy2Criteria(String field1, String field2) {
        StringBuilder query = new StringBuilder();
        query.append("SELECT ");
        query.append("*");
        query.append(" FROM ");
        query.append(type.getSimpleName());
        query.append(" WHERE " + field1 + " = ? and " + field2 + " = ?");
        return query.toString();
    }

    /**
     * Creerea interogarilor pentru a putea accesa baza de date pentru select cu 2 criterii
     * @param field1
     * @param field2
     * @return
     */

    private String createDeleteQueryBy2Criteria(String field1, String field2) {
        StringBuilder query = new StringBuilder();
        query.append("DELETE FROM ");
        query.append(type.getSimpleName());
        query.append(" WHERE " + field1 + " = ? and " + field2 + " = ?");
        return query.toString();
    }

    /**
     * Functia propriuzisa pentru inserare fara id
     * @param t
     * @return
     */

    public T insertwithoutId(T t) {
        Connection connection = null;
        PreparedStatement preparedStatement = null;
        String query = createInsertQueryWithoutId(t);
        System.out.println(query);
        try {
            connection = ConectionFactory.getConnection();
            preparedStatement = connection.prepareStatement(query, Statement.RETURN_GENERATED_KEYS);

            Field[] fields = t.getClass().getDeclaredFields();
            AtomicInteger i = new AtomicInteger(1);
//            for (Field field : fields) {
//                if (field != fields[0]) {
//                    i++;
//                    field.setAccessible(true);
//                    Object value = field.get(t);
//                    System.out.println(value);
//                    if (value instanceof Integer)
//                        preparedStatement.setInt(i, (Integer) value);
//                    else if (value instanceof String)
//                        preparedStatement.setString(i, (String) value);
//                    else if (value instanceof Date) {
//                        preparedStatement.setTimestamp(i, (Timestamp) value);
//                    } else {
//                        preparedStatement.setObject(i, value);
//                    }
//                }
//            }

            PreparedStatement finalPreparedStatement = preparedStatement;
            Arrays.stream(fields)
                    .skip(1)
                    .forEach(field -> {
                        try {
                            field.setAccessible(true);
                            Object value = field.get(t);
                            System.out.println(value);
                            if (value instanceof Integer)
                                finalPreparedStatement.setInt(i.getAndIncrement(), (Integer) value);
                            else if (value instanceof String)
                                finalPreparedStatement.setString(i.getAndIncrement(), (String) value);
                            else if (value instanceof Date) {
                                finalPreparedStatement.setTimestamp(i.getAndIncrement(), (Timestamp) value);
                            } else {
                                finalPreparedStatement.setObject(i.getAndIncrement(), value);
                            }
                        } catch (SQLException | IllegalAccessException e) {
                            throw new RuntimeException(e);
                        }
                    });
            finalPreparedStatement.executeUpdate();

            return t;

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * Functia propriuzisa pentru inserare cu id
     * @param t
     * @return
     */

    public T insertwithId(T t) {
        Connection connection = null;
        PreparedStatement preparedStatement = null;
        String query = createInsertQueryWithId(t);
        System.out.println(query);
        try {
            connection = ConectionFactory.getConnection();
            preparedStatement = connection.prepareStatement(query, Statement.RETURN_GENERATED_KEYS);

            Field[] fields = t.getClass().getDeclaredFields();
            AtomicInteger i = new AtomicInteger(1);
//            for (Field field : fields) {
//                i++;
//                field.setAccessible(true);
//                Object value = field.get(t);
//                System.out.println(value);
//                if (value instanceof Integer)
//                    preparedStatement.setInt(i, (Integer) value);
//                if (value instanceof String)
//                    preparedStatement.setString(i, (String) value);
//                else if (value instanceof Date) {
//                    preparedStatement.setTimestamp(i, (Timestamp) value);
//                } else {
//                    preparedStatement.setObject(i, value);
//                }
//            }
            PreparedStatement finalPreparedStatement = preparedStatement;
            Arrays.stream(fields)
                    .forEach(field -> {
                        try {
                            field.setAccessible(true);
                            Object value = field.get(t);
                            System.out.println(value);
                            if (value instanceof Integer)
                                finalPreparedStatement.setInt(i.getAndIncrement(), (Integer) value);
                            else if (value instanceof String)
                                finalPreparedStatement.setString(i.getAndIncrement(), (String) value);
                            else if (value instanceof Date) {
                                finalPreparedStatement.setTimestamp(i.getAndIncrement(), (Timestamp) value);
                            } else {
                                finalPreparedStatement.setObject(i.getAndIncrement(), value);
                            }
                        } catch (SQLException | IllegalAccessException e) {
                            throw new RuntimeException(e);
                        }
                    });
            preparedStatement.executeUpdate();

            return t;

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * Functia propriuzisa pentru delete dupa id
     * @param t
     * @param id
     * @return
     */

    public T updateDateById(T t, int id) {
        Connection connection = null;
        PreparedStatement preparedStatement = null;
        String query = createUpdateQuery(t, "id");
        System.out.println(query);
        try {
            connection = ConectionFactory.getConnection();
            preparedStatement = connection.prepareStatement(query);

            Field[] fields = t.getClass().getDeclaredFields();
            AtomicInteger i = new AtomicInteger(1);
//            for (Field field : fields) {
//                if (field != fields[0]) {
//                    i++;
//                    field.setAccessible(true);
//                    Object value = field.get(t);
//                    System.out.println(value);
//                    if (value instanceof Integer)
//                        preparedStatement.setInt(i, (Integer) value);
//                    if (value instanceof String)
//                        preparedStatement.setString(i, (String) value);
//                    else if (value instanceof Date) {
//                        preparedStatement.setTimestamp(i, (Timestamp) value);
//                    } else {
//                        preparedStatement.setObject(i, value);
//                    }
//                }
//            }

            PreparedStatement finalPreparedStatement = preparedStatement;
            Arrays.stream(fields)
                    .skip(1)
                    .forEach(field -> {
                        try {
                            field.setAccessible(true);
                            Object value = field.get(t);
                            System.out.println(value);
                            if (value instanceof Integer)
                                finalPreparedStatement.setInt(i.getAndIncrement(), (Integer) value);
                            else if (value instanceof String)
                                finalPreparedStatement.setString(i.getAndIncrement(), (String) value);
                            else if (value instanceof Date) {
                                finalPreparedStatement.setTimestamp(i.getAndIncrement(), (Timestamp) value);
                            } else {
                                finalPreparedStatement.setObject(i.getAndIncrement(), value);
                            }
                        } catch (SQLException | IllegalAccessException e) {
                            throw new RuntimeException(e);
                        }
                    });
            preparedStatement.setInt(i.getAndIncrement(), id);

            int nr = preparedStatement.executeUpdate();
            if (nr > 0) {
                return t;
            }
            return null;

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * Functia propriuzisa pentru update dupa un criteriu
     * @param name
     * @param value
     * @param id
     * @return
     */

    public int update1CriteriaById(String name, String value, int id) {
        Connection connection = null;
        PreparedStatement preparedStatement = null;
        String query = createUpdate1CriteriaQuery(name, "id");
        System.out.println(query);
        try {
            connection = ConectionFactory.getConnection();
            preparedStatement = connection.prepareStatement(query);


            preparedStatement.setString(1, value);
            preparedStatement.setInt(2, id);

            int nr = preparedStatement.executeUpdate();
            if (nr > 0) {
                return 1;
            }
            return 0;

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * Functia de cautare dupa un id dat
     * @param id
     * @return
     */

    public T findById(int id) {
        Connection connection = null;
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;
        String query = createSelectQuery("id");
        System.out.println(query);
        try {
            connection = ConectionFactory.getConnection();
            preparedStatement = connection.prepareStatement(query);
            preparedStatement.setInt(1, id);
            resultSet = preparedStatement.executeQuery();

            return createObjects(resultSet).getFirst();

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * Returnarea unei liste returnate dupa cautarea dupa un criteriu
     * @param field
     * @param value
     * @return
     */

    public List<T> findByCriteria(String field, String value) {
        Connection connection = null;
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;
        String query = createSelectQuery(field);
        System.out.println(query);
        try {
            connection = ConectionFactory.getConnection();
            preparedStatement = connection.prepareStatement(query);
            preparedStatement.setString(1, value);
            resultSet = preparedStatement.executeQuery();

            return createObjects(resultSet);

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * Returnarea unei liste returnate dupa cautarea dupa mai multe criterii
     * @param field1
     * @param field2
     * @param value1
     * @param value2
     * @return
     */

    public List<T> findByCriteria(String field1, String field2, String value1, String value2) {
        Connection connection = null;
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;
        String query = createSelectQueryBy2Criteria(field1, field2);
        System.out.println(query);
        try {
            connection = ConectionFactory.getConnection();
            preparedStatement = connection.prepareStatement(query);
            preparedStatement.setString(1, value1);
            preparedStatement.setString(2, value2);
            resultSet = preparedStatement.executeQuery();

            return createObjects(resultSet);

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * Returnarea unei liste returnate dupa cautarea dupa 2 criterii
     * @param field1
     * @param field2
     * @param value1
     * @param value2
     * @return
     */

    public int deleteBy2Criteria(String field1, String field2, String value1, String value2) {
        Connection connection = null;
        PreparedStatement preparedStatement = null;
        Integer resultSet = 0;
        String query = createDeleteQueryBy2Criteria(field1, field2);
        System.out.println(query);
        try {
            connection = ConectionFactory.getConnection();
            preparedStatement = connection.prepareStatement(query);
            preparedStatement.setString(1, value1);
            preparedStatement.setString(2, value2);
            resultSet = preparedStatement.executeUpdate();

            if (resultSet > 0) {
                return 1;
            }
            return 0;

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }


    /**
     * Convertirea elementelor returnate de baza de date intr-o lista de eemente de tipul respectiv
     * @param resultSet
     * @return
     */
    private List<T> createObjects(ResultSet resultSet) {
        List<T> list = new ArrayList<T>();
        Constructor[] ctors = type.getDeclaredConstructors();
        AtomicReference<Constructor> ctor = new AtomicReference<>();
//        for (int i = 0; i < ctors.length; i++) {
//            ctor = ctors[i];
//            if (ctor.getGenericParameterTypes().length == 0)
//                break;
//        }
        Arrays.stream(ctors)
                .filter(constructor -> constructor.getParameterCount() == 0)
                .findFirst()
                .ifPresent(constructor -> {
                    ctor.set(constructor);
                });


        try {
            while (resultSet.next()) {
                ctor.get().setAccessible(true);
                T instance = (T) ctor.get().newInstance();
//                for (Field field : type.getDeclaredFields()) {
//                    String fieldName = field.getName();
//                    Object value = resultSet.getObject(fieldName);
//                    PropertyDescriptor propertyDescriptor = new PropertyDescriptor(fieldName, type);
//                    Method method = propertyDescriptor.getWriteMethod();
//                    method.invoke(instance, value);
//                }
                Arrays.stream(type.getDeclaredFields()).forEach(field -> {
                    String fieldName = field.getName();
                    Object value = null;
                    try {
                        value = resultSet.getObject(fieldName);
                    } catch (SQLException e) {
                        throw new RuntimeException(e);
                    }
                    PropertyDescriptor propertyDescriptor = null;
                    try {
                        propertyDescriptor = new PropertyDescriptor(fieldName, type);
                    } catch (IntrospectionException e) {
                        throw new RuntimeException(e);
                    }
                    Method method = propertyDescriptor.getWriteMethod();
                    try {
                        method.invoke(instance, value);
                    } catch (IllegalAccessException | InvocationTargetException e) {
                        throw new RuntimeException(e);
                    }
                });

                list.add(instance);
            }
        } catch (InstantiationException | IllegalAccessException | SecurityException | IllegalArgumentException |
                 InvocationTargetException | SQLException e) {
            e.printStackTrace();
        }
        return list;
    }

    /**
     * Returnarea tuturor elementelor din baza de date
     * @return
     */

    public List<T> getAll() {
        Connection connection = null;
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;
        String query = createSelectAll();
        System.out.println(query);
        try {
            connection = ConectionFactory.getConnection();
            preparedStatement = connection.prepareStatement(query);
            resultSet = preparedStatement.executeQuery();

            return createObjects(resultSet);

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

}
