let express = require('express');
let router = express.Router();
let mongoose = require('mongoose'); // npm i mongoose
let jwt = require('jsonwebtoken');


let Incident = require('../models/incidents');
let incidentController = require('../controller/incident');
/* CRUD Operation*/

function requireAuth(req,res,next)
{
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}



router.get('/',incidentController.displayIncidentList);

/* Add Operation */
/* Get route for displaying the Add-Page -- Create Operation */
router.get('/add',requireAuth, incidentController.displayAddPage);
/* Post route for processing the Add-Page -- Create Operation */
router.post('/add',requireAuth, incidentController.processAddPage);
/* Edit Operation */
/* Get route for displaying the Edit Operation -- Update Operation */
router.get('/edit/:id',requireAuth,incidentController.displayEditPage);
/* Post route for displaying the Edit Operation -- Update Operation */
router.post('/edit/:id',requireAuth, incidentController.processEditPage);
/* Delete Operation */
/* Get to perform Delete Operation -- Deletion */
router.get('/delete/:id',requireAuth,incidentController.performDelete);


module.exports=router;