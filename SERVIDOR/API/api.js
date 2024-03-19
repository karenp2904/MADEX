const fs = require('fs'); // Importa fs.promises para usar readFile como una promesa
const producto = require('../ENTIDADES/producto');

// Caché de productos para almacenar los productos leídos del archivo
let productosCache = [];

    function obtenerProductos() {
        return productos;
    }

    // Método para recibir los productos
    function recibirProductos(nuevosProductos) {
        productos = nuevosProductos;
        guardarProductos(nuevosProductos);
        console.log('EN JSON:', JSON.stringify(nuevosProductos));
        // productos = nuevosProductos.map(producto => desglosarProducto(producto));
    }



    
      // Método para desglosar un producto y asegurar que tenga todos los campos requeridos
    function desglosarProducto(producto) {
        const { id, nombre, descripcion, precio, estado, color, stock, descuento, id_proveedores, categoria } = producto;
    
        // Verificar y asignar valores predeterminados si alguno de los campos está vacío
        descuento=0.15;

        const productoDesglosado = {
        id: id || '',
        nombre: nombre || '',
        descripcion: descripcion || '',
        precio: precio || 0,
        estado: estado || '',
        color: color || '',
        stock: stock || 0,
        descuento: descuento || '',
        id_proveedores: id_proveedores || '',
        categoria: categoria || ''
        };
    
        return productoDesglosado;
    }

    
    // Guardar productos en un archivo JSON
function guardarProductos(productos) {
    try {
        const productosJSON = JSON.stringify(productos.productos, null, 2);
        fs.writeFileSync('./SERVIDOR/API/productos.json', productosJSON);
        console.log('Productos guardados en productos.json');
    } catch (error) {
        console.error('Error al guardar los productos:', error);
    }
}


// Función para leer los productos desde el archivo JSON
async function leerProductos(req,res) {
    if (productosCache!=null) {
        // Si los productos ya están en caché, devolverlos directamente
        res.json(productosCache);
    } else {
        try {
            // Leer el archivo de productos de manera asíncrona
            const data = await fs.promises.readFile('./SERVIDOR/API/productos.json', 'utf8');
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
              // Actualizar la caché de productos
            productosCache = productos;
            res.json(productosCache)
        } catch (error) {
            console.error('Error al leer los productos:', error);
            throw error;
        }
    }
}



//--------------------------------------------------------------------------------------

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

async function calcularCostoPresupuesto(archivoCotizacion) {
    try {
        const data = await fs.promises.readFile(archivoCotizacion, 'utf8');
        
        // Parsear el contenido del archivo a un objeto JSON
        const cotizacion = JSON.parse(data);
        
        // Verificar si cotizacion es un array antes de usar forEach
        if (Array.isArray(cotizacion)) {
            let costoTotal = 0;

            // Iterar sobre cada elemento de la cotización
            for (const item of cotizacion) {
                const idProducto = item.id_producto;
                const cantidad = item.cantidad;

                // Obtener el precio del producto de manera asíncrona
                const precio = await obtenerPrecioProducto(idProducto);
                // Calcular el costo total 
                costoTotal += precio * cantidad;
            }

          return costoTotal;
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
        const productos = await leerProductos();

        // Encuentra el producto con el ID especificado
        const producto = productos.find(producto => producto.id === idProducto);

        if (producto) {
           // let precioFinal=producto.precio-(producto.precio*0.15);
            return producto.precio;
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


//-------------------------------------------------------------------------------------

//escribir




















module.exports = {leerProductos,guardarProductos,obtenerProductos,recibirProductos, leerCotizacion};


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