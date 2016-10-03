/************************************************************************/
/*	about.js															*/
/*	VASSEUR cedric @2016 												*/
/*	About Page Route File  	  											*/
/************************************************************************/

var express = require('express'),
    path    = require('path');

var router = express.Router();
var portail = __dirname.split(path.sep).pop();
var page = 'about';

/* GET about page. */
router.get('/', function(req, res, next) {
  	res.cookie('routes'+portail, '/'+portail+'/'+page);
  	res.render(portail+'/'+page+'/'+page+'_'+req.cookies.l10n+'.html',{i18n: res,portail:portail});
});

module.exports = router;