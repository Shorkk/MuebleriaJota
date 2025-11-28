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

import UserProfile from "./components/UserProfile.jsx"
import NavBar from './components/NavBar.jsx'
import Catalogo from "./components/Catalogo.jsx"
import Contacto from "./components/Contacto.jsx"


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
          <Route path="my-profile" element={<UserProfile />} />
        </Routes>
      </main>
            <ToastContainer />
    </>
  );
}

{/* <Route path="/register" element={ 
  isAdmin ? (<Register /> ) :
  ( <p>No puedes acceder a esta página, necesitas ser "admin"</p> )
} /> */}

export default App