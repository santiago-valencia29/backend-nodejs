'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    email: String,
    password: String
},{
    timestamps: true // para data create and update datetime
});

module.exports = mongoose.model('User',UserSchema);