package app.gestor_de_tareas.dto;

import app.gestor_de_tareas.models.TaskStatus;
import jakarta.validation.constraints.NotEmpty;

public class CreateTaskDto {

    @NotEmpty(message = "Title cannot be empty")
    public String title;

    @NotEmpty(message = "Description cannot be empty")
    public String description;

    public TaskStatus status;

}