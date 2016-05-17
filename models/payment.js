var mongoose = require('./db').mongoose;


var paymentSchema = mongoose.Schema({
	date  				: Date,
	way					: Number,
	amount				: Number,
	stories				: [{type : mongoose.Schema.Types.ObjectId, ref : 'Story'}],
	user				: {type : mongoose.Schema.Types.ObjectId, ref : 'User'}
});

var Payment = mongoose.model('Payment', paymentSchema);

exports.Payment = Payment;