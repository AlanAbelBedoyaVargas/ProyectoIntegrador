'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Paciente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Paciente.belongsTo(models.Usuario, {
        foreignKey: 'id_usuario',
        as: 'paciente_usuario',
      });
      Paciente.belongsTo(models.Niveles_actividad, {
        foreignKey: 'id_actividad',
        as: 'paciente_actividad',
      });
     
    }
  }
  Paciente.init({
    uuid: DataTypes.UUID,
    id_usuario: DataTypes.INTEGER,
    fecha_nacimiento: DataTypes.DATE,
    genero: DataTypes.ENUM('masculino', 'femenino', 'otro'),
    peso_kg: DataTypes.DECIMAL(5,2),
    altura_cm: DataTypes.DECIMAL(5,2),
    objetivo: DataTypes.STRING,
    //Considerar tablas aparte
    restricciones_alimentarias: DataTypes.STRING,
    condicion_medica: DataTypes.STRING, 
    alergias: DataTypes.STRING,
    intolerancias: DataTypes.STRING,
    id_actividad: DataTypes.INTEGER,

  }, {
    sequelize,
    modelName: 'Paciente',
    tableName: 'pacientes',
  });
  return Paciente;
};