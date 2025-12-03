const BASE_URL = import.meta.env.VITE_BASE_URL

export async function fetchProducts() { // Me retorna todo los productos
  const res = await fetch(`${BASE_URL}/api/productos`);

  if (!res.ok) throw new Error('Error al obtener los productos');
  return res.json();
}

export async function fetchProductoPorId(id) { // Me retorna 1 producto
  const res = await fetch(`${BASE_URL}/api/productos/${id}`);
  if (!res.ok) throw new Error('Producto no encontrado');
  return res.json();
}

export async function createProducto(data) { // Me retorna el producto creado
  const res = await fetch(`${BASE_URL}/api/productos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al crear un producto');
  return res.json();
}

export async function DetalleProducto(id) {
        try {
        const response = fetch(`${BASE_URL}/api/productos/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })

    if (!response.ok) {
      const error = await response.json();
      throw new Error("No se pudo acceder al producto. Error: " + (error.message || response.status));
    }

    const data = await response.json();
    return data //  Devuelvo la data
  } catch (error) {
    console.error("Error al obtener producto:", error.message || error);
    throw error;
  }
}