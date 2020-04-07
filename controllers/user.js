'use strict'

var User = require('../models/user_collection');
var bcrypt= require('bcrypt');
var jwt = require('jsonwebtoken');
var CONFIG = require('..//config')


var controller = {

    signUp: async(req, res) => { //asyn para metodo asyncrono
        var user = new User();
        
        var params = req.body;
        user.email = params.email;
        user.password = params.password; //hay que encriptar la contraseña, cifrarlo
        // console.log(user);
        await user.save(); //metodo asyncrono,  await para continuar con el proceso del servidor sin que interrumpa
        
        var token = jwt.sign({_id: user._id}, CONFIG.SECRET_TOKEN)  // libreria jwt  estructura parametros: objeto- secretkey es la variable de entorno, opciones de cuanto dura el token
        
        res.status(200).json({token});
        
    },
    signIn: async(req,res) => {

        var {email, password} = req.body;
        const user = await User.findOne({email}); //buscar correo en la collection

        if (!user) return res.status(401).send("The email doesn't exists");

        bcrypt.compare(password, user.password) //encriptación comparar
            .then(match=>{
                if(match){ //acceso
                    var token = jwt.sign({_id: user._id}, CONFIG.SECRET_TOKEN);
                    return res.status(200).json({token});
                }
                return res.status(401).send("Wrong Password"); // No acceso

            }).catch(error=>{
                console.log(error)
                res.status(500).send({error})
            });
    }
};

module.exports = controller;