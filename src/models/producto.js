'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Producto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Producto.belongsTo(models.Categoria, { foreignKey: 'Id_Categoria' });
      models.Producto.hasMany(models.Detalle_Factura, { foreignKey: 'CodProducto' });
    }
  }
  Producto.init({
    CodProducto: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    Descripcion: DataTypes.STRING,
    Valor: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0
      }
    },
    Id_Categoria: DataTypes.INTEGER,
    Producto: DataTypes.STRING,
    Stock: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Producto',
  });
  return Producto;
};