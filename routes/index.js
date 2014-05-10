exports.index = function(req, res){
	res.render( 'index', { title : 'Try Talk everything!' });
}

exports.load = function(req, res){
	// home page to
    res.render('front_layout');
};

exports.search = function(db){
	return function(req, res){
		
	}
};

exports.userAuth = function(req, res){

};