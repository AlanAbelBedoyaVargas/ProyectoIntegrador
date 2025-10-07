const { Usuario, Nutricionista } = require('../../models/index.js');

// =========================  USUARIO  ============================

const idExisteUsuario = async (id = "") => {
    const idExist = await Usuario.findByPk(id);
    if (!idExist) {
        throw new Error(`El usuario con id: ${id}, no existe`);
    }
    return true; // opcional, pero bueno para legibilidad
};

const emailNoExisteUsuario = async (email) => {
    const usuario = await Usuario.findOne({ where: { email } });
    if (usuario) {
        throw new Error(`El email "${email}" ya está registrado`);
    }
    return true;
};

const usernameNoExisteUsuario = async (username) => {
    const usuario = await Usuario.findOne({ where: { username } });
    if (usuario) {
        throw new Error(`El username "${username}" ya está en uso`);
    }
    return true;
};

// =========================  NUTRICIONISTA  ============================

const idExisteNutricionista = async (id = "") => {
    const idExist = await Nutricionista.findByPk(id);
    if (!idExist) {
        throw new Error(`El nutricionista con id: ${id}, no existe`);
    }
    return true; // opcional, pero bueno para legibilidad
};
module.exports = {
    idExisteUsuario,
    usernameNoExisteUsuario,
    emailNoExisteUsuario,
    idExisteNutricionista
};