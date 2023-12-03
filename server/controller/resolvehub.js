let express = require('express');
let router = express.Router();
let mongoose = require('mongoose'); // npm i mongoose
let jwt = require('jsonwebtoken');
// connect with Resolvehub model
let ResolveHub = require('../models/authentaction');
/* CRUD Operation*/

module.exports.displayIncidentList = (req, res, next) => {
    ResolveHub.find((err, resolvehub) => {
        if (err) {
            return console.error(err);
        }
        else {
            //console.log(auth);
            res.render('incident/entries', {
                title: 'ResolveHub',
                ResolveHub: resolvehub,
                displayName: req.user ? req.user.displayName:''
            })
        }
    });
}

module.exports.displayAddPage = (req,res,next)=> {
    res.render('resolvehub/add',{
        title:'Add Incident',
        displayName: req.user ? req.user.displayName:''  
    })
}

module.exports.processAddPage = (req, res, next) => {
    let newItem = resolvehub({
        "issue": req.body.issue,
        "status": req.body.status,
        "description": req.body.description,
        "date": req.body.date,
        "time": req.body.time
    });
    ResolveHub.create(newIncident, (err, resolvehub) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/incident-list');
        }
    })

}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;
    ResolveHub.findById(id, (err, itemToEdit) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('resolvehub/edit',{
                title:'Edit Incident', 
                incident:incidentToEdit,
                displayName: req.user ? req.user.displayName:''
            });
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id;
    let updateItem = resolvehub({
        "_id": id,
        "issue": req.body.issue,
        "status": req.body.status,
        "description": req.body.description,
        "date": req.body.date,
        "time": req.body.time
    });
    ResolveHub.updateOne({ _id: id }, updateincident, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/incident-list');
        }
    });
}

module.exports.displayDeletePage = (req, res, next) => {
    let id = req.params.id;
    ResolveHub.findById(id, (err, itemToEdit) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('incident-list/delete', { title: 'Delete Incident', item: itemToEdit });
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;
    ResolveHub.deleteOne({ _id: id }, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/incident-list');
        }
    });
}
