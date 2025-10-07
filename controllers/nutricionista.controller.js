const { Nutricionista } = require('../models');
const { update, getById } = require('../services/nutricionista.service');

// Actualizar un nutricionista en base al usuario autenticado
const updateNutricionist = async (req, res) => {
  try {
    const usuarioId = req.usuario.id; // viene del token
    const nutricionistaActualizado = await update(usuarioId, req.body);
    res.json({ nutricionista: nutricionistaActualizado });
  } catch (err) {
    res.status(500).json({
      error: 'No se pudo actualizar el nutricionista',
      details: err.message
    });
  }
};

// Obtener un nutricionista por ID de usuario (perfil del nutricionista autenticado)
const getProfileNutricionist = async (req, res) => {
  try {
    const usuarioId = req.usuario.id; // viene del JWT
    const perfilNutricionista = await getById(usuarioId);
    res.json({ nutricionista: perfilNutricionista });

  } catch (err) {
    res.status(500).json({
      error: 'No se pudo obtener el nutricionista',
      details: err.message
    });
  }
};

// Obtener todos los nutricionistas (solo tabla nutricionistas)
// const getNutricionists = async (req, res) => {
//   try {
//     const nutricionistas = await Nutricionista.findAll();
//     res.json(nutricionistas);
//   } catch (err) {
//     res.status(500).json({
//       error: 'No se pudieron obtener los nutricionistas',
//       details: err.message
//     });
//   }
// };



// Eliminar un nutricionista por ID de nutricionista (solo de la tabla nutricionistas)
// const deleteNutricionist = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const nutricionista = await Nutricionista.findByPk(id);

//     await nutricionista.destroy();
//     res.json({ message: 'Nutricionista eliminado correctamente' });
//   } catch (err) {
//     res.status(500).json({
//       error: 'No se pudo eliminar el nutricionista',
//       details: err.message
//     });
//   }
// };

module.exports = {
  updateNutricionist,
  getProfileNutricionist
  // getNutricionists,
  // deleteNutricionist
};
