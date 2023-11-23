package edu.javeriana.tallernotasAOP.controlador;

import edu.javeriana.tallernotasAOP.excepcion.RegistroNoEncontradoException;
import edu.javeriana.tallernotasAOP.modelo.Estudiante;
import edu.javeriana.tallernotasAOP.modelo.Nota;
import edu.javeriana.tallernotasAOP.repositorio.RepositorioNota;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Service
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
    @PutMapping("/actnota/{id}")
    public Nota actualizaNota(@PathVariable Integer id, @RequestBody Nota nota) {
        Nota nuevaNota = repositorioNota.findById(id)
                .orElseThrow(() -> new RegistroNoEncontradoException("No existe la nota con id: " + id));

        nuevaNota.setObservacion(nota.getObservacion());
        nuevaNota.setValor(nota.getValor());
        nuevaNota.setPorcentaje(nota.getPorcentaje());

        return  repositorioNota.save(nuevaNota);
    }
    @DeleteMapping("/borranota/{id}")
    public ResponseEntity<Nota> borraNota(@PathVariable Integer id) {
        Nota nota = repositorioNota.findById(id)
                .orElseThrow(() -> new RegistroNoEncontradoException("No existe la nota con id: " + id));
        repositorioNota.delete(nota);
        return ResponseEntity.ok(nota);
    }

}
