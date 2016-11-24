// Configure the 'articles' module routes
angular.module('articles').config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/articles', {
			templateUrl: '../views/list-articles.client.view.html'
		}).
		when('/articles/create', {
			templateUrl: '../views/create-article.client.view.html'
		}).
		when('/articles/:articleId', {
			templateUrl: '../views/view-article.client.view.html'
		}).
		when('/articles/:articleId/edit', {
			templateUrl: '../views/edit-article.client.view.html'
		});
	}
]); 