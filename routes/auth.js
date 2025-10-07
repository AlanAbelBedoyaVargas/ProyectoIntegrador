const express = require('express');
const { register, login } = require('../controllers/auth.controller');
const {validateCreate, validateLogin } = require('../middlewares/validators/usuario');

const router = express.Router();

router.post('/register', validateCreate, register);
router.post('/login', validateLogin, login);

module.exports = router;
