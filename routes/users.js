var express = require('express');
var router = express.Router();
var UserModel = require("../models/usermodel");



router.get('/', function(req, res, next) {
  res.render('users_ltr.html',{i18n: res});
});

router.get('/:id_user', function(req, res, next) {
  res.render('user_ltr.html',{i18n: res,id_user:req.params.id_user});
});

module.exports = router;
