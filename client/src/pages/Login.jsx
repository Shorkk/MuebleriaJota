import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import { useAuthContext } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  // Estado de formulario
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  // Manejo de inputs
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  // Yup schema
  const validationSchema = Yup.object({
    email: Yup.string().email("Email inválido").required("El email es obligatorio"),
    password: Yup.string().min(6, "Mínimo 6 caracteres").required("La contraseña es obligatoria"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault(); // acá sí corresponde

    try {
      // Validación Yup
      await validationSchema.validate(values);

      // Login del backend
      await login(values);

      toast.success("Usuario logeado con éxito!");

      // Limpio formulario
      setValues({ email: "", password: "" });

      // Redirección
      const redirectPath = location.state?.from || "/";
      navigate(redirectPath);

    } catch (error) {
      if (error.name === "ValidationError") {
        toast.error(error.message);
        return;
      }

      console.error(`Error en el login: ${error.message}`);
      toast.error("No se pudo logear el usuario :(");
    }
  };

  return (
    <>
    <h1>LOGIN DE USUARIO</h1>
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
        />
      </div>

      <div>
        <input
          type="text"
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
        />
      </div>

      <button type="submit">
        INGRESAR
      </button>
    </form>
    </>
  );
};

export default Login;