package com.challengejava.matias.service;

import com.challengejava.matias.excepcion.RecursoNoEncontradoExcepcion;
import com.challengejava.matias.modelo.DetalleTarea;
import com.challengejava.matias.modelo.Empleado;
import com.challengejava.matias.repository.DetalleTareaRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DetalleTareaServicio implements IDetalleTareaServicio{

    @Autowired
    private EmpleadoServicio empleadoServicio;
    @Autowired
    private TareaServicio tareaServicio;
    @Autowired
    private DetalleTareaRepositorio detalleTareaRepositorio;
    @Override
    public List<DetalleTarea> listarTareasPorEmpleado() {
        return detalleTareaRepositorio.findAll();
    }

    @Override
    public DetalleTarea guardarTareaPorEmpleado(DetalleTarea detalleTarea) {
        return detalleTareaRepositorio.save(detalleTarea);
    }

    @Override
    public DetalleTarea buscarDetalleTareaPorId(Integer id) {
        return detalleTareaRepositorio.findById(id).orElse(null);
    }

    @Override
    public void eliminarTareaPorEmpleado(DetalleTarea detalleTarea) {
        detalleTareaRepositorio.delete(detalleTarea);
    }

    @Override
    public List<DetalleTarea> buscarTareaPorIdEmpleado(Integer id){
        Empleado empleado = empleadoServicio.buscarEmpleadoPorId(id);
        List <DetalleTarea> tareasPorEmpleado = new ArrayList();
        List <DetalleTarea> detalleTareas = listarTareasPorEmpleado();
        List tareas = tareaServicio.listarTareas();
        if(empleado == null){
            throw new RecursoNoEncontradoExcepcion("No se encontro al empleado con ID "+id);
        }else{
            for(int i=0; i<detalleTareas.size();i++){
                if(detalleTareas.get(i).getId_empleado() == empleado.getId_empleado()){
                    tareasPorEmpleado.add(detalleTareas.get(i));
                }
            }
            return tareasPorEmpleado;
        }
    }

}
