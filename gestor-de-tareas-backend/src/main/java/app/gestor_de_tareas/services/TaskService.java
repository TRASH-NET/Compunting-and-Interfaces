package app.gestor_de_tareas.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import app.gestor_de_tareas.dto.CreateTaskDto;
import app.gestor_de_tareas.dto.UpdateTaskDto;
import app.gestor_de_tareas.exceptions.EmptyUpdateException;
import app.gestor_de_tareas.exceptions.TaskNotFoundException;
import app.gestor_de_tareas.models.Task;
import app.gestor_de_tareas.models.TaskStatus;
import app.gestor_de_tareas.repository.TaskRepository;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

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
        task.setStatus(createTaskDto.status != null ? createTaskDto.status : TaskStatus.TODO);

        return taskRepository.save(task);
    }

    public Task updateTask(Long id, UpdateTaskDto updateTaskDto) {

        Task existingTask = taskRepository.findById(id)
                .orElseThrow(() -> new TaskNotFoundException("Task with id: " + id + " not found"));

        if (updateTaskDto.title == null && updateTaskDto.description == null && updateTaskDto.status == null) {
            throw new EmptyUpdateException("At least one field must be provided to update the task");
        }

        if (updateTaskDto.title != null) {
            existingTask.setTitle(updateTaskDto.title);
        }
        if (updateTaskDto.description != null) {
            existingTask.setDescription(updateTaskDto.description);
        }
        if (updateTaskDto.status != null) {
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
}
