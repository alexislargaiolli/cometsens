var CarouselItem = require('../models/carouselItem.js');

exports.findAllCarouselItem = function(req, res) {
	return CarouselItem.find(function(err, ci) {
      if(!err) {
        return res.json(ci);
      } else {
        res.statusCode = 500;
        console.log('Internal error(%d): %s',res.statusCode,err.message);
        return res.send({ error: 'Server error' });
      }
    });	
};


exports.findCarouselItemById = function(req,res){
	return CarouselItem.findById(req.params.id, function(err, ci) {

      if(!ci) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }

      if(!err) {
        return res.send(ci);
      } else {

        res.statusCode = 500;
        console.log('Internal error(%d): %s', res.statusCode, err.message);
        return res.send({ error: 'Server error' });
      }
    });
};


exports.addCarouselItem = function(req,res){
	console.log(req.body);
  var p = new CarouselItem({
    	image : req.body.image,
  		order : req.body.order
    });

    p.save(function(err, ci) {
      if(err) {
        res.send({ error: err });
        return;
      } else {
        return res.send(ci);
      }
    });
};


exports.updateCarouselItem = function(req,res){
  return CarouselItem.findById(req.params.id, function(err, ci) {

      if(!ci) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }

      if (req.body.image != null) ci.image = req.body.image;
      if (req.body.order != null) ci.order = req.body.order;

      return ci.save(function(err) {
        if(!err) {
          return res.send(ci);
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
        res.send(ci);
      });
    });
};


exports.deleteCarouselItem = function(req,res){
  return CarouselItem.findById(req.params.id, function(err, ci) {    
      if(!ci) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }

      if(!err) {
        ci.remove();
        return res.json({ status: 'OK', ci : ci });
      } else {
        res.statusCode = 500;
        console.log('Internal error(%d): %s', res.statusCode, err.message);
        return res.send({ error: 'Server error' });
      }
    });
};