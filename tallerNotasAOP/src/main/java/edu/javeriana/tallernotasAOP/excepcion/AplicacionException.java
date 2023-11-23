package edu.javeriana.tallernotasAOP.excepcion;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import org.postgresql.util.PSQLException;

import java.util.ArrayList;
import java.util.List;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
@ControllerAdvice
public class AplicacionException extends ResponseEntityExceptionHandler {



    @ExceptionHandler(RegistroNoEncontradoException.class)
    public final ResponseEntity<RespuestaError> gestorSinDatosException
            (RegistroNoEncontradoException ex, WebRequest request)
    {
        List<String> detalles = new ArrayList<>();
        detalles.add(ex.getLocalizedMessage());
        RespuestaError error = new RespuestaError("Error de PETICIÓN", detalles);
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }
    @ExceptionHandler(PorcentajeExcedidoExcep.class)
    public ResponseEntity<String> PorcentajeExcedido(PorcentajeExcedidoExcep ex) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(ex.getMessage());
    }
    @ExceptionHandler(PSQLException.class)
    public ResponseEntity<String> handleIllegalArgumentException(PSQLException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    }
    @ExceptionHandler(NullException.class)
    public ResponseEntity<String> ValoresNulos(NullException ex) {
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(ex.getMessage());
    }


}