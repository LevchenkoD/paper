var mongoose = require('mongoose')
	,	db = mongoose.connection
	,	crypto = require('crypto')
	,	password = require('./password');

mongoose.connect('mongodb://localhost/paper');
	
var User = mongoose.model('User', {
	firstName: String,
	lastName: String,
	mail: String,
	password: String,
	login: String
});

var Post = mongoose.model('Post', {
	title: String,
	url: String,
	body: String,
	tags: Array,
	date: String,
	author: Object,
	status: String,
	stats: Object
});

exports.User = User;
exports.Post = Post;

 