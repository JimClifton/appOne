var _mongo = require('mongodb');

var Server = _mongo.Server,
	Db = _mongo.Db,
	BSON = _mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect:true} );
db = new Db('postdb', server);

function checkSession(req, res) {
    if (!req.session.login) {
        res.redirect('/login');
    }
}

exports.index = function(req, res) {
	checkSession(req, res);
    res.render('index', { title: 'Express' });
};

exports.loginForm = function(req, res) {
	res.render('loginForm');
};

exports.login = function(req, res) {
	var _username = req.param('username');
	var _password = req.param('password');
	db.collection('users', function(err, collection) {
        collection.findOne({username: _username}, function(err, item) {

            if (_password == item.password) {
                req.session.login = true;
                res.redirect('/posts');
            } else {
            	res.send('Password does not match!');
            }

        });
    });
};

exports.logout = function(req, res){
    req.session.login = false;
    res.render('logout'); 
};