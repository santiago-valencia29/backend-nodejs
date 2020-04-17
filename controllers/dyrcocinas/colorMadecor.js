'use strict'

var ColorMadecor = require('../../models/dyrcocinas/colorMadecor_collection');


var controller = {

    saveColorMadecor: function (req, res) {
        var colorMadecor = new ColorMadecor();

        var params = req.body;
        colorMadecor.nombre = params.nombre;
        colorMadecor.precio = params.precio;
        colorMadecor.proveedor = params.proveedor;
        colorMadecor.descripcion = params.descripcion;
        // if (JSON.stringify(req.body)=='{}'){      PARA CONTROLAR SI EL BODY LLEGA VACIO
        //     console.log("esta vacio")
        // }

        colorMadecor.save((err, colorMadecorStored) => {
            if (err) return res.status(500).send({
                message: err
            });

            if (!colorMadecorStored) return res.status(404).send({ message: 'No se ha podido guardar colorMadecor' });

            return res.status(200).send({ colorMadecor: colorMadecorStored });
        });
    },

    getColorMadecor: function (req, res) {
        var colorMadecortId = req.params.id;
        //metodos moongose
        if (colorMadecortId == null) return res.status(404).send({
            message: 'La ferretería no existe'
        });

        ColorMadecor.findById(colorMadecortId, (err, colorMadecor) => {

            if (err) return res.status(500).send({
                message: 'Error al devolver los datos'
            });

            if (!colorMadecor) return res.status(404).send({
                message: 'colorMadecor no existe'
            });

            return res.status(200).send({
                colorMadecor
            });
        });

    },

    getColorMadecors: function (req, res) {
        ColorMadecor.find({}).exec((err, colorMadecors) => { 

            if (err) return res.status(500).send({
                message: 'Error al devolver los datos'
            });

            if (!colorMadecors) return res.status(404).send({
                message: 'No hay ColorMadecors'
            });

            return res.status(200).send({
                colorMadecors
            });
        });
    },

    updateColorMadecor: function (req, res) {
        var colorMadecortId = req.params.id;
        var update = req.body;

        ColorMadecor.findByIdAndUpdate(colorMadecortId, update, {new:true}, (err, colorMadecorUpdated) => {
            if (err) return res.status(500).send({
                message: 'Error al actualizar'
            });

            if (!colorMadecorUpdated) return res.status(404).send({
                message: 'No existe la colorMadecor para actualizar'
            });

            return res.status(200).send({
                colorMadecor: colorMadecorUpdated
            })
        });
    },

    deleteColorMadecor: function (req, res) {
        var colorMadecortId = req.params.id;
        ColorMadecor.findByIdAndRemove(colorMadecortId, (err, colorMadecorRemoved) => {

            if (err) return res.status(500).send({
                message: 'No se ha podido borrar la colorMadecor'
            });
            if (!colorMadecorRemoved) return res.status(404).send({
                message: 'No se puede eliminar esa colorMadecor'
            });
            return res.status(200).send({
                colorMadecor: colorMadecorRemoved
            })
        });
    }

};

module.exports = controller;