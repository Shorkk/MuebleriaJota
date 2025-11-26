const Pedido = require('../models/order.model')
const Product = require('../models/product.model')

exports.crearPedido = async (req, res) => {
    try {
        const userId = req.user.userId
        const {items, estado} = req.body
        if (!items || items.length === 0) {
            return res.status(400).json({message: 'El pedido está vacío.'})
        }

    let total = 0
    for (const item of items) {
        const product = await Product.findById(item.productId)
        if (!product) {
            return res.status(404).json({message: `Producto con ID ${item.productId} no encontrado.`})
        }
        total += product.precio * item.cantidad
    }

    const nuevoPedido = new Pedido({
        userId: UserId,
        items,
        total,
        estado: estado || 'pendiente'
    })

    await nuevoPedido.save();
    res.status(201).json({message: "Pedido creado exitosamente", pedido: nuevoPedido});

    } catch (error) {
        console.error('Error al crear el pedido:', error)
        res.status(500).json({message: 'Error interno del servidor'})
    }
};

exports.obtenerPedidosUsuario = async (req, res) => {
    try {
        const userId = req.user.userId
        const pedidos = await Pedido.find({userId}).populate('items.productId')
        if (!pedidos || pedidos.length === 0) return res.status(404).json({message: 'No se encontraron pedidos para este usuario.'})
        res.json(pedidos)
    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Error al obtener pedidos'})
    }
};

exports.obtenerUnPedidoDeUnUsuario = async (req, res) => {
    try {
        const userId = req.user.userId
        const pedido = await Pedido.findOne({_id: req.params.id, userId}).populate('items.productId')
        if (!pedido) return res.status(404).json({message: 'Pedido no encontrado para este usuario.'})
        res.json(pedido)
    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Error al obtener el pedido'})
    }
};