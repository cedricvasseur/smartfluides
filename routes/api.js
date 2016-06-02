var express = require('express'),
	router 	= express.Router(),
 	i18n    = require("i18n");

var UserModel 	= require("../models/usermodel");
var config  	= require('../config/config');


router.get('/', function(req, res, next) {
  res.render('api',{i18n: res});
});

/*************************************************************
 * API Languages 
 *************************************************************/
	i18n.configure(config.i18n);
	router.use(i18n.init);

	// Get all languages
	router.get('/languages', function(req, res, next) {
	   	var languages = [];
	   	//console.log(languages);
		for (var i in i18n.getCatalog()) {

			var lang = { code: i, name: res.__(i),icon:'flag-icon-'+i.substring(3,6).toLowerCase()};

 	 		languages.push(lang);
 		}	
	    res.send(languages);
	});	


/*************************************************************
 * API Users 
 *************************************************************/

	// Get all Users
	router.get('/users', function(req, res, next) {
	    UserModel.getAll(function(error, result) {
	        if(error) {
	            return res.status(400).send(error);
	        }
	        res.send(result);
	    });
	});	

	// Get a single User
	router.get('/users/:user_id', function(req, res, next) {
	    if(!req.params.user_id) {
	        return res.status(400).send({"status": "error", "message": "A document id is required"});
	    }
	    UserModel.getByDocumentId(req.params.user_id, function(error, result) {
	        if(error) {
	            return res.status(400).send(error);
	        }
	        res.send(result);
	    });
	});	

	// Get User Image
	router.get('/users/image/:image_id', function(req, res, next) {
	    if(!req.params.image_id) {
	        return res.status(400).send({"status": "error", "message": "A document id is required"});
	    }
	    UserModel.getImageByDocumentId(req.params.image_id, function(error, result) {
	        if(error) {
	            return res.status(400).send(error);
	        }
	        res.send(result);
	    });
	});	

	// Create a User
	router.post('/users', function(req, res, next) {
		if(!req.body.name) {
    	    return res.status(400).send({"status": "error", "message": "Le nom est obligatoire"});
	    } else if(!req.body.code) {
	        return res.status(400).send({"status": "error", "message": "Le code est obligatoire"});
	    } else if(!req.body.code) {
	        return res.status(400).send({"status": "error", "message": "L'email est obligatoire"});
	    }
	
   	 	UserModel.save(req.body, function(error, result) {
	        if(error) {
	            return res.status(400).send(error);
	        }
	        res.send(result);
    	});
	});	

	// Update a User with new info.
	router.put('/users/:user_id', function(req, res, next) {
		if(!req.params.document_id) {
	        return res.status(400).send({"status": "error", "message": "A document id is required"});
	    } else if(!req.body.name) {
    	    return res.status(400).send({"status": "error", "message": "Le nom est obligatoire"});
	    } else if(!req.body.code) {
	        return res.status(400).send({"status": "error", "message": "Le code est obligatoire"});
	    } else if(!req.body.code) {
	        return res.status(400).send({"status": "error", "message": "L'email est obligatoire"});
	    }
	
   	 	UserModel.save(req.body, function(error, result) {
	        if(error) {
	            return res.status(400).send(error);
	        }
	        res.send(result);
    	});		
	});	

	// Delete a User.
	router.delete('/users/:user_id', function(req, res, next) {
	    if(!req.params.user_id) {
	        return res.status(400).send({"status": "error", "message": "A document id is required"});
	    }
	    UserModel.delete(req.params.user_id, function(error, result) {
	        if(error) {
	            return res.status(400).send(error);
	        }
	        res.send(result);
	    });
	});

module.exports = router;
