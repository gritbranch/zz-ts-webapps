// Configure the 'articles' module routes
angular.module('articles').config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/articles', {
			templateUrl: '/js/views/list-articles.client.view.html'
		}).
		when('/articles/create', {
			templateUrl: '/js/views/create-article.client.view.html'
		}).
		when('/articles/:articleId', {
			templateUrl: '/js/views/view-article.client.view.html'
		}).
		when('/articles/:articleId/edit', {
			templateUrl: '/js/views/edit-article.client.view.html'
		});
	}
]); 