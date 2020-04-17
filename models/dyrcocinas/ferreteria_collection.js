'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var FerreteriaSchema = Schema({
    nombre:{
        type:String,
        unique:true,
        required:true
    },
    precio:{
        type:Number,
        required:false
    },
    proveedor:{
        type: String,
        require: false
    },
    descripcion: {
        type: String,
        required:false
    }
    
},{
    timestamps: true // para data create and update datetime
});

module.exports = mongoose.model('Ferreteria',FerreteriaSchema);