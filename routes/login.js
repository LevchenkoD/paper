exports.login = function(req, res){
	if(req.session.auth){
		res.redirect('/');
	} else {
		res.render('../pages/login.jade', {
			
		});
	}
}