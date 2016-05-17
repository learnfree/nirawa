var mongoose = require('./db').mongoose;


var partSchema = mongoose.Schema({
	content 			: String,
	medias				: [{type : mongoose.Schema.Types.ObjectId, ref : 'Media'}],
	questions			: [{type : mongoose.Schema.Types.ObjectId, ref : 'Question'}]
});


var Part = mongoose.model('Part', partSchema);

exports.Part = Part;