'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ClienteSchema = Schema({
    estado: {
        type: String,
        required: true
    },
    nombre_proyecto: {
        type: String,
        required: true
    },
    cedula: {
        type: String,
        required: false
    },
    nombres_apellidos: {
        type: String,
        required: true
    },
    telefono: {
        type: Number,
        required: false
    },
    celular: {
        type: Number,
        required: false
    },
    correo: {
        type: String,
        required: false
    },
    ciudad: {
        type: String,
        required: true
    },
    sector: {
        type: String,
        required: false
    },
    direccion: {
        type: String,
        required: false
    },
    correo: {
        type: String,
        required: false
    },
    medidas: {
        type: String,
        required: false
    },
    color_madekor_REL: {
        type: String,
        required: false
    },
    color_combinado_REL: {
        type: String,
        required: false
    },
    precio: {
        type: Number,
        required: false
    },
    fecha_inicio_proyecto: {
        type: String,
        required: false
    },
    fecha_entrega_proyecto: {
        type: String,
        required: false
    },
    fecha_garantia_proyecto: {
        type: String,
        required: false
    },
    desc_garantia: {
        type: String,
        required: false
    }
}, {
    timestamps: true // para data create and update datetime
});

module.exports = mongoose.model('Cliente', ClienteSchema);