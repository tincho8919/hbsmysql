
const dotenv = require ("dotenv");
const mysql = require("mysql2");


dotenv.config();

const db = mysql.createConnection({
    host:process.env.HOSTDATA,
    user:process.env.USERDATA,
    password:process.env.PASSDATA,
    port:process.env.PORTDATA,
    database:process.env.DATABASE

});

db.connect((err) =>{

    if (err) {
        console.error('Error en la conexión a la base de datos:', err);
        return;
      }
    console.log(`Conexion a la database ${process.env.DATABASE} conexion exitosa`);
        
});

module.exports = db;