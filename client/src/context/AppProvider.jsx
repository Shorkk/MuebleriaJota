import { useState, useEffect, useCallback } from "react";
import { fetchUsers, createUser, PerfilUsuario} from "../service/userService";
// import { fetchProductos } from "../services/productService;
import { useAuthContext } from "./AuthContext";
import { AppContext } from "./AppContext";


export const AppProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [userActual, setUserActual] = useState()
  const {isAuthenticated, token} = useAuthContext()
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
      // console.log(data)
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

  const obtenerPerfilUsuario= async (token)=>{
        //  const headers = getAuthHeaders()
        // console.log(headers)
        try{
          const data = await PerfilUsuario(token)
          console.log(data)
          setUserActual(data)
        }catch(err){
          console.error("Error al obtener perfil:", err);
        }
  }

  return (
    <AppContext.Provider
      value={{
        users,
        userActual,
        agregarUser,
        obtenerPerfilUsuario
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
