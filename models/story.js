var mongoose = require('./db').mongoose;

var storySchema = mongoose.Schema({

	title					: String,
	main_image		 		: {type : mongoose.Schema.Types.ObjectId, ref : 'File'},
	auther_images			: String,
	summary		 			: String,
	price 					: Number,
	type 					: Number,
	date_creation 			: Date,
	dificulty 				: Number,
	mark 					: Number,
	N 						: Number,
	admin					: {type : mongoose.Schema.Types.ObjectId, ref : 'Admin'},
	parts  					: [{order: Number, part : {type : mongoose.Schema.Types.ObjectId, ref : 'Part'}}],
	context					: String
	
});


var Story = mongoose.model('Story', storySchema);

exports.Story = Story;