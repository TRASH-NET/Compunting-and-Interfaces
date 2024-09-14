package app.gestor_de_tareas.dto;

import app.gestor_de_tareas.models.TaskStatus;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;

public class CreateTaskDto {

    @NotEmpty(message = "Title cannot be empty")
    public String title;

    @NotEmpty(message = "Description cannot be empty")
    public String description;

    @NotEmpty(message = "Finish date cannot be empty")
    @Pattern(regexp = "^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}$", message = "finishDate format must be 'yyyy-MM-dd'T'HH:mm:ss'")
    public String finishDate;

    public TaskStatus status;

}