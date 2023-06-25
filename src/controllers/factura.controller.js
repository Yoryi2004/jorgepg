import detalle_factura from "../models/detalle_factura";
import models from "./../models";
class FacturaController{
    async  guardarFactura(req, res) {
        try {
          const factura = await models.Factura.create({
            Num_Factura: req.body.Num_Factura,
            Fecha_Factura: req.body.Fecha_Factura,
            CedulaC: req.body.CedulaC
          });
          return res.json({mensaje:"Factura Guardada"})
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      }
      async listarFactura(req, res) {
          try {
            const factura = await models.Factura.findAll();
            return res.json(factura);
          } catch (error) {
            console.error('Error al obtener las Facturas:', error);
            return res.status(500).json({ error: 'Error al obtener los Facturas' });
          }
        }
        async  actualizarFactura(req, res) {
          try {
            const factura = await models.Factura.findByPk(req.params.Num_Factura);
            if (factura) {
              await factura.update({       
                Fecha_Factura: req.body.Fecha_Factura,
                CedulaC: req.body.CedulaC
              });
              res.status(200).json(factura);
            } else {
              res.status(404).json({ mensaje: 'Factura no encontrada' });
            }
          } catch (error) {
            res.status(500).json({ error: error.message });
          }
        }
        async eliminarfactura(req, res) {
          try {
            const factura = await models.Factura.findByPk(req.params.Num_Factura);
            if (factura) {
              await factura.destroy();
              res.status(200).json({ mensaje: 'Factura eliminada exitosamente' });
            } else {
              res.status(404).json({ mensaje: 'Factura no encontrada' });
            }
          } catch (error) {
            res.status(500).json({ error: error.message });
          }
        }
        async listarProductosFactura(req, res) {
          try {
            const facturaId = req.params.Num_Factura; 
            const productos = await models.Detalle_Factura.findAll({
              where: {
                num_factura: facturaId 
              },
              include: [
                {
                  model: models.Producto, 
                  attributes: ['CodProducto', 'Descripcion', 'Valor','Producto','Stock'] 
                }
              ]
            });
            res.status(200).json(productos);
          } catch (error) {
            res.status(500).json({ error: error.message });
          }
        }
} export const facturaController = new FacturaController;