var objectID = require('mongodb').ObjectID;
var request = require('request');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = require('../db');
var express = require('express');
var app = express();
var lunr = require('lunr');

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
    Talk.find({$or :[{'host_id': req.body.user_id}, {'vote.voter_id': req.body.user_id}]}, function (err, talks){
        if(err) {
            console.log(err);
            res.json({error: err.name}, 500);
        }
        //res.render('front_layout', {userName: req.body.user_name});
        res.send({
            'message': 'ok',
            'result': talks});
      });

};


exports.create = function(req, res) {
//create documents
//db.collectionName.save({key: value});
    console.log('created');
    var talk = new Talk({
        host_id: req.body.host_id,
        topic: req.body.topic,
        speaker: req.body.speaker,
        category: req.body.category,
        vote: {num: 0, voter_id:[]},
        description: req.body.description,
        imageURL: req.body.imageURL
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

    console.log('show');

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
            console.log('result: '+ JSON.stringify(result));
            if(result > 0){
                res.send({'message' : 'ok'});
            }else{
                res.send({'message' : 'not found'});
            }
            //outcome.voter_id = true;
    });
};
//抓出 database 的資料再塞進 doc 裡
exports.search = function(req, res){
    console.log('search');
    var idx = lunr( function () {
        this .field( 'topic' , { boost: 10 });
        this .field( 'speaker', { boost: 10 });
        this .field( 'description', { boost: 10 });
    });
    var doc = [];
    //-mongo find
    Talk.find( {}, function (err, talk) {
        if(err) {
            console.error(err);
        }
        console.log('search:'+talk);
        res.send({
            'search': talk
        });
        talk.forEach(function(element, index, array){

            doc.push(element);
            console.log('link to lunr:', element);
            //每次抓一個 object, 丟進 lunr idx 中
        });
    });

    console.log('doc: ', doc);
    idx.add(doc);

    //搜索, 出現 _ref & score>> 這邊壞掉
    var result = idx.search( 'Hackathon' );
    console.log('very improtant', result);

};
// return
//     'list': list,
//     'create': create,
//     'update': update,
//     'destroy': destroy,
//     'show': show
// };
//};


