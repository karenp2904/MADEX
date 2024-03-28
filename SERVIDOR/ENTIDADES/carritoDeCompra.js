
const Producto = require('../ENTIDADES/producto'); 

class CarritoDeCompras {
    constructor() {
        this.productos = [];
    }

    agregarProducto(idProducto, cantidadDeseada) {
        const producto = this.productos.find(producto => producto.id_producto === idProducto);
        const productoExistenteIndex = this.productos.findIndex(p => p.id_producto === producto.id_producto);
    
        if (productoExistenteIndex !== -1) {
            // Si el producto ya está en el carrito, verificar el stock disponible
            if (this.verificarStock(producto.id_producto, cantidadDeseada)) {
                this.productos[productoExistenteIndex].cantidad += cantidadDeseada;
            } else {
                console.log(`No hay suficiente stock disponible para agregar ${cantidadDeseada} unidades de ${producto.nombre}.`);
            }
        } else {
            // Si el producto no está en el carrito, verificar el stock disponible
            if (this.verificarStock(producto.id_producto, cantidadDeseada)) {
                // Si hay suficiente stock, agregar el producto al carrito
                const productoCarrito = new Producto(producto);
                this.productos.push({
                    productoCarrito,
                    cantidad: cantidadDeseada
                });
            } else {
                console.log(`No hay suficiente stock disponible para agregar ${cantidadDeseada} unidades de ${producto.nombre}.`);
            }
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

    calcularTotal() {
        let total = 0;
        for (const producto of this.productos) {
            total += producto.precio * producto.cantidad;
        }
        return total;
    }

    vaciarCarrito() {
        this.productos = [];
    }
}




