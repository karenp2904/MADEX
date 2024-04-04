const nodemailer = require('nodemailer');

// Configuración del transporte para enviar correos
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'madex1500@gmail.com',
        pass: 'uesh rxak ifgu qcgz' // Reemplaza con tu contraseña de aplicación específica
    }
});

// Función para enviar el correo electrónico con el PDF adjunto
async function enviarCorreo(usuario, filePath) {
    try {
        // Adjunta el PDF al correo electrónico
        const mailOptions = {
            from: 'madex1500@gmail.com',
            to: usuario.correo,
            subject: 'Factura de compra',
            text: 'Adjuntamos la factura de tu compra.',
            attachments: [{
                filename: 'factura.pdf',
                path: filePath
            }]
        };

        // Envía el correo electrónico
        await transporter.sendMail(mailOptions);

        console.log('Correo enviado con la factura adjunta.');
    } catch (error) {
        console.error('Error al enviar el correo electrónico:', error);
        throw error;
    }
}
const PDFDocument = require('pdfkit');
const fs = require('fs');


function drawTable(doc, tableHeaders, tableRows, x, y, rowHeight, colWidth) {
    doc.font('Helvetica-Bold');
    doc.fillColor('#000').fontSize(12);

    // Dibujar encabezados de columna
    for (let i = 0; i < tableHeaders.length; i++) {
        doc.text(tableHeaders[i], x + i * colWidth, y, {
            width: colWidth,
            align: 'center'
        });
    }

    // Dibujar filas de la tabla
    doc.font('Helvetica').fontSize(10);
    for (let i = 0; i < tableRows.length; i++) {
        const row = tableRows[i];
        const yPos = y + (i + 1) * rowHeight;
        for (let j = 0; j < row.length; j++) {
            doc.text(row[j], x + j * colWidth, yPos, {
                width: colWidth,
                align: 'center'
            });
        }
    }
}

async function generarPDF(usuario, direccion, metodoPago, listaProductos, totalCompra, filePath) {
    const pdfDoc = new PDFDocument();
    const pdfStream = fs.createWriteStream(filePath);

    pdfDoc.pipe(pdfStream);

    // Establecer márgenes
    pdfDoc.page.margins = { top: 50, bottom: 50, left: 50, right: 50 };

    // Agregar título
    pdfDoc.font('Helvetica-Bold').fontSize(20).text('Factura de Compra', { align: 'center' });

    
    // Agregar información del cliente y dirección
    pdfDoc.moveDown().fontSize(12);
    pdfDoc.moveDown().fontSize(12);
    pdfDoc.font('Helvetica-Bold').text('Información del Cliente', { align: 'left' });

    // Información del cliente
    const clienteX = pdfDoc.page.margins.left;
    const direccionX = pdfDoc.page.width / 2 + 20;
    const infoY = pdfDoc.y;

    pdfDoc.moveDown().fontSize(12);
    pdfDoc.font('Helvetica-Bold').text('Nombre:', clienteX, infoY, { continued: true });
    pdfDoc.font('Helvetica').text(` ${usuario.nombre}`, { align: 'left' });

    pdfDoc.moveDown().fontSize(12);
    pdfDoc.font('Helvetica-Bold').text('Tipo de Documento:', clienteX, pdfDoc.y, { continued: true });
    pdfDoc.font('Helvetica').text(` ${usuario.tipo_documento}`, { align: 'left' });
    pdfDoc.font('Helvetica-Bold').text('\nNúmero de Documento:', clienteX, pdfDoc.y, { continued: true });
    pdfDoc.font('Helvetica').text(` ${usuario.id_usuario}`, { align: 'left' });

    pdfDoc.moveDown().fontSize(12);
    pdfDoc.font('Helvetica-Bold').text('Teléfono:', clienteX, pdfDoc.y, { continued: true });
    pdfDoc.font('Helvetica').text(` ${usuario.telefono}`, { align: 'left' });
    pdfDoc.font('Helvetica-Bold').text('\nCorreo:', clienteX, pdfDoc.y, { continued: true });
    pdfDoc.font('Helvetica').text(` ${usuario.correo}`, { align: 'left' });

    // Dirección
    pdfDoc.moveDown().fontSize(12);
    pdfDoc.font('Helvetica-Bold').text('País:', direccionX, infoY, { continued: true });
    pdfDoc.font('Helvetica').text(` ${direccion.pais}`, { align: 'left' });

    pdfDoc.moveDown().fontSize(12);
    pdfDoc.font('Helvetica-Bold').text('Departamento:', direccionX, pdfDoc.y, { continued: true });
    pdfDoc.font('Helvetica').text(` ${direccion.departamento}`, { align: 'left' });

    pdfDoc.moveDown().fontSize(12);
    pdfDoc.font('Helvetica-Bold').text('Ciudad:', direccionX, pdfDoc.y, { continued: true });
    pdfDoc.font('Helvetica').text(` ${direccion.ciudad}`, { align: 'left' });

    pdfDoc.moveDown().fontSize(12);
    pdfDoc.font('Helvetica-Bold').text('Dirección:', direccionX, pdfDoc.y, { continued: true });
    pdfDoc.font('Helvetica').text(` ${direccion.direccion}`, { align: 'left' });

    pdfDoc.moveDown().fontSize(12);
    // Agregar método de pago
    pdfDoc.moveDown().fontSize(12).text(`Método de pago: ${metodoPago}`, { align: 'left' });

    // Agregar tabla de productos
    pdfDoc.moveDown().fontSize(12);
    const tableHeaders = ['ID Producto', 'Nombre', 'Cantidad', 'Precio'];
    const tableRows = listaProductos.map(producto => {
        if (producto && producto.producto) {
            return [
                producto.producto.id_producto.toString(),
                producto.producto.nombre.toString(),
                producto.cantidad.toString(),
                `$${producto.producto.precio.toFixed(2)}`,
            ];
        } else {
            return ['Producto no definido', '', '', ''];
        }
    });

    // Función para dibujar la tabla
    const x = pdfDoc.page.margins.left;
    let y = pdfDoc.y + 15;
    const rowHeight = 20;
    const colWidth = (pdfDoc.page.width - pdfDoc.page.margins.left - pdfDoc.page.margins.right) / tableHeaders.length;

    drawTable(pdfDoc, tableHeaders, tableRows, x, y, rowHeight, colWidth);

    // Agregar total de la compra
    pdfDoc.moveDown
    pdfDoc.moveDown().fontSize(12);
    pdfDoc.moveDown().fontSize(10).text(`Total de la compra: $${totalCompra.toFixed(2)}`, { align: 'center' });

    pdfDoc.end();

    return new Promise((resolve, reject) => {
        pdfStream.on('finish', () => {
            console.log('PDF generado exitosamente');
            resolve();
        });
        pdfStream.on('error', (error) => {
            console.error('Error al generar el PDF:', error);
            reject(error);
        });
    });
}




async function guardarPDF(pdfBytes, filePath) {
    const fs = require('fs').promises;
    
    // Verificar si pdfBytes es válido y tiene la propiedad buffer
    if (pdfBytes && pdfBytes.buffer) {
        const buffer = Buffer.from(pdfBytes.buffer);
        await fs.writeFile(filePath, buffer);
        console.log('PDF guardado exitosamente.');
    } else {
        console.error('Error al guardar el PDF: los datos del PDF son inválidos o están incompletos.');
        throw new Error('Datos del PDF inválidos');
    }
}

// Llamada a las funciones para generar el PDF, guardarlo y enviarlo por correo
async function generarFacturaYEnviarCorreo(usuario, direccion, metodoPago, listaProductos, totalCompra) {
    try {
        // Generar el PDF y guardarlo en el sistema de archivos
        await generarPDF(usuario, direccion, metodoPago, listaProductos, totalCompra, 'factura.pdf');

        // Leer el PDF guardado
        const pdfBytes = await fs.promises.readFile('factura.pdf');

        // Enviar el correo electrónico con el PDF adjunto
        //await enviarCorreo(usuario, pdfBytes);
    } catch (error) {
        console.error('Error al generar y enviar la factura:', error);
        throw error;
    }
}

module.exports = generarFacturaYEnviarCorreo;

