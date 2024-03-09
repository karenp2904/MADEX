const pool = require('./databaseConexion/pool');

const db_crearProducto = async (nombre, descripcion, precio, estado_producto, color, stock, descuento, Proveedores_id_Proveedores, Categoria_idCategoria) => {
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

const db_obtenerTodosLosProductos = async () => {
  try {
    const allProductos = await pool.query('SELECT * FROM Productos');
    return allProductos.rows;
  } catch (error) {
    throw error;
  }
};

const db_obtenerProductoPorId = async (id) => {
  try {
    const producto = await pool.query('SELECT * FROM Productos WHERE id_producto = $1', [id]);
    return producto.rows;
  } catch (error) {
    throw error;
  }
};



function db_añadirUsuario(){

}

function db_eliminarUsuario(){

}

function db_actualizarUsuario(){

}

function db_añadirEmpresa(){

}

function db_verificarCredencialUsuario(){

}

function db_obtenerUsuario(){

}

function db_obtenerTodosUsuarios(){

}

function db_añadirProducto(){

}

function db_eliminarProducto(){
    
}
function db_descontinuarProducto(){
    
}

function db_actualizarProducto(){
    
}

function db_obtenerProducto(){
    
}

function db_obtenerListaProductos(){
    
}

function db_editarStock(){

}


function db_logInventario(){

}


function db_logFacturas(){

}


function db_logUsuarios(){

}

function db_añadirProductosCarrito(){

}

function db_editarCarrito(){

}

function db_verificarClienteActivo(){
} 

function db_obtenerCarrito(){

}

function db_obtenerHistorialDeCompra(){

}

function db_añadirFactura(){

}


function db_obtenerFactura(){

}

function db_guardarDireccionEnvio(){

}


module.exports = {
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
