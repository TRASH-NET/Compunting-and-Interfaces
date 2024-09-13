package app.gestor_de_tareas;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class GestorDeTareasApplication {

	public static void main(String[] args) {
		SpringApplication.run(GestorDeTareasApplication.class, args);
	}

}
