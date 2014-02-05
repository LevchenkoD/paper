var db = require('./db');

var fnPublish = function(data, fn){
	var link = data.url || '/'+ Math.round(Math.random() * 1000000)
		
		,	newPost = new db.Post({
				title: data.title || '',
				url: link.toString(),
				body: data.body || '',
				tags: data.tags || [],
				date: new Date().getTime(),
				author: data.author || {},
				status: data.status || '',
				stats: {}
			});
		
		newPost.save(function(err, post){
			if(err) throw err;
			if(fn && typeof(fn) === 'function'){
				fn(link)
			}
		});
}

var fnRemove = function(url, fn){
	if(url){
		db.Post.findOne({url: url}, function(err, post){
			if(err) throw err;
			
			if(post){
				post.remove(function(err){
					if(err) throw err;
					fn(err, true);
				});
			} else {
				var e = new Error().message = "Post not found";
				fn(e, false);
			}
		});
	}
};

exports.fnPublish = fnPublish;
exports.fnRemove = fnRemove;

exports.publish = function(req, res){
	var data = req.body;
	if(data){
		fnPublish(data, function(link){
			res.redirect(link);
		})
	} else {
		
	}
};

exports.updatePost = function(req, res){
	var url = '/' + req.params.post;
	db.Post.findOne({url: url}, function(err, post){
		if(err) throw err;
		
		var data = req.body;
		
		if(post){
			post.title = data.title,
			post.body = data.body,
			post.tags = data.tags
			
			post.save(function(err){
				if(err) throw err;
				
				res.redirect(url + '/edit');
			});
		}
		
	});
}

exports.getPost = function(id, fn){
	if(id.length){
		if(Array.isArray(id)){
			db.Post.find({'_id' : {$in: id}}, function(err, posts){
				if(err) throw err;
				
				if(fn && typeof(fn) === 'function'){
					fn(err, posts)
				}
			});
		} else {
			db.Post.findOne({'_id': id}, function(err, post){
				if(err) throw err;
				
				if(fn && typeof(fn) === 'function'){
					fn(err, post);
				}
			})
		}
	}
};

exports.latest = function(req, res){
	var l = req.params.l || 10
		,	s = req.params.s || 0;
		
	db.Post.find().skip(s).limit(l).sort({ 'date' : -1}).exec(function(err, posts){
		if(err) throw err;
		var list = '';
		
		for(var i=0; i< posts.length; i++){
			list += '<div class="_post"><h2 class="_title"><a href="'+posts[i].url+'" data-post-id="'+posts[i]._id+'">'+posts[i].title+'</a><a href="'+posts[i].url+'/edit" class="_edit">edit</a></h2><p>' + posts[i].body + '</p></div>';
		}
		
		res.render('../pages/index.jade', {list: list});
		
	});
}

exports.remove = function(req, res){
	var url = '/'+req.params.post;
	
	fnRemove(url, function(err, removed){
		if(err) throw err;
		
		if(removed){
			res.redirect('/');
		}
	});
}