'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Alimentos_comida extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Alimentos_comida.belongsTo(models.Comidas_plan, {
        foreignKey: 'id_comida_plan',
        as: 'alimentoscomida_comidasplan',
      });
      Alimentos_comida.belongsTo(models.Alimento, {
        foreignKey: 'id_alimento',
        as: 'alimentoscomida_alimento',
      });
    }
  }
  Alimentos_comida.init({
    uuid: DataTypes.UUID,
    id_comida_plan: {
      type: DataTypes.INTEGER,
      allowNull:false,
    },
    id_alimento: {
      type: DataTypes.INTEGER,
      allowNull:false,
    },
    cantidad_g: {
      type: DataTypes.DECIMAL(5,2),
      allowNull:false,
    },
    calorias_calculadas: {
      type: DataTypes.DECIMAL(5,2),
      allowNull:true,
    },
    proteinas_calculadas: {
      type: DataTypes.DECIMAL(5,2),
      allowNull:true,
    },
    carbohidratos_calculados: {
      type: DataTypes.DECIMAL(5,2),
      allowNull:true,
    },
    grasas_calculadas: {
      type: DataTypes.DECIMAL(5,2),
      allowNull:true,
    },
  }, {
    sequelize,
    modelName: 'Alimentos_comida',
    tableName: 'alimentos_comidas',
  });
  return Alimentos_comida;
};