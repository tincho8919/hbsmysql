
const dotenv = require ("dotenv");
const mysql = require("mysql2");


dotenv.config();

const db = mysql.createConnection({
    host: 'monorail.proxy.rlwy.net',
    user: 'root',
    password: 'A42bcD3Fg4Ba5gaCcBHbdcgC6GC215fA',
    port: 13065,
    database: 'railway'
});

db.connect((err) =>{

    if (err) {
        console.error('Error en la conexión a la base de datos:', err);
        return;
      }
    console.log(`Conexion a la database ${'railway'} conexion exitosa`);
        
});

module.exports = db;