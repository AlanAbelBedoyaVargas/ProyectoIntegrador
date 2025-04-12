'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Plan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Plan.belongsTo(models.Paciente, {
        foreignKey: 'id_paciente',
        as: 'plan_paciente',
      });
      Plan.belongsTo(models.Nutricionista, {
        foreignKey: 'id_nutricionista',
        as: 'plan_nutricionista',
      });

      //Autoreferencia a la misma tabla
      Plan.belongsTo(models.Plan, {
        foreignKey: 'id_plan_base',
        as: 'plan_base',
      });
      Plan.hasMany(models.Plan, {
        foreignKey: 'id_plan_base',
        as: 'derivado',
      });
      
    }
  }
  Plan.init({
    uuid: DataTypes.UUID,
    titulo: DataTypes.STRING,
    tipo_plan: DataTypes.ENUM('original', 'alternativo', 'ajuste'),
    descripcion: DataTypes.STRING,
    id_paciente: DataTypes.INTEGER,
    id_nutricionista: DataTypes.INTEGER,
    fecha_inicio: DataTypes.DATE,
    fecha_fin: DataTypes.DATE,
    calorias_diarias: DataTypes.INTEGER,
    detalles: DataTypes.TEXT,
    id_plan_base: DataTypes.INTEGER,
    generado_ia: DataTypes.BOOLEAN,
    activo: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Plan',
    tableName: 'plans',
  });
  return Plan;
};