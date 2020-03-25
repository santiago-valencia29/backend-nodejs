'use strict'

// Para subir al servidor Heraku

// heraku login

//  git status
//  git add .
//  git commit -am "make it better"
//  git push heroku master

//conexión a bdmongo

var mongoose = require('mongoose');
var app = require('./app');
// var port = 3700

mongoose.Promise = global.Promise;
//  para base se datos local ... mongoose.connect('mongodb://localhost:27017/portafolio',{ useUnifiedTopology: true ,  useNewUrlParser: true})   // para probar http://localhost:3000/api/home
mongoose.connect('mongodb+srv://dbSantiago:santti9312@santiagocluster-vrusr.mongodb.net/portafolio?retryWrites=true&w=majority',{
    keepAlive: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true  // comentado para producción
  })
        .then(()=>{
            console.log("conexion a la base de datos establecida");

            // Creación del servidor
            app.listen(app.get('port'), ()=>{
                console.log("Servidor corriendo correctamente en la url: localhost:",app.get('port') )
            });
        })
        .catch(err => console.log(err));

