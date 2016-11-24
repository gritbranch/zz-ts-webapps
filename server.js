//Folder Structure
//	- app folder is where you keep your Express application logic
//		- controllers folder is where you keep your Express application controllers
//		- models folder is where you keep your Express application models
//		- routes folder is where you keep your Express application routing middleware
//		- views folder is where you keep your Express application views
//	- config folder is where you keep your Express application configuration files
//		- env folder is where you'll keep your Express application environment configuration files
//		- config.js file is where you'll configure your Express application
//		- express.js file is where you'll initialize your Express application
//	- public folder is where you keep your static client-side files
//		- css folder is where you keep your CSS files
//		- img folder is where you keep your image files
//		- js folder is where you keep your JavaScript files

//process.env is a global variable that allows you to access predefined environment variables, and the most common one is the NODE_ENV environment variable which is often used for environment-specific configurations
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var ip = process.env.IP || '0.0.0.0';

var port = Number(process.env.PORT) || 3000;

var mongoose = require('./generic/config/mongoose'),	//Requires mongoose module and creates a mongoose object.
	express = require('./generic/config/express'), 		//Requires express module and creates an express object.
    passport = require('./generic/config/passport');	//Requires passport module and creates a passport object.
	
var db = mongoose();
var app = express();
var passport = passport();

//Tells the Express application to listen to port 3000.
app.listen(port, ip);

var port_1 = Number(process.env.PORT + 1) || 3001;

var mongoose_1 = require('./tinecdesign/config/mongoose'),	//Requires mongoose module and creates a mongoose object.
	express_1 = require('./tinecdesign/config/express'), 	//Requires express module and creates an express object.
    passport_1 = require('./tinecdesign/config/passport');	//Requires passport module and creates a passport object.
	
var db_1 = mongoose_1();
var app_1 = express_1();
var passport_1 = passport_1();

//Tells the Express application to listen to port 3001.
app_1.listen(port_1, ip);



var port_2 = Number(process.env.PORT + 2) || 3002;

var mongoose_2 = require('./tlwb/config/mongoose'),	//Requires mongoose module and creates a mongoose object.
	express_2 = require('./tlwb/config/express'), 	//Requires express module and creates an express object.
    passport_2 = require('./tlwb/config/passport');	//Requires passport module and creates a passport object.
	
var db_2 = mongoose_2();
var app_2 = express_2();
var passport_2 = passport_2();

//Tells the Express application to listen to port 3002.
app_2.listen(port_2, ip);



//Returns the Express application object.
module.exports = {app, app_1, app_2};

if (ip === '0.0.0.0') {
	console.log('generic app running at http://localhost:' + port + '/');
	console.log('tinecdesign app running at http://localhost:' + port_1 + '/');
	console.log('tlwb app running at http://localhost:' + port_2 + '/');
} else {
	console.log('generic app running at http://' + ip + ':' + port + '/');
	console.log('tinecdesign app running at http://' + ip + ':' + port_1 + '/');
	console.log('tlwb app running at http://' + ip + ':' + port_2 + '/');	
}