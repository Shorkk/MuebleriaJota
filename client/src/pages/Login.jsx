import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import { useAuthContext } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Email inválido")
      .required("El email es obligatorio"),
    password: Yup.string()
      .min(6, "Mínimo 6 caracteres")
      .required("La contraseña es obligatoria"),
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(formData, { abortEarly: false });

      await login(formData);
      toast.success("Usuario logeado con éxito!");

      setFormData({ email: "", password: "" });
      setErrors({});
      const redirectPath = location.state?.from || "/"; // Para que se redireccione a la página anterior o a home
      navigate(redirectPath);

    } catch (error) {
      if (error.name === "ValidationError") {
        const newErrors = {};
        error.inner.forEach(err => {
          newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
      } else {
        console.error(`Error en el login: ${error.message}`);
        toast.error("No se pudo logear el usuario :(");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <div className="error">{errors.email}</div>}
      </div>

      <div>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <div className="error">{errors.password}</div>}
      </div>

      <button type="submit">
        Ingresar
      </button>
    </form>
  );
};

export default Login;

// import React from "react"
// // import { Formik, Form, Field, ErrorMessage } from "formik"
// import { toast } from "react-toastify"
// import "react-toastify/dist/ReactToastify.css"
// import * as Yup from "yup"
// import { useAuthContext } from "../context/AuthContext"
// import { useNavigate } from "react-router-dom"


// const Login = () => {
//   const {login} = useAuthContext()
//   const initialValues = {
//     email: "",
//     password: "",
//   };

//   const validationSchema = Yup.object({
//     email: Yup.string()
//       .email("Email inválido")
//       .required("El email es obligatorio"),
//     password: Yup.string()
//       .min(6, "Mínimo 6 caracteres")
//       .required("La contraseña es obligatoria"),
//   });

//   const navigate = useNavigate();

//   const handleSubmit = async (values, { resetForm }) => {
//     try{
//         await login(values)
//         toast.success("Usuario logeado con éxito!")
//         resetForm()

//         setTimeout(() => {
//             navigate("/") // Redirigir al usuario a la página Home 2seg después del login exitoso
//         }, 2000)

//     } catch (error) {
//       console.log(`Error en el login: ${error.message}`);
//        toast.error("No se pudo logear el usuario :(");
//     }
//   };

//   return (
//     <>
//       <Formik
//         initialValues={initialValues}
//         validationSchema={validationSchema}
//         onSubmit={handleSubmit}
//       >
//         {({ isSubmitting }) => (
//           <Form>
//             <div>
//               <Field name="email" placeholder="Email" />
//               <ErrorMessage name="email" component="div" className="error" />
//             </div>

//             <div>
//               <Field name="password" type="password" placeholder="Password" />
//               <ErrorMessage name="password" component="div" className="error" />
//             </div>

//             <button type="submit" disabled={isSubmitting}>
//               Ingresar
//             </button>
//           </Form>
//         )}
//       </Formik>
//     </>
//   );
// };

// export default Login