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
      },
      tipo_plan: {
        type: Sequelize.ENUM('original', 'alternativo', 'ajuste'),
        allowNull: false
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
      },
      fecha_inicio: {
        type: Sequelize.DATE
      },
      fecha_fin: {
        type: Sequelize.DATE
      },
      calorias_diarias: {
        type: Sequelize.INTEGER
      },
      detalles: {
        type: Sequelize.TEXT
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
