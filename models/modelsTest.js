var mongoose = require('./db').mongoose;

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

var file1 = new File({
	name : 'acheter',
	path :'aventureskarim/acheter.jpg',
	context : 'aventureskarim'
});


file1.save(function(err, file){
	if(err) console.log(err);
	else console.log(file._id);
});

var file2 = new File({
	name : 'adorer',
	path :'aventureskarim/adorer.jpg',
	context : 'aventureskarim'
});

file2.save(function(err, file){
	if(err) console.log(err);
	else console.log(file._id);
});

/*
var answer1 = new Answer({
	answer : file1 
});

var answer1 = new Answer({
	path : file1
});

answer1.save(function(err){
	if(err) console.log('erreur dans answer');
});

var story1 = new Story({
	image		 			: 'image',
	description 			: 'description',
	price 					: 100,
	type 					: 1,
	date_creation 			: 15-15-15,
	dificulty 				: 1,
	mark 					: 10,
	parts  					: [part1]
});
story1.save(function(err){
	console.log(err);
	if(err) console.log('erreur dans story');
});

var part1 = new Part({
	content 			: 'content',
	medias				: [media1],
	questions			: [question1]
});

part1.save(function(err){
	if(err) console.log('erreur dans part');
});



var media1 = new Media({
	path 				: 'path',
	name 				: 'name'
});



media1.save(function(err){
	if(err) console.log('erreur dans media');
});

answer1.save(function(err){
	if(err) console.log(err);
});

Answer.findById('56e81b40d6e47b681bc88fe2')
.populate('answer').exec(function(err, reslt){
	console.log(reslt);
});




var question1 = new Question({
	question 				: 'question1',
	files					: [file1],
	answer					: answer1
});

question1.save(function(err){
	if(err) console.log('erreur dans question');
});*/
