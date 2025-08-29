const express = require('express');
const router = express.Router();

// 1. Importamos las funciones del controlador que acabamos de crear.
const {
  createAlergia,
  getAllAlergias,
  getAlergiaById,
  updateAlergia,
  deleteAlergia
} = require('../controllers/alergia.controller');

router.route('/')
  .get(getAllAlergias)
  .post(createAlergia);
  
router.route('/:id')
  .get(getAlergiaById)
  .put(updateAlergia)
  .delete(deleteAlergia);

module.exports = router;