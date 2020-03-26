'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PersonalSchema = Schema({
    documento: Number,
    nombres_apellidos: String,
    fecha_inicio: String,
    fecha_fin: String,
    h_inicio_turno: String,
    h_fin_turno:String,
    h_inicio_h_extra: String,
    h_fin_h_extra: String,
    motivo_hora_extra: String
});

module.exports = mongoose.model('Personal',PersonalSchema);