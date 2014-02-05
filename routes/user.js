var db = require('../db');

exports.user = function(req, res){
	var login = req.params.user;

	db.User.findOne({login: login}).select('firstName lastName login').exec(function(err, user){
		if(err) throw err;

		if(user){
			res.render('../pages/user.jade', user);
		} else {
			res.redirect('/');
		}
	});
	
	
};