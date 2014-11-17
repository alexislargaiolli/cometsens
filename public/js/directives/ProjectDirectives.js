angular.module("projectDirectives", [])
.directive('navigationAdmin', function () {
	return {
		restrict: 'E',
		templateUrl : 'templates/navigation.html',
		scope:{
		},
		controller: function($scope, $location){
			$scope.curPage = 'projects';

			$scope.$watch(function(){
				return $location.path();
			}, function(newPath){
				var tabPath = newPath.split('/');
				if(tabPath.length > 1){
					if(tabPath[1] == 'projects'){
						$scope.curPage = 'projects';
					}
					if(tabPath[1] == 'carousel'){
						$scope.curPage = 'carousel';
					}	    		 
				}
				else{
					$scope.curPage = null;
				}
			});
		}
	}
})