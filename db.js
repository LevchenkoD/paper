var mongoose = require('mongoose')
	,	db = mongoose.connection
	,	crypto = require('crypto')
	,	password = require('./password');

mongoose.connect('mongodb://localhost/paper');
	
exports.User = mongoose.model('User', {
	firstName: String,
	lastName: String,
	mail: String,
	password: String,
	login: String
});

exports.Post = mongoose.model('Post', {
	title: String,
	url: String,
	body: String,
	thumbText: String,
	tags: Array,
	date: String,
	author: Object,
	status: String,
	stats: Object
});

exports.Admin = mongoose.model('Admin', {
	theme: {
		name: String,
		path: String
	},
	themes: Array,
	stats: Object	
});