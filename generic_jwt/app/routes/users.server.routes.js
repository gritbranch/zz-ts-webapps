var users = require('../../app/controllers/users.server.controller'),
    passport = require('passport');

module.exports = function(app) {

	app.route('/api/signup')
		.post(users.signup, users.signin);
	
	app.route('/api/signin')
		.post(users.signin);
	
	app.route('/api/users')
		.get(users.authenticateJwt, users.find)
		.post(users.authenticateJwt, users.create);	

	app.route('/api/users/:userId')
		.get(users.authenticateJwt, users.read)
		.put(users.authenticateJwt, users.update)
		.delete(users.authenticateJwt, users.delete);

	app.param('userId', users.findById);
};