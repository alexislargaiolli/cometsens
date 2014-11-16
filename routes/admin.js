var express = require('express');
var api = require('../controllers/projectApi.js');
var router = express.Router();

// ====================================
// PROJECTS VIEWS ==================
// ====================================

router.get('/', 
	function(req, res) {
		if (req.isAuthenticated()) {
			res.render('admin', { title: 'Admin' });
		} else {
			res.redirect('/login');
		}
	});

router.get('/home.html', 
	function(req, res){
		if (req.isAuthenticated()) {
			res.render('admin', {});
		}
		else{
			res.redirect('/login');
		}
	});

router.get('/projects.html', 
	function(req, res){
		if (req.isAuthenticated()) {
			res.render('partials/projects', {});
		}
		else{
			res.redirect('/login');
		}
	});

router.get('/project.html', 
	function(req, res){
		if (req.isAuthenticated()) {
			res.render('partials/project', {});
		}
		else{
			res.redirect('/login');
		}
	});



// ====================================
// PROJECTS REST API ==================
// ====================================

router.get('/api/project', 
	function(req, res){
		if (req.isAuthenticated()) {
			api.findAllProject(req, res);
		}
		else{
			res.redirect('/login');
		}
	});
router.get('/api/project/:id', 
	function(req, res){
		if (req.isAuthenticated()) {
			api.findProjectById(req, res);
		}
		else{
			res.redirect('/login');
		}
	});
router.post('/api/project', 
	function(req, res){
		if (req.isAuthenticated()) {
			api.addProject(req, res);
		}
		else{
			res.redirect('/login');
		}
	});
router.put('/api/project/:id', 
	function(req, res){
		if (req.isAuthenticated()) {
			api.updateProject(req, res);
		}
		else{
			res.redirect('/login');
		}
	});
router.delete('/api/project/:id',
	function(req, res){
		if (req.isAuthenticated()) {
			api.deleteProject(req, res);
		}
		else{
			res.redirect('/login');
		}
	});



//=====================================
// LOGIN ===============================
// =====================================

module.exports = router;
