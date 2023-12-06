const express = require ("express")
const db = require ('./database/database.js')
const bodyParser = require ('body-parser')
const hbs = require('hbs');
const UserRouter = require('./router/UserRoute.js');
const ProductosRouter = require ('./router/ProductosRouter.js')
const path = require ('path')
const cors =require ('cors')
const morgan =require ('morgan')

const app = express()

const PORT = 8001

// Middleware para parsear el cuerpo de las solicitudes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* app.get('/', (req, res) =>{
    res.send("hello words")
}) */


// Configuración de Handlebars
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'))
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));


app.use('/', UserRouter)

app.use('/', ProductosRouter)

app.get('/', (req, res) => {
    res.render('index');
});

const base = app.listen(PORT,() =>{
    console.log(`SERVIDOR EN EL PUERTO http://localhost:${PORT}/`);
})