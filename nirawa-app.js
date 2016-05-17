var express = require('express');
var app = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var adminRoutes = require('./routes/admin'),
    userRoutes  = require('./routes/user');
//var db = require('./models/db');
var port = process.env.PORT || 8080;
var fs = require('fs');
app.use(bodyParser.urlencoded({extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
/*********/
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});
/*********/


app.use(express.static(__dirname + '/admin-ui/bower_components'));
//app.use(express.static(__dirname + 'angular-froala/demo/bower_components'));
app.use(express.static(__dirname + '/admin-ui/views'));
//app.use(express.static(__dirname + 'angular-froala/demo'));
app.use(express.static(__dirname + '/admin-ui'));
//app.use(express.static(__dirname + '/angular-wysiwyg'));
app.use(express.static(__dirname + '/public'));
//app.use(express.static(__dirname + '/views/nirawa'));
app.use('/', adminRoutes);
//app.use('/', userRoutes);
/******index*****/
//app.get('/',function(req,res){
  //res.redirect('/nirawa');
//})
/*******end******/

/******index-admin*****/
/*app.get('/admin',function(req,res){
  res.redirect('/admin');
})*/
/*******end******/

/*app.get('/angularui',function(req,res){

  res.redirect('/angularUiRoute');
})*/
/*******end******/


app.listen(port);
console.log("Serveur running on port 8080");