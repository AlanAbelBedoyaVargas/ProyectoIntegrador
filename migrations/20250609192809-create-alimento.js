'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('alimentos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid: {
        type: Sequelize.UUID
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      categoria: {
        type: Sequelize.STRING,
        allowNull: false
      },
      calorias_100g: {
        type: Sequelize.DECIMAL(5,2),
        allowNull: false
      },
      proteinas_g: {
        type: Sequelize.DECIMAL(5,2),
        allowNull: true
      },
      carbohidratos_g: {
        type: Sequelize.DECIMAL(5,2),
        allowNull: true
      },
      grasas_g: {
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
    await queryInterface.dropTable('alimentos');
  }
};