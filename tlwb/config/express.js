var config = require('./config'),					//requires config.js
	express = require('express'),					
  	morgan = require('morgan'),						//morgan module provides a simple logger middleware
  	compress = require('compression'),				//compression module will provides response compression
  	bodyParser = require('body-parser'),			//body-parser module provides several middleware to handle request data
  	methodOverride = require('method-override'),	//method-override module provides DELETE and PUT HTTP verbs legacy support
  	session = require('express-session'),			//express-session module will use a cookie-stored, signed identifier to identify the current user
  	flash = require('connect-flash'),				//registers flash module to the application
	passport = require('passport');					//registers passport middleware to the application

//Used the CommonJS module pattern to define a module function that initializes the Express application.
module.exports = function() {
	//Created the first instance of Expres application.
	var app = express();

	//determine our environment and configure the Express application accordingly
	if (process.env.NODE_ENV === 'development') {
		//loads morgan() middleware in a development environment
		app.use(morgan('dev'));
	} else if (process.env.NODE_ENV === 'production') {
		//loads compress() middleware in a production environment
		app.use(compress());
	}

	app.use(bodyParser.urlencoded({
		extended: true
	}));
	

	app.use(bodyParser.json());
	app.use(methodOverride());

	//session middleware adds a session object to all request objects in your application
	app.use(session({
    	saveUninitialized: false,
    	resave: true,
    	secret: config.sessionSecret
  	}));

	//app.set() method to configure the Express application views folder and template engine
  	app.set('views', './tlwb/app/views');
  	app.set('view engine', 'ejs');

	//sets folder path to public (win32 vs. linux)
	if (process.platform === 'win32') {
		app.use(express.static(__dirname + '\\public\\'));      
	} else {
		app.use(express.static(__dirname + '/public/'));  
	}

	app.use(flash());				//creates a new flash application in the session
 	app.use(passport.initialize()); //bootstraps the passport module
 	app.use(passport.session());	//uses express session to keep track of user's session

	require('../app/routes/index.server.routes.js')(app); //Requires the routing index and executes it passing the app as paramater.
	require('../app/routes/users.server.routes.js')(app); //Requires the routing users and executes it passing the app as paramater.
	require('../app/routes/articles.server.routes.js')(app); //Requires the routing articles and executes it passing the app as paramater.
	
	//loads express.static() to serve static files. This middleware takes one argument to determine the location of the static folder
	app.use(express.static('./tlwb/public'));

	return app;
};