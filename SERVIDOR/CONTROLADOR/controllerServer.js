// controladorServer.js
const controllerDB = require('./controllerDatabase.js');


    async function manejarInicioSesion(datosSolicitud) {
        // Supongamos que los datosSolicitud contienen un objeto con las credenciales de inicio de sesión
        const { username, password } = datosSolicitud;

        // Realiza la lógica de autenticación utilizando el controlador de la base de datos
        // Por ejemplo, aquí simulamos una búsqueda en una base de datos de usuarios
        const usuarioAutenticado = datosSolicitud;

        if (usuarioAutenticado) {
            // Si el usuario está autenticado, devuelve un mensaje de éxito o el objeto del usuario autenticado
            return { success: true, message: 'Inicio de sesión exitoso', usuario: usuarioAutenticado };
        } else {
            // Si las credenciales son incorrectas o el usuario no existe, devuelve un mensaje de error
            return { success: false, message: 'Credenciales incorrectas' };
        }
    }

    async function manejarRegistro() {
        // Lógica de registro utilizando el controlador de la base de datos
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
                    id: producto.id_producto,
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
            console.log("En server" +productos);
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
            // Implementación para añadir un empresa en la base de datos
    
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

module.exports = {
    s_actualizarUsuario,s_eliminarUsuario,s_añadirUsuario,s_añadirEmpresa,
    listaDeProductos,manejarInicioSesion,manejarRegistro
};



