const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: Number,
  nombre: String,
  descripcion: String,
  precio: Number,
  imagen: String
});

module.exports = mongoose.model("Producto", productSchema);