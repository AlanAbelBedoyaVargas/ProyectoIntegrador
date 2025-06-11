'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Paciente_restriccion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
     
    }
  }
  Paciente_restriccion.init({
    uuid: DataTypes.UUID,
    id_paciente: {
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    id_restriccion: {
      type:DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Paciente_restriccion',
    tableName: 'paciente_restriccions',
  });
  return Paciente_restriccion;
};