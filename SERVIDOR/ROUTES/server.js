const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

const {autorizarRol, manejarInicioSesion,manejarRegistro,listaDeProductos,
    autenticarUsuario} = require('../CONTROLADOR/controllerServer');


// Middleware para parsear el cuerpo de las solicitudes
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//seguridad de la app
const helmet = require('helmet');
app.use(helmet());


// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

app.get('/api', (req, res) => {
    res.send('SERVER LISTENING');
});
// Configuración del motor de plantillas EJS - roles
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Ruta para servir archivos estáticos
app.use(express.static(path.join(__dirname, '..', 'cliente')));

// Ruta de inicio de sesión
//app.post('/login', autenticarUsuario)

// Ruta protegida para usuarios
//app.get('/usuario', autorizarRol('usuario'));

// Ruta protegida para administradores
//app.get('/admin', autorizarRol('administrador'));

// Rutas de inicio de sesión y registro
//app.post('/login', manejarInicioSesion(null));
//app.post('/registro', manejarRegistro);


//obtener todos los productos
app.get('/products', (req, res) => listaDeProductos(req, res));


//manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Error en el servidor');
});

