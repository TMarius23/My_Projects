package connection;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintStream;
import java.sql.*;
import java.util.logging.Level;
import java.util.logging.Logger;

public class ConectionFactory {

    private static final Logger LOGGER = Logger.getLogger(ConectionFactory.class.getName());
    private String url = "jdbc:mysql://localhost:3306/ordersmanagement?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC";
    private String uid = "root";
    private String pw = "";
    private BufferedReader reader;
    private java.sql.Connection con;

    private static ConectionFactory singleInstance = new ConectionFactory();

    /**
     * Constructor gol
     */
    public ConectionFactory() {
    }

    public static void main(String[] args) {
        ConectionFactory app = new ConectionFactory();
        app.init();
        app.run();
    }

    /**
     * Creerea conexiuni
     * @return
     */

    private Connection createConnection() {
        Connection connection = null;
        try {
            connection = DriverManager.getConnection(url, uid, pw);
        } catch (SQLException e) {
            LOGGER.log(Level.WARNING, "An error occured while trying to connect to the database");
            e.printStackTrace();
        }
        return connection;
    }

    /**
     * Returnarea conexiuni
     * @return
     */
    public static Connection getConnection() {
        return singleInstance.createConnection();
    }

    /**
     * Initializare conexiune cu baza de date
     */

    private void init() {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException var3) {
            ClassNotFoundException e = var3;
            System.err.println("ClassNotFoundException: " + e);
        }

        this.con = null;

        try {
            this.con = DriverManager.getConnection(this.url, this.uid, this.pw);
            System.out.println("Conexiune reușită la baza de date!");
        } catch (SQLException var2) {
            SQLException ex = var2;
            System.err.println("SQLException: " + ex);
            System.exit(1);
        }

        this.reader = new BufferedReader(new InputStreamReader(System.in));
    }

    /**
     * Run
     */

    private void run() {
        String choice;
        choice = "1";
        while (!choice.equalsIgnoreCase("X")) {
            switch (this.getLine()) {
                case "1":
                    String sqlSt = "SELECT * FROM persoana;";
                    this.doQuery(sqlSt);
                    break;
                default:
                    System.out.println("Invalid input!");
            }
        }

    }

    /**
     * Creeaza un query
     * @param queryStr
     */

    private void doQuery(String queryStr) {
        try {
            Statement stmt = this.con.createStatement();

            try {
                ResultSet rst = stmt.executeQuery(queryStr);

                try {
                    ResultSetMetaData rsmd = rst.getMetaData();
                    int colCount = rsmd.getColumnCount();

                    int i;
                    PrintStream var10000;
                    String var10001;
                    for (i = 1; i <= colCount; ++i) {
                        var10000 = System.out;
                        var10001 = rsmd.getColumnName(i);
                        var10000.print(var10001 + "\t");
                    }

                    System.out.println();

                    while (rst.next()) {
                        for (i = 1; i <= colCount; ++i) {
                            var10000 = System.out;
                            var10001 = rst.getString(i);
                            var10000.print(var10001 + "\t");
                        }

                        System.out.println();
                    }
                } catch (Throwable var9) {
                    if (rst != null) {
                        try {
                            rst.close();
                        } catch (Throwable var8) {
                            var9.addSuppressed(var8);
                        }
                    }

                    throw var9;
                }

                if (rst != null) {
                    rst.close();
                }
            } catch (Throwable var10) {
                if (stmt != null) {
                    try {
                        stmt.close();
                    } catch (Throwable var7) {
                        var10.addSuppressed(var7);
                    }
                }

                throw var10;
            }

            if (stmt != null) {
                stmt.close();
            }
        } catch (SQLException var11) {
            SQLException ex = var11;
            System.err.println("SQLException: " + ex);
        }

    }

    private String getLine() {
        try {
            return this.reader.readLine();
        } catch (IOException var2) {
            IOException e = var2;
            System.out.println(e);
            System.exit(1);
            return null;
        }
    }

    /**
     * Inchiderea conexiuni
     * @param connection
     */

    public static void close(Connection connection) {
        if (connection != null) {
            try {
                connection.close();
            } catch (SQLException e) {
                LOGGER.log(Level.WARNING, "An error occured while trying to close the connection");
            }
        }
    }

    /**
     * Inchiderea conexiuni
     * @param statement
     */
    public static void close(Statement statement) {
        if (statement != null) {
            try {
                statement.close();
            } catch (SQLException e) {
                LOGGER.log(Level.WARNING, "An error occured while trying to close the statement");
            }
        }
    }

}

