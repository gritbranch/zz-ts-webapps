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

var port_1 = Number(process.env.PORT) || 3001;

var mongoose_1 = require('./generic/config/mongoose'),	//Requires mongoose module and creates a mongoose object.
	express_1 = require('./generic/config/express'), 	//Requires express module and creates an express object.
    passport_1 = require('./generic/config/passport');	//Requires passport module and creates a passport object.
	
var db_1 = mongoose_1();
var app_1 = express_1();
var passport_1 = passport_1();

//Tells the Express application to listen to port 3001.
//app_1.listen(port_1, ip);
var listener_1 = app_1.listen(port_1, 'localhost', function() {
    console.log("Generic App listening on port " + listener_1.address().port);
});


var port_2= Number(process.env.PORT + 1) || 3002;

var mongoose_2 = require('./generic_jwt/config/mongoose'),	//Requires mongoose module and creates a mongoose object.
	express_2 = require('./generic_jwt/config/express'); 	//Requires express module and creates an express object.
	
var db_2 = mongoose_2();
var app_2 = express_2();

//Tells the Express application to listen to port 3002.
//app_2.listen(port_2, ip);
var listener_2 = app_2.listen(port_2, 'localhost', function() {
    console.log("Generic JWT App listening on port " + listener_2.address().port);
});


var port_3 = Number(process.env.PORT + 2) || 3003;

var mongoose_3 = require('./tinecdesign/config/mongoose'),	//Requires mongoose module and creates a mongoose object.
	express_3 = require('./tinecdesign/config/express'), 	//Requires express module and creates an express object.
    passport_3 = require('./tinecdesign/config/passport');	//Requires passport module and creates a passport object.
	
var db_3 = mongoose_3();
var app_3 = express_3();
var passport_3 = passport_3();

//Tells the Express application to listen to port 3003.
//app_3.listen(port_3, ip);
var listener_3 = app_3.listen(port_3, 'localhost', function() {
    console.log("Tine C Design App listening on port " + listener_3.address().port);
});


var port_4 = Number(process.env.PORT + 3) || 3004;

var mongoose_4 = require('./tlwb/config/mongoose'),	//Requires mongoose module and creates a mongoose object.
	express_4 = require('./tlwb/config/express'), 	//Requires express module and creates an express object.
    passport_4 = require('./tlwb/config/passport');	//Requires passport module and creates a passport object.
	
var db_4 = mongoose_4();
var app_4 = express_4();
var passport_4 = passport_4();

//Tells the Express application to listen to port 3004.
//app_4.listen(port_4, ip);
var listener_4 = app_4.listen(port_4, 'localhost', function() {
    console.log("TLWB App listening on port " + listener_4.address().port);
});


//Returns the Express application object.
module.exports = {app_1, app_2, app_3, app_4};