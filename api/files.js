/************************************************************************/
/*  files.js                                                	        */
/*  VASSEUR cedric @2016                                                */
/*  APIs for Files Documents                                            */
/*  require filemodel.js                                                */
/*  Authenticated : True                                                */
/************************************************************************/

var express 	     = require('express'),
	router 		     = express.Router(),
 	i18n    	     = require("i18n"),
	config 		     = require('../config/config'),
	FileModel 	     = require("../models/filemodel");

var isAuthenticated = require('../auth/isAuthenticated');	

// Get a File By Id
router.get('/:file_id', function(req, res, next) {
    FileModel.getFileById(req.params.file_id,function(error, result) {
        if(error) {
            return res.status(400).send(error);
        }
        res.send(result);
    });
});

module.exports = router;