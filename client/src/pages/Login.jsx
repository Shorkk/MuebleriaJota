import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import { useAuthContext } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

const Login = () => {
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Email inválido").required("El email es obligatorio"),
    password: Yup.string().min(8, "Mínimo 8 caracteres").required("La contraseña es obligatoria"),
  });

  const handleSubmit = async (formData, {resetForm}) => {
    try {
      await login(formData);
      toast.success("Usuario logeado con éxito!");
      resetForm();
      // Redirección
      const redirectPath = location.state?.from || "/";
      navigate(redirectPath);
    } catch (error) {
      console.error(`Error en el login: ${error.message}`);
      toast.error("No se pudo logear el usuario :(");
    }
  };

  return (
    <>
    <h1>LOGIN DE USUARIO</h1>
    <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={handleSubmit}
    >
    {({ isSubmitting }) => (
    <Form>
      <div>
        <Field type="email" name="email" placeholder="Email"/>
        <ErrorMessage name="email" component="div" className="error-message" />
      </div>
      <div>
        <Field type="password" name="password" placeholder="Password"/>
        <ErrorMessage name="password" component="div" className="error-message"/>
      </div>
      <button type="submit" disabled={isSubmitting}>
        INGRESAR
      </button>
    </Form>
    )}
    </Formik>
    <br></br>
    <h4>¿No tienes una cuenta?</h4>
    <h4 className="register-login-link"><NavLink to="/register">Regístrate aquí</NavLink></h4>
    </>
  );
};

export default Login;