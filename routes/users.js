var express = require('express');
var router = express.Router();
var UserModel = require("../models/usermodel");

router.get('/', function(req, res, next) {
  res.render('users_ltr.html',{i18n: res});
});

module.exports = router;
