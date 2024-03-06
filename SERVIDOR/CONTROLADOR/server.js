const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const controllerServer = require('./controllerServer');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear el cuerpo de las solicitudes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//seguridad de la app
const helmet = require('helmet');
app.use(helmet());


// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

// Configuración del motor de plantillas EJS - roles
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware para parsear el cuerpo de las solicitudes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware de autenticación
function autenticarUsuario(req, res, next) {
    const { username, password } = req.body;
    const usuario = usuarios.find(u => u.username === username && u.password === password);
    if (!usuario) {
        return res.status(401).send('Credenciales incorrectas');
    }
    req.usuario = usuario;
    next();
}

// Middleware de autorización
function autorizarRol(rol) {
    return (req, res, next) => {
        if (req.usuario.role === rol) {
            next();
        } else {
            res.status(403).send('No tienes permiso para acceder a esta ruta');
        }
    };
}



// Ruta de inicio de sesión
app.post('/login', autenticarUsuario, (req, res) => {
    res.send('Inicio de sesión exitoso');
});

// Ruta protegida para usuarios
app.get('/usuario', autorizarRol('usuario'), (req, res) => {
    res.render('usuario');
});

// Ruta protegida para administradores
app.get('/admin', autorizarRol('administrador'), (req, res) => {
    res.render('admin');
});

// Rutas de inicio de sesión y registro
app.post('/login', (req, res) => {
    const resultado = controllerServer.manejarInicioSesion(req.body);
    res.json(resultado);
});

app.post('/registro', (req, res) => {
    const resultado = controllerServer.manejarRegistro(req.body);
    res.json(resultado);
});



// Ruta para servir archivos estáticos
app.use(express.static(path.join(__dirname, '..', 'cliente')));


//manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Error en el servidor');
});

 //--autenticacion y roles


// Simulación de datos de usuario
const usuarios = [
    { id: 1, username: 'usuario', password: 'password', role: 'usuario' },
    { id: 2, username: 'admin', password: 'admin123', role: 'administrador' }
];

// Middleware para parsear el cuerpo de las solicitudes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware de autenticación
function autenticarUsuario(req, res, next) {
    const { username, password } = req.body;
    const usuario = usuarios.find(u => u.username === username && u.password === password);
    if (!usuario) {
        return res.status(401).send('Credenciales incorrectas');
    }
    req.usuario = usuario;
    next();
}

// Middleware de autorización
function autorizarRol(rol) {
    return (req, res, next) => {
        if (req.usuario.role === rol) {
            next();
        } else {
            res.status(403).send('No tienes permiso para acceder a esta ruta');
        }
    };
}

// Ruta de inicio de sesión
app.post('/login', autenticarUsuario, (req, res) => {
    res.send('Inicio de sesión exitoso');
});

// Ruta protegida para usuarios
app.get('/usuario', autorizarRol('usuario'), (req, res) => {
    res.send('Bienvenido, usuario');
});

// Ruta protegida para administradores
app.get('/admin', autorizarRol('administrador'), (req, res) => {
    res.send('Bienvenido, administrador');
});

