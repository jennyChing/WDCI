var async = require('async');
var objectID = require('mongodb').ObjectID;
var request = require('request');

module.exports = function(db) {

    var cTalk = db.collection('talk');
    var cUser = db.collection('user');


    function list(data, callback) {
        cTalk
            .find(data.get, data.filter)
            .limit(data.limit)
            .skip(data.skip)
            .sort(data.sort, function(err, data) {
                if (err){
                    callback(err, null);
                }else{
                    callback(null, data);
                }
            });
    }

    function create(data, callback) {
//create documents
//db.collectionName.save({key: value});
        var user = {};
        var talk = {};
        // console.log('domain->create',data);

        //function callback, success 才進入下一個 function
        async.waterfall([

            // user.collection-->object: ID, email, type
            function(cb){

                cUser.findOne(
                    {
                        _id : objectID(data.user._id),
                        //return data 中的 user
                    },
                    function(err,res){
                        if(err || !res){
                            cb('user undefined',null);
                        }else{
                            order.user = {
                                _id : res._id,
                                email : res.email,
                                _type : res._type
                            }
                            cb(null,true);
                        }
                    }
                );
            },

            //price :product, total price
            function(nil,cb){

                var product = {
                    domain: data.domain,
                    dns : data.dns,
                    term: data.term
                };
                var price = {
                    ".com":[20,40,60,100,200],
                    ".com.tw":[30,60,90,150,300],
                    ".org":[300,600,1000,2000]
                };
                var dns = data.dns;
                var a = data.term;
                order.product = product;
                order.total = {
                    currency : 'TWD'
                };
                // console.log('price', data);
                order.total.price = price[dns][parseInt(a, 10)];

                if(order.total.price<=0){
                    cb('total error',true);
                }else{
                    // console.log('Price result', order.total.price);
                    cb(null, data);
                }
            },

            function(nil,cb){
                cDomain.save(
                    order, function(err, data){
                        if(err){
                            cb('Order cannot save', null);
                        }else{
                            cb(null, data);
                        }
                    }
                )
            }

        ], function(err, res) {
            var result = {};
            result.data = res;
            result.data.payDollarMerchantID = '88587074';
            console.log('hsjdkajsd', result);
            callback(err, result);
        });

    }

    function update(data, callback) {

    console.log('update', data);
    var post = false;
    var domainData = {};

    async.waterfall([

         //find the paid order, check payment status
        //if(data !== null)
            function(cb) {

                cDomain.findOne(
                    {
                        _id: objectID(data.Ref)
                    },
                    function(err, domain) {
                        domainData = domain;
                        cb(null, domain);
                    }
                );
            },

            // if/else 判斷式驗證>>更新 status (set/push)
            function(domain, cb) {

                var filter = {
                    '$set' : {},
                    '$push' : {}
                }
                if(domain.total.price===parseFloat(data.Amt) && data.prc==='0' && data.src==='0'){
                    console.log('true');
                    filter['$set']['payment.info'] = data;
                    filter['$push']['payment.status'] = {status : 'ok'};
                    post = true; //update status

                }else if(domain.total.price !=parseFloat(data.Amt)){
                    data.errMessage ='wrong price';
                    filter['$set']['payment.info'] = data;
                    filter['$push']['payment.status'] = {status : 'cancel'};
                }else if (data.prc != 0 || data.src != 0){
                    data.errMessage = 'payment failed';
                    filter['$set']['payment.info'] = data;
                    filter['$push']['payment.status'] = {status : 'cancel'};
                }else{
                    filter['$set']['payment.info'] = data;
                    filter['$push']['payment.status'] = {status : 'cancel'};

                }
                cb(null, filter);
            },

             //update the domain object data
            function(filter, cb) {

                cDomain.update(
                    {
                        _id : objectID(data.Ref)
                    },
                    filter,
                    function(err,res){
                        cb(err, res);
                    }
                );


            },

            // use data from the top funtion, check and post the update info to register API in mySite
            function(data, cb) {

                if(post){
                    var config = {password:'yaphup7!'};
                    console.log('post');
                    register(domainData);
                    function register(domain, callback){
                        console.log('start');
                        var url = 'http://dnapi.aptg.com.tw/api/reg.php';
                        var ti = moment().format();

                        var data = {
                            source:"54371984",
                            systime:ti,
                            checksum: toMd5(ti),
                            d_name: domain.product.domain || 'meepshop',
                            sld: domain.product.dns || '.com',
                            dpasswd: 'yaphup7!',
                            postno: domain.regData.postno || '105',
                            caddr: domain.regData.regAdress ||"123 Example Dr.",
                            eaddr: domain.regData.regAdress ||"123 Example Dr.",
                            apyid: domain.regData.apyid || 'a2342353465',
                            apycname: domain.regData.regName || "Jenny",
                            apyename: domain.regData.regName || "Jenny",
                            apy_tel_area_code: domain.regData.regPhone || "+123.1234567890",
                            apy_tel_number: domain.regData.regPhone || "+123.1234567890",
                            apyemail: domain.user.email || "jenny@meepShop.com",
                            term:domain.product.term || '3',
                            // reg_contact_type: "1",
                            // reg_company: "meepShop Inc",
                            // reg_fname:domain.regData.regName || "Jenny",
                            // reg_lname:domain.regData.regName || "Ching",
                            // reg_addr2:"100 Suite",
                            // reg_state:"Dulles",
                            // reg_city:"VA",
                            // reg_postcode:"47500",
                            // reg_telephone:domain.regData.regPhone || "+123.1234567890",
                            // reg_country:domain.regData.regCountry || "US",
                            // ref_email: domain.user.email || "jenny@meepShop.com",
                            username:'meepshop',
                            password:'yaphup7!',
                            refno:"123456"
                            };

                            sendNewreg(url, data, function(err, data){
                                callback(err, data);
                            });
                         };

                        function toMd5(time){
                           var arg = '還沒寄來'+time+crypto.createHash('md5').update(config.password).digest('hex');
                           var result = crypto.createHash('md5').update(arg).digest('hex');

                           return result;
                        };

                        function sendNewreg(url, data, callback){
                            var now = moment().format();

                            data.source= "還沒寄來";
                            data.otime= now;
                            data.ochecksum= toMd5(now);

                            var newreg = {
                                 method: 'POST',
                                 url: url,
                                 form: data
                            }
                            console.log('newreg', newreg);
                        }

                }else{
                    cb(null, data);
                }
            }

        ],
        function(err, res) {
            if (err) {
                callback(err, null);
            } else {
                callback(err, data);
            }
        }
    )};

    function destroy(data, callback) {
        cDomain.remove(data.get, function(err, removed) {
            if (err) {
                callback(err, null);
            }else{
                cb(null, removed);
            }
        });
    }

    function show(data, callback) {
        cDomain
            .findOne(data.get, function(err, data) {
                if (err){
                    callback(err, null);
                }else{
                    cb(null, data);
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