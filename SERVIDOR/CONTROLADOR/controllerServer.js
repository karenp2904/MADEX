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



    // listaDeProductos como una función asíncrona
    async function listaDeProductos(req, res) {
        try {
            const listaProductos = await controllerDB.obtenerTodosLosProductos();
            res.json(listaProductos);
        } catch (error) {
            console.error('Error al obtener los productos:', error);
            res.status(500).send('Error en el servidor');
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
            // Ejemplo:
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
            // Ejemplo:
            const usuarioActualizado = await controllerDB.actualizarUsuario(req.params.id, req.body);
            // res.json(usuarioActualizado);
            res.status(501).send('Función no implementada');
        } catch (error) {
            console.error('Error al actualizar usuario:', error);
            res.status(500).send('Error en el servidor');
        }
    }

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

module.exports = {
    s_actualizarUsuario,autorizarRol,autenticarUsuario,s_eliminarUsuario,s_añadirUsuario,
    listaDeProductos,manejarInicioSesion,manejarRegistro
};



