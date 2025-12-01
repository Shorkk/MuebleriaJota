const express = require("express")
const router = express.Router()

router.get("/",(req,res)=>{
    res.send(`<h1>¡Bienvenido a la API de Mueblería Jota!</h1>
      <p>/info para ver las rutas disponibles.</p>`)
})

// Ruta para ver las rutas disponibles - swagger (documentar)
router.get('/info', (req, res) => {
  res.send(`
    <h2>Rutas disponibles:</h2>
    <ul>
      <li>GET / → Bienvenida</li>
      <br>
      <li>POST /api/auth/register → Registro de usuario</li>
      <li>POST /api/auth/login → Login de usuario</li>
      <li>GET /api/users/:id → Obtener usuario por ID</li>
      <li>PUT /api/users/:id → Actualizar usuario</li>
      <br>
      <li>GET /api/productos/:id → Producto por ID</li>
      <li>GET /api/productos → Todos los productos</li>
      <li>POST /api/productos → Crear producto (admin)</li>
      <li>DELETE /api/productos/:id → Eliminar producto (admin)</li>
      <br>
      <li>POST /api/pedidos → Crear pedido</li>
      <li>GET /api/pedidos/user/:userId → Pedidos de un usuario</li>
      <li>GET /api/pedidos → Todos los pedidos (admin)</li>

    </ul>
  `)
})

module.exports = router