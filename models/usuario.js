'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    // Método para comparar contraseñas
    validarPassword(password) {
      if (!this.password) return false;
      return bcrypt.compareSync(password, this.password);
    }
  }
  Usuario.init({
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    rol: DataTypes.STRING(50)
  }, {
    sequelize,
    modelName: 'Usuario',
    tableName: 'usuarios',
    hooks: {
      beforeCreate: async (usuario) => {
        const salt = await bcrypt.genSalt(10);
        usuario.password = await bcrypt.hash(usuario.password, salt);
      }
    }
  });
  return Usuario;
};