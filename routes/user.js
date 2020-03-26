'use strict'

var express = require('express');
var UserController = require('../controllers/user');


var router = express.Router();



// router.get('/home', ProjectController.home);

router.post('/User', (req, res)=>{
    res.send('hola Santi');
    console.log(req.body)
});

router.post('/signup', UserController.signUp);
router.post('/signin', UserController.signIn);


module.exports = router;