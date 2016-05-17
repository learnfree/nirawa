var mongoose = require('./db').mongoose;


var rankingSchema = mongoose.Schema({
	'date'			:Date,
});

var Ranking = mongoose.model('Ranking', rankingSchema);

exports.Ranking = Ranking;