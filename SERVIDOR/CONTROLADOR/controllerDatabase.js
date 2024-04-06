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
      //  proveedor: proveedor || '',
      idCategoria: producto.categoria_idcategoria || '',
      //categoria: categoria || '' ,
    };

    // Asignar el nombre del proveedor y la descripción de la categoría al objeto del producto
   // Producto.proveedor = proveedor;
   // Producto.categoria = categoria;


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
    console.log('en controllerdb')

     // Cifra la contraseña
      const contraseñaCifrada = await cifrarContraseña(contraseña);
      console.log('Contraseña cifrada:', contraseñaCifrada);

    console.log('usuario añadido correctamente' );
    return añadido;
  } catch (error) {
    // Maneja cualquier error y envía una respuesta de error al cliente
    console.error('Error al añadir usuario:', error.message);
  }
}



// Función para eliminar un usuario
async function  eliminarUsuario (idUsuario)  {
  try {
    // Llama al servicio para eliminar el usuario
    const usuario=await services.db_eliminarUsuario(idUsuario);
    console.log('usuario eliminado correctamente' );
    // Envía una respuesta de éxito
    return usuario;
  } catch (error) {
    // Maneja cualquier error y envía una respuesta de error al cliente
    console.error('Error al eliminar usuario:', error.message);
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
}

// Función para actualizar un usuario
async function actualizarUsuario(id_usuario, nombre_usuario, apellido_usuario, correo, tipo_documento, contraseña, telefono, idRol) {
  try {
    // Llama al servicio para actualizar el usuario
    const usuario= await services.db_actualizarUsuario(id_usuario, nombre_usuario, apellido_usuario, correo, tipo_documento, contraseña, telefono, idRol);
    console.log('usuario actualizado correctamente' );
    // Envía una respuesta de éxito
    return usuario;
  } catch (error) {
    // Maneja cualquier error y envía una respuesta de error al cliente
    console.error('Error al actualizar usuario:', error.message);
  }
}


async function añadirEmpresa(idUsuario, nombre, apellido, correo, contraseña, idRol, nitEmpresa, nombreEmpresa, razonSocial, cargo, rubro){
  try {

    //  para añadir el empresa
    const empresa= await services.db_añadirEmpresa(idUsuario, nombre, apellido, correo, contraseña, idRol, nitEmpresa, nombreEmpresa, razonSocial, cargo, rubro);
    console.log('Empresa añadido correctamente' );
     // Cifra la contraseña
    const contraseñaCifrada = await cifrarContraseña(contraseña);
    console.log('Contraseña cifrada:', contraseñaCifrada);

    return empresa;
    //  respuesta de éxito
  } catch (error) {
    // Maneja cualquier error y envía una respuesta de error al cliente
    console.error('Error al añadir empresa:', error.message);
  }
}

async function obtenerUsuario(idUsuario){
  try {
    let usuario = await services.db_obtenerUsuario(idUsuario); //buscaporid
    return usuario;
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }

}

async function obtenerTodosUsuarios(){
  try {
    /*
    // Consulta el servicio de los usuaios
    let allUsers = await services.db_obtenerTodosUsuarios();
    
    // Verifica si se obtuvieron productos
    if (!Array.isArray(allUsers)) {
      throw new Error('El servicio db_obtenerTodosUsuarios no devolvió una lista de usuarios.');
    }
    */
    
      // Simulamos la obtención de usuarios de una base de datos o de algún otro origen de datos
      const allUsers = [
        {
            id_usuario: "1000",
            nombre_usuario: "Karen",
            apellido_usuario: "Perez",
            correo: "karen@gmail.com",
            tipo_documento: "DNI",
            contraseña: "contraseña123",
            telefono: "123456789",
            idRol: 2
        },
        {
            id_usuario: "2",
            nombre_usuario: "Otro",
            apellido_usuario: "Usuario",
            correo: "otro@gmail.com",
            tipo_documento: "Cédula",
            contraseña: "otro",
            telefono: "987654321",
            idRol: 1
        },
        // Puedes agregar más usuarios si lo deseas
    ];
    const contraseñaCifrada = await cifrarContraseña('otro');
    const contraseñaCifrada2 = await cifrarContraseña('contraseña123');
          // Simulamos un retardo para simular una operación asíncrona
          await new Promise(resolve => setTimeout(resolve, 1000));
      
      

    return allUsers;
  } catch (error) {
    // Propaga el error para que sea manejado por la función que llama a obtenerTodosLosProductos
    throw error;
  }
}

async function obtenerDatosUsuario(){
// se agrega el rol al toda la informacion del usuario
// esta funcion es en caso de necesitar info adicional - pendiente
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

async function añadirProducto(producto) {
  try {
    // Llama al servicio para añadir el producto a la base de datos

    const newProducto = await services.db_añadirProducto(producto.nombre, producto.descripcion, producto.precio, producto.estado_producto, producto.color, producto.stock, producto.descuento, producto.idProveedor, producto.idCategoria);
    // Envía una respuesta con el nuevo producto
    return newProducto;
  } catch (error) {
    // Maneja cualquier error y envía una respuesta de error al cliente
    console.error('Error al añadir producto:', error.message);
  }
};

async function eliminarProducto(idProducto){
  try {
    const producto=await services.db_eliminarProducto(idProducto);
    // Envía una respuesta de éxito
    consologe.log('Producto eliminado correctamente '+ producto);
    return producto;
  } catch (error) {
    console.error('Error al eliminar Producto:', error.message);
  }
    
}
async function descontinuarProducto(idProducto){
  try {

    // Obtiene el ID del producto y los nuevos datos del cuerpo de la solicitud

    const estado= "descontinuado";
    const producto= await services.db_descontinuarProducto(idProducto, estado);

    consologe.log('Producto actualizado correctamente '+producto );
    return producto;
  } catch (error) {
    // Maneja cualquier error y envía una respuesta de error al cliente
    console.error('Error al descontinuar producto:', error.message);
  }
    
}

async function actualizarProducto(idProducto,nombre, descripcion, precio, estado_producto, color, stock, descuento, idProveedor, idCategoria){
  try {
    // Llama al servicio para actualizar el producto
    const producto= await services.db_actualizarProducto(idProducto,nombre, descripcion, precio, estado_producto, color, stock, descuento, idProveedor, idCategoria);
    // Envía una respuesta de éxito

    consologe.log( 'Producto actualizado correctamente '+producto );
    return producto;
  } catch (error) {
    // Maneja cualquier error y envía una respuesta de error al cliente
    console.error('Error al actualizar producto:', error.message);
  }
}

async function actualizarTodosProductos(productos) {
  try {
    for (const producto of productos) {
      await services.db_actualizarProducto(producto.idProducto,producto.nombre, producto.descripcion, producto.precio, producto.estado_producto, producto.color, producto.stock, producto.descuento, producto.idProveedor, producto.idCategoria);
      console.log('Producto actualizado correctamente:', producto);
    }
    // Envía una respuesta de éxito
    return  'Todos los productos se han actualizado correctamente' ;
  } catch (error) {
    // Maneja cualquier error y envía una respuesta de error al cliente
    console.error('Error al actualizar productos:', error.message);
    throw new Error('Error al actualizar productos');
  }
}




async function editarStock(id_producto, stock){
  try {
    // Llama al servicio para actualizar el producto
    const producto= await services.db_editarStock(id_producto, stock);
    // Envía una respuesta de éxito
    console.log('Producto actualizado correctamente '+producto );
    return producto;
  } catch (error) {
    // Manejar cualquier error y enviar una respuesta de error al cliente
    console.error('Error al actualizar el producto:', error.message);
  }
}



async function logInventario(){
  try{
    const lista= await services.db_logInventario();
    return lista;
  }catch (error) {
    console.error('Error al obtener el log inventario:', error.message);
  }
}


async function logFacturas(){
  const lista= await services.db_logFacturas();
  return lista;
}


async function logUsuarios(){
  const lista= await services.db_logUsuarios();
  return lista;
}

async function añadirProductoCarrito(idUsuario,idproducto, cantidad){
// se manda el producto  con la cantidad que se desea
  try{
    const carrito= await services.db_añadirProductoCarrito(idUsuario,idproducto, cantidad);
    return carrito;
  }catch (error) {
    console.error('Error al añadir producto:', error.message);
  }
}

async function modificarCantidadProductoCarrito(idUsuario,idproducto, cantidad){
// se manda el idProducto  con la cantidad que se modifica
  try{
    const carrito= await services.db_modificarCantidadProductoCarrito(idUsuario,idproducto, cantidad);
    return carrito;
  }catch (error) {
    console.error('Error al modficar producto Carrito:', error.message);
  }
}

async function eliminarProductoCarrito(idUsuario,idproducto){
  // se manda el idproducto a eliminar
  try{
    const carrito= await services.db_eliminarProductoCarrito(idUsuario,idproducto);
    return carrito;
  }catch (error) {
    console.error('Error al eliminar producto Carrito:', error.message);
  }
}
  

async function obtenerCarrito(idUsuario){
  try{
    // paso 1: obtener los id de producto y la cantidad
    const carrito= await services.db_obtenerCarrito(idUsuario);
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
    return carrito;
  }catch (error) {
    console.error('Error al añadir producto:', error.message);
  }

  

  

}

async function obtenerHistorialDeCompra(idUsuario){
  try {
    const historial = await services.db_obtenerHistorialDeCompra(parseInt(idUsuario));
    return historial;
  } catch (error) {
    console.error("Error al obtener el historial :", error);
    throw new Error("Error al obtener el historial");
  }
}

async function añadirFactura(){

}


async function obtenerFactura(){

}

async function guardarDireccionEnvio(nuevaDireccion){
  try{
    services.db_guardarDireccionEnvio(nuevaDireccion.ID_Usuario,
      nuevaDireccion.Calle,
      nuevaDireccion.Ciudad,
      nuevaDireccion.Codigo_Postal,
      nuevaDireccion.departamento,
      nuevaDireccion.barrio,
      nuevaDireccion.descripcion)

      // Devuelve una respuesta indicando que la dirección se ha guardado correctamente
      return { message: 'Dirección guardada correctamente' };
  }catch (error) {
    console.error('Error al obtener al guardar direccion:', error.message);
  }
}

async function obtenerDireccionPorUsuario(idUsuario) {
  try {
      if (idUsuario != null) {
          const direccion = await services.db_obtenerDireccionPorUsuario(idUsuario);
          return direccion;
      } else {
          // Si idUsuario es nulo, lanza un error indicando que se proporcionó un ID de usuario inválido
          throw new Error('ID de usuario no válido');
      }
  } catch (error) {
      console.error('Error al obtener la dirección por usuario:', error.message);
      throw error; // Relanza el error para que pueda ser manejado por el código que llama a esta función
  }
}

//------- PROCESO DE CIFRADO ----------

const bcrypt = require('bcrypt');

// Método para cifrar la contraseña
async function cifrarContraseña(contraseña) {
  try {

      // Genera un hash de la contraseña con una sal (salt) aleatoria
      const hash = await bcrypt.hash(contraseña, 10); // 10 es el costo del hash (el número de rondas de encriptación)
      console.log(contraseña);
      return hash;
  } catch (error) {
      throw new Error('Error al cifrar la contraseña');
  }
}

// Método para comparar la contraseña proporcionada con la contraseña almacenada cifrada
async function compararContraseña(contraseña, hashCifrada) {
  try {
    const resultado = contraseña.localeCompare(hashCifrada, undefined, { sensitivity: 'accent' }) === 0;

    console.log('Resultado de la comparación:', resultado);

      return resultado;

  } catch (error) {
      throw new Error('Error al comparar las contraseñas');
  }
}

// Ejecuta el ejemplo

module.exports = {
  obtenerTodosLosProductos,
  obtenerProductoDatos, obtenerProductoPorId, obtenerCategoria,
  actualizarUsuario,
  añadirUsuario,compararContraseña,
  añadirUsuario,
  eliminarUsuario,
  actualizarUsuario,
  añadirEmpresa,
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
  eliminarProductoCarrito,
  obtenerCarrito,
  obtenerHistorialDeCompra,
  añadirFactura,
  obtenerFactura,
  guardarDireccionEnvio,obtenerDireccionPorUsuario
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
