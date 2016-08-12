/************************************************************************/
/*	model.js															*/
/*	VASSEUR cedric @2016 												*/
/*	Generic model for all documents										*/
/*	require view by doctype												*/
/************************************************************************/

var config    = require('../config/config'),
    couchbase = require("couchbase"),
    N1qlQuery = require('couchbase').N1qlQuery,
    ViewQuery = require('couchbase').ViewQuery,
    uuid      = require('uuid');

var cluster = new couchbase.Cluster(config.couchbase.server);

var bucket = cluster.openBucket(config.couchbase.bucket, function(err) {
  if (err) {
    // Failed to make a connection to the Couchbase cluster.
    throw err;
  }
});

function Model() {}

// Get All Documents
Model.getAllDocuments = function(doctype, callback){

	//select query where name = doctype
	var query = ViewQuery.from(config.couchbase.bucket, doctype+"s");
	// excecute query
	bucket.query(query, function(error, results) {
    	if(error) {
    	    return callback(error, null);
    	}
    	callback(null, results);
    });
};

// Get a Document by Id
Model.getDocumentById = function(doctype, id, callback){

    //select document by doctype and Id 
    var query = ViewQuery.from(config.couchbase.bucket, doctype+"s").id_range(id,id);
    // excecute query
    bucket.query(query, function(error, results) {
        if(error) {
            return callback(error, null);
        }
        callback(null, results);
    });
};

// Get a Document by Key
Model.getDocumentByKey = function(doctype, key, callback){

    //select document by doctype and key 
	var query = ViewQuery.from(config.couchbase.bucket, doctype+"s").key(key);
	// excecute query
	bucket.query(query, function(error, results) {
    	if(error) {
    	    return callback(error, null);
    	}
    	callback(null, results);
    });
};

// Create a Document 
Model.createDocument = function (doctype, value, callback){
    var jsonObject = {};

    var documentKey = value['guid'] ? doctype + "." + value['guid'] : doctype + "." + uuid.v1();
    jsonObject.doctype=doctype;
    jsonObject.id=documentKey;

    Object.keys(value).forEach(function (key) {
        jsonObject[key] = value[key];
    });

    bucket.insert(documentKey, jsonObject, function(error, result) {
        if(error) {
            return callback(error, null)
        };
        callback(null, {message: "success", data: result});
    });
};

// Update a Document
Model.updateDocument = function(doctype, key, value, callback){
    var jsonObject = {};
    var query = ViewQuery.from(config.couchbase.bucket, doctype+"s").key(key);
    
    bucket.query(query, function(error, results) {
        if(error) {
            return callback(error, null);
        }
        jsonObject = results[0].value;

        Object.keys(value).forEach(function (key) {
            jsonObject[key] = value[key];
        });

        bucket.replace(key, jsonObject, function(error, result) {
            if(error) {
                return callback(error, null);
            }
            callback(null, {message: "success", data: result});
        });
    });
};

// Delete a Document 
Model.deleteDocument = function( key, callback){
    bucket.remove(key, function(error, result) {
        if(error) {
            callback(error, null);
            return;
        }
        callback(null, {message: "success", data: result});
    });
};

module.exports = Model;