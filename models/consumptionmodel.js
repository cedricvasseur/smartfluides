/************************************************************************/
/*	consumptionmodel.js													*/
/*	VASSEUR cedric @2016 												*/
/*	Model for Consumptions Documents									*/
/*	require model.js													*/
/************************************************************************/

var model  = require('./model');

function ConsumptionModel() {}

ConsumptionModel.type = "consumption";

// Get all Consumptions
ConsumptionModel.getAllConsumptions = function(callback) {
    model.getAllDocuments(ConsumptionModel.type,callback);
};

// Get Consumption by Id
ConsumptionModel.getConsumptionById = function(consumptionId, callback) {
    model.getDocumentById(ConsumptionModel.type,consumptionId,callback);
};

// Get Consumption(s) by Key
ConsumptionModel.getConsumptionByKey = function(consumptionKey, callback) {
    model.getDocumentByKey(ConsumptionModel.type,consumptionKey,callback);
};

// Create a Consumption 
ConsumptionModel.createConsumption = function(data, callback) {
    model.createDocument(ConsumptionModel.type,data,callback);
};

// Update a Consumption
ConsumptionModel.updateConsumption = function(key, data, callback) {
    model.updateDocument(ConsumptionModel.type, key, data, callback);
};

// Delete a Consumption 
ConsumptionModel.deleteConsumption = function(consumptionId, callback) {
    model.deleteDocument(consumptionId, callback);
};

module.exports = ConsumptionModel;