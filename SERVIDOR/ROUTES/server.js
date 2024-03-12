const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

const controladorServer = require('../CONTROLADOR/controllerServer');


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
//app.post('/login', controladorServer.autenticarUsuario)

// Ruta protegida para usuarios
//app.get('/usuario', controladorServer.autorizarRol('usuario'));

// Ruta protegida para administradores
//app.get('/admin', controladorServer.autorizarRol('administrador'));

// Rutas de inicio de sesión y registro
//app.post('/login', controladorServer.manejarInicioSesion(null));
//app.post('/registro', controladorServer.manejarRegistro);


//obtener todos los productos
app.get('/products', (req, res) => controladorServer.listaDeProductos(req, res));


//manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Error en el servidor');
});


// Rutas para usuarios
router.post('/usuario/añadir', controladorServer.s_añadirUsuario);
router.post('/usuario/eliminar', controladorServer.s_eliminarUsuario);
router.post('/usuario/actualizar', controladorServer.s_actualizarUsuario);
//router.post('/empresa/añadir', controladorServer.añadirEmpresa);

/*
// Rutas para autenticación y autorización
router.post('/usuario/verificar-credencial', controladorServer.verificarCredencialUsuario);
router.get('/usuario/:id', controladorServer.obtenerUsuario);
router.get('/usuarios', controladorServer.obtenerTodosUsuarios);

// Rutas para productos
router.post('/producto/añadir', controladorServer.añadirProducto);
router.post('/producto/eliminar', controladorServer.eliminarProducto);
router.post('/producto/descontinuar', controladorServer.descontinuarProducto);
router.post('/producto/actualizar', controladorServer.actualizarProducto);
router.get('/producto/:id', controladorServer.obtenerProducto);
router.get('/productos', controladorServer.obtenerListaProductos);

// Rutas para inventario
router.post('/inventario/editar-stock', controladorServer.editarStock);
router.post('/inventario/log', controladorServer.logInventario);

// Rutas para facturas
router.post('/facturas/log', controladorServer.logFacturas);

// Rutas para registros de usuarios
router.post('/usuarios/log', controladorServer.logUsuarios);

// Rutas para carrito de compras
router.post('/carrito/añadir-producto', controladorServer.añadirProductosCarrito);
router.post('/carrito/editar', controladorServer.editarCarrito);
*/
module.exports = router;
