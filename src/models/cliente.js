'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cliente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Cliente.hasMany(models.Factura, { foreignKey: 'CedulaC' });
    }
  }
  Cliente.init({
    CedulaC: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    NombreC:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'El Nombre no puede ser nulo'
        },
        notEmpty: {
          msg: 'El Nombre no puede estar en blanco'
        }
      }
    },
    DireccionC: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'La Direccion no puede ser nulo'
        },
        notEmpty: {
          msg: 'La Direccion no puede estar en blanco'
        }
      }
    },
    CiudadC: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'La Direccion no puede ser nulo'
        },
        notEmpty: {
          msg: 'La Direccion no puede estar en blanco'
        }
      }
    },
    Telefono: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'El Teléfono no puede ser nulo'
        },
        notEmpty: {
          msg: 'El Teléfono no puede estar en blanco'
        },
        numero(value) {
          const numeros = value.toString();
          if (numeros.length !== 8) {
            throw new Error('El Teléfono debe tener 8 dígitos');
          }
        }}}
  }, {
    sequelize,
    modelName: 'Cliente',
  });
  return Cliente;
};