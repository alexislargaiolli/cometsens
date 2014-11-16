var projectServices = angular.module("projectService", ['ngResource']);
projectServices.factory('Project', ['$resource',
	function($resource){
   		return $resource('/admin/api/project/:id', {id:'@_id'},  { 'update': {method: 'PUT'} }); 
    }
]);
projectServices.factory('album', ['$rootScope', '$resource',
	function($rootScope, $resource){
		var url = $.cloudinary.url('myphotoalbum', {format: 'json', type: 'list'});
    //cache bust
    url = url + "?" + Math.ceil(new Date().getTime()/1000);
    return $resource(url, {}, {
    	photos: {method:'GET', isArray:false}
    });
}]);