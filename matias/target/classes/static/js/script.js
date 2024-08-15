const sectionHome = document.getElementById('section-home');
const sectionEmpleados = document.getElementById('section-empleados');
const urlBase = "http://localhost:8080/api";

// obtener valores del form
let idInput = document.getElementById('id');
let nombreInput = document.getElementById('nombre');
let apellidoInput = document.getElementById('apellido');
let celularInput = document.getElementById('celular');
let masculinoRadio = document.getElementById('masculino');
let femeninoRadio = document.getElementById('femenino');
let siRadio = document.getElementById('si');
let noRadio = document.getElementById('no');
let tutorInput = document.getElementById('tutor');
// pc
let PCsoCheckbox = document.getElementById('PCso');
let PClimpiezaCheckbox = document.getElementById('PClimpieza');
let PCvirusCheckbox = document.getElementById('PCvirus');
let PCdiagnosticoCheckbox = document.getElementById('PCdiagnostico');
let PCcambioCheckbox = document.getElementById('PCcambio');
//notebook
let NBsoCheckbox = document.getElementById('NBso');
let NBlimpiezaCheckbox = document.getElementById('NBlimpieza');
let NBvirusCheckbox = document.getElementById('NBvirus');
let NBdiagnosticoCheckbox = document.getElementById('NBdiagnostico');
let NBcambioCheckbox = document.getElementById('NBcambio');
//celular
let flasheoCheckbox = document.getElementById('flasheo');
let bateriaCheckbox = document.getElementById('bateria');
let pantallaCheckbox = document.getElementById('pantalla');
let templadoCheckbox = document.getElementById('templado');
//atencion al cliente
let clientesCheckbox = document.getElementById('clientes');
let presupuestarCheckbox = document.getElementById('presupuestar');
let ventaCheckbox = document.getElementById('venta');
let proveedoresCheckbox = document.getElementById('proveedores');
let tareasCheckbox = document.querySelectorAll('[data-id_tarea]');
let idsEmpleados = [];
let nombresEmpleados = [];
let apellidosEmpleados = [];
let allEmpleados = [];

//mostrar u ocultar section principal
const mostrarHome = () => {
    if(sectionHome.style.display === 'none'){
        sectionHome.style.display = 'flex';
        sectionEmpleados.style.display = 'none';
    }else{
        sectionHome.style.display = 'none';
    }
}

//mostrar u ocultar section empleados
const mostrarEmpleados = () => {
    if(sectionEmpleados.style.display === 'none'){
        sectionEmpleados.style.display = 'flex';
        sectionHome.style.display = 'none';
    }else{
        sectionEmpleados.style.display = 'none';
    }
}


document.addEventListener('DOMContentLoaded', function() {
    allEmpleados = [];
    cargarEmpleados();
    const nombreBuscador = document.getElementById('buscador-nombre');
    const apellidoBuscador = document.getElementById('buscador-apellido');
    const tableBody = document.getElementById('tabla-empleados-datos');
    
    // funcion para busqueda de empleados
    function buscarEmpleados() {
        const nombre = nombreBuscador.value.toLowerCase();
        const apellido = apellidoBuscador.value.toLowerCase();  
        const empleadosFiltrados = allEmpleados.filter(empleado => {
            return empleado.nombre.toLowerCase().startsWith(nombre) && empleado.apellido.toLowerCase().startsWith(apellido);
        });

        tableBody.innerHTML = "";
        if (empleadosFiltrados.length === 0) {
            tableBody.innerHTML = "No se encontraron resultados";
        } else {
            empleadosFiltrados.forEach(empleado => {
                const newRow = document.createElement('tr');
                newRow.addEventListener('click', () => rellenarFormulario(empleado)); 
                const tdID = document.createElement('td');
                tdID.textContent = `${empleado.id_empleado}`;
                newRow.appendChild(tdID);
                const tdNombre = document.createElement('td');
                tdNombre.textContent = `${empleado.nombre}`;
                newRow.appendChild(tdNombre);
                const tdApellido = document.createElement('td');
                tdApellido.textContent = `${empleado.apellido}`;
                newRow.appendChild(tdApellido);
                tableBody.appendChild(newRow);
            });
        }

    }
    nombreBuscador.addEventListener('input', buscarEmpleados);
    apellidoBuscador.addEventListener('input', buscarEmpleados);

});


const cargarDetalleTareas = (idEmpleado) => {
    axios.get(`${urlBase}/detalletareas/empleado/${idEmpleado}`).then(response => {
        const dataDetalleTareas = response.data;
        dataDetalleTareas.forEach(tareaPorEmpleado => {
            cargarTareas(tareaPorEmpleado.id_tarea);
        })
    }).catch(error => console.error("No se pudo obtener las tareas del empleado. ",error));
}

const cargarDetalleTareasPorEmpleado = (idEmpleado) => {
    estadoInicialTareas = [];
    axios.get(`${urlBase}/detalletareas/empleado/${idEmpleado}`).then(response => {
        const dataDetalleTareas = response.data;
        dataDetalleTareas.forEach(tareaPorEmpleado => {
            estadoInicialTareas.push(tareaPorEmpleado);
        })
    }).catch(error => console.error("No se pudo obtener las tareas del empleado. ",error));
}

const cargarTareas = (idTarea) => {
    axios.get(`${urlBase}/tareas/${idTarea}`).then(response => {
        const dataTarea = response.data;
        tareasCheckbox.forEach(tarea => {
            const tareaId = parseInt(tarea.dataset.id_tarea);
            if(tareaId === dataTarea.id_tarea){
                tarea.checked = true;
            }
        });
    }).catch(error => console.error("No se pudo obtener las tareas del empleado. ",error));
}

const cargarEmpleados = () => {
    axios.get(`${urlBase}/empleados`)
    .then(response => {
        const data = response.data;
        const tableBody = document.getElementById('tabla-empleados-datos');
        tableBody.innerHTML = "";
        data.sort((a, b) => {
            if (a.nombre.toLowerCase() < b.nombre.toLowerCase()) return -1;
            if (a.nombre.toLowerCase() > b.nombre.toLowerCase()) return 1;
            return 0;
        });
        data.forEach(empleado => {
            const row = document.createElement('tr');
            row.addEventListener('click', () => rellenarFormulario(empleado)); 
            const cellId = document.createElement('td');
            cellId.textContent = empleado.id_empleado;
            row.appendChild(cellId);
            const cellName = document.createElement('td');
            cellName.textContent = empleado.nombre;
            row.appendChild(cellName);
            const cellSubname = document.createElement('td');
            cellSubname.textContent = empleado.apellido;
            row.appendChild(cellSubname);
            tableBody.appendChild(row);
            allEmpleados.push(empleado);
            idsEmpleados.push(empleado.id_empleado);
            nombresEmpleados.push(empleado.nombre);
            apellidosEmpleados.push(empleado.apellido); 
        });
    })
    .catch(error => console.error('Error fetching data:', error));
}



const mostrarTutor = () => {
    tutorInput.style.visibility = 'visible';
}

const ocultarTutor = () => {
    tutorInput.style.visibility = 'hidden';
    tutorInput.value = "";
}

// funcion para rellenar formulario al clickear una fila de un empleado
const rellenarFormulario = (empleado) => {
    deshabilitarFormulario();
    limpiarFormulario();
    document.getElementById('boton-crear').style.visibility = 'hidden';
    document.getElementById('boton-guardar-cambios').style.visibility = 'hidden';
    document.getElementById('boton-editar').style.visibility = 'visible';
    idInput.value = empleado.id_empleado;
    nombreInput.value = empleado.nombre;
    apellidoInput.value = empleado.apellido;
    celularInput.value = empleado.celular;
    if(empleado.genero === 'masculino') masculinoRadio.checked = true;
    else femeninoRadio.checked = true;
    if(empleado.tutor === null){
        noRadio.checked = true;
        tutorInput.style.visibility = 'hidden';
    }    
    else {
        siRadio.checked = true;
        tutorInput.style.visibility = 'visible';
        tutorInput.value = empleado.tutor;
    }
    cargarDetalleTareas(idInput.value);
}

const habilitarFormulario = () => {
    nombreInput.disabled = false;
    apellidoInput.disabled = false;
    celularInput.disabled = false;
    masculinoRadio.disabled = false;
    femeninoRadio.disabled = false;
    siRadio.disabled = false;
    noRadio.disabled = false;
    tutorInput.disabled = false;
    PCsoCheckbox.disabled = false;
    PClimpiezaCheckbox.disabled = false;
    PCvirusCheckbox.disabled = false;
    PCdiagnosticoCheckbox.disabled = false;
    PCcambioCheckbox.disabled = false;
    NBsoCheckbox.disabled = false;
    NBlimpiezaCheckbox.disabled = false;
    NBvirusCheckbox.disabled = false;
    NBdiagnosticoCheckbox.disabled = false;
    NBcambioCheckbox.disabled = false;
    flasheoCheckbox.disabled = false;
    bateriaCheckbox.disabled = false;
    pantallaCheckbox.disabled = false;
    templadoCheckbox.disabled = false;
    clientesCheckbox.disabled = false;
    presupuestarCheckbox.disabled = false;
    ventaCheckbox.disabled = false;
    proveedoresCheckbox.disabled = false;
}

const deshabilitarFormulario = () => {
    nombreInput.disabled = true;
    apellidoInput.disabled = true;
    celularInput.disabled = true;
    masculinoRadio.disabled = true;
    femeninoRadio.disabled = true;
    siRadio.disabled = true;
    noRadio.disabled = true;
    tutorInput.disabled = true;
    PCsoCheckbox.disabled = true;
    PClimpiezaCheckbox.disabled = true;
    PCvirusCheckbox.disabled = true;
    PCdiagnosticoCheckbox.disabled = true;
    PCcambioCheckbox.disabled = true;
    NBsoCheckbox.disabled = true;
    NBlimpiezaCheckbox.disabled = true;
    NBvirusCheckbox.disabled = true;
    NBdiagnosticoCheckbox.disabled = true;
    NBcambioCheckbox.disabled = true;
    flasheoCheckbox.disabled = true;
    bateriaCheckbox.disabled = true;
    pantallaCheckbox.disabled = true;
    templadoCheckbox.disabled = true;
    clientesCheckbox.disabled = true;
    presupuestarCheckbox.disabled = true;
    ventaCheckbox.disabled = true;
    proveedoresCheckbox.disabled = true;
}

//variables creadas para ver si se cambia el nombre o apellido a editar antes de clickear para guardar cambios
let estadoInicialTareas = [];
let nombreAntesDeEditar = "";
let apellidoAntesDeEditar = "";
const editarEmpleado = () => {
    nombreAntesDeEditar = "";
    apellidoAntesDeEditar = "";
    cargarDetalleTareasPorEmpleado(idInput.value);
    habilitarFormulario();
    document.getElementById('boton-guardar-cambios').style.visibility = 'visible';
    document.getElementById('boton-crear').style.visibility = 'hidden';
    nombreAntesDeEditar = nombreInput.value;
    apellidoAntesDeEditar = apellidoInput.value;
}

const putEmpleado = () => {
    let validacion = validarFormulario(false);
    if(validacion){
    let estadoFinalTareas = [];
    tareasCheckbox.forEach(tarea => {
        if(tarea.checked === true){
            estadoFinalTareas.push(tarea.dataset.id_tarea);
        }
    });
    let idEmpleado = idInput.value;
    let empleado = cargarDatosFormulario();
    const tareasAAgregar = estadoFinalTareas.filter(idTarea => !estadoInicialTareas.some(t => t.id_tarea === parseInt(idTarea)));
    let ban = false;
    for(let i = 0; i<estadoInicialTareas.length;i++){
        for(let j=0;j<estadoFinalTareas.length;j++){
        ban = false;
            if(parseInt(estadoInicialTareas[i].id_tarea) === parseInt(estadoFinalTareas[j])){
                ban = true;
            }
        }
        if(ban === false){
            axios.delete(`${urlBase}/detalletareas/${estadoInicialTareas[i].id_detalle_tarea}`).then(response => {
                console.log(`TAREA ELIMINADA`);
            })
            .catch(error => console.error("No se pudo eliminar la tarea ", error));
        }
    }

    axios.put(`${urlBase}/empleados/${idEmpleado}`, empleado).then(response => {
        tareasAAgregar.forEach(tareaAdd => {
            const detalleTarea = {
                id_empleado: idEmpleado,
                id_tarea: parseInt(tareaAdd),
            }
            axios.post(`${urlBase}/detalletareas`, detalleTarea).then(response => {
                console.log(`TAREA AGREGADA`);
            })
            .catch(error => console.error("No se pudo agregar la tarea ", error));;
        });

    
        alert("Empleado modificado exitosamente");
        updateEmpleados();
    }).catch(error => console.error('Error al modificar el empleado: ', error));
    }
}

const limpiarFormulario = () => {
    nombreInput.value = "";
    apellidoInput.value = "";
    celularInput.value = "";
    masculinoRadio.checked = false;
    femeninoRadio.checked = false;
    siRadio.checked = false;
    noRadio.checked = false;
    tutorInput.value = "";
    PCsoCheckbox.checked = false;
    PClimpiezaCheckbox.checked = false;
    PCvirusCheckbox.checked = false;
    PCdiagnosticoCheckbox.checked = false;
    PCcambioCheckbox.checked = false;
    NBsoCheckbox.checked = false;
    NBlimpiezaCheckbox.checked = false;
    NBvirusCheckbox.checked = false;
    NBdiagnosticoCheckbox.checked = false;
    NBcambioCheckbox.checked = false;
    flasheoCheckbox.checked = false;
    bateriaCheckbox.checked = false;
    pantallaCheckbox.checked = false;
    templadoCheckbox.checked = false;
    clientesCheckbox.checked = false;
    presupuestarCheckbox.checked = false;
    ventaCheckbox.checked = false;
    proveedoresCheckbox.checked = false;
    tareasEmpleado = [];
    document.getElementById('boton-editar').style.visibility = 'hidden';
    document.getElementById('boton-guardar-cambios').style.visibility = 'hidden';
}


const crearEmpleado = () => {
    limpiarFormulario();
    habilitarFormulario();
    cleanId();
    document.getElementById('boton-crear').style.visibility = 'visible';
    document.getElementById('boton-guardar-cambios').style.visibility = 'hidden';
    document.getElementById('boton-editar').style.visibility = 'hidden';
}

const saveEmpleado = () => {
    let validacion = validarFormulario(true);
    if(validacion){
        let empleado = cargarDatosFormulario();
        axios.post(`${urlBase}/empleados`, empleado).then(response => {
            tareasCheckbox.forEach(tarea => {
                if(tarea.checked === true){
                    const detalleTarea = {
                        id_empleado: response.data.id_empleado,
                        id_tarea: parseInt(tarea.dataset.id_tarea),
                    }
                    axios.post(`${urlBase}/detalletareas`, detalleTarea);
                }
            });
            alert("Empleado registrado exitosamente");
            updateEmpleados();
        }).catch(error => console.error('No se pudo crear al empleado: ',error))
    }
}

const cargarDatosFormulario = () => {
    let generoEmpleado;
    let tutorEmpleado;
    if(masculinoRadio.checked) generoEmpleado = "masculino";
    else generoEmpleado = "femenino";
    if(noRadio.checked) tutorEmpleado = ""; 
    else tutorEmpleado = tutorInput.value;
    const empleado = {
        nombre: nombreInput.value,
        apellido: apellidoInput.value,
        celular: celularInput.value,
        genero: generoEmpleado,
        tutor:  tutorEmpleado
    }
    return empleado;
}

const cleanId=()=>{
    idInput.value = "";
}

const borrarEmpleado = () => {
    let idEmpleado = idInput.value;
    let empleado = cargarDatosFormulario();
    if(idEmpleado === ""){
        alert("Debe seleccionar un empleado");
    }else{
        let ban = confirm(`Desea eliminar al empleado ID ${idEmpleado} - ${empleado.nombre} ${empleado.apellido}?`);
        if(ban){
            axios.delete(`${urlBase}/detalletareas/empleado/${idEmpleado}`).then(response => {
                console.log(`Tarea eliminada`);
            })
            .catch(error => console.error("No se pudo eliminar la tarea ", error));
            axios.delete(`${urlBase}/empleados/${idEmpleado}`).then(response =>{
                alert("Empleado eliminado");
                updateEmpleados();
            }).catch(error => {
                alert("No se pudo eliminar al empleado. ", error);
            })
        }
    }
}

const updateEmpleados = () => {
    cargarEmpleados();
    limpiarFormulario();
    deshabilitarFormulario();
    cleanId();
}

const validarFormulario = (vdCreate) => {
    let banValidacion = true;
    let alertaValidacion = "ERROR \n"
    let banId = false;
    let banTareas = false;
    let banNombre = false;
    let banNombreEdit = false;
    let banApellidoEdit = false;
    let vdCreateForm = vdCreate;
    //validacion nombre y apellido para crear empleado (que cumpla con la cantidad de caracteres)
    if(nombreInput.value.length < 2 || nombreInput.value.length > 15){
        alertaValidacion += "- Debe ingresar un nombre valido.\n";
    }
    if(apellidoInput.value.length < 2 || apellidoInput.value.length > 15){
        alertaValidacion += "- Debe ingresar un apellido valido.\n";
    }

    //validacion nombre y apellido para crear empleado (que no exista uno ya con el mismo nombre y apellido)
    if(vdCreateForm){
        allEmpleados.forEach(empleado => {
            if(empleado.nombre === nombreInput.value){
                if(empleado.apellido === apellidoInput.value){
                    banNombre = true;
                }
            }
        })
    }
    if(banNombre) alertaValidacion += "- Ya se encuentra registrado un empleado con ese nombre y apellido. \n";


    //validacion nombre y apellido para editar empleado (que no exista uno ya con el mismo nombre y apellido)

    if(nombreAntesDeEditar !== nombreInput.value){
        allEmpleados.forEach(empleado => {
            if(empleado.nombre === nombreInput.value){
                if(empleado.apellido === apellidoInput.value){
                    banNombreEdit = true;
                }
            }
        })
    }
    if(banNombreEdit) alertaValidacion += "- Ya se encuentra registrado un empleado con ese nombre y apellido.\n";


    if(apellidoAntesDeEditar !== apellidoInput.value){
        allEmpleados.forEach(empleado => {
            if(empleado.apellido === apellidoInput.value){
                if(empleado.nombre === nombreInput.value){
                    banApellidoEdit = true;
                }
            }
        })
    }
    if(banApellidoEdit) alertaValidacion += "- Ya se encuentra registrado un empleado con ese nombre y apellido. \n";



    if(celularInput.value.length > 0){
        if(celularInput.value.length < 8 || celularInput.value.length > 12){
            alertaValidacion += "- Debe ingresar un numero de celular valido.\n";
        }
    }
    if(masculinoRadio.checked === false && femeninoRadio.checked === false){
        alertaValidacion += "- Debe seleccionar un genero.\n";
    }
    if(siRadio.checked === false && noRadio.checked === false){
        alertaValidacion += "- Debe seleccionar si tiene o no un tutor.\n";
    }else if(siRadio.checked){
        if(tutorInput.value.length === 0){
        alertaValidacion += "- Debe escribir un ID de tutor.\n";
        }else{
            idsEmpleados.forEach(id => {
                if(parseInt(id) === parseInt(tutorInput.value)){
                    banId = true;
                }
            })
        if(banId === false ) alertaValidacion += "- Debe escribir un ID de tutor existente.\n";
        }
    }


    tareasCheckbox.forEach(tarea => {
        if(tarea.checked === true){
            banTareas = true;
        }
    })
    if(banTareas === false) alertaValidacion += "- Debe seleccionar al menos una tarea.\n";


    if(alertaValidacion.length > 7){
        alert(`${alertaValidacion}`);
        banValidacion = false;
    }else banValidacion = true;
    return banValidacion
}

