'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comidas_plan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comidas_plan.belongsTo (models.Plan, {
        foreignKey: 'id_plan',
        as: 'comidasplan_plan',
      });
      Comidas_plan.hasMany(models.Alimentos_comida, {
        foreignKey: 'id_comida_plan',
        as: 'comidasplan_alimentoscomida',
      });
    }
  }
  Comidas_plan.init({
    uuid: DataTypes.UUID,
    id_plan: {
      type: DataTypes.INTEGER,
      allowNull:false,
    },
    dia_semana:{
      type: DataTypes.INTEGER,
      allowNull:false,
      validate: {
        min: 0,
        max: 6, // 0 = Domingo, 6 = Sábado
      }
    },
    tipo_comida:{
      type:  DataTypes.ENUM('desayuno', 'almuerzo', 'cena', 'snack'),
      allowNull:false,
    },
    
  }, {
    sequelize,
    modelName: 'Comidas_plan',
    tableName: 'comidas_plans',
  });
  return Comidas_plan;
};