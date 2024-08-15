package com.challengejava.matias.modelo;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.antlr.v4.runtime.misc.NotNull;


@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Empleado")
public class Empleado {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_empleado;

    @NotNull
    @Column(name = "nombre", nullable = false)
    private String nombre;
    @NotNull
    @Column(name = "apellido" , nullable = false)
    private String apellido;

    @Column(name = "tutor", nullable = true)
    private Integer tutor;

    @Column(name = "celular", nullable = true)
    private Double celular;

    @Column(name = "genero", nullable = false)
    private String genero;

    public Integer getId_empleado() {
        return id_empleado;
    }

    public void setId_empleado(Integer id) {
        this.id_empleado = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public Integer getTutor() {
        return tutor;
    }

    public void setTutor(Integer tutor) {
        this.tutor = tutor;
    }

    public Double getCelular() {
        return celular;
    }

    public void setCelular(Double celular) {
        this.celular = celular;
    }

    public String getGenero() {
        return genero;
    }

    public void setGenero(String genero) {
        this.genero = genero;
    }
}
