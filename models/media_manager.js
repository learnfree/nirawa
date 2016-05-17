var fs = require('fs');

//modal
var x1 = "<a data-toggle='modal' data-target='#",
            x2 = "'>",
            x3 = "<\/a>",
            x4 = "<div id='",
            x5 = "'class='modal fade' role='dialog'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><button type='button' class='close' data-dismiss='modal'>&times;<\/button><\/div><div class='modal-body'><p><img src='",
            x6 = " ' class='img-responsive'/><\/p><\/div><\/div><\/div><\/div>";
            


exports.createMedia = function(file, cb){
    var a = x1 + file.name +  x2 + file.name + x3;
    var modal = x4 + file.name + x5 + file.context+"/"+file.path +x6;
    new require('./media.js').Media({
        modal : modal,
        a     : a,
        file : file,
        name : file.name,
        context : file.context
    }).save(function(err, media){
        if(err) cb(err, media);
        else cb(err, media);
    });
}


