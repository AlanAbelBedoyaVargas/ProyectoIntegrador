const express = require('express');
const router = express.Router();
const { createPlan, getPlans, getPlanById, updatePlan, deletePlan } = require('../controllers/plan1.controller');

// Ruta para crear un usuario
router.post('/planes', createPlan);
router.get('/planes', getPlans);
router.get('/planes/:id', getPlanById);
router.put('/planes/:id', updatePlan);
router.delete('/planes/:id', deletePlan);

module.exports = router;