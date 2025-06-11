'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Alergia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Alergia.belongsToMany(models.Paciente, {
        through: 'paciente_alergias', // Mismo nombre de tabla pivote
        foreignKey: 'id_alergia',      // Clave en la tabla pivote que apunta a Alergia
        as: 'pacientes'                // Un alias para usar desde una alergia
      });
      
    }
  }
  Alergia.init({
    uuid: DataTypes.UUID,
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, //No hace falta, la base de datos ya lo maneja, además no es una validación activa
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'Alergia',
    tableName: 'alergias',
  });
  return Alergia;
};