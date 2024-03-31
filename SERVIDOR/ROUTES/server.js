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
const CarritoDeCompras = require('../ENTIDADES/carritoDeCompra');
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




// Rutas para facturas
app.post('/facturas/log', controladorServer.logFacturas);


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

// Rutas para autenticación y autorización
app.post('/usuario/verificar-credencial', controladorServer.s_verificarCredencialUsuario);
app.get('/usuario/:id', controladorServer.s_obtenerUsuarioId);


//Rutas para productos
app.post('/producto/añadir', controladorServer.s_añadirProducto);
app.delete('/producto/eliminar', controladorServer.s_eliminarProducto);
app.post('/producto/descontinuar', controladorServer.s_descontinuarProducto);
app.post('/producto/actualizar', controladorServer.s_actualizarProducto);
app.get('/producto/:id', controladorServer.s_obtenerProducto);

app.get('/usuario/historialCompra/:id', controladorServer.s_obtenerHistorialCompra);

// Ruta para generar el inventario
app.get('/producto/inventario', async function(req, res) {
    try {
        // Obtener el inventario
        inventario = await obtenerProductosConInventario(req, res);
    
        console.log("Productos en inventario:", inventario.productos);
        // Enviar respuesta al cliente
        res.send(inventario);
    } catch (error) {
        // Manejo de errores
        console.error('Error al generar el catálogo:', error);
        res.status(500).send('Error en el servidor');
    }
});

// Ruta para generar el catálogo
app.get('/producto/catalogo', async function(req, res) {
    try {
        // Obtener el inventario
        inventario = await obtenerProductosConInventario(req, res);

         // llamar al que identifica el rol del usuario

    
        console.log("Productos en inventario:", inventario.productos);
        // Enviar respuesta al cliente
        res.send(inventario);
    } catch (error) {
        // Manejo de errores
        console.error('Error al generar el catálogo:', error);
        res.status(500).send('Error en el servidor');
    }
});

// verifica la cantidad de unidades de stock
app.get('/producto/verificarStock/:idProducto/:cantidad', async function(req, res) {
    try {
        // Obtener los parámetros de la solicitud (ID del producto y cantidad)
        const idProducto = parseInt(req.params.idProducto);
        const cantidad = parseInt(req.params.cantidad);


        console.log(idProducto + " | "+cantidad);

        inventario = await obtenerProductosConInventario(req, res);
        
        // Verificar el stock del producto utilizando el método en el inventario
        const tieneStockSuficiente = inventario.verificarStock(idProducto, cantidad);
        
        // Enviar una respuesta al cliente indicando si hay suficiente stock o no
        res.json(tieneStockSuficiente);
    } catch (error) {
        // Manejar cualquier error que ocurra durante el proceso
        console.error('Error al verificar el stock del producto:', error);
        res.status(500).json({ error: 'Error al verificar el stock del producto' });
    }
});


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
        inventario = await obtenerProductosConInventario(req, res);
        const lista = await inventario.productosPorCategoria(categoriaAbuscar);
        console.log('Lista de productos:', lista);

        res.json(lista);
        
    } catch (error) {
        console.error('Error en la búsqueda del producto:', error);
        res.status(500).send('Error en la búsqueda del producto');
    }
});

app.get('/producto/filtrarColor/:color', async (req, res) => {
    const color = req.params.color;
    console.log('Color a buscar:', color);

    try {
        inventario = await obtenerProductosConInventario(req, res);
        const lista = await inventario.productosPorColor(color);
        console.log('Lista de productos:', lista);

        res.json(lista);
        
    } catch (error) {
        console.error('Error en la búsqueda del producto:', error);
        res.status(500).send('Error en la búsqueda del producto');
    }
});


app.get('/producto/Imagenes/:nombre', async (req, res) => {
    const nombre = req.params.nombre; 

    try {
        // Realizar la búsqueda del producto en el inventario
        inventario =  await obtenerProductosConInventario(req, res);
        console.log(nombre);
        const lista = await inventario.obtenerRutasbase64(nombre);

        // Devolver los resultados como respuesta
        res.json(lista);
    } catch (error) {
        // Manejar cualquier error que ocurra durante la búsqueda
        console.error('Error en la búsqueda de la ruta:', error);
        res.status(500).send('Error en la búsqueda de la ruta');
    }
});


app.get('/producto/rutas/:nombre', async (req, res) => {
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


//ruta agregar un producto al carrito de compra
app.post('/carrito/agregar', (req, res) => {
    
    const { producto, cantidad } = req.body;

    // Llamar al controlador para agregar el producto al carrito con la cantidad especificada
    controladorServer.añadirProductoCarritoCompras(producto, cantidad);

    res.send('Producto agregado al carrito');
});


// Ruta para modificar la cantidad de un producto en el carrito
app.put('/carrito/modificarCantidad/:idProducto', (req, res) => {
    try {
        // Obtener el ID del producto y la nueva cantidad 
        const idProducto = parseInt(req.params.idProducto);
        const nuevaCantidad = parseInt(req.body.nuevaCantidad);

        controladorServer.modificarCantidadProductoCarritoCompras(idProducto, nuevaCantidad);

        res.send('Cantidad de producto en el carrito modificada');
    } catch (error) {
        console.error('Error al modificar la cantidad del producto en el carrito:', error);
        res.status(500).send('Error en el servidor');
    }
});


// Ruta para ver el contenido del carrito
app.get('/carrito/:idUsuario', async (req, res) => {
    try {
        // Obtener el ID del usuario de la solicitud
        const idUsuario = req.params.idUsuario;

        const contenidoCarrito = await controladorServer.obtenerCarritoCompras(idUsuario);

        // Enviar el contenido del carrito como respuesta
        res.json(contenidoCarrito);
    } catch (error) {
        console.error('Error al obtener el contenido del carrito de compras:', error);
        res.status(500).send('Error en el servidor');
    }
});



// Ruta para eliminar un producto del carrito
app.delete('/carrito/:idProducto', (req, res) => {
    const idProducto = req.params.idProducto;

    controladorServer.eliminarProductoCarritoCompras(idProducto);

    res.send(`Producto con ID ${idProducto} eliminado del carrito`);
});


// Ruta para añadir una dirección
app.post('/direccion', async (req, res) => {
    try {
        
        const { ID_Usuario, Calle, Ciudad, Codigo_Postal, departamento, barrio, descripcion } = req.body;

        // Crear una instancia de la dirección utilizando los datos recibidos
        const nuevaDireccion = new Direccion ({
            ID_Usuario,
            Calle,
            Ciudad,
            Codigo_Postal,
            departamento,
            barrio,
            descripcion
        });

        const direccionGuardada = await controladorServer.guardarDireccion(nuevaDireccion);

        res.status(201).json(direccionGuardada);
    } catch (error) {
        // Manejar cualquier error que ocurra durante el proceso
        console.error('Error al añadir la dirección:', error);
        res.status(500).send('Error en el servidor');
    }
});

// Ruta para agregar una factura
app.post('/factura/', async (req, res) => {
    try {
        const { idUsuario, productos, total } = req.body;

        const contenidoCarrito = await controladorServer.obtenerCarritoCompras(idUsuario);

        const carrito= new CarritoDeCompras(contenidoCarrito);


        res.status(201).json(facturaCreada);
    } catch (error) {
        // envía una respuesta de error al cliente
        console.error('Error al crear la factura:', error);
        res.status(500).send('Error en el servidor');
    }
});







//API >---------------------------------------------------------------------------------------

//app.get('/leerCotizacion', archivos.observarCambios);

let productosCache = null;

// Ruta para generar el catálogo
app.get('/Alianza/generarCatalogo', async function(req, res) {
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

app.get('/Alianza/obtenerCatalogo', async function (req, res) {
    try {
        // Obtener el inventario
        inventario = await obtenerProductosConInventario(req, res);

        inventario.actualizarDescuentoTodosProductos(controladorServer.definirDescuento(3));
        
        // Enviar el inventario a archivos.recibirProductos
        archivos.recibirProductos(inventario);

        // Verificar si la caché está vacía
        if (!productosCache) {
            // La caché está vacía, leer productos del archivo
            productosCache = await archivos.leerProductos();
            console.log("Productos para alianza (leídos del archivo):", productosCache);
        } else {
            console.log("Productos para alianza (leídos de la caché):", productosCache);
        }

        // Enviar respuesta al cliente
        res.send(productosCache);
    } catch (error) {
        // Manejo de errores
        console.error('Error al obtener el catálogo:', error);
        res.status(500).send('Error en el servidor');
    }
});

app.get('/Alianza/presupuestoCotizacion', async (req, res) => {
    try {
        const costo = await archivos.calcularCotizacion();

        // Devolver los resultados como respuesta
        res.json(costo);
    } catch (error) {
        // Manejar cualquier error que ocurra durante la búsqueda
        console.error('Error en la búsqueda de la ruta:', error);
        res.status(500).send('Error en la búsqueda de la ruta');
    }
});

app.get('/Alianza/respuesta', async (req, res) => {
    try {

        const respuesta = await archivos.guardarRespuesta();
        // Devolver los resultados como respuesta
        res.json(respuesta);
    } catch (error) {
        // Manejar cualquier error que ocurra durante la búsqueda
        console.error('Error en la búsqueda de la ruta:', error);
        res.status(500).send('Error en la búsqueda de la ruta');
    }
});


app.get('/Alianza/actualizarInventario', async (req, res) => {
    try {

        inventario = await archivos.actualizarInventario();

        controladorServer.actualizarInventario(inventario);

        res.json(inventario);
    } catch (error) {
        // Manejar cualquier error que ocurra durante la búsqueda
        console.error('Error en la búsqueda de la ruta:', error);
        res.status(500).send('Error en la búsqueda de la ruta');
    }
});


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