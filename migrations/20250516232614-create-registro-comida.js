'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('registro_comidas', {
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
      
      tipo_comida: {
        type: Sequelize.ENUM('desayuno', 'almuerzo', 'cena', 'snack'),
        allowNull: false,
      },
      fecha: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      notas: {
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable('registro_comidas');
  }
};