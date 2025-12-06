const Contacto = require("../models/contacto.model.js");

exports.sendContacto = async (req, res) => {
  try {
    const nuevoContacto = await Contacto.create({
      nombre: req.body.nombre,
      email: req.body.email,
      mensaje: req.body.mensaje,
      savedAt: new Date(),
    });

    res.status(201).json({
      message: "Consulta enviada con éxito.",
    });
  } catch (error) {
    console.error("Error al enviar la consulta:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};
