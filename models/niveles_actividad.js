'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Niveles_actividad extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Niveles_actividad.hasMany(models.Paciente, {
        foreignKey: 'id_actividad',
        as: 'actividad_paciente',
      });
    }
  }
  Niveles_actividad.init({
    uuid: DataTypes.UUID,
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Niveles_actividad',
    tableName: 'niveles_actividads',
  });
  return Niveles_actividad;
};