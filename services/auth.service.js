const { Usuario, Nutricionista, sequelize } = require('../models');

const registerUsuario = async (data) => {
  const transaction = await sequelize.transaction();

  try {
    const { nombre, apellido, email, username, password, rol } = data;

    // Crear usuario
    const usuario = await Usuario.create(
      { nombre, apellido, email, username, password, rol },
      { transaction }
    );

    let nutricionista = null;
    // Si es nutricionista, crear un registro vacío
    if (rol === 'nutricionista') {
      nutricionista =await Nutricionista.create(
        { id_usuario: usuario.id, numero_licencia: '' }, // campos obligatorios inicializados
        { transaction }
      );
    }

    await transaction.commit();
    return { usuario, nutricionista };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

module.exports = { registerUsuario };
