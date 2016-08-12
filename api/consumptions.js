/************************************************************************/
/*  consumptions.js                                                     */
/*  VASSEUR cedric @2016                                                */
/*  APIs for Consumption Documents                                      */
/*  require consumptionmodel.js                                         */
/*  Authenticated : True                                                */
/************************************************************************/

var express 		 = require('express'),
	router 			 = express.Router(),
 	i18n    		 = require("i18n"),
	config 			 = require('../config/config'),
	ConsumptionModel = require("../models/consumptionmodel");

var isAuthenticated = require('../auth/isAuthenticated');	

// Get all Sites Consumption
router.get('/sites',isAuthenticated, function(req, res, next) {
    ConsumptionModel.getAllConsumptions(function(error, result) {
        if(error) {
            return res.status(400).send(error);
        }
        res.send(result);
    });
});

module.exports = router;