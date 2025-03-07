const { Plan } = require('../models');

// Crear un nuevo plan de alimentación
const createPlan = async (req, res) => {
  try {
    const { fecha_inicio, fecha_fin, calorias_diarias, detalles } = req.body;

    if (!fecha_inicio || !fecha_fin || !calorias_diarias || !detalles) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const plan = await Plan.create({ fecha_inicio, fecha_fin, calorias_diarias, detalles });
    res.status(201).json(plan);
  } catch (err) {
    res.status(500).json({ error: 'No se pudo crear el plan de alimentación', details: err.message });
  }
};

// Obtener todos los planes de alimentación
const getPlans = async (req, res) => {
  try {
    const planes = await Plan.findAll();
    res.json(planes);
  } catch (err) {
    res.status(500).json({ error: 'No se pudieron obtener los planes de alimentación', details: err.message });
  }
};

// Obtener un plan de alimentación por ID
const getPlanById = async (req, res) => {
  try {
    const { id } = req.params;
    const plan = await Plan.findByPk(id);

    if (!plan) {
      return res.status(404).json({ error: 'Plan de alimentación no encontrado' });
    }

    res.json(plan);
  } catch (err) {
    res.status(500).json({ error: 'No se pudo obtener el plan de alimentación', details: err.message });
  }
};

// Actualizar un plan de alimentación por ID
const updatePlan = async (req, res) => {
  try {
    const { id } = req.params;
    const { fecha_inicio, fecha_fin, calorias_diarias, detalles } = req.body;

    const plan = await Plan.findByPk(id);

    if (!plan) {
      return res.status(404).json({ error: 'Plan de alimentación no encontrado' });
    }

    await plan.update({ fecha_inicio, fecha_fin, calorias_diarias, detalles });

    res.json({ message: 'Plan de alimentación actualizado correctamente', plan });
  } catch (err) {
    res.status(500).json({ error: 'No se pudo actualizar el plan de alimentación', details: err.message });
  }
};

// Eliminar un plan de alimentación por ID
const deletePlan = async (req, res) => {
  try {
    const { id } = req.params;
    const plan = await Plan.findByPk(id);

    if (!plan) {
      return res.status(404).json({ error: 'Plan de alimentación no encontrado' });
    }

    await plan.destroy();
    res.json({ message: 'Plan de alimentación eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'No se pudo eliminar el plan de alimentación', details: err.message });
  }
};

module.exports = { createPlan, getPlans, getPlanById, updatePlan, deletePlan };
