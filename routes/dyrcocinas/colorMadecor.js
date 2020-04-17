'use strict'

var express = require('express');
var ColorMadecorController = require('../../controllers/dyrcocinas/colorMadecor');


var router = express.Router();


router.post('/save-colorMadecor', ColorMadecorController.saveColorMadecor);
router.get('/colorMadecor/:id?',ColorMadecorController.getColorMadecor);
router.get('/colorMadecors',ColorMadecorController.getColorMadecors);
router.put('/colorMadecor/:id',ColorMadecorController.updateColorMadecor);
router.delete('/colorMadecor/:id',ColorMadecorController.deleteColorMadecor);


module.exports = router;