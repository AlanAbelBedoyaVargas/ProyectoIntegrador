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
      Plan.hasMany(models.Comidas_plan, {
        foreignKey: 'id_plan',
        as: 'plan_comidasplan',
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
    titulo: {
      type: DataTypes.STRING,
      allowNull:true,
    },
    tipo_plan: {
      type: DataTypes.ENUM('original', 'alternativo'),
      allowNull: false,
      defaultValue: 'original',
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull:true,
    },
    id_paciente: {
      type: DataTypes.INTEGER,
      allowNull:false,
    },
    id_nutricionista: {
      type: DataTypes.INTEGER,
      allowNull:false,
    },
    fecha_inicio: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    fecha_fin: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    calorias_diarias: {
      type: DataTypes.INTEGER,
      allowNull:false,
    },
    id_plan_base: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    generado_ia: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  }, {
    sequelize,
    modelName: 'Plan',
    tableName: 'plans',
  });
  return Plan;
};