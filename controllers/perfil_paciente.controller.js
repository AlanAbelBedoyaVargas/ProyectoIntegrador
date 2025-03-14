const { Perfilpaciente } = require('../models');

// Crear un nuevo perfil de paciente
const createPerfilPaciente = async (req, res) => {
  try {
    const { edad, sexo, peso_actual, altura, nivel_actividad, objetivo } = req.body;

    if (!edad || !sexo || !peso_actual || !altura || !nivel_actividad || !objetivo) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const perfil = await Perfilpaciente.create({ edad, sexo, peso_actual, altura, nivel_actividad, objetivo });
    res.status(201).json(perfil);
  } catch (err) {
    res.status(500).json({ error: 'No se pudo crear el perfil del paciente', details: err.message });
  }
};

// Obtener todos los perfiles de pacientes
const getPerfilesPacientes = async (req, res) => {
  try {
    const perfiles = await Perfilpaciente.findAll();
    res.json(perfiles);
  } catch (err) {
    res.status(500).json({ error: 'No se pudieron obtener los perfiles de pacientes', details: err.message });
  }
};

// Obtener un perfil de paciente por ID
const getPerfilPacienteById = async (req, res) => {
  try {
    const { id } = req.params;
    const perfil = await Perfilpaciente.findByPk(id);

    if (!perfil) {
      return res.status(404).json({ error: 'Perfil de paciente no encontrado' });
    }

    res.json(perfil);
  } catch (err) {
    res.status(500).json({ error: 'No se pudo obtener el perfil del paciente', details: err.message });
  }
};

// Actualizar un perfil de paciente por ID
const updatePerfilPaciente = async (req, res) => {
  try {
    const { id } = req.params;
    const { edad, sexo, peso_actual, altura, nivel_actividad, objetivo } = req.body;

    const perfil = await Perfilpaciente.findByPk(id);

    if (!perfil) {
      return res.status(404).json({ error: 'Perfil de paciente no encontrado' });
    }

    await perfil.update({ edad, sexo, peso_actual, altura, nivel_actividad, objetivo });

    res.json({ message: 'Perfil de paciente actualizado correctamente', perfil });
  } catch (err) {
    res.status(500).json({ error: 'No se pudo actualizar el perfil del paciente', details: err.message });
  }
};

// Eliminar un perfil de paciente por ID
const deletePerfilPaciente = async (req, res) => {
  try {
    const { id } = req.params;
    const perfil = await Perfilpaciente.findByPk(id);

    if (!perfil) {
      return res.status(404).json({ error: 'Perfil de paciente no encontrado' });
    }

    await perfil.destroy();
    res.json({ message: 'Perfil de paciente eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'No se pudo eliminar el perfil del paciente', details: err.message });
  }
};

module.exports = { createPerfilPaciente, getPerfilesPacientes, getPerfilPacienteById, updatePerfilPaciente, deletePerfilPaciente };