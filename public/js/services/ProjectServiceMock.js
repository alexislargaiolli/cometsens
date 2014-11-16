var projectServices = angular.module("projectServiceMock", ['ngResource']);
projectServices.factory("projectService", function(){
	var projects =[
	  {
	    "_id": "5455f4839849db201c15c70b",
	    "key": "test",
	    "name": "Test",
	    "__v": 0,
	    "image": "http://res.cloudinary.com/hjv91zvk6/image/upload/v1414945038/Le-Folies_u6seg0.jpg",
	    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <br/> Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est labAorum.",
	    "order": 0,
	    "slides": [
	      {
	        "name": "test1",
	        "_id": "5455f91f9849db201c15c70d",
	        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. <br/>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est labAorum.",
	        "image": "http://res.cloudinary.com/hjv91zvk6/image/upload/v1414945038/Le-Folies_u6seg0.jpg",
	        "miniature": "http://res.cloudinary.com/hjv91zvk6/image/upload/v1414945038/Le-Folies_u6seg0.jpg",
	        "order": 0
	      }
	    ],
	    "links": [
	      {
	        "link": "www.test.fr",
	        "_id": "5455f4d89849db201c15c70c"
	      }
	    ]
	  },
	  {
	    "_id": "5456469c4c3eaf1d0fd22bfe",
	    "key": "test2",
	    "name": "TEST2",
	    "__v": 2,
	    "description": "sdfsd sdgsdg sfg &amp; sdgfsdg  sg sfgsdgf",
	    "image": "http://res.cloudinary.com/hjv91zvk6/image/upload/v1414945038/Le-Folies_u6seg0.jpg",
	    "order": 1,
	    "slides": [
	      {
	        "name": "slide 1",
	        "_id": "5457cd37856439d31f0fbfe2",
	        "order": 0
	      }
	    ],
	    "links": [
	      {
	        "link": "sfsdf",
	        "_id": "5457ce42856439d31f0fbfe3"
	      }
	    ]
	  }
	];

	return {
		getProjects : function(){
			return projects;
		}, 
		getProject : function(id){
			var projectFound = null;
			projects.forEach(function(project){
				if(project._id == id){
					projectFound = project;
				}
			})
			return projectFound;
		},
		createProject : function(){
			var p = {name:'test', description:'test'};
			projects.push(p);
			return p;
		},
		saveProject : function(project){
			return project;
		}			
	}
});
projectServices.factory('album', ['$rootScope', '$resource',
  function($rootScope, $resource){
    var url = $.cloudinary.url('myphotoalbum', {format: 'json', type: 'list'});
    //cache bust
    url = url + "?" + Math.ceil(new Date().getTime()/1000);
    return $resource(url, {}, {
      photos: {method:'GET', isArray:false}
    });
  }]);