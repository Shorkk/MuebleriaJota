import axios from "axios";
import { object } from "yup";
const API_URL = import.meta.env.VITE_BASE_URL + "/orders";

export const crearPedido = async (object, token) => {
  try {
    const response = await axios.post(API_URL, object, {
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
        const response = await axios.get(API_URL, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error al obtener los pedidos del usuario");
    }
};
