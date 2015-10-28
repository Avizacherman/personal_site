"use strict"

var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var cowsay = require('cowsay');
var ejs = require('ejs');
var nodeMailer = require('nodemailer');

var pass = process.env.aword.trim()
console.log(pass)
var transport = nodeMailer.createTransport({
	service: "Gmail",

	auth: {
		user: "avizacherman@gmail.com",
		pass: pass }
	})

var app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', function(req, res){
	res.render('index.html.ejs')
})

var date1 = new Date(2015, 9, 1)
var date2 = new Date(2015, 10, 30)
var date3 = new Date(2016, 1, 15)
var date4 = new Date(2016, 5, 30)

app.get('/lineup', function(req, res){
	var test = {
		name: "Joe Designer",
		experience: 10,
		skills: ['Adobe InDesign, Adobe Illustrator, Adobe Photoshop'],
		availability: [{begin: date1, end: date2} {begin: date3, end: date4}]
		}

	
	res.json(test)
})

app.get('/concept', function(req, res){
	res.render('concept.html.ejs')
})

app.post('/mail', function(req, res){
	console.log(req.body)
	var mailOptions = {
		from: req.body.from + '<' + req.body.fromEmail + '>',
		to: "avizacherman@gmail.com",
		subject: "[Avi Website]" + req.body.subject,
		text: req.body.content
	}

	transport.sendMail(mailOptions, function(error, info){
		if (error) {
			var response = {
 		   status: 500,
 		   error: error
			}
			console.log(error)
			console.log(req.body.content)
		} else {
			var response = {
				status: 200,
				success: info
			}
		}
		res.end(JSON.stringify(response));
	})
})

app.listen(1500, function(err){
	if (err) throw err

	console.log(cowsay.say({
		text: "Listening on port 1500", 
		e: '--'
	}))
})
