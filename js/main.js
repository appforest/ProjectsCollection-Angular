// App definition

var projectsApp = angular.module('projectsApp', ['ngResource', 'ngRoute']);


// App config.

projectsApp.config(function($routeProvider){
	$routeProvider.when('/',
	{
		templateUrl: 'partials/listAll.html'
	}
	)
	.when('/repo/:repoId', {
		templateUrl: 'partials/repo.html',
		controller: 'repoController'
	})
	.otherwise({ redirectTo: '/' });
});


// Data factory

projectsApp.factory('githubData', function($resource){
	var GitHubUserName = 'appforest';
	return $resource('https://api.github.com/users/'+GitHubUserName+'/repos')
	
});


// ### Controllers

projectsApp.controller('mainCtrl', function($scope, $rootScope, $location, githubData){
	
	$rootScope.location = $location;

	$scope.gitHubRrepos = {};	
	
	githubData.query(function(res){
		$scope.gitHubRrepos.repos = res;

		// Login's first letter to Uppercase
		$scope.login = angular.uppercase(res[0].owner.login.substring(0,1)) + angular.lowercase(res[0].owner.login.substring(1,res[0].owner.login.length));
		// Login's original casing
		// $scope.login = res[0].owner.login;
	});
});

projectsApp.controller('gitHubCtrl', function($scope, githubData){
	
	$scope.gitHubRrepos = {};

	githubData.query(function(res){
		$scope.gitHubRrepos.repos = res;
	});
	$scope.scrollTop = function () {
		scroll(0,0);
	}
});

projectsApp.controller('repoController', function($scope, githubData, $routeParams){

	$scope.gitHubRrepos = {};

	githubData.query(function(res){
		$scope.gitHubRrepos.repos = res;
	});
	$scope.filt = $routeParams.repoId;
});