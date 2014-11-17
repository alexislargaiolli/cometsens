var mongoose = require('mongoose'), Schema = mongoose.Schema;

var carouselItemSchema = new Schema({
	image : String,
	order : { type: Number, default: 0 }
});

module.exports = mongoose.model('carouselItem', carouselItemSchema);