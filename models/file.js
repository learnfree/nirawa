var mongoose = require('./db').mongoose;


var fileSchema = mongoose.Schema({
	name 					: String,
	path 					: String,
	context					: String
});

var File = mongoose.model('File', fileSchema);

exports.File = File;