const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

//verifyToken
const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

    // 1. Verificamos que el encabezado y el token existan
  if (!authHeader || !authHeader.startsWith('Bearer ')) { 
    return res.status(401).json({ error: 'No autorizado. Token faltante.' }); // Si no hay token, no hay acceso
  }
  const token = authHeader.split(' ')[1]; // Extraemos el token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // 2. Verificamos el token
      // 3. Si es válido, guardamos el payload (info del user) en el objeto 'req'
      // para que las rutas posteriores puedan usarlo.
    req.user = await User.findById(decoded.userId).select('-password'); // sin password
    next();  // 4. Dejamos que la petición continúe hacia su destino
  } catch (err) {
    // Si el token no es válido (expirado, manipulado)
    console.error("Error al verificar token:", err.message);
    res.status(401).json({ error: 'Token inválido o expirado.' });
  }

  exports.verificarAdmin = (req, res, next) => {
  if (!req.user?.role?.includes('admin')) {
    return res.status(403).json({ error: 'Acceso denegado. Requiere rol de administrador.' });
  }
  next();
}
};

module.exports = authMiddleware
