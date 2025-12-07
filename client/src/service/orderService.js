import axios from "axios";
import { object } from "yup";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const crearPedido = async (pedido, token) => {
  try {
    const response = await fetch(`${BASE_URL}/api/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(pedido)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al crear el pedido");
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message || "Error al crear el pedido");
  }
};

export const obtenerPedidosDelUser = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/api/orders`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al obtener los pedidos del usuario");
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message || "Error al obtener los pedidos del usuario");
  }
};