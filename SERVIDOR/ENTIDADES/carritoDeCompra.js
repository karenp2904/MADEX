
const Producto = require('../ENTIDADES/producto'); 

class CarritoDeCompras {
    constructor() {
        this.productos = [];
    }

    agregarProducto(producto, cantidadDeseada) {
        // Verifica que `producto` y `cantidadDeseada` sean valores válidos
        if (producto === undefined || cantidadDeseada === undefined) {
            console.error("Error: producto o cantidadDeseada no están definidos.");
            return;
        }
    
        // Verifica si el producto ya está en el carrito
        const productoExistenteIndex = this.productos.findIndex(p => p.producto.id_producto === producto.id_producto);
    
        if (productoExistenteIndex !== -1) {
            // Si el producto ya está en el carrito, actualiza la cantidad
            console.log(`El producto con ID ${producto.id_producto} ya está en el carrito. Se incrementará la cantidad.`);
            this.productos[productoExistenteIndex].cantidad += cantidadDeseada;
        } else {
            // Si el producto no está en el carrito, agrégalo
            console.log(`El producto con ID ${producto.id_producto} no está en el carrito. Se agregará.`);
            this.productos.push({
                producto: producto,
                cantidad: cantidadDeseada
            });
        }
    }
    
    

    // Método que verifica la cantidad de unidades de stock
    verificarStock(idProducto, cantidad) {
        const producto = this.productos.find(producto => producto.id_producto === idProducto);
        
        if (!producto) {
            throw new Error('El producto no se encuentra en el inventario.');
        }
        return producto.stock >= cantidad; //rertorna true si es mayor y false si es menor
    }

    eliminarProducto(idProducto) {
        this.productos = this.productos.filter(producto => producto.id_producto !== idProducto);
    }

    actualizarCantidad(idProducto, nuevaCantidad) {
        const producto = this.productos.find(p => p.id_producto === idProducto);
        if (producto) {
            if(verificarStock(idProducto, nuevaCantidad)){
                producto.cantidad = nuevaCantidad;
            }
            
        }
    }

    aumentarCantidad(idProducto, cantidad) {
        const producto = this.productos.find(p => p.id_producto === idProducto);
        if (producto) {
            if(verificarStock(idProducto, nuevaCantidad)){
                producto.cantidad += cantidad;
            }
        
        }
    }

    disminuirCantidad(idProducto, cantidad) {
        const producto = this.productos.find(p => p.id_producto === idProducto);
        if (producto) {
            producto.cantidad -= cantidad;
            if (producto.cantidad < 0) {
                producto.cantidad = 0;
            }
        }
    }

    // Calcula el total del descuento en la compra
    async calcularTotalDescuento() {
        let totalDescuento = 0;
        for (const producto of this.productos) {
            const descuentoProducto = (producto.producto.precio * producto.producto.descuento / 100) * producto.cantidad;
            totalDescuento += descuentoProducto;
        }
        console.log("totalDescuento "+totalDescuento);
        return parseFloat(totalDescuento);
    }

    // Calcula el total de todos los productos en la compra (sin descuentos)
    async calcularTotalProductos() {
        let totalProductos = 0;
        for (const producto of this.productos) {
            console.log(producto.producto.precio , producto.cantidad);
            totalProductos += parseFloat(producto.producto.precio) * producto.cantidad;
        }
        console.log("totalProductos "+totalProductos);
        return totalProductos;
    }

        // Calcula el IVA total de la compra 
    async calcularIVA(porcentajeIVA) {
        const totalConDescuento = await this.calcularTotal();

        // Verifica que totalConDescuento y porcentajeIVA sean números válidos
        const totalConDescuentoNumber = parseFloat(totalConDescuento);
        const porcentajeIVANumber = parseFloat(porcentajeIVA);

        // Calcula el IVA
        console.log(porcentajeIVANumber, totalConDescuentoNumber);
        const iva = totalConDescuentoNumber * (porcentajeIVANumber / 100);
        console.log("iva: " + iva);
        return iva;
    }


    // Calcula el total de la compra incluyendo descuentos
    async calcularTotal() {
        let total = 0
        for (const producto of this.productos) {
            // Calcula el precio con descuento aplicado
            const precioConDescuento = Number(producto.producto.precio) - (Number(producto.producto.precio)* Number(producto.producto.descuento) / 100);
            // Añade el precio con descuento multiplicado por la cantidad al total
            total += precioConDescuento * Number(producto.cantidad);
        }
        console.log(parseFloat(total));
        return parseFloat(total);
    }

        // Calcula el total de la compra incluyendo descuentos y el IVA
    async calcularTotalCompra() {
        // Calcula el total con descuento
        const compra =  await this.calcularTotalProductos();
        
        // Calcula el total de la compra sumando el total con descuento y el IVA
        const descuento = await this.calcularTotalDescuento();

        const iva= await this.calcularIVA(19);
    

        // Devuelve el total de la compra como número
        return parseFloat(compra - descuento + iva);
    }

    // Formatear el total de la compra a pesos colombianos (COP)
    async formatearAPesosColombianos(valor) {
    return valor.toLocaleString('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,  
    });
}

    vaciarCarrito() {
        this.productos = [];
    }

}

module.exports = CarritoDeCompras;


