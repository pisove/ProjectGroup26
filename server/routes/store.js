let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//connect with store model

let store = require('../models/store');
let storeController = require('../controller/store');

/*show catalogue page*/
router.get('/', storeController.displayStoreCatalogue);

/*show add item page*/
router.get('/add', storeController.displayAddPage);

/*add item operation*/
router.post('/add', storeController.processAddPage);

/*show edit item page*/
router.get('/edit/:id', storeController.displayEditPage);

/*update item operation*/
router.post('/edit/:id', storeController.processEditPage);

/*show delete confirmation*/
router.get('/delete/:id', storeController.displayDeletePage)

/*delete item operation*/
router.post('/delete/:id', storeController.performDelete);

module.exports = router;

