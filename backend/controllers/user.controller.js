const User = require('../models/user.model');

exports.createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    return res.status(201).json({ message: 'Usuario creado con éxito', user });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    if (error.code === 11000) {
      return res.status(400).json({ message: 'El email ya está registrado' });
    }
    return res.status(500).json({ message: 'Server Error' });
  }
}

exports.getUsers = async (req, res) => {
    try {
        const usuarios = await User.find()
        res.json(usuarios)
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios' })
    }
}

exports.getUsersById = async (req, res) => {
    try {
        const usuario = await User.findById(req.params.id)
        if(!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' })
        }
        res.json(usuario)
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el usuario' })
    }
}   

exports.updateUser = async (req, res) => {
    try {
        const usuarioActualizado = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}        
        )
        if(!usuarioActualizado) return res.status(404).json({ message: 'Usuario no encontrado' })
            res.json(usuarioActualizado)
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el usuario' })
    }
}   

exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.json({ message: 'Usuario eliminado con éxito' })
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el usuario' })
    }
}