import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { obtenerPedidosDelUser } from '../service/orderService'; 
import { Link } from 'react-router-dom';

function MisPedidos() {
  const { token, isAuthenticated } = useAuthContext(); 
  
  const [pedidos, setPedidos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
        const data = await obtenerPedidosDelUser(token);
        const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        setPedidos(sortedData);
      } catch (err) {
        console.error("Error al cargar pedidos:", err.message);
        setError(err.message || "No pudimos cargar el historial de pedidos.");
      } finally {
        setIsLoading(false);
      }
    };

    loadPedidos();
  }, [token, isAuthenticated]);
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
        <p>Explora nuestro <Link to="/catalogo">catálogo</Link></p>
      </div>
    );
  }
  return (
    <div className="mis-pedidos-page">
      <h1>Mis Pedidos</h1>
      {pedidos.map((pedido) => (
        <div key={pedido._id || pedido.id} className="pedido-card"> 
          <h3>Pedido N° {pedido._id ? pedido._id.slice(-6) : 'N/A'}</h3>
          <p>Fecha: {new Date(pedido.createdAt || pedido.fecha).toLocaleDateString()}</p> 
          <p>Estado: **{pedido.status || pedido.estado || 'Completado'}**</p>
          <p>Total: **${pedido.total ? pedido.total.toFixed(2) : '0.00'}**</p>
          
          <ul className="pedido-items">
            {pedido.items && pedido.items.map((item, index) => (
              <li key={index}>
                {item.nombre || 'Producto Desconocido'} (x{item.cantidad}) - ${item.precio.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default MisPedidos;