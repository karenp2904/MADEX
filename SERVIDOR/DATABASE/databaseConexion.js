//conexion

const  { Pool }= require('pg');

const pool = new Pool({

    user: 'StefannyAdmin', 
    host: 'madexdb-web.postgres.database.azure.com', 
    database: 'Madex_DB', // Reemplaza 'postgress' con el nombre de tu base de datos PostgreSQL
    password: 'Psswrd123', // Reemplaza 'modeloMadex' con tu contraseña de PostgreSQL
    port: 5432 ,// Reemplaza este número con el puerto en el que PostgreSQL está escuchando, por lo general es 5432
    ssl: {
        rejectUnauthorized: false // Configuración necesaria para la conexión SSL en Azure
      }
});


pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Error executing query', err.stack);
    } else {
        console.log('Connected to PostgreSQL database:', res.rows[0].now);
        }
});

module.exports = pool;
