import React from "react";
import {Link} from "react-router-dom"
import { useAuthContext } from "../context/AuthContext";

const NavBar = () => {
  const {user, logout} = useAuthContext()
  const handleLogout = () => {
    // toast.error("Acabas de cerrar tu sesión.")
    logout()
  }

  return (
    <nav>
      {user ? (
        <>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/register">Crear usuarios</Link></li>
          <li> <button onClick={handleLogout}>Logout</button></li>
        </ul>
          <span>Hola {user.nombre}!</span>
         
        </>
      ) : (
        <>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/register">Crear Usuarios</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="catalog">Catálogo</Link></li>
          {/* <li><Link to="cart">Carrito</Link></li> */}
          <li><Link to="contact">Contacto</Link></li>
        </ul>
          
        </>
      )}
    </nav>
  );
};

export default NavBar;