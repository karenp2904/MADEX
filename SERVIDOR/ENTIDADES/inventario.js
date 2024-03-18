const readline = require('readline');
class Inventario {
        constructor() {
        this.productos = [];

        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
            });

        }
    
        agregarProducto(producto) {
        this.productos.push(producto);
        }

       
    
        //miguel 
        /*
            // Simulación de base de datos de productos
            productos = [
            { id: "M001", nombre: "Estante entretenimiento", descripcion: "Con su organización inteligente y su aspecto elegante, el centro de entretenimiento para TV Cler es la elección perfecta para aquellos que buscan mejorar su experiencia de entretenimiento en casa. Haz de tus noches de cine en casa una experiencia inolvidable con este impresionante mueble.", precio: 490000, estado: "", color: "Natural Claro", stock: 25, descuento: "", id_proveedores: "", categoria: "Muebles" },
            { id: "M002", nombre: "Sofá de cuero", descripcion: "Un sofá cómodo y elegante, perfecto para relajarse después de un largo día de trabajo. Este sofá de cuero de alta calidad agregará un toque de lujo a tu sala de estar.", precio: 850000, estado: "", color: "Negro", stock: 15, descuento: "", id_proveedores: "", categoria: "Muebles" },
            // ... más productos
            ];
        */
            
       
            
            // Función para buscar productos por su categoría
        buscarProductosPorCategoria(categoria) {
            const productosEncontrados = productos.filter(p => p.categoria.toLowerCase() === categoria.toLowerCase());
            return productosEncontrados.length ? productosEncontrados : null;
        }
        
        // Función para iniciar la búsqueda de productos por categoría
        iniciarBusquedaPorCategoria() {
            this.rl.question('Ingrese la categoría del producto que desea buscar: ', (categoria) => {
            const productosEncontrados = buscarProductosPorCategoria(categoria);
        
            if (productosEncontrados) {
                console.log(`Productos encontrados para la categoría "${categoria}":`);
                productosEncontrados.forEach(producto => console.log(producto));
            } else {
                console.log(`No se encontraron productos para la categoría "${categoria}".`);
            }
        
            this.rl.close();
            });
        }
            
            // Función para buscar un producto por su nombre
        buscarProductoPorNombre(nombre) {
            const productoEncontrado = productos.find(p => p.nombre.toLowerCase() === nombre.toLowerCase());
            return productoEncontrado || null;
        }
        
        // Función para iniciar la búsqueda del producto
        iniciarBusquedaProducto() {
            this.rl.question('Ingrese el nombre del producto que desea buscar: ', (nombre) => {
            const productoEncontrado = buscarProductoPorNombre(nombre);
        
            if (productoEncontrado) {
                console.log('Producto encontrado:');
                console.log(productoEncontrado);
            } else {
                console.log(`No se encontró ningún producto con el nombre "${nombre}".`);
            }
        
            this.rl.close();
            });
        }
        
        
        // Ejecutar la búsqueda de productos por categoría
        //iniciarBusquedaPorCategoria();
}
module.exports = Inventario;