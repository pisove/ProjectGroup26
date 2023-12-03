let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//connect with resolve model

let resolvehub = require('../models/resolvehub');
let resolvehubController = require('../controller/resolvehub');

/*show resolvehub page*/
router.get('/', resolvehubController.displayLazysocial);

/*show add item page*/
router.get('/add', resolvehubController.displayAddPage);

/*add item operation*/
router.post('/add', resolvehubController.processAddPage);

/*show edit item page*/
router.get('/edit/:id', resolvehubController.displayEditPage);

/*update item operation*/
router.post('/edit/:id', resolvehubController.processEditPage);

/*show delete confirmation*/
router.get('/delete/:id', resolvehubController.displayDeletePage)

/*delete item operation*/
router.post('/delete/:id', resolvehubController.performDelete);

module.exports = router;

