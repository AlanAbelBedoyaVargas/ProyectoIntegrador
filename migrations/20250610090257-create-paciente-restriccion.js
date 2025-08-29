'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('paciente_restriccions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid: {
        type: Sequelize.UUID,        
        defaultValue: Sequelize.literal( 'uuid_generate_v4()' ),     
        allowNull: false
      },
      id_paciente: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'pacientes',
            schema: 'public'
          },
          key: "id",
        },
        allowNull: false
      },
      id_restriccion: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'restricciones_alimentarias',
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
    await queryInterface.dropTable('paciente_restriccions');
  }
};