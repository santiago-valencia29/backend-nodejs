'use strict'

var Ferreteria = require('../../models/dyrcocinas/ferreteria_collection');


var controller = {

    saveFerreteria: function (req, res) {
        var ferreteria = new Ferreteria();

        var params = req.body;
        ferreteria.nombre = params.nombre;
        ferreteria.precio = params.precio;
        ferreteria.proveedor = params.proveedor;
        ferreteria.descripcion = params.descripcion;
        // if (JSON.stringify(req.body)=='{}'){      PARA CONTROLAR SI EL BODY LLEGA VACIO
        //     console.log("esta vacio")
        // }

        ferreteria.save((err, ferreteriaStored) => {
            if (err) return res.status(500).send({
                message: err
            });

            if (!ferreteriaStored) return res.status(404).send({ message: 'No se ha podido guardar la ferretería' });

            return res.status(200).send({ ferreteria: ferreteriaStored });
        });
    },

    getFerreteria: function (req, res) {
        var ferreteriatId = req.params.id;
        //metodos moongose
        if (ferreteriatId == null) return res.status(404).send({
            message: 'La ferretería no existe'
        });

        Ferreteria.findById(ferreteriatId, (err, ferreteria) => {

            if (err) return res.status(500).send({
                message: 'Error al devolver los datos'
            });

            if (!ferreteria) return res.status(404).send({
                message: 'La ferretería no existe'
            });

            return res.status(200).send({
                ferreteria
            });
        });

    },

    getFerreterias: function (req, res) {
        Ferreteria.find({}).exec((err, ferreterias) => { 

            if (err) return res.status(500).send({
                message: 'Error al devolver los datos'
            });

            if (!ferreterias) return res.status(404).send({
                message: 'No hay Ferreterias'
            });

            return res.status(200).send({
                ferreterias
            });
        });
    },

    updateFerreteria: function (req, res) {
        var ferreteriatId = req.params.id;
        var update = req.body;

        Ferreteria.findByIdAndUpdate(ferreteriatId, update, {new:true}, (err, ferreteriaUpdated) => {
            if (err) return res.status(500).send({
                message: 'Error al actualizar'
            });

            if (!ferreteriaUpdated) return res.status(404).send({
                message: 'No existe la ferreteria para actualizar'
            });

            return res.status(200).send({
                ferreteria: ferreteriaUpdated
            })
        });
    },

    deleteFerreteria: function (req, res) {
        var ferreteriatId = req.params.id;
        Ferreteria.findByIdAndRemove(ferreteriatId, (err, ferreteriaRemoved) => {

            if (err) return res.status(500).send({
                message: 'No se ha podido borrar la ferreteria'
            });
            if (!ferreteriaRemoved) return res.status(404).send({
                message: 'No se puede eliminar esa ferreteria'
            });
            return res.status(200).send({
                ferreteria: ferreteriaRemoved
            })
        });
    }

};

module.exports = controller;