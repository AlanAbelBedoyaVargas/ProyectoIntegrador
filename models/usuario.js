'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Usuario.hasOne(models.Nutricionista, {
        foreignKey: 'id_usuario',
        as: 'usuario_nutricionista',
      });
      Usuario.hasOne(models.Paciente, {
        foreignKey: 'id_usuario',
        as: 'usuario_paciente',
      });
    }
    // Método para comparar contraseñas en login
    async validarPassword(password) {
      if (!this.password) return false;
      return await bcrypt.compare(password, this.password);
    }
  }
  Usuario.init({
    uuid: {
      type: DataTypes.UUID,
      //allowNull:false, No hace falta, la base de datos crea el uuid, no se manda desde el front
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, //No hace falta, la base de datos ya lo maneja, además no es una validación activa
      validate: { //es una validación activa
        isEmail: true,
      },
    },
    username: {
      type: DataTypes.STRING,
      unique: true, //No hace falta, la base de datos ya lo maneja además no es una validación activa
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rol: {
      type: DataTypes.ENUM('paciente', 'nutricionista'),
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Usuario',
    tableName: 'usuarios',
    hooks: {
      beforeCreate: async (usuario) => {
        const salt = await bcrypt.genSalt(10);
        usuario.password = await bcrypt.hash(usuario.password, salt);
      },
      // Hook que se ejecuta antes de actualizar un usuario
      beforeUpdate: async (usuario) => {
        // Solo cifrar si el campo password ha cambiado
        if (usuario.changed('password')) {
          const salt = await bcrypt.genSalt(10);
          usuario.password = await bcrypt.hash(usuario.password, salt);
        }
      }

    }
  });
  return Usuario;
};