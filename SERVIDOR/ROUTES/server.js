const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

const controladorServer = require('../CONTROLADOR/controllerServer');
//MANEJO DE API
const archivos = require('../API/api');
//INVENTARIO -LISTA DE PRODUCTOS
const Inventario = require('../ENTIDADES/inventario'); 
 //  instancia de la clase Inventario



// Middleware para parsear el cuerpo de las solicitudes
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//seguridad de la app
const helmet = require('helmet');
app.use(helmet());


// Iniciar el servidor
app.listen(PORT, async () => {
    try {
        console.log(`Servidor escuchando en el puerto ${PORT}`);
    } catch (error) {
        console.error('Error al iniciar el servidor:', error);
        // Aquí puedes manejar el error de la forma que desees, por ejemplo, finalizar el proceso
        process.exit(1);
    }
});


app.get('/api', (req, res) => {
    res.send('SERVER LISTENING');
});
// Configuración del motor de plantillas EJS - roles
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Ruta para servir archivos estáticos
app.use(express.static(path.join(__dirname, '..', 'cliente')));





// Ruta protegida para usuarios
//app.get('/usuario', controladorServer.autorizarRol('usuario'));

// Ruta protegida para administradores
//app.get('/admin', controladorServer.autorizarRol('administrador'));

// Rutas de inicio de sesión y registro
//app.post('/login', controladorServer.manejarInicioSesion(null));
//app.post('/registro', controladorServer.manejarRegistro);


//obtener todos los productos
 // Recibir productos

//app.get('/productos',controladorServer.listaDeProductos);
// Guardar productos (si la recepción es exitosa)


//manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Error en el servidor');
});


// Rutas para usuarios
//app.post('/usuario/añadir', controladorServer.s_añadirUsuario);
//app.delete('/usuario/eliminar', controladorServer.s_eliminarUsuario);
//app.put('/usuario/actualizar', controladorServer.s_actualizarUsuario);
//app.post('/empresa/añadir', controladorServer.s_añadirEmpresa);

/*
// Rutas para autenticación y autorización
app.post('/usuario/verificar-credencial', controladorServer.verificarCredencialUsuario);
app.get('/usuario/:id', controladorServer.obtenerUsuario);
app.get('/usuarios', controladorServer.obtenerTodosUsuarios);

//Rutas para productos
app.post('/producto/añadir', controladorServer.añadirProducto);
app.post('/producto/eliminar', controladorServer.eliminarProducto);
app.post('/producto/descontinuar', controladorServer.descontinuarProducto);
app.post('/producto/actualizar', controladorServer.actualizarProducto);
app.get('/producto/:id', controladorServer.obtenerProducto);
app.get('/productos', controladorServer.obtenerListaProductos);

// Rutas para inventario
app.post('/inventario/editar-stock', controladorServer.editarStock);
app.post('/inventario/log', controladorServer.logInventario);

// Rutas para facturas
app.post('/facturas/log', controladorServer.logFacturas);

// Rutas para registros de usuarios
app.post('/usuarios/log', controladorServer.logUsuarios);

// Rutas para carrito de compras
app.post('/carrito/añadir-producto', controladorServer.añadirProductosCarrito);
app.post('/carrito/editar', controladorServer.editarCarrito);
*/


// Llamar al método recibirProductos para almacenar los productos
let inventario = new Inventario();

const productosProcesados = new Set();

async function obtenerProductosConInventario(req, res) {
    try {
        // Llama a listaDeProductos para obtener la lista de productos desde la base de datos
        const listaProductos = await controladorServer.listaDeProductos(req, res);

        // Verificar si listaProductos es un array
        if (!Array.isArray(listaProductos)) {
            throw new Error('La lista de productos no es un array');
        }

        // Agregar solo los productos que no han sido procesados previamente
        listaProductos.forEach(producto => {
            if (!productosProcesados.has(producto.id_producto)) {
                inventario.agregarProducto(producto);
                productosProcesados.add(producto.id_producto);
            }
        });
        // Retorna el inventario
        return inventario;
    } catch (error) {
        console.error('Error al obtener los productos y crear el inventario:', error);
        throw error;
    }
}



// Ruta para generar el catálogo
app.get('/generarCatalogo', async function(req, res) {
    try {
        // Obtener el inventario
        inventario = await obtenerProductosConInventario(req, res);
        
        // Enviar el inventario a archivos.recibirProductos
        archivos.recibirProductos(inventario);

        console.log("Productos en inventario:", inventario.productos);
        // Enviar respuesta al cliente
        res.send('Catálogo generado correctamente.');
    } catch (error) {
        // Manejo de errores
        console.error('Error al generar el catálogo:', error);
        res.status(500).send('Error en el servidor');
    }
});


app.get('/obtenerCatalogo', archivos.leerProductos);



// Ruta  para buscar un producto por nombre
app.get('/buscar-producto/:nombre', async (req, res) => {
    const nombreProducto = req.params.nombre;

    try {
        // Realizar la búsqueda del producto en el inventario
        console.log(nombreProducto);
        inventario = await obtenerProductosConInventario(req, res);
        const resultados = await inventario.buscarProducto(nombreProducto);

        // Devolver los resultados como respuesta
        res.json(resultados);
    } catch (error) {
        // Manejar cualquier error que ocurra durante la búsqueda
        console.error('Error en la búsqueda del producto:', error);
        res.status(500).send('Error en la búsqueda del producto');
    }
});

app.get('/filtrarCategoria/:categoria', async (req, res) => {
    const categoriaAbuscar = req.params.categoria;
    console.log('Categoría a buscar:', categoriaAbuscar);

    try {
        const lista = await inventario.productosPorCategoria(categoriaAbuscar);
        console.log('Lista de productos:', lista);

        res.json(lista);
        
    } catch (error) {
        console.error('Error en la búsqueda del producto:', error);
        res.status(500).send('Error en la búsqueda del producto');
    }
});


app.get('/obtenerRutasImagenesPorNombreProducto/:nombre', async (req, res) => {
    const nombre = req.params.nombre; 

    try {
        // Realizar la búsqueda del producto en el inventario
        inventario =  await obtenerProductosConInventario(req, res);
        console.log(nombre);
        const lista = await inventario.obtenerRutasImagenesPorNombreProducto(nombre);

        // Devolver los resultados como respuesta
        res.json(lista);
    } catch (error) {
        // Manejar cualquier error que ocurra durante la búsqueda
        console.error('Error en la búsqueda de la ruta:', error);
        res.status(500).send('Error en la búsqueda de la ruta');
    }
});


//app.get('/leerCotizacion', archivos.observarCambios);

app.get('/presupuestoCotizacion', archivos.calcularCotizacion);



//metodos que han funcionado pero los he renovado - posible copia


/*
async function obtenerProductosConInventario(req, res) {
    try {
        // Llama a listaDeProductos para obtener la lista de productos desde la base de datos
        const listaProductos = await controladorServer.listaDeProductos(req, res);

        // Verificar si listaProductos es un array
        if (!Array.isArray(listaProductos)) {
            throw new Error('La lista de productos no es un array');
        }

        // Agregar los productos al inventario
        listaProductos.forEach(producto => inventario.agregarProducto(producto));


        // Retorna el inventario
        return inventario;
    } catch (error) {
        console.error('Error al obtener los productos y crear el inventario:', error);
        throw error;
    }
}
*/