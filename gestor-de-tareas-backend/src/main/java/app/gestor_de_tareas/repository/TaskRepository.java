package app.gestor_de_tareas.repository;

import app.gestor_de_tareas.models.Task;

import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

}
