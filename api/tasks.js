/************************************************************************/
/*  tasks.js                                                            */
/*  VASSEUR cedric @2016                                                */
/*  APIs for Tasks Documents                                            */
/*  require taskmodel.js                                                */
/*  Authenticated : True                                                */
/************************************************************************/

var express 	     = require('express'),
	router 		     = express.Router(),
 	i18n    	     = require("i18n"),
	config 		     = require('../config/config'),
	TaskModel 	     = require("../models/taskmodel"),
    UserModel        = require("../models/usermodel");

var isAuthenticated = require('../auth/isAuthenticated');   

// Get all Users Tasks
router.get('/',isAuthenticated, function(req, res, next) {
    user_id = req.session.passport.user.value.id;

    TaskModel.getTaskByKey(user_id,function(error, result) {
        if(error) {
            return res.status(400).send(error);
        }
        res.send(result);
    });
});	

// Get a single Task
router.get('/:task_id',isAuthenticated, function(req, res, next) {
    if(!req.params.task_id) {
        return res.status(400).send({"status": "error", "message": "A document id is required"});
    }
    TaskModel.getTaskById(req.params.task_id, function(error, result) {
        if(error) {
            return res.status(400).send(error);
        }
        res.send(result);
    });
});	

// Create a Task
router.post('/',isAuthenticated, function(req, res, next) {
        
    user_id = req.session.passport.user.value.id;

    console.log(user_id);

    UserModel.getUserById(user_id,function(error,result){

        var count = 0;
        var lasttask =0
        var jsonObject = result[0].value;

        if(jsonObject.task){
            count=parseInt(jsonObject.task)+1;
        }

        if(jsonObject.lasttask){
            lasttask = parseInt(jsonObject.lasttask)+1;   
        } else {
            lasttask = count;
        }
      
        jsonObject.task     = count;
        jsonObject.lasttask = lasttask;
        
        var values = req.body;

        values['user_id'] = user_id;
        values['guid'] = user_id + "." + lasttask;
        
        TaskModel.createTask(values, function(error, result) {
            if(error) {
                return res.status(400).send(error);
            }

            UserModel.updateUser(user_id, jsonObject, function(error, result) {
                if(error) {
                    return res.status(400).send(error);
                }
                res.send(result);            
            });
        });
    });
});	

// Update a Task with new info.
router.put('/:task_id',isAuthenticated, function(req, res, next) {

	if(!req.params.task_id) {
        return res.status(400).send({"status": "error", "message": "A Task id is required"});
    } 
    TaskModel.updateTask(req.params.task_id,req.body, function(error, result) {
        if(error) {
            return res.status(400).send(error);
        }
        res.send(result);
  	});		
});	

// Delete a Task.
router.delete('/:task_id',isAuthenticated, function(req, res, next) {
    if(!req.params.task_id) {
        return res.status(400).send({"status": "error", "message": "A document id is required"});
    }
    user_id = req.session.passport.user.value.id;

    UserModel.getUserById(user_id,function(error,result){

        var count = 0;
        var jsonObject = result[0].value;
        if(jsonObject.task){
            count=parseInt(jsonObject.task)-1;
        }
        console.log(req.params.task_id);

        
        jsonObject.task = count;

        TaskModel.deleteTask(req.params.task_id, function(error, result) {
            if(error) {
                return res.status(400).send(error);
            }
            UserModel.updateUser(user_id, jsonObject, function(error, result) {
                if(error) {
                    return res.status(400).send(error);
                }
                res.send(result);            
            });
        });
    });
});

module.exports = router;
