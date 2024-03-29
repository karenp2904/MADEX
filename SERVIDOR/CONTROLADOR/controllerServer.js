// controladorServer.js
const Usuario = require('../ENTIDADES/usuario.js');
const controllerDB = require('./controllerDatabase.js');
const CarritoDeCompras = require('../ENTIDADES/carritoDeCompra.js');


async function manejarInicioSesion(datosSolicitud) {
    try {
        const { email, password } = datosSolicitud;

        // Verificar las credenciales del usuario
        const usuarioAutenticado = await s_verificarCredencialUsuario(email, password);

        if (usuarioAutenticado) {
            // Si las credenciales son correctas, devuelve un mensaje de éxito y el objeto del usuario autenticado
            return { success: true, message: 'Inicio de sesión exitoso', usuario: usuarioAutenticado };
        } else {
            // Si las credenciales son incorrectas o el usuario no existe, devuelve un mensaje de error
            return { success: false, message: 'Credenciales incorrectas' };
        }
    } catch (error) {
        console.error('Error al manejar el inicio de sesión:', error);
        throw error;
    }
}

    async function manejarRegistro(req,res) {
        // Lógica de registro utilizando el controlador de la base de datos
        s_añadirUsuario(req,res);
    }

/*

    // listaDeProductos como una función asíncrona
    async function listaDeProductos(req, res) {
        try {
            const listaProductos = await controllerDB.obtenerTodosLosProductos();
            if (!listaProductos || listaProductos.length === 0) {
                // Si no se encontraron productos, devuelve una respuesta 404
                return res.status(404).json({ message: 'No se encontraron productos' });
            }
            // Si se encontraron productos, devuelve una respuesta JSON con la lista de productos
            //console.log(LlistaProductos);
            res.json(listaProductos);
        } catch (error) {
            console.error('Error al obtener los productos:', error);
            res.status(500).send('Error en el servidor');
        }
    }
    */

    
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
                    proveedor: producto.proveedor,
                    idCategoria: producto.categoria_idcategoria,
                    categoria: producto.categoria
                };
            });
    
            // Devuelve el array de objetos "producto"
            console.log("En server" + productos);
            return productos;
        } catch (error) {
            console.error('Error al obtener los productos:', error);
            res.status(500).send('Error en el servidor');
            throw error;
        }
    }
    
    
    
    
    async function s_añadirUsuario(req, res) {
        try {
            // Implementación para añadir un usuario en la base de datos
            const usuario = await controllerDB.añadirUsuario(req, res); // Llama al método añadirUsuario de controllerDB
            res.status(201).json(usuario); // Devuelve una respuesta JSON con el usuario añadido
        } catch (error) {
            console.error('Error al añadir usuario:', error);
            res.status(500).send('Error en el servidor');
        }
    }
    


    async function s_eliminarUsuario(req, res) {
        try {
            // Implementación para eliminar un usuario en la base de datos
            await controllerDB.eliminarUsuario();
            res.status(501).send('Función no implementada');
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
            res.status(500).send('Error en el servidor');
        }
    }

    async function s_actualizarUsuario(req, res) {
        try {
            // Implementación para actualizar un usuario en la base de datos
        
            const usuarioActualizado = await controllerDB.actualizarUsuario(req.params.id, req.body);
            // res.json(usuarioActualizado);
            res.status(501).send('Función no implementada');
        } catch (error) {
            console.error('Error al actualizar usuario:', error);
            res.status(500).send('Error en el servidor');
        }
    }

    async function s_añadirEmpresa(req, res) {
        try {
            // añadir un empresa en la base de datos
            const empresa =await controllerDB.añadirEmpresa(null);
            res.status(201).json(null); // Devuelve una respuesta JSON con el usuario añadido
        } catch (error) {
            console.error('Error al añadir usuario:', error);
            res.status(500).send('Error en el servidor');
        }
    }
/*
    // Middleware de autenticación
    const autenticarUsuario= (req, res, next)=> {
        const { username, password } = req.body;
        const usuario = usuarios.find(u => u.username === username && u.password === password);
        //de prueba
        if (!usuario) {
            return res.status(401).send('Credenciales incorrectas');
        }else{
            res.send(usuario);
        }
        req.usuario = usuario;
        next();
    }

    // Middleware de autorización
    const autorizarRol= (rol)=>{
        return (req, res, next) => {
            if (req.usuario && req.usuario.rol === rol) {
                next();
            } else {
                res.status(403).send('No tienes permiso para acceder a esta ruta');
            }
        };
    }
*/



    async function s_verificarCredencialUsuario(req, res) {
        const { correo, contraseña } = req.body;
        try {
            const usuarios = await s_obtenerTodosUsuarios();
            const usuario = usuarios.find(u => u.correo === correo && u.contraseña === contraseña);
            if (!usuario) {
                return res.status(401).send('Credenciales incorrectas');
            } else {
                req.usuario = usuario;
                await s_comprobarRol(req, res);
            }
        } catch (error) {
            console.error('Error al verificar las credenciales del usuario:', error);
            res.status(500).send('Error al verificar las credenciales del usuario');
        }
    }

    async function s_comprobarRol(req, res) {
        const usuario = req.usuario;
        if (usuario.idRol === 1) {
            console.log('El usuario es un administrador');
            res.json(usuario);
        } else if (usuario.idRol === 2) {
            // El usuario es un cliente
            res.json(usuario);
            console.log('El usuario es un cliente');
        } else if(usuario.idRol === 3){
            console.log('El usuario es un empresa');
        }else{
            // El usuario tiene un rol desconocido
            res.json(usuario);
            console.log('El usuario tiene un rol desconocido');
            res.status(403).send('Rol de usuario desconocido');
        }
    }



    async function s_obtenerUsuarioId(req, res) {
        const usuarioId = req.params.id; // Suponiendo que el ID del usuario está en los parámetros de la solicitud
        try {
            // Busca el usuario por su ID en la base de datos
            const usuario = await controllerDB.obtenerUsuario(usuarioId);
            // Verifica si se encontró el usuario
            if (!usuario) {
                return res.status(404).send('Usuario no encontrado');
            }
            // Devuelve el usuario encontrado en formato JSON
            res.status(200).json(usuario);
        } catch (error) {
            console.error('Error al buscar Usuario por ID:', error);
            res.status(500).send('Error en el servidor');
        }
    }


    async function s_obtenerTodosUsuarios(){
        try {
            const listaUsuarios = await controllerDB.obtenerTodosUsuarios();
            
            // Verifica si se obtuvieron usuarios
            if (!Array.isArray(listaUsuarios)) {
                throw new Error('El servicio db_obtenerTodosLosProductos no devolvió una lista de productos.');
            }
            // Mapea los productos para convertirlos en objetos "producto"
            const usuarios = listaUsuarios.map( usuario => {
                return {
                    id_usuario: usuario.id_usuario,
                    nombre_usuario: usuario.nombre_usuario,
                    apellido_usuario: usuario.apellido_usuario,
                    correo : usuario.correo,
                    tipo_documento : usuario.tipo_documento,
                    contraseña : usuario.contraseña,
                    telefono : usuario.telefono,
                    idRol: usuario.idRol
                };
            });
    
            // Devuelve el array de objetos "usuario"
            console.log("En server" +usuarios);
            return usuario;
        } catch (error) {
            console.error('Error al obtener los usuarios:', error);
            res.status(500).send('Error en el servidor');
            throw error;
        }

    }

    async function s_añadirProducto(req, res) {
        try {
            const { nombre, descripcion, precio, estado_producto, color, stock, descuento, Proveedores_id_Proveedores, Categoria_idCategoria } = req.body;
            
            const productoData = {
                nombre,
                descripcion,
                precio,
                estado_producto,
                color,
                stock,
                descuento,
                Proveedores_id_Proveedores,
                Categoria_idCategoria
            };
    
            // Llama al método de controllerDB pasando los datos del producto
            const producto = await controllerDB.añadirProducto(productoData);

            // Devolver una respuesta JSON con el producto añadido
            res.status(201).json(productoAñadido);
        } catch (error) {

            console.error('Error al añadir producto:', error);
            res.status(500).send('Error en el servidor');
        }
    }
    
    async function s_eliminarProducto(req, res) {
        const { idProducto } = req.body; // Suponiendo que el ID del producto está en el cuerpo de la solicitud
        try {
            // Elimina el producto utilizando la clase DBManager
            await controllerDB.eliminarProducto(idProducto);
    
            res.status(200).send('Producto eliminado exitosamente');
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
            res.status(500).send('Error en el servidor');
        }
    }
    
    async function s_descontinuarProducto(req, res) {
        const { idProducto } = req.body; // Suponiendo que el ID del producto está en el cuerpo de la solicitud
        try {
            // Descontinua el producto en controllerDB
            await controllerDB.descontinuarProducto(idProducto);
    
            res.status(200).send('Producto descontinuado exitosamente');
        } catch (error) {
            console.error('Error al descontinuar el producto:', error);
            res.status(500).send('Error en el servidor');
        }
    }

    async function s_actualizarStockProducto(req, res) {
            const { idProducto } = req.body; 
            try {
            
            const { nuevoStock } = req.body;
    
            const productoActualizado = await controllerDB.editarStock(idProducto, nuevoStock);
        
              // Envía el producto actualizado con el nuevo stock como respuesta
            res.status(200).json({ producto: productoActualizado });
            } catch (error) {
              // Maneja cualquier error y envía una respuesta de error al cliente
            console.error('Error al descontinuar el producto:', error);
            res.status(500).send('Error en el servidor');
            }
    }
        
    
    async function s_actualizarProducto(req, res) {
        const { idProducto, nuevosDatos } = req.body; // se proporcionan el ID del producto y los nuevos datos en el cuerpo de la solicitud
        try {
            await controllerDB.actualizarProducto(idProducto, nuevosDatos);
    
            res.status(200).send('Producto actualizado exitosamente');
        } catch (error) {
            console.error('Error al actualizar el producto:', error);
            res.status(500).send('Error en el servidor');
        }
    }


    async function s_editarStock(req, res) {
        try {
            const { idProducto, stock } = req.body;
          // Llama al controlador para editar el stock del producto y obtiene el producto actualizado
            const productoActualizado = await controllerDB.editarStock(idProducto, stock);
            
          // Envía el producto actualizado con el nuevo stock como respuesta
            res.status(200).json({ producto: productoActualizado });
        } catch (error) {
          // Maneja cualquier error y envía una respuesta de error al cliente
            console.error('Error al descontinuar el producto:', error);
            res.status(500).send('Error en el servidor');
        }
    }

    async function actualizarInventario(req, res) {
        try {
            
            const { productosActualizados } = req.body;
    
            // Llamar al controlador de base de datos para almacenar los cambios
            await controllerDB.actualizarTodosProductos(productosActualizados);
    
            // Enviar una respuesta al cliente para confirmar que la actualización se realizó con éxito
            res.status(200).json({ mensaje: 'Inventario actualizado exitosamente' });
        } catch (error) {
            // Manejar cualquier error que ocurra durante el proceso de actualización
            console.error('Error al actualizar el inventario:', error);
            res.status(500).json({ error: 'Error al actualizar el inventario' });
        }
    }
    

    
    async function s_obtenerProducto(req, res) {
        const { idProducto } = req.body; // ID del producto está en el cuerpo de la solicitud
        try {
            const producto = await controllerDB.obtenerProducto(idProducto);
            // Verifica si se encontró el producto
            if (!producto) {
                return res.status(404).send('Producto no encontrado');
            }
            // Devuelve el producto encontrado en formato JSON
            res.status(200).json(producto);
        } catch (error) {
            console.error('Error al obtener el producto:', error);
            res.status(500).send('Error en el servidor');
        }
    }

    async function recibirCarritoDeCompras(req, res) {
        try {
            const { carrito } = req.body; 
    
            // Llama al método de controllerDB para agregar los productos al carrito
            const carritoActualizado = await controllerDB.añadirProductosCarrito(carrito);
    
            // Devuelve el carrito actualizado como respuesta
            res.status(200).json(carritoActualizado);
        } catch (error) {
            console.error('Error al recibir el carrito de compras:', error);
            res.status(500).send('Error en el servidor');
        }
    }

    async function editarCarritoDeCompras(req, res) {
        try {
            const { operacion, idProducto, cantidad } = req.body; 
    
            const carrito = new CarritoDeCompras();
    
            
            switch (operacion) {
                case 'agregarProducto':
                    carrito.agregarProducto(idProducto, cantidad);
                    break;
                case 'eliminar':
                    carrito.eliminarProducto(idProducto);
                    break;
                case 'actualizarCantidad':
                    carrito.actualizarCantidad(idProducto, cantidad);
                    break;
                case 'disminuirCantidad':
                carrito.disminuirCantidad(idProducto, cantidad);
                break;
                default:
                    return res.status(400).send('Operación no válida');
            }

            const carritoActualizado = await controllerDB.editarCarrito(carrito);
    
            // Devolver una respuesta exitosa
            res.status(200).send('Carrito actualizado correctamente');
        } catch (error) {
            console.error('Error al editar el carrito de compras:', error);
            res.status(500).send('Error en el servidor');
        }
    }
    
    
    



module.exports = {
    s_actualizarUsuario,s_eliminarUsuario,s_añadirUsuario,s_añadirEmpresa,
    listaDeProductos,manejarInicioSesion,manejarRegistro,s_actualizarProducto,s_editarStock,editarCarritoDeCompras,
    s_añadirProducto,s_eliminarProducto,s_descontinuarProducto,s_obtenerProducto, recibirCarritoDeCompras,actualizarInventario
};



