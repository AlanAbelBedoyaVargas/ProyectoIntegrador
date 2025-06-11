'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Restricciones_alimentaria extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Restricciones_alimentaria.belongsToMany(models.Paciente, {
        through: 'paciente_restriccions',
        foreignKey: 'id_restriccion',
        as: 'pacientes'
      });
    }
  }
  Restricciones_alimentaria.init({
    uuid: DataTypes.UUID,
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, //No hace falta, la base de datos ya lo maneja, además no es una validación activa
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Restricciones_alimentaria',
    tableName: 'restricciones_alimentarias',
  });
  return Restricciones_alimentaria;
};