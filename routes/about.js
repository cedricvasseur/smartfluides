var express = require('express');
var router = express.Router();

/* GET about page. */
router.get('/', function(req, res, next) {
  res.render('about_ltr.html',{i18n: res});
});

module.exports = router;
