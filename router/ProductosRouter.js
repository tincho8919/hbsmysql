const express = require ('express');
const Productoscontroller = require ('../controller/Productoscontroller.js')
const route = express.Router();





route.get('/productos',Productoscontroller.Productos);

route.get('/articulos',Productoscontroller.articulos);

route.post('/articulos',Productoscontroller.createProducto);

route.post('/productos',Productoscontroller.createProducto);

route.get('/ventas',Productoscontroller.ventasProductos);

route.get('/compradb',Productoscontroller.Compradb);

route.post('/ventas',Productoscontroller.createProducto);

route.post('/delete/:id', Productoscontroller.eliminarProducto);

route.post('/comprar/:id',Productoscontroller.comprarProducto);



module.exports = route;