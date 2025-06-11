const { Nutricionista } = require('../models');

// Crear un nuevo nutricionista
const createNutricionista = async (req, res) => {
  try {
    const {
      id_usuario,
      numero_licencia,
      especializacion,
      anios_experiencia,
      biografia,
      numero_contacto
    } = req.body;

    const nuevoNutricionista = await Nutricionista.create({
      id_usuario,
      numero_licencia,
      especializacion,
      anios_experiencia,
      biografia,
      numero_contacto
    });

    res.status(201).json(nuevoNutricionista);
  } catch (err) {
    res.status(500).json({
      error: 'No se pudo crear el nutricionista',
      details: err.message
    });
  }
};

// Obtener todos los nutricionistas
const getNutricionistas = async (req, res) => {
  try {
    const nutricionistas = await Nutricionista.findAll();
    res.json(nutricionistas);
  } catch (err) {
    res.status(500).json({
      error: 'No se pudieron obtener los nutricionistas',
      details: err.message
    });
  }
};

// Obtener un nutricionista por ID
const getNutricionistaById = async (req, res) => {
  try {
    const { id } = req.params;
    const nutricionista = await Nutricionista.findByPk(id);

    if (!nutricionista) {
      return res.status(404).json({ error: 'Nutricionista no encontrado' });
    }

    res.json(nutricionista);
  } catch (err) {
    res.status(500).json({
      error: 'No se pudo obtener el nutricionista',
      details: err.message
    });
  }
};

// Actualizar un nutricionista
const updateNutricionista = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      id_usuario,
      numero_licencia,
      especializacion,
      anios_experiencia,
      biografia,
      numero_contacto
    } = req.body;

    const nutricionista = await Nutricionista.findByPk(id);

    if (!nutricionista) {
      return res.status(404).json({ error: 'Nutricionista no encontrado' });
    }

    await nutricionista.update({
      id_usuario,
      numero_licencia,
      especializacion,
      anios_experiencia,
      biografia,
      numero_contacto
    });

    res.json(nutricionista);
  } catch (err) {
    res.status(500).json({
      error: 'No se pudo actualizar el nutricionista',
      details: err.message
    });
  }
};

// Eliminar un nutricionista
const deleteNutricionista = async (req, res) => {
  try {
    const { id } = req.params;
    const nutricionista = await Nutricionista.findByPk(id);

    if (!nutricionista) {
      return res.status(404).json({ error: 'Nutricionista no encontrado' });
    }

    await nutricionista.destroy();
    res.json({ message: 'Nutricionista eliminado correctamente' });
  } catch (err) {
    res.status(500).json({
      error: 'No se pudo eliminar el nutricionista',
      details: err.message
    });
  }
};

module.exports = {
  createNutricionista,
  getNutricionistas,
  getNutricionistaById,
  updateNutricionista,
  deleteNutricionista
};
