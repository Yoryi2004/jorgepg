'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Clientes', {
      CedulaC: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      NombreC: {
        type: Sequelize.STRING
      },
      DireccionC: {
        type: Sequelize.STRING
      },
      CiudadC: {
        type: Sequelize.STRING
      },
      Telefono: {
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
    await queryInterface.dropTable('Clientes');
  }
};