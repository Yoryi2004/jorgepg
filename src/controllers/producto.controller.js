import models from "./../models";
class ProductoController{
    async  guardarProducto(req, res) {
      try {
        const producto = await models.Producto.create({
          CodProducto: req.body.CodProducto,
          Descripcion: req.body.Descripcion,
          Valor: req.body.Valor,
          Id_Categoria: req.body.Id_Categoria,
          Producto: req.body.Producto,
          Stock: req.body.Stock
        });
        return res.json({mensaje:"Prooducto Guardado"})
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
    async listarProducto(req, res) {
        try {
          const producto = await models.Producto.findAll();
          return res.json(producto);
        } catch (error) {
          console.error('Error al obtener el producto:', error);
          return res.status(500).json({ error: 'Error al obtener los Productos' });
        }
      }
      /*async BuscarProducto(req, res) {
        try {
          const producto = await models.Producto.findByPk(req.params.CodProducto);
          if (producto) {
            res.status(200).json({ producto });
          } else {
            res.status(404).json({ mensaje: 'Producto no encontrado' });
          }
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      }*/
      async buscarProducto(req, res) {
        try {
          const producto = await models.Producto.findOne({
            where: {
              Producto: req.params.Producto
            }
          });
      
          if (producto) {
            res.status(200).json(producto);
          } else {
            res.status(404).json({ mensaje: 'Producto no encontrado' });
          }
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      }
      
      async  actualizarProducto(req, res) {
        try {
          const producto = await models.Producto.findByPk(req.params.CodProducto);
          if (producto) {
            await producto.update({       
              Descripcion: req.body.Descripcion,
              Valor: req.body.Valor,
              Id_Categoria: req.body.Id_Categoria,
              Producto: req.body.Producto,
              Stock: req.body.Stock
            });
            res.status(200).json(producto);
          } else {
            res.status(404).json({ mensaje: 'Producto no encontrado' });
          }
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      }
      async eliminarProducto(req, res) {
        try {
          const producto = await models.Producto.findByPk(req.params.CodProducto);
          if (producto) {
            await producto.destroy();
            res.status(200).json({ mensaje: 'Producto eliminado exitosamente' });
          } else {
            res.status(404).json({ mensaje: 'Producto no encontrado' });
          }
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      }
} export const productoController = new ProductoController;