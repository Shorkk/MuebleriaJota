// import { useState } from 'react'
import './index.css'

import {useEffect} from "react"
import { Routes, Route } from "react-router-dom"
import { useAuthContext } from "./context/AuthContext";

import HomePage from "./pages/HomePage"
import Register from "./pages/Register"
import Login from "./pages/Login"

import NavBar from './components/NavBar.jsx'
import Catalogo from "./components/Catalogo.jsx"
// import Carrito from "./components/Carrito.jsx"
import Contacto from "./components/Contacto.jsx"


function App() {

  const {isAdmin} = useAuthContext()

  useEffect(()=>{},[isAdmin])

  return (
    <>
      <header>
        <Navbar/>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={ 
            isAdmin ? (<Register /> ) :
            ( <p>No puedes acceder a esta página, necesitas ser "admin"</p> )
          } />
        </Routes>
      </main>
    </>
  )
}

export default App