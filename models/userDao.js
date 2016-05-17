//var EmitEvent = require('events');
//var promise = require('promise');

var Answer = require('./answer.js').Answer;
var File = require('./file.js').File;
//var Ranking = require('./ranking.js').Ranking;
var User = require('./user.js').User;
var Part = require('./part.js').Part;
var Read = require('./read.js').Read;
var Payment = require('./payment.js').Payment;
var Story = require('./story.js').Story;
var Question = require('./question.js').Question;
var Admin = require('./admin.js').Admin;
var Media = require('./media.js').Media;
/***************Creating a new user**************/
function create_user(
	email_or_phone,
	fist_name    ,
	last_name    ,
	birthday     ,
	scholar_level,
	city,         
	school_name,  
	school_status){

	(new User({
		email_or_phone			: email_or_phone,
		fist_name    			: fist_name,
		last_name				: last_name,
		birthday				: birthday     ,
		scholar_level			: scholar_level,
		city					: city,         
		school_name				: school_name,  
		school_status			: school_status
	}))
	.save(function(err){
		if(err) console.log(err);

		else console.log('user created successfully');
	});
};

/****************geting a user by email or phone********/


function get_user_by_email_or_phone(email_or_phone, callback){

	User.findOne({email_or_phone : email_or_phone}, function(err, user){
	if(err) throw err;
	else if(!user){
		callback('Ce utilisateur existe pas');
		console.log('je suis dans !user');
	} 
		
	else{
		callback(user);
		console.log('je suis dans user existe'); 
	}	
		
	});
}


/*********** recuperer toutes les histoires **********/

exports.get_all_stories = function (callback){
	Story.find('_id image description type', function(err, stories){
		if(err) throw err;
		else callback(err, stories);
	});
}


/********recuperer une histoire**********/

function story_parts_list(id, callback){
	Story.findById(id, 'parts')
	.populate('parts', '_id')
	.exec(function(err, parts_list){
		callback(err, parts_list);
	});
}

/*********** recuper une partie d'une histoire******/


exports.part_of_story = function (id_part, callback){
	
	Part.findById(id_part, 'medias questions')
	
	.populate('medias')
	
	.populate({path : 'question', 
		
		populate :{ path : 'answer', 
			
			populate : {path : 'answer'}}, 
		
		populate : {path : 'files'}})
	
	.exec(function(err, part){
		
		if(err) console.log(err);
		
		callback(err, part)
	});
}

/************* update a user infos**************/

exports.update_user = function( 
	email_or_phone,
	first_name               ,
	last_name               ,
	birthday               ,
	scholar_level           ,
	city                   ,
	school_name            ,
	school_status, callback){

	User.update({email_or_phone : email_or_phone}, 
		{first_name : first_name,
		last_name : last_name,
		birthday : new Date(birthday),
		scholar_level : scholar_level,
		city : city,
		school_name : school_name,
		school_status : school_status}, function(err, numAffected){
			if(err) callback(err, null);
			else {
				User.findOne({email_or_phone : email_or_phone}, function(err, user){
					if(err) callback(1, null);
					else callback(2, user);
				});
			}
		});

}


/********************test*************/

/*create_user('email_or_phone',
	'fist_name'    ,
	'last_name'    ,
	15-15-15     ,
	1,
	'city',         
	'school_name',  
	0);*/
/*var reslt;
get_user_by_email_or_phone('email_or_phone', function(reslt){

	console.log(reslt);
});*/

/*var id;
story_parts_list(id, function(parts_list){
	console.log(parts_list);	
});*/

/*part_of_story('56eac9f3f4b2e89c2dcabdf3', function(err, part){
	console.log(part);
});*/

/*update_user(
	'email_or_phone',
	'first_name',
	'last_name',
	"October 13, 2014 11:13:00",
	1,
	'city',
	'school_name',
	1, function(err, user){
			console.log(user);
});*/


