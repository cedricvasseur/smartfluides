/************************************************************************/
/*  login.js                                                            */
/*  VASSEUR cedric @2016                                                */
/*  Login Route File                                                    */
/************************************************************************/

var express  = require('express'),
    passport = require('passport'),
    path     = require('path');

var router = express.Router();
var portail = __dirname.split(path.sep).pop();

router.post('/', passport.authenticate('local', {
    successRedirect: '/'+portail+'/login/Success',
    failureRedirect: '/'+portail+'/login/Failure'
  }));

router.get('/Failure', function(req, res, next) {
  console.log('Failed to authenticate');
  res.redirect('/'+portail+'/index');
});

router.get('/Success', function(req, res, next) {
  console.log('Successfully authenticated');
  res.redirect('/'+portail+'/home');
});

router.get('/signout', function(req, res) {
  req.logout();
  console.log('Successfully logout');
  res.redirect('/'+portail);
});

module.exports = router;