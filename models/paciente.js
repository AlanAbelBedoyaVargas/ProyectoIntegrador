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
      Paciente.hasMany(models.Plan, {
        foreignKey: 'id_actividad',
        as: 'paciente_plan',
      });
     
    }
  }
  Paciente.init({
    uuid: DataTypes.UUID,
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull:false,
    },
    fecha_nacimiento: {
      type: DataTypes.DATE,
      allowNull:false,
    },
    sexo: {
      type: DataTypes.ENUM('masculino', 'femenino'),
      allowNull:false,
    },
    peso_kg: {
      type: DataTypes.DECIMAL(5,2),
      allowNull:false,
    },
    altura_cm: {
      type: DataTypes.DECIMAL(5,2),
      allowNull:false,
    },
    objetivo: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    //Considerar tablas aparte
    restricciones_alimentarias: DataTypes.STRING,
    condicion_medica: DataTypes.STRING, 
    alergias: DataTypes.STRING,
    intolerancias: DataTypes.STRING,
    id_actividad: {
      type: DataTypes.INTEGER,
      allowNull:false,
    }

  }, {
    sequelize,
    modelName: 'Paciente',
    tableName: 'pacientes',
  });
  return Paciente;
};