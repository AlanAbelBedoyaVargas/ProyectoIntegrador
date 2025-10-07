const { Usuario } = require('../models');
const { registerUsuario } = require('../services/auth.service');
const jwt = require('jsonwebtoken');

const generarToken = (usuario, nutricionista) => {

  const payload = {
    id: usuario.id,
    username: usuario.username,
    rol: usuario.rol,
  };
  //Solo incluir el id_nutricionista si existe
  if (nutricionista) {
    payload.nutricionistaId = nutricionista.id;
  }
  return jwt.sign(
    payload,
    process.env.JWT_SECRET || 'secreto', // Usar una variable de entorno para mayor seguridad
    { expiresIn: '1h' }
  );
};

// Registro de usuario
const register = async (req, res) => {
  try {
    const { usuario, nutricionista } = await registerUsuario(req.body); // Service para registrar usuarios dependiendo del rol
    const token = generarToken(usuario, nutricionista);

    res.status(201).json({ usuario, nutricionista, token });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar usuario', details: error.message });
  }
};

// Inicio de sesión
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario || !(await usuario.validarPassword(password))) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    let nutricionista = null;
    if (usuario.rol === 'nutricionista') {
      nutricionista = await usuario.getUsuario_nutricionista();
    }

    const token = generarToken(usuario, nutricionista);
    res.json({ usuario, nutricionista, token });
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión', details: error.message });
  }
};

module.exports = { register, login };
