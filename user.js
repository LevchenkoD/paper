var db = require('./db')
	,	password = require('./password');

exports.create = function(data, callback){

	if(data){
			
		var user = new db.User({
			firstName: data.firstName,
			lastName: data.lastName,
			mail: data.mail,
			password: password.hash(data.password),
			login: data.login
		});
		
		user.save(function(err, user){
			
			if(err) throw err;
			
			if(callback && typeof(callback) === 'function'){
				callback(null, user);
			}
			
		});

	} else {
	
		if(callback && typeof(callback) === 'function'){
			var err = x = new Error().message="No user data";
			callback(err, null);			
		}
	
	}
	
};
	
exports.remove = function(id, callback){
	if(id){
	
		db.User.findOne({ '_id' : id}).remove(function(err){
			if(err) throw err;
			
			if(callback && typeof(callback) === 'function'){
				callback(true);
			}
			
		});
	
	} else {
	
		if(callback && typeof(callback) === 'function'){
			var err = x = new Error().message="No user ID";
			callback(err, null);			
		}
	
	}
};

exports.auth = function(req, res, next){
	var login = req.body.login
		,	pwd = req.body.password;
		
	if(login && password){
	
		db.User.findOne({login: login}).select('password').exec(function(err, user){
			if(err) throw err;
			if(user){
				if(password.validate(user.password, pwd)){
					req.session.auth = true;
					req.session.id = user._id
					res.redirect('/');
				} else {
					res.redirect('/login');
				}
			} else {
				res.redirect('/login');
			}
		});
		
	} else {
		res.redirect('/login');
	}
	
}

exports.logout = function(req, res){
	req.session.auth = false;
	req.session.id = '';
	
	res.redirect('/login');
}


exports.isAuth = function(req, res, next){

	if(req.session.auth){
		next();
	} else {
		res.redirect('/login');
	}

};
