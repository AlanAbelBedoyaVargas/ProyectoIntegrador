const express = require('express');
const router = express.Router();
const {
    createPaciente,
    getPacientes,
    getPacienteById,
    updatePaciente,
    deletePaciente
} = require('../controllers/paciente.controller');
// Opcional: Aquí podrías agregar middlewares de autenticación o validación

// POST /api/pacientes - Crear un nuevo paciente
router.post('/', createPaciente);

// GET /api/pacientes - Obtener todos los pacientes
router.get('/', getPacientes);

// GET /api/pacientes/:id - Obtener un paciente por su ID
router.get('/:id', getPacienteById);

// PUT /api/pacientes/:id - Actualizar un paciente por su ID
router.put('/:id', updatePaciente);

// DELETE /api/pacientes/:id - Eliminar un paciente por su ID
router.delete('/:id', deletePaciente);

module.exports = router;