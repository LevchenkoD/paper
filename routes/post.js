var db = require('../db');

exports.post = function(req, res){
	
	db.Post.findOne({url: '/'+req.params.post}, function(err, post){
		if(err) throw err;
		
		res.render('../pages/post.jade', post);
		
	});	

}

exports.newPost = function(req, res){
	res.render('../pages/new-post.jade');
}