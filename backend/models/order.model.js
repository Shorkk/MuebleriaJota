const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: {
        type: [{
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            cantidad: {
                type: Number,
                required: true,
                min: 1
            }
        }]
    },
    total: {
        type: Number,
        required: true,
        default: 0
    },
    estado: {
        type: String,
        enum: ['confirmado', 'pendiente', 'cancelado'],
        default: 'pendiente',
    }
}, { timestamps: true, default: Date.now });

const Pedido = mongoose.model("Pedido", pedidoSchema)
module.exports = Pedido;