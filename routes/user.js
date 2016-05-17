var express = require('express'),
    apiRoutes = express.Router(),

	bodyParser = require('body-parser'),
  //mongoose = require('mongoose'),
  ejwt = require('express-jwt');
  jwt = require('jsonwebtoken');
/***********************************/
apiRoutes.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});
/********************var**************/
var secretToken = 'aMdoeb5ed87zorRdkD6greDML81DcnrzeSD648ferFejmplx';
var User = require('../models/user.js').User;
var userDao = require('../models/userDao.js');
/***********************************/
  //apiRoutes.use(express.static(__dirname + '/views/nirawa'));
 /* apiRoutes.get('/', function(req, res) {
    res.render("index")
  });
  /***********afficher histoire******/
  apiRoutes.get('/Affichage',function(req,res){

    userDao.get_all_stories(function(err, stories){
        if(err) console.log(err);
        else res.json(stories);
    });
  });
  /**************end***************/
  /**********afficher partie histoire ******/
  apiRoutes.get('/AfficherPartie/:id',function(req,res){
    console.log(req.params);
    userDao.part_of_story(req.params.id, function(err, part){
      if(err){
        console.log(err);
        return res.send(0);
      }
      else{
        console.log(part);
        return res.json(part);
      }
    });
    });
  /*******end************/
    /**************update*********/
    apiRoutes.post('/update',/*ejwt({secret: secretToken}),*/function(req, res) {
    console.log(req.body);
      userDao.update_user(
        req.body.email_or_phone,
        req.body.first_name,
        req.body.last_name,
        req.body.birthday,
        req.body.school_level,
        req.body.city,
        req.body.school_name,
        req.body.school_status, function(err, user){
          if(err) {
            //console.log(err);
           return  res.send(0)
          }
          else return res.json(user);
        });

     });
    /********end-update*********/

    
  /*********login********/
  
  /*apiRoutes.post('/login', function(req, res) {
  User.findOne({
        email_or_phone: req.body.email
      }, function(err, user) {
        if (err) throw err;
        if (!user) {
          //res.json('no user');
          res.json(1);
          //res.send(400,"Utilisateur n'existe pas !!");
        } else if (user) {

            if(req.body.password == user.password){
            var token = jwt.sign({id: user.email_or_phone,Admin:false},secretToken, { expiresInMinutes: 60 });
            return res.json({token:token});
          } else {
            res.json(0);
          }
        }
      });
    });*/
  /********end-login-------/
/***********create-signin******/
/*apiRoutes.post('/signin',function(req,res){
  console.log("test");
  User.findOne({
        email_or_phone: req.body.email
      }, function(err, user) {
        if (err) throw err;
        if (user) {
  			    res.send(400,"cet utilisateur existe deja");
        }else if (!user) {
          User.create({
            email_or_phone: req.body.email,
            password: req.body.password
            
        		}, function (err, user){
        			if(err){
        				res.send(400,"There was a problem adding the information to the database");
        			}else {
        				console.log('POST creating new user:'+user);
                var token = jwt.sign({id: req.body.email,Admin:false},secretToken, { expiresInMinutes: 60 });
      			    return res.json({token:token});
                      }
                });
        }
      });
})*/
/*********end signin **********/
/*********confirm*********/
/*apiRoutes.post('/confirm',function(req,res){
  User.create({
    email_or_phone: req.body.email,
    idFacebook : req.body.id,
    password: req.body.password,
    first_name: req.body.first_name,
    last_name : req.body.last_name
    }, function (err, user){
      if(err){
        res.send(400,"There was a problem adding the information to the database");
      }else {
        console.log('POST creating new user:'+user);
        var token = jwt.sign({id: req.body.email,Admin:false},secretToken, { expiresInMinutes: 60 });
        return res.json({token:token});
              }
        });
});*/
/*******end confirm********/
/********loginFB***********/
/*apiRoutes.post('/loginFB',function(req,res){
  console.log(req.body.email +'12');
  User.findOne({
        email_or_phone: req.body.email
      }, function(err, user) {
        if (err) throw err;
        if (!user) {
  			    res.json(1);
        }else if (user) {
          if(req.body.id == user.idFacebook){
            var token = jwt.sign({id: user.email_or_phone,Admin:false},secretToken, { expiresInMinutes: 60 });
            return res.json({token:token});
            console.log(token);
          }else{
            res.send(400,"Votre email"+req.body.email+" est deja associe a un autre compte");
          }
      }else{
        console.log("12388");
      }
    });
});*/
/********end loginFB*******/
/**********get for update*******/
/*apiRoutes.get('/update'/*,ejwt({secret: secretToken})/,function(req, res){
  console.log(req.user.id);
  User.findOne({
        email_or_phone: req.user.id
      }, function(err, usser) {
        if (err) throw err;
        if (usser) {
  			    return res.json({ email_or_phone: usser.email_or_phone , first_name: usser.first_name ,last_name: usser.last_name });
        }
      });
});*/
/*apiRoutes.get('/update/:id', function(req, res) {
    console.log(req.params.id);
    User.findOne({
          email_or_phone: req.params.id
        }, function(err, user) {
          if (err) throw err;
          if (user) {
              return res.json({ email_or_phone: user.email_or_phone , first_name: user.first_name ,last_name: user.last_name });
          }
        });
});*/
/******end get for update ******/
/*******logout********/
//apiRoutes.get('/logout'/*,ejwt({secret: secretToken})*/,function(req, res) {
  //res.json('ayoub');
  //console.log(req.user);
  //delete req.user;
  //return res.send(200);
//});
/********endlogout*********/
module.exports = apiRoutes;
