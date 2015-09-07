"use strict"
var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var cowsay = require('cowsay');
var ejs = require('ejs');
var nodeMailer = require('nodemailer');

var app = express();

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', function(req, res){
	res.render('index.html.ejs')
})

app.listen(80)