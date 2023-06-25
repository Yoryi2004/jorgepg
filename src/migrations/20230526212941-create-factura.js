'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Facturas', {
      Num_Factura: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Fecha_Factura: {
        type: Sequelize.DATE
      },
      CedulaC:  {
        allowNull: false,
        references: {
          model: {
            tableName: 'Clientes'
          },
          key: 'CedulaC'
        },
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Facturas');
  }
};