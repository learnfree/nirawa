var mongoose = require('./db').mongoose;


var userSchema = mongoose.Schema({
	email_or_phone                  : String,
	password				: String,
	first_name               : String,
	last_name               : String,
	birthday               : Date,
	scholar_level           : Number,
	city                   : String,
	school_name            : String,
	school_status           : Number,
	basket                 : [{type: mongoose.Schema.Types.ObjectId, ref:'Story'}],
	score                  : Number
});

var User = mongoose.model('User', userSchema);

exports.User = User;