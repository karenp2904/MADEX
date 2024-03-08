const fs = require('fs');
const http = require('http');

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
    id_proveedores:"",
    categoria: "Muebles"
  },
  {
    id: 2,
    nombre: "SillaTerra",
    descripcion: "",
    precio: 2500000,
    estado: "",
    color: "",
    stock: 25,
    descuento: "",
    id_proveedores:"",
    categoria: ""
  },
  {
    id: 3,
    nombre: "",
    descripcion: "",
    precio: 100,
    estado: "",
    color: "",
    stock: 25,
    descuento: "",
    id_proveedores:"",
    categoria: ""
  }
];

// Convertir la lista de productos a formato JSON
const productosJSON = JSON.stringify(productos, null, 2);

// Escribir el JSON en un archivo
fs.writeFileSync('productos.json', productosJSON);

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json'); // Cambiado a 'application/json'
  res.end(productosJSON);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});