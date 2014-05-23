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
    topic: { type: String, required: true},
    status: { type: Boolean},
    speaker: { type: String, required: true},
    category: { type: String, required: true},
    description: { type: String, required: true},
    vote: {
        type: Number,
        id: []
    },
    imageURL: { type: String}
});
//create a model
var Talk = mongoose.model('Talk', TalkSchema);

//save into mongoDB
//module.exports = function(db) {

var mongoose = require('mongoose');
var Talk = mongoose.model('Talk');

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
        topic: res.topic,
        speaker: res.speaker,
        category: res.category,
        description: res.description
    });
    talk.save(function (err, talk){
        if(err) {
            console.error(err);
        }
        console.log(talk);
    });
};
exports.show = function(req, res) {

    Talk.find( { topic: '東方神祕力量'}, function (err, talk) {
        if(err) {
            console.error(err);
        }
        console.log('talk:'+talk);
        res.send(talk);
        // callback();
        //console.error(err);
    });
};



exports.update = function(req, res){
    Talk.findById( req.params.id, function(err, talk){

        // update place & votes(remember ID in the array)
    });
};



// return {
//     'list': list,
//     'create': create,
//     'update': update,
//     'destroy': destroy,
//     'show': show
// };
//};


