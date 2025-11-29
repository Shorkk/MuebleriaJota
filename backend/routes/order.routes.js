const express = require('express');
const router = express.Router();
const { crearPedido, obtenerPedidosUsuario, obtenerUnPedidoDeUnUsuario } = require('../controllers/order.controller');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, crearPedido);
router.get('/', authMiddleware, obtenerPedidosUsuario);
router.get('/user/:userId/pedido/:pedidoId', authMiddleware, obtenerUnPedidoDeUnUsuario);

module.exports = router;