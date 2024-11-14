package app.gestor_de_tareas.services;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import app.gestor_de_tareas.dto.CreateTaskDto;
import app.gestor_de_tareas.dto.UpdateTaskDto;
import app.gestor_de_tareas.exceptions.ConstraintException;
import app.gestor_de_tareas.exceptions.DateException;
import app.gestor_de_tareas.exceptions.EmptyUpdateException;
import app.gestor_de_tareas.exceptions.StatusException;
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

        if (isOverdue(createTaskDto.finishDate)) {
            throw new DateException("finishDate must be in the future");
        }

        if (createTaskDto.status == TaskStatus.BACKWARD || createTaskDto.status == TaskStatus.DONE) {
            throw new DateException("Cannot create a task with status: " + createTaskDto.status);
        }

        Task task = new Task(createTaskDto.title, createTaskDto.description,
                createTaskDto.status == null ? TaskStatus.TODO : createTaskDto.status,
                createTaskDto.finishDate);

        return taskRepository.save(task);
    }

    public Task updateTask(Long id, UpdateTaskDto updateTaskDto) {

        Task existingTask = taskRepository.findById(id)
                .orElseThrow(() -> new TaskNotFoundException("Task with id: " + id + " not found"));

        if (existingTask.getStatus() == TaskStatus.DONE) {
            throw new ConstraintException("Task is already DONE and cannot be modified");
        }

        if (updateTaskDto.title == null && updateTaskDto.description == null && updateTaskDto.status == null
                && updateTaskDto.finishDate == null) {
            throw new EmptyUpdateException(
                    "At least one these fields must be provided: title, description, status, finishDate");
        }

        if (updateTaskDto.title != null) {
            existingTask.setTitle(updateTaskDto.title);
        }

        if (updateTaskDto.description != null) {
            existingTask.setDescription(updateTaskDto.description);
        }

        if (updateTaskDto.status != null) {
            if (existingTask.getStatus() == TaskStatus.BACKWARD) {
                if (!TaskStatus.DONE.equals(updateTaskDto.status)) {
                    throw new StatusException("Cannot change status from BACKWARD to " + updateTaskDto.status);
                }
            }
            if (updateTaskDto.status == TaskStatus.BACKWARD) {
                throw new StatusException("Cannot change status to BACKWARD if finishDate is not overdue");
            }

            existingTask.setStatus(updateTaskDto.status);
        }

        if (updateTaskDto.finishDate != null) {
            if (existingTask.getStatus() == TaskStatus.BACKWARD) {
                if (isOverdue(updateTaskDto.finishDate)) {
                    throw new DateException("finishDate must be in the future");
                } else {
                    existingTask.setStatus(TaskStatus.TODO);
                }
            }
            if (isOverdue(updateTaskDto.finishDate)) {
                throw new DateException("finishDate must be in the future");
            }
            existingTask.setFinishDate(updateTaskDto.finishDate);
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

    @Scheduled(cron = "*/1 * * * * ?")
    public void updateTaskStatuses() {
        List<Task> tasks = taskRepository.findAll();
        SimpleDateFormat dateFormat = new SimpleDateFormat(DATE_FORMAT);
        Date now = new Date();

        for (Task task : tasks) {
            if (task.getStatus() == TaskStatus.DONE) {
                continue;
            }

            try {
                Date finishDate = dateFormat.parse(task.getFinishDate());

                if (finishDate.before(now)) {
                    if (!TaskStatus.BACKWARD.equals(task.getStatus())) {
                        task.setStatus(TaskStatus.BACKWARD);
                        taskRepository.save(task);
                    }
                }
            } catch (ParseException e) {
                throw new DateException("finishDate must be in the format: " + DATE_FORMAT);
            }
        }
    }

    private boolean isOverdue(String finishDateString) {
        try {
            Date finishDate = dateFormat.parse(finishDateString);
            
            if(finishDate.before(new Date()) || finishDate.equals(new Date())){
                return true;
            }

            return false;

        } catch (ParseException e) {
            throw new DateException("finishDate must be in the format: " + DATE_FORMAT);
        }
    }
}
