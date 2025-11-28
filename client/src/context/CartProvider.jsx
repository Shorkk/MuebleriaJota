import { useState, useEffect } from "react";
import { CartContext } from "./CartContext";

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const agregarAlCarrito = (producto) => {
        setCartItems((prevItems) => {
            const itemExistente = prevItems.find((item) => item.id === producto.id);
            if (itemExistente) {
                return prevItems.map((item) =>
                    item.id === producto.id
                        ? { ...item, cantidad: item.cantidad + 1 }
                        : item
                );
            } else {
                return [...prevItems, { ...producto, cantidad: 1 }];
            }
        });
    }

    const eliminarDelCarrito = (productoId) => {
        setCartItems((prevItems) =>
            prevItems.filter((item) => item.id !== productoId)
        );
    }

    const vaciarCarrito = () => {
      setCartItems([]);
    }

    const totalCarrito = cartItems.reduce((total, item) => total + item.precio * item.cantidad, 0);

    const actualizarCantidad = (productoId, nuevaCantidad) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === productoId
                    ? { ...item, cantidad: nuevaCantidad > 0 ? nuevaCantidad : 1 }
                    : item
            )
        );
    }

    const value = {
        cartItems,
        agregarAlCarrito,
        eliminarDelCarrito,
        vaciarCarrito,
        totalCarrito,
        actualizarCantidad,
    };

    return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}