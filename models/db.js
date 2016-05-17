//mongodb://amadou:amadou@ds019478.mlab.com:19478/hikayadb


var mongoose = require('mongoose'); // mongoose = ORM
mongoose.connect('mongodb://amadou:amadou@ds019478.mlab.com:19478/hikayadb');

var db = mongoose.connection;

db.on('error', function(error){
	console.log('Errrrrreuuuuuuuuur');
	console.log(error);
});

db.on('open', function(){
	console.log('Accesssss avec success =D');	
});

exports.mongoose = mongoose;