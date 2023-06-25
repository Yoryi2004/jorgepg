'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Productos', {
      CodProducto: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Descripcion: {
        type: Sequelize.STRING
      },
      Valor: {
        type: Sequelize.INTEGER
      },
      Id_Categoria: {
        type: Sequelize.INTEGER
      },
      Producto: {
        type: Sequelize.STRING
      },
      Stock: {
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
    await queryInterface.dropTable('Productos');
  }
};