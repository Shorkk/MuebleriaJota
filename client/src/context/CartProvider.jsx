import { useState, useEffect, useRef } from "react";
import { CartContext } from "./CartContext";
import { useAuthContext } from "./AuthContext";

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const raw = localStorage.getItem("cartItems");
      return raw ? JSON.parse(raw) : [];
    } catch (err) {
      console.error("Error parsing cartItems from localStorage:", err);
      return [];
    }
  });

  // Escuchar cambios de usuario para vaciar el carrito cuando cambia de cuenta
  const { user } = useAuthContext();
  const prevUserIdRef = useRef(null);

  useEffect(() => {
    const prevUserId = prevUserIdRef.current;
    const currentUserId = user?.id ?? user?._id ?? null;

    // Evitar vaciar el carrito en el primer render (todavía no hubo usuario previo)
    if (prevUserId === null) {
      prevUserIdRef.current = currentUserId;
      return;
    }

    // No vaciar el carrito en logout: queremos conservar el carrito del invitado.
    // Solo vaciamos cuando hay un cambio real entre dos usuarios autenticados distintos.
    if (prevUserId && currentUserId && prevUserId !== currentUserId) {
      setCartItems([]);
    }

    prevUserIdRef.current = currentUserId;
  }, [user]);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const agregarAlCarrito = (producto) => {
      setCartItems((prevItems) => {
        const prodId = producto.id ?? producto._id;
        const itemExistente = prevItems.find((item) => item.id === prodId);
        if (itemExistente) {
          return prevItems.map((item) =>
            item.id === prodId
              ? { ...item, cantidad: item.cantidad + 1 }
              : item
          );
        } else {
          return [...prevItems, { ...producto, id: prodId, cantidad: 1 }];
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