let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//connect with incident model

let incident = require('../models/incident');
let incidentController = require('../controller/incident');

/*show catalogue page*/
router.get('/', incidentController.displayIncident);

/*show add item page*/
router.get('/add', incidentController.displayAddPage);

/*add item operation*/
router.post('/add', incidentController.processAddPage);

/*show edit item page*/
router.get('/edit/:id', incidentController.displayEditPage);

/*update item operation*/
router.post('/edit/:id', incidentController.processEditPage);

/*show delete confirmation*/
router.get('/delete/:id', incidentController.displayDeletePage)

/*delete item operation*/
router.post('/delete/:id', incidentController.performDelete);

module.exports = router;

