var express = require('express'),

  apiRoutes = express.Router(),
	bodyParser = require('body-parser'),
  //mongoose = require('mongoose'),
  jwt = require('jsonwebtoken'),
  ejwt = require('express-jwt');
var multer      =    require('multer');//** upload
var done        =    false;  //**upload
var path = require('path');  
var fs = require('fs');
var story_manager = require('../models/story_manager.js');
  apiRoutes.use(function(req, res, next) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
      next();
  });

  //apiRoutes.use(morgan('dev'));                                         // log every request to the console
apiRoutes.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
apiRoutes.use(bodyParser.json());                                     // parse application/json
apiRoutes.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json


//apiRoutes.use(express.static(__dirname+"../public/"));
//'use strict';
  //apiRoutes.use(express.static(__dirname + './views'));
//apiRoutes.set('superSecret','tecdev');


var secretToken = 'aMdoeb5ed87zorRdkD6greDML81DcnrzeSD648ferFejmplx';
//var user = require('../models/administrators');
//var Admin = mongoose.model('Administrator');


/**************************************************
** Update************************************
*********************************/




/**************update*********/
apiRoutes.post('/update',ejwt({secret: secretToken}),function(req, res) {
  require('../models/adminDao.js')
  .update_infos(req.body.email_or_phone,
    req.body.password, 
    req.body.first_name,
    req.body.last_name, function(err, admin){
      if(err) return res.send(err);
      else return res.json(admin);
    });

 });

/********end-update*********/
/********logout***********/
//apiRoutes.get('/logout'/*,ejwt({secret: secretToken})*/,function(req, res) {
  //console.log(req.user);
  //delete req.user;
  //return res.send(200);
//});
/********end logout *******/
/*************login*************/
//var auth = require('../models/authentication.js');
apiRoutes.post('/login', function(req, res) {
  var auth = require('../models/authentication.js');
  console.log('une requete est arrivée');
  console.log(req.body);
  require('../models/authentication.js')
  .authenticate_admin(req.body.email_or_phone, 
    req.body.password, function(err, admin){
      console.log('admin authentication');
      if(err) return res.json(err);
      
      else{
        console.log('admin authentifié');
        var token = jwt.sign({id: admin.email_or_phone,Admin:true},
                              secretToken, 
                              { expiresInMinutes: 1 });
              //res.sendStatus(400);
        return res.json({token:token});
        //return res.json(admin);
      } 
  });
});
/***********end-login***********/
/**********get for update*******/
/*apiRoutes.get('/update/:id', function(req, res) {
    console.log(req.params.id);
    Admin.findOne({
          email_or_phone: req.params.id
        }, function(err, user) {
          if (err) throw err;
          if (user) {
              return res.json({ email_or_phone: user.email_or_phone , first_name: user.first_name ,last_name: user.last_name });
          }
        });
});
/******end get for update ******/



/********************************************************************
*******   Gestions des histoires ************************************
********************************************************************/
 // nouvelle histoire

 apiRoutes.get('/newStory', function(req, res){
  
  
  story_manager.newStory(function(err, id){
    if(err) console.log(err);
    else {res.send(id);
      console.log(id)}
  });
 
 });


 var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
          console.log('in dest config');
            cb(null, './public/uploads')
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, file.originalname)
            console.log('fieldname : '+file.fieldname);
          console.log('originalname : ' + file.originalname);
          console.log('path : '+file.path);
        }
    });


    var uploadFile = multer({ //multer settings

      storage: storage

  }).single('myFile');


//**upload image post

 /** API path that will upload the files */
    apiRoutes.post('/upload',  function(req, res) {
      console.log('in upload route' + req);
        //if(done) res.json('ok');


        uploadFile(req,res,function(err) {
          console.log('in uploadFile' + req.file);

        if(err) {
            return res.end("Error uploading file.");
        }
        else{
          console.log('fieldname : '+req.file.fieldname);
          console.log('originalname : '+req.file.originalname);
          console.log('path : '+req.file.path);
          story_manager.add_img(req.file.originalname);
          res.end("File is uploaded");
        } 
    });


        //if(done) res.json('');
        /*upload(req,res,function(err){
            if(err){
                 res.json({error_code:1,err_desc:err});
                 return;
            }
            else{
             res.json({error_code:0,err_desc:null});
             console.log('upload success'); 
            }
             
        })*/
       
    });


    //ajouter une nouveelle histoire

    apiRoutes.post('/addStory', function(req, res){
      console.log(req.body);
      var info = req.body;
        require('../models/story_manager.js')
        .addstory(info, function(err, id){
          if(err) return res.json(err);
          else return res.json(id);
        });
    });


    apiRoutes.post('/speLinks',  function(req, res) {
      console.log('req:', req.body);
        require('../models/story_manager.js').
        makeLinks(req.body.content, 'aventureskarim', function(str){
          res.json(str);

        });  

    });

    //enregistrer le titre

    apiRoutes.post('/enregistrerTitre',  function(req, res) {
      //console.log(req.body);
        story_manager.
        enregTitre(req.body.titleH,req.body.storyId, function(err, ne){
          res.json(ne);
        });  

    });


// number of parts
  apiRoutes.post('/nberOfparts', function(req, res){
    require('../models/story.js')
    .Story.findById(req.body.id_story, 'N', function(err, s){
      
      res.json(s.N);
     // res.sendStatus(200);
    });

  
  });





module.exports = apiRoutes;