
const Producto = require('../ENTIDADES/producto'); 
const fs = require('fs');
const path = require('path');
class Inventario {
        constructor() {
        this.productos = []; // Supongamos que aquí tienes tu lista de productos
        /*
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
            });
        */
        }
    
        agregarProducto(productoData) {
            const producto = new Producto(productoData);
            this.productos.push(producto);
        }
/*
        obtenerRutaImagenPorNombre(nombreProducto) {
            const path = require('path');
            const nombreArchivoImagen = `${nombreProducto }.png`; // Ajusta la extensión según tus imágenes (jpg, png, etc.)
            const rutaImagen = path.join(__dirname, '..', 'IMAGENES', nombreArchivoImagen);
            console.log(rutaImagen);
            return rutaImagen;
        }
*/
        async obtenerRutasImagenesPorNombreProducto(nombreProducto) {
            const directorioImagenes = path.resolve(__dirname, '../IMAGENES');
            const rutasImagenes = [];
            console.log(directorioImagenes);

            // Leer el contenido del directorio de imágenes
            try {
                const archivos = fs.readdirSync(directorioImagenes);
                console.log(archivos);
                
                // Filtrar los archivos para obtener solo las imágenes que contienen el nombre del producto
                archivos.forEach(archivo => {
                    console.log(archivo + ' imagenENServidor');
                    const nombreProductoLimpio = nombreProducto.trim(); // Eliminar espacios en blanco al principio y al final del nombre del producto
                    const archivoLimpio = archivo.trim(); // Eliminar espacios en blanco al principio y al final del nombre del archivo
                    const regex = new RegExp(`^${nombreProducto.replace(/^:/, '')}\\s*\\d+\\.png$`);
                    console.log(regex + ' lectura');
                    if (regex.test(archivoLimpio)) {
                        console.log(nombreProductoLimpio + " prueba ruta");
                        const rutaImagen = path.join(__dirname, '../IMAGENES', archivo); // Ruta relativa de la imagen
                        rutasImagenes.push(rutaImagen);
                        
                        // Salir del bucle si se han encontrado 5 imágenes
                        if (rutasImagenes.length == 5) {
                            return;
                        }
                    }
                });
                
            } catch (error) {
                console.error('Error al leer el directorio de imágenes:', error);
            }
            return rutasImagenes;
        }

        async  obtenerRutasbase64(nombreProducto) {
            const directorioImagenes = path.resolve(__dirname, '../IMAGENES');
            const imagenesBase64 = [];
        
            try {
                const archivos = fs.readdirSync(directorioImagenes);
                console.log(archivos);
        
                archivos.forEach(archivo => {
                    const nombreProductoLimpio = nombreProducto.trim();
                    const archivoLimpio = archivo.trim();
                    const regex = new RegExp(`^${nombreProducto.replace(/^:/, '')}\\s*\\d+\\.png$`);
        
                    if (regex.test(archivoLimpio)) {
                        const rutaImagen = path.join(directorioImagenes, archivo);
                        const imagenBase64 = fs.readFileSync(rutaImagen).toString('base64');
                        
                        imagenesBase64.push({
                            nombre: archivo,
                            base64: imagenBase64
                        });
        
                        if (imagenesBase64.length == 5) {
                            return;
                        }
                    }
                });
        
            } catch (error) {
                console.error('Error al leer el directorio de imágenes:', error);
            }
        
            return imagenesBase64;
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
        /*
            
            // Función para buscar productos por su categoría
        buscarProductosPorCategoria(categoria) {
            const productosEncontrados = this.productos.filter(p => p.categoria.toLowerCase() === categoria.toLowerCase());
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
        */

        //algortimo de busqueda - barra de busqueda
        levenshteinDistance(s, t) {
            const d = [];
            const n = s.length;
            const m = t.length;
        
            // Crear una matriz (n + 1) x (m + 1) e inicializarla con ceros
            for (let i = 0; i <= n; i++) {
                d[i] = [];
                d[i][0] = i;
            }
            for (let j = 0; j <= m; j++) {
                d[0][j] = j;
            }
        
            // Calcular la distancia de Levenshtein
            for (let j = 1; j <= m; j++) {
                for (let i = 1; i <= n; i++) {
                    if (s[i - 1] === t[j - 1]) {
                        d[i][j] = d[i - 1][j - 1];
                    } else {
                        const substitutionCost = d[i - 1][j - 1] !== undefined ? d[i - 1][j - 1] : Infinity;
                        const insertionCost = d[i][j - 1] !== undefined ? d[i][j - 1] : Infinity;
                        const deletionCost = d[i - 1][j] !== undefined ? d[i - 1][j] : Infinity;
                        d[i][j] = Math.min(substitutionCost + 1, insertionCost + 1, deletionCost + 1);
                    }
                }
            }
        
            // Devolver la distancia entre las cadenas s y t
            return d[n][m];
        }
        

        buscarProducto(nombreBusqueda) {
            return new Promise((resolve, reject) => {
                const resultados = [];
        
                for (const producto of this.productos) {
                    const palabrasProducto = producto.nombre.toLowerCase().split(' ');
                    const terminoBusqueda = nombreBusqueda.toLowerCase();
        
                    let coincide = false;
                    for (const palabra of palabrasProducto) {
                        const distancia = this.levenshteinDistance(palabra, terminoBusqueda);
                        if (distancia <= 3) { 
                            coincide = true;
                            break;
                        }
                    }
        
                    if (coincide) {
                        
                        resultados.push(
                            producto
                        );
                    }
                }
        
                resolve(resultados);
            });
        }

        productosPorCategoria(categoria) {
            return new Promise((resolve, reject) => {
                
                let productosSegunCategoria = []; 
                const categoriaABuscar = categoria.toLowerCase();
                // Iterar sobre la lista de productos
                for (const producto of this.productos) {
                    const palabrasProducto = producto.categoria.toLowerCase().split(' ');
                    
                    let coincide = false;
                
                    for (const palabra of palabrasProducto) {
                        const distancia = this.levenshteinDistance(palabra, categoriaABuscar);
                        if (distancia <= 3) { 
                            coincide = true;
                            break;
                        }
                    }
        
                    if (coincide) {
                        //  objeto producto 
                        productosSegunCategoria.push( producto);
                    }
                }
                resolve(productosSegunCategoria);
            });
        }

        productosPorColor (color){
            return new Promise((resolve, reject) => {
                
                let productosConColor = []; 
                const colorABuscar = color.toLowerCase(); 
                console.log(colorABuscar + " color a buscar");
                // Iterar sobre la lista de productos
                for (const producto of this.productos) {
                    const palabrasProducto = producto.color.toLowerCase().split(' ');
                    console.log(palabrasProducto);
                    let coincide = false;
                    for (const palabra of palabrasProducto) {
                        const distancia = this.levenshteinDistance(palabra, colorABuscar);
                        if (distancia <= 2) { 
                            coincide = true;
                            break;
                        }
                    }
        
                    if (coincide) {
                        //  objeto producto 
                        productosConColor.push( producto);
                    }
                }
                resolve(productosConColor);
            });
        }

        
        // Método que verifica la cantidad de unidades de stock
        verificarStock(idProducto, cantidad) {
            const producto = this.productos.find(producto => producto.id_producto === idProducto);
            
            if (!producto) {
                throw new Error('El producto no se encuentra en el inventario.');
            }
            return producto.stock >= cantidad; //rertorna true si es mayor y false si es menor
        }

        // Método que descuenta el stock de cada producto
        descontarStock(idProducto, cantidad) {
            const producto = this.productos.find(producto => producto.id_producto === idProducto);
            if (!producto) {
                throw new Error('El producto no se encuentra en el inventario.');
            }
            if (producto.stock < cantidad) {
                throw new Error('No hay suficiente stock disponible para realizar la operación.');
            }
            producto.stock -= cantidad;
            console.log(`Stock descontado correctamente para el producto con ID ${idProducto}. Nuevo stock: ${producto.stock}`);
            return true;
        }


        // Ejecutar la búsqueda de productos por categoría
        //iniciarBusquedaPorCategoria();
}

module.exports = Inventario;