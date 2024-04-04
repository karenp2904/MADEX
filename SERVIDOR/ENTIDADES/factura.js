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
}

module.exports = Factura;

