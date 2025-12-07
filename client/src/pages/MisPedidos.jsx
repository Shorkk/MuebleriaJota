import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { obtenerPedidosDelUser } from '../service/orderService'; 
import { Link } from 'react-router-dom';
import { fetchProductoPorId } from '../service/productService';

function MisPedidos() {
  const { token, isAuthenticated } = useAuthContext(); 
  
  const [pedidos, setPedidos] = useState([]);
  const [nombresProductos, setNombresProductos] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar pedidos + nombres de productos
  useEffect(() => {
    if (!isAuthenticated || !token) {
      setIsLoading(false);
      setError("Debes iniciar sesión para ver tu historial de pedidos.");
      return;
    }

    const loadPedidos = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // 1) Traer pedidos
        const data = await obtenerPedidosDelUser(token);
        const pedidosArray = Array.isArray(data) ? data : (data.pedidos || []);
        const sortedData = pedidosArray.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setPedidos(sortedData);

        // 2) Extraer todos los productId sin repetir
        const ids = [...new Set(sortedData.flatMap(p => p.items.map(i => i.productId)))];

        // 3) Traer productos en paralelo
        const productos = await Promise.all(
          ids.map(id => fetchProductoPorId(id).catch(() => null))
        );

        // 4) Crear diccionario id → nombre
        const nombres = {};
        productos.forEach((prod, i) => {
          if (prod) nombres[ids[i]] = prod.nombre;
        });

        setNombresProductos(nombres);

      } catch (err) {
        console.error("Error al cargar pedidos:", err.message);
        setError(err.message || "No pudimos cargar el historial de pedidos.");
      } finally {
        setIsLoading(false);
      }
    };

    loadPedidos();
  }, [token, isAuthenticated]);

  // ---- Render ----

  if (isLoading) {
    return (
      <div className="loading-state-pedidos">
        <h2>Cargando historial de pedidos...</h2>
      </div>
    );
  }

  if (error) {
    return <div className="error-pedidos"><h2>Error</h2><p>{error}</p></div>;
  }

  if (pedidos.length === 0) {
    return (
      <div className="no-pedidos">
        <h2>No tienes pedidos completados.</h2>
        <h4 className="redirect-link">Explora nuestro <Link to="/catalogo">catálogo</Link></h4>
      </div>
    );
  }

  return (
    <>
      <h1>Mis Pedidos</h1>
      <div className="productos-grid">
      {pedidos.map((pedido) => (
        <div key={pedido._id} className="card"> 
          <h3>Pedido N° {pedido._id.slice(-6)}</h3>
          <p>Fecha: {new Date(pedido.createdAt).toLocaleDateString()}</p> 
          <p>Estado: <strong>{pedido.estado || 'Pendiente'}</strong></p>
          <p>Total: <strong>${pedido.total?.toFixed(2) || '0.00'}</strong></p>

          <ul className="items">
            {pedido.items.map((item, index) => (
              <li key={index}>
                <span>{nombresProductos[item.productId] || "Cargando..."}</span>
                <span>x{item.cantidad}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
      </div>
    </>
  )
}

export default MisPedidos;
