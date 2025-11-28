import { useState, useEffect, useCallback } from "react";
import { fetchUsers, createUser } from "../data/db";
// import { fetchProductos } from "../services/productService;
import { AppContext } from "./AppContext";


export const AppProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  // const [cartItems, setCartItems] = useState([]);

  // const cargarProductos = useCallback(async () => {
  //   try {
  //     const data = await fetchProductos();
  //     setProductos(data);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }, []);

  // useEffect(() => {
  //   cargarProductos();
  // }, [cargarProductos]);

  useEffect(() => {
    const cargarUsers = async () => {
      try {
        const data = await fetchUsers();
        console.log(data)
        setUsers(data);
      } catch (e) {
        console.error(e);
      }
    };

    cargarUsers();
  }, []);

const agregarUser = async (data) => {
      const nuevo = await createUser(data);
      setUsers((prev) => [...prev, nuevo]);
      return nuevo;
  }

  return (
    <AppContext.Provider
      value={{
        users,
        agregarUser
      }}
    >
      {children}
    </AppContext.Provider>
  );
};