package edu.javeriana.tallernotasAOP.controlador;

import edu.javeriana.tallernotasAOP.excepcion.RegistroNoEncontradoException;
import edu.javeriana.tallernotasAOP.modelo.Estudiante;
import edu.javeriana.tallernotasAOP.modelo.Nota;
import edu.javeriana.tallernotasAOP.repositorio.RepositorioEstudiante;
import edu.javeriana.tallernotasAOP.repositorio.RepositorioNota;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/")
public class ControladorEstudiante {
    @Autowired
    private RepositorioEstudiante repositorioEstudiante;
    //Http ==> CRUD

    //POST Create
    @PostMapping("/crea")
    public Estudiante creaEstudiante(@RequestBody  Estudiante estudiante) {
        return repositorioEstudiante.save(estudiante);
    }
    //GET  Retrieve
    @GetMapping("/estudiantes")
    public List<Estudiante> traeEstudiantes() {
        return repositorioEstudiante.findAll();
    }
    @GetMapping("/estudiante/{id}")
    public ResponseEntity<Estudiante> traeEstudiante(@PathVariable Integer id)
    {
        Estudiante estudiante = repositorioEstudiante.findById(id)
                .orElseThrow(() -> new RegistroNoEncontradoException("No existe el estudiante con id: " + id));

        return ResponseEntity.ok(estudiante);
    }
    //PUT  Update

    @PutMapping("/act/{id}")
    public Estudiante actualizaEstudiante(@PathVariable Integer id, @RequestBody Estudiante estudiante) {
        Estudiante nuevoEstudiante = repositorioEstudiante.findById(id)
                .orElseThrow(() -> new RegistroNoEncontradoException("No existe el estudiante con id: " + id));

        nuevoEstudiante.setNombre(estudiante.getNombre());
        nuevoEstudiante.setApellido(estudiante.getApellido());
        nuevoEstudiante.setCorreo(estudiante.getCorreo());

        return  repositorioEstudiante.save(nuevoEstudiante);   //ResponseEntity.ok(nuevoEstudiante);
    }
    //DELETE Delete
    @DeleteMapping("/borra/{id}")

    public ResponseEntity<HttpStatus> borraEstudiante(@PathVariable Integer id) {
        Estudiante estudiante = repositorioEstudiante.findById(id)
                .orElseThrow(() -> new RegistroNoEncontradoException("No existe el estudiante con id: " + id));
        repositorioEstudiante.delete(estudiante);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }



}
