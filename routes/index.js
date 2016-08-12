/************************************************************************/
/*	about.js															*/
/*	VASSEUR cedric @2016 												*/
/*	Index Page Route File  	  											*/
/************************************************************************/

var express = require('express');
var router = express.Router();
var config  = require('../config/config.js');
var UserModel = require("../models/usermodel");

var page = 'index';

router.get('/', function(req, res, next) {
	res.cookie('routes', '/'+page);
	res.render(page+'/'+page+'_'+req.cookies.l10n+'.html',{i18n: res});
});

module.exports = router;