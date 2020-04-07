'use strict'

var express = require('express');
var UserController = require('../controllers/user');
var jwt = require('jsonwebtoken');
var CONFIG = require('../config')


var router = express.Router();



// router.get('/home', ProjectController.home);

router.post('/User', (req, res)=>{ // sin usar controller, ejemplo
    res.send('hola Santi');
    console.log(req.body)
});

router.get('/tasks',(req, res)=>{  // datos publicos
    res.json([
        {
            _id:1,
            name: 'Task one',
            description : 'lorep ipsum',
            date: "2019-11-17t20_39_05"

        },
        {
            _id:2,
            name: 'Task one',
            description : 'lorep ipsum',
            date: "2019-11-17t20_39_05"

        },
        {
            _id:3,
            name: 'Task one',
            description : 'lorep ipsum',
            date: "2019-11-17t20_39_05"

        }
    ])
});

router.get('/private-tasks', verifyToken, (req,res)=>{ // datos privados con veryToken
    res.json([
        {
            _id:1,
            name: 'Task one',
            description : 'lorep ipsum',
            date: "2019-11-17t20_39_05"

        },
        {
            _id:2,
            name: 'Task one',
            description : 'lorep ipsum',
            date: "2019-11-17t20_39_05"

        },
        {
            _id:3,
            name: 'Task one',
            description : 'lorep ipsum',
            date: "2019-11-17t20_39_05"

        }
    ])
});

router.get('/profile', verifyToken,(req, res) => {
    res.send(req.userId);
});

//manejo de token:
router.post('/signup', UserController.signUp); // usando controller
router.post('/signin', UserController.signIn);


module.exports = router;

function verifyToken(req, res, next){
    // console.log(req.headers.authorization) //en los headers postman autorization y en el value la palabra Bearer y el  token
    if (!req.headers.authorization){
        return res.status(401).send('Unthorize Request');
    };

    var token = req.headers.authorization.split(' ')[1]; //falta si el token es valido

    if (token === 'null'){
        return res.status(401).send('Unthorize Request');
    };

    var payload = jwt.verify(token, CONFIG.SECRET_TOKEN);
    // console.log(payload);

    req.userId = payload._id;
    next(); // simplemente continuar


}