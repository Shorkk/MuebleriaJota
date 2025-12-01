import axios from "axios";
import { object } from "yup";
const API_URL = import.meta.env.VITE_BASE_URL;

export const crearPedido = async (object, token) => {
  try {
    const response = await axios.post(`${API_URL}/api/orders`, object, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error al crear el pedido");
    }
};

export const obtenerPedidosDelUser = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/api/orders`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error al obtener los pedidos del usuario");
    }
};
