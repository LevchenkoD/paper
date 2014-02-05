var db = require('./db')
	,	tmp = require('./tmp/tmp');

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
			post.tags = data.tags,
			post.url = data.url
			
			post.save(function(err){
				if(err) throw err;
				
				res.redirect(data.url + '/edit');
			});
		}
		
	});
}

exports.getPost = function(data, fn){
	if(data.id.length){
		if(Array.isArray(data.id)){
			db.Post.find({'_id' : {$in: data.id}}, function(err, posts){
				if(err) throw err;
				
				if(fn && typeof(fn) === 'function'){
					if(data.type === 'json'){
						fn(err, posts)
					} else {
						var page = tmp.html.postPage;
						var list = posts.map(function(i){
							var modPage = page;
							for(key in i){
								modPage = modPage.replace('_'+key+'_', i[key]);
							}
							return modPage;
						});
						fn(err, list);
					}
				}
			});
		} else {
			db.Post.findOne({'_id': data.id}, function(err, post){
				if(err) throw err;
				
				if(fn && typeof(fn) === 'function'){
					if(data.type === 'json'){
						fn(err, post)
					} else {
						var page = tmp.html.postPage;
						for(key in post){
							page = page.replace('_'+key+'_', post[key]);
						}
						fn(err, page);
					}
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
			post = posts[i];
			list += '<div class="_post"><h2 class="_title"><a href="'+post.url+'" data-post-id="'+post._id+'">'+post.title+'</a>'
					+'<a href="'+post.url+'/edit" class="_edit">edit</a></h2><p>' + post.body + '</p></div>';
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