const express = require('express');
const router = express.Router();
const { createUser, getUsers, getUserById, updateUser, deleteUser } = require('../controllers/usuario.controller');

// Ruta para crear un usuario
router.post('/usuarios', createUser);
router.get('/usuarios', getUsers);
router.get('/usuarios/:id', getUserById);
router.put('/usuarios/:id', updateUser);
router.delete('/usuarios/:id', deleteUser);

module.exports = router;
