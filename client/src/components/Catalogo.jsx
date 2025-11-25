import productos from '../../../backend/data/producto.json'
import "../styles/productos.css"

const ProductCard = ({ id, nombre, descripcion, precio, imagen }) => {
  const handleVerMas = () => {
    window.location.href = `detalle.html?id=${id}`;
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
  return (
    <>
      <h2>Catálogo de productos</h2>
      <div className="productos-grid">
        {productos.map(({ id, nombre, descripcion, precio, imagen }) => (
          <ProductCard 
            key={id}
            nombre={nombre}
            descripcion={descripcion}
            precio={precio}
            imagen={imagen}
          />
        ))}
      </div>

    </>
  )
}

export default Catalogo