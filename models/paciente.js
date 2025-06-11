'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Paciente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Paciente.belongsTo(models.Usuario, {
        foreignKey: 'id_usuario',
        as: 'paciente_usuario',
      });
      Paciente.belongsTo(models.Niveles_actividad, {
        foreignKey: 'id_actividad',
        as: 'paciente_actividad',
      });
      Paciente.hasMany(models.Plan, {
        foreignKey: 'id_paciente',
        as: 'paciente_plan',
      });
      Paciente.belongsTo(models.Nutricionista, {
        foreignKey: 'id_nutricionista',
        as: 'paciente_nutricionista',
      });
      Paciente.hasMany(models.Registro_comida, {
        foreignKey: 'id_paciente',
        as: 'paciente_registrocomida',
      });

      Paciente.hasMany(models.Metricas_paciente, {
        foreignKey: 'id_paciente',
        as: 'paciente_metricas',
      });

      // Relaciones con tablas pivote de alergias, restricciones e intolerancias
      Paciente.belongsToMany(models.Alergia, {
        through: 'paciente_alergias', 
        foreignKey: 'id_paciente',    
        as: 'alergias'                
      });
      Paciente.belongsToMany(models.Restricciones_alimentaria, {
        through: 'paciente_restriccions', 
        foreignKey: 'id_paciente',    
        as: 'retriccions'                
      });
      Paciente.belongsToMany(models.Intolerancia, {
        through: 'paciente_intolerancias', 
        foreignKey: 'id_paciente',    
        as: 'intolerancias'                
      });
      
    }
  }
  Paciente.init({
    uuid: DataTypes.UUID,
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_nutricionista: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fecha_nacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    sexo: {
      type: DataTypes.ENUM('masculino', 'femenino'),
      allowNull: false,
    },
    peso_kg: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    altura_cm: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    objetivo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
 
   
    condicion_medica:{
      type: DataTypes.STRING,
      allowNull: true,
    },

    id_actividad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }

  }, {
    sequelize,
    modelName: 'Paciente',
    tableName: 'pacientes',
  });
  return Paciente;
};