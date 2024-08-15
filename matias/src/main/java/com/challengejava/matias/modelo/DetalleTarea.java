package com.challengejava.matias.modelo;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "DetalleTarea")
public class DetalleTarea {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_detalle_tarea;

    @Column(name = "id_empleado", nullable = false)
    private Integer id_empleado;

    @Column(name = "id_tarea", nullable = false)
    private Integer id_tarea;

    public Integer getId_detalle_tarea() {
        return id_detalle_tarea;
    }

    public void setId_detalle_tarea(Integer id_detalle_tarea) {
        this.id_detalle_tarea = id_detalle_tarea;
    }

    public Integer getId_empleado() {
        return id_empleado;
    }

    public void setId_empleado(Integer id_empleado) {
        this.id_empleado = id_empleado;
    }

    public Integer getId_tarea() {
        return id_tarea;
    }

    public void setId_tarea(Integer id_tarea) {
        this.id_tarea = id_tarea;
    }
}
