const { Usuario } = require('../models');

// Crear un nuevo usuario
const createUser = async (req, res) => {
  try {
    const { nombre, apellido, email, username, password, rol } = req.body;

    const usuario = await Usuario.create({ nombre, apellido, email, username, password, rol });
    res.status(201).json(usuario);
  } catch (err) {
    res.status(500).json({ error: 'No se pudo crear el usuario', err });
  }
};

// Obtener todos los usuarios
const getUsers = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: 'No se pudieron obtener los usuarios', details: err.message });
  }
};

// Obtener un usuario por ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);

    res.json(usuario);
  } catch (err) {
    res.status(500).json({ error: 'No se pudo obtener el usuario', details: err.message });
  }
};

// Actualizar un usuario por ID
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellido, email, username, password, rol } = req.body;

    // Buscar el usuario por ID
    const usuario = await Usuario.findByPk(id);

    // Actualizar el usuario
    await usuario.update({ nombre, apellido, email, username, password, rol });

    res.json({ message: 'Usuario actualizado correctamente', usuario });
  } catch (err) {
    res.status(500).json({ error: 'No se pudo actualizar el usuario', details: err.message });
  }
};

// Eliminar un usuario por ID
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar el usuario por ID
    const usuario = await Usuario.findByPk(id);


    // Eliminar el usuario
    await usuario.destroy();

    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'No se pudo eliminar el usuario', details: err.message });
  }
};

module.exports = { createUser, getUsers, getUserById, updateUser, deleteUser };