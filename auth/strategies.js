/************************************************************************/
/*  strategies.js                                                       */
/*  VASSEUR cedric @2016                                                */
/*  Define strategies for Authentification with Passport                */
/*  require passport.js                                                 */
/************************************************************************/


var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;
var config  = require('../config/config');
var loginModel = require('../models/loginmodel');

passport.use(new LocalStrategy(function(username, password, done) {  
	loginModel.findByUsername(username, password, function(error, user) {
        if(error) {
            return done(error);
        }
        done(null, user);
	});
}));