var request = require('request');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = require('../db');
var express = require('express');
var app = express();

var DeviceSchema = new Schema({

    name: { type: String, required: true},
    category: { type: Boolean},
    status: { type: Boolean}

});
//create a model
var Device = mongoose.model('Device', DeviceSchema);

exports.create = function(req, res) {
//create documents
//db.collectionName.save({key: value});
    console.log('created');
    var device = new Device({

        name: req.body.name,
        category: req.body.category,
        status: req.body.status
    });
    device.save(function (err, data){
        if(err) {
            console.error(err);
            res.send({
                message :'something went wrong'
            });
        } else {
        console.log('data has bees saved: ' + data);
        res.send(data);
        }
    });
};
exports.show = function(req, res) {

    console.log('show');

    if(req.body.category === null){
        res.send({'message' : 'err'});
        return;
    }
    Device.find( { 'category': req.body.category }, function (err, talk) {
        if(err) {
            console.error(err);
        }
        console.log('device:' + device);
        res.send({
            'message':'ok',
            'result': device});
    });
};
