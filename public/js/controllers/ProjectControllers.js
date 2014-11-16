var projectControllers = angular.module('projectControllers', ['ui.tinymce']);
projectControllers.controller('projectsCtrl', ['$scope', 'Project',
	function($scope, Project){
		
		$scope.create = function(){
			//projectService.createProject();
			var project = new Project();
			project.name = "Nouveau projet";
			project.description = "";
			project.links = [];
			project.slides = [];
			project.order = $scope.projects.length;
			project.$save();
			console.log($scope.projects);
			$scope.projects.push(project);
		}

		$scope.remove = function(project){
			project.$delete();
			var index = $scope.projects.indexOf(project);
			$scope.projects.splice(index);
		}

		$scope.projects = Project.query();

	}]);
projectControllers.controller('projectCtrl', ['$scope','$routeParams', 'Project',
	function($scope, $routeParams, Project) {

		//Options for description text area
		$scope.tinymceOptions = {
			statusbar : false,
			menubar:false
		};

		//Current selected project
		$scope.selectedProject = Project.get({id : $routeParams.projectId});
		
		//Url of last uploaded file
		$scope.uploadedFile = null;

		$scope.selectedSlide = null;

		$scope.selectedLink = null;

		//Save the current selected project
		$scope.save = function(){
			console.log($scope.selectedProject);
			$scope.selectedProject.$update();
		}

		$scope.setProjectImage = function(){
			$scope.selectedProject.image = $scope.uploadedFile;
		}

		$scope.addSlide = function(){
			var slide = {name : 'Nouveau slide'};
			$scope.selectedProject.slides.push(slide);
		}

		$scope.setSlideImage = function(){
			$scope.selectedSlide.image = $scope.uploadedFile;	
		}

		$scope.setSelectedSlide = function(slide){
			$scope.selectedSlide = slide;
		}

		$scope.removeSlide = function(slide){
			var index = $scope.selectedProject.slides.indexOf(slide);
			$scope.selectedProject.slides.splice(index);
		}

		$scope.setSelectedLink = function(link){
			$scope.selectedLink = link;
		}

		$scope.addLink = function(){
			var link = {link : 'www.lien.fr'};
			$scope.selectedProject.links.push(link);
		}

		$scope.removeLink = function(link){
			var index = $scope.selectedProject.links.indexOf(link);
			$scope.selectedProject.links.splice(index);
		}

	}]);