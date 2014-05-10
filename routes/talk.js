var objectID = require('mongodb').ObjectID;
var request = require('request');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//mongoose

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log('mongoose');
});

module.exports.createTalk = function(req, res) {
    var talk = {
        topic: req.body.topic,
        speaker: req.body.speaker,
        category: req.body.category,
        description: req.body.description
    }
    res.send('talk', talk);
    console.log('talk', talk);
};
//create schema
var TalkSchema = new Schema({

    id: { type: String, required: true},
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
module.exports = function(db) {

    var mongoose = require('mongoose');
    var Talk = mongoose.model('Talk');

    function list(data, callback) {
        Talk.find(function (err, talks, count){
            if(err) return console.log(err);
            console.error(err);
        });
    }

    function create(data, callback) {
//create documents
//db.collectionName.save({key: value});
        var talk = new Talk({
            topic: talk.topic,
            speaker: talk.speaker,
            category: talk.category,
            description: talk.description
        });
        talk.save(function (err, talk){
            if(err) return console.log(err);
            console.error(err);
        });
    };
    function show(data, callback) {

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

    return {
        'list': list,
        'create': create,
        'update': update,
        'destroy': destroy,
        'show': show
    };
};



function queryQry (req, res) {
    var data =  makeObject(req.body);

    index.create(data, function (err, data) {
        console.log(err, data);
        res.send(data);
    });

}
