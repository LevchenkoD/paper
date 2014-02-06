var db = require('../db')
	,	jade = require('jade')
	,	Fn = require('../fn/fn');

var Admin = {
	main: function(data, fn){
		db.Post.find().select('title url').sort({date: -1}).exec(function(err, list){
			if(err) throw err;
			fn(list);
		});
	}
};

exports.main = function(req, res){
	Admin.main(req, function(posts){
		var list = '';
		
		posts.map(function(post){
			jade.renderFile('./pages/tmp/post-preview.jade', post,  function(err, html){
				console.log(html);
				if(err) throw err;
				
				list += html;
			});
		});
		
		res.render('../pages/admin.jade', {
			list: list
		});
		
	});
}