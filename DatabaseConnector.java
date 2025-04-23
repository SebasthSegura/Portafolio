import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseConnector {

    private String jdbcUrl;
    private String username;
    private String password;
    private Connection connection;

    // Constructor para conectar a la base de datos local MySQL
    public DatabaseConnector(String databaseName, String dbUsername, String dbPassword) {
        this.jdbcUrl = "jdbc:mysql://localhost:3306/" + databaseName + "?serverTimezone=America/Bogota";
        this.username = dbUsername;
        this.password = dbPassword;
        this.connection = null; // Inicializamos la conexión a null
    }

    // Método para establecer la conexión a la base de datos
    public Connection getConnection() throws SQLException {
        if (this.connection == null || this.connection.isClosed()) {
            try {
                // Cargar el driver JDBC de MySQL (asegúrate de tener el JAR en tu classpath)
                Class.forName("com.mysql.cj.jdbc.Driver");
                this.connection = DriverManager.getConnection(jdbcUrl, username, password);
                System.out.println("Conexión a la base de datos exitosa.");
            } catch (ClassNotFoundException e) {
                System.err.println("Error: No se encontró el driver JDBC de MySQL.");
                throw new SQLException("Driver JDBC no encontrado", e);
            } catch (SQLException e) {
                System.err.println("Error al conectar a la base de datos: " + e.getMessage());
                throw e; // Re-lanzamos la excepción para que el llamador la maneje
            }
        }
        return this.connection;
    }

    // Método para cerrar la conexión a la base de datos
    public void closeConnection() {
        if (this.connection != null) {
            try {
                this.connection.close();
                System.out.println("Conexión a la base de datos cerrada.");
            } catch (SQLException e) {
                System.err.println("Error al cerrar la conexión: " + e.getMessage());
            } finally {
                this.connection = null; // Aseguramos que la conexión sea null después de cerrarla
            }
        }
    }

    public static void main(String[] args) {
        // Ejemplo de uso del constructor y los métodos
        DatabaseConnector connector = new DatabaseConnector("localhost", "root", "Entrada124*");
        Connection conn = null;
        try {
            conn = connector.getConnection();
            // Aquí puedes realizar operaciones con la base de datos utilizando la conexión 'conn'
            System.out.println("Conexión activa: " + !conn.isClosed());
        } catch (SQLException e) {
            System.err.println("Error en la operación con la base de datos: " + e.getMessage());
        } finally {
            connector.closeConnection();
        }
    }
}