'use strict'

var User = require('../models/user_collection');
var jwt = require('jsonwebtoken');


var controller = {

    signUp: async(req, res) => { //asyn para metodo asyncrono
        var user = new User();
        
        var params = req.body;
        user.email = params.email;
        user.password = params.password; //hay que encriptar la contraseña, cifrarlo
        // console.log(user);
        await user.save(); //metodo asyncrono,  await para continuar con el proceso del servidor sin que interrumpa
        
        var token = jwt.sign({_id: user._id}, 'secretkey')  // libreria jwt  estructura parametros: objeto- secretkey es la variable de entorno, opciones de cuanto dura el token
        
        res.status(200).json({token});
        
    },
    signIn: async(req,res) => {

        var {email, password} = req.body;
        const user = await User.findOne({email}); //buscar correo en la collection

        if (!user) return res.status(401).send("The email doesn't exists");
        if(user.password !== password) return res.status(401).send("Wrong Password");  //cifrar password convertirlo e igualarlo
        
        var token = jwt.sign({_id: user._id}, 'secretkey');
        return res.status(200).json({token});


    }
};

module.exports = controller;