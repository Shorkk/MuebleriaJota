import React from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom"
import { useAuthContext } from "../context/AuthContext";
import { FaCartPlus } from 'react-icons/fa6';
import { useCartContext } from "../context/CartContext";

const NavBar = () => {
    const location = useLocation();
    const { isAuthenticated, logout } = useAuthContext();
    const { cartItems } = useCartContext();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="navbar">
            <img
                src="https://piaachigaritba.github.io/img_muebleria/img/logo.svg"
                alt="Logo"
                className={isActive("/") ? "active logo" : "logo"}
            />
            <ul>
                <li>
                    <NavLink to="/" className={isActive("/") ? "active" : ""}>Inicio</NavLink>
                </li>
                <li>
                    <NavLink to="/catalogo" className={isActive("/catalogo") ? "active" : ""}>Catálogo</NavLink>
                </li>
                <li>
                    <NavLink to="/contacto" className={isActive("/contacto") ? "active" : ""}>Contacto</NavLink>
                </li>
                {isAuthenticated ? (
                    <>
                        <li>
                            <NavLink to="/cart" className="carrito-link">
                                <FaCartPlus id="texto-carrito" className="carrito" />
                                <span
                                    className="cart-count"
                                    id="contador-carrito"
                                >{cartItems?.length || 0}</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/my-profile" className={isActive("/my-profile") ? "active" : ""}>Mi Perfil</NavLink>
                        </li>
                        <li>
                            <p onClick={handleLogout}>Logout</p>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <NavLink to="/login" className={isActive("/login") ? "active" : ""}>Login</NavLink><bold> / </bold><NavLink to="/register" className={isActive("/register") ? "active" : ""}>Registrarse</NavLink>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default NavBar;