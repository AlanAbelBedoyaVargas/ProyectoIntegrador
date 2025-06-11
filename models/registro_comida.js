'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Registro_comida extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Registro_comida.belongsTo(models.Paciente, {
        foreignKey: 'id_paciente',
        as: 'registrocomida_paciente',
      });
      Registro_comida.hasMany(models.Alimentos_registrado, {
        foreignKey: 'id_registro_comida',
        as: 'registrocomida_alimentosregistrado',
      });
      
    }
  }
  Registro_comida.init({
    uuid:{
        type: DataTypes.UUID,
        //allowNull:false, No hace falta, la base de datos crea el uuid, no se manda desde el front
    },
    id_paciente: {
      type: DataTypes.INTEGER,
      allowNull:false,
    },
    tipo_comida:{
      type:  DataTypes.ENUM('desayuno', 'almuerzo', 'cena', 'snack'),
      allowNull:false,
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull:false,
    },
    notas: {
      type: DataTypes.TEXT,
      allowNull:true,
    },
  }, {
    sequelize,
    modelName: 'Registro_comida',
    tableName: 'registro_comidas',
  });
  return Registro_comida;
};