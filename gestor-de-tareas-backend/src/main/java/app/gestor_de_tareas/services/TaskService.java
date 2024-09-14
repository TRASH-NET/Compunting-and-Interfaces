package app.gestor_de_tareas.services;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import app.gestor_de_tareas.dto.CreateTaskDto;
import app.gestor_de_tareas.dto.UpdateTaskDto;
import app.gestor_de_tareas.exceptions.EmptyUpdateException;
import app.gestor_de_tareas.exceptions.OverdueTaskStatusChangeException;
import app.gestor_de_tareas.exceptions.TaskNotFoundException;
import app.gestor_de_tareas.models.Task;
import app.gestor_de_tareas.models.TaskStatus;
import app.gestor_de_tareas.repository.TaskRepository;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    private static final String DATE_FORMAT = "yyyy-MM-dd'T'HH:mm:ss";
    private SimpleDateFormat dateFormat = new SimpleDateFormat(DATE_FORMAT, Locale.ENGLISH);

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Task getTaskById(Long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new TaskNotFoundException("Task with id " + id + " not found"));
    }

    public Task createTask(CreateTaskDto createTaskDto) {
        Task task = new Task();

        task.setTitle(createTaskDto.title);
        task.setDescription(createTaskDto.description);
        task.setFinishDate(createTaskDto.finishDate);
        task.setStatus(determineStatus(createTaskDto.finishDate, createTaskDto.status));

        return taskRepository.save(task);
    }

    public Task updateTask(Long id, UpdateTaskDto updateTaskDto) {

        Task existingTask = taskRepository.findById(id)
                .orElseThrow(() -> new TaskNotFoundException("Task with id: " + id + " not found"));

        boolean isTaskOverdue = isOverdue(existingTask.getFinishDate());

        if (updateTaskDto.title == null && updateTaskDto.description == null && updateTaskDto.status == null) {
            throw new EmptyUpdateException("At least one field must be provided to update the task");
        }

        if (updateTaskDto.title != null) {
            existingTask.setTitle(updateTaskDto.title);
        }
        if (updateTaskDto.description != null) {
            existingTask.setDescription(updateTaskDto.description);
        }

        if (updateTaskDto.finishDate != null) {
            existingTask.setFinishDate(updateTaskDto.finishDate);
        }

        if (updateTaskDto.status != null && isTaskOverdue) {
            throw new OverdueTaskStatusChangeException("Cannot change the status of an overdue task");
        } else if (updateTaskDto.status != null) {
            existingTask.setStatus(updateTaskDto.status);
        }

        return taskRepository.save(existingTask);
    }

    public Task deleteTask(Long id) {

        Task task = taskRepository.findById(id).orElseThrow(() -> new RuntimeException("Task not found"));

        if (task == null) {
            throw new RuntimeException("Task not found");
        }

        taskRepository.deleteById(id);

        return task;
    }

    private TaskStatus determineStatus(String finishDateString, TaskStatus providedStatus) {
        boolean overdue = isOverdue(finishDateString);

        if (providedStatus != null) {
            return overdue ? TaskStatus.BACKWARD : providedStatus;
        }

        return overdue ? TaskStatus.BACKWARD : TaskStatus.TODO;
    }

    private boolean isOverdue(String finishDateString) {
        try {
            Date finishDate = dateFormat.parse(finishDateString);
            return finishDate.before(new Date());
        } catch (ParseException e) {
            throw new RuntimeException("Invalid date format", e);
        }
    }
}
