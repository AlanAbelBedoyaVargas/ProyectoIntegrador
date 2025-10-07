const express = require('express');
const router = express.Router();
// Cargar el middleware de autenticación
const { verificarToken } = require('../middlewares/authMiddleware');
const {authorizeRole} = require('../middlewares/authorizeRole');
const { getProfileNutricionist, updateNutricionist} = require('../controllers/nutricionista.controller');
const {validateUpdate } = require('../middlewares/validators/nutricionista');

router.get('/perfil', verificarToken, authorizeRole(['nutricionista']), getProfileNutricionist);
router.put('/update', verificarToken, authorizeRole(['nutricionista']), validateUpdate, updateNutricionist);

module.exports = router;  