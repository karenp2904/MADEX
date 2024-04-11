const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 3000;

const controladorServer = require('../CONTROLADOR/controllerServer');
//MANEJO DE API
const archivos = require('../API/api');
//INVENTARIO -LISTA DE PRODUCTOS
const Inventario = require('../ENTIDADES/inventario'); 
const Direccion = require('../ENTIDADES/direccion'); 
const Usuario = require('../ENTIDADES/usuario'); 
const carritoDeCompra = require('../ENTIDADES/carritoDeCompra'); 
const Factura = require('../ENTIDADES/factura'); 
const producto = require('../ENTIDADES/producto');
const pdf = require('../ENTIDADES/pdf'); 
 //  instancia de la clase Inventario



// Middleware para parsear el cuerpo de las solicitudes
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//seguridad de la app
const helmet = require('helmet');

app.use(helmet());

app.use(cors());

// Configurar middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'ruta/a/tu/carpeta/build')));

// Middleware para permitir solicitudes CORS (si es necesario)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5174'); // Cambia a la URL de tu aplicación React
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173'); // Cambia a la URL de tu aplicación Reac
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });


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

//Rutas usuario
app.post('/usuario/registro', async function(req, res) {
    try {

        const {nombre_usuario, apellido_usuario, tipo_documento,idUsuario,telefono,correo, idRol,password } = req.body;
        //console.log('EN SERVER' + nombre_usuario+ apellido_usuario+ tipo_documento+idUsuario+telefono+correo+ idRol+ password);
        console.log('contraseña server' + password);
        
        const usuario= await controladorServer.s_añadirUsuario( idUsuario, nombre_usuario, apellido_usuario, correo,  password, tipo_documento,telefono, idRol);

        //const usuario = await controladorServer.s_añadirUsuario(id_usuario, nombre_usuario, apellido_usuario, correo, tipo_documento, contraseña, telefono, idRol);
        // Enviar respuesta al cliente
        res.status(200).json({message: 'Usuario agregado '+ usuario});
    } catch (error) {
        // Manejo de errores
        console.error('Error al al registro de usuario:', error);
        res.status(500).send('Error en el servidor');
    }
});


// Rutas para autenticación y autorización del inicio de sesión
app.post('/usuario/login', async function(req, res) {
    try {
        const {correo,contraseña} = req.body;
    
        console.log(correo + " - " + contraseña );
        
        const usuario= await controladorServer.manejarInicioSesion(correo,contraseña);        // Enviar respuesta al cliente
        console.log(usuario);
        res.status(200).json(usuario);
    } catch (error) {
        // Manejo de errores
        console.error('Error al iniciar sesion usuario:', error);
        res.status(500).send('Error en el servidor');
    }
});

 // Obtener los datos del cuerpo de la solicitud
app.delete('/usuario/eliminar', async function(req, res) {
    try {
        const { id_usuario } = req.body; 

        const usuario= await controladorServer.s_eliminarUsuario(id_usuario);
    
        console.log(id_usuario);
        //const usuario = await controladorServer.s_añadirUsuario(id_usuario, nombre_usuario, apellido_usuario, correo, tipo_documento, contraseña, telefono, idRol);
        // Enviar respuesta al cliente
        res.status(200).json({ success: true, message: 'Usuario eliminado correctamente', usuario });
    } catch (error) {
        // Manejo de errores
        console.error('Error al eliminar usuario:', error);
        res.status(500).send('Error en el servidor');
    }
});

app.post('/usuario/actualizar', async function(req, res) {
    try {
        const {nombre_usuario, apellido_usuario, tipo_documento,idUsuario,telefono,correo, idRol,password } = req.body;
    
        console.log(nombre_usuario);

        const usuario= await controladorServer.s_actualizarUsuario(idUsuario, nombre_usuario, apellido_usuario, correo, tipo_documento, password, telefono, idRol);

        //const usuario = await controladorServer.s_añadirUsuario(id_usuario, nombre_usuario, apellido_usuario, correo, tipo_documento, contraseña, telefono, idRol);
        // Enviar respuesta al cliente
        res.status(200).json({ success: true, message: 'Usuario actualizado correctamente', usuario });
    } catch (error) {
        // Manejo de errores
        console.error('Error al actualizar usuario:', error);
        res.status(500).send('Error en el servidor');
    }
});

app.post('/empresa/registro', async function(req, res) {
    try {
        const { idUsuario, nombre, apellido, correo, tipo_documento, contraseña, telefono, idRol, nitEmpresa, nombreEmpresa, razonSocial, cargo, rubro} = req.body;
    
        console.log(nombre);
        const usuario = await controladorServer.s_añadirEmpresa(idUsuario, nombre, apellido, correo, contraseña, tipo_documento, telefono, idRol, nitEmpresa, nombreEmpresa, razonSocial, cargo, rubro);
        // Enviar respuesta al cliente
        res.status(200).json({ success: true, usuario });
    } catch (error) {
        // Manejo de errores
        console.error('Error al añadir empresa:', error);
        res.status(500).send('Error en el servidor');
    }
});


app.get('/usuario/obtenerPorId', async function(req, res) {
    try {
        const { id_usuario } = req.body; // Obtén el ID del usuario del cuerpo de la solicitud
        console.log(id_usuario); //
        const usuario = await controladorServer.s_obtenerUsuarioId(id_usuario);

        res.json(usuario);
    } catch (error) {
        console.error('Error al buscar Usuario por ID:', error);
        res.status(500).send('Error en el servidor');
    }
});


app.get('/usuario/lista', async function(req, res) {
    try {
        const usuarios = await controladorServer.s_obtenerTodosUsuarios();
        // Devuelve el usuario encontrado en formato JSON
        res.json(usuarios);
    } catch (error) {
        console.error('Error Usuarios :', error);
        res.status(500).send('Error en el servidor');
    }
});


//Rutas para productos
app.post('/producto/agregar', async function(req, res) {
    try {
        const { nombre, descripcion, precio, estado_producto, color, stock, descuento, idProveedor, idCategoria } = req.body;
        
        const producto= await controladorServer.s_añadirProducto( nombre, descripcion, precio, estado_producto, color, stock, descuento, idProveedor, idCategoria );
        console.log(nombre + " " + descripcion );

        res.status(200).json({success: true, message: 'Producto añadido correctamente', producto});
    } catch (error) {
        console.error('Error al añadir producto:', error);
        res.status(500).send('Error en el servidor');
    }
});

app.delete('/producto/eliminar', async function(req, res) {
    try {
        const { idProducto } = req.body; // Suponiendo que el ID del producto está en el cuerpo de la solicitud

        // Elimina el producto utilizando la clase DBManager
        producto=await controladorServer.s_eliminarProducto(idProducto);

        res.status(200).send('Producto eliminado exitosamente');
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        res.status(500).send('Error en el servidor');
    }
});

app.post('/producto/descontinuar', async function(req, res) {
    try {
        const { idProducto } = req.body;
        producto=await controladorServer.s_descontinuarProducto(idProducto);

        res.status(200).send('Producto descontinuado exitosamente');
    } catch (error) {
        console.error('Error al buscar Usuario por ID:', error);
        res.status(500).send('Error en el servidor');
    }
});

app.post('/producto/actualizarStock', async function(req, res) {
    try {
        const { idProducto, nuevoStock} = req.body; 
        console.log(idProducto, nuevoStock);
        const respuesta = await controladorServer.s_actualizarStockProducto(idProducto, nuevoStock);
        // Devuelve el usuario encontrado en formato JSON
        res.status(201).json({respuesta });
    } catch (error) {
        console.error('Error al buscar Usuario por ID:', error);
        res.status(500).send('Error en el servidor');
    }
});

app.get('/producto/obtenerProducto', async function(req, res) {
    try {
        const { idProducto } = req.body; // ID del producto está en el cuerpo de la solicitud
        const producto = await controladorServer.s_obtenerProducto(idProducto);
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
});

app.post('/producto/actualizar', async function(req, res) {
    try {
        const {idProducto, nombre, descripcion, precio, estado_producto, color, stock, descuento, idProveedor, idCategoria } = req.body;
        const producto = await controladorServer.s_actualizarProducto(idProducto,nombre, descripcion, precio, estado_producto, color, stock, descuento, idProveedor, idCategoria );
        // Devuelve el usuario encontrado en formato JSON
        res.status(201).json({producto });
    } catch (error) {
        console.error('Error al buscar Usuario por ID:', error);
        res.status(500).send('Error en el servidor');
    }
});



app.get('/usuario/historialCompra', async function(req, res) {
    try {
        const { id_usuario} = req.body; 
        const lista = await controladorServer.s_obtenerHistorialCompra(id_usuario);
        res.json(lista);
    } catch (error) {
        console.error('Error al buscar Usuario por ID:', error);
        res.status(500).send('Error en el servidor');
    }
});

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
app.get('/producto/verificarStock', async function(req, res) {
    try {

        const { idProducto, cantidad} = req.body; 
        // Obtener los parámetros de la solicitud (ID del producto y cantidad)


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

app.get('/filtrarCategoria', async (req, res) => {
    try {
        const { categoria } = req.body; // Obtener la categoría de los parámetros de consulta

        console.log('Categoría a buscar:', categoria);
        const inventario = await obtenerProductosConInventario(req, res);
        
        // Filtrar productos por categoría
        const listaId = await inventario.buscarProductosPorCategoria(categoria);

        console.log('Lista de productos:', listaId);

        res.json(listaId);
        
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

app.get('/producto/CatalogoImagenes', async (req, res) => {
    try {
        // Realizar la búsqueda del inventario de productos
        inventario = await obtenerProductosConInventario(req, res);
        
        // Crear un arreglo para almacenar todas las imágenes de productos
        const listaTotal = [];

        // Iterar sobre cada producto en el inventario
        for (const producto of inventario.productos) {
            // Obtener el nombre del producto
            const nombreProducto = producto.nombre;

            // Obtener la lista de imágenes base64 para el producto actual
            const listaImagenes = await inventario.obtenerUnaImagenbase64(nombreProducto);

            // Agregar la lista de imágenes al arreglo total
            listaTotal.push({
                producto: nombreProducto,
                imagenes: listaImagenes
            });
        }

        // Devolver el arreglo total de imágenes para todos los productos en el inventario
        res.json(listaTotal);
    } catch (error) {
        // Manejar cualquier error que ocurra durante la búsqueda
        console.error('Error en la búsqueda de la ruta:', error);
        res.status(500).send('Error en la búsqueda de la ruta');
    }
});




app.get('/producto/rutas/:nombre', async (req, res) => {
   

    try {
        const nombre = req.params.nombre; 
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


//ruta agregar un producto al carrito de compra
app.post('/carrito/agregar', async (req, res) => {
    try {
        const { idUsuario,idproducto, cantidad } = req.body;

        // Llamar al controlador para agregar el producto al carrito con la cantidad especificada
        const carrito=await controladorServer.añadirProductoCarritoCompras(idUsuario,idproducto, cantidad);

        res.status(201).json(carrito);
    } catch (error) {
        // Manejar cualquier error que ocurra durante la búsqueda
        console.error('Error en agregar producto al carrito:', error);
        res.status(500).send('Error en server');
    }
    
});


// Ruta para modificar la cantidad de un producto en el carrito
app.put('/carrito/modificarCantidad',async (req, res) => {
    try {
        const { idUsuario,idproducto, cantidad } = req.body;
        const accion= await controladorServer.modificarCantidadProductoCarritoCompras( idUsuario,idproducto, cantidad);
        res.status(201).json('Cantidad de producto en el carrito modificada' + accion);
      //  res.send('Cantidad de producto en el carrito modificada');
    } catch (error) {
        console.error('Error al modificar la cantidad del producto en el carrito:', error);
        res.status(500).send('Error en el servidor');
    }
});


// Ruta para ver el contenido del carrito y saber el subtotal
app.get('/carrito/contenido', async (req, res) => {
    try {
        // Obtener el ID del usuario de la solicitud
        const { idUsuario } = req.body;
        let contenidoCarrito = new carritoDeCompra();
        contenidoCarrito=await controladorServer.obtenerCarritoCompras(idUsuario);

       // const subtotal= contenidoCarrito.calcularTotal();

        // Enviar el contenido del carrito como respuesta
        res.json({carritoCompras:contenidoCarrito , subtotal:100});
    } catch (error) {
        console.error('Error al obtener el contenido del carrito de compras:', error);
        res.status(500).send('Error en el servidor');
    }
});



// Ruta para eliminar un producto del carrito
app.delete('/carrito/eliminar', async (req, res) => {
    try {
        const { idUsuario,idProducto } = req.body;

        const eliminado = await controladorServer.eliminarProductoCarritoCompras(idUsuario,idProducto);

        res.status(201).json(`Producto con ID  ${idProducto} eliminado del carrito ` + eliminado);
    } catch (error) {
        // Manejar cualquier error que ocurra durante el proceso
        console.error('Error al eliminar producto: ', error);
        res.status(500).send('Error en el servidor');
    }
});


// Ruta para añadir una dirección
app.post('/direccion/agregar', async (req, res) => {
    try {
        
        const { ID_Usuario,Calle,Ciudad,Codigo_Postal,departamento,barrio,descripcion } = req.body;

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

        const direccionGuardada = await controladorServer.guardarDireccion(ID_Usuario,Calle,Ciudad,Codigo_Postal,departamento,barrio,descripcion);

        res.status(201).json(direccionGuardada);
    } catch (error) {
        // Manejar cualquier error que ocurra durante el proceso
        console.error('Error al añadir la dirección:', error);
        res.status(500).send('Error en el servidor');
    }
});

app.get('/direccion/obtener', async (req, res) => {
    try {
        const { ID_Usuario } = req.body;

        const direccionGuardada = await controladorServer.obtenerDireccion(ID_Usuario);

        res.status(201).json(direccionGuardada);
    } catch (error) {
        // Manejar cualquier error que ocurra durante el proceso
        console.error('Error al añadir la dirección:', error);
        res.status(500).send('Error en el servidor');
    }
});

// Ruta para obtener el resumen de la compra
app.get('/resumenCompra', async (req, res) => {
    try {
        // Obtener el ID del usuario de la solicitud
        const { idUsuario} = req.body;

        const direccionGuardada = await controladorServer.obtenerDireccion(idUsuario);
        
        const costoEnvio= direccionGuardada.calcularCostoEnvio();
        const fecha= direccionGuardada.calcularFechaEstimadaEntrega();

        const productos = await controladorServer.obtenerCarritoCompras(idUsuario);

        const contenidoCarrito = new carritoDeCompra();


        productos.forEach(item => {
            console.log("Item del carrito:", item);
            if (Array.isArray(item.producto)) {
                item.producto.forEach(producto => {
                    contenidoCarrito.agregarProducto(producto,item.cantidad);
                });
            }
        });
        const subtotal= contenidoCarrito.calcularTotal();

        const total= costoEnvio+subtotal;


        res.json({carrito: contenidoCarrito,direccion: direccionGuardada,
            subTotal:subtotal,costoEnvio:costoEnvio, fecha:fecha, total:total});

    } catch (error) {
        // Manejar cualquier error que ocurra durante el proceso
        console.error('Error al obtener el resumen:', error);
        res.status(500).send('Error en el servidor');
    }
});


// Ruta para agregar una factura
app.post('/factura/agregar', async (req, res) => {
    try {
        const { idUsuario, idMetodoDePago} = req.body;

        const direccionGuardada = await controladorServer.obtenerDireccion(idUsuario);
        console.log(direccionGuardada);

        const direccion = direccionGuardada[0];
    
        // Accede a la propiedad `id_direccion`
        const idDireccion = direccion.id_direccion;
        console.log(idDireccion);

        //PARA LOS ID_PRODUCTO DE ARRAY
        const productos = await controladorServer.obtenerCarritoCompras(idUsuario);

        const contenidoCarrito = new carritoDeCompra();

    
        let idProductos = [];

        productos.forEach(item => {
            console.log("Item del carrito:", item);
            if (Array.isArray(item.producto)) {
                item.producto.forEach(producto => {
                    if (producto && producto.id_producto) {
                        let integerInput = parseInt(producto.id_producto, 10);
                        if (Number.isInteger(integerInput)) {
                            idProductos.push(integerInput);
                        } else {
                            console.log("El valor ingresado no es un número entero");
                        }
                    }
                    contenidoCarrito.agregarProducto(producto,item.cantidad);
                });
            }
        });

        console.log("IDs de productos en el carrito:", idProductos);

        console.log(contenidoCarrito);
        
        const valor_total= await contenidoCarrito.calcularTotalCompra(1.9);
        console.log("TOTAL: "+ valor_total);

        const factura= await controladorServer.s_añadirFactura(valor_total, idMetodoDePago, idDireccion, idUsuario, idProductos);
        

        res.status(201).json('facturaCreada ' + factura);
    } catch (error) {
        // envía una respuesta de error al cliente
        console.error('Error al crear la factura:', error);
        res.status(500).send('Error en el servidor');
    }
});



// Ruta para agregar una factura
app.get('/factura/obtener', async (req, res) => {
    try {
        const { idFactura} = req.body;

        const factura = await controladorServer.s_obtenerFactura(idFactura);
        
        res.status(201).json(factura);
    } catch (error) {
        // envía una respuesta de error al cliente
        console.error('Error al crear la factura:', error);
        res.status(500).send('Error en el servidor');
    }
});



app.get('/factura/generar', async (req, res) => {
    try {

        const {idFactura} = req.body;

        //const { usuario, direccion, metodoPago, listaProductos, totalCompra } = req.body;
        const factura = await controladorServer.s_obtenerFactura(idFactura)
        const fecha = new Date();
        const dia = fecha.getTime();
        console.log("idUser "+factura[0].id_usuario);
        const usuario = await controladorServer.s_obtenerUsuarioId(factura[0].id_usuario);
        const direccionGuardada = await controladorServer.obtenerDireccion(factura[0].id_usuario);
        console.log(direccionGuardada);

        const direccion = direccionGuardada[0];
    
        // Accede a la propiedad `id_direccion`
        const idDireccion = direccion.id_direccion;
        console.log(idDireccion);

        //PARA LOS ID_PRODUCTO DE ARRAY
        const productos = await controladorServer.obtenerCarritoCompras(factura[0].id_usuario);

        const contenidoCarrito = new carritoDeCompra();

    
        let idProductos = [];

        productos.forEach(item => {
            console.log("Item del carrito:", item);
            if (Array.isArray(item.producto)) {
                item.producto.forEach(producto => {
                    if (producto && producto.id_producto) {
                        let integerInput = parseInt(producto.id_producto, 10);
                        if (Number.isInteger(integerInput)) {
                            idProductos.push(integerInput);
                        } else {
                            console.log("El valor ingresado no es un número entero");
                        }
                    }
                    contenidoCarrito.agregarProducto(producto,item.cantidad);
                });
            }
        });

        console.log("IDs de productos en el carrito:", idProductos);

        console.log(contenidoCarrito);

        
        
        // Definir contenido de los totales
        const subtotal =  await contenidoCarrito.calcularTotalProductos(); // Ejemplo de subtotal
        const descuento =  await contenidoCarrito.calcularTotalDescuento(); // Ejemplo de descuento
        const iva =  await contenidoCarrito.calcularIVA(19); // Ejemplo de IVA
        const totalCompra =  await contenidoCarrito.calcularTotalCompra();

        console.log(subtotal,descuento,iva,totalCompra);

        
        const pdfBytes = await pdf(idFactura,dia,usuario[0], direccion, 'Tarjeta crédito', productos,subtotal,descuento,iva, totalCompra);
        // Enviar el PDF como respuesta al cliente
        res.setHeader('Content-Type', 'application/pdf');
        res.send(pdfBytes);
    } catch (error) {
        console.error('Error al generar la factura:', error);
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

app.post('/Alianza/solicitarCotizacion', async (req, res) => {
    try {
        // Recibir la información del cuerpo de la solicitud POST
        const productos = req.body;

        // Crear un objeto con el formato requerido
        const cotizacion = {
            productos: productos.map(producto => ({
                id_producto: producto.id_producto,
                cantidad: producto.cantidad
            }))
        };

        await archivos.solicitudAlianza(cotizacion);

        const respuesta = await archivos.guardarRespuesta();

        // por cada cotizacion se actualiza el inventario
        inventario = await archivos.actualizarInventario();
        console.log(Array.isArray(inventario.productos)); // Debería devolver true si es un array

        const inventarioArray = Array.from(inventario.productos);


       // controladorServer.actualizarInventario(inventario);
       //const inventarioArray = Object.values(inventario);
        // Iterar sobre el inventario para actualizar solo el stock de cada producto
        for (const producto of inventarioArray) {
            await controladorServer.s_actualizarStockProducto(producto.id_producto, producto.stock);
            console.log(producto.id_producto +' ->' +producto.stock);
        }

        // Devolver los resultados como respuesta
        res.json(respuesta);

        // Enviar una respuesta al cliente
       // res.status(200).send('Cotización generada y guardada correctamente.');
    } catch (error) {
        // Manejar cualquier error que ocurra durante el proceso
        console.error('Error en la solicitud de cotización:', error);
        res.status(500).send('Error en la solicitud de cotización');
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


app.post('/Alianza/actualizarInventario', async (req, res) => {
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