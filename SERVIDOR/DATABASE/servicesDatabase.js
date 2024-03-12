const pool = require('./databaseConexion');

async function db_crearProducto(nombre, descripcion, precio, estado_producto, color, stock, descuento, Proveedores_id_Proveedores, Categoria_idCategoria){
  try {
    const newProducto = await pool.query(
      'INSERT INTO Productos (nombre, descripcion, precio, estado_producto, color, stock, descuento, Proveedores_id_Proveedores, Categoria_idCategoria) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [nombre, descripcion, precio, estado_producto, color, stock, descuento, Proveedores_id_Proveedores, Categoria_idCategoria]
    );
    return newProducto.rows[0];
  } catch (error) {
    throw error;
  }
};

async function db_obtenerTodosLosProductos ()  {
  try {
    const allProductos = await pool.query('SELECT * FROM Productos');
    console.log(allProductos); // Coloca el console.log aquí para ver los resultados antes de devolverlos
    return allProductos.rows;
  } catch (error) {
    throw error;
  }
};

async function db_obtenerProductoPorId (id) {
  try {
    const producto = await pool.query('SELECT * FROM Productos WHERE id_producto = $1', [id]);
    return producto.rows;
  } catch (error) {
    throw error;
  }
};



async function db_añadirUsuario(){

}

async function db_eliminarUsuario(){

}

async function db_actualizarUsuario(){

}

async function db_añadirEmpresa(){

}

async function db_verificarCredencialUsuario(){

}

async function db_obtenerUsuario(){

}

async function db_obtenerTodosUsuarios(){

}

async function db_añadirProducto(){

}

async function db_eliminarProducto(){
    
}
async function db_descontinuarProducto(){
    
}

async function db_actualizarProducto(){
    
}

async function db_obtenerProducto(){
    
}

async function db_obtenerListaProductos(){
    
}

async function db_editarStock(){

}


async function db_logInventario(){

}


async function db_logFacturas(){

}


async function db_logUsuarios(){

}

async function db_añadirProductosCarrito(){

}

async function db_editarCarrito(){

}

async function db_verificarClienteActivo(){
} 

async function  db_obtenerCarrito(){

}

async function db_obtenerHistorialDeCompra(){

}

async function db_añadirFactura(){

}


async function db_obtenerFactura(){

}

async function db_guardarDireccionEnvio(){

}


module.exports = { db_añadirUsuario,
  db_obtenerTodosLosProductos,
  db_crearProducto,
  db_obtenerProductoPorId,
  db_añadirUsuario,
  db_eliminarUsuario,
  db_actualizarUsuario,
  db_añadirEmpresa,
  db_verificarCredencialUsuario,
  db_obtenerUsuario,
  db_obtenerTodosUsuarios,
  db_añadirProducto,
  db_eliminarProducto,
  db_descontinuarProducto,
  db_actualizarProducto,
  db_obtenerProducto,
  db_obtenerListaProductos,
  db_editarStock,
  db_logInventario,
  db_logFacturas,
  db_logUsuarios,
  db_añadirProductosCarrito,
  db_editarCarrito,
  db_verificarClienteActivo,
  db_obtenerCarrito,
  db_obtenerHistorialDeCompra,
  db_añadirFactura,
  db_obtenerFactura,
  db_guardarDireccionEnvio
};
