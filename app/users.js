var express = require('express')
var app = express()
var User = require('./models/user.js')
var _=require('underscore-node')

exports.login = function(req, res){
    if (req.body['name'] == '' || req.body['password'] == ''){
        return;
    }
    User.find({name:req.body.name}, function(err, user) {
        if (err) return;
        // object of the user
        if (user.length == 0 || user == undefined || user == null) {
            res.json({status:'error', username_exist:false, password_wrong:false});
            return;
        }
        if(user[0].password == req.body.password){
            user[0].token = req.body.token
            user[0].save(function(error, data){
                
            })   
            var result = {
                status:'success',
                userid:user[0]._id
            };
            res.json(result);
        } 
        else{
            res.json({status:'error', username_exist:true, password_wrong:true});
        }
    })
}

exports.register = function(req, res){
    checkUserInfoValid(req, function(result){
        if (result.status == 'error') {
            res.json(result);
            return;
        }

        if (req.body.name == '' || req.body.password == ''){
            return;
        }
        var newUser = new User({
            name:req.body.name,
            password:req.body.password,
            phonenumber:req.body.phonenumber
        });
        newUser.save(function(err, data){
            if (err) {
                console.log("Creating New User error");
                return;
            }else{
                var newResult = {
                    status:result.status,
                    userID:newUser._id
                };
                res.json(newResult);
            }
        })
    })
}

exports.getUserById = function(req, res){
    User.find(req.params.id, function(err, user){
        if (err) return;
        res.json(user);
    })
}

exports.getUserByName = function(req, res){
    User.find({"name": req.params.name}, function(err, users){
        if (err) return;
        if(users.length == 0)
            res.json({"exist": false});
        else
            res.json({"exist": true});
    })
}

exports.getUserByPhone = function(req, res){
    User.find({"phonenumber": req.params.phone}, function(err, users){
        if (err) return;
        if(users.length == 0)
            res.json({"exist": false});
        else
            res.json({"exist": true});
    });
}

exports.getUserByInfo = function(req, res){
    //console.log({"name": req.params.name, "phonenumber": req.params.phone});
    User.find({"name": req.params.name, "phonenumber": req.params.phone}, function(err, users){
        if (err) return;
        //console.log(JSON.stringify(users));
        if(users.length == 0)
            res.json({"exist": false});
        else
        {
            var newResult = {
                    "exist":true,
                    "userID":users[0]._id
                };
            res.json(newResult);
        }
    });
}

exports.updatePassword = function(req, res){

    User.findById(req.params.id, function(err, user){
        if (err) return;
        user.password = req.body.password;
        user.save(function(error, data){
            if (error) {
                res.json({status:'error'});
                return;
            }
            res.json({status:'success'});
        });
    });
}

exports.updateUserInfoById = function(req, res){
    if (req.body['name'] == '' || req.body['password'] == ''){
        return;
    }

    User.findById(req.params.id, function(err, user){
        if (err) return;
        user.name = req.body.name;
        user.password = req.body.password;
        user.save(function(error, data){
            if (error) {
                res.json({status:'error'});  
                return;
            }
            res.json({status:'success'})
        });
    });
}

function checkUserInfoValid(req, callback){
    User.find({name:req.body.name}, function(err, user){
        if (err){
            callback({status:'error'})
            return;
        }
        if (user.length != 0){
            callback({status:'error', username_exist:true})
            return;
        }        
        callback({status:'success'})
    });
}