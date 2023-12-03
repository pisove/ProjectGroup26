let express = require('express');
let router = express.Router();
let mongoose = require('mongoose'); // npm i mongoose
let jwt = require('jsonwebtoken');
// connect with Incident model
let Incident = require('../models/incidents');
/* CRUD Operation*/

module.exports.displayIncidentList = (req,res,next)=>{
    Incident.find((err, incidentlist)=>{
        if (err) {
            return console.error(err); 
        }
        else {
            res.render('incidents/list',{
                title:'Incidents', 
                Incidentlist: incidentlist,
                displayName: req.user ? req.user.displayName:''  
            }) 
        }
    });
}

module.exports.displayAddPage = (req,res,next)=> {
    res.render('incidents/add',{
        title:'Add Incident',
        displayName: req.user ? req.user.displayName:''  
    })
}

module.exports.processAddPage = (req,res,next)=> {
    let newIncident = Incident ({
        "name":req.body.name,
        "userName":req.body.userName,
        "description": req.body.description,
        "email":req.body.email,
        "number":req.body.number
    });
    Incident.create(newIncident,(err,Incident) => {
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
    Incident.findById(id, (err, incidentToEdit) =>{
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('incidents/edit',{
                title:'Edit Incident', 
                incident:incidentToEdit,
                displayName: req.user ? req.user.displayName:''
            });
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id;
    let updateIncident = Incident({
        "_id": id,
        "name": req.body.name,
        "userName": req.body.userName,
        "description": req.body.description,
        "email": req.body.email,
        "number": req.body.number
    });
    Incident.updateOne({_id: id},updateIncident, (err) =>{
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
    Incident.findById(id, (err, incidentToEdit) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('incident-list/delete', { title: 'Delete Item', item: incidentToEdit });
        }
    });
}

module.exports.performDelete = (req,res,next)=> {
    let id =req.params.id;
    Incident.deleteOne({_id: id}, (err) => {
        if(err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/incident-list');
        }
    });
}