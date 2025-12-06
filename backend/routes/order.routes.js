const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware.verificarToken, orderController.crearPedido);
router.get('/', authMiddleware.verificarToken, orderController.obtenerPedidosUsuario);
router.get('/user/:userId/pedido/:pedidoId', authMiddleware.verificarAdmin, orderController.obtenerUnPedidoDeUnUsuario);

module.exports = router;