let express = require('express');
let router = express.Router();
let mongoose = require('mongoose'); // npm i mongoose
let jwt = require('jsonwebtoken');


let ResolveHub = require('../models/authentaction');
let resolvehubController = require('../controller/resolvehub');
/* CRUD Operation*/

function requireAuth(req,res,next)
{
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}



router.get('/',resolvehubController.displayIncidentList);

/* Add Operation */
/* Get route for displaying the Add-Page -- Create Operation */
router.get('/add',requireAuth, resolvehubController.displayAddPage);
/* Post route for processing the Add-Page -- Create Operation */
router.post('/add',requireAuth, resolvehubController.processAddPage);
/* Edit Operation */
/* Get route for displaying the Edit Operation -- Update Operation */
router.get('/edit/:id',requireAuth,resolvehubController.displayEditPage);
/* Post route for displaying the Edit Operation -- Update Operation */
router.post('/edit/:id',requireAuth, resolvehubController.processEditPage);
/* Delete Operation */
/* Get to perform Delete Operation -- Deletion */
router.get('/delete/:id',requireAuth,resolvehubController.performDelete);


module.exports=router;