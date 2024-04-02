class Factura {
    constructor(usuario, metodoPago, direccion, listaProductos, totalCompra) {
        this.usuario = usuario;
        this.metodoPago = metodoPago;
        this.direccion = direccion;
        this.listaProductos = listaProductos;
        this.totalCompra = totalCompra;
        this.fechaGeneracion = new Date();
    }

    // Método para obtener el resumen de la factura
    obtenerResumen() {
        return {
            usuario: this.usuario,
            metodoPago: this.metodoPago,
            direccion: this.direccion,
            listaProductos: this.listaProductos,
            totalCompra: this.totalCompra,
            idFactura: this.idFactura,
            fechaGeneracion: this.fechaGeneracion.toLocaleString() // Formatea la fecha como una cadena legible
        };
    }


    
    async  generarPDF(usuario, direccion, metodoPago, listaProductos, totalCompra) {
        try {
            const PDFDocument = require('pdfkit');
            const fs = require('fs');
            
            const pdfDoc = new PDFDocument();
            const pdfStream = fs.createWriteStream('factura.pdf');
    
            pdfDoc.pipe(pdfStream);
    
            pdfDoc.text(`Factura de compra`);
            pdfDoc.text(`Usuario: ${usuario.nombre_usuario} ${usuario.apellido_usuario}`);
            pdfDoc.text(`Dirección: ${direccion.Calle}, ${direccion.Ciudad}`);
            pdfDoc.text(`Método de pago: ${metodoPago}`);
            pdfDoc.text(`Productos:`);
            
            listaProductos.forEach((producto, index) => {
                pdfDoc.text(`${index + 1}. ${producto}`);
            });
    
            pdfDoc.text(`Total de la compra: ${totalCompra}`);
    
            pdfDoc.end();
    
            // Devolver una promesa para manejar la finalización de la generación del PDF
            return new Promise((resolve, reject) => {
                pdfStream.on('finish', () => {
                    console.log('PDF generado exitosamente');
                    resolve(); // Resuelve la promesa cuando la escritura del PDF ha terminado
                });
                pdfStream.on('error', (error) => {
                    console.error('Error al generar el PDF:', error);
                    reject(error); // Rechaza la promesa si hay un error en la escritura del PDF
                });
            });
        } catch (error) {
            console.error('Error al generar la factura:', error);
            throw error;
        }
    }
    
    async guardarPDF(pdfBytes, filePath) {
        const fs = require('fs').promises;
        const buffer = Buffer.from(pdfBytes.buffer); // Aquí está ocurriendo el error
        await fs.writeFile(filePath, buffer);
    }
    
    
}

module.exports = Factura;

