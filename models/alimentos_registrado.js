'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Alimentos_registrado extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Alimentos_registrado.belongsTo(models.Registro_comida, {
        foreignKey: 'id_registro_comida',
        as: 'alimentosregistrado_registrocomida',
      });
      Alimentos_registrado.belongsTo(models.Alimento, {
        foreignKey: 'id_alimento',
        as: 'alimentosregistrado_alimento',
      });
      
    }
  }
  Alimentos_registrado.init({
    uuid: DataTypes.UUID,
    id_registro_comida: {
      type: DataTypes.INTEGER,
      allowNull:false,
    },
    id_alimento: {
      type: DataTypes.INTEGER,
      allowNull:false,
    },
    cantidad_g:{
      type: DataTypes.DECIMAL(5,2),
      allowNull:true,
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
    modelName: 'Alimentos_registrado',
    tableName: 'alimentos_registrados',
  });
  return Alimentos_registrado;
};