var projectApp = angular.module('projectsApp', ['ngSanitize', 'ngRoute', 'cloudinary', 'projectService', 'projectControllers', 'projectDirectives', 'uploadDirective']);
projectApp.config(['$routeProvider',
	function($routeProvider, projectsCtrl, projectCtrl) {
		$routeProvider.
		when('/projects', {
			templateUrl: '/admin/projects.html',
			controller: 'projectsCtrl'
		}).
		when('/project/:projectId', {
			templateUrl: '/admin/project.html',
			controller: 'projectCtrl'
		}).		
		otherwise({
			redirectTo: '/projects'
		});
	}]);