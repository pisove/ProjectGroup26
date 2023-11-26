let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//connect with report model

let report = require('../models/report');
let reportController = require('../controller/report');

/*show catalogue page*/
router.get('/', reportController.displayIncidentReport);

/*show item page*/
router.get('/add', reportController.displayAddPage);

/*add item operation*/
router.post('/add', reportController.processAddPage);

/*show edit item page*/
router.get('/edit/:id', reportController.displayEditPage);

/*update item operation*/
router.post('/edit/:id', reportController.processEditPage);

/*show delete confirmation*/
router.get('/delete/:id', reportController.displayDeletePage)

/*delete item operation*/
router.post('/delete/:id', reportController.performDelete);

module.exports = router;

