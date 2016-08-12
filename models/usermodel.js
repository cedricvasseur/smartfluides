/************************************************************************/
/*	usermodel.js														*/
/*	VASSEUR cedric @2016 												*/
/*	Model for Users Documents	 										*/
/*	require model.js													*/
/************************************************************************/

var model  = require('./model');

function UserModel() {}

UserModel.type = "user";

// Get all User
UserModel.getAllUsers = function(callback) {
    model.getAllDocuments(UserModel.type,callback);
};

// Get a User by Id
UserModel.getUserById = function(userId, callback) {
    model.getDocumentById(UserModel.type,userId,callback);
};

// Get a User by Key
UserModel.getUserByKey = function(userKey, callback) {
    model.getDocumentByKey(UserModel.type,userKey,callback);
};

// Create a User 
UserModel.createUser = function(data, callback) {
    model.createDocument(UserModel.type,data,callback);
};

// Update a User
UserModel.updateUser = function(key, data, callback) {
    model.updateDocument(UserModel.type, key, data, callback);
};

// Delete a User 
UserModel.deleteUser = function(userId, callback) {
    model.deleteDocument(userId, callback);
};

module.exports = UserModel;