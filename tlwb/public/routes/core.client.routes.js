//Uses the angular.module() method to grab the example module and executed the config() method to create a new configuration block
angular.module('core').config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/', {
			templateUrl: '../views/core.client.view.html'
		}).
		otherwise({
			redirectTo: '/'
		});
	}
]);