const express = require('express');
const router = express.Router();
const {
  createNutricionista,
  getNutricionistas,
  getNutricionistaById,
  updateNutricionista,
  deleteNutricionista
} = require('../controllers/nutricionista.controller');

router.post('/', createNutricionista);
router.get('/', getNutricionistas);
router.get('/:id', getNutricionistaById);
router.put('/:id', updateNutricionista);
router.delete('/:id', deleteNutricionista);

module.exports = router;