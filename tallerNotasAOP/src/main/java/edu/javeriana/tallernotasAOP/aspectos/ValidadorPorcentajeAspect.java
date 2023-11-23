package edu.javeriana.tallernotasAOP.aspectos;


    import edu.javeriana.tallernotasAOP.excepcion.NullException;
    import edu.javeriana.tallernotasAOP.excepcion.PorcentajeExcedidoExcep;
    import edu.javeriana.tallernotasAOP.modelo.Nota;
import edu.javeriana.tallernotasAOP.repositorio.RepositorioNota;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Objects;

    @Aspect
    @Component
    public class ValidadorPorcentajeAspect {

        @Autowired
        private RepositorioNota repositorioNota;

        @Pointcut("execution(* edu.javeriana.tallernotasAOP.controlador.ControladorNota.actualizaNota(..))")
        public void actualizaNotaPointcut() {
            // Este método no tiene implementación real ya que se utiliza solo para definir el Pointcut.
        }

        @Pointcut("execution(* edu.javeriana.tallernotasAOP.controlador.ControladorNota.creaNota(..))")
        public void creaNotaPointcut() {
            // Este método no tiene implementación real ya que se utiliza solo para definir el Pointcut.
        }

        @Before("actualizaNotaPointcut() && args(id, nota)")
        public void validarPorcentajeActualiza(int id, Nota nota) {
            if ((nota.getValor() == null) || (nota.getPorcentaje() == null))
            {
                throw new NullException("No se aceptan valores nulos");
            }
            validarPorcentaje(id, nota);
        }

        @Before("creaNotaPointcut() && args(nota)")
        public void validarPorcentajeCrea(Nota nota) {
            if ((nota.getValor() == null) || (nota.getPorcentaje() == null))
            {
                throw new NullException("No se aceptan valores nulos");
            }
            validarPorcentaje(null, nota); // Usamos null para indicar que no hay una nota existente en el método creaNota
        }


        private void validarPorcentaje(Integer id, Nota nota) {
            // Obtener las notas actuales
            List<Nota> notasActuales = repositorioNota.findAll();

            // Calcular el nuevo porcentaje total con la nota actualizada o creada
            double nuevoPorcentajeTotal = calcularNuevoPorcentajeTotal(notasActuales, id, nota);

            // Validar que el nuevo porcentaje total no exceda el 100%
            if (nuevoPorcentajeTotal > 100.0) {
                throw new PorcentajeExcedidoExcep("Total percentage cannot exceed 100%");
            }
        }

        private double calcularNuevoPorcentajeTotal(List<Nota> notasActuales, Integer id, Nota nuevaNota) {

            double porcentajeNotaActualizada = Objects.requireNonNullElse(nuevaNota.getPorcentaje(), 0.0);

            // Calcular el nuevo porcentaje total
            return notasActuales.stream()
                    .filter(n -> n != null && n.getPorcentaje() != null && (id == null || !n.getId().equals(id)))
                    .mapToDouble(Nota::getPorcentaje)
                    .sum() + porcentajeNotaActualizada;
        }
    }








