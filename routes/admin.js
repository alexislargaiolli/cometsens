var express = require('express');
var api = require('../controllers/projectApi.js');
var carouselApi = require('../controllers/carouselItemApi.js');
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

router.get('/carousel.html', 
	function(req, res){
		if (req.isAuthenticated()) {
			res.render('partials/carousel', {});
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




// ====================================
// CAROUSEL ITEM REST API ==================
// ====================================

router.get('/api/carousel', 
	function(req, res){
		if (req.isAuthenticated()) {
			carouselApi.findAllCarouselItem(req, res);
		}
		else{
			res.redirect('/login');
		}
	});
router.get('/api/carousel/:id', 
	function(req, res){
		if (req.isAuthenticated()) {
			carouselApi.findCarouselItemById(req, res);
		}
		else{
			res.redirect('/login');
		}
	});
router.post('/api/carousel', 
	function(req, res){
		if (req.isAuthenticated()) {
			carouselApi.addCarouselItem(req, res);
		}
		else{
			res.redirect('/login');
		}
	});
router.put('/api/carousel/:id', 
	function(req, res){
		if (req.isAuthenticated()) {
			carouselApi.updateCarouselItem(req, res);
		}
		else{
			res.redirect('/login');
		}
	});
router.delete('/api/carousel/:id',
	function(req, res){
		if (req.isAuthenticated()) {
			carouselApi.deleteCarouselItem(req, res);
		}
		else{
			res.redirect('/login');
		}
	});

//=====================================
// LOGIN ===============================
// =====================================

module.exports = router;
