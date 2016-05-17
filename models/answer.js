var mongoose = require('./db').mongoose;


var answerSchema = mongoose.Schema({
	answer : {type : mongoose.Schema.Types.ObjectId, ref : 'File'}
});

var Answer = mongoose.model('Answer', answerSchema);

exports.Answer = Answer;