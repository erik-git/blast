var express = require('express')
var app = express()
var Blast = require('./models/blast.js')
var Follow = require('./models/follow.js')
var _=require('underscore-node')

exports.createBlast = function(req, res){

    if (req.body.title == '' || req.body.content == ''){
        return;
    }
    var newBlast = new Blast({
        title: req.body.title,
        content: req.body.content,
        userID: req.body.userID,
        status: req.body.status,
        imageURL: req.body.imageURL,
        created: new Date(),
        lifetime: 1440
    });
    newBlast.save(function(err, data){
        if (err) {
            console.log("Creating New Blast error")
            return
        }else{
            var newResult = {
                blastID:newBlast._id
            }
            res.json(newResult)
        }
    })
}

exports.getBlasts = function(req, res){
    Blast.find({}, function(err, blasts){
        if (err) return;
        res.json(blasts);
    })
}

exports.getBlastById = function(req, res){
    Blast.find({"_id": req.params.id}, function(err, blasts){
        if (err) return;
        res.json(blasts);
    })
}

exports.updateBlastById = function(req, res){

    if (req.body.title == '' || req.body.content == ''){
        return;
    }
    Blast.findById(req.params.id, function(err, blast){
        if (err) return
        blast.title = req.body.title;
        blast.content = req.body.content;
        blast.status = req.body.status;
        blast.imageURL = req.body.imageURL;
        blast.save(function(error, data){
            if (error) {
                res.json({status:'error'})   
                return
            }
            res.json({status:'success'})
        })
    })
}