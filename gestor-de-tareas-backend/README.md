# Gestor de Tareas
Este proyecto es una aplicación para la gestión de tareas, desarrollada utilizando Spring Boot. Permite realizar operaciones CRUD sobre tareas y maneja validaciones y excepciones personalizadas para una experiencia de usuario robusta.

# Requerimientos
Antes de ejecutar el proyecto, asegúrate de tener instalado lo siguiente:

Java 22.
Maven para la gestión de dependencias y construcción del proyecto.
PostgreSQL

# Configuración
    1. Clona el repositorio
        - `git clone https://github.com/tuusuario/gestor-de-tareas.git`
        - `cd gestor-de-tareas`
    2. Configura la base de datos: Abre el archivo src/main/resources/application.properties y configura los parámetros de la base de datos según tu entorno. Ejemplo de configuración para PostgreSQL:
        - `spring.datasource.url=jdbc:postgresql://localhost:5432/gestor_de_tareas`
        - `spring.datasource.username=postgres`
        - `spring.datasource.password=postgres`
    3. Construir el proyecto:
        - `mvn clean install`
    4. Ejecutar la aplicación:
        - `mvn spring-boot:run`
    5. Accede a la aplicación en tu navegador:
        - La aplicación se iniciará en http://localhost:8080 por defecto.
# Uso de la API

- GET /api/tasks: Obtiene todas las tareas.
- GET /api/tasks/{id}: Obtiene una tarea por su id.
- POST /api/tasks: Crea una nueva tarea.
- PUT /api/tasks/{id}: Actualiza una tarea por su id.
- DELETE /api/tasks/{id}: Elimina una tarea por su id.

# Read Me First
The following was discovered as part of building this project:

* The original package name 'app.gestor-de-tareas' is invalid and this project uses 'app.gestor_de_tareas' instead.
