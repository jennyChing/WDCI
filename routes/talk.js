var objectID = require('mongodb').ObjectID;
var request = require('request');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = require('../db');

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

exports.list = function(data, callback) {
    Talk.find(function (err, talks, count){
        if(err) return console.log(err);
        console.error(err);
    });
}

exports.create = function(data, callback) {
//create documents
//db.collectionName.save({key: value});
    console.log('created');
    var talk = new Talk({
        topic: data.topic,
        speaker: data.speaker,
        category: data.category,
        description: data.description
    });
    talk.save(function (err, talk){
        if(err) return console.error(err);
        console.log(talk);
    });
};
exports.show = function(data, callback) {

    Talk.findById( { topic: 'hihi'}, function (err, talk) {
        if(err) return console.log(err);
        console.error(err);
    });
}

//     function update(data, callback)
// // update place & votes(remember ID in the array)

//     )};

function destroy(data, callback) {
    cDomain.remove(data.get, function(err, removed) {
        if (err) {
            callback(err, null);
        }else{
            cb(null, removed);
        }
    });
}

// return {
//     'list': list,
//     'create': create,
//     'update': update,
//     'destroy': destroy,
//     'show': show
// };
//};



function queryQry (req, res) {
    var data =  makeObject(req.body);

    index.create(data, function (err, data) {
        console.log(err, data);
        res.send(data);
    });

}
