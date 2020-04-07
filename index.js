'use strict'

// Para subir al servidor Heraku

// heroku login

//  git status
//  git add .
//  git commit -am "make it better"
//  git push heroku master

//conexión a bdmongo
var CONFIG = require('./config')
var mongoose = require('mongoose');
var app = require('./app');
// var port = 3700

mongoose.Promise = global.Promise;

mongoose.connect(CONFIG.DB,{
    keepAlive: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    // useUnifiedTopology: true  // comentado para producción
  })
        .then(()=>{
            console.log("conexion a la base de datos establecida");

            // Creación del servidor
            app.listen(app.get('port'), ()=>{
                console.log("Servidor corriendo correctamente en la url: localhost:",app.get('port') )
            });
        })
        .catch(err => console.log(err));

