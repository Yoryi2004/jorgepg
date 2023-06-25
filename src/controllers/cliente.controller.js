import models from "./../models";

class ClienteController{
    async  guardarCliente(req, res) {
      try {
        const cliente = await models.Cliente.create({
          CedulaC: req.body.CedulaC,
          NombreC: req.body.NombreC,
          DireccionC: req.body.DireccionC,
          CiudadC: req.body.CiudadC,
          Telefono: req.body.Telefono
        });
        return res.json({mensaje:"Cliente Guardado"})
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
    async listarClientesSantaCruz(req, res) {
      try {
        const clientesSantaCruz = await models.Cliente.findAll({
          where: {
            CiudadC: 'Santa Cruz'
          }
        });
        return res.json(clientesSantaCruz);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
    async listarCliente(req, res) {
        try {
          const clientes = await models.Cliente.findAll();
          return res.json(clientes);
        } catch (error) {
          console.error('Error al obtener los clientes:', error);
          return res.status(500).json({ error: 'Error al obtener los clientes' });
        }
      }
      async listarClienteC(req, res) {
        try {
          const cliente = await models.Cliente.findByPk(req.params.CedulaC);
          if (cliente) {
            return res.json(cliente);
            res.status(200).json(cliente);
          } else {
            res.status(404).json({ mensaje: 'Cliente no encontrado' });
          }
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      }
      async  actualizarcliente(req, res) {
        try {
          const cliente = await models.Cliente.findByPk(req.params.CedulaC);
          if (cliente) {
            await cliente.update({       
              NombreC: req.body.NombreC,
              DireccionC: req.body.DireccionC,
              CiudadC: req.body.CiudadC,
              Telefono: req.body.Telefono
            });
            res.status(200).json(cliente);
          } else {
            res.status(404).json({ mensaje: 'Cliente no encontrado' });
          }
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      }
      async eliminarcliente(req, res) {
        try {
          const cliente = await models.Cliente.findByPk(req.params.CedulaC);
          if (cliente) {
            await cliente.destroy();
            res.status(200).json({ mensaje: 'Cliente eliminado exitosamente' });
          } else {
            res.status(404).json({ mensaje: 'Cliente no encontrado' });
          }
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      }
} export const clienController = new ClienteController;