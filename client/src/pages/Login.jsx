import React from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import * as Yup from "yup"
import { useAuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"


const Login = () => {
  const {login} = useAuthContext()
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Email inválido")
      .required("El email es obligatorio"),
    password: Yup.string()
      .min(6, "Mínimo 6 caracteres")
      .required("La contraseña es obligatoria"),
  });

  const navigate = useNavigate();

  const handleSubmit = async (values, { resetForm }) => {
    try{
        await login(values)
        toast.success("Usuario logeado con éxito!")
        resetForm()

        setTimeout(() => {
            navigate("/") // Redirigir al usuario a la página Home 2seg después del login exitoso
        }, 2000)

    } catch (error) {
      console.log(`Error en el login: ${error.message}`);
       toast.error("No se pudo logear el usuario :(");
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <Field name="email" placeholder="Email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>

            <div>
              <Field name="password" type="password" placeholder="Password" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>

            <button type="submit" disabled={isSubmitting}>
              Ingresar
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Login