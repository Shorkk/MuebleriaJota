import { useState, useEffect, useCallback } from "react";
import { fetchUsers, createUser, perfilUsuario, eliminarUser, cambiarRolUser } from "../service/userService";
import { createProducto, eliminarProducto } from "../service/productService";
import { fetchProducts } from "../service/productService"
import { useAuthContext } from "./AuthContext";
import { AppContext } from "./AppContext";


export const AppProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [userActual, setUserActual] = useState()
  const {isAuthenticated, token} = useAuthContext()
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);

  const cargarProductos = useCallback(async () => {
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    cargarProductos();
  }, [cargarProductos]);

  useEffect(() => {
    cargarUsers();
    if(isAuthenticated){
      obtenerPerfilUsuario(token)
    }else{
      setUserActual(null)
    }
  }, [isAuthenticated,token]);
  
  const cargarUsers = async () => {
    try {
      const data = await fetchUsers();
      console.log(data)
      setUsers(data);
    } catch (e) {
      console.error(e);
    }
  };

  const agregarUser = async (data) => {
    const nuevo = await createUser(data);
    setUsers((prev) => [...prev, nuevo]);
    return nuevo;
  };

  const eliminarUserContext = async (userId) => {
    await eliminarUser({ _id: userId });
    setUsers((prev) => prev.filter((user) => user._id !== userId));
  };

  const cambiarRolUserContext = async (user) => {
    const updatedUser = await cambiarRolUser(user);
    setUsers((prev) =>
      prev.map((u) => (u._id === user._id ? updatedUser : u))
    );
  };

  const obtenerPerfilUsuario= async (token)=>{
        // const headers = getAuthHeaders()
        // console.log(headers)
        try{
          const data = await perfilUsuario(token)
          console.log(data)
          setUserActual(data)
        }catch(err){
          console.error("Error al obtener perfil:", err);
        }
  }

  const createProductoContext = async (data) => {
    const nuevo = await createProducto(data);
    setProducts((prev) => [...prev, nuevo]);
    return nuevo;
  };

  const eliminarProductoContext = async (productId) => {
    if (!token) {
      throw new Error('No hay token. Debes estar autenticado para eliminar un producto.');
    }
    console.log('Eliminando producto con token:', token.substring(0, 20) + '...');
    await eliminarProducto(productId, token);
    setProducts((prev) => prev.filter((product) => product._id !== productId));
  };

  return (
    <AppContext.Provider
      value={{
        users,
        userActual,
        products,
        cartItems,
        setCartItems,
        agregarUser,
        obtenerPerfilUsuario,
        eliminarUserContext,
        cambiarRolUserContext,
        createProductoContext,
        eliminarProductoContext
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
