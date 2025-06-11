'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Metricas_paciente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Metricas_paciente.belongsTo(models.Paciente, {
        foreignKey: 'id_paciente',
        as: 'metricas_paciente',
      });
    }
  }
  Metricas_paciente.init({
    uuid: DataTypes.UUID,
    id_paciente: {
      type: DataTypes.INTEGER,
      allowNull:false,
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull:false,
    },
    peso_kg: {
      type: DataTypes.DECIMAL(5,2),
      allowNull:true,
    },
    cintura_cm: {
      type: DataTypes.DECIMAL(5,2),
      allowNull:true,
    },
    cadera_cm: {
      type: DataTypes.DECIMAL(5,2),
      allowNull:true,
    },
    porcentaje_graso: {
      type: DataTypes.DECIMAL(5,2),
      allowNull:true,
    },
  }, {
    sequelize,
    modelName: 'Metricas_paciente',
    tableName: 'metricas_pacientes',
  });
  return Metricas_paciente;
};