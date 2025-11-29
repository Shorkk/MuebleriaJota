import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { jwtDecode } from "jwt-decode";
import { loginUser } from "../service/authService"

const decodeToken = (token) => {
  try {
    const payload = jwtDecode(token);
    console.log('decodeToken payload:', payload);

    const currentTime = Date.now() / 1000;

    if (payload.exp < currentTime) {
      console.warn("Token expirado");
      return null;
    }

    return {
      id: payload.userId,
      nombre: payload.nombre,
      email: payload.email,
      role: payload.role,
    };
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      const userData = decodeToken(storedToken);
      if (userData) {
        setToken(storedToken);
        setUser(userData);
        setIsAdmin(userData.role === "admin");
        setIsAuthenticated(true);
      } else {
        // Token inválido o expirado
        setToken(null);
        setUser(null);
        setIsAdmin(false);
        setIsAuthenticated(false);
        localStorage.removeItem("token");
      }
    } else {
      // No hay token
      setIsAuthenticated(false);
    }
  }, [token]);

  const login = async (credentials) => {
  try {
    const { token } = await loginUser(credentials);

    if (!token) {
      console.error("Token inválido en login");
      return;
    }

    const userData = decodeToken(token);

    if (userData) {
      setToken(token);
      localStorage.setItem("token", token);
      setUser(userData);
      setIsAdmin(userData.role === "admin");
      setIsAuthenticated(true);
    } else {
      console.warn("Token inválido.");
      setIsAuthenticated(false);
    }
  } catch (err) {
    console.log("Error: ", err.message);
    }
  };

  //Logout: Borramos el token y data del user
  const logout = () => {
    setToken(null);
    setUser(null);
    setIsAdmin(false);
    setIsAuthenticated(false);
    localStorage.removeItem("token");
  };

  // Headers para requests con auth. Arma el Header de Autenticación. "Prefijo + token"
  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No hay token disponible. Vuelve a Logearte.");
    return {
      Authorization: `Bearer ${token}`,
    };
  };

    const value = {
    token,
    user,
    isAuthenticated,
    isAdmin,
    login,
    logout,
    getAuthHeaders,
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};