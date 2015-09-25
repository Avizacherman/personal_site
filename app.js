"use strict"

var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var cowsay = require('cowsay');
var ejs = require('ejs');
var nodeMailer = require('nodemailer');

var pass = process.env.aword.trim()

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
			throw error
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
