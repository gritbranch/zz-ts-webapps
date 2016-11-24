angular.module('core', []); //Creates an AngularJS module

//angular.module() retrieves the core module
//controller() creates a new CoreController constructor function
angular.module('core').controller('CoreController', ['$scope', 'Authentication', function($scope, Authentication) {
	$scope.authentication = Authentication;
  }
]);