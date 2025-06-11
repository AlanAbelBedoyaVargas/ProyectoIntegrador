'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('plans', {
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
      titulo: {
        type: Sequelize.STRING,
        allowNull: true
      },
      tipo_plan: {
        type: Sequelize.ENUM('original', 'alternativo'),
        allowNull: false,
        defaultValue: 'original'
      },
      descripcion: {
        type: Sequelize.TEXT,
        allowNull: true
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
      id_nutricionista: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'nutricionistas',
            schema: 'public'
          },
          key: "id",
        },
        allowNull: false
      },
      fecha_inicio: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      fecha_fin: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      calorias_diarias: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      id_plan_base: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'plans',
            schema: 'public'
          },
          key: "id",
        },
        allowNull: true
      },
      generado_ia: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      activo: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
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

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('plans');
  }
};
