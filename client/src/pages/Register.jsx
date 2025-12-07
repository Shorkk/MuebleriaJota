import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const Register = () => {
  const navigate = useNavigate();

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
    role: Yup.string().required("Selecciona un rol"),
  });


  const handleSubmit = async (formData, { resetForm }) => {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      console.log("Usuario registrado:", data);
      toast.success("Usuario creado con éxito!");
      resetForm();
      navigate("/login");

    } catch (error) {
      console.error("Error en el registro:", error.message);
      toast.error("No se pudo crear el usuario :(");
    }
  };

  return (
    <>
      <h1>CREAR USUARIO</h1>
      <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
      <Form>
        <div>
          <Field name="nombre" type="text" placeholder="Nombre" />
          <ErrorMessage name="nombre" component="div" className="error" />
        </div>
        <div>
          <Field name="email" type="email" placeholder="Email" />
          <ErrorMessage name="email" component="div" className="error" />
        </div>
        <div>
          <Field name="password" type="password" placeholder="Password" />
          <ErrorMessage name="password" component="div" className="error" />
        </div>

        <h4>Tipo de Usuario:</h4>
        <Field as="select" name="role">
          <option value="" disabled>
            Seleccionar tipo
          </option>
          <option value="admin">Admin</option>
          <option value="usuario">Común</option>
        </Field>
        <ErrorMessage name="role" component="div" className="error" />
        <button type="submit" disabled={isSubmitting}>REGISTRARME</button>
      </Form>
    )}
    </Formik>
          <br></br>
    <h4>¿Ya tienes una cuenta?</h4>
    <h4 className="redirect-link"> <NavLink to="/login">Inicia sesión aquí</NavLink></h4>
    </>
  );
};

export default Register;