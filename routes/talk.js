var objectID = require('mongodb').ObjectID;
var request = require('request');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = require('../db');
var express = require('express');
var app = express();

//mongoose


//create schema
var TalkSchema = new Schema({

    id: { type: String},
    host_id: {type: String},
    topic: { type: String, required: true},
    status: { type: Boolean},
    speaker: { type: String, required: true},
    category: { type: String, required: true},
    description: { type: String, required: true},
    vote: {
        num: {type: Number, required: true},
        voter_id: [String]
    },
    imageURL: { type: String}
});
//create a model
var Talk = mongoose.model('Talk', TalkSchema);

//save into mongoDB
//module.exports = function(db) {

//var mongoose = require('mongoose');
//var Talk = mongoose.model('Talk');

exports.list = function(req, res) {
    Talk.find(function (err, talks, count){
        if(err) {
            console.log(err);
            res.json({error: err.name}, 500);
        }

        res.json({talks: talks});
      });

    };

exports.create = function(req, res) {
//create documents
//db.collectionName.save({key: value});
    console.log('created');
    var talk = new Talk({
        topic: req.body.topic,
        speaker: req.body.speaker,
        category: req.body.category,
        vote: {num: 0, voter_id:[]},
        description: req.body.description
    });
    talk.save(function (err, data){
        if(err) {
            console.error(err);
        }
        console.log('data: ' + data);
        res.send(data);
    });
};
exports.show = function(req, res) {

    if(req.body.category === null){
        res.send({'message' : 'err'});
        return;
    }
    Talk.find( { 'category': req.body.category }, function (err, talk) {
        if(err) {
            console.error(err);
        }
        console.log('talk:' + talk);
        res.send({
            'message':'ok',
            'result': talk});
    });
};

exports.update = function(req, res){

    console.log('req: ' + req.body);
    
    Talk.update({_id: req.body.talk_id}, {$push: {'vote.voter_id': req.body.voter_id}, $inc: {'vote.num': 1}}, 
        function(err, result){
            //console.log('err:'+err);
            if(err) return err;
            console.log('result: '+ result);
            if(result > 0){
                res.send({'message' : 'ok'});
            }else{
                res.send({'message' : 'not found'});
            }
            //outcome.voter_id = true;
    });
}

// return 
//     'list': list,
//     'create': create,
//     'update': update,
//     'destroy': destroy,
//     'show': show
// };
//};


