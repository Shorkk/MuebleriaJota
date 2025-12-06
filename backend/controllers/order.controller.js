const Pedido = require('../models/order.model')
const Product = require('../models/product.model')
const mongoose = require('mongoose')

exports.crearPedido = async (req, res) => {
    try {
        const userId = req.user?._id || req.user?.id || req.user?.userId
        const {items, estado} = req.body
        console.log('crearPedido request by user:', userId)
        console.log('Payload items:', JSON.stringify(items))
        // Validaciones básicas
        if (!Array.isArray(items)) return res.status(400).json({ message: 'Items debe ser un arreglo.' })
        if (items.length === 0) return res.status(400).json({ message: 'El pedido está vacío.' })
        if (!items || items.length === 0) {
            return res.status(400).json({message: 'El pedido está vacío.'})
        }

    let total = 0
    for (const item of items) {
        if (!item.productId) return res.status(400).json({ message: 'Cada item debe tener productId.' })
        if (!mongoose.Types.ObjectId.isValid(item.productId)) {
            return res.status(400).json({ message: `productId inválido: ${item.productId}` })
        }
        const cantidad = Number(item.cantidad) || 0
        if (cantidad <= 0) return res.status(400).json({ message: `Cantidad inválida para productId ${item.productId}` })
        const product = await Product.findById(item.productId)
        if (!product) {
            return res.status(404).json({message: `Producto con ID ${item.productId} no encontrado.`})
        }
        total += product.precio * cantidad
        item.cantidad = cantidad
    }

    const nuevoPedido = new Pedido({
        userId: userId,
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
        const userId = req.user?._id;
        
        if (!userId) {
            return res.status(401).json({message: 'Usuario no autenticado.'});
        }

        console.log('Buscando pedidos para userId:', userId);
        
        // Sin populate, retorna los ObjectIds directamente
        const pedidos = await Pedido.find({userId: userId});
        
        console.log('Pedidos encontrados:', pedidos.length);
        
        res.json(pedidos || []);
    } catch (error) {
        console.error('Error al obtener pedidos:', error);
        res.status(500).json({message: 'Error al obtener pedidos', error: error.message});
    }
};

exports.obtenerUnPedidoDeUnUsuario = async (req, res) => {
    try {
        const userId = req.user?._id;
        const pedidoId = req.params.pedidoId;

        if (!userId) {
            return res.status(401).json({message: 'Usuario no autenticado.'});
        }

        if (!mongoose.Types.ObjectId.isValid(pedidoId)) {
            return res.status(400).json({message: 'ID de pedido inválido.'});
        }

        const pedido = await Pedido.findOne({_id: pedidoId, userId: userId}).populate({
            path: 'items.productId',
            model: 'Product'
        });
        
        if (!pedido) {
            return res.status(404).json({message: 'Pedido no encontrado para este usuario.'});
        }

        res.json(pedido);
    } catch (error) {
        console.error('Error al obtener el pedido:', error);
        res.status(500).json({message: 'Error al obtener el pedido', error: error.message});
    }
};