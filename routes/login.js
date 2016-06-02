var express = require('express');
var passport = require('passport');
var couchbase = require("couchbase");
var LocalStrategy = require('passport-local').Strategy;
var router = express.Router();
router.use(passport.initialize());
router.use(passport.session());


var cluster = new couchbase.Cluster('127.0.0.1');
var bucket = cluster.openBucket('smartfluides', function(err) {
  if (err) {
    // Failed to make a connection to the Couchbase cluster.
    throw err;
  }
});

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new LocalStrategy(function(username, password, done) {
  process.nextTick(function() {
    // Auth Check Logic
    var ViewQuery = couchbase.ViewQuery;
    var query = ViewQuery.from('smartfluides', 'users_login').key(username);
  
    bucket.query(query, function(err, user) {
        if (err) {
          console.log("Erreur ?",err);
          return done(err);
        }
        if (!user) {
          console.log("User ?");
            return done(null, false);
        }
          
        if (user[0].value != password) {
          console.log("Password ?");
          return done(null, false);
        }
        return done(null, user);
    });
  });
}));

//

router.post('/', passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/'
  }));

router.get('/signout', function(req, res) {
  req.logout();
  res.redirect('/');
});
module.exports = router;
