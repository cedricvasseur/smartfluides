/************************************************************************/
/*  pagination.js                                                       */
/*  VASSEUR cedric @2016                                                */
/*  Pagination Route File for Template                                  */
/************************************************************************/

var express = require('express'),
    path    = require('path');

var router = express.Router();
var portail = __dirname.split(path.sep).pop();
var page = 'pagination';

/* GET about page. */
router.get('/', function(req, res, next) {
  	res.render(portail+'/'+page+'/'+page+'_'+req.cookies.l10n+'.html',{i18n: res,portail:portail});
});

module.exports = router;
