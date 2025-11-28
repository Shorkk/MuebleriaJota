// import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    role: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

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

  const validateForm = async () => {
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      return {};
    } catch (validationErrors) {
      const formattedErrors = {};
      validationErrors.inner.forEach((err) => {
        formattedErrors[err.path] = err.message;
      });
      return formattedErrors;
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const validationErrors = await validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setSubmitting(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      toast.success("Usuario creado con éxito!");

      // Reset form
      setFormData({
        nombre: "",
        email: "",
        password: "",
        role: "",
      });

      navigate("/login");

    } catch (error) {
      console.error("Error en el registro:", error.message);
      toast.error("No se pudo crear el usuario :(");
    }

    setSubmitting(false);
  };

  return (
    <>
      <h2>Crear Usuario</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
          {errors.nombre && <div className="error">{errors.nombre}</div>}
        </div>

        <div>
          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>

        <div>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <div className="error">{errors.password}</div>}
        </div>

        <label>Tipo de Usuario:</label>
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="" disabled>
            Seleccionar tipo
          </option>
          <option value="admin">Admin</option>
          <option value="usuario">Común</option>
        </select>
        {errors.role && <div className="error">{errors.role}</div>}

        <button type="submit" disabled={submitting}>
          Registrarme
        </button>
      </form>
    </>
  );
};

export default Register;