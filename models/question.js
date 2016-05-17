var mongoose = require('./db').mongoose;


var questionSchema = mongoose.Schema({
	question 				: String,
	files					: [{type : mongoose.Schema.Types.ObjectId, ref : 'File'}],
	answer					: {type : mongoose.Schema.Types.ObjectId, ref : 'Answer'}
});


var Question = mongoose.model('Question', questionSchema);

exports.Question = Question;