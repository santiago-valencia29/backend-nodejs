'use strict'

var express = require('express');
var PersonalController = require('../controllers/personal');


var router = express.Router();


router.post('/save-personal', PersonalController.savePersonal);
router.get('/personal',PersonalController.getPersonal);





module.exports = router;