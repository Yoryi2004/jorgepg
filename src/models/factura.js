'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Factura extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Factura.belongsTo(models.Cliente, { foreignKey: 'CedulaC' });
      models.Factura.hasMany(models.Detalle_Factura, { foreignKey: 'Num_Factura' });
    }
  }
  Factura.init({
    Num_Factura: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    Fecha_Factura: DataTypes.DATE,
    CedulaC: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Factura',
  });
  return Factura;
};