'use strict'

var Personal = require('../models/personal_collection');



var controller = {
    savePersonal: function (req, res) {
        var personal = new Personal();

        var params = req.body;
        personal.documento = params.documento;
        personal.nombres_apellidos = params.nombres_apellidos;
        personal.fecha_inicio = params.fecha_inicio;
        personal.fecha_fin = params.fecha_fin;
        personal.h_inicio_turno = params.h_inicio_turno;
        personal.h_fin_turno = params.h_fin_turno;
        personal.h_inicio_h_extra = params.h_inicio_h_extra;
        personal.h_fin_h_extra = params.h_fin_h_extra;
        personal.motivo_hora_extra = params.motivo_hora_extra;


        personal.save((err, personalStored) => {
            if (err) return res.status(500).send({
                message: 'Error al guardar el documento'
            });

            if (!personalStored) return res.status(404).send({ message: 'No se ha podido guardar el personal.' });

            return res.status(200).send({ personal: personalStored });
        });
  
    },
    getPersonal: function(req, res){
        Personal.find({}).exec((err, personal) => { 

            if (err) return res.status(500).send({
                message: 'Error al devolver los datos'
            });

            if (!personal) return res.status(404).send({
                message: 'No hay datos'
            });

            return res.status(200).send({
                personal
            });
        });

    }
}

module.exports = controller;