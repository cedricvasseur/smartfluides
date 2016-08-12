/************************************************************************/
/*  tasks.js                                                            */
/*  VASSEUR cedric @2016                                                */
/*  Task Route File for Template                                        */
/************************************************************************/

var express = require('express');
var router = express.Router();
var UserModel = require("../models/usermodel");

var isAuthenticated = require('../auth/isAuthenticated');

var page = 'tasks';

router.get('/',isAuthenticated, function(req, res, next) {
	res.cookie('routes', '/'+page);
	var user  = req.session.passport.user.value;
	res.render(page+'/'+page+'_'+req.cookies.l10n+'.html',{i18n: res,user: user});
});

module.exports = router;