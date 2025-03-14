const express = require('express');
const router = express.Router();
const { createPerfilPaciente, getPerfilesPacientes, getPerfilPacienteById, updatePerfilPaciente, deletePerfilPaciente } = require('../controllers/perfil_paciente.controller');

// Ruta para crear un usuario
router.post('/perfil', createPerfilPaciente);
router.get('/perfil', getPerfilesPacientes);
router.get('/perfil/:id', getPerfilPacienteById);
router.put('/perfil/:id', updatePerfilPaciente);
router.delete('/perfil/:id', deletePerfilPaciente);

module.exports = router;