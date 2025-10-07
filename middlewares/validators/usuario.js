const { validatedResponse } = require('../validatedResponse');
const { checkSchema } = require('express-validator');
const { idExisteUsuario, emailNoExisteUsuario, usernameNoExisteUsuario } = require('./database');

// =========================  CREATE  ============================
// Esquema para crear usuario (sirve para /usuarios y /auth/register)
const createSchema = {
    nombre: {
        in: ['body'],
        notEmpty: { errorMessage: 'El nombre es obligatorio', bail: true },
        isString: { errorMessage: 'El nombre debe ser una cadena de texto' },
        isLength: {
            options: { min: 2, max: 50 },
            errorMessage: 'El nombre debe tener entre 2 y 50 caracteres',
        },
        trim: true, // Elimina espacios en blanco al inicio y final
    },
    apellido: {
        in: ['body'],
        notEmpty: { errorMessage: 'El apellido es obligatorio', bail: true },
        isString: { errorMessage: 'El apellido debe ser una cadena de texto' },
        isLength: {
            options: { min: 2, max: 50 },
            errorMessage: 'El apellido debe tener entre 2 y 50 caracteres',
        },
        trim: true,
    },
    email: {
        in: ['body'],
        notEmpty: { errorMessage: 'El email es obligatorio', bail: true },
        isEmail: { errorMessage: 'El email tiene que tener un formato valido' },
        custom: {
            options: emailNoExisteUsuario
        },
        trim: true,
    },
    username: {
        in: ['body'],
        notEmpty: { errorMessage: 'El nombre de usuario es obligatorio', bail: true },
        isString: { errorMessage: 'El nombre de usuario debe ser una cadena de texto' },
        isLength: {
            options: { min: 3, max: 30 },
            errorMessage: 'El username debe tener entre 3 y 30 caracteres',
        },
        custom: {
            options: usernameNoExisteUsuario
        },
        trim: true,
    },
    password: {
        in: ['body'],
        notEmpty: { errorMessage: 'La contraseña es obligatoria', bail: true },
        isLength: {
            options: { min: 8 },
            errorMessage: 'La contraseña debe tener al menos 8 caracteres',
            bail: true,
        },
        matches: {
            options: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
            errorMessage: 'La contraseña debe contener al menos una mayúscula, una minúscula y un número',
        },
        trim: true,
    },
    rol: {
        in: ['body'],
        optional: true,
        notEmpty: { errorMessage: 'El rol es obligatorio' },
    },
};

// =========================  UPDATE  ============================

const updateSchema = {
    id: {
        in: ['params'],
        isInt: { errorMessage: 'El id debe ser un entero' },
        custom: {
            options: idExisteUsuario
        },
    },
    nombre: {
        in: ['body'],
        optional: true,
        isString: { errorMessage: 'El nombre debe ser una cadena de texto' },
        isLength: {
            options: { min: 2, max: 50 },
            errorMessage: 'El nombre debe tener entre 2 y 50 caracteres',
        },
        trim: true,
    },
    apellido: {
        in: ['body'],
        optional: true,
        isString: { errorMessage: 'El apellido debe ser una cadena de texto' },
        isLength: {
            options: { min: 2, max: 50 },
            errorMessage: 'El apellido debe tener entre 2 y 50 caracteres',
        },
        trim: true,
    },
    email: {
        in: ['body'],
        optional: true,
        isEmail: { errorMessage: 'El email tiene que tener un formato valido' },
        custom: {
            options: emailNoExisteUsuario
        },
        trim: true,
    },
    username: {
        in: ['body'],
        optional: true,
        isString: { errorMessage: 'El nombre de usuario debe ser una cadena de texto' },
        isLength: {
            options: { min: 3, max: 30 },
            errorMessage: 'El nombre de usuario debe tener entre 3 y 30 caracteres',
        },
        custom: {
            options: usernameNoExisteUsuario
        },
        trim: true,
    },
    password: {
        in: ['body'],
        optional: true,
        isLength: {
            options: { min: 8 },
            errorMessage: 'La contraseña debe tener al menos 8 caracteres',
        },
        matches: {
            options: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
            errorMessage: 'La contraseña debe contener al menos una mayúscula, una minúscula y un número',
        },
        trim: true,
    },
    rol: {
        in: ['body'],
        optional: true,
    },
};
// =========================  GET BY ID  ============================
const getByIdSchema = {
  id: {
    in: ['params'],
    isInt: { errorMessage: 'El id debe ser un número entero' , bail: true},
    custom: { options: idExisteUsuario },
  },
};

// =========================  DELETE  ============================

const deleteSchema = {
    id: {
        in: ['params'],
        isInt: { errorMessage: 'El id debe ser un entero' },
        custom: {
            options: idExisteUsuario
        },
    },
};

// =========================  LOGIN  ============================

const loginSchema = {
  email: {
    isEmail: { errorMessage: 'Debe ser un email válido' },
  },
  password: {
    notEmpty: { errorMessage: 'La contraseña es obligatoria' },
  },
};

const validateCreate = [checkSchema(createSchema), validatedResponse];
const validateUpdate = [checkSchema(updateSchema), validatedResponse];
const validateGetById = [checkSchema(getByIdSchema), validatedResponse];
const validateDelete = [checkSchema(deleteSchema), validatedResponse];
const validateLogin = [checkSchema(loginSchema), validatedResponse];

module.exports = { validateCreate, validateUpdate, validateDelete, validateGetById, validateLogin };