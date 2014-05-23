var talk = require("./talk");



exports.index = function(req, res){
	res.render( 'index', { title : 'Try Talk everything!' });
}

exports.load = function(req, res){
	// home page to
    res.render('front_layout');
};

exports.search = function(req, res){
	talk.show("haha", function(data){
		console.log("data:" + data);
		res.render('front_layout', {'Topic': data.topic, 'speaker': data.speaker}, function(err, html){
			if(err) console.error(err);
		});
	});


};

exports.userAuth = function(req, res){

};