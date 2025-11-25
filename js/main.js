// CATÁLOGO 
import { cargarCatalogo } from "./catalogo.js";

document.addEventListener("DOMContentLoaded", ()=>{
    const catalogo = document.getElementById("catalogo")
    if(catalogo ){
        fetch("../data/producto.json")
        .then(res=> res.json())
        .then(data=> cargarCatalogo(data) )
        .catch(err => console.error("Error al cargar productos:", err))
    }   
})

// DETALLE
import { cargarDetalleProducto } from "./detalle.js";
document.addEventListener("DOMContentLoaded", () => {
    const contenedorDetalle = document.getElementById("detalle");
    if (contenedorDetalle) {
        cargarDetalleProducto();
    }
});


// CONTACTO
import { validarFormulario, mostrarMensajeExito, ocultarMensajeExito } from "./contacto.js"

const formularioContacto = document.getElementById("formularioContacto");
const botonCerrar = document.getElementById("cerrarMensaje");

formularioContacto.addEventListener("submit", function(event) {
    event.preventDefault(); // Evita el envío del formulario

    if (validarFormulario(formularioContacto)) {
        mostrarMensajeExito();
        formularioContacto.reset();
    }
});

botonCerrar.addEventListener("click", function() {
    ocultarMensajeExito();
});