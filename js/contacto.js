export function mostrarMensajeExito() {
  const mensaje = document.getElementById("mensajeExito");
  mensaje.style.display = "flex"; // lo muestra como overlay
}

export function ocultarMensajeExito() {
  const mensaje = document.getElementById("mensajeExito");
  mensaje.style.display = "none"; // lo oculta
}

export function validarFormulario(formulario) {

  const nombre = document.getElementById('nombreUsuario').value.trim();
  const email = document.getElementById('emailUsuario').value.trim();
  const mensaje = document.getElementById('mensajeUsuario').value.trim();

  let errores = [];

  // Validacion de nombre
  if (!nombre) errores.push('Nombre no completado.');
  else if (nombre.length < 3) errores.push('El nombre debe tener al menos 3 caracteres.');

  // Validacion de email
  if (!email) errores.push('Email no completado.');
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errores.push('Correo electrónico inválido.'); // El email debe contener caracteres válidos + arroba + caracteres válidos + punto + caracteres válidos

  // Validacion de mensaje
  if (!mensaje) errores.push('Mensaje no completado.');

  if (errores.length > 0) {
        let mensajeError = errores.join('\n'); // Concatena los errores en un solo mensaje separado por saltos de línea
        alert(mensajeError);
        return false;
    }
    return true;
}