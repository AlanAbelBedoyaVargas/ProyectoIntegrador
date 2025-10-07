'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Nutricionista extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Nutricionista.belongsTo(models.Usuario, {
        foreignKey: 'id_usuario',
        as: 'nutricionista_usuario',
      });
      Nutricionista.hasMany(models.Plan, {
        foreignKey: 'id_nutricionista',
        as: 'nutricionista_plan',
      });
      Nutricionista.hasMany(models.Paciente, {
        foreignKey: 'id_nutricionista',
        as: 'nutricionista_paciente',
      });
    }
  }
  Nutricionista.init({
    uuid: {
      type: DataTypes.UUID,
      //allowNull:false, No hace falta, la base de datos crea el uuid, no se manda desde el front
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull:false,
    },
    numero_licencia: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    especializacion: {
      type: DataTypes.STRING,
      allowNull:true,
    },
    anios_experiencia: {
      type: DataTypes.STRING,
      allowNull:true,
    },
    biografia: {
      type: DataTypes.TEXT,
      allowNull:true,
    },
    numero_contacto: {
      type: DataTypes.STRING,
      allowNull:true,
    },
  }, {
    sequelize,
    modelName: 'Nutricionista',
    tableName: 'nutricionistas'
  });
  return Nutricionista;
};