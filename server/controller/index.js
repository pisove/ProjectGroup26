let express = require('express');
const passport = require('passport');
let router = express.Router();
let jwt = require('jsonwebtoken');
let DB = require('../config/db');
let Speakeasy = require("speakeasy")
let QRCode = require('qrcode')

let userModel = require('../models/user');
let User = userModel.User;

module.exports.displayHomePage = (req, res, next)=>{
    res.render('index', { 
        title: 'Home',
        displayName: req.user ? req.user.displayName:''    
    });
}

module.exports.displayLoginPage = (req, res,next) => {
    if (!req.user)
    {
        res.render('auth/login',
        {
            title: 'Login',
            message: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName: ''
        })
    }
    else
    {
        return res.redirect('/')
    }
}
module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local',(err,user, info)=>
    {
        // server error
        if(err)
        {
            return next(err);
        }
        // is a login error
        if(!user || user.secret && !Speakeasy.totp.verify({
            secret: user.secret,
            encoding: "base32",
            token: req.body.token,
            window: 0}))
        {
            req.flash('loginMessage',
            'AuthenticationError');
            return res.redirect('/login');
        }
        req.login(user,(err) => {
            if(err)
            {
                return next(err)
            }
            const payload = 
            {
                id: user._id,
                displayName: user.displayName,
                username: user.username,
                email: user.email
            }

            const authToken = jwt.sign(payload, DB.secret, {
                expiresIn: 604800 // 1 week
            });

            // TODO - Getting Ready to convert to API
            return res.redirect('/friend-list')
        });
    })(req,res,next)
}

module.exports.displayRegisterPage = (req,res,next)=>{
    // check if the user is not already logged in 
    if(!req.user)
    {
        res.render('auth/register',
            {
                title: 'Register',
                message: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName: '',
                secret: Speakeasy.generateSecret({length:20}).base32
            })
    }
    else
    {
        return res.redirect('/')
    }
}
module.exports.processRegisterPage = (req,res,next) => {
    if(req.body.secret)
    {
        var newUser = new User({
            username: req.body.username,
            email:req.body.email,
            displayName: req.body.displayName,
            secret: req.body.secret
    })}
    else
    {
        var newUser = new User({
            username: req.body.username,
            email:req.body.email,
            displayName: req.body.displayName,
    })
    }
    User.register(newUser, req.body.password, (err) =>{
        if(err)
        {
            console.log("Error: Inserting the new user");
            if(err.name=="UserExistsError")
                {
                    req.flash('registerMessage',
                    'Registration Error: User Already Exists');
                }
            return res.render('auth/register',
            {
                title:'Register',
                message: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName:'',
                secret: Speakeasy.generateSecret({length:20}).base32
            });
        }
        else
        {
        //    res.json({success:true, msg:'User registered Successfully'});
            // if registration is successful
            return passport.authenticate('local')(req,res,()=>{
                res.redirect('/friend-list');
            })    
        }
    })
}

module.exports.performLogout = (req,res,next)=>
{
        
    req.logout(function(err){
        if(err){
            return next(err);
        }
    })
    res.redirect('/');
}