const express = require("express");
const app = express();
const cors = require("cors");
const pool = require ("./db"); 
const port=4000;

//middleware
app.use(cors());
app.use(express.json());


//ROUTES//


// Crear un producto
app.post("/productos", async (req, res) => {
  try {
      const { nombre, descripcion, precio, estado_producto, color, stock, descuento, Proveedores_id_Proveedores, Categoria_idCategoria } = req.body;
      const newProducto = await pool.query(
          "INSERT INTO Productos (nombre, descripcion, precio, estado_producto, color, stock, descuento, Proveedores_id_Proveedores, Categoria_idCategoria) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
          [nombre, descripcion, precio, estado_producto, color, stock, descuento, Proveedores_id_Proveedores, Categoria_idCategoria]
      );
      res.json(newProducto.rows[0]);
      //La cláusula RETURNING * devuelve la fila recién insertada después de la inserción
  } catch (error) {
      console.error(error.message);
  }
});

// Obtener todos los productos
app.post("/productos/obtener", async (req, res) => {
  try {
      // No se necesita el parámetro nombre_tabla si estás obteniendo todos los productos directamente de la tabla Productos
      const allProductos = await pool.query('SELECT * FROM Productos');
      res.json(allProductos.rows);
  } catch (error) {
      console.error(error.message);
  }
});


// Obtener todos los productos fácilmente
app.get("/productos/obtener/facil", async (req, res) => {
  try {
      const allProductos = await pool.query('SELECT * FROM Productos');
      res.json(allProductos.rows);
  } catch (error) {
      console.error(error.message);
  }
});


// Obtener un producto por su ID
app.get("/productos/:id", async (req, res) => {
  try {
      const { id } = req.params;
      const producto = await pool.query('SELECT * FROM Productos WHERE id_producto = $1', [id]);
      res.json(producto.rows);
  } catch (error) {
      console.error(error.message);
  }
});

// Actualizar un producto
app.put("/productos/:id", async (req, res) => {
  try {
      const { id } = req.params;
      const { nombre, descripcion, precio, estado_producto, color, stock, descuento, Proveedores_id_Proveedores, Categoria_idCategoria } = req.body;
      
      const updateProducto = await pool.query(
          `UPDATE Productos 
          SET nombre = $1, descripcion = $2, precio = $3, estado_producto = $4, color = $5, stock = $6, descuento = $7, Proveedores_id_Proveedores = $8, Categoria_idCategoria = $9
          WHERE id_producto = $10
          RETURNING *`,
          [nombre, descripcion, precio, estado_producto, color, stock, descuento, Proveedores_id_Proveedores, Categoria_idCategoria, id]
      );

      res.json(updateProducto.rows[0]);
  } catch (error) {
      console.error(error.message);
  }
});


// Eliminar un producto
app.delete("/productos/:id", async (req, res) => {
  try {
      const { id } = req.params;
      await pool.query('DELETE FROM Productos WHERE id_producto = $1', [id]);
      res.json("Producto eliminado");
  } catch (error) {
      console.error(error.message);
  }
});



function autenticarUsuario(datosSolicitud) {
    // Lógica de autenticación en la base de datos
    // Retorna un objeto con el resultado de la autenticación
}

function registrarUsuario(datosSolicitud) {
    // Lógica de registro en la base de datos
    // Retorna un objeto con el resultado del registro
}

app.listen(port, () => {
  console.log(' listening on port ${port}! http://localhost:${port}/');
})
