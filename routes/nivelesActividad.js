const express = require('express');
const router = express.Router();
const {
    createNivel,
    getNiveles,
    getNivelById,
    updateNivel,
    deleteNivel
} = require('../controllers/niveles.controller');


router.get('/', getNiveles);
router.get('/:uuid', getNivelById);
router.post('/', createNivel);
router.put('/:uuid', updateNivel);
router.delete('/:uuid', deleteNivel);

module.exports = router;

