const { Niveles_actividad } = require('../models');

// Crear un nuevo nivel de actividad
const createNivel = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;
        const nuevoNivel = await Niveles_actividad.create({
            nombre,
            descripcion
        });

        res.status(201).json(nuevoNivel);
    } catch (err) {
        res.status(500).json({
            error: 'No se pudo crear el nivel de actividad',
            details: err.message
        });
    }
};
// Obtener todos los registros
const getAllNiveles = async (req, res) => {
    try {
      const niveles = await Niveles_actividad.findAll();
      res.json(niveles);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los niveles de actividad.', details: err.message  });
    }
  };

// Obtener un usuario por ID
const getNivelById = async (req, res) => {
  try {
    const { uuid } = req.params;

    const nivel = await Niveles_actividad.findOne({ where: { uuid } });

    if (!nivel) {
      return res.status(404).json({ error: 'Nivel de actividad no encontrado' });
    }

    res.status(200).json(nivel);
  } catch (err) {
    res.status(500).json({
      error: 'Error al buscar el nivel de actividad',
      details: err.message
    });
  }
};




// Actualizar un usuario por UUID
const updateNivel = async (req, res) => {
    try {
      const { uuid } = req.params;
      const { nombre, descripcion } = req.body;
  
      const nivel = await Niveles_actividad.findOne({ where: { uuid } });
  
      if (!nivel) {
        return res.status(404).json({ error: 'Nivel de actividad no encontrado' });
      }
  
      // Solo actualizamos los campos que nos interesan
      nivel.nombre = nombre ?? nivel.nombre;
      nivel.descripcion = descripcion ?? nivel.descripcion;
  
      await nivel.save();
  
      res.status(200).json(nivel);
    } catch (err) {
      res.status(500).json({
        error: 'No se pudo actualizar el nivel de actividad',
        details: err.message
      });
    }
  };

// Eliminar un usuario por UUID

const deleteNivel = async (req, res) => {
    try {
      const { uuid } = req.params;
  
      const nivel = await Niveles_actividad.findOne({ where: { uuid } });
  
      if (!nivel) {
        return res.status(404).json({ error: 'Nivel de actividad no encontrado' });
      }
  
      await nivel.destroy();
  
      res.status(200).json({ message: 'Nivel de actividad eliminado correctamente' });
    } catch (err) {
      res.status(500).json({
        error: 'No se pudo eliminar el nivel de actividad',
        details: err.message
      });
    }
  };
module.exports = { createNivel, getAllNiveles, getNivelById, updateNivel, deleteNivel };