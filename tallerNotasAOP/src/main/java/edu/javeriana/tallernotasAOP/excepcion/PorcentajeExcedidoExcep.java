package edu.javeriana.tallernotasAOP.excepcion;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class PorcentajeExcedidoExcep extends RuntimeException{
    private static final long serialVersionUID = 1L;

    public PorcentajeExcedidoExcep(String message) {
        super(message);
    }
}
