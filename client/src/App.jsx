// import { useState } from 'react'
import './App.css'

import { useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import { useAuthContext } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import HomePage from "./pages/HomePage"
import Register from "./pages/Register"
import Login from "./pages/Login"
import CartPage from "./pages/CartPage.jsx"
import Detalle from "./pages/Detalle.jsx"

import UserProfile from "./components/UserProfile.jsx"
import NavBar from './components/NavBar.jsx'
import Catalogo from "./pages/Catalogo.jsx"
import Contacto from "./pages/Contacto.jsx"


function App() {

  const {isAdmin} = useAuthContext()

  useEffect(()=>{},[isAdmin])

  return (
    <>
      <header>
        <NavBar/>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/my-profile" element={<UserProfile />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/producto/:id" element={<Detalle />} />
        </Routes>
      </main>

      <footer className="footer">
        <div className="footer__info">
          <p>&copy; 2025 Hermanos Jota - Todos los derechos reservados</p>
          <p>
            Contacto:
            <a href="mailto:brand@hermanosjota.com">brand@hermanosjota.com</a>
          </p>
        </div>
        <div className="footer__social">
          <a href="#">Instagram</a> | <a href="#">Facebook</a>
        </div>
      </footer>
            <ToastContainer />
    </>
  );
}

{/* <Route path="/register" element={ 
  isAdmin ? (<Register /> ) :
  ( <p>No puedes acceder a esta página, necesitas ser "admin"</p> )
} /> */}

export default App