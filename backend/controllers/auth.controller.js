const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

exports.register = async (req, res) => {
  const { nombre, email, password, role} = req.body;
  // Validación básica
  if (!nombre || !email || !password) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  try {
    // Verificar si el email ya está registrado
    const existeUsuario = await User.findOne({ email });
    if (existeUsuario) {
      return res.status(409).json({ error: 'El email ya está registrado' });
    }

    const nuevoUsuario = new User({ nombre, email, password, role });
    // Acá se llama al pre que hashea la contraseña
    await nuevoUsuario.save();

    // Devolver respuesta segura, sin el password
    const { password: _, ...usuarioSinPassword } = nuevoUsuario.toObject();
    res.status(201).json(usuarioSinPassword);
  } catch (err) {
    console.error("❌ Error en registro:", err.message);
    res.status(500).json({ error: 'Error en el servidor' });
  }
}

exports.login= async (req, res) => {
  const { email, password } = req.body;
  console.log("🔐 logueando...");
  
  if (!email || !password) return res.status(400).json({ error: 'Email y contraseña son requeridos' });
  
  try {
    const user = await User.findOne({ email }); 
    if (!user) return res.status(400).json({ error: 'Credenciales inválidas' }); 
    
    const esValida = await user.compararPassword(password); // methods que arme en mi users.model
    if (!esValida) return res.status(400).json({ error: 'Credenciales inválidas' }); // Mje generico
    
    //Generamos el Token.
    const token = jwt.sign({
      userId: user._id,          // Payload: datos que queremos enviar en el token
      nombre: user.nombre,
      email: user.email,
      role: user.role
    },
    process.env.JWT_SECRET,   // La clave secreta desde .env
    { expiresIn: '1h' }       // Opciones (ej: expira en 1 hora)
  );

  res.status(200).json({   //Respondemos con el token y datos del usuario (sin el password)
    token,
    user: {
        id: user._id,
        nombre: user.nombre,
        email: user.email,
        role: user.role,
      },
  })
  
} catch (err) {
  console.error("❌ Error en login:", err.message);
    res.status(500).json({ error: 'Error en el servidor' });
  }
}