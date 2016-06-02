var config  = require('../config/config'),
    couchbase = require("couchbase"),
    N1qlQuery = require('couchbase').N1qlQuery,
    ViewQuery = require('couchbase').ViewQuery;

var cluster = new couchbase.Cluster(config.couchbase.server);

var bucket = cluster.openBucket(config.couchbase.bucket, function(err) {
  if (err) {
    // Failed to make a connection to the Couchbase cluster.
    throw err;
  }
});

function UserModel() {}


// Get all Users

UserModel.getAll = function(callback) {
 
    var query = ViewQuery.from('smartfluides', 'users');
      
    bucket.query(query, function(error, results) {
        if(error) {
            return callback(error, null);
        }
        callback(null, results);
    });
};

// Get a single User
UserModel.getByDocumentId = function(documentId, callback) {
    var finalResult = [];
    var statement = "SELECT * " +
                    "FROM `" + config.couchbase.bucket + "` AS users " +
                    "WHERE META(users).id = $1";
                    
    var query = N1qlQuery.fromString(statement);
    
    bucket.query(query, [documentId], function(error, result) {
        if(error) {
            return callback(error, null);
        }
       callback(null, result);
    });
};

// Get User Image
UserModel.getImageByDocumentId = function(documentId, callback) {
     var statement = "SELECT base64 " +
                    "FROM `" + config.couchbase.bucket + "` AS files " +
                    "WHERE META(files).id = $1";
                    
    var query = N1qlQuery.fromString(statement);
    
    bucket.query(query, [documentId], function(error, result) {
        if(error) {
            return callback(error, null);
        }
       callback(null, result);
    });
    
};

// Create or Update a User 
UserModel.save = function(data, callback) {
    var jsonObject = {
        doctype: "user",
        id: "user." + data.code,
        code: data.code,
        name: data.name,
        phone: data.phone,
        mobile: data.mobile,
        organization_id:"organisation.clairiere_habitat",
        email: data.email,
        site_id: "site.azur",
        address: data.address,
        zipcode: data.zipcode,
        town: data.town,
        country: data.country,
        username: data.username,
        password: data.password,
        role: "Résident"
    }
    

    var documentId = data.user_id ? data.user_id : "user." + data.code;
    
    bucket.upsert(documentId, jsonObject, function(error, result) {
        if(error) {
            callback(error, null);
            return;
        }
        callback(null, {message: "success", data: result});
    });
}

// Delete a User 
UserModel.delete = function(documentId, callback) {
    bucket.remove(documentId, function(error, result) {
        if(error) {
            callback(error, null);
            return;
        }
        callback(null, {message: "success", data: result});
    });
};

module.exports = UserModel;