import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import loading from "../assets/loading.gif";
const BASE_URL = import.meta.env.VITE_BASE_URL


const ProductCard = ({ product }) => {
 const navigate = useNavigate();
 const handleVerMas = () => {
 navigate(`/productos/${product._id}`);
 };

 return (
 <div className="card">
 <img 
        src={product.imagen || "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?b=1&s=612x612&w=0&k=20&c=10Oc-M2aMCHKYLd-BykQnG-k6xXD4JugfY7TVaapL4U="} 
        alt={product.nombre} 
      />
 <h2>{product.nombre}</h2>
 <p>{product.descripcion}</p>
 <p><strong>${product.precio}</strong></p>
 <button onClick={handleVerMas}>Ver más</button>
 </div>
 );
};

const Catalogo = () => {
 const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 

 useEffect(() => {
   const fetchProducts = async () => {
      setIsLoading(true); 
      
      try {
        const res = await fetch(`${BASE_URL}/api/productos`);
        if (!res.ok) {
           throw new Error(`Error al obtener productos: ${res.statusText}`);
        }
 const data = await res.json();
 setProducts(data);
      } catch (error) {
        console.error("Fallo la carga de productos", error);
      } finally {
        setIsLoading(false);
      }
 };

 fetchProducts();
 }, []);

  if (isLoading) {
    return (
       <div className="loading-state">
        <h1>CATÁLOGO DE PRODUCTOS</h1>
        <h2>El flete está en camino...</h2>
        <img className="loading" src={loading} alt="Cargando" />
      </div>
    );
  }

 return (
 <>
 <h1>CATÁLOGO DE PRODUCTOS</h1>
 
 {products.length === 0 ? (
 <h4>No hay productos disponibles en este momento.</h4>
 ) : (
 <div className="productos-grid">
 {products.map(product => (
 <ProductCard 
 product={product} key={product._id}
 />
 ))}
 </div>
 )}
 </>
 )
}

export default Catalogo