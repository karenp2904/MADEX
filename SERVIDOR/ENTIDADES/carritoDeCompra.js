


// Función para calcular el precio total del carrito
function calcularPrecioTotal(carrito, listaProductos) {
    let precioTotal = 0;
    carrito.forEach(item => {
        const producto = listaProductos.find(p => p.id_producto === item.id_producto);
        if (producto) {
            precioTotal += producto.precio * item.cantidad;
        }
    });
    return precioTotal;
}