import { useState, useEffect } from "react";
import { fetchUsers, createUser } from "../data/db";
import { AppContext } from "./AppContext";

export const AppProvider = ({ children }) => {
  const [users, setUsers] = useState([]);


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