const express = require('express');
const router = express.Router();

// 1. Importamos las funciones del controlador que acabamos de crear.
const {
  createAlimento,
  getAllAlimentos,
  getAlimentoById,
  updateAlimento,
  deleteAlimento
} = require('../controllers/alimento.controller');

router.route('/')
  .get(getAllAlimentos)
  .post(createAlimento);
  
router.route('/:id')
  .get(getAlimentoById)
  .put(updateAlimento)
  .delete(deleteAlimento);

module.exports = router;