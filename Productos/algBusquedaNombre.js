const readline = require('readline');

// Simulación de base de datos de productos
const productos = [
  { id: "M001", nombre: "Estante entretenimiento", descripcion: " ", precio: 490000, estado: "", color: "Natural Claro", stock: 25, descuento: "", id_proveedores: "", categoria: "Muebles" },
  { id: "M002", nombre: "Sofá de cuero", descripcion: "Un sofá cómodo y elegante, perfecto para relajarse después de un largo día de trabajo. Este sofá de cuero de alta calidad agregará un toque de lujo a tu sala de estar.", precio: 850000, estado: "", color: "Negro", stock: 15, descuento: "", id_proveedores: "", categoria: "Muebles" },
  // ... más productos
];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Función para buscar un producto por su nombre
function buscarProductoPorNombre(nombre) {
  const productoEncontrado = productos.find(p => p.nombre.toLowerCase() === nombre.toLowerCase());
  return productoEncontrado || null;
}

// Función para iniciar la búsqueda del producto
function iniciarBusquedaProducto() {
  rl.question('Ingrese el nombre del producto que desea buscar: ', (nombre) => {
    const productoEncontrado = buscarProductoPorNombre(nombre);

    if (productoEncontrado) {
      console.log('Producto encontrado:');
      console.log(productoEncontrado);
    } else {
      console.log(`No se encontró ningún producto con el nombre "${nombre}".`);
    }

    rl.close();
  });
}

// Ejecutar la búsqueda del producto
iniciarBusquedaProducto();
