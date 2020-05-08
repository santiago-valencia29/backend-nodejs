'use strict'

// heroku login develop

//  git status
//  git add .
//  git commit -am "make it better"
//  git push heroku master

//conexión a bdmongo
var CONFIG = require('./config')
var mongoose = require('mongoose');
var app = require('./app');
// var port = 3700
var SocketIO = require('socket.io');

// 


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
            const server = app.listen(app.get('port'), ()=>{
                console.log("Servidor corriendo correctamente en la url: localhost:",app.get('port') )
            });


            //config socket-io
            const io = SocketIO.listen(server);
            io.on('connection',(socket)=>{
                console.log('new connection socket', socket.id); // id por browser
                socket.on('chat:message',(data)=>{
                    console.log(data);
                    io.sockets.emit('chat:message',data);
                });

                socket.on('chat:typing',(data)=>{
                   socket.broadcast.emit('chat:typing',data);      //emitir a todos excepto a mi
                });
            });
                    //
        })
        .catch(err => console.log(err));



