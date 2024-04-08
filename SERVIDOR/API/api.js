const fs = require('fs').promises; // Importa fs.promises para usar readFile como una promesa
const Inventario = require('../ENTIDADES/inventario');
let inventario = new Inventario();

// Caché de productos para almacenar los productos leídos del archivo

let productosCache = null;

// Método para recibir los productos
function recibirProductos(nuevosProductos) {
    obtenerInventario();
    guardarProductos(nuevosProductos); // Supongo que esta función guarda los productos en algún lugar
    console.log('EN JSON:', JSON.stringify(nuevosProductos));
}

// Método para obtener el inventario
async function obtenerInventario() {
    console.log("obtener "+inventario.productos)
    return inventario;
}


    // Guardar productos en un archivo JSON
    function guardarProductos(productos) {
        const fs = require('fs');
        try {
            const productosJSON = JSON.stringify(productos, null, 2);
            // Verificar si el archivo existe antes de intentar escribir en él
            if (!fs.existsSync('./SERVIDOR/API/productos.json')) {
                console.error('El archivo productos.json no existe.');
                return;
            }
            fs.writeFileSync('./SERVIDOR/API/productos.json', productosJSON);
            console.log('Productos guardados en productos.json');
        } catch (error) {
            console.error('Error al guardar los productos:', error);
        }
    }


    // Función para leer los productos desde el archivo JSON
    async function leerProductos(req, res) {
        try {
            // Leer el archivo de productos de manera asíncrona
            const data = await fs.readFile('./SERVIDOR/API/productos.json', 'utf8');
            const jsonData = JSON.parse(data);
    
            // Verifica si hay productos en el archivo JSON
            if (!jsonData || !jsonData.productos || !Array.isArray(jsonData.productos)) {
                throw new Error('El archivo JSON no contiene una lista de productos válida.');
            }
    
            const productos = jsonData.productos;
    
            // Iterar sobre cada producto e imprimir su información
            productos.forEach(producto => {
                console.log('ID:', producto.id_producto);
                console.log('Nombre:', producto.nombre);
                console.log('Descripción:', producto.descripcion);
                console.log('Precio:', producto.precio);
                console.log('Color:', producto.color);
                console.log('Stock:', producto.stock);
                console.log('Descuento:', producto.descuento);
                console.log('Proveedor:', producto.idProveedor);
                console.log('Categoría:', producto.idCategoria);
                console.log('------------------------');
            });
    
            // Agregar los productos al inventario y actualizar la caché
            inventario = new Inventario();
            productos.forEach(producto => inventario.agregarProducto(producto));
            productosCache = productos;
    
            return inventario;
            
        } catch (error) {
            console.error('Error al leer los productos:', error);
            throw error;
        }
    }
    
    



//--------------------------------------------------------------------------------------
//metodos para la escritura de la solicitud de la alianza

async function solicitudAlianza(cotizacion) {
    const fs = require('fs');

    // Convertir el objeto a JSON
    const cotizacionJSON = JSON.stringify(cotizacion, null, 2);

    // Escribir el JSON en un archivo de manera asíncrona
    fs.writeFile('./SERVIDOR/API/cotizacion.json', cotizacionJSON, (err) => {
        if (err) {
            console.error('Error al escribir el archivo:', err);
            // Puedes manejar el error de acuerdo a tus necesidades, por ejemplo, lanzando una excepción
            throw err;
        }
        console.log('Archivo cotizacion.json creado correctamente.');
    });
}



//----------------------------------------------------------------------------------------

// metodos para definit la rutina de lectura de la transaccion Alianza

// Rutas a los archivos
const archivoCotizacion = './SERVIDOR/API/cotizacion.json';

// Controlador para leer la cotización y calcular el presupuesto si hay cambios
async function leerCotizacion(req, res) {
    try {
        // Llama a la función observarCambios para detectar cambios en la cotización
        observarCambios();

        // Devuelve una respuesta indicando que se está observando la cotización
        res.status(200).send('Observando cambios en la cotización...');
    } catch (error) {
        console.error('Error al leer la cotización:', error);
        res.status(500).send('Error al leer la cotización');
    }
}

// Función para observar cambios en el archivo original
function observarCambios() {
    fs.watchFile(archivoCotizacion, (curr, prev) => {
        console.log('El archivo original ha sido modificado.');
        // Leer el archivo y calcular el presupuesto
        calcularCostoPresupuesto(archivoCotizacion); // Calcula el presupuesto
    });
}

/*
// Ejecutar la rutina cada 10 horas
setInterval(() => {
    console.log('Ejecutando rutina cada 10 horas...');
   // observarCambios();
}, 10 * 60 * 60 * 1000); // 10 horas en milisegundos


*/

async function calcularCotizacion(){
    const archivoCotizacion = './SERVIDOR/API/cotizacion.json';
    const costoAlianza= await calcularCostoPresupuesto(archivoCotizacion);
    return costoAlianza;
}

async function calcularCostoPresupuesto(archivoCotizacion) {
    try {
        // Leer el archivo de productos de manera asíncrona
        const data = await fs.readFile(archivoCotizacion, 'utf8');
        const jsonData = JSON.parse(data);

        // Verifica si hay productos en el archivo JSON
        if (!jsonData || !jsonData.productos || !Array.isArray(jsonData.productos)) {
            throw new Error('El archivo JSON no contiene una lista de productos válida.');
        }

        const cotizacion = jsonData.productos;

        // Verificar si cotizacion es un array antes de usar forEach
        if (Array.isArray(cotizacion)) {
            let costoTotal = 0;

            // Iterar sobre cada elemento de la cotización
            for (const item of cotizacion) {
                const idProducto = item.id_producto;
                const cantidad = item.cantidad;
                console.log(idProducto,' ', cantidad);

                await leerProductos();

                if (inventario.verificarStock(idProducto, cantidad)) {
                    // Obtén el precio del producto de manera asíncrona
                    const precio = await obtenerPrecioProducto(idProducto);
                    // Calcula el costo total
                    costoTotal += precio * cantidad;
                    console.log(costoTotal);
                }
                // Descuenta el stock del producto
                inventario.descontarStockAdmin(true,idProducto, cantidad);
                
            }

            // Formatear el costo total a una representación de moneda legible
            const costoTotalFormateado = costoTotal.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });
            
            return costoTotalFormateado;

        } else {
            console.error('El contenido del archivo de cotización no es un array.');
            return null;
        }
    } catch (error) {
        console.error('Error al calcular el costo del presupuesto:', error);
        return null;
    }
}




async function obtenerPrecioProducto(idProducto) {
    try {
        //await leerProductos();
        
        inventario = await leerProductos();
        console.log("productos" +inventario.productos) ;
        const productos = inventario.productos
        // Encuentra el producto con el ID especificado
        const producto = productos.find(producto => producto.id_producto === idProducto);
        console.log(producto + "producto que se busca");
        if (producto) {
            let precioConDescuento = producto.precio * (1 - producto.descuento / 100);
            console.error(producto.precio);
            return precioConDescuento;
        } else {
            // Si no se encuentra el producto, lanza un error
            throw new Error('El producto con el ID especificado no existe');
            return null;
        }
    } catch (error) { 
        console.error('Error al obtener el precio del producto:', error);
        throw error; 
    }
}


async function actualizarInventario(){
    return inventario;
}

//-------------------------------------------------------------------------------------

//escribir


async function guardarRespuesta() {
    const fs = require('fs');
    const costoAlianza = await calcularCotizacion();
    if (costoAlianza !== null) {
        // Obtener la fecha estimada de entrega
        const fechaEstimadaEntrega = await obtenerFechaEstimadaEntrega();

        // Crear un objeto con la respuesta
        const respuesta = {
            costoTotal: costoAlianza,
            fechaEstimadaEntrega: fechaEstimadaEntrega
        };

        // Convertir el objeto a formato JSON
        const respuestaJSON = JSON.stringify(respuesta, null, 2);

        try {
            // Escribir la respuesta en el archivo JSON de manera síncrona
            fs.writeFileSync('./SERVIDOR/API/respuestaCotizacion.json', respuestaJSON);
            console.log('Respuesta escrita en el archivo respuestaCotizacion.json correctamente.');
            return respuesta;
        } catch (error) {
            console.error('Error al escribir en el archivo respuestaCotizacion.json:', error);
            throw error; // Propaga el error para manejarlo en un nivel superior si es necesario
        }
    } else {
        console.error('No se pudo calcular el costo de la cotización.');
    }
}


async function obtenerFechaEstimadaEntrega() {
    const hoy = new Date();
    const diasDeEntrega = 14; //   14 días de entrega
    const fechaEntrega = new Date(hoy.getTime() + (diasDeEntrega * 24 * 60 * 60 * 1000));
    return fechaEntrega.toISOString().slice(0, 10); // Formato AAAA-MM-DD
}



















module.exports = {leerProductos,guardarProductos,obtenerInventario,recibirProductos,solicitudAlianza,calcularCotizacion, guardarRespuesta,leerCotizacion, actualizarInventario};


/*
async function leerProductos(req, res) {
    const fs = require('fs');
    // Lee el archivo JSON
    fs.readFile('./SERVIDOR/API/productos.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo JSON:', err);
            return;
        }

        try {
            // Convierte el contenido del archivo a un objeto JavaScript
            const productos = JSON.parse(data);

            // Verifica si la variable productos es un array
            if (!Array.isArray(productos)) {
                throw new Error('El archivo JSON no contiene una lista de productos.');
            }

            // Itera sobre cada producto y muestra su información
            productos.forEach(producto => {
                console.log('ID:', producto.id);
                console.log('Nombre:', producto.nombre);
                console.log('Descripción:', producto.descripcion);
                console.log('Precio:', producto.precio);
                console.log('Estado:', producto.estado);
                console.log('Color:', producto.color);
                console.log('Stock:', producto.stock);
                console.log('Descuento:', producto.descuento);
                console.log('ID Proveedor:', producto.idProveedor);
                console.log('Proveedor:', producto.proveedor);
                console.log('ID Categoría:', producto.idCategoria);
                console.log('Categoría:', producto.categoria);
                console.log('------------------------');
            });
        res.json(productos)
        } catch (error) {
            console.error('Error al procesar el archivo JSON:', error);
        }
    });
}
*/