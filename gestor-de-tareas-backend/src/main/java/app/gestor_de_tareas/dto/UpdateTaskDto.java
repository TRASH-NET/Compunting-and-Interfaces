package app.gestor_de_tareas.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import app.gestor_de_tareas.models.TaskStatus;

@JsonIgnoreProperties(ignoreUnknown = true)
public class UpdateTaskDto {
    public String title;
    public String description;
    public TaskStatus status;
}
