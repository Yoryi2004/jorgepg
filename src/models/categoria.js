'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categoria extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
     models.Categoria.hasMany(models.Producto, { foreignKey: 'Id_Categoria' });
    }
  }
  Categoria.init({
    Id_Categoria:{
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    Nombre: DataTypes.STRING,
    Descripcion: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Categoria',
  });
  return Categoria;
  //id categoria, llave foranea, id categoria, registrando facture que registre con id y no con carne
};