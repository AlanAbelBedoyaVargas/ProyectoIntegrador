'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Alimento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Alimento.hasMany(models.Alimentos_comida, {
        foreignKey: 'id_alimento',
        as: 'alimento_alimentoscomida',
      });
      Alimento.hasMany(models.Alimentos_registrado, {
        foreignKey: 'id_alimento',
        as: 'alimento_alimentosregistrado',
      });
    }
  }
  Alimento.init({
    uuid: DataTypes.UUID,
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    catergoría: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    calorias_100g: {
      type: DataTypes.DECIMAL(5,2),
      allowNull:false,
    },
    proteinas_g: {
      type: DataTypes.DECIMAL(5,2),
      allowNull:true,
    },
    carbohidratos_g: {
      type: DataTypes.DECIMAL(5,2),
      allowNull:true,
    },
    grasas_g: {
      type: DataTypes.DECIMAL(5,2),
      allowNull:true,
    },
  }, {
    sequelize,
    modelName: 'Alimento',
    tableName: 'alimentos',
  });
  return Alimento;
};