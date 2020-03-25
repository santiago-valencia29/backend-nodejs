'use strict'

var Project = require('../models/project_collection');

var fs = require('fs') // para el archivo

var controller = {

    home: function (req, res) {
        return res.status(200).send({
            message: 'Soy la home'
        });
    },

    test: function (req, res) {
        return res.status(200).send({
            message: "Soy el metodo o funcion test del controlador de project"
        });
    },

    saveProject: function (req, res) {
        var project = new Project();

        var params = req.body;
        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.year = params.year;
        project.langs = params.langs;
        project.image = null;

        // if (JSON.stringify(req.body)=='{}'){      PARA CONTROLAR SI EL BODY LLEGA VACIO
        //     console.log("esta vacio")
        // }

        project.save((err, projectStored) => {
            if (err) return res.status(500).send({
                message: 'Error al guardar el documento'
            });

            if (!projectStored) return res.status(404).send({ message: 'No se ha podido guardar el proyecto.' });

            return res.status(200).send({ project: projectStored });
        });
    },

    getProject: function (req, res) {
        var projectId = req.params.id;
        //metodos moongose
        if (projectId == null) return res.status(404).send({
            message: 'El proyecto no existe'
        });

        Project.findById(projectId, (err, project) => {

            if (err) return res.status(500).send({
                message: 'Error al devolver los datos'
            });

            if (!project) return res.status(404).send({
                message: 'El proyecto no existe'
            });

            return res.status(200).send({
                project
            });
        });

    },

    getProjects: function (req, res) {
        // Project.find({year:2019})  // me trae todos los proyectos donde el año sea 2019
        Project.find({}).sort('-year').exec((err, projects) => { // el año de mayor a menor

            if (err) return res.status(500).send({
                message: 'Error al devolver los datos'
            });

            if (!projects) return res.status(404).send({
                message: 'No hay proyectos'
            });

            return res.status(200).send({
                projects
            });
        });
    },

    updateProject: function (req, res) {
        var projectId = req.params.id;
        var update = req.body;

        Project.findByIdAndUpdate(projectId, update, {new:true}, (err, projectUpdated) => {
            if (err) return res.status(500).send({
                message: 'Error al actualizar'
            });

            if (!projectUpdated) return res.status(404).send({
                message: 'No existe el proyecto para actualizar'
            });

            return res.status(200).send({
                project: projectUpdated
            })
        });
    },

    deleteProject: function (req, res) {
        var projectId = req.params.id;
        Project.findByIdAndRemove(projectId, (err, projectRemoved) => {

            if (err) return res.status(500).send({
                message: 'No se ha podido borrar el proyecto'
            });
            if (!projectRemoved) return res.status(404).send({
                message: 'No se puede eliminar ese proyecto'
            });
            return res.status(200).send({
                project: projectRemoved
            })
        });
    },

    uploadImage: function(req, res){
        var projectId = req.params.id;
        var fileName = 'Imagen no subida';

        if (req.files) {

            var filePath = req.files.image.path;
            var fileSplit = filePath.split('\\');
            var fileName = fileSplit[1];
            var extSplit = fileName.split('\.');
            var fileExt = extSplit[1];

            if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){


            Project.findByIdAndUpdate(projectId,{image: fileName},{new:true},(err,projectUpdated)=>{
                if (err) return res.status(500).send({
                    message:'la imagen no se subido'
                });
                if (!projectUpdated) return res.status(404).send({
                    message:'El proyecto no existe y no se ha asignado la imagen'
                });

                return res.status(200).send({
                    project:projectUpdated
                });
               
            });
        }else{

            fs.unlink(filePath,(err)=>{
                return res.status(200).send({message: 'La extensión no es válida'});
            });

        }
        } else {
            return res.status(200).send({
                files: fileName
            })
        }
    }

};

module.exports = controller;