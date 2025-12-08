import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import { toast } from "react-toastify";
import { useAuthContext } from "../context/AuthContext";
import { useAppContext } from '../context/AppContext';
import { NavLink } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Detalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { agregarAlCarrito } = useCartContext();
  const { isAuthenticated } = useAuthContext();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAdmin } = useAuthContext();
  const { eliminarProductoContext } = useAppContext();

  useEffect(() => {
    const fetchProducto = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`${BASE_URL}/api/productos/${id}`);
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

    if (id) fetchProducto();
  }, [id]);

  if (loading) return       
    <div className="loading-state">
      <h2>Cargando producto...</h2>
      <img className="loading" src={loading} alt="Cargando" />
    </div>
  
  if (error) return (
    <div>
      <p>{error}</p>
      <button onClick={() => navigate(-1)}>Volver</button>
    </div>
  );

  if (!producto) return <p>Producto no encontrado.</p>;

  const handleAgregarAlCarrito = (producto) => {
    if (!isAuthenticated) {
      toast.error("Debes iniciar sesión para agregar productos al carrito");
      navigate("/login");
      return;
    }

    if (!producto) return;
    agregarAlCarrito(producto);
    toast.success("Producto agregado al carrito");
  };

  const handleEliminarProducto = async (producto) => {
    try {
      await eliminarProductoContext(producto._id);
      toast.success("Producto eliminado correctamente");
      navigate("/catalogo");
    } catch (err) {
      console.error("Error al eliminar producto:", err);
      toast.error("No se pudo eliminar el producto");
    }
  };

  return (
    <>
      <button className="button_return" onClick={() => navigate(-1)}>← Volver</button>
        <h1>{producto.nombre}</h1>
        <div className="product-details">
          <img src={producto.imagen || '/placeholder.png'} alt={producto.nombre} />
          <p><strong>Precio: ${producto.precio}</strong></p>
          {producto.stock !== undefined && (
            <p><strong>Stock:</strong> {producto.stock}</p>
          )}

          {(
            [
              {clave:"detalle", titulo:"Detalle"},
              {clave:"medidas", titulo:"Medidas"},
              {clave:"materiales", titulo:"Materiales"},
              {clave:"acabado", titulo:"Acabado"},
              {clave:"peso", titulo:"Peso"},
              {clave:"capacidad", titulo:"Capacidad"},
              {clave:"modulares", titulo:"Modulares"},
              {clave:"tapizado", titulo:"Tapizado"},
              {clave:"confort", titulo:"Confort"},
              {clave:"rotacion", titulo:"Rotación"},
              {clave:"garantia", titulo:"Garantía"},
              {clave:"cargaMaxima", titulo:"Carga Máxima"},
              {clave:"almacenamiento", titulo:"Almacenamiento"},
              {clave:"caracteristicas", titulo:"Características"},
              {clave:"colchon", titulo:"Colchón"},
              {clave:"relleno", titulo:"Relleno"},
              {clave:"sostenibilidad", titulo:"Sostenibilidad"},
              {clave:"extension", titulo:"Extensión"},
              {clave:"aplicables", titulo:"Aplicables"},
              {clave:"incluye", titulo:"Incluye"},
              {clave:"cables", titulo:"Cables"},
              {clave:"regulacion", titulo:"Regulación"},
              {clave:"certificacion", titulo:"Certificación"}
            ]
          ).map(prop => (
            producto[prop.clave] ? (
              <p key={prop.clave}><strong>{prop.titulo}:</strong> {producto[prop.clave]}</p>
            ) : null
          ))}
          <button className="button_add_cart" onClick={() => handleAgregarAlCarrito(producto)}>Agregar al carrito</button>
        </div>
        {isAdmin ? (
          <h4>
          <button className="button_eliminar" onClick={() => handleEliminarProducto(producto)} >Eliminar Producto</button>
          </h4>
        ) : null}
    </>
  );
};

export default Detalle;