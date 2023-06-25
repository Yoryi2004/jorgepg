import models from "./../models";
class CategoriaController{
    async  guardarCategoria(req, res) {
      try {
        const categoria = await models.Categoria.create({
          Id_Categoria: req.body.Id_Categoria,
          Nombre: req.body.Nombre,
          Descripcion: req.body.Descripcion
        });
        return res.json({mensaje:"Categoria Guardado"})
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
    async listarCategoria(req, res) {
     try {
      const categoria = await models.Categoria.findAll();
      return res.json(categoria);
      } catch (error) {
      console.error('Error al obtener las Categoria:', error);
      return res.status(500).json({ error: 'Error al obtener las Categorias' });
      }
      }
    async BuscarCategoria(req, res) {
     try {
      const categoria = await models.Categoria.findOne({
        where: {
          Nombre: req.params.Nombre
          }
          });
      if (categoria) {
        res.status(200).json(categoria);
      } else {
        res.status(404).json({ mensaje: 'Categoria no encontrado' });
        }
      } catch (error) {
      res.status(500).json({ error: error.message });
      }
      }
    async  actualizarCategoria(req, res) {
    try {
      const categoria = await models.Categoria.findByPk(req.params.Id_Categoria);
      if (categoria) {
        await categoria.update({       
        Nombre: req.body.Nombre,
        Descripcion: req.body.Descripcion
        });
        res.status(200).json(categoria);
        } else {
        res.status(404).json({ mensaje: 'Categoria no encontrado' });
        }
        } catch (error) {
        res.status(500).json({ error: error.message });
        }
      }
    async eliminarCategoria(req, res) {
    try {
     const categoria = await models.Categoria.findByPk(req.params.Id_Categoria);
      if (categoria) {
                // Verificar si la categoría tiene productos asociados
      const productosAsociados = await models.Producto.count({
        where: {
          Id_Categoria: req.params.Id_Categoria
          }
           });
      if (productosAsociados > 0) {
            res.status(400).json({ mensaje: 'No se puede eliminar la categoría, tiene productos asociados' });
          } else {
                  // Realizar la eliminación física
          await categoria.destroy();
        res.status(200).json({ mensaje: 'Categoría eliminada exitosamente' });
        }
        } else {
         res.status(404).json({ mensaje: 'Categoría no encontrada' });
        }
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
          }
      /*
          if (categoria) {
            await categoria.destroy();
            res.status(200).json({ mensaje: 'Categoria eliminada exitosamente' });
          } else {
            res.status(404).json({ mensaje: 'Categoria no encontrado' });
          }
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      }*/
} export const categoriaController = new CategoriaController;