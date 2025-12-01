const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  nombre: String,
  descripcion: String,
  detalle: String,
  precio: Number,
  imagen: String,
  medidas: String,
  materiales: String,
  acabado: String,
});

module.exports = mongoose.model("Producto", productSchema);