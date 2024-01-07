
const dotenv = require ("dotenv");
const mysql = require("mysql2");


dotenv.config();

const db = mysql.createConnection({
    host: 'btwsv83ir0l3gtanfxa6-mysql.services.clever-cloud.com',
    user: 'ucn78jpaebdkwg7g',
    password: 'W4xJbcrwenpuK8Bi4OPb',
    port: '3306',
    database: 'btwsv83ir0l3gtanfxa6'
});

db.connect((err) =>{

    if (err) {
        console.error('Error en la conexión a la base de datos:', err);
        return;
      }
    console.log(`Conexion a la database ${'btwsv83ir0l3gtanfxa6'} conexion exitosa`);
        
});

module.exports = db;