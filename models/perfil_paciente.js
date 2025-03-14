'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Perfilpaciente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Perfilpaciente.init({
    edad: DataTypes.INTEGER,
    sexo: DataTypes.STRING,
    peso_actual: DataTypes.FLOAT,
    altura: DataTypes.FLOAT,
    nivel_actividad: DataTypes.STRING,
    objetivo: DataTypes.STRING

  }, {
    sequelize,
    modelName: 'Perfilpaciente',
    tableName: 'perfil_pacientes',
  });
  return Perfilpaciente;
};