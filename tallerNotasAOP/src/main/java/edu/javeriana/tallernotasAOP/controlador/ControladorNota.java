package edu.javeriana.tallernotasAOP.controlador;

import edu.javeriana.tallernotasAOP.excepcion.RegistroNoEncontradoException;
import edu.javeriana.tallernotasAOP.modelo.Nota;
import edu.javeriana.tallernotasAOP.repositorio.RepositorioNota;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/")
public class ControladorNota {

    @Autowired
    private RepositorioNota repositorioNota;

    @GetMapping("/notas")
    public List<Nota> traerTodas() {
        return repositorioNota.findAll();
    }

    @GetMapping("/nota/{id}")
    public ResponseEntity<Nota> traeNota(@PathVariable Integer id)
    {
        Nota nota = repositorioNota.findById(id)
                .orElseThrow(() -> new RegistroNoEncontradoException("No existe nota con id: " + id));

        return ResponseEntity.ok(nota);
    }

    @PostMapping("/crearnota")
    public Nota creaNota(@RequestBody  Nota nota) {
        return repositorioNota.save(nota);
    }
    @GetMapping("/notas/{estudianteid}")
    public List<Nota> obtenerNotasPorEstudiante(@PathVariable("estudianteid") Integer estudianteid) {
        return repositorioNota.findByEstudianteId(estudianteid);
    }

}
