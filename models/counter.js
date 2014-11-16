var mongoose = require('mongoose'), Schema = mongoose.Schema;

var CountersSchema = new Schema(
	{
		_id: { type: String, required: true },
		sequence: { type: Number, required: true }
	},
	{
		versionKey: false
	}
);

module.exports = mongoose.model('counter', CountersSchema);