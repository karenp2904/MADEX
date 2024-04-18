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

    return allProductos;
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
  
   // console.log(producto.categoria_idcategoria + " c");
    const descripcionCategoria = await services.db_obtenerCategoriaPorId( Number(producto.categoria_idcategoria));
    const categoria = descripcionCategoria ? descripcionCategoria.nombre : '' ;

   // console.log(producto.proveedores_id_proveedores + " p");
    let nombreProveedor = await services.db_obtenerNombreProveedorPorId( Number(producto.proveedores_id_proveedores));
    const proveedor = nombreProveedor ? nombreProveedor.nombreempresa : '';
    

    //let descripcionCategoria = await services.db_obtenerCategoriaPorId(producto.categoria);
    // Construir el objeto
  
    const Producto = {
      id_producto: producto.id_producto || '',
      nombre: producto.nombre || '',
      descripcion: producto.descripcion || '',
      precio:parseFloat(producto.precio)  || '',
      estado_producto: producto.estado_producto || '',
      color: producto.color || '',
      stock: producto.stock || 0,
      descuento: parseFloat(producto.descuento) || '',
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
    let producto = await services.db_obtenerProductoPorId( Number(id)); //buscaporid
    return producto;
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};

async function obtenerCategoriaID(id){
  try {
    let categoria = await services.db_obtenerCategoriaPorId( Number(id)); //buscaporid
    console.log('Categoria');
    return categoria;
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};

async function obtenerProveedorId(id){
  try {
    let proveedor = await services.db_obtenerNombreProveedorPorId( Number(id)); //buscaporid
    return proveedor;
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};



// Función para añadir un usuario
async function  añadirUsuario (id_usuario,nombre_usuario, apellido_usuario, correo,  password, tipo_documento,telefono, idRol)  {
  try {
    // Cifra la contraseña
    const passwordCifrada = await cifrarContraseña(password);

    console.log('Contraseña cifrada:', passwordCifrada.length);

    console.log(id_usuario + ':', idRol);

    const user = {
      id_usuario,
      nombre_usuario,
      apellido_usuario,
      correo,
      tipo_documento,
      contraseña: passwordCifrada, // Utiliza la contraseña cifrada aquí
      telefono,
      idRol
    };
    console.log(user);

    // Añade el usuario
    const añadido = await services.db_añadirUsuario(parseInt(id_usuario), nombre_usuario, apellido_usuario, correo,  passwordCifrada, tipo_documento,telefono, parseInt(idRol));
    console.log('Usuario añadido correctamente');

    return true;
  } catch (error) {
    // Maneja cualquier error y envía una respuesta de error al cliente
    console.error('Error al añadir usuario ControllerDb: ', error.message);
  }
}



// Función para eliminar un usuario
async function  eliminarUsuario (idUsuario)  {
  try {
    // Llama al servicio para eliminar el usuario
    const usuario=await services.db_eliminarUsuario( Number(idUsuario));
    console.log('usuario eliminado correctamente' );
    // Envía una respuesta de éxito
    return true;
  } catch (error) {
    // Maneja cualquier error y envía una respuesta de error al cliente
    console.error('Error al eliminar usuario:', error.message);
  }
}

// Función para actualizar un usuario
async function actualizarUsuario(idUsuario, nombre_usuario, apellido_usuario, correo, tipo_documento, contraseña, telefono, idRol) {
  try {
     // Cifra la contraseña
    const passwordCifrada = await cifrarContraseña(contraseña);

    console.log('Contraseña cifrada:', passwordCifrada.length);
    // Llama al servicio para actualizar el usuario
    const usuario= await services.db_actualizarUsuario( Number(idUsuario), nombre_usuario, apellido_usuario, correo,  passwordCifrada,tipo_documento, telefono,  Number(idRol));
    console.log('usuario actualizado correctamente' );
    // Envía una respuesta de éxito
    return usuario;
  } catch (error) {
    // Maneja cualquier error y envía una respuesta de error al cliente
    console.error('Error al actualizar usuario: ', error.message);
  }
}


async function añadirEmpresa(idUsuario, nombre, apellido, correo, password, tipo_documento, telefono, idRol, nitEmpresa, 
  nombreEmpresa, razonSocial, cargo, rubro){
  try {
    const passwordCifrada = await cifrarContraseña(password);

    console.log('Contraseña cifrada:', passwordCifrada.length);
    //  para añadir el empresa
    const empresa= await services.db_añadirEmpresa(Number(idUsuario), nombre, apellido, correo,  passwordCifrada, tipo_documento, telefono, Number(idRol), nitEmpresa, nombreEmpresa, razonSocial, cargo, rubro);
    console.log('Empresa añadido correctamente' );

    return {message: 'Empresa'};
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
    // Consulta el servicio de los usuarios
    const allUsers = await services.db_obtenerTodosUsuarios();

    // Verifica si se obtuvieron usuarios
    if (!Array.isArray(allUsers)) {
      throw new Error('El servicio db_obtenerTodosUsuarios no devolvió una lista de usuarios.');
    }

    // Mapear los datos de usuario para asegurar que tengan los campos necesarios
   // Mapear los datos de usuario para asegurar que tengan los campos necesarios
   const usuarios = allUsers.map(usuario => ({
    id_usuario: usuario.id_usuario || '',
    nombre_usuario: usuario.nombre || '',
    apellido_usuario: usuario.apellido|| '',
    correo: usuario.correo_electronico || '',
    tipo_documento: usuario.tipo_documento || '', // Se corrigió aquí
    contraseña: usuario.contrasena || '', // Se corrigió aquí
    telefono: usuario.telefono || '',
    idRol: usuario.idRol || 0,
    nitEmpresa: usuario.nitEmpresa || '',
    nombreEmpresa: usuario.nombre_Empresa || '',
    razonSocial: usuario.razon_social,
    cargo: usuario.cargo || '',
    rubro: usuario.rubro || ''
  }));
    return usuarios;
  } catch (error) {
    // Propaga el error para que sea manejado por la función que llama a obtenerTodosUsuarios
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

async function añadirProducto(nombre, descripcion, precio, estado_producto, color, stock, descuento, idProveedor, idCategoria) {
  try {
    // Llama al servicio para añadir el producto a la base de datos

    const newProducto = await services.db_añadirProducto(nombre, descripcion, Number(precio), estado_producto, color, Number(stock), Number(descuento), Number(idProveedor), Number(idCategoria));
    // Envía una respuesta con el nuevo producto
    return {message: '¿producto añadido?' ,newProducto };
  } catch (error) {
    // Maneja cualquier error y envía una respuesta de error al cliente
    console.error('Error al añadir producto controlldb ', error.message);
  }
};

async function eliminarProducto(idProducto){
  try {
    const producto=await services.db_eliminarProducto( Number(idProducto));
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
    const producto= await services.db_descontinuarProducto( Number(idProducto),  Number(estado));

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
    const producto= await services.db_actualizarProducto(idProducto,nombre, descripcion, Number(precio), estado_producto, color, Number(stock), Number(descuento), Number(idProveedor), Number(idCategoria));
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
      await services.db_actualizarProducto( Number(producto.idProducto),producto.nombre, producto.descripcion,  Number(producto.precio), producto.estado_producto, producto.color, Number( producto.stock),  Number(producto.descuento),  Number(producto.idProveedor), Number( producto.idCategoria));
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




async function editarStock(idProducto, nuevoStock){
  try {
    // Llama al servicio para actualizar el producto
    const producto= await services.db_editarStock(parseInt(idProducto), parseInt(nuevoStock));
    // Envía una respuesta de éxito
    console.log('Producto actualizado correctamente ControllerDatabase' );
    return {message: 'Producto actualizado ' + producto};
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



async function logUsuarios(){
  const lista= await services.db_logUsuarios();
  return lista;
}

async function añadirProductoCarrito(idUsuario,idproducto, cantidad){
// se manda el producto  con la cantidad que se desea
  try{
    const carrito= await services.db_añadirProductoCarrito( Number(idUsuario), Number(idproducto),  Number(cantidad));
    return { message: 'Producto añadido al carrito correctamente'  + carrito};
  }catch (error) {
    console.error('Error al añadir producto:', error.message);
  }
}

async function modificarCantidadProductoCarrito(idUsuario,idproducto, cantidad){
// se manda el idProducto  con la cantidad que se modifica
  try{
    const carrito= await services.db_modificarCantidadProductoCarrito( Number(idUsuario), Number(idproducto),  Number(cantidad));
    return { message: 'Producto modificado correctamente' , carrito};
  }catch (error) {
    console.error('Error al modficar producto Carrito:', error.message);
  }
}

async function eliminarProductoCarrito(idUsuario,idproducto){
  // se manda el idproducto a eliminar
  try{
    const carrito= await services.db_eliminarProductoCarrito( Number(idUsuario), Number(idproducto));
    return { message: 'Producto eliminado correctamente' };
  }catch (error) {
    console.error('Error al eliminar producto Carrito:', error.message);
  }
}
  

async function obtenerCarrito(idUsuario){
  try{
    // paso 1: obtener los id de producto y la cantidad
    const carrito= await services.db_obtenerCarrito( Number(idUsuario));
    //paso 2: buscar al producto por el id
    const productosEnCarrito = [];

      for (const item of carrito) {
          const idProducto = item.id_producto;
          const cantidad = item.cantidad;
    //paso 3: recolectar la info del producto
          // Busca el producto en la lista de productos por su ID
          const productoEncontrado = await services.db_obtenerProductoPorId(idProducto);
      
          if (productoEncontrado) {
              // Añade el producto encontrado al arreglo de productos en el carrito
              productosEnCarrito.push({
                  producto: productoEncontrado,
                  cantidad: cantidad
              });
          } else {
              console.error(`El producto con ID ${idProducto} no fue encontrado.`);
          }
      }
      
      console.log('Productos en el carrito:', productosEnCarrito);
      
  //paso 4: enviar todo
    return productosEnCarrito;
  }catch (error) {
    console.error('Error al añadir producto:', error.message);
  }
}

async function obtenerHistorialDeCompra(idUsuario){
  try {
    const historial = await services.db_obtenerHistorialDeCompra(Number(idUsuario));
    
    
    
    return historial;
  } catch (error) {
    console.error("Error al obtener el historial :", error);
    throw new Error("Error al obtener el historial");
  }
}

async function añadirFactura(valor_total, idMetodoDePago, idDireccion, idUsuario, idProducto){
  try {
    const factura = await services.db_añadirFactura(Number(valor_total), Number(idMetodoDePago), Number(idDireccion), Number(idUsuario), idProducto);
    return factura;
  } catch (error) {
    console.error("Error al añadir la factura", error);
    throw new Error("Error al añadir la factura"+ error.message);
  }

}


async function obtenerFactura(idFactura){
  try {
    const factura = await services.db_obtenerFactura(Number(idFactura));
    return factura;
  } catch (error) {
    console.error("Error al obtener la factura", error);
    throw new Error("Error al obtener la factura"+ error.message);
  }
}


async function guardarDireccionEnvio(ID_Usuario,Calle,Ciudad,Codigo_Postal,departamento,barrio,descripcion){
  try{
      const direccion= await services.db_guardarDireccionEnvio(Number(ID_Usuario),Calle,Ciudad,Codigo_Postal,departamento,barrio,descripcion)

      // Devuelve una respuesta indicando que la dirección se ha guardado correctamente
      return { message: 'Dirección guardada correctamente ' + direccion };
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


async function reestablecerContraseña(contrasena) {
  try {
      const passwordCifrada = await cifrarContraseña(contrasena);

      const password = await services.db_reestablecerContraseña(passwordCifrada);

      return password;
  } catch (error) {
      console.error('Error al retornar direccion:', error);
  }
}

async function agregarProductoDestacado(idProducto,idUsuario) {
  try {

      const productos = await services.db_agregarProductoDestacado(idProducto,idUsuario);

      return productos;
  } catch (error) {
      console.error('Error al obtener destacados:', error);
  }
}

async function obtenerDestacados(idUsuario) {
  try {

      const productos = await services.db_obtenerProductosDestacados(idUsuario);

      const destacados = [];

      for (const item of productos) {
          const idProducto = item.id_producto;
          const productoEncontrado = await services.db_obtenerProductoPorId(idProducto);
          if (productoEncontrado) {
              // Añade el producto encontrado al arreglo de productos en el carrito
              destacados.push({
                  producto: productoEncontrado,
              });
          } else {
              console.error(`El producto con ID ${idProducto} no fue encontrado.`);
          }
      }
      return destacados;
  } catch (error) {
      console.error('Error al obtener destacados:', error);
  }
}



//------- PROCESO DE CIFRADO ----------

const bcrypt = require('bcrypt');

async function cifrarContraseña(contraseña) {
  try {
      const hash = await bcrypt.hash(contraseña, 8); // Costo de hash: 8
     // const hashCortado = hash.slice(0, 40); // Cortar el hash a 40 caracteres
    
      return hash;
  } catch (error) {
      throw new Error('Error al cifrar la contraseña');
  }
}



async function compararContraseña(contraseña, hashCifrada) {
  try {
   

    console.log('Contraseña :', contraseña);
    console.log('Hash cifrado almacenado:', hashCifrada);

    // Comparar los dos hashes resultantes
    const resultado = await bcrypt.compare(contraseña, hashCifrada);

    console.log('Resultado de la comparación:', resultado);

    return resultado;
  } catch (error) {
    console.error('Error al comparar las contraseñas:', error);
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
  logUsuarios,
  añadirProductoCarrito, modificarCantidadProductoCarrito,
  eliminarProductoCarrito,
  obtenerCarrito,
  obtenerHistorialDeCompra,
  añadirFactura,
  obtenerFactura,reestablecerContraseña,obtenerDestacados,agregarProductoDestacado,
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
