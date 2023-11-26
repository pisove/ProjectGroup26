let express = require('express');
let router = express.Router();
let mongoose = require('mongoose'); // npm i mongoose
// connect with incident model
let Incident = require('../models/incident');
/* CRUD Operation*/

module.exports.displayIncidentCatalogue = (req, res, next) => {
    Incident.find((err, incidentCatalogue) => {
        if (err) {
            return console.error(err);
        }
        else {
            //console.log(incidentCatalogue);
            res.render('incident/catalogue', {
                title: 'Incident Management',
                IncidentCatalogue: incidentCatalogue
            })
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('incident/add', { title: 'Add Item' })
}

module.exports.processAddPage = (req, res, next) => {
    let newItem = Incident({
        "name": req.body.name,
        "catagory": req.body.catagory,
        "description": req.body.description,
        "stock": req.body.stock,
        "price": req.body.price
    });
    Incident.create(newItem, (err, Incident) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/incident-catalogue');
        }
    })

}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;
    Incident.findById(id, (err, itemToEdit) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('incident/edit', { title: 'Edit Item', item: itemToEdit });
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id;
    let updateItem = Incident({
        "_id": id,
        "name": req.body.name,
        "catagory": req.body.catagory,
        "description": req.body.description,
        "stock": req.body.stock,
        "price": req.body.price
    });
    Incident.updateOne({ _id: id }, updateItem, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/incident-catalogue');
        }
    });
}

module.exports.displayDeletePage = (req, res, next) => {
    let id = req.params.id;
    Incident.findById(id, (err, itemToEdit) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('incident/delete', { title: 'Delete Item', item: itemToEdit });
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;
    Incident.deleteOne({ _id: id }, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/incident-catalogue');
        }
    });
}
