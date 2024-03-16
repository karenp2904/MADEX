const fs = require('fs');


    function obtenerProductos() {
        return this.productos;
    }

        // Método para recibir los productos
    function recibirProductos(nuevosProductos) {
        this.productos = nuevosProductos;
        console.log('EN JSON:' + nuevosProductos);
        guardarProductos();
       // this.productos = nuevosProductos.map(producto => this.desglosarProducto(producto));
    }

    
      // Método para desglosar un producto y asegurar que tenga todos los campos requeridos
    function desglosarProducto(producto) {
        const { id, nombre, descripcion, precio, estado, color, stock, descuento, id_proveedores, categoria } = producto;
    
        // Verificar y asignar valores predeterminados si alguno de los campos está vacío
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

    function guardarProductos() {
        try {
            let productosJSON = JSON.stringify(this.productos, null, 2);
            fs.writeFileSync('../MADEX/SERVIDOR/API/productos.json', productosJSON);
            console.log('Productos  productos.json'+ productosJSON);
        } catch (error) {
            console.error('Error al guardar los productos:', error);
            // Aquí puedes manejar el error de manera más específica según las necesidades de tu aplicación
        }
    }
    
    async function leerProductos() {
        try {
        let data = fs.readFileSync('../MADEX/SERVIDOR/API/productos.json', 'utf8');
         return data;
        } catch (error) {
            console.error('Error al leer los productos:', error);
            res.status(500).send('Error al leer los productos');
        }
    }

//--------------------------------------------------------------------------------------

// metodos para definit la rutina de lectura de la transaccion Alianza

// Rutas a los archivos
const archivoOriginal = '../MADEX/SERVIDOR/API/cotizacion.json';

// Función para leer el archivo y detectar cambios
function leerYDetectarCambios() {
    fs.readFile(archivoOriginal, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo:', err);
            return;
        }

        console.log('Contenido del archivo:', data);
    });
}

// Observar cambios en el archivo original
fs.watchFile(archivoOriginal, (curr, prev) => {
    console.log('El archivo original ha sido modificado.');
    // Leer el archivo y detectar cambios
    leerYDetectarCambios();
});


// Función para observar cambios en el archivo original
function observarCambios() {
    fs.watchFile(archivoOriginal, (curr, prev) => {
        console.log('El archivo original ha sido modificado.');
        calcularPresupuestoCotiacion();
    });
}

// Ejecutar la rutina cada 10 horas
setInterval(() => {
    console.log('Ejecutando rutina cada 10 horas...');
    observarCambios();
}, 10 * 60 * 60 * 1000); // 10 horas en milisegundos

function calcularPresupuestoCotiacion(){

}



module.exports = {leerProductos,guardarProductos,obtenerProductos,recibirProductos};
