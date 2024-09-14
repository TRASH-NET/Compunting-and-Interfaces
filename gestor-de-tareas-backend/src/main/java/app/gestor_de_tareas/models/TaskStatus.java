package app.gestor_de_tareas.models;

import java.util.Arrays;

public enum TaskStatus {
    TODO,
    IN_PROGRESS,
    UNDER_REVIEW,
    BACKWARD,
    DONE;

    public static String[] getTaskStatuses() {
        return Arrays.stream(TaskStatus.values()).map(Enum::name).toArray(String[]::new);
    }
}
