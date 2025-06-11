'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Intolerancia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Intolerancia.belongsToMany(models.Paciente, {
        through: 'paciente_intolerancias',
        foreignKey: 'id_intolerancia', 
        as: 'pacientes'
      });
      
    }
  }
  Intolerancia.init({
    uuid: DataTypes.UUID,
    nombre:{
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
    modelName: 'Intolerancia',
  });
  return Intolerancia;
};