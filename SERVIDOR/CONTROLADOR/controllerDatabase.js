//Este controlador será el unico con acceso a los metodos de servicios de la base de datos 
// controllerB >> ServicesDB >>> ConexionDB

const services = require('../DATABASE/servicesDatabase.js');
const Producto = require('../ENTIDADES/producto');

async function crearProducto(req, res) {
  try {
    const { nombre, descripcion, precio, estado_producto, color, stock, descuento, Proveedores_id_Proveedores, Categoria_idCategoria } = req.body;
    const newProducto = await services.db_crearProducto(nombre, descripcion, precio, estado_producto, color, stock, descuento, Proveedores_id_Proveedores, Categoria_idCategoria);
    res.json(newProducto);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};

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

    console.log('Lista de productos:', productosCompletos);

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
  
    const descripcionCategoria = await services.db_obtenerCategoriaPorId(producto.categoria_idcategoria);
    const categoria = descripcionCategoria ? descripcionCategoria.nombre : '' ;

    let nombreProveedor = await services.db_obtenerNombreProveedorPorId(producto.Proveedores_id_Proveedores);
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
    producto.proveedor = nombreProveedor;
    producto.categoria = descripcionCategoria;

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

//  obtener la descripción del proveedor según su ID
async function obtenerProveedor(idProveedor) {

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

// Función para añadir un usuario
async function  añadirUsuario (req, res)  {
  try {
    // Extrae los datos del usuario del cuerpo de la solicitud
    const { username, email, password } = req.body;
    //  para añadir el usuario
    const usuario= await services.db_añadirUsuario(username, email, password);
    res.send(usuario);
    //  respuesta de éxito
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
    const usuario=await services.db_eliminarUsuario(userId);
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
    const usuario= await services.db_actualizarUsuario(userId, newData);
    // Envía una respuesta de éxito
    res.json({ message: 'Usuario actualizado correctamente '+usuario });
  } catch (error) {
    // Maneja cualquier error y envía una respuesta de error al cliente
    console.error('Error al actualizar usuario:', error.message);
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
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


async function obtenerFactura(){

}

async function guardarDireccionEnvio(){

}

module.exports = {
  crearProducto,
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
