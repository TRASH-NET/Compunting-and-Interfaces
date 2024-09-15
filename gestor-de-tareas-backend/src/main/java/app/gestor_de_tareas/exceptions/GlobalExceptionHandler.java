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

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ConstraintException.class)
    @ResponseBody
    public ResponseEntity<ErrorResponse> handleConstraintViolationException(ConstraintException ex) {
        String errorMessage = "Constraint violation";
        ErrorResponse errorResponse = new ErrorResponse(errorMessage, ex.getMessage(), HttpStatus.BAD_REQUEST.value());
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(DateException.class)
    @ResponseBody
    public ResponseEntity<ErrorResponse> handleDateException(DateException ex) {
        ErrorResponse errorResponse = new ErrorResponse("Invalid date", ex.getMessage(),
                HttpStatus.BAD_REQUEST.value());
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(StatusException.class)
    @ResponseBody
    public ResponseEntity<ErrorResponse> handleOverdueTaskStatusChangeException(StatusException ex) {
        String errorMessage = "Invalid Status";
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
        String errorMessage;

        // solicitud
        if (ex.getMessage().contains("no content")) {
            errorMessage = "At least one of these fields must be provided: title, description, status, finishDate";
        } else if (ex.getMessage().contains(TaskStatus.class.getName())) {
            String enumValues = String.join(", ", TaskStatus.getTaskStatuses());
            errorMessage = "Status only can be one of the next values: " + enumValues;
        } else {
            errorMessage = "Invalid request body";
        }

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
