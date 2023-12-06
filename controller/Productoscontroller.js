const db = require ('../database/database.js')


const createProducto = (req, res) => {
    const { nombre, imagen, precio } = req.body;
    const data = {
        nombre: nombre,
        imagen: imagen,
        precio: precio
    }

    db.query('INSERT INTO PRODUCTOS SET ?', data, (error, result) => {
        if (error) {
            console.error('Error al crear el producto', error);
            return res.status(500).json({ mensaje: 'Error interno del servidor' });
        } else {
            // Después de la inserción exitosa, redirige a la página de ventas
            return res.redirect("/ventas");
        }
    });
};

const ventasProductos = (req, res) => {

    let sql = `SELECT * FROM PRODUCTOS`;

    // Buscamos en la base de datos los productos
    db.query(sql, (error, result) => {

        if (error) {
            console.log(error);
            return res.json({
                mensaje: 'Cayó nuestra base de datos',
                error
            });
        } else {
            return res.render('ventas', {
                dato: result
            });
        }
    });
}


const eliminarProducto = (req, res) => {
    const productId = req.params.id;

    db.query('DELETE FROM PRODUCTOS WHERE id = ?', [productId], (err, result) => {
        if (err) {
            console.error('Error al eliminar el producto', err);
            res.status(500).send('Error en el servidor');
        } else {
            console.log(`Producto con ID ${productId} eliminado exitosamente`);
            res.redirect("/ventas");
            /* res.status(200).send('Producto eliminado exitosamente'); */
        }
    });
};



const comprarProducto = (req, res) => {
    const productId = req.params.id;

    // Obtener el producto
    db.query('SELECT * FROM PRODUCTOS WHERE id = ?', [productId], (errProducto, productos) => {
        if (errProducto) {
            console.error('Error al obtener el producto', errProducto);
            return res.status(500).send('Error en el servidor');
        }

        const producto = productos[0];

        if (!producto) {
            return res.status(404).send('Producto no encontrado');
        }

        // Registrar la venta en la tabla de ventas
        const fechaVenta = new Date(); // Obtener la fecha actual
        db.query('INSERT INTO VENTAS (nombre ,fecha, precio, total) VALUES (?, ?, ?, ?)', [producto.nombre, fechaVenta, producto.precio, producto.precio], (errInsert, resultInsert) => {
            if (errInsert) {
                console.error('Error al insertar la venta', errInsert);
                return res.status(500).send('Error en el servidor');
            }

            // Renderizar la vista 'compradb' y pasar los datos del producto comprado
            res.render('compradb', { dato: [producto] });
        });
    });
};
    







const Ventas = (req, res) => {
    res.render('ventas')
}

const Productos = (req, res) => {
    res.render('productos')
}

const articulos= (req, res) => {
    res.render('articulos')
}

const Compradb = (req, res) => {
    res.render('compradb')
}
module.exports ={
    Productos,
    articulos,
    createProducto,
    eliminarProducto,
    ventasProductos,
    Ventas,
    comprarProducto,
    Compradb
};