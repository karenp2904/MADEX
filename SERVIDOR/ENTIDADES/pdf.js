const nodemailer = require('nodemailer');
const QRCode = require('qrcode-generator');
const PDFDocument = require('pdfkit');
const fs = require('fs');



async function generarQR(contenidoPDF, nivelCorreccion, tipoNumero) {
    try {
        const qr = QRCode(0, tipoNumero);
        qr.addData(contenidoPDF);
        qr.make();
        const qrDataURL = qr.createDataURL(nivelCorreccion);
        return qrDataURL;
    } catch (error) {
        console.error('Error al generar el código QR:', error);
        throw error;
    }
}


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


/// Función para dibujar la tabla
function drawTable(doc, tableHeaders, tableRows, xPositions, y, columnWidths, rowHeight) {
    doc.font('Helvetica-Bold').fontSize(12);
    doc.fillColor('#000'); // Establecer color de texto negro

    // Dibujar encabezados de columna con bordes y fondo coloreado
    for (let i = 0; i < tableHeaders.length; i++) {
        doc.rect(xPositions[i], y, columnWidths[i], rowHeight).fill('#f2f2f2').stroke();
        doc.text(tableHeaders[i], xPositions[i] + columnWidths[i] / 2, y + rowHeight / 2, {
            width: columnWidths[i],
            align: 'center',
            valign: 'center'
        }); // Establecer color de texto negro;
    }

    // Dibujar filas de la tabla con bordes y texto centrado
    doc.font('Helvetica').fontSize(10);
    for (let i = 0; i < tableRows.length; i++) {
        const row = tableRows[i];
        const yPos = y + (i ) * rowHeight;
        for (let j = 0; j < row.length; j++) {
            doc.rect(xPositions[j], yPos, columnWidths[j], rowHeight).stroke();
            doc.text(row[j], xPositions[j] + columnWidths[j] / 2, yPos + rowHeight / 2, {
                width: columnWidths[j],
                align: 'center',
                valign: 'center'
            }).fillColor('#000'); // Establecer color de texto negro
        }
    }
}







async function generarPDF(usuario, direccion, metodoPago, listaProductos, totalCompra, filePath) {
    const pdfDoc = new PDFDocument();
    const pdfStream = fs.createWriteStream(filePath);

    pdfDoc.pipe(pdfStream);


    // Establecer márgenes
    pdfDoc.page.margins = { top: 50, bottom: 50, left: 50, right: 50 };

    // Definir la posición y tamaño del logo
    const logoX = pdfDoc.page.margins.left-50;
    const logoY = pdfDoc.page.margins.top - 50;
    const logoWidth = 150;
    const logoHeight = 150;

    // Insertar el logo de la empresa en la parte izquierda
    const logoPath = './SERVIDOR/ENTIDADES/logo.png'; // Ruta al archivo de imagen del logo
    pdfDoc.image(logoPath, logoX, logoY, { width: logoWidth, height: logoHeight });

    // Definir la posición y tamaño del área de texto para la información
    const infoX = logoX + logoWidth + 20; // Separación entre el logo y la información
    const infoYY = logoY - 40;
    const infoWidth = pdfDoc.page.width - pdfDoc.page.margins.right - infoX;
    const infoHeight = logoHeight;

     // Insertar la información del cliente y la dirección en paralelo al lado derecho
    //pdfDoc.text(infoX, infoYY);

        // Agregar título
    pdfDoc.font('Helvetica-Bold').fontSize(13).text('Factura', { align: 'right' });

    // Obtener el número de factura (aquí lo supondré como una variable)
    const numeroFactura = 'N° 123456';

    // Definir las coordenadas y dimensiones del recuadro
    const recuadroX = pdfDoc.x + 400;
    const recuadroY = pdfDoc.y + 10; // Mover un poco hacia abajo desde la posición actual
    const recuadroWidth = 100;
    const recuadroHeight = 20;

    // Dibujar el recuadro
    pdfDoc.rect(recuadroX, recuadroY, recuadroWidth, recuadroHeight).stroke();

    // Agregar el número de factura dentro del recuadro
    pdfDoc.text(`${numeroFactura}`, recuadroX + 10, recuadroY + 7);

    // Mover la posición actual hacia abajo
    pdfDoc.moveDown();

    
    // Agregar información del cliente y dirección
    pdfDoc.moveDown().fontSize(12);
    

    // Información del cliente
    const clienteX = pdfDoc.page.margins.left;
    const direccionX = pdfDoc.page.width / 2 + 20;
    const infoY = pdfDoc.y;

    pdfDoc.moveDown().fontSize(12);
    pdfDoc.font('Helvetica-Bold').text('Información del Cliente\n', clienteX, infoY, { continued: true });

    pdfDoc.moveDown().fontSize(12);
    pdfDoc.font('Helvetica-Bold').text('Nombre:', clienteX-130, infoY+20, { continued: true });
    pdfDoc.font('Helvetica').text(` ${usuario.nombre_usuario}`, { align: 'left' });

    pdfDoc.moveDown().fontSize(12);
    pdfDoc.font('Helvetica-Bold').text('Tipo de Documento:', clienteX, pdfDoc.y-10, { continued: true });
    pdfDoc.font('Helvetica').text(` ${usuario.tipo_documento}`, { align: 'left' });
    pdfDoc.font('Helvetica-Bold').text('\nNúmero de Documento:', clienteX, pdfDoc.y-10, { continued: true });
    pdfDoc.font('Helvetica').text(` ${usuario.id_usuario}`, { align: 'left' });

    pdfDoc.moveDown().fontSize(12);
    pdfDoc.font('Helvetica-Bold').text('Teléfono:', clienteX, pdfDoc.y-10, { continued: true });
    pdfDoc.font('Helvetica').text(` ${usuario.telefono}`, { align: 'left' });
    pdfDoc.font('Helvetica-Bold').text('\nCorreo:', clienteX, pdfDoc.y-10, { continued: true });
    pdfDoc.font('Helvetica').text(` ${usuario.correo}`, { align: 'left' });

    // Dirección
    pdfDoc.moveDown().fontSize(12);
    pdfDoc.moveDown().fontSize(12);
    pdfDoc.font('Helvetica-Bold').text('País:', direccionX, infoY+20, { continued: true });
    pdfDoc.font('Helvetica').text(` ${'COLOMBIA'}`, { align: 'left' });

    pdfDoc.moveDown().fontSize(12);
    pdfDoc.font('Helvetica-Bold').text('Departamento:', direccionX, pdfDoc.y-10, { continued: true });
    pdfDoc.font('Helvetica').text(` ${direccion.departamento}`, { align: 'left' });

    pdfDoc.moveDown().fontSize(12);
    pdfDoc.font('Helvetica-Bold').text('Ciudad:', direccionX, pdfDoc.y-10, { continued: true });
    pdfDoc.font('Helvetica').text(` ${direccion.Ciudad}`, { align: 'left' });

    pdfDoc.moveDown().fontSize(12);
    pdfDoc.font('Helvetica-Bold').text('Dirección:', direccionX, pdfDoc.y-10, { continued: true });
    pdfDoc.font('Helvetica').text(` ${direccion.barrio} ${direccion.Calle}`, { align: 'left' });

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

    // Calcular el ancho total de la tabla
    const totalTableWidth = pdfDoc.page.width - pdfDoc.page.margins.left - pdfDoc.page.margins.right;

    // Calcular el ancho de cada columna
    const numColumns = tableHeaders.length;
    const columnWidths = Array.from({ length: numColumns }, () => totalTableWidth / numColumns);

    // Calcular las posiciones x para cada columna
    const xPositions = [];
    let currentX = pdfDoc.page.margins.left -30;
    for (let i = 0; i < numColumns; i++) {
        xPositions.push(currentX);
        currentX += columnWidths[i];
    }

    // Calcular la altura de cada fila de la tabla
    const fontSize = 10; // Tamaño de la fuente en puntos
    const lineHeight = fontSize * 1.2; // Altura de línea aproximada (ajustable)
    const rowHeight = lineHeight + 5; // Altura de fila con un pequeño espacio adicional


    // Calcular la posición y inicial
    let y = pdfDoc.y + 15;

    // Dibujar la tabla con el contenido alineado y columnas más anchas
    drawTable(pdfDoc, tableHeaders, tableRows, xPositions, y, columnWidths, rowHeight);




    // Agregar total de la compra
    pdfDoc.moveDown
    pdfDoc.moveDown().fontSize(12);
    pdfDoc.moveDown().fontSize(10).text(`Total de la compra: $${totalCompra.toFixed(2)}`, { align: 'center' });

    pdfStream.on('finish', async () => {
        console.log('PDF generado exitosamente.');
    /*
        // Ruta al archivo PDF
        const rutaPDF = 'C:/Users/HP VICTUS/Documents/MADEX/factura.pdf';
    
        // Leer el contenido del archivo PDF como texto
        const contenidoPDF = fs.readFileSync(rutaPDF, 'utf-8');
    
        // Verificar que el contenido sea una cadena de texto
        console.log(typeof contenidoPDF); // Debería imprimir "string"
    
        // Utilizar una función async para poder usar await
        try {
            const qrDataURL = await generarQR(contenidoPDF, 'L', 'Byte');
    
            // Insertar la imagen del código QR en el PDF
            const qrImage = pdfDoc.openImage(qrDataURL);
            const qrWidth = 100; // Ancho del código QR en el PDF
            const qrHeight = qrWidth; // Altura del código QR en el PDF
            const qrX = pdfDoc.page.width - pdfDoc.page.margins.right - qrWidth; // Posición X del código QR
            const qrY = pdfDoc.y + 50; // Posición Y del código QR
            pdfDoc.image(qrImage, qrX, qrY, { width: qrWidth, height: qrHeight });
    
            console.log('PDF con código QR generado exitosamente.');
        } catch (error) {
            console.error('Error al generar el código QR:', error);
        }
        */
    });
    

// Finalizar el documento PDF
pdfDoc.end();
/*
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
    */
}




async function guardarPDF(pdfBytes, filePath) {
    const fs = require('fs').promises;
    
    // Verificar si pdfBytes es un objeto y tiene la propiedad buffer
    if (pdfBytes && typeof pdfBytes === 'object' && pdfBytes.buffer) {
        const buffer = Buffer.from(pdfBytes.buffer);
        await fs.writeFile(filePath, buffer);
        console.log('PDF guardado exitosamente.');
    } else {
        console.error('Error al guardar el PDF: los datos del PDF son inválidos o están incompletos.');
        throw new Error('Datos del PDF inválidos');
    }
}


async function generarFacturaYEnviarCorreo(usuario, direccion, metodoPago, listaProductos, totalCompra) {
    try {
        // Generar el PDF y guardarlo en el sistema de archivos
        await generarPDF(usuario, direccion, metodoPago, listaProductos, totalCompra, 'factura.pdf');

        // Leer el PDF guardado
        const pdfBytes = await fs.promises.readFile('factura.pdf');

        // Enviar el correo electrónico con el PDF adjunto
       // await enviarCorreo(usuario, pdfBytes);
    } catch (error) {
        console.error('Error al generar y enviar la factura:', error);
        throw error;
    }
}





//------------------






module.exports = generarFacturaYEnviarCorreo;