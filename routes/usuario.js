const express = require('express');
const router = express.Router();
const { createUser, getUsers, getUserById, updateUser, deleteUser } = require('../controllers/usuario.controller');
const {validateCreate, validateUpdate, validateGetById, validateDelete } = require('../middlewares/validators/usuario');

// Ruta para crear un usuario
router.post('/', validateCreate, createUser);
router.get('/', getUsers);
router.get('/:id', validateGetById, getUserById);
router.put('/:id', validateUpdate, updateUser);
router.delete('/:id', validateDelete, deleteUser);

module.exports = router;
