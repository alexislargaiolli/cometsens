var mongoose = require('mongoose'), Schema = mongoose.Schema;

var projectSchema = new Schema({
	key : String,
	name : String,
	description : String,
	image : String,
	links : [ {
		link : String
	} ],
	slides : [ {
		name : String,
		description : String,
		image : String,
		miniature : String,
		order : Number
	} ]
});

projectSchema.virtual('image.url').get(function() {
	return "/img/projects/" + this.key + "/" + this.image;
});

module.exports = mongoose.model('project', projectSchema);