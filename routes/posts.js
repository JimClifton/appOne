var _mongo = require('mongodb');

var Server = _mongo.Server,
	Db = _mongo.Db,
	BSON = _mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect:true} );
db = new Db('postdb', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'postdb' database");
        db.collection('posts', {strict:true}, function(err, collection) {
        	// Getting the posts collection
        });
    }
});

function checkSession(req, res) {
    if (!req.session.login) {
        res.redirect('/login');
    }
}

exports.findAll = function(req, res) {
    checkSession(req, res);
	db.collection('posts', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.render('posts', {items: items});
        });
    });
};
 
exports.findById = function(req, res) {
    checkSession(req, res);
	var id = req.params.id;
    console.log('Retrieving post: ' + id);
    db.collection('posts', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            //res.send(item);
            res.render('getPost', {post: item});
        });
    });
};

exports.addPostForm = function(req, res) {
    checkSession(req, res);
    res.render('addPostForm');
};

exports.addPost = function(req, res) {
	var post = req.body;
    console.log(post);
    console.log('Adding post: ' + JSON.stringify(post));
    db.collection('posts', function(err, collection) {
        collection.insert(post, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.redirect('/posts');
            }
        });
    });
};

exports.updatePostForm = function(req, res) {
    checkSession(req, res);
    var id = req.params.id;
    console.log('Retrieving post: ' + id);
    db.collection('posts', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            //res.send(item);
            res.render('updatePostForm', {post: item});
        });
    });
};

exports.updatePost = function(req, res) {
	var id = req.params.id;
    var post = req.body;
    console.log('Updating post: ' + id);
    console.log(JSON.stringify(post));
    db.collection('posts', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, post, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating post: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(post);
            }
        });
    });
};

exports.deletePost = function(req, res) {
    var id = req.params.id;
    console.log('Deleting post: ' + id);
    db.collection('posts', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
};