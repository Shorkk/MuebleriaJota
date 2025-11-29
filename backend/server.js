const express = require("express")
const app = express()
const createError = require("http-errors");

require('dotenv').config();
const PORT = process.env.PORT || 3000

const loggerMiddleware = require("./middlewares/logger")
const infoRouter = require("./routes/info")
const productoRouter = require("./routes/product.routes")
const pedidoRouter = require("./routes/order.routes")
const userRouter = require("./routes/user.routes")
const authRouter = require('./routes/auth.routes')
const cors = require("cors")
const { connectDB } = require("./data/db")

app.use(cors())
app.use(loggerMiddleware)
app.use(express.json())
app.use("/", infoRouter)
app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)
app.use('/api/pedidos', pedidoRouter)
app.use("/api/productos", productoRouter)

// Rutas no definidas
app.use((req, res, next) => {
  next(createError(404, "Ruta no encontrada"))
})

app.use((err, req, res, next) => {
    // Seteo el código de estado. Si el error no tiene uno, es un 500 (Error Interno del Servidor).
    res.status(err.status || 500)
    res.json({
        error: {
            status: err.status,
            message: err.message || 'Ha ocurrido un error en el servidor.',
            // Solo mostramos el detalle del error si no estamos en producción
            stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
        }
    })
})

connectDB()
    .then(() => {
        console.log("Base de datos conectada")

        app.listen(PORT, () => {
            console.log(`server escuchando ${PORT}`)
        });
    })
    .catch((error) => {
        console.error("Error al conectar a la base de datos:", error);
        process.exit(1);
})