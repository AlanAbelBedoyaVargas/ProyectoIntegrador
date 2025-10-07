const { Nutricionista } = require('../models');

//Actualizar un nutricionista por ID de usuario
const update = async (usuarioId, data) => {
    const nutricionista = await Nutricionista.findOne({ where: { id_usuario: usuarioId } });
    if (!nutricionista) {
        throw new Error('Nutricionista no encontrado');
    }

    await nutricionista.update(data);
    return nutricionista;
};
// Obtener un nutricionista por ID de usuario
const getById = async (usuarioId) => {
    const nutricionista = await Nutricionista.findOne({ where: { id_usuario: usuarioId } });
    if (!nutricionista) {
        throw new Error('Nutricionista no encontrado');
    }
    return nutricionista;
};

module.exports = { update, getById };
