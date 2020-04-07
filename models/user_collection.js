'use strict'

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var Schema = mongoose.Schema;

var UserSchema = Schema({
    email: {
        type: String,
        unique:true,
        required:true
    },
    password:{
        type: String,
        required:true
    } 
},{
    timestamps: true // para data create and update datetime
});

UserSchema.pre('save', function(next){
    bcrypt.genSalt(10).then(salts=>{
        bcrypt.hash(this.password,salts).then(hash =>{
            this.password = hash;
            next();
        })
    }).catch(error=> next(error))
});

module.exports = mongoose.model('User',UserSchema);