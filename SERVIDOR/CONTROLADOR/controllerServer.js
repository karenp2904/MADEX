// controladorServer.js

const controllerDatabase = require('./controllerDatabase');

function manejarInicioSesion(datosSolicitud) {
    // Lógica de autenticación utilizando el controlador de la base de datos
    
    return controllerDatabase.autenticarUsuario(datosSolicitud);
}

function manejarRegistro(datosSolicitud) {
    // Lógica de registro utilizando el controlador de la base de datos
    return controllerDatabase.registrarUsuario(datosSolicitud);
}





module.exports = {
    manejarInicioSesion,
    manejarRegistro
};


