class producto{

    producto(nombre, descripcion, stock, descuento, categoria) {
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.stock = stock;
    this.descuento = descuento;
    this.categoria = categoria;
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

    


}