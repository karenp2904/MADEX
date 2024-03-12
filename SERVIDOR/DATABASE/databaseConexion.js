//conexion

const { Pool } = require('pg');

const pool = new Pool({

    user: 'postgres', 
    host: 'localhost', 
    database: 'madex', // Reemplaza 'postgress' con el nombre de tu base de datos PostgreSQL
    password: 'karen', // Reemplaza 'modeloMadex' con tu contraseña de PostgreSQL
    port: 5433 // Reemplaza este número con el puerto en el que PostgreSQL está escuchando, por lo general es 5432
});


pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Error executing query', err.stack);
    } else {
        console.log('Connected to PostgreSQL database:', res.rows[0].now);
        }
});

module.exports = pool;
