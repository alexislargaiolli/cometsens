/**
 * Module dependencies.
 */

var express = require('express'), routes = require('./routes'), http = require('http'), path = require('path'), passport = require('passport'), flash = require('connect-flash');

var app = express();
app.mongoose = require('mongoose');

//default to a 'localhost' configuration:
var connection_string = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/cometsens';
var port    = process.env.PORT || 5000;

app.mongoose.connect(connection_string, function (err, res) {
  if (err) {
  console.log ('ERROR connecting to: ' + connection_string + '. ' + err);
  } else {
  console.log ('Succeeded connected to: ' + connection_string);
  }
});

// all environments
app.set('port', port);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({
	secret : 'secretkey'
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' === app.get('env')) {
	app.use(express.errorHandler());
}

require('./config/passport')(passport);

var projects = require('./controllers/projectController.js');
var Project = require('./models/project.js');
var User = require('./models/user.js');

/*var newUser = new User();
// set the user's local credentials
newUser.local.email = 'web.invent@live.fr';
newUser.local.password = newUser.generateHash('w3binv3nt');
// save the user
newUser.save(function(err) {
if (err) {
throw err;
}
});*/

app.get('/', routes.index);
app.get('/realisations', routes.realisations);
app.get('/realisation/:key', routes.realisation);
app.get('/presentation', routes.presentation);
app.get('/contact', routes.contact);

app.get('/admin/projects', routes.projectList);
app.get('/admin/projects/edit/:key', routes.editProject);
app.post('/admin/projects/add', projects.add);

app.get('/projects/list', projects.list);
app.get('/projects/get/:key', projects.get);

//=====================================
// LOGIN ===============================
// =====================================
// show the login form
app.get('/login', function(req, res) {

	// render the page and pass in any flash data if it exists
	res.render('login', {
		message : req.flash('loginMessage')
	});
});

app.post('/login', passport.authenticate('local-login', {
	successRedirect : '/admin/projects', // redirect to the secure profile section
	failureRedirect : '/login', // redirect back to the signup page if there is an error
	failureFlash : true
}));

app.post('/admin/projects/save/:key', projects.save);
app.post('/admin/projects/remove/:key', projects.remove);
app.post('/admin/projects/link/add/:key', projects.addLink);
app.post('/admin/projects/link/edit/:key/:id', projects.editLink);
app.post('/admin/projects/link/remove/:key/:id', projects.removeLink);
app.post('/admin/projects/slide/add/:key', projects.addSlide);
app.post('/admin/projects/slide/edit/:key/:id', projects.editSlide);
app.post('/admin/projects/slide/remove/:key/:id', projects.removeSlide);

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});
