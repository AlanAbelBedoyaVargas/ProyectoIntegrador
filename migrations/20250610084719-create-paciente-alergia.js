'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('paciente_alergias', {
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
      
      id_alergia: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'alergias',
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
    await queryInterface.dropTable('paciente_alergias');
  }
};