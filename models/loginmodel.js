/************************************************************************/
/*  taskmodel.js                                                        */
/*  VASSEUR cedric @2016                                                */
/*  Model for Tasks Documents                                           */
/*  require model.js                                                    */
/************************************************************************/

var config      = require('../config/config'),
    couchbase   = require("couchbase"),
    ViewQuery   = require('couchbase').ViewQuery,
    crypto      = require('crypto');

var cluster = new couchbase.Cluster(config.couchbase.server);

var bucket = cluster.openBucket(config.couchbase.bucket,config.couchbase.password, function(err) {
  if (err) {
    // Failed to make a connection to the Couchbase cluster.
    throw err;
  }
});

function LoginModel() {};

LoginModel.findByUsername = function(username,password,done){
    var hash = crypto.createHmac('sha256', username).update(password).digest('hex');    
    var query = ViewQuery.from('smartfluides', 'login_users').key(username);
    console.log(username+' : '+hash);      
    bucket.query(query, function(error, user) {
        if(error) {
            return done(error, null);
        }   
        if (!user) {
            return done(null, false);
        }
        if (!user[0]) {
            return done(null, false);
        }
        if(user[0].value.password != hash){
            return done(null, false);
        }
        var now = new Date();
        var jsonObject = user[0].value;
        jsonObject.lastlogin= now;

        //On positionne la date de dernière connexion
        bucket.upsert(user[0].id, jsonObject, function(error, result) {
            if(error) {
                return done(error, null);
            }
        });

        // On retourne l'utilisateur
        done(null, user[0]);
    });
}

module.exports = LoginModel;