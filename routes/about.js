/************************************************************************/
/*	about.js															*/
/*	VASSEUR cedric @2016 												*/
/*	About Page Route File  	  											*/
/************************************************************************/

var express = require('express');
var router = express.Router();

var page = 'about';

/* GET about page. */
router.get('/', function(req, res, next) {
  res.cookie('routes', '/'+page);
  res.render(page+'/'+page+'_'+req.cookies.l10n+'.html',{i18n: res});
});

module.exports = router;