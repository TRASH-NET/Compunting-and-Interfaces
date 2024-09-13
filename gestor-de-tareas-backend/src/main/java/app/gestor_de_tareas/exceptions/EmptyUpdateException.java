package app.gestor_de_tareas.exceptions;

public class EmptyUpdateException extends RuntimeException {

    public EmptyUpdateException(String message) {
        super(message);
    }
}