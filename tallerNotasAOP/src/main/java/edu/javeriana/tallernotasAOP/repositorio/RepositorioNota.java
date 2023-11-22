package edu.javeriana.tallernotasAOP.repositorio;

import edu.javeriana.tallernotasAOP.modelo.Nota;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

// RepositorioNota interface
public interface RepositorioNota extends JpaRepository<Nota, Integer> {
    List<Nota> findByEstudiante_id(Integer estudiante_id);
}