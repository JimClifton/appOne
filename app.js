
/**
 * Module dependencies.
 */

var _express = require('express');
var _routes = require('./routes');
var _http = require('http');
var _path = require('path');
var _posts = require('./routes/posts');

var app = _express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', _path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(_express.favicon());
app.use(_express.logger('dev'));
app.use(_express.json());
app.use(_express.urlencoded());
app.use(_express.bodyParser());
app.use(_express.methodOverride());
app.use(_express.cookieParser());
app.use(_express.session({secret: '1234567890QWERTY'}));
app.use(app.router);
app.use(_express.static(_path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(_express.errorHandler());
}

app.get('/', _routes.index);
app.get('/logout', _routes.logout);

app.get('/login', _routes.loginForm);
app.post('/login', _routes.login);

app.get('/posts', _posts.findAll);
app.get('/posts/:id', _posts.findById);

app.get('/addpost', _posts.addPostForm);
app.post('/addpost', _posts.addPost);

app.get('/posts/update/:id', _posts.updatePostForm);
app.put('/posts/update/:id', _posts.updatePost);

app.delete('/posts/:id', _posts.deletePost);

_http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
