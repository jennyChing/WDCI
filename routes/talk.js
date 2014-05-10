var objectID = require('mongodb').ObjectID;
var request = require('request');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TalkSchema = new Schema({

    id: { type: String, required: true },
    topic: { type: String, required: true},
    status: { type: Number, required: true},
    speaker: { type: String, required: true},
    category: { type: String, required: true},
    description: { type: String, required: true},
    vote: { type: Number, required: true}

});

// module.exports = function(db) {

//     var cTalk = db.collection('talk');
//     var cUser = db.collection('user');


//     function list(data, callback) {
//         cUser.find(function (err, users, count){
//             if(err){
//                 console.error(err);
//                 res.json{error: err.name}, 500);
//             };
//             res.json({users: users});
//         });
//     }

//     function create(data, callback) {
// //create documents
// //db.collectionName.save({key: value});
//         var user = {};
//         var talk = {};
//         user.save(funciton (err, newUser){
//             if(err){
//                 console.error(err);
//                 res.json{error: err.name}, 500);
//             };
//             res.json({users: users});
//         });
//     };
//     function show(data, callback) {
//         cTalk
//             .findOne(data.get, function(err, data) {
//                 if (err){
//                     callback(err, null);
//                 }else{
//                     cb(null, data);
//                 }
//             });
//     }

//     function update(data, callback)
// // update place & votes(remember ID in the array)

//     )};

//     function destroy(data, callback) {
//         cDomain.remove(data.get, function(err, removed) {
//             if (err) {
//                 callback(err, null);
//             }else{
//                 cb(null, removed);
//             }
//         });
//     }

//     return {
//         'list': list,
//         'create': create,
//         'update': update,
//         'destroy': destroy,
//         'show': show
//     };
// };



// function queryQry (req, res) {
//     var data =  makeObject(req.body);

//     index.create(data, function (err, data) {
//         console.log(err, data);
//         res.send(data);
//     });

// }