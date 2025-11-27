const express = require('express');
const router = express.Router();
const { createUser, getUsers, getUsersById, updateUser, deleteUser } = require('../controllers/user.controller');
const { verificarToken } = require('../middlewares/authMiddleware');

router.get('/', getUsers);
router.get('/:id', getUsersById);
router.post("/", verificarToken, createUser)
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router