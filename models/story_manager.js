'use strict'

var fs = require('fs');
var Media = require('./media.js').Media;
var unzip = require('unzip');



//extraire les noms des images dans un fichier zip
function files_names(files_path, callback){
	fs.readdir(files_path, function(err, files){
		console.log('files:'+files);
		var filesjpg = [];
		var filesgif = [];
		var filespng = [];
		var end = false;
		var end2 = false;
		var end3 = false;
		if(err) console.log(err);
		for(var i = 0; i<files.length; i++){
			//console.log(files[i]);
			filesjpg.push(files[i].replace(".jpg", ""));
			if(i == (files.length - 1)) end = true;
			//console.log(filesjpg[i]);
		}
		if(end){
			for(var i = 0; i<filesjpg.length; i++){
				filesgif.push(filesjpg[i].replace(".gif", ""));
				if(i == (filesjpg.length - 1)) end2 = true;

				//console.log(filesgif[i]);
			}	
		}
		if(end2){
			for(var i = 0; i<filesjpg.length; i++){
				filespng.push(filesgif[i].replace(".png", ""));
				if(i == (filesjpg.length - 1)) end3 = true;

				console.log(filespng[i]);
			}	
		}
		if(end3) callback(filespng, files);
	
	});	
}





//ajouter des images cpécifique
exports.add_img = function(directory){
	//var directory = req.files.auther_images.name;
	var f_names;
	var f_dir = directory.replace(".zip", "");
	var f_path = '../nirawa/public/uploads/'+f_dir;
	fs.createReadStream('../nirawa/public/uploads/'+directory)
	.pipe(unzip.Extract({ path: '../nirawa/public/uploads/' })
		.on('close', function(){
			console.log('in f_namex');
			files_names(f_path, function(f_names, files){

		for(var i=0; i<files.length; i++){
			new require('./file.js').File({
				name: f_names[i],
				path: files[i],
				context : f_dir
			}).save(function(err, f){
				if(err) console.log('erreur insersion files:' +err);
				else require('./media_manager.js').createMedia(f, function(err, m){

				});
			});


		}
	});
		}));
	
					
}
/*fs.readdir(path, callback)#
Asynchronous readdir(3). Reads the contents of a directory. 
The callback gets two arguments (err, files) where files is an 
array of the names of the files in the directory excluding '.' and '..'.*/



// nouvelle histoire

exports.newStory = function(cb){
	new require('./story.js').Story({
		N:0
	}).save(function(err, story){
		cb(err, story._id);
	});
}





//enregistrer une histoire, le titre et le summary
//retourne l'id de l'histoire.




/*exports.addstory = function(body, cb){
	console.log('in addstory ' + body);
		new require('./story.js').Story({
			title 			: body.story.title,
			summary			: body.story.summary,
			price 					:body.story.price,
			type 					: body.story.type,
			dificulty 				:body.story.dificulty

		}).save(function(err, story){
			if(err) cb(err, null);
			else {
				var id = story._id;
				cb(null, id);
			}
		});
}*/
/*exports.titleLinks = function(infos, cb){
	makeLinks(infos.title, infos.context, function(str){

	});
}*/




exports.makeLinks = function(str, context, cb){ //construit des liens pour les mots dans str
	var strl = str.length;
	var str2='';
	console.log(str);
	(function(strl){
	for(var i=2; i<strl-3; i++){
		//console.log(str[i]);
		if(str[i] == '<'){
			//str.splice(i, 1, "dd");
			str = [str.slice(0, i), " ", str.slice(i)].join('');
			i++;
		}
		//console.log(str);
	}
	for(var i=1; i<strl-3; i++){
		//console.log(str[i]);
		if(str[i] == '>'){
			//str.splice(i, 1, "dd");
			str = [str.slice(0, i+1), " ", str.slice(i+1)].join('');
			i++;
		}
		//console.log(str);
	}
})(strl);


	var words = str.split(/[\s.,\']/)
	.filter(function(val){ // enleve les chaines in    	
		if(val == '' || val == NaN || val == undefined || val == null || val.length<3 || val == '<p>' || val == '</p>'){
        	return false;
    	}
    	return true
    });
    console.log(words);
	
	var m = 0;
    var modals = [];
    var i;
    var w;

    	//console.log('modal:'+modals.length);
    	
    for(i =0,w=words.length; i<w; i++){
    console.log(words);

    	(function(i){

   		Media
   		.findOne({context : context, name : words[i]}, function(err, media){
   			if(err) console.log(err);
   			if(media){
   				//console.log('****words:'+modals+'i:'+i);

   				modals.push({name : media.name, a : media.a});
   				str2 = str2.concat(media.modal);
   				console.log('******str22:', str2);

   					
    			
    		}
    		else {
    			console.log('else i:'+i);
    		}

    		if(i == words.length-1){

   						//console.log('***i:'+words);
    					if(modals.length){
    						//console.log('modal:',modals);
    						var j;
    						
							
    						for(j=0; j<modals.length; j++){
    							console.log(modals[j].a);
    							var x=modals[j].name+" ";
    							var re = new RegExp(x,"gi");
    							str = str.replace(re, modals[j].a+" ");
    							var y = str.search(modals[j].name+".");
    							
    							if(y != -1){
    								var z=modals[j].name+". ";
    								var re = new RegExp(z,"");
    								str = str.replace(re, modals[j].a+". ");
    								//console.log(str);
    							}
    			//				console.log('******str:'+str);
    							
    							
    								if(j==modals.length-1){
    									console.log('***str2:', str2);
    			 						var re1 = new RegExp("<p> ","g");
    			 						var re2 = new RegExp(" </p>","g");
    			 						var strf1 = str.replace(re1,"<p>" );
    									var strf2 = strf1.replace(re2,"</p>" );
			 							cb(strf2.concat(str2));
   			 							//console.log('j:'+j);
   			 							return;
   			 							
   									}
   									//console.log('j:'+j);  								
    						}
    					
    					}
    					else {
    						console.log(str);
    						var re1 = new RegExp("<p> ","g");
    			 			var re2 = new RegExp(" </p>","g");
    			 			var strf1 = str.replace(re1,"<p>" );
    						var strf2 = strf1.replace(re2,"</p>" );
			 				cb(strf2.concat(str2));
    					}
    		}
    			
    	});
    	})(i);   	
   }  
}
exports.enregTitre = function(titre, id, cb){
	require('./story').Story
	.update({_id:id}, {title:titre}, function(err, ne){
		if(ne) cb(null, 1);
	});	
}

//supprimer <p> et </p>