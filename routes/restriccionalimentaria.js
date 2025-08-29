const express = require('express');
const router = express.Router();

// 1. Importamos las funciones del controlador que acabamos de crear.
const {
  createRestriccion,
  getAllRestricciones,
  getRestriccionById,
  updateRestriccion,
  deleteRestriccion
} = require('../controllers/restriccionalimentaria.controller');

router.route('/')
  .get(getAllRestricciones)
  .post(createRestriccion);
  
router.route('/:id')
  .get(getRestriccionById)
  .put( updateRestriccion)
  .delete(deleteRestriccion);

module.exports = router;