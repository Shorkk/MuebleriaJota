const express = require('express');
const router = express.Router();
const { crearPedido, obtenerPedidosUsuario, obtenerUnPedidoDeUnUsuario } = require('../controllers/order.controller');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware.verificarAdmin, crearPedido);
router.get('/', authMiddleware.verificarToken, obtenerPedidosUsuario);
router.get('/user/:userId/pedido/:pedidoId', authMiddleware.verificarAdmin, obtenerUnPedidoDeUnUsuario);
module.exports = router;