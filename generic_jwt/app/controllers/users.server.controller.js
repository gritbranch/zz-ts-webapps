var User = require('mongoose').model('GenJWT_User');
var config = require('../../config/config');
var jwt = require('jsonwebtoken');

//Private method that returns a unified error message from a Mongoose error object.
var getErrorMessage = function (err) {
	var message = '';

	//a MongoDB indexing error handled using the error code
	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'Username already exists';
				break;
			default:
				message = 'Something went wrong';
		}
	} else {
		//Mongoose validation error handled using the err.errors object
		for (var errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}

	return message;
};

//Authenticate is the route protector. Check if the user is authenticated.
exports.authenticateJwt = function (req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.headers.authorization || req.body.token || req.query.token || req.headers['x-access-token'];

	// decode token
	if (token) {
		// verifies secret and checks exp
		jwt.verify(token, config.jwtSecretKey, function (err, decoded) {
			if (err) {
				return res.json({ success: false, message: 'Failed to authenticate token.' });
			} else {
				// if everything is good, save to request for use in other routes
				req.decoded = decoded;
				next();
			}
		});
	} else {
		// if there is no token
		// return an error
		return res.status(403).send({
			success: false,
			message: 'No token provided.'
		});
	}
};

//Uses User model to create new users. Sign Up process.
exports.signup = function (req, res, next) {
	if (!req.user) {
		//It first creates a user object from the HTTP request body. Then, try saving it to MongoDB.
		var user = new User(req.body);
		var message = null;

		user.provider = 'local';
		user.admin = true;

		user.save(function (err) {
			if (err) {
				var message = getErrorMessage(err);

				res.json({ success: false, message: message });
			}

			next();
		});
	}
};

//Creates JWT. Sign In process.
exports.signin = function (req, res) {

	// find the user
	User.findOne({
		username: req.body.username
	}, function (err, user) {

		if (err) throw err;

		if (!user) {
			res.json({ success: false, message: 'Authentication failed. User not found.' });
		} else if (user) {

			// check if password matches
			if (!user.authenticate(req.body.password)) {
				res.json({ success: false, message: 'Authentication failed. Wrong password.' });
			} else {

				// if user is found and password is right
				// create a token
				// if user is found and password is right
				//var token = jwt.sign(user.username, config.jwtSecretKey, {
				//	expiresIn: 60 * 24 // expires in 24 hours
				//});

				var token = jwt.sign(user.username, config.jwtSecretKey);

				// return the information including token as JSON
				res.json({
					success: true,
					message: 'Enjoy your token!',
					token: token
				});
			}

		}

	});
};

//Find All Users
exports.find = function (req, res) {
	// find() function of Mongoose to get the collection of user documents, and while we could add a MongoDB query of some sort, for now we'll retrieve all the documents in the collection.
	User.find({}, function (err, users) {
		if (err) {
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			res.json(users);
		}
	});
}

//Middleware function signature contains all the Express middleware arguments and an id argument
exports.findById = function(req, res, next, id) {
  User.findById(id, function(err, user) {
    if (err) return next(err);
    if (!user) return next(new Error('Failed to load user ' + id));

    req.user = user;
    next();
  });
};

//Used the Mongoose instance save() method to save the article document.
exports.create = function(req, res) {
  var user = new User(req.body);
  
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.email = req.body.email;
  user.username = req.body.username;
  user.password = req.body.password;
  user.admin = req.body.admin;

  user.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json(user);
    }
  });
};

// Output the user object as a JSON representation. Assumes that you already obtained the user object in the findById() middleware.
exports.read = function(req, res) {
  res.json(req.user);
};

// update() method also makes the assumption that you already obtained the user object in the findById() middleware.
exports.update = function(req, res) {
  var user = req.user;

  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.email = req.body.email;
  user.username = req.body.username;
  user.password = req.body.password;
  user.admin = req.body.admin;

  user.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json(user);
    }
  });
};

// delete() method also makes use of the already obtained user object by the findById() middleware.
exports.delete = function(req, res) {
  var user = req.user;

  user.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json(user);
    }
  });
};