const { Usuario, Paciente, sequelize } = require('../models');

const crearPaciente = async (nutricionistaId, data) => {
    const transaction = await sequelize.transaction();

    try {
        const { nombre, apellido, email, username, password } = data;

        // 1. Crear usuario con rol paciente
        const usuarioPaciente = await Usuario.create(
            { nombre, apellido, email, username, password, rol: 'paciente' },
            { transaction }
        );

        // 2. Crear paciente vinculado al nutricionista
        const paciente = await Paciente.create(
            {
                id_usuario: usuarioPaciente.id,
                id_nutricionista: nutricionistaId, // vínculo directo
                // Los demás campos (peso, altura, etc.) pueden ir vacíos al inicio
            },
            { transaction }
        );

        await transaction.commit();
        return { usuario: usuarioPaciente, paciente };
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};


//Actualizar un paciente por ID de usuario
const update = async (usuarioId, data) => {
    const paciente = await Paciente.findOne({ where: { id_usuario: usuarioId } });

    if (!paciente) {
        throw new Error('Paciente no encontrado');
    }

    await paciente.update(data);
    return paciente;
};
// Obtener un paciente por ID de usuario
const getById = async (usuarioId) => {
    const paciente = await Paciente.findOne({ where: { id_usuario: usuarioId } });

    if (!paciente) {
        throw new Error('Paciente no encontrado');
    }
    return paciente;
};

module.exports = { crearPaciente, update, getById };
