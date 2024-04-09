const pool = require('./databaseConexion');


async function db_obtenerTodosLosProductos () { 
  try {
    const allProductos = await pool.query('SELECT * FROM db_obtenerTodosLosProductos()');
    console.log("productos en db", allProductos.rowCount); // Ver los resultados antes de devolverlos

    return allProductos.rows;
  } catch (error) {
    console.error("Error al ejecutar la consulta:", error);
    throw new Error("Error al ejecutar la consulta");
  }
}

async function db_obtenerListaProveedores(){
  try {
    let proveedor = await pool.query('SELECT * FROM db_obtenerListaProveedores()');
    return proveedor.rows;
  } catch (error) {
    console.error("Error al obtener proveedor :", error);
    throw new Error("Error al obtener proveedor");
  }
}

async function db_obtenerNombreProveedorPorId(idProveedor) {
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
    let prov = await pool.query('SELECT * FROM db_obtenerNombreProveedorPorId($1)', [id]);
    return prov;
  } catch (error) {
    // Capturar y lanzar cualquier error que ocurra durante la consulta
    throw error;
  }
}



async function db_obtenerCategoriaPorId (id) {
  try {
    let cat = await pool.query('SELECT * FROM db_obtenerCategoriaPorId($1)', [id]);
    return cat;
  } catch (error) {
    console.error("Error al obtener la categoria:", error);
    throw new Error("Error al obtener la categoria");
  }
};

async function db_obtenerListaCategorias(){
  try {
    const categoria = await pool.query('db_obtenerListaCategorias');
    return categoria.rows;
  } catch (error) {
    console.error("Error al obtener categorias :", error);
    throw new Error("Error al obtener categorias");
  }
};


async function db_obtenerProductoPorId (id) {
  try {
    const producto = await pool.query('SELECT * FROM db_obtenerProductoPorId($1);', [id]); 
    return producto.rows;
  } catch (error) {
    throw error;
  }
};


async function db_añadirUsuario(id_usuario, nombre_usuario, apellido_usuario, correo, 
  password, tipo_documento, telefono, idRol){
    try {
    const newusuario = await pool.query(
    'CALL db_añadirUsuario($1,$2,$3,$4,$5,$6,$7,$8);',[id_usuario, nombre_usuario, apellido_usuario,
                              correo, password, tipo_documento, telefono, idRol]);
      return true;
    } catch (error) {
    console.error("Error al añadir usuario");
    throw new Error("Error al añadir usuario service"+ error.message);
}
}



async function db_eliminarUsuario(idUsuario){
  try{
    const usuario = await pool.query('CALL db_eliminarUsuario($1);', [idUsuario]);
    return usuario;
  }catch(error){
    console.error("No se pudo eliminar el usuario");
    throw new Error("Error al añadir  usuario Service" + error.message);
  }
}

//El id de usuario es una llave promaria, no se puede editar!!!
async function db_actualizarUsuario(id_usuario, nombre_usuario, apellido_usuario, correo,contraseña, tipo_documento, telefono, idRol){
  try {
    const usuario = await pool.query(
      'CALL db_actualizarUsuario($1,$2,$3,$4,$5,$6,$7,$8);',[id_usuario, nombre_usuario, apellido_usuario,
                                                            correo, contraseña, tipo_documento, telefono, idRol]);

  } catch (error) {
    console.error("Error al actualizar usuario");
    throw new Error("Error al actualizar usuario");
  }
}


async function db_actualizarUsuarioEmpresa(id_usuario, nombre_usuario, apellido_usuario, correo,contraseña, tipo_documento, telefono, idRol, 
                                      nitEmpresa, nombreEmpresa, razonSocial, cargo, rubro){
  try {
    const usuario = await pool.query(
      'CALL db_actualizarUsuarioEmpresa($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13);',[id_usuario, nombre_usuario, apellido_usuario,
      correo, contraseña, tipo_documento, telefono, idRol, nitEmpresa, nombreEmpresa, razonSocial, cargo, rubro]);

  } catch (error) {
    console.error("Error al actualizar usuario");
    throw new Error("Error al actualizar usuario");
  }
}

async function db_añadirEmpresa(id_usuario, nombre_usuario, apellido_usuario, correo, contraseña, tipo_documento, telefono, idRol, nitEmpresa, 
                                nombreEmpresa, razonSocial, cargo, rubro){
  try {
      const usuario = await pool.query(
        'CALL db_añadirEmpresa($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13);',[id_usuario, nombre_usuario, apellido_usuario,
        correo, contraseña, tipo_documento, telefono, idRol, nitEmpresa, nombreEmpresa, razonSocial, cargo, rubro]);

      return true;

    } catch (error) {
      console.error("Error al actualizar usuario");
      throw new Error("Error al actualizar usuario "+ error.message);
    }
  }


async function db_obtenerUsuario(idUsuario){
  try {
    let usuario = await pool.query('SELECT * FROM db_obtenerUsuario($1)', [idUsuario]);
    return usuario.rows;
  } catch (error) {
    console.error("Error al obtener usuario", error);
    throw new Error("Error al obtener usuario"+ error.message);
  }
}

async function db_obtenerTodosUsuarios(){
  try {
    let usuarios = await pool.query('SELECT * FROM db_obtenerTodosUsuarios();');
    console.log("usuarios en db", usuarios.rowCount); // Ver los resultados antes de devolverlos
    return usuarios.rows;
  } catch (error) {
    console.error("Error al obtener usuarios :", error);
    throw new Error("Error al obtener usuarios"+ error.message);
  }
}


async function db_añadirProducto(nombre, descripcion, precio, estado_producto, color, 
                                stock, descuento, Proveedores_id_Proveedores, Categoria_idCategoria){
  try {
    const newProducto = await pool.query(
      'CALL db_añadirProducto($1,$2,$3,$4,$5,$6,$7,$8,$9);',
      [nombre, descripcion, precio, estado_producto, color, stock, descuento, Proveedores_id_Proveedores, Categoria_idCategoria]
    );
    return newProducto;
  } catch (error) {
    console.error("Error al insertar el producto");
    throw new Error("Error al insertar el producto "+ error.message);
  }
};

async function db_actualizarProducto(idProducto,nombre, descripcion, precio, estado_producto, color, 
                                      stock, descuento, idProveedor, idCategoria) {
    try {
        const producto = await pool.query('CALL db_actualizarProducto($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)', 
                                         [idProducto,nombre, descripcion, precio, estado_producto, color,
                                          stock, descuento, idProveedor, idCategoria]);
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        throw error.message;
    }
}


async function db_eliminarProducto(idProducto){
  try {
    const producto = await pool.query('CALL db_eliminarProducto($1);', [id_producto]);

  } catch (error) {
    console.error("Error al eliminar el producto", error);
    throw new Error("Error service");
  }
}


async function db_descontinuarProducto(idProducto,estado){
  try {
    const producto = await pool.query('CALL db_descontinuarProducto($1,$2);', [id_producto], [estado]);

  } catch (error) {
    console.error("Error al descontinuar el producto", error);
    throw new Error("Error service");
  }
}


/*metodo para modificar el stock. Se recomienda obtener el stock actual del producto*/

async function db_editarStock(id_producto, stock) {
  try {
      const historial = await pool.query('CALL db_editarStock($1, $2);', [id_producto, stock]);
      // console.log(id_producto + ' - service');
      return true;
  } catch (error) {
      console.error("Error al editar el stock:", error.message); 
      throw new Error("Error service" + error.message);
  }

}


async function db_logInventario(){

}


async function db_logUsuarios(){

}

//Retorna un booleano
async function db_verificarClienteActivo(idUsuario){
  try {
    const existe = await pool.query('CALL db_verificarClienteActivo($1);', [idUsuario]);
    return existe;

  } catch (error) {
    console.error("Error al verificar cliente activo");
    throw new Error("Error al verificar cliente activo");
  }
} 


async function  db_añadirProductoCarrito(idUsuario,idproducto, cantidad){
    // se manda el producto  con la cantidad que se desea
    try {
      const newProducto = await pool.query('CALL db_añadirProductosCarrito($1,$2,$3);', 
      [idUsuario, idproducto, cantidad]);
      return true;
    } catch (error) {
      console.error("Error al insertar el producto en el carrito de compras");
      throw new Error("Error service "+ error.message);
    }
  }
  
  async function  db_modificarCantidadProductoCarrito(idUsuario,idproducto, cantidad){ 
    // Busca según el idProducto del usuario y modifica la cantidad
    try {
      const resetProducto = await pool.query('CALL db_modificarCantidadProductoCarrito($1,$2,$3);', 
      [idUsuario, idproducto, cantidad]);
      return true;
    } catch (error) {
      console.error("Error al actualizar la cantidad del producto en el carrito de compras");
      throw new Error("Error al actualizar service "+ error.message); 
    }
  }
  

  async function  db_eliminarProductoCarrito(idUsuario,idProducto){//TODO
      // se manda el idproducto a eliminar del usuario
      try {
        const newProducto = await pool.query('CALL db_eliminarProductoCarrito($1,$2);', 
        [idUsuario, idProducto]);
        return true;
    
      } catch (error) {
        console.error("Error al eliminar el producto del carrito de compras");
        throw new Error("Error al eliminar el producto en del carrito de compras service"+ error.message);
      }

    
  
  async function  db_obtenerCarrito(idUsuario){
      // obtener todos los id de producto y la cantidad
      // luego db_obtenerProductoPorId 
      try {
        const carrito = await pool.query('SELECT * FROM db_obtenerCarrito($1);',[idUsuario]);
        return carrito.rows;
      } catch (error) {
        console.error("Error al obtener el carrito");
        throw new Error("Error al obtener el carrito service"+ error.message);
      }
  }

async function db_obtenerHistorialDeCompra(id_usuario /*requiere un entero*/){ 
  try {
    const historial = await pool.query('SELECT * FROM db_obtenerHistorialDeCompra($1)', [id_usuario]); 
    return historial.rows;
  } catch (error) {
    console.error("Error al obtener el historial :", error);
    throw new Error("Error al obtener el historial"+ error.message);
  }
}


//TODO db_añadirFactura
async function db_añadirFactura(){

}

//TODO db_obtenerFactura
async function db_obtenerFactura(idFactura){

}

//TODO db_guardarDireccionEnvio
async function db_guardarDireccionEnvio(ID_Usuario,Calle,Ciudad,Codigo_Postal,departamento,barrio,descripcion){

}

//TODO db_obtenerDireccionPorUsuario
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
  db_obtenerUsuario,
  db_obtenerTodosUsuarios,
  db_añadirProducto,
  db_eliminarProducto,
  db_descontinuarProducto,
  db_actualizarProducto,
  db_editarStock,
  db_logInventario,
  db_logUsuarios,
  db_añadirProductoCarrito,db_modificarCantidadProductoCarrito,
  db_eliminarProductoCarrito,
  db_verificarClienteActivo,
  db_obtenerCarrito,
  db_obtenerHistorialDeCompra,
  db_añadirFactura,
  db_obtenerFactura,
  db_guardarDireccionEnvio,db_obtenerDireccionPorUsuario
};
