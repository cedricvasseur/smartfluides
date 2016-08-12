/************************************************************************/
/*  pagination.js                                                       */
/*  VASSEUR cedric @2016                                                */
/*  Pagination Route File for Template                                  */
/************************************************************************/

var express = require('express');
var router = express.Router();

var page = 'pagination';

/* GET about page. */
router.get('/', function(req, res, next) {
  res.render(page+'/'+page+'_'+req.cookies.l10n+'.html',{i18n: res});
});

module.exports = router;
