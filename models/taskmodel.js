/************************************************************************/
/*  taskmodel.js                                                        */
/*  VASSEUR cedric @2016                                                */
/*  Model for Tasks Documents                                           */
/*  require model.js                                                    */
/************************************************************************/

var model  = require('./model');

function TaskModel() {}

TaskModel.type = "task";

// Get all Tasks
TaskModel.getAllTasks = function(callback) {
    model.getAllDocuments(TaskModel.type,callback);
};

// Get a Task by Id
TaskModel.getTaskById = function(taskId, callback) {
    model.getDocumentById(TaskModel.type,taskId,callback);
};

// Get a Task by Key
TaskModel.getTaskByKey = function(taskKey, callback) {
    model.getDocumentByKey(TaskModel.type,taskKey,callback);
};

// Create a Task 
TaskModel.createTask = function(data, callback) {
    model.createDocument(TaskModel.type,data,callback);
};

// Update a Task
TaskModel.updateTask = function(key, data, callback) {
    model.updateDocument(TaskModel.type, key, data, callback);
};

// Delete a Task 
TaskModel.deleteTask = function(taskId, callback) {
    model.deleteDocument(taskId, callback);
};

module.exports = TaskModel;