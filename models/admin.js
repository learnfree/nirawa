var mongoose = require('./db').mongoose;


var adminSchema = mongoose.Schema({
	email_or_phone 				: String, 
	password 				: String,
	first_name 			: String,
	last_name 			: String
});

var Admin = mongoose.model('Admin', adminSchema);

exports.Admin = Admin;


/*new Admin({
	email_or_phone 				: 'a@d', 
	password 				: 'amadou',
	first_name 			: 'd',
	last_name 			: 'a'
}).save(function(err){

});*/