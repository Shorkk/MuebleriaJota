import { productos } from "./productos.js";

export function cargarDetalleProducto() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const producto = productos.find(p => p.id === id);
    const contenedor = document.getElementById("detalle");

    if (producto && contenedor) {
        contenedor.innerHTML = `
            <h2>${producto.nombre}</h2>
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <p><strong>Precio:</strong> $${producto.precio}</p>
            <p><strong>Stock:</strong> ${producto.stock}</p>
        `;
        const opcionales = [
            {clave:"detalle", titulo:"Detalle"},
            {clave:"medidas", titulo:"Medidas"},
            {clave:"materiales", titulo:"Materiales"},
            {clave:"acabado", titulo:"Acabado"},
            {clave:"peso", titulo:"Peso"},
            {clave:"capacidad", titulo:"Capacidad"},
            {clave:"modulares", titulo:"Modulares"},
            {clave:"tapizado", titulo:"Tapizado"},
            {clave:"confort", titulo:"Confort"},
            {clave:"rotacion", titulo:"Rotación"},
            {clave:"garantia", titulo:"Garantía"},
            {clave:"cargaMaxima", titulo:"Carga Máxima"},
            {clave:"almacenamiento", titulo:"Almacenamiento"},
            {clave:"caracteristicas", titulo:"Características"},
            {clave:"colchon", titulo:"Colchón"},
            {clave:"relleno", titulo:"Relleno"},
            {clave:"sostenibilidad", titulo:"Sostenibilidad"},
            {clave:"extension", titulo:"Extensión"},
            {clave:"aplicables", titulo:"Aplicables"},
            {clave:"incluye", titulo:"Incluye"},
            {clave:"cables", titulo:"Cables"},
            {clave:"regulacion", titulo:"Regulación"},
            {clave:"certificacion", titulo:"Certificación"}
        ];

        opcionales.forEach(prop => {
            if (producto[prop.clave]) {
                contenedor.innerHTML += `<p><strong>${prop.titulo}:</strong> ${producto[prop.clave]}</p>`;
            }
        });
    } else {
        contenedor.innerHTML = "<p>Producto no encontrado</p>";
    }
}
