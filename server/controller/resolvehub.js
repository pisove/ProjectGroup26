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
                title: 'Lazy Social',
                ResolveHub: resolvehub
            })
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('resolvehub/add', { title: 'Add Item' })
}

module.exports.processAddPage = (req, res, next) => {
    let newItem = lazySocial({
        "name": req.body.name,
        "catagory": req.body.catagory,
        "description": req.body.description,
        "stock": req.body.stock,
        "price": req.body.price
    });
    lazySocial.create(newItem, (err, lazySocial) => {
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
    lazySocial.findById(id, (err, itemToEdit) => {
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
    let updateItem = lazySocial({
        "_id": id,
        "name": req.body.name,
        "catagory": req.body.catagory,
        "description": req.body.description,
        "stock": req.body.stock,
        "price": req.body.price
    });
    lazySocial.updateOne({ _id: id }, updateItem, (err) => {
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
    lazySocial.findById(id, (err, itemToEdit) => {
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
    lazySocial.deleteOne({ _id: id }, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/resolvehub');
        }
    });
}
