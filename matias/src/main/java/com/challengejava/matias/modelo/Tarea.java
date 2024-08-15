package com.challengejava.matias.modelo;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Tarea")
public class Tarea {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_tarea;

    @Column(name = "nombre_tarea", nullable = false)
    private String nombre_tarea;

    @Column(name = "categoria", nullable = false)
    private String categoria;

    public Integer getId_tarea() {
        return id_tarea;
    }

    public void setId_tarea(Integer id_tarea) {
        this.id_tarea = id_tarea;
    }

    public String getNombre_tarea() {
        return nombre_tarea;
    }

    public void setNombre_tarea(String nombre) {
        this.nombre_tarea = nombre;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }
}
