let express = require('express');
let router = express.Router();
let mongoose = require('mongoose'); // npm i mongoose
let jwt = require('jsonwebtoken');
// connect with incident model
let Incident = require('../models/incident');
/* CRUD Operation*/

module.exports.displayIncident = (req, res, next) => {
    Incident.find((err, incident) => {
        if (err) {
            return console.error(err);
        }
        else {
            //console.log(resolvehub);
            res.render('incident/entries', {
                title: 'Incident Management',
                Incident: incident
            })
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('incident/add', { title: 'Add Incident' })
}

module.exports.processAddPage = (req, res, next) => {
    let newItem = Incident({
        "issue": req.body.issue,
        "status": req.body.status,
        "description": req.body.description,
        "date": req.body.date,
        "time": req.body.time
    });
    incident.create(newItem, (err, Incident) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/incident');
        }
    })

}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;
    incident.findById(id, (err, itemToEdit) => {
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
        "issue": req.body.issue,
        "status": req.body.status,
        "description": req.body.description,
        "date": req.body.date,
        "time": req.body.time
    });
    incident.updateOne({ _id: id }, updateItem, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/incident');
        }
    });
}

module.exports.displayDeletePage = (req, res, next) => {
    let id = req.params.id;
    incident.findById(id, (err, itemToEdit) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('incident/delete', { title: 'Delete Incident', item: itemToEdit });
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;
    incident.deleteOne({ _id: id }, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/incident');
        }
    });
}
