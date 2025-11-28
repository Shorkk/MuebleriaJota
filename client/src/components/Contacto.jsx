import { useState } from "react";
import "../styles/contacto.css";
// import {Formik, Form, Field, ErrorMessage} from 'Formik';
import * as yup from 'yup';

const schema = yup.object().shape({
  nombre: yup
  .string().required("El nombre es obligatorio"),
  email: yup
  .string().email("Correo electrónico inválido")
  .required("El email es obligatorio"),
  mensaje: yup
  .string().required("El mensaje es obligatorio"),
});

function Contacto() {
  const [formData, setFormData] = useState({
    nombre:'',
    email:'',
    mensaje:'',
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("datos:", formData)

    let errores = [];

    // Validación de nombre
    if (!formData.nombre.trim()) errores.push("Nombre no completado.");
    else if (formData.nombre.trim().length < 3)
      errores.push("El nombre debe tener al menos 3 caracteres.");

    // Validación de email
    if (!formData.email.trim()) errores.push("Email no completado.");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()))
      errores.push("Correo electrónico inválido.");

    // Validación de mensaje
    if (!formData.mensaje.trim()) errores.push("Mensaje no completado.");

    if (errores.length > 0) {
      alert(errores.join("\n"));
      return;
    }

    try {
      const response = await fetch('https://api.ejemplo.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('El registro falló.');
      }

      const result = await response.json();
      alert(`¡Gracias ${result.nombre} ! Su consulta fue enviada con éxito. \nNos pondremos en contacto a la brevedad.`);
      // Limpiar el formulario después del envío
      setFormData({ nombre: '', email: '', mensaje: '' });
 
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <h1 id="titulo-contacto">ENVIAR UNA CONSULTA</h1>
      <h4 className="subtitulo-contacto">
        Estamos aquí para escucharte y acompañarte, con la misma dedicación con
        la que damos forma a cada pieza.
      </h4>
      <h4 className="subtitulo-contacto">
        Compartinos tus dudas o inquietudes aquí abajo y nos pondremos en
        contacto para resolverlas juntos.
      </h4>

      <form id="formularioContacto" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombreUsuario">NOMBRE</label>
          <input
            type="text"
            id="nombreUsuario"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="emailUsuario">CORREO ELECTRÓNICO</label>
          <input
            type="text"
            id="emailUsuario"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="mensajeUsuario">MENSAJE</label>
          <textarea
            id="mensajeUsuario"
            name="mensaje"
            rows="5"
            value={formData.mensaje}
            onChange={handleChange}
          />
        </div>

        <button type="submit">ENVIAR</button>
      </form>
    </>
  );
}

export default Contacto