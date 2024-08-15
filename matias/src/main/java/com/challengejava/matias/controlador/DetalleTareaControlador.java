package com.challengejava.matias.controlador;

import com.challengejava.matias.excepcion.RecursoNoEncontradoExcepcion;
import com.challengejava.matias.modelo.DetalleTarea;
import com.challengejava.matias.modelo.Empleado;
import com.challengejava.matias.service.DetalleTareaServicio;
import com.challengejava.matias.service.EmpleadoServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class DetalleTareaControlador {
    @Autowired
    private DetalleTareaServicio detalleTareaServicio;

    @GetMapping("/detalletareas")
    public List<DetalleTarea> listarTareasPorEmpleado(){
        return detalleTareaServicio.listarTareasPorEmpleado();
    }

    @GetMapping("/detalletareas/empleado/{id}")
        public List<DetalleTarea> buscarTareaPorIdEmpleado(@PathVariable int id){
            return detalleTareaServicio.buscarTareaPorIdEmpleado(id);
    }

    @PostMapping("/detalletareas")
        public DetalleTarea guardarDetalleTarea(@RequestBody DetalleTarea detalleTarea){
            return detalleTareaServicio.guardarTareaPorEmpleado(detalleTarea);
    }

    @DeleteMapping("/detalletareas/{id}")
    public ResponseEntity<DetalleTarea> eliminarDetalleTarea(@PathVariable int id){
        DetalleTarea detalleTarea = detalleTareaServicio.buscarDetalleTareaPorId(id);
        if(detalleTarea == null){
            throw new RecursoNoEncontradoExcepcion("No se encontro el ID "+id);
        }else{
            detalleTareaServicio.eliminarTareaPorEmpleado(detalleTarea);
            return ResponseEntity.ok(detalleTarea);
        }
    }

    @DeleteMapping("/detalletareas/empleado/{id}")
    public ResponseEntity<List<DetalleTarea>> eliminarTareasPorEmpleado(@PathVariable int id){
        List<DetalleTarea> tareasPorEliminar = detalleTareaServicio.buscarTareaPorIdEmpleado(id);
        if(tareasPorEliminar == null){
            throw new RecursoNoEncontradoExcepcion("No se encontro el ID "+id);
        }else{
            for(int i=0;i<tareasPorEliminar.size();i++){
                detalleTareaServicio.eliminarTareaPorEmpleado(tareasPorEliminar.get(i));
            }
            return ResponseEntity.ok(tareasPorEliminar);
        }
    }

}
