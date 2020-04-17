'use strict'

var express = require('express');
var FerreteriaController = require('../../controllers/dyrcocinas/ferreteria');


var router = express.Router();


router.post('/save-ferreteria', FerreteriaController.saveFerreteria);
router.get('/ferreteria/:id?',FerreteriaController.getFerreteria);
router.get('/ferreterias',FerreteriaController.getFerreterias);
router.put('/ferreteria/:id',FerreteriaController.updateFerreteria);
router.delete('/ferreteria/:id',FerreteriaController.deleteFerreteria);


module.exports = router;