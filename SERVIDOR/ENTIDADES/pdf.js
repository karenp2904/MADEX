
const QRCode = require('qrcode');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const { Console } = require('console');



async function generarQR(contenidoQR, nivelCorreccion, tipoNumero) {
    try {
        const qrDataURL = await QRCode.toDataURL(contenidoQR, { errorCorrectionLevel: nivelCorreccion, type: tipoNumero });
        return qrDataURL;
    } catch (error) {
        console.error('Error al generar el código QR:', error);
        throw error;
    }
}

async function generarPDFConQR(contenidoPDF, qrContent, nombreArchivo) {
    const doc = new Document();

    // Creamos el stream de escritura del PDF
    const stream = fs.createWriteStream(nombreArchivo);
    doc.pipe(stream);

    // Insertamos el contenido del PDF
    try {
        // Generamos el código QR
        const qrDataURL = await generarQR(qrContent, 'M', 0);

        // Insertamos el código QR en el PDF
        doc.image(qrDataURL, 400, 10, { width: 150 });

        // Finalizamos el documento
        doc.end();

        console.log('Documento PDF con QR generado:', nombreArchivo);
    } catch (error) {
        console.error('Error al generar el PDF con QR:', error);
    }
}

async function generarQRyPDFRandom() {
    try {
        // Lee el contenido del archivo PDF
        const contenidoPDF = 'contenido';


        // Contenido aleatorio para el código QR
        const contenidoQR = 'Contenido del código QR aleatorio';

        // Nombre del archivo PDF
        const nombreArchivo = 'factura.pdf';

        // Genera el PDF con QR
        await generarPDFConQR(contenidoPDF, contenidoQR, nombreArchivo);
    } catch (error) {
        console.error('Error al leer el archivo PDF:', error);
    }
}

/*

// Función para dibujar la tabla
function drawTable(doc, tableHeaders, tableRows, xPositions, y, columnWidths, rowHeight) {
    doc.font('Helvetica-Bold').fontSize(12);
    doc.fillColor('#000'); // Establecer color de texto negro

    // Dibujar encabezados de columna con bordes y fondo coloreado
    for (let i = 0; i < tableHeaders.length; i++) {
        doc.rect(xPositions[i]+10, y, columnWidths[i], rowHeight).fill('#f2f2f2').stroke();
        doc.fillColor('#000').text(tableHeaders[i], xPositions[i]-40 + columnWidths[i] / 2, y + rowHeight / 2, {
            width: columnWidths[i],
            align: 'center',
            valign: 'center'
        });
    }


    // Dibujar filas de la tabla con bordes y texto centrado
    doc.font('Helvetica').fontSize(10);
    for (let i = 0; i < tableRows.length; i++) {
        const row = tableRows[i];
        const yPos = y + (i +1) * rowHeight; // Ajustar para que los encabezados estén en la posición correcta
        for (let j = 0; j < row.length; j++) {
            doc.rect(xPositions[j]+10, yPos, columnWidths[j], rowHeight).stroke();
            doc.text(row[j], xPositions[j] -40 + columnWidths[j] / 2, yPos + rowHeight / 2, {
                width: columnWidths[j],
                align: 'center',
                valign: 'center'
            }).fillColor('#000'); // Establecer color de texto negro
        }
    }
}
*/
function drawTable(doc, tableHeaders, tableRows, xPositions, y, columnWidths, rowHeight) {
    // Configuración de estilo para los encabezados de la tabla
    doc.font('Helvetica-Bold').fontSize(12);
    doc.fillColor('#000'); // Establecer color de texto negro

    for (let i = 0; i < tableHeaders.length; i++) {
        doc.rect(xPositions[i]+10, y, columnWidths[i], rowHeight).fill('#f2f2f2').stroke();
        doc.fillColor('#000').text(tableHeaders[i], xPositions[i]-40 + columnWidths[i] / 2, y + rowHeight / 2, {
            width: columnWidths[i],
            align: 'center',
            valign: 'center'
        });
    }

    // Configuración de estilo para las filas de la tabla
    doc.font('Helvetica').fontSize(10);
    
    // Dibujar filas de la tabla con bordes y texto centrado
    for (let i = 0; i < tableRows.length; i++) {
        const row = tableRows[i];
        const yPos = y + (i + 1) * rowHeight; // Posición vertical de la fila

        for (let j = 0; j < row.length; j++) {
            // Dibujar borde de la celda
            doc.rect(xPositions[j]+10, yPos, columnWidths[j], rowHeight).stroke();
            
            // Ajustar el texto para que quepa dentro de la celda
            let cellText = row[j];
            let fontSize = 10; // Tamaño inicial de la fuente

            // Reducir el tamaño de la fuente hasta que el texto quepa dentro de la celda
            let textWidth = doc.widthOfString(cellText, { font: 'Helvetica', size: fontSize });
        
            // Establecer el tamaño de la fuente y dibujar el texto centrado en la celda
            doc.fontSize(fontSize);
            doc.text(cellText, xPositions[j]+10, yPos + rowHeight / 2, {
                width: columnWidths[j],
                align: 'center',
                baseline: 'middle'
            }).fillColor('#000');
        }
    }
}








async function generarPDFCliente(idFactura,dia,usuario, direccion, metodoPago, listaProductos,subtotal,descuento,iva, totalCompra,filePath) {
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
    const logoPath = './ENTIDADES/logo.png';
    pdfDoc.image(logoPath, logoX +20, logoY, { width: logoWidth, height: logoHeight });

    // Definir la posición y tamaño del área de texto para la información
    const infoX = logoX + logoWidth + 20; // Separación entre el logo y la información
    const infoYY = logoY - 40;
    const infoWidth = pdfDoc.page.width - pdfDoc.page.margins.right - infoX;
    const infoHeight = logoHeight;

    // Agregar la fecha a la izquierda
    pdfDoc.moveDown().fontSize(10);
    pdfDoc.font('Helvetica-Bold').text('\nFecha expedición:', pdfDoc.page.margins.left, infoYY+160, { continued: true });
    pdfDoc.font('Helvetica').text(` 11/04/2024`, { align: 'left' });
    pdfDoc.moveDown().fontSize(12);



    // Agregar título
    pdfDoc.font('Helvetica-Bold').fontSize(13).text('Factura de Venta', infoX + 200, infoYY+100 , { align: 'right' });

    // Obtener el número de factura (aquí lo supondré como una variable)
    const numeroFactura = 'N° '+idFactura;

    // Definir las coordenadas y dimensiones del recuadro
    const recuadroX = pdfDoc.x + 90;
    const recuadroY = pdfDoc.y + 20; // Mover un poco hacia abajo desde la posición actual
    const recuadroWidth = 100;
    const recuadroHeight = 20;
    // Dibujar el recuadro
    pdfDoc.rect(recuadroX, recuadroY, recuadroWidth, recuadroHeight).stroke();

    // Agregar el número de factura dentro del recuadro
    pdfDoc.text(`${numeroFactura}`, recuadroX +20, recuadroY+5 );

    // Mover la posición actual hacia abajo
    pdfDoc.moveDown();

    
    // Agregar información del cliente y dirección
    pdfDoc.moveDown().fontSize(12);
    

    // Información del cliente
    const clienteX = pdfDoc.page.margins.left;
    const direccionX = pdfDoc.page.width / 2 + 20;
    const infoY = pdfDoc.y +40;

    pdfDoc.moveDown().fontSize(12);
   // pdfDoc.font('Helvetica-Bold').text('Información del Cliente\n', clienteX, infoY, { continued: true });
        /// Definir las coordenadas y dimensiones del rectángulo de fondo
    const rectX = clienteX - 5; // Ajustar según sea necesario
    const rectY = infoY -5; // Ajustar según sea necesario
    const rectWidth = pdfDoc.widthOfString('Información del Cliente') + 380; // Ancho del rectángulo basado en el texto
    const rectHeight = 20; // Altura del rectángulo

    // Dibujar el rectángulo de fondo
    pdfDoc.fillColor('#f2f2f2').rect(rectX, rectY, rectWidth, rectHeight).fill();

    // Escribir el texto encima del rectángulo
    pdfDoc.fillColor('#000').font('Helvetica-Bold').text('Información del Cliente', clienteX, infoY);




    pdfDoc.moveDown().fontSize(12);
    pdfDoc.font('Helvetica-Bold').text('\nNombre:', clienteX, infoY+20, { continued: true });
    pdfDoc.font('Helvetica').text(` ${usuario.nombre}`, { align: 'left' });

    pdfDoc.moveDown().fontSize(12);
    pdfDoc.font('Helvetica-Bold').text('Tipo de Documento:', clienteX, pdfDoc.y-10, { continued: true });
    pdfDoc.font('Helvetica').text(` ${usuario.tipo_documento}`, { align: 'left' });
    pdfDoc.font('Helvetica-Bold').text('\nNúmero de Documento:', clienteX, pdfDoc.y-10, { continued: true });
    pdfDoc.font('Helvetica').text(` ${usuario.id_usuario}`, { align: 'left' });

    pdfDoc.moveDown().fontSize(12);
    pdfDoc.font('Helvetica-Bold').text('Teléfono:', clienteX, pdfDoc.y-10, { continued: true });
    pdfDoc.font('Helvetica').text(` ${usuario.telefono}`, { align: 'left' });
    pdfDoc.font('Helvetica-Bold').text('\nCorreo:', clienteX, pdfDoc.y-10, { continued: true });
    pdfDoc.font('Helvetica').text(` ${usuario.correo_electronico}`, { align: 'left' });

    // Dirección
    pdfDoc.moveDown().fontSize(12);
    pdfDoc.moveDown().fontSize(12);
    pdfDoc.font('Helvetica-Bold').text('\nPaís:', direccionX, infoY+20, { continued: true });
    pdfDoc.font('Helvetica').text(` ${'Colombia'}`, { align: 'left' });

    pdfDoc.moveDown().fontSize(12);
    pdfDoc.font('Helvetica-Bold').text('Departamento:', direccionX, pdfDoc.y-10, { continued: true });
    pdfDoc.font('Helvetica').text(` ${direccion.departamento}`, { align: 'left' });

    pdfDoc.moveDown().fontSize(12);
    pdfDoc.font('Helvetica-Bold').text('Ciudad:', direccionX, pdfDoc.y-10, { continued: true });
    pdfDoc.font('Helvetica').text(` ${direccion.ciudad}`, { align: 'left' });

    pdfDoc.moveDown().fontSize(12);
    pdfDoc.font('Helvetica-Bold').text('Dirección:', direccionX, pdfDoc.y-10, { continued: true });
    pdfDoc.font('Helvetica').text(` ${direccion.barrio} ${direccion.calle} \n`, { align: 'left' });

   

    // Agregar método de pago
    pdfDoc.moveDown().fontSize(12);
    //pdfDoc.moveDown().fontSize(12).text(`Método de pago: ${metodoPago}`,direccionX, infoY-10, { continued: true });


    // Agregar tabla de productos
    
    pdfDoc.moveDown().fontSize(10);
    const tableHeaders = ['ID Producto', 'Nombre', 'Cantidad', 'Precio Unitario', 'Total'];
    const tableRows = listaProductos.flatMap(item => {
        // Verifica que item.cantidad y item.producto estén definidos
        if (item && item.cantidad && Array.isArray(item.producto)) {
            return item.producto.map(producto => {
                // Calcula el total del producto
                //const totalProducto = Number(item.cantidad) * Number(producto.precio);
                // Calcula el total del producto en miles de pesos (COP)
                const totalProducto = (Number(item.cantidad) * Number(producto.precio)) * 1000;
                const totalFormateado = totalProducto.toLocaleString('es-CO', {
                    minimumFractionDigits: 3,
                    maximumFractionDigits: 3
                });
                // totalProductoFormatted ahora es una cadena de texto que representa el total en miles de pesos (COP)

                // Retorna un array con los valores separados en columnas
                return [
                    producto.id_producto.toString(),
                    producto.nombre.toString(),
                    item.cantidad.toString(),
                    `$${producto.precio.toString()}`,
                    `$${totalFormateado.toString()}`,
                    //.toString(), // Calcula y muestra el total formateado
                ];
            });
        } else {
            // Si item.producto no es un array, retorna una fila de valores vacíos o maneja el caso como desees
            return [['Producto no definido', '', '', '', '']];
        }
    });
    

        console.log(tableRows);
/*
    const tableRows = listaProductos.map(item => {
        
        if (item && item.producto) {
            const totalProducto = item.cantidad * item.producto.precio;
            return [
                `$${item.producto.id_producto.toFixed(2)}`
                `$${item.producto.nombre.toFixed(2)}`
                `$${item.cantidad.toFixed(2)}`
                `$${item.producto.precio.toFixed(2)}`,
                `$${totalProducto.toFixed(2)}`, // Calcular y mostrar el total del producto
            ];
        } else {
            return ['Producto no definido', '', '', ''];
        }
    });
    */

    
    

    // Calcular el ancho total de la tabla
    const totalTableWidth = pdfDoc.page.width - pdfDoc.page.margins.left - pdfDoc.page.margins.right;

    // Calcular el ancho de cada columna
    const numColumns = tableHeaders.length;
    const columnWidths = Array.from({ length: numColumns }, () => totalTableWidth / numColumns);

    // Calcular las posiciones x para cada columna
    const xPositions = [];
    let currentX = pdfDoc.page.margins.left-10;
    for (let i = 0; i < numColumns; i++) {
        xPositions.push(currentX);
        currentX += columnWidths[i];
    }

    // Calcular la altura de cada fila de la tabla
    const fontSize = 10; // Tamaño de la fuente en puntos
    const lineHeight = fontSize * 1.2; // Altura de línea aproximada (ajustable)
    const rowHeight = lineHeight + 18; // Altura de fila con un pequeño espacio adicional


    // Calcular la posición y inicial
    let y = pdfDoc.y + 15;

    // Dibujar la tabla con el contenido alineado y columnas más anchas
    drawTable(pdfDoc, tableHeaders, tableRows, xPositions, y, columnWidths, rowHeight);




    // Agregar total de la compra
    pdfDoc.moveDown
    pdfDoc.moveDown().fontSize(12);
    //pdfDoc.moveDown().fontSize(10).text(`Total de la compra: $${totalCompra.toFixed(2)}`, { align: 'center' });



    // Definir posición y tamaño del recuadro
    const boxWidth = 200;
    const boxHeight = 100;
    const boxX = pdfDoc.page.width - pdfDoc.page.margins.right - boxWidth;
    const boxY = pdfDoc.page.height - pdfDoc.page.margins.bottom - boxHeight;

    // Dibujar el recuadro gris
    pdfDoc.rect(boxX, boxY, boxWidth, boxHeight).fill('#f2f2f2').stroke();

   

    // Escribir totales dentro del recuadro
    pdfDoc.font('Helvetica-Bold').fontSize(10).fillColor('#000');
    pdfDoc.text(`Subtotal: $${subtotal}`, boxX + 10, boxY + 10);
    pdfDoc.text(`Descuento: $${descuento}`, boxX + 10, boxY + 30);
    pdfDoc.text(`IVA: $${iva}`, boxX + 10, boxY + 50);
    pdfDoc.text(`Total a Pagar: $${totalCompra}`, boxX + 10, boxY + 70);


    // Definir posición de la información de la empresa
    const empresaX = boxX - boxWidth - 100; // Ajusta la posición según sea necesario
    const empresaY = boxY;

    // Escribir información de la empresa
    pdfDoc.moveDown().fontSize(8);
   // pdfDoc.font('Helvetica-Bold').text('Nombre de la Empresa:', empresaX, empresaY+10, { continued: true });
    pdfDoc.font('Helvetica').text(` MADEX - Estructuras y Materiales \n`, empresaX, empresaY+10, { align: 'left' });
    //pdfDoc.moveDown().fontSize(8);
   // pdfDoc.font('Helvetica-Bold').text('Dirección de la Empresa:', empresaX, pdfDoc.y, { continued: true });
    pdfDoc.font('Helvetica').text(`Carrera 33 # 48-38,\nBucaramanga, Santander, Colombia \n`,empresaX, pdfDoc.y,  { align: 'left' });
   // pdfDoc.moveDown().fontSize(8);
   // pdfDoc.font('Helvetica-Bold').text('Teléfono de la Empresa:', empresaX, pdfDoc.y, { continued: true });
    pdfDoc.font('Helvetica').text(` TEL: 3105962547 \n`,empresaX, pdfDoc.y, { align: 'left' });
    pdfDoc.end();

    
    // Devolver la cadena de datos del PDF

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


async function generarPDFEmpresa(idFactura,dia,usuario, direccion, metodoPago, listaProductos,subtotal,descuento,iva, totalCompra,filePath) {
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
    const logoPath = './ENTIDADES/logo.png';
    pdfDoc.image(logoPath, logoX +20, logoY, { width: logoWidth, height: logoHeight });

    // Definir la posición y tamaño del área de texto para la información
    const infoX = logoX + logoWidth + 20; // Separación entre el logo y la información
    const infoYY = logoY - 40;
    const infoWidth = pdfDoc.page.width - pdfDoc.page.margins.right - infoX;
    const infoHeight = logoHeight;

    // Agregar la fecha a la izquierda
    pdfDoc.moveDown().fontSize(10);
    pdfDoc.font('Helvetica-Bold').text('\nFecha expedición:', pdfDoc.page.margins.left, infoYY+160, { continued: true });
    pdfDoc.font('Helvetica').text(` 11/04/2024`, { align: 'left' });
    pdfDoc.moveDown().fontSize(12);



    // Agregar título
    pdfDoc.font('Helvetica-Bold').fontSize(13).text('Factura de Venta', infoX + 200, infoYY+100 , { align: 'right' });

    // Obtener el número de factura (aquí lo supondré como una variable)
    const numeroFactura = 'N° '+idFactura;

    // Definir las coordenadas y dimensiones del recuadro
    const recuadroX = pdfDoc.x + 90;
    const recuadroY = pdfDoc.y + 20; // Mover un poco hacia abajo desde la posición actual
    const recuadroWidth = 100;
    const recuadroHeight = 20;
    // Dibujar el recuadro
    pdfDoc.rect(recuadroX, recuadroY, recuadroWidth, recuadroHeight).stroke();

    // Agregar el número de factura dentro del recuadro
    pdfDoc.text(`${numeroFactura}`, recuadroX +20, recuadroY+5 );

    // Mover la posición actual hacia abajo
    pdfDoc.moveDown();

    
    // Agregar información del cliente y dirección
    pdfDoc.moveDown().fontSize(12);
    

    // Información del cliente
    const clienteX = pdfDoc.page.margins.left;
    const direccionX = pdfDoc.page.width / 2 + 20;
    const infoY = pdfDoc.y +40;

    pdfDoc.moveDown().fontSize(12);
   // pdfDoc.font('Helvetica-Bold').text('Información del Cliente\n', clienteX, infoY, { continued: true });
        /// Definir las coordenadas y dimensiones del rectángulo de fondo
    const rectX = clienteX - 5; // Ajustar según sea necesario
    const rectY = infoY -5; // Ajustar según sea necesario
    const rectWidth = pdfDoc.widthOfString('Información del Cliente') + 380; // Ancho del rectángulo basado en el texto
    const rectHeight = 20; // Altura del rectángulo

    // Dibujar el rectángulo de fondo
    pdfDoc.fillColor('#f2f2f2').rect(rectX, rectY, rectWidth, rectHeight).fill();

    // Escribir el texto encima del rectángulo
    pdfDoc.fillColor('#000').font('Helvetica-Bold').text('Información del Cliente', clienteX, infoY);




    pdfDoc.moveDown().fontSize(12);
    pdfDoc.font('Helvetica-Bold').text('\nNombre:', clienteX, infoY+20, { continued: true });
    pdfDoc.font('Helvetica').text(` ${usuario.nombre}`, { align: 'left' });

    pdfDoc.moveDown().fontSize(12);
    pdfDoc.font('Helvetica-Bold').text('Tipo de Documento:', clienteX, pdfDoc.y-10, { continued: true });
    pdfDoc.font('Helvetica').text(` ${usuario.tipo_documento}`, { align: 'left' });
    pdfDoc.font('Helvetica-Bold').text('\nNúmero de Documento:', clienteX, pdfDoc.y-10, { continued: true });
    pdfDoc.font('Helvetica').text(` ${usuario.id_usuario}`, { align: 'left' });

    pdfDoc.moveDown().fontSize(12);
    pdfDoc.font('Helvetica-Bold').text('Teléfono:', clienteX, pdfDoc.y-10, { continued: true });
    pdfDoc.font('Helvetica').text(` ${usuario.telefono}`, { align: 'left' });
    pdfDoc.font('Helvetica-Bold').text('\nCorreo:', clienteX, pdfDoc.y-10, { continued: true });
    pdfDoc.font('Helvetica').text(` ${usuario.correo_electronico}`, { align: 'left' });

    // Dirección
    pdfDoc.moveDown().fontSize(12);
    pdfDoc.moveDown().fontSize(12);
    pdfDoc.font('Helvetica-Bold').text('\nPaís:', direccionX, infoY+20, { continued: true });
    pdfDoc.font('Helvetica').text(` ${'Colombia'}`, { align: 'left' });

    pdfDoc.moveDown().fontSize(12);
    pdfDoc.font('Helvetica-Bold').text('Departamento:', direccionX, pdfDoc.y-10, { continued: true });
    pdfDoc.font('Helvetica').text(` ${direccion.departamento}`, { align: 'left' });

    pdfDoc.moveDown().fontSize(12);
    pdfDoc.font('Helvetica-Bold').text('Ciudad:', direccionX, pdfDoc.y-10, { continued: true });
    pdfDoc.font('Helvetica').text(` ${direccion.ciudad}`, { align: 'left' });

    pdfDoc.moveDown().fontSize(12);
    pdfDoc.font('Helvetica-Bold').text('Dirección:', direccionX, pdfDoc.y-10, { continued: true });
    pdfDoc.font('Helvetica').text(` ${direccion.barrio} ${direccion.calle} \n`, { align: 'left' });



    pdfDoc.moveDown().fontSize(12);
    // Dibujar el rectángulo de fondo
    pdfDoc.fillColor('#f2f2f2').rect(rectX, rectY+140, rectWidth, rectHeight).fill();

    // Escribir el texto encima del rectángulo
    pdfDoc.fillColor('#000').font('Helvetica-Bold').text('Información empresa', clienteX, infoY+140);

    pdfDoc.moveDown().fontSize(12);
    pdfDoc.font('Helvetica-Bold').text('Nombre Empresa:', clienteX, pdfDoc.y+10, { continued: true });
    pdfDoc.font('Helvetica').text(` ${usuario.nombre_empresa}`, { align: 'left' });

    pdfDoc.moveDown().fontSize(12);
    pdfDoc.font('Helvetica-Bold').text('NIT:', clienteX, pdfDoc.y-10, { continued: true });
    pdfDoc.font('Helvetica').text(` ${usuario.nit_empresa}`, { align: 'left' });
    pdfDoc.font('Helvetica-Bold').text('\nRazon social:', clienteX, pdfDoc.y-10, { continued: true });
    pdfDoc.font('Helvetica').text(` ${usuario.razon_social}`, { align: 'left' });

    pdfDoc.moveDown().fontSize(12);
    pdfDoc.font('Helvetica-Bold').text('Cargo:', clienteX, pdfDoc.y-10, { continued: true });
    pdfDoc.font('Helvetica').text(` ${usuario.cargo}`, { align: 'left' });
    pdfDoc.font('Helvetica-Bold').text('\Rubro:', clienteX, pdfDoc.y+5, { continued: true });
    pdfDoc.font('Helvetica').text(` ${usuario.rubro}`, { align: 'left' });


    // Agregar método de pago
    pdfDoc.moveDown().fontSize(12);
    //pdfDoc.moveDown().fontSize(12).text(`Método de pago: ${metodoPago}`,direccionX, infoY-10, { continued: true });


    // Agregar tabla de productos
    
    pdfDoc.moveDown().fontSize(10);
    const tableHeaders = ['ID Producto', 'Nombre', 'Cantidad', 'Precio Unitario', 'Total'];
    const tableRows = listaProductos.flatMap(item => {
        // Verifica que item.cantidad y item.producto estén definidos
        if (item && item.cantidad && Array.isArray(item.producto)) {
            return item.producto.map(producto => {
                // Calcula el total del producto
                //const totalProducto = Number(item.cantidad) * Number(producto.precio);
                // Calcula el total del producto en miles de pesos (COP)
                const totalProducto = (Number(item.cantidad) * Number(producto.precio)) * 1000;
                const totalFormateado = totalProducto.toLocaleString('es-CO', {
                    minimumFractionDigits: 3,
                    maximumFractionDigits: 3
                });
                // totalProductoFormatted ahora es una cadena de texto que representa el total en miles de pesos (COP)

                // Retorna un array con los valores separados en columnas
                return [
                    producto.id_producto.toString(),
                    producto.nombre.toString(),
                    item.cantidad.toString(),
                    `$${producto.precio.toString()}`,
                    `$${totalFormateado.toString()}`,
                    //.toString(), // Calcula y muestra el total formateado
                ];
            });
        } else {
            // Si item.producto no es un array, retorna una fila de valores vacíos o maneja el caso como desees
            return [['Producto no definido', '', '', '', '']];
        }
    });
    

        console.log(tableRows);
/*
    const tableRows = listaProductos.map(item => {
        
        if (item && item.producto) {
            const totalProducto = item.cantidad * item.producto.precio;
            return [
                `$${item.producto.id_producto.toFixed(2)}`
                `$${item.producto.nombre.toFixed(2)}`
                `$${item.cantidad.toFixed(2)}`
                `$${item.producto.precio.toFixed(2)}`,
                `$${totalProducto.toFixed(2)}`, // Calcular y mostrar el total del producto
            ];
        } else {
            return ['Producto no definido', '', '', ''];
        }
    });
    */

    
    

    // Calcular el ancho total de la tabla
    const totalTableWidth = pdfDoc.page.width - pdfDoc.page.margins.left - pdfDoc.page.margins.right;

    // Calcular el ancho de cada columna
    const numColumns = tableHeaders.length;
    const columnWidths = Array.from({ length: numColumns }, () => totalTableWidth / numColumns);

    // Calcular las posiciones x para cada columna
    const xPositions = [];
    let currentX = pdfDoc.page.margins.left-10;
    for (let i = 0; i < numColumns; i++) {
        xPositions.push(currentX);
        currentX += columnWidths[i];
    }

    // Calcular la altura de cada fila de la tabla
    const fontSize = 10; // Tamaño de la fuente en puntos
    const lineHeight = fontSize * 1.3; // Altura de línea aproximada 
    const rowHeight = lineHeight + 28; // Altura de fila con un pequeño espacio adicional


    // Calcular la posición y inicial
    let y = pdfDoc.y + 15;

    // Dibujar la tabla con el contenido alineado y columnas más anchas
    drawTable(pdfDoc, tableHeaders, tableRows, xPositions, y, columnWidths, rowHeight);




    // Agregar total de la compra
    pdfDoc.moveDown
    pdfDoc.moveDown().fontSize(12);
    //pdfDoc.moveDown().fontSize(10).text(`Total de la compra: $${totalCompra.toFixed(2)}`, { align: 'center' });



    // Definir posición y tamaño del recuadro
    const boxWidth = 200;
    const boxHeight = 100;
    const boxX = pdfDoc.page.width - pdfDoc.page.margins.right - boxWidth;
    const boxY = pdfDoc.page.height - pdfDoc.page.margins.bottom - boxHeight;

    // Dibujar el recuadro gris
    pdfDoc.rect(boxX, boxY, boxWidth, boxHeight).fill('#f2f2f2').stroke();

   

    // Escribir totales dentro del recuadro
    pdfDoc.font('Helvetica-Bold').fontSize(10).fillColor('#000');
    pdfDoc.text(`Subtotal: $${subtotal}`, boxX + 10, boxY + 10);
    pdfDoc.text(`Descuento: $${descuento}`, boxX + 10, boxY + 30);
    pdfDoc.text(`IVA: $${iva}`, boxX + 10, boxY + 50);
    pdfDoc.text(`Total a Pagar: $${totalCompra}`, boxX + 10, boxY + 70);


    // Definir posición de la información de la empresa
    const empresaX = boxX - boxWidth - 100; // Ajusta la posición según sea necesario
    const empresaY = boxY;

    // Escribir información de la empresa
    pdfDoc.moveDown().fontSize(8);
   // pdfDoc.font('Helvetica-Bold').text('Nombre de la Empresa:', empresaX, empresaY+10, { continued: true });
    pdfDoc.font('Helvetica').text(` MADEX - Estructuras y Materiales \n`, empresaX, empresaY+10, { align: 'left' });
    //pdfDoc.moveDown().fontSize(8);
   // pdfDoc.font('Helvetica-Bold').text('Dirección de la Empresa:', empresaX, pdfDoc.y, { continued: true });
    pdfDoc.font('Helvetica').text(`Carrera 33 # 48-38,\nBucaramanga, Santander, Colombia \n`,empresaX, pdfDoc.y,  { align: 'left' });
   // pdfDoc.moveDown().fontSize(8);
   // pdfDoc.font('Helvetica-Bold').text('Teléfono de la Empresa:', empresaX, pdfDoc.y, { continued: true });
    pdfDoc.font('Helvetica').text(` TEL: 3105962547 \n`,empresaX, pdfDoc.y, { align: 'left' });
    pdfDoc.end();

    
    // Devolver la cadena de datos del PDF

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


async function generarFacturaYEnviarCorreo(idFactura,dia,usuario, direccion, metodoPago, listaProductos,subtotal,descuento,iva, totalCompra) {
    try {
        // Generar el PDF y guardarlo en el sistema de archivos
            
            const nombreArchivoPDF = `./FACTURAS/factura_${idFactura}.pdf`;
            if(usuario.idRol.toString()=='3'){
                console.log("3");
                await generarPDFEmpresa(idFactura,dia,usuario, direccion, metodoPago, listaProductos,subtotal,descuento,iva, totalCompra, nombreArchivoPDF);
            }else{
                await generarPDFCliente(idFactura,dia,usuario, direccion, metodoPago, listaProductos,subtotal,descuento,iva, totalCompra, nombreArchivoPDF);

            }
            const pdfBytes = await fs.promises.readFile(nombreArchivoPDF);

            //const contenidoPDF = pdfBytes.toString(); // Convierte los bytes del PDF a una cadena

            // Definir el contenido del código QR
    
            // Genera el nuevo PDF con el contenido del archivo PDF y el código QR
           // await generarPDFConQR('contenidoPDF', contenidoQR, 'prueba.pdf');

            // Genera el PDF con QR
           // await generarPDFConQR(contenidoPDF, contenidoQR, 'factura.pdf');

            
            console.log(usuario.idRol)
    
            return pdfBytes;
        // Enviar el correo electrónico con el PDF adjunto
       // await enviarCorreo(usuario, pdfBytes);
    } catch (error) {
        console.error('Error al generar y enviar la factura:', error);
        throw error;
    }
}





//------------------






module.exports = generarFacturaYEnviarCorreo;