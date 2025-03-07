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
    }
  }
  Plan.init({
    fecha_inicio: DataTypes.DATE,
    fecha_fin: DataTypes.DATE,
    calorias_diarias: DataTypes.INTEGER,
    detalles: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Plan',
    tableName: 'plans',
  });
  return Plan;
};