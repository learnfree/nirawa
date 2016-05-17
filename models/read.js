var mongoose = require('./db').mongoose;

var readSchema = mongoose.Schema({
	beginning            : Date,
	end              	   : Date,
	stories			   : [{type: mongoose.Schema.Types.ObjectId, ref:'Story'},
								[{type : mongoose.Schema.Types.ObjectId, ref : 'Part'}]],
	user				: {type : mongoose.Schema.Types.ObjectId, ref : 'User'}
});


var Read = mongoose.model('Read', readSchema);


exports.Read = Read;