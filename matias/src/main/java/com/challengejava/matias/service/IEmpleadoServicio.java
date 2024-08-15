package com.challengejava.matias.service;

import com.challengejava.matias.modelo.Empleado;

import java.util.List;


public interface IEmpleadoServicio {
    public List<Empleado> listarEmpleados();
    public Empleado buscarEmpleadoPorId(Integer id);
    public Empleado guardarEmpleado(Empleado empleado);
    public void eliminarUsuario(Empleado empleado);
}
