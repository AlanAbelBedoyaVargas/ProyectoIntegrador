'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('metricas_pacientes', {
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
      id_paciente:{
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
      fecha: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      peso_kg: {
        type: Sequelize.DECIMAL(5,2),
        allowNull: true
      },
      cintura_cm: {
        type: Sequelize.DECIMAL(5,2),
        allowNull: true
      },
      cadera_cm: {
        type: Sequelize.DECIMAL(5,2),
        allowNull: true
      },
      porcentaje_graso: {
        type: Sequelize.DECIMAL(5,2),
        allowNull: true
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
    await queryInterface.dropTable('metricas_pacientes');
  }
};