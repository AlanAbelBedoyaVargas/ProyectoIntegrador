const express = require('express');
const router = express.Router();
// Cargar el middleware de autenticación
const { verificarToken } = require('../middlewares/authMiddleware');
const {authorizeRole} = require('../middlewares/authorizeRole');
const {createPatient, updatePatient, getProfilePatient} = require('../controllers/pacientes.controller');
const {validateCreate} = require('../middlewares/validators/usuario');

router.post('/', verificarToken, authorizeRole(['nutricionista']), validateCreate, createPatient);
router.put('/update', verificarToken, authorizeRole(['paciente']), validateCreate, updatePatient);
router.get('/perfil', verificarToken, authorizeRole(['paciente']), getProfilePatient);

module.exports = router; 