const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const AuthMiddleware = require('../middlewares/authMiddleware');

router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);
router.post("/", AuthMiddleware.verificarAdmin, productController.createProduct);
router.delete("/:id", AuthMiddleware.verificarAdmin, productController.deleteProduct);

module.exports = router