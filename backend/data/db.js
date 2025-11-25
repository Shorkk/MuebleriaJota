const mongoose = require('mongoose');

const strConnection = process.env.DB_URL

exports.connectDB = async () => {
    if (!strConnection) {
        throw new Error("La cadena de conexión a la base de datos no está definida en las variables de entorno.")

        await mongoose.connect(strConnection)
        console.log("Conexión a la base de datos exitosa")
    }
}