const express = require("express")
const router = express.Router()

router.get("/",(req,res)=>{
    res.send("Bienvenidos a API Productos!!")
})

// Ruta para ver las rutas disponibles - swagger (documentar)
router.get('/info', (req, res) => {
  res.send(`
    <h2>Rutas disponibles:</h2>
    <ul>
      <li>GET / → Bienvenida</li>
      <li>GET /api/productos/:id → Producto por ID</li>
    </ul>
  `)
})

module.exports = router