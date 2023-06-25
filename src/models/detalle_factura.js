'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Detalle_Factura extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      /// define association here
    models.Detalle_Factura.belongsTo(models.Factura, { foreignKey: 'Num_Factura' });
    models.Detalle_Factura.belongsTo(models.Producto, { foreignKey: 'CodProducto' });
    }
  }
  Detalle_Factura.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    Categoria_Producto: DataTypes.INTEGER,
    Cantidad: DataTypes.INTEGER,
    Precio: DataTypes.INTEGER,
    Num_Factura: DataTypes.INTEGER,
    CodProducto: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Detalle_Factura',
  });
  return Detalle_Factura;
};