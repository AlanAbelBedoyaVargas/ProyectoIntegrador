// paciente.controller.js
const { crearPaciente } = require('../services/paciente.service');

const createPatient = async (req, res) => {
  try {

    const nutricionistaId = req.usuario.nutricionistaId; // este es el usuarios.id (del token)
    const resultado = await crearPaciente(nutricionistaId, req.body);

    res.status(201).json({ message: 'Paciente creado', ...resultado });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear paciente', details: error.message });
  }
};
// Actualizar un paciente en base al usuario autenticado
const updatePatient = async (req, res) => {
  try {
    const usuarioId = req.usuario.id; // viene del token
    const pacienteActualizado = await update(usuarioId, req.body);
    res.json({ paciente: pacienteActualizado });
  } catch (err) {
    res.status(500).json({
      error: 'No se pudo actualizar el registro del paciente',
      details: err.message
    });
  }
};

// Obtener un paciente por ID de usuario (perfil del paciente autenticado)
const getProfilePatient = async (req, res) => {
  try {
    const usuarioId = req.usuario.id; // viene del JWT
    const perfilPaciente = await getById(usuarioId);
    res.json({ paciente: perfilPaciente });

  } catch (err) {
    res.status(500).json({
      error: 'No se pudo obtener el paciente',
      details: err.message
    });
  }
};

module.exports = { createPatient, updatePatient , getProfilePatient};
