// controladorServer.js
const {obtenerTodosLosProductos} = require('./controllerDatabase.js');




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

// Simulación de datos de la solicitud de inicio de sesión
const datosSolicitud = { username: 'usuario', password: 'password' };


console.log(manejarInicioSesion(datosSolicitud));

async function manejarRegistro(datosSolicitud) {
    // Lógica de registro utilizando el controlador de la base de datos
}

// Simulación de datos de usuario
const usuarios = [
    { id: 1, username: 'usuario', password: 'password', rol: 'usuario' },
    { id: 2, username: 'admin', password: 'admin123', rol: 'administrador' }
];


// Middleware de autenticación
function autenticarUsuario(req, res, next) {
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
function autorizarRol(rol) {
    return (req, res, next) => {
        if (req.usuario && req.usuario.rol === rol) {
            next();
        } else {
            res.status(403).send('No tienes permiso para acceder a esta ruta');
        }
    };
}

// listaDeProductos como una función asíncrona
async function listaDeProductos(req, res) {
    try {
        const listaProductos = await obtenerTodosLosProductos();
        res.json(listaProductos);
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).send('Error en el servidor');
    }
}


module.exports = {
    manejarInicioSesion,
    manejarRegistro,
    autorizarRol,
    autenticarUsuario,listaDeProductos
};


