import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_URL


const ProductCard = ({ id, nombre, descripcion, precio, imagen }) => {
  const navigate = useNavigate();
  const handleVerMas = () => {
    // Navegación cliente a la ruta de detalle definida en App: /producto/:id
    navigate(`/producto/${id}`);
  };

  return (
    <div className="card">
      <img src={imagen} alt={nombre} />
      <h2>{nombre}</h2>
      <p>{descripcion}</p>
      <p>
        <strong>${precio}</strong>
      </p>
      <button onClick={handleVerMas}>Ver más</button>
    </div>
  );
};

const Catalogo = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`${BASE_URL}/api/productos`);
      const data = await res.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <>
    <h1>CATÁLOGO DE PRODUCTOS</h1>
      {products.length === 0 ? (
        <h4>No hay productos.</h4>
      ) : (
      <div className="productos-grid">
        {products.map(product => (
          <ProductCard 
            key={product.id}
            id={product._id}
            nombre={product.nombre}
            descripcion={product.descripcion}
            precio={product.precio}
            imagen={product.imagen}
          />
        ))}
      </div>
      )}
    </>
  )
}

export default Catalogo