let express = require('express');
let router = express.Router();
let mongoose = require('mongoose'); // npm i mongoose
// connect with resolvehub model
let ResolveHub = require('../models/resolvehub');
/* CRUD Operation*/

module.exports.displayResolveHub = (req, res, next) => {
    ResolveHub.find((err, resolvehub) => {
        if (err) {
            return console.error(err);
        }
        else {
            //console.log(resolvehub);
            res.render('resolvehub/entries', {
                title: 'ResolveHub',
                ResolveHub: resolvehub
            })
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('resolvehub/add', { title: 'Add Item' })
}

module.exports.processAddPage = (req, res, next) => {
    let newItem = ResolveHub({
        "issue": req.body.issue,
        "status": req.body.status,
        "description": req.body.description,
        "date": req.body.date,
        "time": req.body.time
    });
    ResolveHub.create(newItem, (err, lazySocial) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/lazySocial');
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
            res.render('resolvehub/edit', { title: 'Edit Item', item: itemToEdit });
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id;
    let updateItem = ResolveHub({
        "_id": id,
        "issue": req.body.issue,
        "status": req.body.stutas,
        "description": req.body.description,
        "date": req.body.date,
        "time": req.body.time
    });
    ResolveHub.updateOne({ _id: id }, updateItem, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/resolvehub');
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
            res.render('resolvehub/delete', { title: 'Delete Item', item: itemToEdit });
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
            res.redirect('/resolvehub');
        }
    });
}
