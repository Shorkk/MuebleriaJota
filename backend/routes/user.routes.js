const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/authMiddleware');

router.get("/profile", authMiddleware, userController.getUserProfile)
router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.post("/", authMiddleware, userController.createUser)
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router