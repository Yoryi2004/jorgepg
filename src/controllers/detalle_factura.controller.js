import models from "./../models";
class Detalle_facturaController{
    async  guardarFac(req, res) {
        try {
          const factura = await models.Detalle_Factura.create({
            id: req.body.id,
            Categoria_Producto: req.body.Categoria_Producto,
            Cantidad: req.body.Cantidad,
            Precio: req.body.Precio,
            Num_Factura: req.body.Num_Factura,
            CodProducto: req.body.CodProducto
          });
          return res.json({mensaje:"Detalle de Factura Guardada"})
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      }
      async listarFac(req, res) {
          try {
            const factura = await models.Detalle_Factura.findAll();
            return res.json(factura);
          } catch (error) {
            console.error('Error al obtener los Detalles de Facturas:', error);
            return res.status(500).json({ error: 'Error al obtener los Detalles de Facturas' });
          }
        }
        async listarnumfac(req,res)
        {
          try{
            const numfacid = req.params.Num_Factura; 
            const productos = await models.Detalle_Factura.findAll({
              where: {
                Num_Factura: numfacid 
              },
              include: [
                {
                  model: models.Producto, 
               //   attributes: ['Num_Factura']
                   
                }
              ]
            });
            return res.json(productos);
          } catch (error)
          {console.error('Error al obtener el numero de facturas',error);
        return res.status(500).json({error: 'Error numFac'});}
        }
        async  actualizarFac(req, res) {
          try {
            const factura = await models.Detalle_Factura.findByPk(req.params.id);
            if (factura) {
              await factura.update({       
                Categoria_Producto: req.body.Categoria_Producto,
                Cantidad: req.body.Cantidad,
                Precio: req.body.Precio,
                CodProducto: req.body.CodProducto
              });
              res.status(200).json(factura);
            } else {
              res.status(404).json({ mensaje: 'Detalle de Factura no encontrada' });
            }
          } catch (error) {
            res.status(500).json({ error: error.message });
          }
        }
        async eliminarfac(req, res) {
          try {
            const factura = await models.Detalle_Factura.findByPk(req.params.id);
            if (factura) {
              await factura.destroy();
              res.status(200).json({ mensaje: 'Detalle de Factura eliminada exitosamente' });
            } else {
              res.status(404).json({ mensaje: 'Detalle de Factura no encontrada' });
            }
          } catch (error) {
            res.status(500).json({ error: error.message });
          }
        }
} export const detalle_facturaController = new Detalle_facturaController;