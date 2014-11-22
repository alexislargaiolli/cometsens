var Project = require('../models/project.js');

exports.findAllProject = function(req, res) {
	return Project.find(function(err, projects) {
      if(!err) {
        return res.json(projects);
      } else {
        res.statusCode = 500;
        console.log('Internal error(%d): %s',res.statusCode,err.message);
        return res.send({ error: 'Server error' });
      }
    });	
};


exports.findProjectById = function(req,res){
	return Project.findById(req.params.id, function(err, project) {

      if(!project) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }

      if(!err) {
        return res.send(project);
      } else {

        res.statusCode = 500;
        console.log('Internal error(%d): %s', res.statusCode, err.message);
        return res.send({ error: 'Server error' });
      }
    });
};


exports.addProject = function(req,res){
	var p = new Project({
    	name : req.body.name,
  		description : req.body.description,
  		links : req.body.links,
  		slides : req.body.slides,
  		order : req.body.order
    });

    p.save(function(err, project) {
      if(err) {
        res.send({ error: err });
        return;
      } else {
        return res.send(project);
      }
    });
};


exports.updateProject = function(req,res){
  return Project.findById(req.params.id, function(err, proj) {

      if(!proj) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }

      if (req.body.name != null) proj.name = req.body.name;
      if (req.body.description != null) proj.description = req.body.description;
      if (req.body.image != null) proj.image = req.body.image;
      if (req.body.links != null) proj.links  = req.body.links;
      if (req.body.slides != null) proj.slides = req.body.slides;
      if (req.body.order != null) proj.order = req.body.order;

      return proj.save(function(err) {
        if(!err) {
          return res.send(proj);
        } else {
          if(err.name == 'ValidationError') {
            res.statusCode = 400;
            res.send({ error: 'Validation error' });
          } else {
            res.statusCode = 500;
            res.send({ error: 'Server error' });
          }
          console.log('Internal error(%d): %s',res.statusCode,err.message);
        }
        res.send(proj);
      });
    });
};


exports.deleteProject = function(req,res){
  return Project.findById(req.params.id, function(err, project) {    
      if(!project) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }

      if(!err) {
        project.remove();
        return res.json({ status: 'OK', project : project });
      } else {
        res.statusCode = 500;
        console.log('Internal error(%d): %s', res.statusCode, err.message);
        return res.send({ error: 'Server error' });
      }
    });
};