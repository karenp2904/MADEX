
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
        
        const factor = 1_000; // Para miles
        // const factor = 1_000_000; // Para millones
    
        // Convertir el total a miles o millones
        const totalConvertido = totalDescuento * factor;
        // Formatear el total con separadores de miles y comas como separadores decimales
        const totalFormateado = totalConvertido.toLocaleString('es-CO', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

       // console.log("totalDescuento "+totalFormateado);
        return totalFormateado;
    }

    // Calcula el total de todos los productos en la compra (sin descuentos)
    async calcularTotalProductos() {
        let totalProductos = 0;
        for (const producto of this.productos) {
            console.log(producto.producto.precio, producto.cantidad);
            totalProductos += parseFloat(producto.producto.precio) * producto.cantidad;
        }
       // console.log("Total productos en pesos: " + totalProductos);
    
        // Elegir entre miles o millones
        const factor = 1_000; // Para miles
        // const factor = 1_000_000; // Para millones
    
        // Convertir el total a miles o millones
        const totalConvertido = totalProductos * factor;
    
        // Formatear el total con separadores de miles y comas como separadores decimales
        const totalFormateado = totalConvertido.toLocaleString('es-CO', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    
        console.log("Total productos formateado: " + totalFormateado);
        return totalFormateado;
    }
    

        // Calcula el IVA total de la compra 
    async calcularIVA(porcentajeIVA) {
        const totalConDescuento = await this.calcularTotal();

        // Verifica que totalConDescuento y porcentajeIVA sean números válidos
        const totalConDescuentoNumber = parseFloat(totalConDescuento);
        const porcentajeIVANumber = parseFloat(porcentajeIVA);

        // Calcula el IVA
       // console.log(porcentajeIVANumber, totalConDescuentoNumber);
        const iva = totalConDescuentoNumber * (porcentajeIVANumber / 100);
        //console.log("iva: " + iva);

        const factor = 1_000; // Para miles
        // const factor = 1_000_000; // Para millones
    
        // Convertir el total a miles o millones
        const totalConvertido = iva * factor;
    
        // Formatear el total con separadores de miles y comas como separadores decimales
        const totalFormateado = totalConvertido.toLocaleString('es-CO', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

        console.log("totalIva "+totalFormateado);
        return totalFormateado;
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
       // console.log(parseFloat(total));
        return parseFloat(total);
    }



        
    async calcularTotalCompra() {
        const subtotal = await this.calcularTotalNum(); // asume que este método devuelve un número formateado como cadena
        // Calcula el total de los descuentos
        const descuento = await this.calcularDescuentoNum(); // asume que este método devuelve un número formateado como cadena
        // Calcula el IVA
        const iva = await this.calcularIvaNumero(19); // asume que este método devuelve un número formateado como cadena


        // Calcula el total a pagar de acuerdo con la fórmula
        const total = await subtotal - descuento + iva;

        // Muestra los valores calculados en la consola para depuración
        //console.log("Subtotal:", subtotal);
        //console.log("Descuento:", descuento);
        //console.log("IVA:", iva);
        //console.log("Total a pagar:", total);

        const totalFormateado = total.toLocaleString('es-CO', {
            minimumFractionDigits: 3,
            maximumFractionDigits: 3
        });

        // Devuelve el total a pagar como número de punto flotante
        return totalFormateado;
    }


    

    formatearAMillonesCOP(valor) {
        // Divide el valor por 1,000,000 para obtener la cantidad en millones
        const valorEnMillones = valor / 1000000;
        
        // Formatea el valor en millones con puntos como separadores de miles y comas como separadores decimales
        // Usamos el formato regional de Colombia ('es-CO') para pesos colombianos
        const valorFormateado = valorEnMillones.toLocaleString('es-CO', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
        
        return valorFormateado;
    }

    async calcularIvaNumero(porcentajeIVA){
        const totalConDescuento = await this.calcularTotal();

        // Verifica que totalConDescuento y porcentajeIVA sean números válidos
        const totalConDescuentoNumber = parseFloat(totalConDescuento);
        const porcentajeIVANumber = parseFloat(porcentajeIVA);

        const iva = totalConDescuentoNumber * (porcentajeIVANumber / 100);
        return iva;
    }

    async calcularDescuentoNum(){
        let totalDescuento = 0;
        for (const producto of this.productos) {
            const descuentoProducto = (producto.producto.precio * producto.producto.descuento / 100) * producto.cantidad;
            totalDescuento += descuentoProducto;
        }
        return totalDescuento;

    }

    async calcularTotalNum(){
        let totalProductos = 0;
        for (const producto of this.productos) {
            console.log(producto.producto.precio, producto.cantidad);
            totalProductos += parseFloat(producto.producto.precio) * producto.cantidad;
        }
        //console.log("Total productos en pesos: " + totalProductos);
        return totalProductos;
    }

        
    async calcularTotalCompraNum() {
        const subtotal = await this.calcularTotalNum(); // asume que este método devuelve un número formateado como cadena
        // Calcula el total de los descuentos
        const descuento = await this.calcularDescuentoNum(); // asume que este método devuelve un número formateado como cadena
        // Calcula el IVA
        const iva = await this.calcularIvaNumero(19); // asume que este método devuelve un número formateado como cadena


        // Calcula el total a pagar de acuerdo con la fórmula
        const total = await subtotal - descuento + iva;

        // Devuelve el total a pagar como número de punto flotante
        return total;
    }

    vaciarCarrito() {
        this.productos = [];
    }

}

module.exports = CarritoDeCompras;


