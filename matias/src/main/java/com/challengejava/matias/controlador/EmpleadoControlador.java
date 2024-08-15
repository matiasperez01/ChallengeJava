package com.challengejava.matias.controlador;

import com.challengejava.matias.excepcion.RecursoNoEncontradoExcepcion;
import com.challengejava.matias.modelo.Empleado;
import com.challengejava.matias.service.EmpleadoServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class EmpleadoControlador {

    @Autowired
    private EmpleadoServicio empleadoServicio;

    @GetMapping("/empleados")
    public List<Empleado> listarEmpleados(){
        return empleadoServicio.listarEmpleados();
    }

    @GetMapping("/empleados/{id}")
    public ResponseEntity<Empleado> listarEmpleadoPorId(@PathVariable int id){
        Empleado empleado = empleadoServicio.buscarEmpleadoPorId(id);
        if(empleado == null){
            throw new RecursoNoEncontradoExcepcion("No se encontro el ID" + id);
        }else{
            return ResponseEntity.ok(empleado);
        }
    }

    @PostMapping("/empleados")
    public Empleado guardarEmpleado(@RequestBody Empleado empleado){
        return empleadoServicio.guardarEmpleado(empleado);
    }

    @PutMapping("/empleados/{id}")
    public ResponseEntity<Empleado> actualizarEmpleado(@PathVariable int id, @RequestBody Empleado empleado){
        Empleado empleadoNuevo = empleadoServicio.buscarEmpleadoPorId(id);
        if(empleadoNuevo == null) throw new RecursoNoEncontradoExcepcion("No se encontro el ID "+id);
        else{
            empleadoNuevo.setNombre(empleado.getNombre());
            empleadoNuevo.setApellido(empleado.getApellido());
            empleadoNuevo.setCelular(empleado.getCelular());
            empleadoNuevo.setTutor(empleado.getTutor());
            empleadoNuevo.setGenero(empleado.getGenero());
            empleadoServicio.guardarEmpleado(empleadoNuevo);
            return ResponseEntity.ok(empleadoNuevo);
        }
    }

    @DeleteMapping("/empleados/{id}")
    public ResponseEntity<Empleado> eliminarEmpleado(@PathVariable int id){
        Empleado empleado = empleadoServicio.buscarEmpleadoPorId(id);
        if(empleado == null){
            throw new RecursoNoEncontradoExcepcion("No se encontro el ID "+id);
        }else{
            empleadoServicio.eliminarUsuario(empleado);
            return ResponseEntity.ok(empleado);
        }
    }


}
