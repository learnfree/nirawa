var mongoose = require('./db').mongoose;


var mediaSchema = mongoose.Schema({
	
	file				:{type : mongoose.Schema.Types.ObjectId, ref : 'File'},
	modal 				: String,
	a					: String,
	name 				: String,
	context				: String, 
});

var Media = mongoose.model('Media', mediaSchema);

exports.Media = Media;