'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pacientes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        allowNull: false
      },
      id_usuario: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'usuarios',
            schema: 'public'
          },
          key: "id",
        },
        allowNull: false
      },
      fechaNacimiento: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      sexo: {
        type: Sequelize.ENUM('masculino', 'femenino'),
        allowNull: false
      },
      peso_kg: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: false,
      },
      altura_cm: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: false,
      },
      objetivo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      //Considerar tablas aparte
      restricciones_alimentarias: {
        type: Sequelize.STRING
      },
      //Estas si o si deben normalizarse
      condicion_medica: {
        type: Sequelize.STRING
      },
      alergias: {
        type: Sequelize.STRING
      },
      intolerancias: {
        type: Sequelize.STRING
      },
      id_actividad: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'niveles_actividads',
            schema: 'public'
          },
          key: "id",
        },
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('pacientes');
  }
};