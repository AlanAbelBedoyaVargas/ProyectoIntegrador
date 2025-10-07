const { validatedResponse } = require('../validatedResponse');
const { checkSchema } = require('express-validator');

// =========================  UPDATE  ============================

const updateSchema = {
    numero_licencia: {
        in: ['body'],
        optional: true,
        isString: { errorMessage: 'El número de licencia debe ser un texto' },
        trim: true,
    },
    especializacion: {
        in: ['body'],
        optional: true,
        isString: { errorMessage: 'La especialización debe ser una cadena de texto' },
        trim: true,
    },
    anios_experiencia: {
        in: ['body'],
        optional: true,
        isInt: { errorMessage: 'Los años de experiencia deben ser un número entero' },
        toInt: true,
        trim: true,
    },
    biografia: {
        in: ['body'],
        optional: true,
        isString: { errorMessage: 'La biografía debe ser texto' },
        trim: true,
    },
    numero_contacto: {
        in: ['body'],
        optional: true,
        matches: {
            options: /^[0-9+\-()\s]*$/,
            errorMessage: 'El número de contacto solo puede tener dígitos y símbolos (+ - () espacio)'
        },
        trim: true,
    },

};

const validateUpdate = [checkSchema(updateSchema), validatedResponse];
module.exports = {
    validateUpdate
};