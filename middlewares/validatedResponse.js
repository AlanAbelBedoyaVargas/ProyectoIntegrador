const { validationResult } = require('express-validator');

/**
 * Middleware para enviar errores de validación.
 * Si no hay errores llama a next().
 */
const validatedResponse = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // errors.array() devuelve un array de errores con { msg, param, value, location, ... }
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { validatedResponse };
