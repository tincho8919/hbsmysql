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
})  */

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());


//1. Configuración de Handlebars
app.set('view engine', 'hbs');
//2. Configuración e ubicación de las vistas
app.set('views', path.join(__dirname, 'views'));
//3. Configuración de los archivos parciales
hbs.registerPartials(path.join(__dirname, 'views/partials'));



app.use('/', UserRouter)

app.use('/', ProductosRouter)

app.get('/', (req, res) => {
    res.render('index');
});

const base = app.listen(PORT,() =>{
    console.log(`SERVIDOR EN EL PUERTO http://localhost:${PORT}/`);
})