const pool = require('./databaseConexion');


async function db_obtenerTodosLosProductos () { //TODO VERIFICACION PENDIENTE
  try {
    const allProductos = await pool.query('SELECT * FROM db_obtenerTodosLosProductos()');
    console.log("productos en db", allProductos.rowCount); // Ver los resultados antes de devolverlos

    return allProductos.rows;
  } catch (error) {
    console.error("Error al ejecutar la consulta:", error);
    throw new Error("Error al ejecutar la consulta");
  }
}

async function db_obtenerListaProveedores(){ //TODO VERIFICACION PENDIENTE
  try {
    let proveedor = await pool.query('SELECT * FROM db_obtenerListaProveedores()');
    return proveedor.rows;
  } catch (error) {
    console.error("Error al obtener proveedor :", error);
    throw new Error("Error al obtener proveedor");
  }
}

async function db_obtenerNombreProveedorPorId(idProveedor) { //TODO VERIFICACION PENDIENTE
  try {
      const query = ('SELECT * FROM db_obtenerNombreProveedorPorId($1)', [idProveedor]);
      const values = [idProveedor];
      const result = await pool.query(query, values);

      if (result.rows.length === 0) {
          return null; // Retorna null si no se encontró ningún proveedor con el ID proporcionado
      }
    
      return result.rows[0]; // Retorna el nombre de la empresa del proveedor encontrado
  } catch (error) {
      console.error("Error al obtener nombre del proveedor por ID:", error);
      throw new Error("Error al obtener nombre del proveedor por ID");
  }
}



async function db_obtenerNombreProveedorPorId (id) { //Retorna texto
  try {
    let prov = await pool.query('SELECT * FROM db_obtenerNombreProveedorPorId($1)', [id]); //TODO: VERIFICACION PENDIENTE
    return prov;
  } catch (error) {
    // Capturar y lanzar cualquier error que ocurra durante la consulta
    throw error;
  }
}



async function db_obtenerCategoriaPorId (id) {
  try {
    let cat = await pool.query('SELECT * FROM db_obtenerCategoriaPorId($1)', [id]); //TODO: VERIFICACION PENDIENTE
    return cat;
  } catch (error) {
    console.error("Error al obtener la categoria:", error);
    throw new Error("Error al obtener la categoria");
  }
};

async function db_obtenerListaCategorias(){
  try {
    const categoria = await pool.query('db_obtenerListaCategorias'); //TODO: VERIFICACION PENDIENTE
    return categoria.rows;
  } catch (error) {
    console.error("Error al obtener categorias :", error);
    throw new Error("Error al obtener categorias");
  }
};


async function db_obtenerProductoPorId (id) {
  try {
    const producto = await pool.query('SELECT * FROM db_obtenerProductoPorId($1);', [id]); //TODO: VERIFICACION PENDIENTE
    return producto.rows;
  } catch (error) {
    throw error;
  }
};


async function db_añadirUsuario(id_usuario, nombre_usuario, apellido_usuario, correo, tipo_documento, contraseña, telefono, idRol){

}

async function db_verificarCredencialUsuario(){

}

async function db_eliminarUsuario(idUsuario){

}

async function db_actualizarUsuario(idUsuario, nuevosDatos){

}

async function db_añadirEmpresa(){

}


async function db_obtenerUsuario(idUsuario){

}

async function db_obtenerTodosUsuarios(){
  try {
    let usuarios = await pool.query('SELECT * FROM db_obtenerTodosUsuarios();');
    return usuarios.rows;
  } catch (error) {
    console.error("Error al obtener usuarios :", error);
    throw new Error("Error al obtener usuarios");
  }
}


async function db_añadirProducto(nombre, descripcion, precio, estado_producto, color, stock, descuento, Proveedores_id_Proveedores, Categoria_idCategoria){
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


async function db_actualizarProducto(idProducto, newData) {
    try {
        const { nombre, precio, descripcion, /* otros atributos */ } = newData;
        //ejecutar sql 


        console.log(`Producto con ID ${idProducto} actualizado correctamente.`);

        return true; // Indica que la actualización fue exitosa
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        throw error;
    }
}


async function db_eliminarProducto(idProducto){
    
}
async function db_descontinuarProducto(idProducto,estado){
    
}


/*metodo para modificar el stock. Se recomienda obtener el stock actual del producto*/
async function db_editarStock(id_producto, stock){ //TODO VERIFICAR
  try {
    const historial = await pool.query('CALL db_editarStock($1,$2);', [id_producto], [stock]);
  } catch (error) {
    console.error("Error al obtener el historial :", error);
    throw new Error("Error al obtener el historial");
  }

}


async function db_logInventario(){

}


async function db_logFacturas(){

}


async function db_logUsuarios(){

}


async function db_verificarClienteActivo(){
} 



async function  db_añadirProductoCarrito(producto, cantidad){
  // se manda el producto  con la cantidad que se desea
  }
  
  async function  db_modificarCantidadProductoCarrito(idProducto, cantidad){
  // se manda el idProducto  con la cantidad que se modifica
  }
  
  async function  db_eliminarProductoCarrito(idProducto){
    // se manda el idproducto a eliminar
    }
    
  
  async function  db_obtenerCarrito(idUsuario){
      // obtener todos los id de producto y la cantidad
      // luego db_obtenerProductoPorId 
  }

async function db_obtenerHistorialDeCompra(id_usuario /*requiere un entero*/){ //TODO: VERIFICAR FUNCIONAMIENTO
  try {
    const historial = await pool.query('SELECT * FROM db_obtenerHistorialDeCompra($1)', [id_usuario]); 
    return historial.rows;
  } catch (error) {
    console.error("Error al obtener el historial :", error);
    throw new Error("Error al obtener el historial");
  }
}

async function db_añadirFactura(){

}


async function db_obtenerFactura(idFactura){

}

async function db_guardarDireccionEnvio(ID_Usuario,Calle,Ciudad,Codigo_Postal,departamento,barrio,descripcion){

}

async function db_obtenerDireccionPorUsuario(idUsuario) {

}


module.exports = { db_añadirUsuario,
  db_obtenerTodosLosProductos, db_obtenerCategoriaPorId,
  db_obtenerProductoPorId, db_obtenerNombreProveedorPorId,
  db_obtenerListaProveedores,
  db_obtenerListaCategorias,
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
  db_editarStock,
  db_logInventario,
  db_logFacturas,
  db_logUsuarios,
  db_añadirProductosCarrito,
  db_añadirProductoCarrito,db_modificarCantidadProductoCarrito,
  db_editarCarrito,db_eliminarProductoCarrito,
  db_verificarClienteActivo,
  db_obtenerCarrito,
  db_obtenerHistorialDeCompra,
  db_añadirFactura,
  db_obtenerFactura,
  db_guardarDireccionEnvio,db_obtenerDireccionPorUsuario
};
