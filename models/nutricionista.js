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
    }
  }
  Nutricionista.init({
    uuid: DataTypes.UUID,
    id_usuario: DataTypes.INTEGER,
    numero_licencia: DataTypes.STRING,
    especializacion: DataTypes.STRING,
    anios_experiencia: DataTypes.INTEGER,
    biografia: DataTypes.TEXT,
    numero_contacto: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Nutricionista',
    tableName: 'nutricionistas'
  });
  return Nutricionista;
};