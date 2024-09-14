package app.gestor_de_tareas.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import app.gestor_de_tareas.models.TaskStatus;
import jakarta.validation.ConstraintViolationException;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ConstraintViolationException.class)
    @ResponseBody
    public ResponseEntity<ErrorResponse> handleConstraintViolationException(ConstraintViolationException ex) {
        String errorMessage = "Validation failed";
        ErrorResponse errorResponse = new ErrorResponse(errorMessage, ex.getMessage(), HttpStatus.BAD_REQUEST.value());
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(OverdueTaskStatusChangeException.class)
    @ResponseBody
    public ResponseEntity<ErrorResponse> handleOverdueTaskStatusChangeException(OverdueTaskStatusChangeException ex) {
        String errorMessage = "Constraint violation";
        ErrorResponse errorResponse = new ErrorResponse(errorMessage, ex.getMessage(), HttpStatus.BAD_REQUEST.value());
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseBody
    public ResponseEntity<ErrorResponse> handleValidationExceptions(MethodArgumentNotValidException ex) {
        StringBuilder messageBuilder = new StringBuilder();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            if (error instanceof FieldError) {
                String errorMessage = error.getDefaultMessage();
                messageBuilder.append(errorMessage).append(" ");
            }
        });

        String message = messageBuilder.toString().trim();
        ErrorResponse errorResponse = new ErrorResponse("Validation failed", message, HttpStatus.BAD_REQUEST.value());

        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(TaskNotFoundException.class)
    @ResponseBody
    public ResponseEntity<ErrorResponse> handleTaskNotFoundException(TaskNotFoundException ex) {
        ErrorResponse errorResponse = new ErrorResponse("Task Not Found", ex.getMessage(),
                HttpStatus.NOT_FOUND.value());
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(EmptyUpdateException.class)
    @ResponseBody
    public ResponseEntity<ErrorResponse> handleEmptyUpdateException(EmptyUpdateException ex) {
        ErrorResponse errorResponse = new ErrorResponse("Validation Failed", ex.getMessage(),
                HttpStatus.BAD_REQUEST.value());
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    @ResponseBody
    public ResponseEntity<ErrorResponse> handleHttpMessageNotReadableException(HttpMessageNotReadableException ex) {
        String errorMessage = "Status only can be one of the next values: ";
        String enumValues = String.join(", ", TaskStatus.getTaskStatuses());

        errorMessage += enumValues;

        ErrorResponse errorResponse = new ErrorResponse("Invalid request", errorMessage,
                HttpStatus.BAD_REQUEST.value());
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    @ResponseBody
    public ResponseEntity<ErrorResponse> handleException(Exception ex) {
        ErrorResponse errorResponse = new ErrorResponse("Internal Server Error", ex.getMessage(),
                HttpStatus.INTERNAL_SERVER_ERROR.value());
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
