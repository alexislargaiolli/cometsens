var Project = require('../models/project.js');
var ObjectId = require('mongoose').Types.ObjectId;

exports.findAll = function(callback) {	
	Project.find({}).sort('order').exec(function(err, projects) {
		callback(projects);
	});
};

exports.find = function(id, callback) {
	Project.findById({
		 _id: new ObjectId(id)
	}, function(err, project) {
		project.slides.sort(function(s1, s2){return s1.order - s2.order;});		
		callback(project);
	});
};

exports.prev = function(order, callback) {
	Project.find({}).where('order').lt(order).sort('-order').exec(function(err, projects) {
		if(projects.length > 0){
			callback(projects[0]);	
		}
		else{
			callback();
		}
	});
};

exports.next = function(order, callback) {
	Project.find({}).where('order').gt(order).sort('order').exec(function(err, projects) {
		if(projects.length > 0){
			callback(projects[0]);
		}
		else{
			callback();
		}
	});
};

exports.get = function(req, res) {
	Project.findOne({
		key : req.params.key
	}, function(err, project) {		
		res.send(project);
	});
};

exports.list = function(req, res) {
	Project.find(function(err, projects) {
		res.send(projects);
	});
};

exports.add = function(req, res) {
	var p = new Project({
		key : req.body.name.toLowerCase().split(' ').join('_').split('\\').join('').split('\'').join(''),
		name : req.body.name
	});
	p.save();
	res.send(p);
};

exports.save = function(req, res) {
	Project.update({
		key : req.params.key
	}, {$set :{
		name : req.body.name,
		description : req.body.description,
		image : req.body.image,
		order : req.body.order
	}}, function(err) {
		if (err) return handleError(err);
		Project.findOne({
			key : req.params.key
		}, function(err, project) {
			res.send(project);
		});	
	});
};

exports.remove = function(req, res) {
	Project.remove({
		key : req.params.key
	}, function(err) {
		res.send('removed');
	});
};

exports.addLink = function(req, res) {
	Project.update({
		key : req.params.key
	}, {
		$addToSet : {
			links : {
				link : req.body.link
			}
		}
	}, function(err) {
		Project.findOne({
			key : req.params.key
		}, function(err, project) {
			res.send(project);
		});
	});
};

exports.editLink = function(req, res) {
	Project.findOne({
		key : req.params.key
	}, function(err, project) {
		var i = 0;
		for (i = 0; i < project.links.length; ++i) {
			var link = project.links[i];
			if (link._id.equals(req.params.id)) {
				link.link = req.body.link;
			}
		}
		project.save(function(err) {
			if (err) {
				throw err;
			}
			res.send(project);
		});
	});
};

exports.removeLink = function(req, res) {
	Project.findOne({
		key : req.params.key
	}, function(err, project) {
		var i = 0;
		var j = -1;
		for (i = 0; i < project.links.length; ++i) {
			var link = project.links[i];
			if (link._id.equals(req.params.id)) {
				j = i;
			}
		}
		if (j !== -1) {
			project.links[j].remove();
			project.save(function(err, project) {
				if (err) {
					throw err;
				}
				res.send(project);
			});
		} else {
			res.send(project);
		}
	});
};

exports.addSlide = function(req, res) {
	Project.update({
		key : req.params.key
	}, {
		$addToSet : {
			slides : {
				name : req.body.name
			}
		}
	}, function(err, project) {
		Project.findOne({
			key : req.params.key
		}, function(err, project) {
			res.send(project);
		});
	});
};

exports.editSlide = function(req, res) {
	Project.findOne({
		key : req.params.key
	}, function(err, project) {
		var i = 0;
		for (i = 0; i < project.slides.length; ++i) {
			var slide = project.slides[i];
			if (slide._id.equals(req.params.id)) {
				slide.name = req.body.name;
				slide.description = req.body.description;
				slide.image = req.body.image;
				slide.miniature = req.body.miniature;
				slide.order = i;
			}
		}
		project.save(function(err, project) {
			if (err) {
				throw err;
			}
			res.send(project);
		});
	});
};

exports.removeSlide = function(req, res) {
	Project.findOne({
		key : req.params.key
	}, function(err, project) {
		var i = 0;
		var j = -1;
		for (i = 0; i < project.slides.length; ++i) {
			var slide = project.slides[i];
			if (slide._id.equals(req.params.id)) {
				j = i;
			}
		}
		if (j !== -1) {
			project.slides[j].remove();
			project.save(function(err, project) {
				if (err) {
					throw err;
				}
				res.send(project);
			});
		} else {
			res.send(project);
		}
	});
};
