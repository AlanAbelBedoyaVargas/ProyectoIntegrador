'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('comidas_plans', {
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
      id_plan: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'plans',
            schema: 'public'
          },
          key: "id",
        },
        allowNull: false
      },
      dia_semana: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 0, // Domingo
          max: 6  // Sábado
        }
      },
      tipo_comida: {
        type: Sequelize.ENUM('desayuno', 'almuerzo', 'cena', 'snack'),
        allowNull: false,
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
    await queryInterface.dropTable('comidas_plans');
  }
};