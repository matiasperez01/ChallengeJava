package com.challengejava.matias.service;

import com.challengejava.matias.modelo.DetalleTarea;
import com.challengejava.matias.modelo.Empleado;

import java.util.List;

public interface IDetalleTareaServicio {

    public List<DetalleTarea> listarTareasPorEmpleado();
    public DetalleTarea guardarTareaPorEmpleado(DetalleTarea detalleTarea);
    public DetalleTarea buscarDetalleTareaPorId(Integer id);
    public void eliminarTareaPorEmpleado(DetalleTarea detalleTarea);

    public List<DetalleTarea> buscarTareaPorIdEmpleado(Integer id);
}
