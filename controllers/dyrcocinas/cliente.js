'use strict'

var Cliente = require('../../models/dyrcocinas/cliente_collection');


var controller = {

    saveCliente: function (req, res) {
        var cliente = new Cliente();

        var params = req.body;
        cliente.estado = params.estado;
        cliente.nombre_proyecto = params.nombre_proyecto;
        cliente.cedula = params.cedula;
        cliente.nombres_apellidos = params.nombres_apellidos;
        cliente.telefono = params.telefono;
        cliente.celular = params.celular;
        cliente.ciudad = params.ciudad;
        cliente.sector = params.sector;
        cliente.direccion = params.direccion;
        cliente.medidas = params.medidas;
        cliente.color_madekor_REL = params.color_madekor_REL;
        cliente.color_combinado_REL = params.color_combinado_REL;
        cliente.precio = params.precio;
        cliente.anticipo_70 = params.anticipo_70;
        cliente.resta_cliente = params.resta_cliente;
        cliente.fecha_inicio_proyecto = params.fecha_inicio_proyecto;
        cliente.fecha_entrega_proyecto = params.fecha_entrega_proyecto;
        cliente.fecha_garantia_proyecto = params.fecha_garantia_proyecto;
        cliente.desc_garantia = params.desc_garantia;
        // if (JSON.stringify(req.body)=='{}'){      PARA CONTROLAR SI EL BODY LLEGA VACIO
        //     console.log("esta vacio")
        // }

        cliente.save((err, clienteStored) => {
            if (err) return res.status(500).send({
                message: err
            });

            if (!clienteStored) return res.status(404).send({ message: 'No se ha podido guardar el cliente.' });

            return res.status(200).send({ cliente: clienteStored });
        });
    },

    getCliente: function (req, res) {
        var clientetId = req.params.id;
        //metodos moongose
        if (clientetId == null) return res.status(404).send({
            message: 'El proyecto no existe'
        });

        Cliente.findById(clientetId, (err, cliente) => {

            if (err) return res.status(500).send({
                message: 'Error al devolver los datos'
            });

            if (!cliente) return res.status(404).send({
                message: 'El cliente no existe'
            });

            return res.status(200).send({
                cliente
            });
        });

    },

    getClientes: function (req, res) {
        // Project.find({year:2019})  // me trae todos los proyectos donde el año sea 2019
        Cliente.find({}).exec((err, clientes) => { // el año de mayor a menor

            if (err) return res.status(500).send({
                message: 'Error al devolver los datos'
            });

            if (!clientes) return res.status(404).send({
                message: 'No hay clientes'
            });

            return res.status(200).send({
                clientes
            });
        });
    },

    updateCliente: function (req, res) {
        var clienteId = req.params.id;
        var update = req.body;

        Cliente.findByIdAndUpdate(clienteId, update, {new:true}, (err, clienteUpdated) => {
            if (err) return res.status(500).send({
                message: 'Error al actualizar'
            });

            if (!clienteUpdated) return res.status(404).send({
                message: 'No existe el cliente para actualizar'
            });

            return res.status(200).send({
                project: clienteUpdated
            })
        });
    },

    deleteCliente: function (req, res) {
        var clienteId = req.params.id;
        Cliente.findByIdAndRemove(clienteId, (err, clienteRemoved) => {

            if (err) return res.status(500).send({
                message: 'No se ha podido borrar el cliente'
            });
            if (!clienteRemoved) return res.status(404).send({
                message: 'No se puede eliminar ese cliente'
            });
            return res.status(200).send({
                project: clienteRemoved
            })
        });
    }

};

module.exports = controller;