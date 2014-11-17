var projectControllers = angular.module('projectControllers', ['ui.tinymce']);
projectControllers.controller('projectsCtrl', ['$scope', 'Project',
	function($scope, Project){
		
		$scope.create = function(){
			//projectService.createProject();
			var project = new Project();
			project.name = "Nouveau projet" + $scope.projects.length;
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

		$scope.projectsToSave = [];

		$scope.orderUp = function(project){
			if(project.order > 0){
				project.order--;
				if($scope.projectsToSave.indexOf(project) == -1){
					$scope.projectsToSave.push(project);
				}
			}			
		}

		$scope.orderDown = function(project){
			if(project.order < $scope.projects.length){
				project.order++;
				if($scope.projectsToSave.indexOf(project) == -1){
					$scope.projectsToSave.push(project);
				}
			}			
		}

		$scope.saveOrder = function(){
			angular.forEach($scope.projectsToSave, function(p, key){
				p.$update();
			});
			$scope.projectsToSave = [];
		}		

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
			var slide = {name : 'Nouveau slide', order: $scope.selectedProject.slides.length};
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

		$scope.slideOrderUp = function(slide){
			if(slide.order > 0){
				slide.order--;				
			}			
		}

		$scope.slideOrderDown = function(slide){
			if(slide.order < $scope.selectedProject.slides.length){
				slide.order++;
			}			
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
projectControllers.controller('carouselCtrl', ['$scope', 'CarouselItem',
	function($scope, CarouselItem){
		
		$scope.create = function(){
			//projectService.createProject();
			var ci = new CarouselItem();
			ci.image = "";
			ci.order = $scope.items.length;
			ci.$save();
			$scope.items.push(ci);
		}

		$scope.save = function(ci){
			ci.$update();
		}

		$scope.remove = function(ci){
			ci.$delete();
			var index = $scope.items.indexOf(ci);
			$scope.items.splice(index);
		}

		$scope.items = CarouselItem.query();

		$scope.itemsToSave = [];

		$scope.orderUp = function(ci){
			if(ci.order > 0){
				ci.order--;
				if($scope.itemsToSave.indexOf(ci) == -1){
					$scope.itemsToSave.push(ci);
				}
			}			
		}

		$scope.orderDown = function(ci){
			if(ci.order < $scope.items.length){
				ci.order++;
				if($scope.itemsToSave.indexOf(ci) == -1){
					$scope.itemsToSave.push(ci);
				}
			}			
		}

		$scope.saveOrder = function(){
			angular.forEach($scope.itemsToSave, function(p, key){
				p.$update();
			});
			$scope.itemsToSave = [];
		}		

	}]);