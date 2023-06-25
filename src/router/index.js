import {Router} from "express"
export const Route = Router();
import { clienController } from "../controllers/cliente.controller";
import { detalle_facturaController } from "../controllers/detalle_factura.controller";
import { facturaController } from "../controllers/factura.controller";
import { productoController } from "../controllers/producto.controller";
import { categoriaController } from "../controllers/categoria.controller";
import { rawListeners, roundedRect } from "pdfkit";
import * as facturaReporteController from "../controllers/FacturaReporte.controller";
import { userController } from "../controllers/user.controller";
import { auth } from "../middlewares.js/auth.middlewares";
//endpoint
Route.get('/inicio',function(req, res){
    res.json({
    mensaje:"hola curso backend",
    error:false
    })
});
//end point para reportar factura
Route.get('/reporteFactura',facturaReporteController.generarPDFFactura);
//cliente
Route.post('/cliente',clienController.guardarCliente);
Route.get('/cliente',clienController.listarCliente);
Route.get('/cliente/:CedulaC',clienController.listarClienteC);
Route.get('/cliente/:CiudadC',clienController.listarClientesSantaCruz);
Route.put('/cliente/:CedulaC',clienController.actualizarcliente);
Route.delete('/cliente/:CedulaC',clienController.eliminarcliente);

//detalle factura
Route.post('/factura',detalle_facturaController.guardarFac);
Route.get('/factura',detalle_facturaController.listarFac);
Route.get('/factura/:Num_Factura',detalle_facturaController.listarnumfac)
Route.put('/factura/:id',detalle_facturaController.actualizarFac);
Route.delete('/factura/:id',detalle_facturaController.eliminarfac);
//factura
Route.post('/fac',facturaController.guardarFactura);
Route.get('/fac',facturaController.listarFactura);
Route.put('/fac/:Num_Factura',facturaController.actualizarFactura);
Route.delete('/fac/:Num_Factura',facturaController.eliminarfactura);
//Route.get('',facturaController.listarProductosFactura);
Route.get('/fac/:Num_Factura/producto',facturaController.listarProductosFactura);
//producto
Route.post('/producto',productoController.guardarProducto);
Route.get('/producto',productoController.listarProducto);
Route.get('/producto/:Producto',productoController.buscarProducto);
Route.put('/producto/:CodProducto',productoController.actualizarProducto);
Route.delete('/producto/:CodProducto',productoController.eliminarProducto);
//categoria
Route.post('/categoria',categoriaController.guardarCategoria);
Route.get('/categoria',categoriaController.listarCategoria);
Route.get('/categoria/:Nombre',categoriaController.BuscarCategoria);
Route.put('/categoria/:Id_Categoria',categoriaController.actualizarCategoria);
Route.delete('/categoria/:Id_Categoria',categoriaController.eliminarCategoria);
//user
Route.post('/usuario',userController.createUser);
Route.get('/usuario',auth,userController.loginUser);
Route.delete('/usuario/:User',userController.eliminarUsuario);