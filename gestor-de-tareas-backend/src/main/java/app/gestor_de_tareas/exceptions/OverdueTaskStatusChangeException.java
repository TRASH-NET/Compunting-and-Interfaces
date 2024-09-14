package app.gestor_de_tareas.exceptions;

public class OverdueTaskStatusChangeException extends RuntimeException {
    public OverdueTaskStatusChangeException(String message) {
        super(message);
    }
}