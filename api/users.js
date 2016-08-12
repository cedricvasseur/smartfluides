/************************************************************************/
/*  users.js                                                            */
/*  VASSEUR cedric @2016                                                */
/*  APIs for Users Documents                                            */
/*  require usermodel.js                                                */
/*  Authenticated : True                                                */
/************************************************************************/

var express          = require('express'),
	router 	         = express.Router(),
 	i18n             = require("i18n"),
 	config           = require('../config/config'),
 	UserModel        = require("../models/usermodel");

var isAuthenticated = require('../auth/isAuthenticated');	

// Get all Users
router.get('/',isAuthenticated, function(req, res, next) {
    UserModel.getAllUsers(function(error, result) {
        if(error) {
            return res.status(400).send(error);
        }
        res.send(result);
    });
});	

// Get samples Users
router.get('/samples',isAuthenticated, function(req, res, next) {
    UserModel.getAllUsers(function(error, result) {
        if(error) {
            return res.status(400).send(error);
        }
        var element = [];
        var array = [];
        var count = 6;
        var aleatoire;
          do{
          	aleatoire = Math.floor(Math.random()*result.length);
          	if(array.indexOf(aleatoire) == -1 ){
          		array.push(aleatoire);
          		element.push(result[aleatoire]);
          	} 
        }
        while(element.length < count);
        res.send(element);
    });
});

// Get a User By Id
router.get('/:user_id',isAuthenticated, function(req, res, next) {
    if(!req.params.user_id) {
        return res.status(400).send({"status": "error", "message": "A document id is required"});
    }
    UserModel.getUserById(req.params.user_id, function(error, result) {
        if(error) {
            return res.status(400).send(error);
        }
        res.send(result);
    });
});	

module.exports = router;