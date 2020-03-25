'use strict'

var User = require('../models/user_collection');


var controller = {

    signUp: async(req, res) => { //asyn para metodo asyncrono
        var user = new User();
        
        var params = req.body;
        user.email = params.email;
        user.password = params.password;
        // console.log(user);
        await user.save(); //metodo asyncrono,  await para continuar con el proceso del servidor sin que interrumpa
        res.send('Testing signUp')
    }
};

module.exports = controller;