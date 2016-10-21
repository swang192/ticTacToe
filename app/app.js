var app = angular.module("ticTacToe", ['ngRoute']);

app.config(function($routeProvider) {
	$routeProvider
		.when('/ttt', {
			controller: 'tttController',
			templateUrl: "app/partials/2players.html"
		})
		.otherwise({
			redirectTo: '/ttt'
		});
});