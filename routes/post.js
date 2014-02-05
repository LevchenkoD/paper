var db = require('../db');

exports.post = function(req, res){
	
	db.Post.findOne({url: '/'+req.params.post}, function(err, post){
		if(err) throw err;
		
		res.render('../pages/post.jade', post);
		
	});	

}

exports.newPost = function(req, res){
	res.render('../pages/new-post.jade', {
		action: '/publish-post',
		title: 'New post',
		url: 'new-post',
		body: '',
		tags: '',
		date: '',
		author: '',
		status: 'draft',
		stats: ''
	});
};

exports.editPost = function(req, res){
	var url = '/' + req.params.post;

	db.Post.findOne({'url' : url}, function(err, post){
		if(err) throw err;
		if (post){
			function collectData(fn){			
				var data ={
					action: url+'/update'
				};
				
				for(key in post){
					data[key] = post[key]
				}

				fn(data);
			}
			
			collectData(function(data){
				res.render('../pages/new-post.jade', data);
			});
			
		}
	})
}