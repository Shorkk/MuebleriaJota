import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Detalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!producto) return;

    const fetchProducto = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${BASE_URL}/api/producto/${producto.id}`);
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const data = await res.json();
        setProducto(data);
      } catch (err) {
        console.error("Error al cargar producto:", err);
        setError("No se pudo cargar el producto");
      } finally {
        setLoading(false);
      }
    };

    fetchProducto();
  }, [producto]);

  if (loading) return <p>Cargando producto...</p>;
  if (error) return (
    <div>
      <p>{error}</p>
      <button onClick={() => navigate(-1)}>Volver</button>
    </div>
  );

  if (!producto) return <p>Producto no encontrado.</p>;

  return (
    <div className="detalle-container">
      <button onClick={() => navigate(-1)} className="back-button">← Volver</button>
      <div className="detalle-card">
        <img src={producto.imagen} alt={producto.nombre} />
        <div className="detalle-info">
          <h1>{producto.nombre}</h1>
          <p>{producto.descripcion}</p>
          <p><strong>${producto.precio}</strong></p>
        </div>
      </div>
    </div>
  );
};

export default Detalle;