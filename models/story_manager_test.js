'use strict'

var fs = require('fs');
var Media = require('./media.js').Media;
var unzip = require('unzip');
var buffer = require('buffer');




/*var file;
require('./file.js').File
.findById('5704c67942141c9416b8256f', function(err, file){
	console.log(file);
	if(file){
		require('./media_manager.js')
		.createMedia(file, function(err, media){
			console.log(media);
		});
	}
});*/
//console.log('<p> acheter </p>');
/*require('./story_manager.js').makeLinks('<p>acheter</p>', 'aventureskarim', function(str){
//	 console.log('**********test:'+str);
	
fs.writeFile('./message.txt', str , function (err){
  if (err) throw err;
  //console.log('<p> acheter');
});*/


//supprimer <p> et </p>

function makeLinks(str, context, cb){ //construit des liens pour les mots dans str
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


var str = "<p>karim enfant</p>";
var res;
makeLinks(str, 'aventureskarim', function(res){
	console.log('****res:'+res);

});
/*var strl = str.length;
(function(strl){
	for(var i=2; i<strl-3; i++){
		//console.log(str[i]);
		if(str[i] == '<'){
			//str.splice(i, 1, "dd");
			str = [str.slice(0, i), " ", str.slice(i)].join('');
			i++;
		}
		console.log(str);
	}
	for(var i=1; i<strl-3; i++){
		//console.log(str[i]);
		if(str[i] == '>'){
			//str.splice(i, 1, "dd");
			str = [str.slice(0, i+1), " ", str.slice(i+1)].join('');
			i++;
		}
		console.log(str);
	}
})(strl);*/

//var a = "aaaaa", b=" ";

//var output = [a.slice(0, position), b, a.slice(position)].join('');


/*require('./story_manager.js').newStory(function(err, id){
	console.log(id);
});*/


/*require('./story_manager').files_names('../public/uploads/', function(filespng, files){
	console.log(files);
});*/

//var files_path = 'img.zip';
//require('./story_manager.js').add_img(files_path);

/*fs.createReadStream('../public/uploads/img.zip')
.pipe(unzip.Extract({ path: '../public/uploads' })
	.on('close', function(){
		console.log('i m extracted ');
	}));*/

/*(function(){var stream = fs.createReadStream('input.txt');
var buf;
  var buf2;
function read() {
  
  while (buf = stream.read() || console.log('buf:', buf)) {
    console.log('buf:', buf);
  	buf2=Buffer.from('buf');
  }
}

stream.on('readable', read);

stream.once('end', function() {
  console.log('stream ended');
//buf2=Buffer.from(buf);
//for (var value of buf2.values()) {
  //console.log(value);
//}
});})();*/

/*var str = "Please locate1 where locate occurs!Please locate1 where locate1 occurs! Please locate1 where locate1 occurs! Please locate1 where locate1 occurs! Please locate1 where locate1 occurs! Please locate1 where locate1 occurs! Please locate1 where locate occurs!";
var pos = str.indexOf("locate ");
console.log(pos);*/

