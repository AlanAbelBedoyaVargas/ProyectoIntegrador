const express = require('express');
const router = express.Router();
const {
    createNivel,
    getAllNiveles,
    getNivelById,
    updateNivel,
    deleteNivel
} = require('../controllers/niveles_actividad.controller');


router.get('/', getAllNiveles);
router.get('/:uuid', getNivelById);
router.post('/', createNivel);
router.put('/:uuid', updateNivel);
router.delete('/:uuid', deleteNivel);

module.exports = router;

