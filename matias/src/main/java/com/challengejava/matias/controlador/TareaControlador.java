package com.challengejava.matias.controlador;

import com.challengejava.matias.modelo.Tarea;
import com.challengejava.matias.service.TareaServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class TareaControlador {

    @Autowired
    private TareaServicio tareaServicio;

    @GetMapping("/tareas")
    public List<Tarea> listarTareas(){
        return tareaServicio.listarTareas();
    }

    @GetMapping("/tareas/{id}")
    public Tarea listarTareaPorId(@PathVariable int id){
        return tareaServicio.listarTareaPorId(id);
    }
}
