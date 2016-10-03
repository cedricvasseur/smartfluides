/************************************************************************/
/*  users.js                                                            */
/*  VASSEUR cedric @2016                                                */
/*  User Route File for Template                                        */
/************************************************************************/

var express = require('express'),
    path    = require('path');

var UserModel = require("../../models/usermodel");
var isAuthenticated = require('../../auth/isAuthenticated');

var router = express.Router();
var portail = __dirname.split(path.sep).pop();
var page = 'users';

router.get('/',isAuthenticated, function(req, res, next) {
  	res.cookie('routes'+portail, '/'+portail+'/'+page);
	var user  = req.session.passport.user.value;
  	res.render(portail+'/'+page+'/'+page+'_'+req.cookies.l10n+'.html',{i18n: res,user: user,portail:portail});
});

module.exports = router;