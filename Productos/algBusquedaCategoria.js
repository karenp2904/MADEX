const readline = require('readline');

// Simulación de base de datos de productos
const productos = [
  { id: "M001", nombre: "Estante entretenimiento", descripcion: "Con su organización inteligente y su aspecto elegante, el centro de entretenimiento para TV Cler es la elección perfecta para aquellos que buscan mejorar su experiencia de entretenimiento en casa. Haz de tus noches de cine en casa una experiencia inolvidable con este impresionante mueble.", precio: 490000, estado: "", color: "Natural Claro", stock: 25, descuento: "", id_proveedores: "", categoria: "Muebles" },
  { id: "M002", nombre: "Sofá de cuero", descripcion: "Un sofá cómodo y elegante, perfecto para relajarse después de un largo día de trabajo. Este sofá de cuero de alta calidad agregará un toque de lujo a tu sala de estar.", precio: 850000, estado: "", color: "Negro", stock: 15, descuento: "", id_proveedores: "", categoria: "Muebles" },
  // ... más productos
];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Función para buscar productos por su categoría
function buscarProductosPorCategoria(categoria) {
  const productosEncontrados = productos.filter(p => p.categoria.toLowerCase() === categoria.toLowerCase());
  return productosEncontrados.length ? productosEncontrados : null;
}

// Función para iniciar la búsqueda de productos por categoría
function iniciarBusquedaPorCategoria() {
  rl.question('Ingrese la categoría del producto que desea buscar: ', (categoria) => {
    const productosEncontrados = buscarProductosPorCategoria(categoria);

    if (productosEncontrados) {
      console.log(`Productos encontrados para la categoría "${categoria}":`);
      productosEncontrados.forEach(producto => console.log(producto));
    } else {
      console.log(`No se encontraron productos para la categoría "${categoria}".`);
    }

    rl.close();
  });
}

// Ejecutar la búsqueda de productos por categoría
iniciarBusquedaPorCategoria();
