var	express = require('express') 
	,	app = express()
	,	http = require('http')
	, 	server = http.createServer(app)
	, 	io = require('socket.io').listen(server, {log: false})
	,	path = require('path')
	,	fs = require('fs')
	,	db = require('./db')
	,	user = require('./user')
	,	post = require('./post')
	,	routes = require('./routes/routes');

app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({secret: 'adgdgrr523rd/e/.fd,sfemowr'}));
//app.use(express.favicon("public/images/favicon.ico")); 
app.use(express.static(__dirname + '/public'));

app.get('/', post.latest);
app.get('/login', routes.login);
app.post('/login', user.auth);
app.post('/logout', user.logout);
app.get('/new-post', user.isAuth, routes.newPost);
app.post('/publish-post', post.publish);
app.get('/:post', routes.post);
app.get('/:user', routes.user);

app.get('*', function(req, res){
	res.write('It\'s paper, bitch');
	res.end();
});


io.sockets.on('connection', function(socket){
	
	socket.on('publish', function(data, fn){
		if(data){
			fnPublish(data, function(link){
				fn(link);
			});
		}
	});
	
});


server.listen(2020, '0.0.0.0',function(){
   console.log("Started at " + new Date() );
});

