const fs = require('fs');
const express = require('express');

const app = express();
const port = 3000;

// Middleware para procesar JSON
app.use(express.json());

// Ruta para obtener todos los productos
app.get('/productos', (req, res) => {
    fs.readFile('productos.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error interno del servidor');
            return;
        }
        const productos = JSON.parse(data);
        res.json(productos);
    });
});

// Función para escribir los productos en el archivo JSON
function escribirProductos(productos) {
    fs.writeFile('productos.json', JSON.stringify(productos, null, 2), (err) => {
        if (err) {
            console.error('Error al escribir en el archivo:', err);
        } else {
            console.log('Productos escritos en el archivo.');
        }
    });
}

// Ejemplo de cómo usar la función escribirProductos
const productos = [
    {
        id: "M001",
        nombre: "Estante entretenimiento",
        descripcion: "Con su organización inteligente y su aspecto elegante, el centro de entretenimiento para TV Cler es la elección perfecta para aquellos que buscan mejorar su experiencia de entretenimiento en casa. Haz de tus noches de cine en casa una experiencia inolvidable con este impresionante mueble.",
        precio: 490.000,
        estado: "",
        color: "Natural Claro",
        stock: 25,
        descuento: "",
        id_proveedores: "",
        categoria: "Muebles"
    }
];

// Escribir los productos en el archivo JSON
escribirProductos(productos);

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);        //http://localhost:3000/productos
});