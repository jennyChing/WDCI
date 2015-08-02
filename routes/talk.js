var objectID = require('mongodb').ObjectID;
var request = require('request');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = require('../db');
var express = require('express');
var app = express();
var lunr = require('lunr');

//mongoose


//create schema, device
var TalkSchema = new Schema({

    id: { type: String},
    host_id: {type: String},
    name: { type: String, required: true},
    category: { type: Boolean},
    description: { type: String, required: false},

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
        name: req.body.name,
        category: req.body.category,
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

exports.showhot = function(req, res){
    console.log('show hot');
    Talk.find({}, null, {
        limit: 8,
        sort:{
            'vote.num': -1
        }
    },function(err, items){
        console.log(err);
        console.log(items);
        res.send(items);
    });
};

exports.update = function(req, res){

    //console.log('req: ' + req.body);

    Talk.update({_id: req.body.talk_id}, {$addToSet: {'vote.voter_id': req.body.voter_id}, $inc: {'vote.num': 1}},
        function(err, result){
            console.log('err:'+err);
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
     // var idx = lunr( function () {
     //            this .field( 'topic' );
     //            this .field( 'speaker');
     //            this .field( 'description');
     //        });
    var doc = [];
    //-mongo find and push to doc
    var str = req.body.talk;
    Talk.find( {$or : [{'topic' : str,
                        'speaker': str,
                        'description': str}], }, function (err, talk) {
        if(err) {
            console.error(err);
        }

        //console.log('search:'+talk);
        res.send({
            'search': talk
        });
        talk.forEach(function(element, index, array){

            //doc.push(element);
            //idx.add(element);
            var idx = lunr( function () {
                this .field( 'topic' );
                this .field( 'speaker');
                this .field( 'description');
            });
            var search_data = {
                'topic': element.topic,
                'speaker': element.speaker,
                'description': element.description,
                'id' : element._id
            };
            //idx.add(search_data);
            console.log('link to lunr:', search_data);
            //var result = idx.search( 'hack' );
            //console.log('very improtant', result);

        });
        //console.log('doc: ', doc);
        // var result = idx.search( 'hack' );
        // console.log('very improtant', result);
        //搜索, 出現 _ref & score>> 這邊壞掉

    });



};
// return
//     'list': list,
//     'create': create,
//     'update': update,
//     'destroy': destroy,
//     'show': show
// };
//};


