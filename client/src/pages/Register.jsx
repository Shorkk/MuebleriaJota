// src/components/CrearUser.jsx
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
// import { useAppContext } from "../context/AppContext";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const initialValues = {
    nombre: "",
    email: "",
    password: "",
    role: "",
  };

  const validationSchema = Yup.object({
    nombre: Yup.string().required("El nombre es obligatorio"),
    email: Yup.string()
      .email("Email inválido")
      .required("El email es obligatorio"),
    password: Yup.string()
      .min(8, "Mínimo 8 caracteres")
      .required("La contraseña es obligatoria"),
    roles: Yup.string().min(1, "Selecciona un rol"),
  });

  const handleSubmit = async (values, { resetForm }) => {

    try {
      const response = await fetch("http://localhost:3000/api/auth/register", { // Apunta al endpoint de backend
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values), // values contiene { nombre, email, password, role }
      });

      if (!response.ok) { // Manejar errores del servidor (ej: usuario ya existe)
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      console.log(data);
    //   toast.success("Usuario creado con éxito!");
      resetForm();
      //redirigir al usuario
    } catch (error) {
      console.log(`Error en el registro: ${error.message}`);
      // toast.error("No se pudo crear el usuario :(");
    }
  };

  return (
    <>
      <h2>Crear Usuario</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <Field name="nombre" placeholder="Nombre" />
              <ErrorMessage name="nombre" component="div" className="error" />
            </div>

            <div>
              <Field name="email" placeholder="Email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>

            <div>
              <Field name="password" type="password" placeholder="Password" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>

            <label>Tipo de Usuario:</label>
            <Field as="select" name="role">
              <option value="" disabled>Seleccionar tipo</option>
              <option value="admin">Admin</option>
              <option value="usuario">Común</option>
            </Field>
            <ErrorMessage name="role" component="div" />

            <button type="submit" disabled={isSubmitting}>
              Registrarme
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Register;