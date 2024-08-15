package com.challengejava.matias.repository;

import com.challengejava.matias.modelo.Tarea;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TareaRepositorio extends JpaRepository <Tarea, Integer>{
}
