import models from "../models"
import  PDFDocument from "pdfkit"

export const generarPDFFactura = async function (req,res)
{ 
    //primero creamos 
    const doc =new PDFDocument({bufferPages:true,
        layout: 'landscape',
        size: 'A4'  
            });
            let buffers=[];

            // Configuramos el documento
            doc.on('data',buffers.push.bind(buffers))
            
            doc.on('end',()=>{
                let pdfData = Buffer.concat(buffers)
                  res.writeHead(200,{
                  'Content-Length':Buffer.byteLength(pdfData),
                  'Content-Type': 'application/pdf',  
                 }).end(pdfData)
            })
            doc.image('public/logo.png', 680, 88, { width: 70 });
            // Customer information
            const Cliente = {
            NombreC: 'John Doe',
            DireccionC: '123 Calle Principal',
            CedulaC: '1234567',
            CiudadC: 'Ciudad Ejemplo',
            Telefono: '555-1234'
            };

            doc.fillColor('#000000')
            .fontSize(25)
            .text('Factura', 260, 60,{aling:'center'})
            .fontSize(10)
            
            // Encabezado del cliente
            doc
            .font('Helvetica-Bold')
            .text('Nombre del Cliente:', 50, 100)
            .text('Dirección:', 480, 100)
            .text('CI:', 50, 140)
            .text('Ciudad:', 480, 140)
            .text('Teléfono:', 50, 180)
            /*.text(Cliente.NombreC, 170, 100)
            .text(Cliente.DireccionC, 540, 100)
            .text(Cliente.CedulaC, 170, 140)
            .text(Cliente.CiudadC, 540, 140)
            .text(Cliente.Telefono, 170, 180)
            .font('Helvetica');*/
            const listarCliente = await models.Cliente.findAll();
            listarCliente.forEach((cliente, index) => {
                doc.fontSize(12)
                  .text(` ${cliente.NombreC}`, 170, 100)
                  .text(` ${cliente.DireccionC}`, 540, 100)
                  .text(` ${cliente.CedulaC}`, 170, 140)
                  .text(` ${cliente.CiudadC}`, 540, 140)
                  .text(` ${cliente.Telefono}`, 170, 180)
                  .font('Helvetica');
                doc.moveDown();
              });
            //insertamo la consulta producto 
            const lista = await models.Producto.findAll();
            doc.fillColor('#00000')
            .fontSize(25)
            .text('Detalle Factura', 260, 205,{aling:'center'})
            .fontSize(10)

            //Encabezado de los productos 
            .font('Helvetica-Bold')
            .text('Categoria', 50, 245, { aling: 'center' })
            .text('Descripcion', 210, 245, { aling: 'center' })
            .text('Codigo Barra', 380, 245, { aling: 'center' })
            .text('Valor', 480, 245, { aling: 'center' })
            .text('Cantidad', 540, 245, { aling: 'center' })
            .text('Precio', 625, 245, { aling: 'center' })
            .font('Helvetica');
            
            
           let inicio_y=200;
            for(let i=0;i<lista.length;i++){
                doc.moveDown();
                const lista_producto = lista[i]
                
                doc.fontSize(12)
                .fillColor('#000')
                .text(lista_producto.categoria,60,inicio_y)                
                .text(lista_producto.descripcion,200,inicio_y,{width: 70})
                .text(lista_producto.codigobarra,280,inicio_y,{width: 70})
                .text(lista_producto.valor, 360, inicio_y, { width: 70 })
                .text(lista_producto.cantidad, 420, inicio_y, { width: 70 })
                .text(lista_producto.precio, 480, inicio_y, { width: 70 });
                inicio_y=inicio_y+20;
            }

            //LINEAS
            let v1 = 55
            doc.moveTo(38, 520).lineTo(38, v1).stroke(); 
            doc.moveTo(750, 520).lineTo(750, v1).stroke();
            // Agregar líneas verticales
            let y = 230;
            doc.moveTo(110, 490).lineTo(110, y).stroke(); // Línea entre 'Categoría' y 'Descripción'
            doc.moveTo(360, 490).lineTo(360, y).stroke(); // Línea entre 'Descripción' y 'Código de Barras'
            doc.moveTo(460, 490).lineTo(460, y).stroke(); // Línea entre 'Código de Barras' y 'Valor'
            doc.moveTo(520, 490).lineTo(520, y).stroke(); // Línea entre 'Valor' y 'Cantidad'
            doc.moveTo(600, 490).lineTo(600, y).stroke(); // Línea entre 'Cantidad' y 'Precio'

            const listaProductos = await models.Producto.findAll();
            listaProductos.forEach((producto, index) => {
                doc.fontSize(12)
                  .text(` ${producto.Id_Categoria}`, 70, 290 + index * 20)
                  .text(` ${producto.Descripcion}`, 210, 290 + index * 20)
                  .text(` ${producto.CodProducto}`, 380, 290 + index * 20)
                  .text(` ${producto.Valor}`, 480, 290 + index * 20)
                doc.moveDown();
              });

              const listarFac = await models.Detalle_Factura.findAll();
              listarFac.forEach((detalle_factura, index) => {
                doc.fontSize(12)
                  .text(` ${detalle_factura.Cantidad}`, 540, 290 + index * 20)
                  .text(` ${detalle_factura.Precio}`, 625, 290 + index * 20);
                doc.moveDown();
              });
              

            //linea horizontal
            let l1 = 55
            doc.moveTo(40, l1).lineTo(750, l1).stroke();
            let l2 = 85
            doc.moveTo(40, l2).lineTo(750, l2).stroke();
            let l3 = 200
            doc.moveTo(40, l3).lineTo(750, l3).stroke();
            let l4 = 230
            doc.moveTo(40, l4).lineTo(750, l4).stroke();
            let l5 = 260
            doc.moveTo(40, l5).lineTo(750, l5).stroke();
            let l6 = 490
            doc.moveTo(40, l6).lineTo(750, l6).stroke();
            let l7 = 520
            doc.moveTo(40, l7).lineTo(750, l7).stroke();
            // Totales
            let total = 0;
            listaProductos.forEach((producto) => {
              total += producto.Valor;
            });
            doc.font('Helvetica-Bold')
              .text('Total:', 500, inicio_y + 215, { align: 'center' })
              .font('Helvetica')
              .text(total.toString(), 550, inicio_y + 215, { align: 'center' });
            doc.end();
}