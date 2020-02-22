'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//cargar archivos rutas

var project_routes = require('./routes/project');

//middlewares... es un metodo que se ejecuta antes de ejecutar la accion de un controlador
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// CORS

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // url permitida en el *
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});



// rutas para ejemplos

// app.get('/',(req, res) =>{
//     res.status(200).send( // poner texto plano en la página
//       "<h1>Hola mundo desde mi API de Node JS</h1>"
//     );
// })

// app.get('/test',(req, res) =>{
//     res.status(200).send({ // en formato JSON
//         message: "Hola mundo desde mi API de Node JS"
//     });
// })

// app.post('/test/:id',(req, res) =>{
//     // console.log(req);
//     console.log(req.body.nombre);
//     console.log(req.query.web); // para recoger parametros de la url, menos importante! se utiliza con ?
//     console.log(req.params.id); // para recoger parametros de la url espefificados ej: test/id
//     res.status(200).send({ // en formato JSON
//         message: "Hola mundo desde mi API de Node JS"
//     });
// })


//-------------------------------------------------------------------------------------------------------

// rutas backend

app.use('/api', project_routes);


// exportar
module.exports = app;