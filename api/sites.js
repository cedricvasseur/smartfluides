/************************************************************************/
/*  sites.js                                                            */
/*  VASSEUR cedric @2016                                                */
/*  APIs for Sites Documents                                            */
/*  require sitemodel.js                                                */
/*  Authenticated : True                                                */
/************************************************************************/

var express 	     = require('express'),
	router 		     = express.Router(),
 	i18n    	     = require("i18n"),
	config 		     = require('../config/config'),
	SiteModel 	     = require("../models/sitemodel");

var isAuthenticated = require('../auth/isAuthenticated');   

// Get all Sites
router.get('/',isAuthenticated, function(req, res, next) {
    SiteModel.getAllSites(function(error, result) {
        if(error) {
            return res.status(400).send(error);
        }
        res.send(result);
    });
});	

// Get samples Sites
router.get('/samples',isAuthenticated, function(req, res, next) {
    SiteModel.getAllSites(function(error, result) {
        if(error) {
            return res.status(400).send(error);
        }
        var element = [];
        var array = [];
        var count = 4;
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

// Get a Site By Id
router.get('/:site_id',isAuthenticated, function(req, res, next) {
    if(!req.params.site_id) {
        return res.status(400).send({"status": "error", "message": "A document id is required"});
    }
    SiteModel.getSiteById(req.params.site_id, function(error, result) {
        if(error) {
            return res.status(400).send(error);
        }
        res.send(result);
    });
});	

module.exports = router;