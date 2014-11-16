angular.module("uploadDirective", ['angularFileUpload'])
.directive('alxFileUpload', function () {
	return {
		restrict: 'E',
		templateUrl : 'templates/photo-upload.html',
		scope:{
			url: '=',
			onUploadFinished : '&'
		}, 
		controller : ['$scope', '$rootScope', '$routeParams', '$location', '$upload', '$timeout',
		function($scope, $rootScope, $routeParams, $location, $upload, $timeout) {

			$scope.isUploading = false;

			$scope.onFileSelect = function($files) {
		      var file = $files[0]; // we're not interested in multiple file uploads here
		      $scope.upload = $upload.upload({
		      	url: "https://api.cloudinary.com/v1_1/hjv91zvk6/upload",
		      	data: {upload_preset: 'ie5okiye', tags: 'myphotoalbum', context:'photo=' + $scope.title},
		      	file: file
		      }).progress(function (e) {
		      	$scope.isUploading = true;
		      	$scope.progress = Math.round((e.loaded * 100.0) / e.total);
		      	$scope.status = "Uploading... " + $scope.progress + "%";
		      	$timeout(function() {
		      		$scope.$apply();
		      	});
		      }).success(function (data, status, headers, config) {
		      	$scope.isUploading = false;
		      	$timeout(function() {
			      	$rootScope.photos = $rootScope.photos || [];
			      	data.context = {custom: {photo: $scope.title}};
			      	$scope.url = data.url;

			      	$scope.result = data;
			      	$rootScope.photos.push(data);      	
		      		$scope.$apply();
		      		$timeout(function() {
				      	$scope.onUploadFinished();
				      });
		      	});      	
		      });
	      };
      /* Modify the look and fill of the dropzone when files are being dragged over it */
      $scope.dragOverClass = function($event) {
      	var items = $event.dataTransfer.items;
      	var hasFile = false;
      	if (items != null) {
      		for (var i = 0 ; i < items.length; i++) {
      			if (items[i].kind == 'file') {
      				hasFile = true;
      				break;
      			}
      		}
      	} else {
      		hasFile = true;
      	}
      	return hasFile ? "dragover" : "dragover-err";
      };	
	}]
}
})