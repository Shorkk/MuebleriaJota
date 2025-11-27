const express = require('express');
const router = express.Router();
const { crearPedido, obtenerPedidosUsuario, obtenerUnPedidoDeUnUsuario } = require('../controllers/order.controller');
const { verificarToken } = require('../middlewares/authMiddleware');

router.post('/', verificarToken, crearPedido);
router.get('/', verificarToken, obtenerPedidosUsuario);
router.get('/user/:userId/pedido/:pedidoId', verificarToken, obtenerUnPedidoDeUnUsuario);

module.exports = router;