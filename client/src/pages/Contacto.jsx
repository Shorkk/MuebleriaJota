// import "../styles/contacto.css";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as yup from 'yup';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const Contacto = () => {
  const initialValues = {
    nombre:'',
    email:'',
    mensaje:'',
  }

  const validationSchema = yup.object().shape({
  nombre: yup
  .string().min(3, "Mínimo 3 caracteres").required("El nombre es obligatorio"),
  email: yup
  .string().email("Correo electrónico inválido")
  .required("El email es obligatorio"),
  mensaje: yup
  .string().required("El mensaje es obligatorio"),
});

  const handleSubmit = async (formData, {resetForm}) => {
    try {
      const response = await fetch(`${BASE_URL}/api/contacto`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      console.log("Consulta enviada:", formData);
      toast.success(`¡Gracias ${formData.nombre}! Su consulta fue enviada con éxito. \nNos pondremos en contacto a la brevedad.`);
      resetForm();
    } catch (error) {
      console.error("Error en el envío de la consulta:", error.message);
      toast.error('Error al enviar la consulta');
    }
  };

  return (
    <>
      <h1>ENVIAR UNA CONSULTA</h1>
      <h4>
        Estamos aquí para escucharte y acompañarte, con la misma dedicación con
        la que damos forma a cada pieza.
      </h4>
      <h4>
        Compartinos tus dudas o inquietudes aquí abajo y nos pondremos en
        contacto para resolverlas juntos.
      </h4>
    <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
      <Form>
        <div>
          <ErrorMessage name="nombre" component="div" className="error" />
          <Field type="text" name="nombre" placeholder="Nombre"/>
        </div>
        <div>
          <ErrorMessage name="email" component="div" className="error" />
          <Field type="email" name="email" placeholder="Correo electrónico"/>
        </div>
        <div>
          <ErrorMessage name="mensaje" component="div" className="error" />
          <Field as="textarea" name="mensaje" placeholder="Mensaje" rows="5"/>
        </div>

        <button type="submit" disabled={isSubmitting}>ENVIAR</button>
      </Form>
      )}
      </Formik>
    </>
  );
}

export default Contacto