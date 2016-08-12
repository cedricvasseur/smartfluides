/************************************************************************/
/*  login.js                                                            */
/*  VASSEUR cedric @2016                                                */
/*  Login Route File                                                    */
/************************************************************************/

var express = require('express');
var passport = require('passport');
var router = express.Router();

router.post('/', passport.authenticate('local', {
    successRedirect: '/login/Success',
    failureRedirect: '/login/Failure'
  }));

router.get('/Failure', function(req, res, next) {
  console.log('Failed to authenticate');
  res.redirect('/index');
});

router.get('/Success', function(req, res, next) {
  console.log('Successfully authenticated');
  res.redirect('/home');
});

router.get('/signout', function(req, res) {
  req.logout();
  console.log('Successfully logout');
  res.redirect('/');
});

module.exports = router;