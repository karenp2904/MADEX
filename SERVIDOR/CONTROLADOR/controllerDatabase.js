//Este controlador será el unico con acceso a los metodos de servicios de la base de datos 
// controllerB >> ServicesDB >>> ConexionDB

const services = require('../DATABASE/servicesDatabase.js');



async function obtenerTodosLosProductos() {
  try {
    // Consulta el servicio de los productos y obtiene todos los productos
    let allProductos = await services.db_obtenerTodosLosProductos();
    
    // Verifica si se obtuvieron productos
    if (!Array.isArray(allProductos)) {
      throw new Error('El servicio db_obtenerTodosLosProductos no devolvió una lista de productos.');
    }
    
    const productosCompletosPromises = allProductos.map(producto =>
      obtenerProductoDatos(producto)
    );

    // Espera a que todas las promesas de obtenerProductoPorId se resuelvan
    const productosCompletos = await Promise.all(productosCompletosPromises);

    console.log('Productos:', productosCompletos);

    return productosCompletos;
  } catch (error) {
    // Propaga el error para que sea manejado por la función que llama a obtenerTodosLosProductos
    throw error;
  }
}

async function obtenerProductoDatos(producto) {
  try {
    
  //  new producto = await services.db_obtenerProductoPorId(idProducto);
    // Verificar si se encontró el producto
    if (!producto) {
      return null;
    }
  
    console.log(producto.categoria_idcategoria + " c");
    const descripcionCategoria = await services.db_obtenerCategoriaPorId(producto.categoria_idcategoria);
    const categoria = descripcionCategoria ? descripcionCategoria.nombre : '' ;

    console.log(producto.proveedores_id_proveedores + " p");
    let nombreProveedor = await services.db_obtenerNombreProveedorPorId(producto.proveedores_id_proveedores);
    const proveedor = nombreProveedor ? nombreProveedor.nombreempresa : '';
    

    //let descripcionCategoria = await services.db_obtenerCategoriaPorId(producto.categoria);
    // Construir el objeto
    const Producto = {
      id_producto: producto.id_producto || '',
      nombre: producto.nombre || '',
      descripcion: producto.descripcion || '',
      precio: producto.precio || 0,
      estado_producto: producto.estado_producto || '',
      color: producto.color || '',
      stock: producto.stock || 0,
      descuento: producto.descuento || '',
      idProveedor: producto.Proveedores_id_Proveedores || '',
      proveedor: proveedor || '',
      categoria_idcategoria: producto.categoria_idcategoria || '',
      categoria: categoria || '' ,
    };

    // Asignar el nombre del proveedor y la descripción de la categoría al objeto del producto
    Producto.proveedor = proveedor;
    Producto.categoria = categoria;


    // Devolver el producto con la información extra
    return Producto;
  } catch (error) {
    console.error("Error al obtener producto con información extra:", error);
    throw new Error("Error al obtener producto con información extra");
  }
}

async function obtenerProductoPorId(id){
  try {
    let producto = await services.db_obtenerProductoPorId(id); //buscaporid
   return producto;
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};

async function obtenerCategoriaID(id){
  try {
    let categoria = await services.db_obtenerCategoriaPorId(id); //buscaporid
    console.log('Categoria');
    return categoria;
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};

async function obtenerProveedorId(id){
  try {
    let proveedor = await services.db_obtenerNombreProveedorPorId(id); //buscaporid
    return proveedor;
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};



// Función para añadir un usuario
async function  añadirUsuario (id_usuario, nombre_usuario, apellido_usuario, correo, tipo_documento, contraseña, telefono, idRol)  {
  try {
    //  para añadir el usuario
    const añadido= await services.db_añadirUsuario(id_usuario, nombre_usuario, apellido_usuario, correo, tipo_documento, contraseña, telefono, idRol);
    res.send(añadido);
    //  respuesta de éxito
    res.status(201).json({ message: 'Usuario añadido correctamente' });
  } catch (error) {
    // Maneja cualquier error y envía una respuesta de error al cliente
    console.error('Error al añadir usuario:', error.message);
    res.status(500).json({ error: 'Error al añadir usuario' });
  }
}

// Función para eliminar un usuario
async function  eliminarUsuario (idUsuario)  {
  try {
    // Llama al servicio para eliminar el usuario
    const usuario=await services.db_eliminarUsuario(idUsuario);
    // Envía una respuesta de éxito
    res.json({ message: 'Usuario eliminado correctamente '+ usuario });
  } catch (error) {
    // Maneja cualquier error y envía una respuesta de error al cliente
    console.error('Error al eliminar usuario:', error.message);
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
}

// Función para actualizar un usuario
async function actualizarUsuario(idUsuario,nuevosDatos) {
  try {

    // Llama al servicio para actualizar el usuario
    const usuario= await services.db_actualizarUsuario(idUsuario, nuevosDatos);
    // Envía una respuesta de éxito
    res.json({ message: 'Usuario actualizado correctamente '+usuario });
  } catch (error) {
    // Maneja cualquier error y envía una respuesta de error al cliente
    console.error('Error al actualizar usuario:', error.message);
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
}


async function añadirEmpresa(documento, correo, tipo_documento, contraseña, telefono ){
  try {

    //  para añadir el usuario
    const empresa= await services.db_añadirEmpresa(documento, correo, tipo_documento, contraseña, telefono);
    res.send(empresa);
    //  respuesta de éxito
    res.status(201).json({ message: 'Empresa añadido correctamente' });
  } catch (error) {
    // Maneja cualquier error y envía una respuesta de error al cliente
    console.error('Error al añadir empresa:', error.message);
    res.status(500).json({ error: 'Error al añadir empresa' });
  }
}

async function verificarCredencialUsuario(){

}

async function obtenerUsuario(id){
  try {
    let usuario = await services.db_obtenerUsuario(id); //buscaporid
    return producto;
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }

}

async function obtenerTodosUsuarios(){
  try {
    // Consulta el servicio de los usuaios
    let allUsers = await services.db_obtenerTodosUsuarios();
    
    // Verifica si se obtuvieron productos
    if (!Array.isArray(allUsers)) {
      throw new Error('El servicio db_obtenerTodosLosProductos no devolvió una lista de productos.');
    }
    
    const usuariosInfo = allUsers.map(usuario =>
      obtenerDatosUsuario(usuario)
    );

    // Espera a que todas las promesas de obtenerProductoPorId se resuelvan
    const usuariosCompletos = await Promise.all(usuariosInfo);

    console.log('Usuarios:', usuariosCompletos);

    return usuariosCompletos;
  } catch (error) {
    // Propaga el error para que sea manejado por la función que llama a obtenerTodosLosProductos
    throw error;
  }
}

async function obtenerDatosUsuario(){
// se agrega el rol al toda la informacion del usuario

};




//  obtener la descripción del proveedor según su ID
async function obtenerProveedor(nombre) {

  let proveedores = await services.db_obtenerListaProveedores();

  // Buscar el proveedor con el ID 
  const proveedorEncontrado = proveedores.find(proveedor => proveedor.id === idProveedor);

  //  retornar  nombre de empresa
  if (proveedorEncontrado) {
      return proveedorEncontrado.nombreEmpresa;
  } else {
      return 'Proveedor no encontrado'; // O manejar el caso en que el proveedor no exista
  }
}



// Otorga categoria al producto segun el id que acompañe
async function obtenerCategoria(idCategoria) {

  let categorias = await services.db_obtenerListaCategorias();
  // Buscar la categoría con el ID proporcionado
  const categoriaEncontrada = categorias.find(categoria => categoria.id === idCategoria);
        
  // Si se encuentra la categoría, retornar su descripción
  if (categoriaEncontrada) {
      return categoriaEncontrada;
  } else {
      return 'Categoría no encontrada'; // O manejar el caso en que la categoría no exista
  }
}

async function añadirProducto(producto) {
  try {
    // Llama al servicio para añadir el producto a la base de datos
    const newProducto = await services.db_añadirProducto(producto);
    
    // Envía una respuesta con el nuevo producto
    res.status(201).json(newProducto);
  } catch (error) {
    // Maneja cualquier error y envía una respuesta de error al cliente
    console.error('Error al añadir producto:', error.message);
    res.status(500).send('Error al añadir producto');
  }
};

async function eliminarProducto(idProducto){
  try {
    const producto=await services.db_eliminarProducto(idProducto);
    // Envía una respuesta de éxito
    res.json({ message: 'Producto eliminado correctamente '+ producto });
  } catch (error) {
    console.error('Error al eliminar Producto:', error.message);
    res.status(500).json({ error: 'Error al eliminar Producto' });
  }
    
}
async function descontinuarProducto(idProducto){
  try {

    // Obtiene el ID del producto y los nuevos datos del cuerpo de la solicitud

    const estado= "descontinuado";
    const producto= await services.db_descontinuarProducto(idProducto, estado);

    res.json({ message: 'Producto actualizado correctamente '+producto });
  } catch (error) {
    // Maneja cualquier error y envía una respuesta de error al cliente
    console.error('Error al actualizar producto:', error.message);
    res.status(500).json({ error: 'Error al actualizar producto' });
  }
    
}

async function actualizarProducto(idProducto, nuevosDatos){
  try {
    // Llama al servicio para actualizar el producto
    const producto= await services.db_actualizarProducto(idProducto, nuevosDatos);
    // Envía una respuesta de éxito

    res.json({ message: 'Producto actualizado correctamente '+producto });
  } catch (error) {
    // Maneja cualquier error y envía una respuesta de error al cliente
    console.error('Error al actualizar producto:', error.message);
    res.status(500).json({ error: 'Error al actualizar producto' });
  }
}

async function actualizarTodosProductos(productos) {
  try {
    for (const producto of productos) {
      await services.db_actualizarProducto(producto.id, producto.newData);
      console.log('Producto actualizado correctamente:', producto);
    }
    // Envía una respuesta de éxito
    return { message: 'Todos los productos se han actualizado correctamente' };
  } catch (error) {
    // Maneja cualquier error y envía una respuesta de error al cliente
    console.error('Error al actualizar productos:', error.message);
    throw new Error('Error al actualizar productos');
  }
}




async function editarStock(productId, stock){
  try {
    // Llama al servicio para actualizar el producto
    const producto= await services.db_actualizarProducto(productId, stock);
    // Envía una respuesta de éxito
    res.json({ message: 'Producto actualizado correctamente '+producto });

  } catch (error) {
    // Manejar cualquier error y enviar una respuesta de error al cliente
    console.error('Error al actualizar el producto:', error.message);
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
}



async function logInventario(){
  try{

  }catch (error) {
    console.error('Error al obtener el log inventario:', error.message);
    res.status(500).json({ error: 'Error al obtener el log inventarioo' });
  }
}


async function logFacturas(){

}


async function logUsuarios(){

}

async function añadirProductoCarrito(producto, cantidad){
// se manda el producto  con la cantidad que se desea
}

async function modificarCantidadProductoCarrito(idProducto, cantidad){
// se manda el idProducto  con la cantidad que se modifica
}

async function eliminarProductoCarrito(idProducto){
  // se manda el idproducto a eliminar
  }
  

async function obtenerCarrito(idUsuario){

  // paso 1: obtener los id de producto y la cantidad
  //paso 2: buscar al producto por el id
  //paso 3: recolectar la info del producto
  /* 
  const productosCompletosPromises = allProductos.map(producto =>
      obtenerProductoDatos(producto)
    );

    // Espera a que todas las promesas de obtenerProductoPorId se resuelvan
    const productosCompletos = await Promise.all(productosCompletosPromises);
  */
  //paso 4: enviar todo

}

async function editarCarrito(){

}

async function verificarClienteActivo(){
} 

async function obtenerHistorialDeCompra(){

}

async function añadirFactura(){

}


async function obtenerFactura(){

}

async function guardarDireccionEnvio(){

}

module.exports = {
  obtenerTodosLosProductos,
  obtenerProductoDatos, obtenerProductoPorId,
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
  actualizarProducto,actualizarTodosProductos,
  editarStock,
  logInventario,
  logFacturas,
  logUsuarios,
  añadirProductoCarrito, modificarCantidadProductoCarrito,
  editarCarrito,eliminarProductoCarrito,
  verificarClienteActivo,
  obtenerCarrito,
  obtenerHistorialDeCompra,
  añadirFactura,
  obtenerFactura,
  guardarDireccionEnvio
};



//implementaciones anteriores por si las necesito

  /*
   // Mapea los productos obtenidos a objetos Producto
  const listaProductos = allProductos.map(({id_producto, nombre, descripcion, precio, estado_producto, color, stock, descuento, proveedores_id_proveedores, categoria_idcategoria }) => {
  

  // Retorna un nuevo objeto Producto con toda la información
  return new Producto({ 
      id_producto,
      nombre,
      descripcion,
      precio,
      estado_producto,
      color,
      stock,
      descuento,
      proveedor,
      categoria
     
  });
   
});
*/
