'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Usuario.init({
    User: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    Contraseña: DataTypes.STRING,
    Nombre: DataTypes.STRING,
    Apellido: DataTypes.STRING,
    Correo: DataTypes.STRING,
    Telefono: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Usuario',
  });
  return Usuario;
};