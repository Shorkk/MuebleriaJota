const mongoose = require('mongoose');
const contactoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    mensaje: {
        type: String,
        required: true,
        trim: true
    }
});

module.exports = mongoose.model("Contacto", contactoSchema);