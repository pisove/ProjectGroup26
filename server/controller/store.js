let express = require('express');
let router = express.Router();
let mongoose = require('mongoose'); // npm i mongoose
// connect with store model
let Store = require('../models/store');
/* CRUD Operation*/

module.exports.displayStoreCatalogue = (req, res, next) => {
    Store.find((err, storeCatalogue) => {
        if (err) {
            return console.error(err);
        }
        else {
            //console.log(storeCatalogue);
            res.render('store/catalogue', {
                title: 'Store Catalogue',
                StoreCatalogue: storeCatalogue
            })
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('store/add', { title: 'Add Item' })
}

module.exports.processAddPage = (req, res, next) => {
    let newItem = Store({
        "name": req.body.name,
        "catagory": req.body.catagory,
        "description": req.body.description,
        "stock": req.body.stock,
        "price": req.body.price
    });
    Store.create(newItem, (err, Store) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/store-catalogue');
        }
    })

}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;
    Store.findById(id, (err, itemToEdit) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('store/edit', { title: 'Edit Item', item: itemToEdit });
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id;
    let updateItem = Store({
        "_id": id,
        "name": req.body.name,
        "catagory": req.body.catagory,
        "description": req.body.description,
        "stock": req.body.stock,
        "price": req.body.price
    });
    Store.updateOne({ _id: id }, updateItem, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/store-catalogue');
        }
    });
}

module.exports.displayDeletePage = (req, res, next) => {
    let id = req.params.id;
    Store.findById(id, (err, itemToEdit) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('store/delete', { title: 'Delete Item', item: itemToEdit });
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;
    Store.deleteOne({ _id: id }, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/store-catalogue');
        }
    });
}
