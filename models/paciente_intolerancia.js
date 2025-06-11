'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Paciente_intolerancia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
     
    }
  }
  Paciente_intolerancia.init({
    uuid: DataTypes.UUID,
    id_paciente:{
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    id_intolerancia: {
      type:DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Paciente_intolerancia',
    tableName: 'paciente_intolerancias',
  });
  return Paciente_intolerancia;
};