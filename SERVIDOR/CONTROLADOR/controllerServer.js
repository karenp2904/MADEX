// controladorServer.js
const Usuario = require('../ENTIDADES/usuario.js');
const controllerDB = require('./controllerDatabase.js');
const CarritoDeCompras = require('../ENTIDADES/carritoDeCompra.js');


async function manejarInicioSesion(correo, contraseña) {
    try {
        // Verificar las credenciales del usuario
        const resultadoAutenticacion = await s_verificarCredencialUsuario(correo, contraseña);

        if (resultadoAutenticacion.success === false) {
            // Si las credenciales son incorrectas o el usuario no existe, devuelve un mensaje de error
            return { success: false, message: resultadoAutenticacion.message };
        } else {
            // Si las credenciales son correctas, devuelve un mensaje de éxito y el objeto del usuario autenticado
            return { success: true, message: resultadoAutenticacion.message, usuario: resultadoAutenticacion.usuario };
        }
    } catch (error) {
        console.error('Error al manejar el inicio de sesión:', error);
        throw error;
    }
}




async function s_verificarCredencialUsuario(correo, contraseña) {
    try {
        const usuarios = await s_obtenerTodosUsuarios();

        // Encuentra el usuario con el correo proporcionado
        const usuario = usuarios.find(u => u.correo === correo);
        console.log('correo del login:' + usuario.correo);
        if (!usuario) {
            return { success: false, message: "Credenciales incorrectas" }; // Usuario no encontrado
        }
        else {
            console.log('contraseña del login:' + usuario.contraseña);
            const contraseñaCorrecta = await controllerDB.compararContraseña(contraseña, usuario.contraseña);
            console.log('Contraseña correcta:', contraseñaCorrecta);

            if (!contraseñaCorrecta || contraseñaCorrecta == null) {
                return { success: false, message: "Credenciales incorrectas" }; // Contraseña incorrecta
            }
            else {
                // Verificar el rol del usuario
                s_comprobarRol(usuario);

                return { success: true, message: "Inicio de sesión exitoso", usuario: usuario };
            }
        }


    } catch (error) {
        console.error('Error al verificar las credenciales del usuario:', error);
        throw new Error('Error al verificar las credenciales del usuario');
    }
}



    async function s_comprobarRol(usuario) {
        try {
            console.log("rol" + usuario.idRol);

            if (usuario.idRol === 1) {
                console.log('El usuario es un administrador');
                return "admin";
            } else if (usuario.idRol === 2) {
                console.log('El usuario es un cliente');
                return "cliente";
            } else if (usuario.idRol === 3) {
                console.log('El usuario es una empresa');
                return "empresa";
            } else {
                console.log('El usuario tiene un rol desconocido');
                return "otro";
            }
        } catch (error) {
            // Manejo de errores
            console.error('Error al comprobar el rol del usuario:', error);
            throw new Error('Error al comprobar el rol del usuario');
        }
    }
    

    
    async function listaDeProductos(req, res) {
        try {
            const listaProductos = await controllerDB.obtenerTodosLosProductos();
            
            // Verifica si se obtuvieron productos
            if (!Array.isArray(listaProductos)) {
                throw new Error('El servicio db_obtenerTodosLosProductos no devolvió una lista de productos.');
            }
            
            // Mapea los productos para convertirlos en objetos "producto"
            const productos = listaProductos.map(producto => {
                return {
                    id_producto: producto.id_producto,
                    nombre: producto.nombre,
                    descripcion: producto.descripcion,
                    precio: parseFloat(producto.precio),
                    estado: producto.estado_producto,
                    color: producto.color,
                    stock: parseInt(producto.stock),
                    descuento: parseFloat(producto.descuento),
                    idProveedor: producto.idProveedor,
                    //proveedor: producto.proveedor,
                    idCategoria: producto.idCategoria,
                    //categoria: producto.categoria
                };
            });
    
            // Devuelve el array de objetos "producto"
            console.log("En server" + productos);
            return productos;
        } catch (error) {
            console.error('Error al obtener los productos:', error);
            throw error;
        }
    }

    async function aplicarDescuento(idRol, idProducto) {
        let descuento = 0;
        const productos= await listaDeProductos();
        const producto = productos.find(producto => producto.id_producto === idProducto);
        
        // Verificar el rol del usuario y aplicar el descuento correspondiente
        switch (idRol) {
            case '2': //cliente
                descuento = 10; // Descuento del 10% para clientes
                break;
            case '3': //empresa
                descuento = 15; // Descuento del 15% para empresas
                break;
            default:
                descuento = 0; // Sin descuento para otros roles
        }

        // Calcular el precio con el descuento aplicado
        const precioConDescuento = producto.precio * (1 - descuento / 100);

        return precioConDescuento;
    }

    function definirDescuento(idRol){
        let descuento = 0;
        
        switch (idRol) {
            case 2: //cliente
                descuento = 10; // Descuento del 10% para clientes
                break;
            case 3: //empresa
                descuento = 15; // Descuento del 15% para empresas
                break;
            default:
                descuento = 0; // Sin descuento para otros roles
        }
        console.log("descuento  "+descuento);
        return descuento;
    }    
    
    
    
    async function s_añadirUsuario(id_usuario, nombre_usuario, apellido_usuario, correo,  password,tipo_documento, telefono, idRol) {
        try {
            // Llama al método añadirUsuario de controllerDB y pasa los datos obtenidos
            const usuario = await controllerDB.añadirUsuario(id_usuario,nombre_usuario, apellido_usuario, correo,password,tipo_documento, telefono, idRol);
            
            console.log('en controllerServer');
            // Devuelve una respuesta JSON con el usuario añadido
            return usuario;
        } catch (error) {
            console.error('Error al añadir usuario:', error);
        }
    }
    
    


    async function s_eliminarUsuario(idUsuario) {
        try {
            // Implementación para eliminar un usuario en la base de datos
            const user= await controllerDB.eliminarUsuario(idUsuario);
            console.log('en controllerServer');
            return user;
        } catch (error) {
            // Manejar cualquier error que ocurra durante el proceso de eliminación
            console.error('Error al eliminar usuario:', error);
        }
    }
    

    async function s_actualizarUsuario(id_usuario, nombre_usuario, apellido_usuario, correo, tipo_documento, contraseña, telefono, idRol) {
        try {
            // Implementación para actualizar un usuario en la base de datos
            const usuarioActualizado = await controllerDB.actualizarUsuario(id_usuario, nombre_usuario, apellido_usuario, correo, tipo_documento, contraseña, telefono, idRol);
            console.log('en controllerServer');
            // Enviar una respuesta con el usuario actualizado
            return usuarioActualizado;
        } catch (error) {
            // Manejar cualquier error que ocurra durante el proceso de actualización
            console.error('Error al actualizar usuario:', error);
        }
    }
    

    async function s_añadirEmpresa(idUsuario, nombre, apellido, correo, tipo_documento, contraseña, telefono, idRol, nitEmpresa, nombreEmpresa, razonSocial, cargo, rubro) {
        try {
            // añadir un empresa en la base de datos
            const empresa =await controllerDB.añadirEmpresa(idUsuario, nombre, apellido, correo, tipo_documento, contraseña, telefono, idRol, nitEmpresa, nombreEmpresa, razonSocial, cargo, rubro);
            console.log('en controllerServer');
            return empresa; 
        } catch (error) {
            console.error('Error al añadir usuario:', error);
        }
    }
    async function s_obtenerUsuarioId(usuarioId) {
        try {
            // Busca el usuario por su ID en la base de datos
            const usuario = await controllerDB.obtenerUsuario(usuarioId);
            // Verifica si se encontró el usuario
            if (!usuario) {
                return 'Usuario no encontrado';
            }else{
                return usuario;
            }
        } catch (error) {
            console.error('Error al buscar Usuario por ID:', error);
        }
    }


    async function s_obtenerTodosUsuarios(){
        try {
            const listaUsuarios = await controllerDB.obtenerTodosUsuarios();
            
            // Verifica si se obtuvieron usuarios
            if (!Array.isArray(listaUsuarios)) {
                throw new Error('El servicio db_obtenerTodosLosProductos no devolvió una lista de productos.');
            }

            // Mapea los usuarios para convertirlos en objetos "usuario"
            const usuarios = listaUsuarios.map(usuario => {
                return {
                    id_usuario: parseInt(usuario.id_usuario),
                    nombre_usuario: usuario.nombre_usuario,
                    apellido_usuario: usuario.apellido_usuario,
                    correo: usuario.correo,
                    contraseña: usuario.contraseña,
                    tipo_documento: usuario.tipo_documento,
                    telefono: usuario.telefono,
                    idRol: usuario.idRol,
                    nitEmpresa: usuario.nitEmpresa,
                    nombreEmpresa: usuario.nombreEmpresa,
                    razonSocial: usuario.razonSocial,
                    cargo: usuario.cargo,
                    rubro: usuario.rubro
                };
            });
    
            // Devuelve el array de objetos "usuario"
            console.log("En server" +usuarios);
            return usuarios;
        } catch (error) {
            console.error('Error al obtener los usuarios:', error);
            throw error;
        }

    }

    async function s_obtenerHistorialCompra(id_usuario) {
        try {

            const facturas = await controllerDB.obtenerHistorialDeCompra(id_usuario);
        
            // Devuelve el array de objetos "producto"
            console.log('en controllerServer');
            console.log("HistorialCompra" + facturas);
            return facturas;
        } catch (error) {
            console.error('Error al obtener los productos:', error);
            throw error;
        }
    }


    async function s_añadirProducto(nombre, descripcion, precio, estado_producto, color, stock, descuento, idProveedor, idCategoria) {
        try {

            const producto =  {
                nombre,
                descripcion,
                precio,
                estado_producto,
                color,
                stock,
                descuento,
                idProveedor,
                idCategoria
            };

            // Llama al método de controllerDB pasando los datos del producto
            const productoAñadido = await controllerDB.añadirProducto(nombre, descripcion, precio, estado_producto, color, stock, descuento, idProveedor, idCategoria);
            console.log('en controllerServer' + producto);
            // Devolver una respuesta JSON con el producto añadido
            return productoAñadido;
        } catch (error) {

            console.error('Error al añadir producto:', error);
        }
    }
    
    async function s_eliminarProducto(idProducto) {
        try {
            // Elimina el producto utilizando la clase DBManager
            const producto= await controllerDB.eliminarProducto(idProducto);
            console.log('en controllerServer');
            return 'Producto eliminado exitosamente ' + producto;
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
        }
    }
    
    async function s_descontinuarProducto(idProducto) {
        // Suponiendo que el ID del producto está en el cuerpo de la solicitud
        try {
            // Descontinua el producto en controllerDB
            const producto= await controllerDB.descontinuarProducto(idProducto);
            console.log('en controllerServer');
            return 'Producto descontinuado exitosamente ' + producto;
        } catch (error) {
            console.error('Error al descontinuar el producto:', error);
        }
    }

    async function s_actualizarStockProducto(idProducto, nuevoStock) {
        
            try {
            const productoActualizado = await controllerDB.editarStock(idProducto, nuevoStock);
        
              // Envía el producto actualizado con el nuevo stock como respuesta
                return productoActualizado ;
            } catch (error) {
              // Maneja cualquier error y envía una respuesta de error al cliente
            console.error('Error al descontinuar el producto:', error);
            }
    }
    
    async function s_obtenerProducto(idProducto) { 
        try {
            const producto = await controllerDB.obtenerProductoPorId(idProducto);
            // Verifica si se encontró el producto
            if (!producto) {
                return 'Producto no encontrado';
            }
            // Devuelve el producto encontrado en formato JSON
            return producto;
        } catch (error) {
            console.error('Error al obtener el producto:', error);
        }
    }
    
    async function s_actualizarProducto(idProducto,nombre, descripcion, precio, estado_producto, color, stock, descuento, idProveedor, idCategoria ) {
        try {
            const producto = await controllerDB.actualizarProducto(idProducto,nombre, descripcion, precio, estado_producto, color, stock, descuento, idProveedor, idCategoria);
            return producto + " act producto";
        } catch (error) {
            console.error('Error al actualizar el producto:', error);
        }
    }

    async function actualizarInventario(productosActualizados) {
        try {
            // Llamar al controlador de base de datos para almacenar los cambios
            const productos= await controllerDB.actualizarTodosProductos(productosActualizados);
            return productos;
            // Enviar una respuesta al cliente para confirmar que la actualización se realizó con éxito
            //res.status(200).json({ mensaje: 'Inventario actualizado exitosamente' });
        } catch (error) {
            // Manejar cualquier error que ocurra durante el proceso de actualización
            console.error('Error al actualizar el inventario:', error);
        }
    }
    


    async function añadirProductoCarritoCompras(idUsuario,idproducto, cantidad) {
        try {
            // agregar los productos al carrito con la cantidad especificada
            const carritoActualizado = await controllerDB.añadirProductoCarrito(idUsuario,idproducto, cantidad);
    
            // Devuelve el carrito actualizado como respuesta
            return carritoActualizado;
        } catch (error) {
            console.error('Error al recibir el carrito de compras:', error);
            
        }
    }
    
    async function modificarCantidadProductoCarritoCompras(idUsuario,idproducto, cantidad) {
        try {
            // agregar los productos al carrito con la cantidad especificada
            const carritoActualizado = await controllerDB.modificarCantidadProductoCarrito(idUsuario,idproducto, cantidad);
    
            // Devuelve el carrito actualizado como respuesta
            return carritoActualizado;
        } catch (error) {
            console.error('Error al recibir el carrito de compras:', error);
            
        }
    }

    async function obtenerCarritoCompras(idUsuario) {
        try {
            const carrito = await controllerDB.obtenerCarrito(idUsuario);
    
            // Devuelve el carrito actualizado como respuesta
            return carrito;
        } catch (error) {
            console.error('Error al recibir el carrito de compras:', error);
            
        }
    }

    async function eliminarProductoCarritoCompras(idUsuario,idProducto) {
        try {
            // agregar los productos al carrito con la cantidad especificada
            const carritoActualizado = await controllerDB.eliminarProductoCarrito(idUsuario,idProducto);
    
            // Devuelve el carrito actualizado como respuesta
            return carritoActualizado;
        } catch (error) {
            console.error('Error al recibir el carrito de compras:', error);
            
        }
    }


    async function guardarDireccion(nuevaDireccion) {
        try {
            const direccion = await controllerDB.guardarDireccionEnvio(nuevaDireccion);

            return direccion;
        } catch (error) {
            console.error('Error al guardar direccion:', error);
        }
    }
    

    
    async function obtenerDireccion(idUsuario) {
        try {
            const direccion = await controllerDB.obtenerDireccionPorUsuario(idUsuario);

            return direccion;
        } catch (error) {
            console.error('Error al retornar direccion:', error);
        }
    }
    



module.exports = {
    s_actualizarUsuario,s_eliminarUsuario,s_añadirUsuario,s_añadirEmpresa,guardarDireccion,s_obtenerUsuarioId,s_verificarCredencialUsuario,
    listaDeProductos,manejarInicioSesion,s_actualizarProducto,s_actualizarStockProducto,
    definirDescuento,modificarCantidadProductoCarritoCompras,obtenerCarritoCompras,s_obtenerTodosUsuarios,
    s_añadirProducto,s_eliminarProducto,s_descontinuarProducto,s_obtenerProducto, aplicarDescuento,obtenerDireccion,
    actualizarInventario, añadirProductoCarritoCompras,eliminarProductoCarritoCompras,s_obtenerHistorialCompra
};



