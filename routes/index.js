var express = require('express');
var router = express.Router();
var projects = require('../controllers/projectController.js');
var mailer = require('../controllers/mailer.js');
var passport = require('passport');

router.get('/', function(req, res) {
	res.render('index', {
		title : 'Com&Sens',
		page : 'home'
	});
});

router.get('/realisations', function(req, res) {
	projects.findAll(function(projects) {
		res.render('realisations', {
			title : 'Réalisations',
			page : 'realisations',
			projects : projects
		});
	});
});

router.get('/realisation/:key', function(req, res) {
	projects.find(req.params.key, function(project) {
		res.render('realisation', {
			title : 'Réalisation',
			page : 'realisation',
			project : project
		});
	});
});

router.get('/presentation', function(req, res) {
	res.render('presentation', {
		title : 'Présentation',
		page : 'presentation'
	});
});

router.get('/contact', function(req, res) {
	res.render('contact', {
		title : 'Contact',
		page : 'contact',
		mailStatus:null,
		mailMessage:null
	});
});

router.post('/contact', function(req, res) {
	mailer.sendMail(req.body.email, req.body.fistname, req.body.lastname, req.body.content, function(code, msg){
		console.log(code, msg);
		res.render('contact', {
			title : 'Contact',
			page : 'contact',
			mailStatus : code,
			mailMessage : msg
		});
	});
});


exports.admin = function(req, res) {
	
	/*if (req.isAuthenticated()) {
		res.render('admin', {
			title : 'Administration',
			projects : projects
		});
	}
	else{
		res.render('login', {
			message : req.flash('loginMessage')
		});
	}*/
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
module.exports = router;