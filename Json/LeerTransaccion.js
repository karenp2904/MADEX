const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

// Middleware para procesar JSON
app.use(express.json());

// Ruta para obtener la información de la transacción de la alianza
app.get('/transaccion-alianza', (req, res) => {
    fs.readFile('transaccion_alianza.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error interno del servidor');
            return;
        }
        const transaccion = JSON.parse(data);
        res.json(transaccion);
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
