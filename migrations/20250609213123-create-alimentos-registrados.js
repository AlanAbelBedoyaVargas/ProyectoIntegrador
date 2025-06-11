'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('alimentos_registrados', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_registro_comida: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'registro_comidas',
            schema: 'public'
          },
          key: "id",
        },
        allowNull: false
      },
      id_alimento: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'alimentos',
            schema: 'public'
          },
          key: "id",
        },
        allowNull: false
      },
      cantidad_g: {
        type: Sequelize.DECIMAL(5,2),
        allowNull: true
      },
      calorias_calculadas: {
        type: Sequelize.DECIMAL(5,2),
        allowNull: true
      },
      proteinas_calculadas: {
        type: Sequelize.DECIMAL(5,2),
        allowNull: true
      },
      carbohidratos_calculados: {
        type: Sequelize.DECIMAL(5,2),
        allowNull: true
      },
      grasas_calculadas: {
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
    await queryInterface.dropTable('alimentos_registrados');
  }
};