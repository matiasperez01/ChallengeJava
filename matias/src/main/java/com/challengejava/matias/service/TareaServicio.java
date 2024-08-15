package com.challengejava.matias.service;

import com.challengejava.matias.excepcion.RecursoNoEncontradoExcepcion;
import com.challengejava.matias.modelo.Tarea;
import com.challengejava.matias.repository.TareaRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TareaServicio implements ITareaServicio{

    @Autowired
    private TareaRepositorio tareaRepositorio;

    @Override
    public List<Tarea> listarTareas() {
        return tareaRepositorio.findAll();
    }

    @Override
    public Tarea listarTareaPorId(int id){
        Tarea tarea = tareaRepositorio.findById(id).orElse(null);
        if(tarea == null) throw new RecursoNoEncontradoExcepcion("No se encontro la tarea");
        else {
            return tarea;
        }
    }
}
