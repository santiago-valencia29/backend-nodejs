'use strict'


//conexión a bdmongo

var mongoose = require('mongoose');
var app = require('./app');
// var port = 3700

mongoose.Promise = global.Promise;
//  para base se datos local ... mongoose.connect('mongodb://localhost:27017/portafolio',{ useUnifiedTopology: true ,  useNewUrlParser: true})
mongoose.connect('mongodb+srv://dbSantiago:santti9312@santiagocluster-vrusr.mongodb.net/portafolio?retryWrites=true&w=majority',{
    keepAlive: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
    // useUnifiedTopology: true 
  })
        .then(()=>{
            console.log("conexion a la base de datos establecida");

            // Creación del servidor
            app.listen(app.get('port'), ()=>{
                console.log("Servidor corriendo correctamente en la url: localhost:",app.get('port') )
            });
        })
        .catch(err => console.log(err));

