const { Usuario } = require('../models');
const jwt = require('jsonwebtoken');

const generarToken = (usuario) => {
  return jwt.sign(
    { id: usuario.id, username: usuario.username, rol: usuario.rol },
    process.env.JWT_SECRET || 'secreto', // Usa una variable de entorno para mayor seguridad
    { expiresIn: '1h' }
  );
};

// Registro de usuario
const register = async (req, res) => {
  try {
    const { nombre, apellido, email, username, password, rol } = req.body;

    if (!nombre || !apellido || !email || !username || !password || !rol) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ error: 'El correo ya está registrado' });
    }

    const usuario = await Usuario.create({ nombre, apellido, email, username, password, rol });
    const token = generarToken(usuario);

    res.status(201).json({ usuario, token });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar usuario', details: error.message });
  }
};

// Inicio de sesión
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }

    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario || !(await usuario.validarPassword(password))) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = generarToken(usuario);
    res.json({ usuario, token });
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión', details: error.message });
  }
};

module.exports = { register, login };
