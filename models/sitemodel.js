/************************************************************************/
/*	sitemodel.js														*/
/*	VASSEUR cedric @2016 												*/
/*	Model for Sites Documents	 										*/
/*	require model.js													*/
/************************************************************************/

var model  = require('./model');

function SiteModel() {}

SiteModel.type = "site";

// Get all Sites
SiteModel.getAllSites = function(callback) {
    model.getAllDocuments(SiteModel.type,callback);
};

// Get a Site by Id
SiteModel.getSiteById = function(siteId, callback) {
    model.getDocumentById(SiteModel.type,siteId,callback);
};

// Get a Site by Key
SiteModel.getSiteByKey = function(siteKey, callback) {
    model.getDocumentByKey(SiteModel.type,siteKey,callback);
};

// Create a Site 
SiteModel.createSite = function(data, callback) {
    model.createDocument(SiteModel.type,data,callback);
};

// Update a Site
SiteModel.updateSite = function(key, data, callback) {
    model.updateDocument(SiteModel.type, key, data, callback);
};

// Delete a Site 
SiteModel.deleteSite = function(siteId, callback) {
    model.deleteDocument(siteId, callback);
};

module.exports = SiteModel;