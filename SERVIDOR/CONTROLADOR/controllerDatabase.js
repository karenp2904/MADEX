//Este controlador será el unico con acceso a los metodos de servicios de la base de datos 
// controllerB >> ServicesDB >>> ConexionDB

const {db_crearProducto,db_obtenerProductoPorId,db_obtenerTodosLosProductos,
  db_añadirUsuario,db_eliminarUsuario,db_actualizarUsuario,db_añadirEmpresa,
  db_verificarCredencialUsuario, db_obtenerUsuario,db_obtenerTodosUsuarios,
  db_añadirProducto,db_eliminarProducto,db_descontinuarProducto,
  db_actualizarProducto, db_obtenerProducto,db_editarStock,
  db_logInventario,db_logFacturas, db_logUsuarios,db_añadirProductosCarrito, db_editarCarrito, db_verificarClienteActivo,
  db_obtenerCarrito,db_obtenerHistorialDeCompra,db_añadirFactura, db_obtenerFactura, db_guardarDireccionEnvio
} = require('../DATABASE/servicesDatabase.js');

async function crearProducto(req, res) {
  try {
    const { nombre, descripcion, precio, estado_producto, color, stock, descuento, Proveedores_id_Proveedores, Categoria_idCategoria } = req.body;
    const newProducto = await db_crearProducto(nombre, descripcion, precio, estado_producto, color, stock, descuento, Proveedores_id_Proveedores, Categoria_idCategoria);
    res.json(newProducto);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};

async function obtenerTodosLosProductos() {
  try {
    const allProductos = await db_obtenerTodosLosProductos(); // consulta el servicio de los productos y devuelve todos los productos
    return allProductos;
  } catch (error) {
    throw error; // Propaga el error para que sea manejado por la función que llama a obtenerTodosLosProductos
  }
};

async function obtenerProductoPorId  (req, res){
  try {
    const { id } = req.params;
    const producto = await db_obtenerProductoPorId(id); //buscaporid
    res.json(producto);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};


// Función para añadir un usuario
async function  añadirUsuario (req, res)  {
  try {
    // Extrae los datos del usuario del cuerpo de la solicitud
    const { username, email, password } = req.body;
    // Llama al servicio para añadir el usuario
    const usuario= await db_añadirUsuario(username, email, password);
    res.send(usuario);
    // Envía una respuesta de éxito
    res.status(201).json({ message: 'Usuario añadido correctamente' });
  } catch (error) {
    // Maneja cualquier error y envía una respuesta de error al cliente
    console.error('Error al añadir usuario:', error.message);
    res.status(500).json({ error: 'Error al añadir usuario' });
  }
}

// Función para eliminar un usuario
async function  eliminarUsuario (req, res)  {
  try {
    // Obtiene el ID del usuario a eliminar de los parámetros de la solicitud
    const userId = req.params.userId;
    // Llama al servicio para eliminar el usuario
    const usuario=await db_eliminarUsuario(userId);
    // Envía una respuesta de éxito
    res.json({ message: 'Usuario eliminado correctamente '+ usuario });
  } catch (error) {
    // Maneja cualquier error y envía una respuesta de error al cliente
    console.error('Error al eliminar usuario:', error.message);
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
}

// Función para actualizar un usuario
async function actualizarUsuario(req, res) {
  try {
    // Obtiene el ID del usuario y los nuevos datos del cuerpo de la solicitud
    const userId = req.params.userId;
    const newData = req.body;
    // Llama al servicio para actualizar el usuario
    const usuario= await db_actualizarUsuario(userId, newData);
    // Envía una respuesta de éxito
    res.json({ message: 'Usuario actualizado correctamente '+usuario });
  } catch (error) {
    // Maneja cualquier error y envía una respuesta de error al cliente
    console.error('Error al actualizar usuario:', error.message);
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
}


async function añadirUsuario(){

}

async function eliminarUsuario(){

}

async function actualizarUsuario(){

}

async function añadirEmpresa(){

}

async function verificarCredencialUsuario(){

}

async function obtenerUsuario(){

}

async function obtenerTodosUsuarios(){

}

async function añadirProducto(){

}

async function eliminarProducto(){
    
}
async function descontinuarProducto(){
    
}

async function actualizarProducto(){
    
}

async function obtenerProducto(){
    
}

async function obtenerListaProductos(){
    
}

async function editarStock(){

}


async function logInventario(){

}


async function logFacturas(){

}


async function logUsuarios(){

}

async function añadirProductosCarrito(){

}

async function editarCarrito(){

}

async function verificarClienteActivo(){
} 

async function obtenerCarrito(){

}

async function obtenerHistorialDeCompra(){

}

async function añadirFactura(){

}


async function db_obtenerFactura(){

}

async function db_guardarDireccionEnvio(){

}

module.exports = {
  crearProducto,
  obtenerTodosLosProductos,
  obtenerProductoPorId,
  actualizarUsuario,
  añadirUsuario,
  añadirUsuario,
  eliminarUsuario,
  actualizarUsuario,
  añadirEmpresa,
  verificarCredencialUsuario,
  obtenerUsuario,
  obtenerTodosUsuarios,
  añadirProducto,
  eliminarProducto,
  descontinuarProducto,
  actualizarProducto,
  obtenerProducto,
  editarStock,
  logInventario,
  logFacturas,
  logUsuarios,
  añadirProductosCarrito,
  editarCarrito,
  verificarClienteActivo,
  obtenerCarrito,
  obtenerHistorialDeCompra,
  añadirFactura,
  obtenerFactura,
  guardarDireccionEnvio
};
