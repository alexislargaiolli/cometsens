var projects = require('../controllers/projectController.js');

exports.index = function(req, res) {
	res.render('index', {
		title : 'Express',
		page : 'home'
	});
};

exports.realisations = function(req, res) {
	projects.findAll(function(projects) {
		res.render('realisations', {
			title : 'Réalisations',
			page : 'realisations',
			projects : projects
		});
	});
};

exports.realisation = function(req, res) {
	projects.find(req.params.key, function(project) {
		res.render('realisation', {
			title : 'Réalisation',
			page : 'realisation',
			project : project
		});
	});
};

exports.presentation = function(req, res) {
	res.render('presentation', {
		title : 'Présentation',
		page : 'presentation'
	});
};

exports.contact = function(req, res) {
	res.render('contact', {
		title : 'Contact',
		page : 'contact'
	});
};

exports.admin = function(req, res) {
	if (req.isAuthenticated()) {
		res.render('admin', {
			title : 'Administration',
			projects : projects
		});
	}
	else{
		res.render('login', {
			message : req.flash('loginMessage')
		});
	}
};

exports.projectList = function(req, res) {
	if (req.isAuthenticated()) {
		projects.findAll(function(projects) {
			res.render('admin_project_list', {
				title : 'Project list',
				projects : projects
			});
		});
	} else {
		res.render('login', {
			message : req.flash('loginMessage')
		});
	}
};

exports.editProject = function(req, res) {
	if (req.isAuthenticated()) {
		res.render('admin_edit_project', {
			title : 'Edit project',
			project_key : req.params.key
		});
	} else {
		res.render('login', {
			message : req.flash('loginMessage')
		});
	}
};

exports.editSlide = function(req, res) {
	if (req.isAuthenticated()) {
		res.render('admin_edit_project', {
			title : 'Edit project',
			project_key : req.params.key
		});
	} else {
		res.render('login', {
			message : req.flash('loginMessage')
		});
	}
};
