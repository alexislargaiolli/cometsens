var Project = require('../models/project.js');

exports.findAll = function(callback) {	
	Project.find({}).sort('order').exec(function(err, projects) {
		callback(projects);
	});
};

exports.find = function(project_key, callback) {
	Project.findOne({
		key : project_key
	}, function(err, project) {
		callback(project);
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
