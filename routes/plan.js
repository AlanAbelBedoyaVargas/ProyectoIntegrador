const express = require('express');
const router = express.Router();
const {createFullPlan} = require('../controllers/plan.controller');

router.post('/', createFullPlan);
module.exports = router;