'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('nutricionistas', {
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
      numero_licencia: {
        type: Sequelize.STRING
      },
      especializacion: {
        type: Sequelize.STRING
      },
      anios_experiencia: {
        type: Sequelize.INTEGER
      },
      biografia: {
        type: Sequelize.TEXT
      },
      numero_contacto: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('nutricionistas');
  }
};