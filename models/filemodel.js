/************************************************************************/
/*  filemodel.js                                                        */
/*  VASSEUR cedric @2016                                                */
/*  Model for Files Documents                                           */
/*  require model.js                                                    */
/************************************************************************/

var model  = require('./model');

function FileModel() {}

FileModel.type = "file";

// Get all Files
FileModel.getAllFiles = function(callback) {
    model.getAllDocuments(FileModel.type,callback);
};

// Get a File by Id
FileModel.getFileById = function(fileId, callback) {
    model.getDocumentById(FileModel.type,fileId,callback);
};

// Get a File by Key
FileModel.getFileByKey = function(fileKey, callback) {
    model.getDocumentByKey(FileModel.type,fileKey,callback);
};

// Create a File 
FileModel.createFile = function(data, callback) {
    model.createDocument(FileModel.type,data,callback);
};

// Update a File
FileModel.updateFile = function(key, data, callback) {
    model.updateDocument(FileModel.type, key, data, callback);
};

// Delete a File 
FileModel.deleteFile = function(fileId, callback) {
    model.deleteDocument(fileId, callback);
};

module.exports = FileModel;