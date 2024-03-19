class producto{

  constructor({ id_producto,nombre, descripcion, precio, estado_producto, color, stock, descuento, proveedor, categoria }) {
    this.id_producto = id_producto;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.estado_producto = estado_producto;
    this.color = color;
    this.stock = stock;
    this.descuento = descuento;
    this.proveedor = proveedor;
    this.categoria = categoria;
  }

   // Método para actualizar la información del producto
  actualizarProducto(nombre, descripcion, precio, estado_producto, color, stock, descuento, proveedor, categoria) {
    // Verificar si los nuevos valores no son nulos o indefinidos antes de actualizar
    if (nombre) this.nombre = nombre;
    if (descripcion) this.descripcion = descripcion;
    if (precio) this.precio = precio;
    if (estado_producto) this.estado_producto = estado_producto;
    if (color) this.color = color;
    if (stock) this.stock = stock;
    if (descuento) this.descuento = descuento;
    if (proveedor) this.proveedor = proveedor;
    if (categoria) this.categoria = categoria;
  }

  // Método para aplicar descuento al precio del producto
    aplicarDescuento(precio) {
    return precio - (precio * this.descuento);
    }


  // Método para reponer stock
    reponer(cantidad) {
    this.stock += cantidad;
    console.log(`Se han añadido ${cantidad} unidades de ${this.nombre} al stock. Nuevo stock: ${this.stock}`);
    }

  // Método para cambiar el precio del producto
    cambiarPrecio(nuevoPrecio) {
    this.stock = nuevoPrecio;
    console.log(`El precio de ${this.nombre} ha sido cambiado a $${this.stock}.`);
    }

    // Método para cambiar el estado del producto a "descontinuado"
    descontinuarProducto() {
      this.estado_producto = 'Descontinuado';
  }
}    


module.exports=producto;